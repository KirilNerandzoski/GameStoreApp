// WorkRelay Integration Service
// Dispatches order lifecycle events directly to WorkRelay edge functions

const WORKRELAY_BASE_URL = 'https://wayktzmupzrdcwosgnfg.supabase.co/functions/v1';

// WorkRelay integration key & store configuration
// Can be overridden via Vite env variables if desired
export const WORKRELAY_CONFIG = {
  apiKey: import.meta.env.VITE_WORKRELAY_API_KEY || 'wr_live_c2e37694b9d0c7c92ac62b01de582f81435613e75ca8d9b2e46be900eaa1b975',
  storeId: import.meta.env.VITE_WORKRELAY_STORE_ID || 'ignis-gaming-store',
  storeName: 'IGNIS Gaming Store',
  storeUrl: 'https://kirilnerandzoski.github.io/GameStoreApp/'
};

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
        store_name: WORKRELAY_CONFIG.storeName,
        store_url: WORKRELAY_CONFIG.storeUrl
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
