"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  BarChart3,
  CalendarDays,
  Eye,
  Lock,
  MousePointerClick,
  Package,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  X,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

interface DashboardData {
  metrics: {
    clicks: number;
    visitors: number;
    addToCart: number;
    checkouts: number;
    orders: number;
    revenueMad: number;
    averageOrderValueMad: number;
    conversionRate: number;
    checkoutRate: number;
  };
  daily: {
    date: string;
    clicks: number;
    visitors: number;
    orders: number;
    revenueMad: number;
  }[];
  sources: { source: string; clicks: number; visitors: number }[];
  products: {
    slug: string;
    name: string;
    units: number;
    orders: number;
    revenueMad: number;
  }[];
}

interface AdminOrder {
  id: string;
  orderNumber: string;
  status: string;
  customerName: string;
  phoneRaw: string;
  phoneE164: string;
  subtotalMad: number;
  upsellTotalMad: number;
  grandTotalMad: number;
  currency: string;
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  clientIp?: string;
  userAgent?: string;
  sheetSyncStatus: string;
  metaCapiStatus?: string;
  tiktokCapiStatus?: string;
  snapCapiStatus?: string;
  createdAt: string;
  items: {
    slug: string;
    nameAr: string;
    internalName: string;
    quantity: number;
    bundlePieces: number;
    source: string;
    unitPriceMad: number;
    lineTotalMad: number;
  }[];
  events: {
    eventType: string;
    provider?: string;
    status: string;
    error?: string;
    createdAt: string;
  }[];
}

function mad(value: number) {
  return `${new Intl.NumberFormat("fr-MA").format(Math.round(value || 0))} MAD`;
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function defaultStart() {
  const date = new Date();
  date.setDate(date.getDate() - 29);
  return isoDate(date);
}

function authHeader(username: string, password: string) {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

function MetricCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-latin text-xs uppercase tracking-[0.2em] text-white/50">
            {label}
          </p>
          <p className="mt-3 font-latin text-3xl font-bold text-white">{value}</p>
          <p className="mt-2 font-latin text-sm text-white/55">{hint}</p>
        </div>
        <div className="rounded-2xl bg-accent/20 p-3 text-accent">{icon}</div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status?: string }) {
  const normalized = status ?? "unknown";
  const color =
    normalized === "sent" || normalized === "success"
      ? "bg-success/15 text-success"
      : normalized === "failed" || normalized === "error"
        ? "bg-urgency/15 text-urgency"
        : "bg-accent/15 text-accent";
  return (
    <span className={`rounded-full px-3 py-1 font-latin text-xs font-semibold ${color}`}>
      {normalized}
    </span>
  );
}

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savedAuth, setSavedAuth] = useState<{ username: string; password: string } | null>(null);
  const [start, setStart] = useState(defaultStart());
  const [end, setEnd] = useState(isoDate(new Date()));
  const [tab, setTab] = useState<"overview" | "orders">("overview");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const query = useMemo(() => `start=${start}&end=${end}`, [start, end]);

  async function loadData(auth = savedAuth) {
    if (!auth) return;
    setLoading(true);
    setError("");
    try {
      const headers = { Authorization: authHeader(auth.username, auth.password) };
      const [dashboardRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/dashboard?${query}`, { headers }),
        fetch(`${API_BASE}/api/admin/orders?${query}`, { headers }),
      ]);
      if (!dashboardRes.ok || !ordersRes.ok) {
        throw new Error("Invalid login or admin API unavailable");
      }
      setDashboard(await dashboardRes.json());
      const orderData = await ordersRes.json();
      setOrders(orderData.orders ?? []);
      setSavedAuth(auth);
      sessionStorage.setItem("ka_admin_auth", JSON.stringify(auth));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const raw = sessionStorage.getItem("ka_admin_auth");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setSavedAuth(parsed);
      setUsername(parsed.username ?? "");
      setPassword(parsed.password ?? "");
    } catch {
      sessionStorage.removeItem("ka_admin_auth");
    }
  }, []);

  useEffect(() => {
    if (savedAuth) loadData(savedAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAuth, query]);

  const maxClicks = Math.max(...(dashboard?.daily.map((day) => day.clicks) ?? [1]), 1);

  if (!savedAuth && !dashboard) {
    return (
      <section dir="ltr" className="min-h-screen bg-primary-dark px-4 py-16 font-latin text-white">
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-accent/20 p-3 text-accent">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Karimi Admin</h1>
              <p className="text-sm text-white/55">Login with backend env credentials.</p>
            </div>
          </div>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              loadData({ username, password });
            }}
          >
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
            {error && <p className="text-sm text-red-300">{error}</p>}
            <button className="w-full rounded-2xl bg-accent px-5 py-3 font-bold text-primary-dark transition hover:bg-accent/90">
              {loading ? "Loading..." : "Open dashboard"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section dir="ltr" className="min-h-screen bg-primary-dark px-4 py-8 font-latin text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-xl md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-accent">DTC Command Center</p>
            <h1 className="mt-2 text-3xl font-bold">Karimi Auto Admin</h1>
            <p className="mt-1 text-sm text-white/55">
              Metrics only count validated Morocco, non-VPN traffic.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CalendarDays className="h-5 w-5 text-white/45" />
            <input
              type="date"
              value={start}
              onChange={(event) => setStart(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={end}
              onChange={(event) => setEnd(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm"
            />
            <button
              onClick={() => loadData()}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-urgency/30 bg-urgency/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-2">
          {(["overview", "orders"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-full px-5 py-2 text-sm font-bold capitalize ${
                tab === item ? "bg-accent text-primary-dark" : "bg-white/10 text-white/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "overview" && dashboard && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Clicks"
                value={dashboard.metrics.clicks.toLocaleString()}
                hint={`${dashboard.metrics.visitors.toLocaleString()} unique visitors`}
                icon={<MousePointerClick className="h-6 w-6" />}
              />
              <MetricCard
                label="Orders"
                value={dashboard.metrics.orders.toLocaleString()}
                hint={`${dashboard.metrics.conversionRate}% conversion rate`}
                icon={<ShoppingBag className="h-6 w-6" />}
              />
              <MetricCard
                label="Revenue"
                value={mad(dashboard.metrics.revenueMad)}
                hint={`${mad(dashboard.metrics.averageOrderValueMad)} AOV`}
                icon={<TrendingUp className="h-6 w-6" />}
              />
              <MetricCard
                label="Checkout Intent"
                value={dashboard.metrics.checkouts.toLocaleString()}
                hint={`${dashboard.metrics.checkoutRate}% click-to-checkout`}
                icon={<BarChart3 className="h-6 w-6" />}
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-xl">
                <h2 className="mb-5 text-xl font-bold">Daily performance</h2>
                <div className="flex h-72 items-end gap-2">
                  {dashboard.daily.map((day) => (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-xl bg-accent/80"
                        style={{ height: `${Math.max((day.clicks / maxClicks) * 100, 3)}%` }}
                        title={`${day.date}: ${day.clicks} clicks, ${day.orders} orders`}
                      />
                      <span className="hidden text-[10px] text-white/45 md:block">
                        {day.date.slice(5)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-xl">
                <h2 className="mb-4 text-xl font-bold">Traffic sources</h2>
                <div className="space-y-3">
                  {dashboard.sources.slice(0, 8).map((source) => (
                    <div key={source.source}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{source.source}</span>
                        <span className="text-white/55">{source.clicks} clicks</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-accent"
                          style={{
                            width: `${Math.max((source.clicks / dashboard.metrics.clicks) * 100, 4)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-xl">
              <h2 className="mb-4 text-xl font-bold">Product performance</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {dashboard.products.map((product) => (
                  <div key={product.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Package className="mb-3 h-5 w-5 text-accent" />
                    <p className="font-bold">{product.name}</p>
                    <p className="mt-2 text-sm text-white/55">
                      {product.orders} orders, {product.units} units
                    </p>
                    <p className="mt-3 text-lg font-bold text-accent">{mad(product.revenueMad)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-xl">
            <div className="grid grid-cols-[1.1fr_1fr_0.7fr_0.8fr_0.8fr_0.5fr] gap-3 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-[0.2em] text-white/45">
              <span>Order</span>
              <span>Customer</span>
              <span>Total</span>
              <span>Status</span>
              <span>Date</span>
              <span />
            </div>
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-[1.1fr_1fr_0.7fr_0.8fr_0.8fr_0.5fr] items-center gap-3 border-b border-white/10 px-5 py-4 text-sm last:border-0"
              >
                <div>
                  <p className="font-bold">{order.orderNumber}</p>
                  <p className="text-white/45">{order.items.length} items</p>
                </div>
                <div>
                  <p>{order.customerName}</p>
                  <p className="text-white/45">{order.phoneE164}</p>
                </div>
                <p className="font-bold text-accent">{mad(order.grandTotalMad)}</p>
                <StatusPill status={order.status} />
                <p className="text-white/55">{new Date(order.createdAt).toLocaleDateString()}</p>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 p-2 hover:bg-white/15"
                  aria-label="Preview order"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-[80] flex justify-end bg-black/60 p-4">
          <aside className="h-full w-full max-w-xl overflow-y-auto rounded-[2rem] bg-surface p-6 text-ink shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted">Order Preview</p>
                <h2 className="mt-1 text-2xl font-bold">{selectedOrder.orderNumber}</h2>
                <p className="mt-1 text-sm text-muted">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-bg p-2 text-muted hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-5 rounded-3xl bg-primary p-5 text-white">
              <p className="text-sm text-white/60">Customer</p>
              <p className="mt-2 text-xl font-bold">{selectedOrder.customerName}</p>
              <p className="mt-1 text-white/70">{selectedOrder.phoneE164}</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span>Total</span>
                <span className="text-2xl font-bold text-accent">
                  {mad(selectedOrder.grandTotalMad)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {selectedOrder.items.map((item) => (
                <div key={`${item.slug}-${item.source}`} className="rounded-2xl border border-border p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-bold">{item.internalName}</p>
                      <p className="font-arabic text-sm text-muted">{item.nameAr}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                        {item.source} · bundle {item.bundlePieces} · qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">{mad(item.lineTotalMad)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 rounded-3xl bg-bg p-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{mad(selectedOrder.subtotalMad)}</span>
              </div>
              <div className="flex justify-between">
                <span>Upsells</span>
                <span>{mad(selectedOrder.upsellTotalMad)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-bold">
                <span>Grand total</span>
                <span>{mad(selectedOrder.grandTotalMad)}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <h3 className="font-bold">Attribution</h3>
              <p className="rounded-2xl bg-bg p-3 text-sm text-muted">
                Source: {selectedOrder.utmSource ?? "direct"} /{" "}
                {selectedOrder.utmMedium ?? "none"}
                <br />
                Campaign: {selectedOrder.utmCampaign ?? "none"}
                <br />
                IP: {selectedOrder.clientIp ?? "unknown"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-bold">Sync status</h3>
              <div className="flex flex-wrap gap-2">
                <StatusPill status={`Sheets: ${selectedOrder.sheetSyncStatus}`} />
                <StatusPill status={`Meta: ${selectedOrder.metaCapiStatus ?? "pending"}`} />
                <StatusPill status={`TikTok: ${selectedOrder.tiktokCapiStatus ?? "pending"}`} />
                <StatusPill status={`Snap: ${selectedOrder.snapCapiStatus ?? "pending"}`} />
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
