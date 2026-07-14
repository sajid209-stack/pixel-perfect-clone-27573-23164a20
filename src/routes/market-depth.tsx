import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, RefreshCw, X, ChevronDown, CornerDownLeft } from "lucide-react";
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

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark
        style={{
          background: "color-mix(in oklab, var(--brand-600) 20%, transparent)",
          color: "inherit",
          padding: 0,
        }}
      >
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
}

function MarketDepthPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toUpperCase();
    const src = q
      ? companyIndex.filter(
          (c) => c.code.includes(q) || c.name.toUpperCase().includes(q),
        )
      : companyIndex;
    return src.slice(0, 8);
  }, [query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query, open]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

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

  const pick = (code: string) => {
    setSelected(code);
    setQuery("");
    setOpen(false);
    setNonce((n) => n + 1);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIdx((i) => Math.min(matches.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const m = matches[activeIdx];
      if (m) pick(m.code);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

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
              htmlFor="md-instrument"
              className="block text-[12px] mb-1.5 font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("Please select an instrument")}
            </label>
            <div ref={wrapRef} className="relative max-w-md">
              <div
                className="flex items-center rounded-md transition-all"
                style={{
                  background: "var(--surface-1)",
                  border: `1px solid ${open ? "var(--brand-600)" : "var(--border)"}`,
                  boxShadow: open
                    ? "0 0 0 3px color-mix(in oklab, var(--brand-600) 18%, transparent)"
                    : "none",
                }}
              >
                <Search
                  className="ml-3 w-4 h-4 shrink-0"
                  style={{ color: open ? "var(--brand-600)" : "var(--text-muted)" }}
                />
                <input
                  id="md-instrument"
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded={open}
                  aria-controls="md-instrument-list"
                  aria-autocomplete="list"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={onKeyDown}
                  placeholder={
                    selectedCo
                      ? `${selectedCo.code} — ${selectedCo.name}`
                      : t("Search trading code or company name")
                  }
                  className="flex-1 min-w-0 bg-transparent px-2.5 py-2.5 text-[14px] outline-none placeholder:opacity-70"
                  style={{ color: "var(--text-primary)" }}
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    aria-label={t("Clear")}
                    className="mr-1 p-1.5 rounded hover:opacity-70"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <ChevronDown
                    className="mr-2.5 w-4 h-4 transition-transform"
                    style={{
                      color: "var(--text-muted)",
                      transform: open ? "rotate(180deg)" : "none",
                    }}
                  />
                )}
              </div>

              {open && (
                <div
                  id="md-instrument-list"
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-md overflow-hidden"
                  style={{
                    background: "var(--surface)",
                    backdropFilter: "none",
                    border: "1px solid var(--border)",
                    boxShadow:
                      "0 10px 30px -12px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.12)",
                  }}
                >
                  <div
                    className="px-3 py-1.5 text-[10px] uppercase tracking-wider flex items-center justify-between"
                    style={{
                      color: "var(--text-muted)",
                      background: "var(--surface-2)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span>{query ? t("Matches") : t("Popular instruments")}</span>
                    <span>{matches.length}</span>
                  </div>
                  {matches.length === 0 ? (
                    <div
                      className="px-3 py-6 text-center text-[13px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t("No instruments match")} “{query}”
                    </div>
                  ) : (
                    <ul className="max-h-72 overflow-auto">
                      {matches.map((m, i) => {
                        const active = i === activeIdx;
                        return (
                          <li key={m.code}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={active}
                              onMouseEnter={() => setActiveIdx(i)}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => pick(m.code)}
                              className="w-full text-left px-3 py-2 flex items-center gap-3 transition-colors"
                              style={{
                                background: active
                                  ? "color-mix(in oklab, var(--brand-600) 10%, transparent)"
                                  : "transparent",
                              }}
                            >
                              <span
                                className="inline-flex items-center justify-center w-9 h-9 rounded text-[11px] font-bold tabular-nums shrink-0"
                                style={{
                                  background: "var(--surface-2)",
                                  color: "var(--brand-600)",
                                  border: "1px solid var(--border)",
                                }}
                              >
                                {m.code.slice(0, 2)}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span
                                  className="block text-[13px] font-semibold truncate"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {highlight(m.code, query)}
                                </span>
                                <span
                                  className="block text-[11px] truncate"
                                  style={{ color: "var(--text-secondary)" }}
                                >
                                  {highlight(m.name, query)} · {m.sector}
                                </span>
                              </span>
                              <span
                                className="text-[12px] tabular-nums font-medium shrink-0"
                                style={{ color: "var(--text-primary)" }}
                              >
                                ৳{m.price.toFixed(1)}
                              </span>
                              {active && (
                                <CornerDownLeft
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={{ color: "var(--brand-600)" }}
                                />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <div
                    className="px-3 py-1.5 text-[10px] flex items-center gap-3"
                    style={{
                      color: "var(--text-muted)",
                      background: "var(--surface-2)",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <span>↑↓ {t("navigate")}</span>
                    <span>↵ {t("select")}</span>
                    <span>esc {t("close")}</span>
                  </div>
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
