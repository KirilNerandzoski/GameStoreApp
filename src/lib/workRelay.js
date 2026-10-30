// WorkRelay Integration Service
// Dispatches order lifecycle, inventory/stock sync, and customer signup events to WorkRelay edge functions

const WORKRELAY_BASE_URL = 'https://wayktzmupzrdcwosgnfg.supabase.co/functions/v1';

// WorkRelay integration key & store configuration
// Can be overridden via Vite env variables if desired
export const WORKRELAY_CONFIG = {
  apiKey: import.meta.env.VITE_WORKRELAY_API_KEY || 'wr_live_c2e37694b9d0c7c92ac62b01de582f81435613e75ca8d9b2e46be900eaa1b975',
  storeId: import.meta.env.VITE_WORKRELAY_STORE_ID || 'ignis-gaming-store',
  storeName: 'IGNIS Gaming Store',
  storeUrl: 'https://kirilnerandzoski.github.io/GameStoreApp/',
  productsFeedUrl: 'https://kirilnerandzoski.github.io/GameStoreApp/workrelay/products.json'
};

/**
 * Deterministic default stock per product based on department when not explicitly overridden.
 */
export function getDefaultProductStock(product, idx = 0) {
  if (typeof product.stock === 'number') return product.stock;
  const dept = product.department || 'gaming';
  const hash = (idx * 17 + 31) % 40;
  switch (dept) {
    case 'gaming':
      return 80 + hash * 3;
    case 'hardware':
      return 8 + (hash % 18);
    case 'collectibles':
      return 5 + (hash % 15);
    case 'apparel':
      return 25 + hash;
    case 'services':
      return 50 + hash * 2;
    case 'fuel':
      return 40 + hash * 2;
    default:
      return 30 + hash;
  }
}

export function getDefaultNotifyOn(product) {
  if (typeof product.notifyOn === 'number') return product.notifyOn;
  if (typeof product.notify_on === 'number') return product.notify_on;
  const dept = product.department || 'gaming';
  switch (dept) {
    case 'hardware':
    case 'collectibles':
      return 5;
    case 'apparel':
    case 'fuel':
    case 'services':
      return 10;
    case 'gaming':
    default:
      return 15;
  }
}

export function getProductUnit(product) {
  const dept = product.department || 'gaming';
  if (dept === 'gaming' || product.itemType === 'digital') return 'keys';
  if (dept === 'services' || product.itemType === 'subscription') return 'slots';
  return 'pcs';
}

/**
 * Formats a store product into WorkRelay's strict product-feed.schema.json structure.
 */
export function formatProductForWorkRelay(product, idx = 0, customStock = null) {
  const sku = String(product.id || product.sku || `item-${idx}`).slice(0, 200);
  const resolvedStock = typeof customStock === 'number'
    ? Math.max(0, Math.round(customStock))
    : getDefaultProductStock(product, idx);

  return {
    sku,
    name: String(product.title || product.name || sku).slice(0, 300),
    stock: resolvedStock,
    notify_on: getDefaultNotifyOn(product),
    price_minor: Math.round(Number(product.price || 0) * 100),
    currency: 'USD',
    unit: getProductUnit(product),
    category: String(product.category || product.departmentName || product.department || 'General').slice(0, 200),
    barcode: `IGNIS-${sku.toUpperCase().replace(/[^A-Z0-9-]/g, '-')}`.slice(0, 100),
    updated_at: new Date().toISOString()
  };
}

/**
 * Attempts one-time binding of this store to WorkRelay with the active secret key.
 */
export async function bindWorkRelayStore(storeId = WORKRELAY_CONFIG.storeId) {
  try {
    const res = await fetch(`${WORKRELAY_BASE_URL}/bind`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WORKRELAY_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        store_id: storeId,
        base_url: WORKRELAY_CONFIG.storeUrl
      })
    });
    const data = await res.json().catch(() => ({}));
    console.log('[WorkRelay] Bind response:', res.status, data);
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.warn('[WorkRelay] Bind failed to reach server:', err);
    return { ok: false, error: err };
  }
}

/**
 * Pushes the store's product inventory and stock levels to WorkRelay's /inventory-webhook endpoint.
 * Conforms strictly to WorkRelay's product-feed.schema.json (max 500 products per push request).
 */
export async function syncInventoryToWorkRelay(productsList = [], stockMap = {}) {
  if (!WORKRELAY_CONFIG.apiKey) {
    console.warn('[WorkRelay] No API key configured. Skipping inventory sync.');
    return { ok: false, error: 'missing_api_key' };
  }

  try {
    const formattedProducts = productsList.slice(0, 500).map((product, idx) => {
      const sku = String(product.id || product.sku);
      const overrideStock = typeof stockMap[sku] === 'number' ? stockMap[sku] : null;
      return formatProductForWorkRelay(product, idx, overrideStock);
    });

    if (formattedProducts.length === 0) {
      return { ok: false, error: 'no_products' };
    }

    console.log(`[WorkRelay] Pushing ${formattedProducts.length} products to /inventory-webhook...`);

    const res = await fetch(`${WORKRELAY_BASE_URL}/inventory-webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WORKRELAY_CONFIG.apiKey}`,
        'X-Store-Id': WORKRELAY_CONFIG.storeId
      },
      body: JSON.stringify({ products: formattedProducts })
    });

    const responseText = await res.text();
    let parsed = {};
    try { parsed = JSON.parse(responseText); } catch (e) {}
    console.log(`[WorkRelay] Inventory webhook HTTP ${res.status}:`, responseText);
    return { ok: res.ok, status: res.status, data: parsed, body: responseText, count: formattedProducts.length };
  } catch (err) {
    console.warn('[WorkRelay] Failed to sync inventory:', err);
    return { ok: false, error: err };
  }
}

/**
 * Dispatches an order.created event to WorkRelay's order-webhook endpoint.
 * Schema conforms strictly to WorkRelay's internal Zod schema.
 */
export async function dispatchOrderToWorkRelay(order, userProfile = null) {
  if (!WORKRELAY_CONFIG.apiKey) {
    console.warn('[WorkRelay] No API key configured. Skipping dispatch.');
    return;
  }

  try {
    const safeOrderId = String(order.orderId || order.id || Date.now()).replace(/[^a-zA-Z0-9_-]/g, '_');
    const customerName = 
      order.customer_name || 
      order.customer?.name || 
      userProfile?.gamertag || 
      userProfile?.name || 
      'Kirogamer';
    const customerEmail = 
      order.customer_email || 
      order.customer?.email || 
      userProfile?.email || 
      'kirogamer@ignis.cyber';

    const subtotalMinor = Math.round(Number(order.subtotal || order.total || order.total_amount || 0) * 100);
    const totalMinor = Math.round(Number(order.total || order.total_amount || 0) * 100);

    const items = (order.items || []).map(item => ({
      sku: String(item.id || item.gameId || 'item-sku'),
      name: String(item.title || item.gameTitle || 'Product Item').slice(0, 500),
      quantity: Number(item.quantity) || 1,
      unit_price_minor: Math.round(Number(item.price || 0) * 100)
    }));

    const payload = {
      event_id: `evt_${safeOrderId}_created`,
      event_type: 'order.created',
      occurred_at: new Date().toISOString(),
      order: {
        external_id: safeOrderId,
        order_number: `#${order.orderId || safeOrderId}`,
        placed_at: new Date().toISOString(),
        currency: 'USD',
        customer: {
          name: customerName.slice(0, 200),
          email: customerEmail.slice(0, 320)
        },
        totals: {
          subtotal_minor: subtotalMinor,
          shipping_minor: 0,
          total_minor: totalMinor
        },
        status: 'pending',
        payment_status: 'paid',
        fulfillment_status: 'unfulfilled',
        items: items
      }
    };

    console.log('[WorkRelay] Dispatching order webhook event:', payload.event_id);

    const res = await fetch(`${WORKRELAY_BASE_URL}/order-webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WORKRELAY_CONFIG.apiKey}`,
        'X-Store-Id': WORKRELAY_CONFIG.storeId
      },
      body: JSON.stringify(payload)
    });

    const responseText = await res.text();
    console.log(`[WorkRelay] Order webhook HTTP ${res.status}:`, responseText);
    return { ok: res.ok, status: res.status, body: responseText };
  } catch (err) {
    console.warn('[WorkRelay] Failed to dispatch order event:', err);
    return { ok: false, error: err };
  }
}

/**
 * Dispatches a customer.created event to WorkRelay's /customer-webhook endpoint.
 */
export async function dispatchCustomerToWorkRelay({ email, name, externalId, registeredAt }) {
  if (!WORKRELAY_CONFIG.apiKey || !email) {
    return { ok: false, error: 'missing_key_or_email' };
  }

  try {
    const nowIso = new Date().toISOString();
    const safeId = String(externalId || email).replace(/[^a-zA-Z0-9_@.-]/g, '_').slice(0, 150);
    const payload = {
      event_id: `cust_${safeId}:created`,
      event_type: 'customer.created',
      occurred_at: nowIso,
      customer: {
        email: String(email).trim().slice(0, 320),
        name: name ? String(name).trim().slice(0, 200) : null,
        external_id: safeId,
        registered_at: registeredAt || nowIso
      }
    };

    const res = await fetch(`${WORKRELAY_BASE_URL}/customer-webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WORKRELAY_CONFIG.apiKey}`,
        'X-Store-Id': WORKRELAY_CONFIG.storeId
      },
      body: JSON.stringify(payload)
    });

    const responseText = await res.text();
    console.log(`[WorkRelay] Customer webhook HTTP ${res.status}:`, responseText);
    return { ok: res.ok, status: res.status, body: responseText };
  } catch (err) {
    console.warn('[WorkRelay] Failed to dispatch customer signup event:', err);
    return { ok: false, error: err };
  }
}
