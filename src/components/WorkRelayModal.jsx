import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  WORKRELAY_CONFIG,
  bindWorkRelayStore,
  syncInventoryToWorkRelay,
  dispatchCustomerToWorkRelay,
  dispatchOrderToWorkRelay,
  dispatchOrderUpdateToWorkRelay,
  flushWorkRelayOutbox,
  getWorkRelayOutbox,
  getLastWorkRelaySyncStatus,
  queueBatchedStockPushToWorkRelay
} from '../lib/workRelay';
import { supabase } from '../lib/supabaseClient';
import {
  X,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Package,
  Users,
  ShoppingCart,
  Link2,
  Send,
  Database,
  ArrowUpRight,
  Search
} from 'lucide-react';

export default function WorkRelayModal() {
  const {
    isStoreAdmin,
    isWorkRelayModalOpen,
    setIsWorkRelayModalOpen,
    allProducts,
    productStockMap,
    setProductStockMap,
    userProfile,
    orders,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'endpoints' | 'customers' | 'orders'
  const [syncProgress, setSyncProgress] = useState(null); // { sent, total, status }
  const [syncResult, setSyncResult] = useState(() => getLastWorkRelaySyncStatus());
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [outboxItems, setOutboxItems] = useState(() => getWorkRelayOutbox());
  const [stockSearch, setStockSearch] = useState('');
  const [customerStatus, setCustomerStatus] = useState(null);
  const [orderStatusMsg, setOrderStatusMsg] = useState(null);
  const [feedTestStatus, setFeedTestStatus] = useState(null);

  useEffect(() => {
    if (isWorkRelayModalOpen) {
      setOutboxItems(getWorkRelayOutbox());
      setSyncResult(getLastWorkRelaySyncStatus());
    }
  }, [isWorkRelayModalOpen]);

  if (!isWorkRelayModalOpen || !isStoreAdmin) return null;

  const handleCopy = (label, text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      addToast('Copied to Clipboard', `${label} copied`, 'success');
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Section 5.B: "Sync to WorkRelay" button (chunked 500-product push with progress)
  const handleSyncInventoryNow = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    setSyncProgress({ sent: 0, total: allProducts.length, status: 'syncing' });

    const res = await syncInventoryToWorkRelay(allProducts, productStockMap, (prog) => {
      setSyncProgress({ ...prog });
    });

    setIsSyncing(false);
    setSyncResult(res);
    setOutboxItems(getWorkRelayOutbox());

    if (res.ok && !res.ignored) {
      addToast('WorkRelay Inventory Synced', `Sent ${res.sent} of ${res.total} products`, 'success');
    } else if (res.ignored && res.reason === 'inventory_push_disabled') {
      addToast('WorkRelay Notice (202)', 'Ask WorkRelay to switch on quick sync for this shop.', 'info');
    } else {
      addToast('WorkRelay Sync Issue', res.userMessage || 'Check diagnostic message', 'error');
    }
  };

  // Update individual product stock and push batched update to WorkRelay
  const handleAdjustStock = (product, newStockVal) => {
    const cleanQty = Math.max(0, parseInt(newStockVal, 10) || 0);
    const sku = String(product.id);
    setProductStockMap(prev => {
      const next = { ...prev, [sku]: cleanQty };
      queueBatchedStockPushToWorkRelay([product], next);
      return next;
    });
  };

  // Test the public GET /workrelay/products.json endpoint
  const handleTestPullEndpoint = async () => {
    setFeedTestStatus({ loading: true });
    try {
      const localUrl = `${import.meta.env.BASE_URL}workrelay/products.json`;
      const res = await fetch(localUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': WORKRELAY_CONFIG.productsAuthToken
        }
      });
      const json = await res.json();
      const count = Array.isArray(json?.products) ? json.products.length : 0;
      setFeedTestStatus({
        ok: res.ok && count > 0,
        status: res.status,
        count,
        sampleSku: json?.products?.[0]?.sku
      });
    } catch (err) {
      setFeedTestStatus({ ok: false, error: err.message });
    }
  };

  // Section 4: Send current customer signup (customer.created)
  const handleSendCustomerSignup = async () => {
    setCustomerStatus({ loading: true });
    const res = await dispatchCustomerToWorkRelay({
      email: userProfile.email || 'kirogamer@ignis.cyber',
      name: userProfile.gamertag || 'Kirogamer',
      externalId: userProfile.gamertag || 'Kirogamer',
      registeredAt: new Date().toISOString(),
      eventType: 'customer.created'
    });
    setCustomerStatus(res);
    setOutboxItems(getWorkRelayOutbox());
  };

  // Section 4 Step 4: Backfill / import existing accounts from Supabase profiles
  const handleImportExistingProfiles = async () => {
    setCustomerStatus({ loading: true, text: 'Importing profiles from Supabase...' });
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, gamertag, email, created_at')
        .limit(100);

      if (error || !profiles || profiles.length === 0) {
        // Fallback to current operative
        await handleSendCustomerSignup();
        return;
      }

      let processed = 0;
      let lastRes = null;
      for (const prof of profiles) {
        if (!prof.email) continue;
        lastRes = await dispatchCustomerToWorkRelay({
          email: prof.email,
          name: prof.gamertag || prof.email.split('@')[0],
          externalId: prof.id,
          registeredAt: prof.created_at,
          eventType: 'customer.created'
        });
        if (lastRes.ok) processed++;
      }

      setCustomerStatus({
        ...lastRes,
        importedCount: processed,
        totalProfiles: profiles.length
      });
      setOutboxItems(getWorkRelayOutbox());
    } catch (err) {
      setCustomerStatus({ ok: false, error: err.message });
    }
  };

  // Section 3: Send test order or status change
  const handleSendTestOrder = async () => {
    setOrderStatusMsg({ loading: true });
    const sampleProduct = allProducts[0];
    const testOrderId = `OMNI-${Math.floor(100000 + Math.random() * 900000)}`;
    const testOrder = {
      orderId: testOrderId,
      customer_name: userProfile.gamertag || 'Kirogamer',
      customer_email: userProfile.email || 'kirogamer@ignis.cyber',
      subtotal: sampleProduct.price,
      total: sampleProduct.price,
      status: 'pending',
      payment_status: 'paid',
      fulfillment_status: 'unfulfilled',
      items: [
        {
          id: sampleProduct.id,
          sku: sampleProduct.id,
          title: sampleProduct.title,
          quantity: 1,
          price: sampleProduct.price
        }
      ]
    };
    const res = await dispatchOrderToWorkRelay(testOrder, userProfile);
    setOrderStatusMsg({ ...res, orderId: testOrderId, eventType: 'order.created' });
    setOutboxItems(getWorkRelayOutbox());
  };

  const handleUpdateLatestOrderStatus = async (newStatus) => {
    const latest = orders[0];
    if (!latest) {
      addToast('No Recent Orders', 'Place or send a test order first.', 'info');
      return;
    }
    setOrderStatusMsg({ loading: true });
    const updatedOrder = {
      ...latest,
      status: newStatus,
      fulfillment_status: newStatus === 'completed' ? 'fulfilled' : 'unfulfilled',
      occurredAt: new Date().toISOString()
    };
    const res = await dispatchOrderUpdateToWorkRelay(updatedOrder, userProfile, 'order.status_changed');
    setOrderStatusMsg({ ...res, orderId: latest.orderId, eventType: `order.status_changed (${newStatus})` });
    setOutboxItems(getWorkRelayOutbox());
  };

  const handleFlushOutbox = async () => {
    const summary = await flushWorkRelayOutbox();
    setOutboxItems(getWorkRelayOutbox());
    addToast(
      'Outbox Retried',
      `Processed: ${summary.processed}, Ignored (202): ${summary.ignored}, Pending: ${summary.failed}`,
      summary.processed > 0 ? 'success' : 'info'
    );
  };

  const filteredProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes(stockSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(stockSearch.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(stockSearch.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={() => setIsWorkRelayModalOpen(false)}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-[#090a12] border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0d0e19] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black font-cyber text-white tracking-wider uppercase">
                  WorkRelay Commerce Sync Hub
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  STORE BOUND: {WORKRELAY_CONFIG.storeId}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Orders, Customer Signups, Scheduled Product Feed & Instant Inventory Push
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWorkRelayModalOpen(false)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-[#0b0c16] border-b border-zinc-800 flex gap-2 overflow-x-auto">
          {[
            { id: 'inventory', label: '1. Inventory Sync & Stock', icon: Package },
            { id: 'endpoints', label: '2. Products Feed URL & Token', icon: Link2 },
            { id: 'customers', label: '3. Customer Signups', icon: Users },
            { id: 'orders', label: '4. Order Events & Outbox', icon: ShoppingCart }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                  active
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: INVENTORY SYNC & LIVE STOCK */}
          {activeTab === 'inventory' && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    Instant Inventory Push (POST /inventory-webhook)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                    Pushes all <strong className="text-white">{allProducts.length} products</strong> across all 6 departments in chunks of 500 with real stock numbers, <code className="text-cyan-300">notify_on</code> thresholds, and <code className="text-cyan-300">price_minor</code>. Stock changes on checkout also batch-push automatically.
                  </p>
                </div>
                <button
                  onClick={handleSyncInventoryNow}
                  disabled={isSyncing}
                  className="shrink-0 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing
                    ? `Syncing (${syncProgress?.sent || 0} of ${syncProgress?.total || allProducts.length})...`
                    : 'Sync to WorkRelay'}
                </button>
              </div>

              {/* Progress / Diagnostic Banner */}
              {(syncProgress || syncResult) && (
                <div
                  className={`p-4 rounded-xl border text-xs ${
                    syncResult?.ignored
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                      : syncResult?.ok
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                      : syncResult && !syncResult.ok
                      ? 'bg-red-500/10 border-red-500/40 text-red-200'
                      : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold uppercase tracking-wider flex items-center gap-2">
                      {syncResult?.ignored ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          HTTP 202 — Quick Sync Not Enabled Yet
                        </>
                      ) : syncResult?.ok ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Inventory Sync Complete
                        </>
                      ) : (
                        <>Progress</>
                      )}
                    </span>
                    <span className="font-mono font-bold">
                      Sent {syncProgress?.sent ?? syncResult?.sent ?? allProducts.length} of{' '}
                      {syncProgress?.total ?? syncResult?.total ?? allProducts.length}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden mb-2">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            ((syncProgress?.sent ?? syncResult?.sent ?? allProducts.length) /
                              (syncProgress?.total ?? syncResult?.total ?? allProducts.length)) *
                              100
                          )
                        )}%`
                      }}
                    />
                  </div>
                  {syncResult?.userMessage && (
                    <p className="font-medium mt-1">{syncResult.userMessage}</p>
                  )}
                </div>
              )}

              {/* Quick Live Stock Editor */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                <div className="p-3 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Live Store Catalogue ({filteredProducts.length} Products) — Edit Stock to Auto-Batch Push
                  </span>
                  <div className="relative w-64">
                    <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={stockSearch}
                      onChange={e => setStockSearch(e.target.value)}
                      placeholder="Filter by SKU or product name..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/60 border border-zinc-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-zinc-800/60">
                  {filteredProducts.map(prod => {
                    const currentStock = productStockMap[prod.id] ?? 50;
                    return (
                      <div key={prod.id} className="px-4 py-2.5 flex items-center justify-between gap-4 text-xs hover:bg-zinc-800/30">
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate">{prod.title}</div>
                          <div className="font-mono text-[11px] text-zinc-400">
                            SKU: <span className="text-cyan-400">{prod.id}</span> · ${prod.price} · Dept: {prod.department}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="text-[11px] text-zinc-400">Stock:</label>
                          <input
                            type="number"
                            min="0"
                            value={currentStock}
                            onChange={e => handleAdjustStock(prod, e.target.value)}
                            className="w-20 px-2 py-1 rounded bg-black border border-zinc-700 text-right font-mono text-white focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEDULED PULL ENDPOINT & TOKEN */}
          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    Scheduled Products Endpoint (WorkRelay Calls Your Shop)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Paste these values in WorkRelay under <strong>Settings → API Calls</strong>. WorkRelay will fetch your full 120-product catalogue on its schedule, or immediately when you click <strong>Sync now</strong> on WorkRelay's Inventory page.
                  </p>
                </div>

                {/* Products URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 uppercase">Products URL (HTTPS, 200 OK, No Redirects)</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2.5 rounded-lg bg-black border border-zinc-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                      {WORKRELAY_CONFIG.productsFeedUrl}
                    </code>
                    <button
                      onClick={() => handleCopy('Products URL', WORKRELAY_CONFIG.productsFeedUrl)}
                      className="px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                    >
                      {copiedField === 'Products URL' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      Copy URL
                    </button>
                  </div>
                </div>

                {/* Dedicated Read-Only Token */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 uppercase">
                    Authorization Header (Dedicated Read-Only Token — Never Reuses Secret Key)
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2.5 rounded-lg bg-black border border-zinc-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                      {WORKRELAY_CONFIG.productsAuthToken}
                    </code>
                    <button
                      onClick={() => handleCopy('Authorization Token', WORKRELAY_CONFIG.productsAuthToken)}
                      className="px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                    >
                      {copiedField === 'Authorization Token' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      Copy Token
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleTestPullEndpoint}
                    className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-2"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Verify Products Endpoint Response
                  </button>
                  {feedTestStatus && !feedTestStatus.loading && (
                    <span className={`text-xs font-mono ${feedTestStatus.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                      {feedTestStatus.ok
                        ? `✓ HTTP ${feedTestStatus.status} OK — Valid JSON with ${feedTestStatus.count} products (first SKU: ${feedTestStatus.sampleSku})`
                        : `✕ Failed: ${feedTestStatus.error || feedTestStatus.status}`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER SIGNUPS */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    Customer Signup Webhook (POST /customer-webhook)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Automatically dispatches <code className="text-cyan-300">customer.created</code> when an operative registers via Email or Google OAuth, and <code className="text-cyan-300">customer.updated</code> when they edit their gamertag.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSendCustomerSignup}
                    disabled={customerStatus?.loading}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Current Operative ({userProfile.gamertag})
                  </button>

                  <button
                    onClick={handleImportExistingProfiles}
                    disabled={customerStatus?.loading}
                    className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-zinc-700"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Import Existing Supabase Accounts
                  </button>
                </div>

                {customerStatus && !customerStatus.loading && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs ${
                      customerStatus.ignored
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : customerStatus.ok
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                        : 'bg-red-500/10 border-red-500/40 text-red-200'
                    }`}
                  >
                    <div className="font-bold uppercase mb-1">
                      HTTP {customerStatus.status} — {customerStatus.ignored ? `Ignored (${customerStatus.reason})` : customerStatus.ok ? 'Processed' : 'Error'}
                    </div>
                    <p>
                      {customerStatus.userMessage ||
                        (customerStatus.importedCount != null
                          ? `Sent ${customerStatus.importedCount} of ${customerStatus.totalProfiles} profiles to WorkRelay.`
                          : customerStatus.body || customerStatus.detail)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS & OUTBOX */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    Order Webhook (POST /order-webhook) & Persistent Outbox
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Every order includes <code className="text-cyan-300">customer.email</code>, <code className="text-cyan-300">customer.name</code>, and <code className="text-cyan-300">items[].sku</code> + <code className="text-cyan-300">name</code> so customers and inventory products link automatically.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSendTestOrder}
                    disabled={orderStatusMsg?.loading}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Test Order (order.created)
                  </button>

                  <button
                    onClick={() => handleUpdateLatestOrderStatus('processing')}
                    className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700"
                  >
                    Mark Latest Order: Processing
                  </button>

                  <button
                    onClick={() => handleUpdateLatestOrderStatus('completed')}
                    className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-bold text-xs uppercase tracking-wider border border-zinc-700"
                  >
                    Mark Latest Order: Completed
                  </button>
                </div>

                {orderStatusMsg && !orderStatusMsg.loading && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs ${
                      orderStatusMsg.ok
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                        : 'bg-red-500/10 border-red-500/40 text-red-200'
                    }`}
                  >
                    <div className="font-bold">
                      {orderStatusMsg.eventType} ({orderStatusMsg.orderId}) → HTTP {orderStatusMsg.status}
                    </div>
                    <div className="font-mono mt-1">{orderStatusMsg.body || orderStatusMsg.detail}</div>
                  </div>
                )}

                {/* Outbox Queue */}
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-zinc-300 uppercase">
                      Persistent Outbox Queue ({outboxItems.length} events)
                    </span>
                    <p className="text-[11px] text-zinc-500">
                      Stores any network/5xx retries or events sent while a WorkRelay switch was off (202).
                    </p>
                  </div>
                  <button
                    onClick={handleFlushOutbox}
                    disabled={outboxItems.length === 0}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Resend Outbox ({outboxItems.length})
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
