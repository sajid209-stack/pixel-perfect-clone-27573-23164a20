import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { companyIndex } from "@/components/dse/data";

export const Route = createFileRoute("/market-depth")({
  head: () => ({
    meta: [
      { title: "Market Depth | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Top 10 buy and sell orders per instrument on the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "Market Depth | DSE" },
      {
        property: "og:description",
        content:
          "Order book depth — top 10 buy and sell orders per instrument.",
      },
    ],
  }),
  component: MarketDepthPage,
});

/* Deterministic pseudo-random from a string seed */
function seedFrom(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Row = { price: number; volume: number };
type Depth = {
  buy: Row[];
  sell: Row[];
  stats: {
    open: number;
    lastTrade: number;
    yClose: number;
    close: number;
    high: number;
    low: number;
    trades: number;
    totalVolume: number;
    totalValueMn: number;
  };
};

function buildDepth(code: string, base: number, nonce: number): Depth {
  const rnd = seedFrom(code + ":" + nonce);
  const tick = base > 100 ? 0.5 : 0.1;
  const buy: Row[] = [];
  const sell: Row[] = [];
  for (let i = 0; i < 10; i++) {
    const bp = +(base - tick * (i + 1) - rnd() * tick).toFixed(1);
    const sp = +(base + tick * (i + 1) + rnd() * tick).toFixed(1);
    buy.push({ price: bp, volume: Math.round(200 + rnd() * 9800) });
    sell.push({ price: sp, volume: Math.round(200 + rnd() * 9800) });
  }
  const high = +(base + tick * 3 + rnd()).toFixed(1);
  const low = +(base - tick * 4 - rnd()).toFixed(1);
  const totalVolume = Math.round(200000 + rnd() * 900000);
  const lastTrade = +(base - tick + rnd() * tick).toFixed(1);
  return {
    buy,
    sell,
    stats: {
      open: base,
      lastTrade,
      yClose: +(base + tick).toFixed(1),
      close: lastTrade,
      high,
      low,
      trades: Math.round(200 + rnd() * 1500),
      totalVolume,
      totalValueMn: +((totalVolume * lastTrade) / 1_000_000).toFixed(3),
    },
  };
}

function nf(n: number) {
  return n.toLocaleString("en-US");
}

function MarketDepthPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const matches = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return companyIndex
      .filter((c) => c.code.includes(q) || c.name.toUpperCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const selectedCo = useMemo(
    () => companyIndex.find((c) => c.code === selected) ?? null,
    [selected],
  );

  const depth = useMemo(
    () =>
      selectedCo
        ? buildDepth(selectedCo.code, selectedCo.price, nonce)
        : null,
    [selectedCo, nonce],
  );

  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <h1
          className="text-[26px] md:text-[32px] font-semibold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {t("Market Depth")}
        </h1>
        <p
          className="mt-2 text-[14px] md:text-[15px] leading-[1.6] max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {t(
            "Top 10 buy and sell orders for any listed instrument on the Dhaka Stock Exchange.",
          )}
        </p>
        <div
          className="mt-2 text-[11px]"
          style={{ color: "var(--text-secondary)" }}
        >
          {t(
            "Sample data for demonstration — live data will connect to the DSE API",
          )}
        </div>

        <div
          className="mt-5 rounded-md p-4 text-[13px] leading-[1.6] italic"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          <span className="font-semibold not-italic">Notice: </span>
          &quot;To get live top 10 buy and sell order, investors are requested
          to register with DSE–Mobile app or M-invest (Laptop/desktop).&quot;
        </div>

        {/* Instrument selector */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end gap-3">
          <div className="flex-1">
            <label
              className="block text-[12px] mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("Please select an instrument")}
            </label>
            <div className="relative max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type="text"
                value={selected && !query ? selected : query}
                onChange={(e) => {
                  setSelected(null);
                  setQuery(e.target.value);
                }}
                placeholder={t("Search trading code or company name")}
                className="w-full pl-9 pr-3 py-2 rounded-md text-[14px] outline-none"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              {!selected && matches.length > 0 && (
                <div
                  className="absolute z-10 mt-1 w-full rounded-md overflow-hidden"
                  style={{
                    background: "var(--surface-1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {matches.map((m) => (
                    <button
                      key={m.code}
                      onClick={() => {
                        setSelected(m.code);
                        setQuery("");
                        setNonce((n) => n + 1);
                      }}
                      className="block w-full text-left px-3 py-2 text-[13px] hover:opacity-80"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span className="font-medium">{m.code}</span>
                      <span
                        className="ml-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {m.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {selectedCo && (
            <div className="flex items-center gap-3">
              <div
                className="text-[13px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {t("Instrument")}:{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--brand-600)" }}
                >
                  {selectedCo.code}
                </span>
              </div>
              <button
                onClick={() => setNonce((n) => n + 1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] text-white"
                style={{ background: "var(--brand-600)" }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t("Refresh")}
              </button>
            </div>
          )}
        </div>

        {/* Order book */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["BUY", "SELL"] as const).map((side) => {
            const list =
              depth == null
                ? null
                : side === "BUY"
                  ? depth.buy
                  : depth.sell;
            return (
              <div
                key={side}
                className="rounded-md overflow-hidden"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="px-4 py-2.5 text-[13px] font-semibold text-center text-white"
                  style={{ background: "var(--brand-600)" }}
                >
                  {t(side === "BUY" ? "Buy" : "Sell")}
                </div>
                <table className="w-full text-[13px]">
                  <thead>
                    <tr
                      style={{
                        background: "var(--surface-2)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <th className="text-left px-4 py-2 font-normal text-[11px] uppercase tracking-wide">
                        {t(side === "BUY" ? "Buy Price" : "Sell Price")}
                      </th>
                      <th className="text-right px-4 py-2 font-normal text-[11px] uppercase tracking-wide">
                        {t(side === "BUY" ? "Buy Volume" : "Sell Volume")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((i) => {
                      const r = list?.[i];
                      return (
                        <tr
                          key={i}
                          style={{ borderTop: "1px solid var(--border)" }}
                        >
                          <td
                            className="px-4 py-2 tabular-nums"
                            style={{
                              color: r
                                ? "var(--text-primary)"
                                : "var(--text-muted)",
                            }}
                          >
                            {r ? r.price.toFixed(1) : "—"}
                          </td>
                          <td
                            className="px-4 py-2 text-right tabular-nums"
                            style={{
                              color: r
                                ? "var(--text-primary)"
                                : "var(--text-muted)",
                            }}
                          >
                            {r ? nf(r.volume) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

        {/* Price Statistics */}
        <div
          className="mt-6 rounded-md overflow-hidden"
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="px-4 py-2.5 text-[13px] font-semibold text-white"
            style={{ background: "var(--brand-600)" }}
          >
            {t("Price Statistics")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 p-4 text-[13px]">
            {[
              ["Open Price", depth?.stats.open.toFixed(1)],
              ["Day's High", depth?.stats.high.toFixed(1)],
              ["Last Trade Price", depth?.stats.lastTrade.toFixed(1)],
              ["Day's Low", depth?.stats.low.toFixed(1)],
              ["Yesterday Close Price", depth?.stats.yClose.toFixed(1)],
              ["No. of Trade", depth ? nf(depth.stats.trades) : undefined],
              ["Close Price", depth?.stats.close.toFixed(1)],
              [
                "Total Volume",
                depth ? nf(depth.stats.totalVolume) : undefined,
              ],
              [
                "Total Value (mn)",
                depth ? depth.stats.totalValueMn.toFixed(3) : undefined,
              ],
            ].map(([label, val], idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-1"
                style={{ borderBottom: "1px dashed var(--border)" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>
                  {t(label as string)}
                </span>
                <span
                  className="tabular-nums font-medium"
                  style={{
                    color: val
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                  }}
                >
                  {val ?? "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-3 inline-flex items-center gap-1.5 text-[11px]"
          style={{ color: "var(--text-muted)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--brand-600)" }}
          />
          {t("as provided by DSE")}
        </div>
      </main>
      <Footer />
    </div>
  );
}
