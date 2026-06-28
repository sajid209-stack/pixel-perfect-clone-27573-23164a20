import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight, ChevronDown, Info, Search, SlidersHorizontal, Star, X } from "lucide-react";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHeroSlider, DEFAULT_HERO_SLIDES } from "@/components/dse/PageHeroSlider";
import { StarButton } from "@/components/dse/StarButton";
import { CategoryBadge } from "@/components/dse/CategoryBadge";
import { useWatchlist, useRecentlyViewed } from "@/lib/userPrefs";
import { companies, findCompany, formatBDT, formatVolume, type Company } from "@/data/companies";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "Stock Screener — All listed companies | DSE" },
      {
        name: "description",
        content:
          "Browse, filter and sort every company listed on the Dhaka Stock Exchange by sector, board, price, P/E, dividend yield and market cap.",
      },
      { property: "og:title", content: "Stock Screener — All listed companies | DSE" },
      {
        property: "og:description",
        content: "Browse, filter and sort listed companies on the Dhaka Stock Exchange.",
      },
    ],
  }),
  component: ScreenerPage,
});

type SortKey =
  | "code"
  | "price"
  | "changePct"
  | "volume"
  | "marketCap"
  | "pe"
  | "dividendYield";

const columns: { key: SortKey; label: string; align: "left" | "right"; w: string }[] = [
  { key: "code", label: "Code / Name", align: "left", w: "min-w-[240px]" },
  { key: "price", label: "Price", align: "right", w: "w-[110px]" },
  { key: "changePct", label: "Change", align: "right", w: "w-[120px]" },
  { key: "volume", label: "Volume", align: "right", w: "w-[110px]" },
  { key: "marketCap", label: "Market Cap", align: "right", w: "w-[140px]" },
  { key: "pe", label: "P/E", align: "right", w: "w-[80px]" },
  { key: "dividendYield", label: "Div Yield", align: "right", w: "w-[100px]" },
];

const sectors = ["All", ...Array.from(new Set(companies.map((c) => c.sector)))];
const boards = ["All", ...Array.from(new Set(companies.map((c) => c.board)))];
const movers = ["All", "Gainers", "Losers"] as const;
const categories = ["All", "A", "B", "N", "Z"] as const;

function ScreenerPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string>("All");
  const [board, setBoard] = useState<string>("All");
  const [mover, setMover] = useState<(typeof movers)[number]>("All");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [watchOnly, setWatchOnly] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "marketCap",
    dir: "desc",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const { items: watchItems, has: isWatched } = useWatchlist();
  const { items: recentItems } = useRecentlyViewed();

  const filtered: Company[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = companies.filter((c) => {
      if (sector !== "All" && c.sector !== sector) return false;
      if (board !== "All" && c.board !== board) return false;
      if (mover === "Gainers" && c.changePct <= 0) return false;
      if (mover === "Losers" && c.changePct >= 0) return false;
      if (category !== "All" && c.category !== category) return false;
      if (watchOnly && !isWatched(c.code)) return false;
      if (q && !(c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)))
        return false;
      return true;
    });
    rows = [...rows].sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      if (typeof va === "string" && typeof vb === "string") {
        return sort.dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sort.dir === "asc"
        ? (va as number) - (vb as number)
        : (vb as number) - (va as number);
    });
    return rows;
  }, [query, sector, board, mover, category, watchOnly, isWatched, sort]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const gainers = filtered.filter((c) => c.changePct > 0).length;
    const losers = filtered.filter((c) => c.changePct < 0).length;
    const totalCap = filtered.reduce((s, c) => s + c.marketCap, 0);
    const totalVol = filtered.reduce((s, c) => s + c.volume, 0);
    return { total, gainers, losers, totalCap, totalVol };
  }, [filtered]);

  const toggleSort = (key: SortKey) => {
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" },
    );
  };

  const activeFilters =
    (sector !== "All" ? 1 : 0) +
    (board !== "All" ? 1 : 0) +
    (mover !== "All" ? 1 : 0) +
    (category !== "All" ? 1 : 0) +
    (watchOnly ? 1 : 0) +
    (query ? 1 : 0);

  const reset = () => {
    setQuery("");
    setSector("All");
    setBoard("All");
    setMover("All");
    setCategory("All");
    setWatchOnly(false);
  };

  const recents = useMemo(
    () => recentItems.map((c) => findCompany(c)).filter((x): x is Company => !!x),
    [recentItems],
  );

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />
      <PageHeroSlider slides={DEFAULT_HERO_SLIDES} />

      {/* Hero */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 pt-10 pb-8">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            Companies · Screener
          </div>
          <div className="text-[11px] mb-4" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
                All listed companies
              </h1>
              <p className="mt-3 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
                Filter and sort every equity on the Dhaka Stock Exchange. Click any row to open the
                full company profile.
              </p>
            </div>
            <StatGrid stats={stats} />
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[104px] z-30" style={{
        background: "rgb(var(--surface-rgb) / 0.85)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgb(var(--ov) / 0.06)",
      }}>
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center gap-3 flex-wrap">
          <div
            className="flex items-center gap-2 h-9 pl-3 pr-3 rounded-full text-[13px] min-w-[260px] flex-1 max-w-md"
            style={{
              background: "rgb(var(--ov) / 0.04)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ticker or company name…"
              className="flex-1 bg-transparent outline-none placeholder:opacity-60"
              style={{ color: "var(--text-primary)" }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="opacity-60 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <Pill label="Sector" value={sector} options={sectors} onChange={setSector} />
          <Pill label="Board" value={board} options={boards} onChange={setBoard} />
          <SegPill value={mover} options={[...movers]} onChange={(v) => setMover(v as typeof mover)} />
          <CategoryChips value={category} onChange={setCategory} />

          <button
            type="button"
            onClick={() => setWatchOnly((v) => !v)}
            className="h-9 px-3 rounded-full text-[12px] flex items-center gap-1.5 transition"
            style={{
              background: watchOnly ? "rgba(245,179,0,0.12)" : "rgb(var(--ov) / 0.04)",
              border: `1px solid ${watchOnly ? "rgba(245,179,0,0.45)" : "rgb(var(--ov) / 0.06)"}`,
              color: watchOnly ? "#f5b300" : "var(--text-secondary)",
            }}
            aria-pressed={watchOnly}
            title="Show only watchlisted companies"
          >
            <Star className="w-3 h-3" fill={watchOnly ? "#f5b300" : "none"} />
            Watchlist {watchItems.length > 0 ? `· ${watchItems.length}` : ""}
          </button>

          <div className="flex-1" />

          {activeFilters > 0 && (
            <button
              onClick={reset}
              className="h-9 px-3 rounded-full text-[12px] flex items-center gap-1.5 transition"
              style={{
                background: "rgb(var(--ov) / 0.04)",
                border: "1px solid rgb(var(--ov) / 0.06)",
                color: "var(--text-secondary)",
              }}
            >
              <SlidersHorizontal className="w-3 h-3" />
              Reset {activeFilters}
            </button>
          )}
          <div className="text-[12px] tnum" style={{ color: "var(--text-muted)" }}>
            {filtered.length} of {companies.length}
          </div>
        </div>

        <CategoriesExplained />
      </section>



      {/* Recently viewed */}
      {recents.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 pt-5">
          <div
            className="text-[11px] uppercase tracking-[0.18em] mb-2"
            style={{ color: "var(--text-muted)" }}
          >
            Recently viewed
          </div>
          <div className="flex flex-wrap gap-2">
            {recents.map((c) => (
              <Link
                key={c.code}
                to="/company/$ticker"
                params={{ ticker: c.code }}
                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[12px] transition"
                style={{
                  background: "rgb(var(--ov) / 0.04)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                  color: "var(--text-secondary)",
                }}
              >
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{c.code}</span>
                <CategoryBadge category={c.category} size="xs" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Table */}
      <section className="max-w-[1440px] mx-auto px-6 py-8">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{
                    color: "var(--text-muted)",
                    borderBottom: "1px solid rgb(var(--ov) / 0.06)",
                  }}
                >
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 ${col.w} ${col.align === "right" ? "text-right" : "text-left"}`}
                    >
                      <button
                        onClick={() => toggleSort(col.key)}
                        className={`inline-flex items-center gap-1 hover:text-[color:var(--text-primary)] transition ${col.align === "right" ? "flex-row-reverse" : ""}`}
                      >
                        {col.label}
                        {sort.key === col.key ? (
                          sort.dir === "asc" ? (
                            <ArrowUp className="w-3 h-3" style={{ color: "var(--primary)" }} />
                          ) : (
                            <ArrowDown className="w-3 h-3" style={{ color: "var(--primary)" }} />
                          )
                        ) : (
                          <span className="w-3 h-3 inline-block opacity-0" />
                        )}
                      </button>
                    </th>
                  ))}
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={`sk-${i}`} style={{ borderBottom: "1px solid rgb(var(--ov) / 0.04)" }}>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="skeleton w-9 h-9 rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <div className="skeleton h-3 w-20" />
                            <div className="skeleton h-2.5 w-40" />
                          </div>
                        </div>
                      </td>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-4 py-3.5">
                          <div className="skeleton h-3 w-16 ml-auto" />
                        </td>
                      ))}
                      <td />
                    </tr>
                  ))
                ) : (
                <AnimatePresence initial={false}>
                  {filtered.map((c, idx) => {
                    const up = c.changePct >= 0;
                    return (
                      <motion.tr
                        key={c.code}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18, delay: Math.min(idx * 0.012, 0.2) }}
                        className="group cursor-pointer transition"
                        style={{
                          borderBottom:
                            idx === filtered.length - 1
                              ? "none"
                              : "1px solid rgb(var(--ov) / 0.04)",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgb(var(--ov) / 0.03)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <StarButton code={c.code} size={13} />
                            <Link
                              to="/company/$ticker"
                              params={{ ticker: c.code }}
                              className="block flex-1 min-w-0"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                                  style={{
                                    background: "rgb(var(--ov) / 0.05)",
                                    color: "var(--text-primary)",
                                    border: "1px solid rgb(var(--ov) / 0.06)",
                                  }}
                                >
                                  {c.code.slice(0, 2)}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-semibold tracking-tight">{c.code}</span>
                                    <CategoryBadge category={c.category} size="xs" />
                                  </div>
                                  <div className="text-[11.5px] truncate" style={{ color: "var(--text-muted)" }}>
                                    {c.name} · {c.sector}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right tnum font-medium">
                          ৳ {c.price.toLocaleString(undefined, { minimumFractionDigits: c.price < 100 ? 2 : 1 })}
                        </td>
                        <td className="px-4 py-3.5 text-right tnum">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium"
                            style={{
                              background: up ? "rgb(var(--brand-tint) / 0.10)" : "rgba(255,90,108,0.10)",
                              color: up ? "var(--green-up)" : "var(--red-down)",
                            }}
                          >
                            {up ? "+" : ""}
                            {c.changePct.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right tnum" style={{ color: "var(--text-secondary)" }}>
                          {formatVolume(c.volume)}
                        </td>
                        <td className="px-4 py-3.5 text-right tnum" style={{ color: "var(--text-secondary)" }}>
                          {formatBDT(c.marketCap)}
                        </td>
                        <td className="px-4 py-3.5 text-right tnum" style={{ color: "var(--text-secondary)" }}>
                          {c.pe.toFixed(1)}
                        </td>
                        <td className="px-4 py-3.5 text-right tnum" style={{ color: "var(--text-secondary)" }}>
                          {c.dividendYield.toFixed(1)}%
                        </td>
                        <td className="px-2 py-3.5 text-right">
                          <ArrowUpRight
                            className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition"
                            style={{ color: "var(--primary)" }}
                          />
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
                No companies match your filters.
              </div>
              <button
                onClick={reset}
                className="mt-3 text-[12px] underline"
                style={{ color: "var(--primary)" }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-10">
        <div className="rounded-md p-5" style={{ background: "var(--surface)", border: "1px solid var(--line)" }} data-cms="companies.views">
          <h2 className="text-[16px] font-semibold mb-3" style={{ color: "var(--ink)" }}>Browse Companies</h2>
          <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-2 text-[13px]">
            {[
              { label: "Sector-wise list", href: "?view=sector" },
              { label: "Companies by Category", href: "?view=category" },
              { label: "Closed / Non-operational Companies", href: "?view=closed" },
            ].map((i) => (
              <li key={i.label}>
                <a href={i.href} className="hover:underline" style={{ color: "var(--brand-600)" }}>{i.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatGrid({ stats }: { stats: { total: number; gainers: number; losers: number; totalCap: number; totalVol: number } }) {
  const items = [
    { label: "Companies", value: stats.total.toString() },
    { label: "Advancing", value: stats.gainers.toString(), tone: "up" as const },
    { label: "Declining", value: stats.losers.toString(), tone: "down" as const },
    { label: "Total market cap", value: formatBDT(stats.totalCap) },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden"
      style={{ background: "rgb(var(--ov) / 0.06)" }}>
      {items.map((it) => (
        <div key={it.label} className="px-4 py-3 min-w-[110px]" style={{ background: "var(--page-bg)" }}>
          <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            {it.label}
          </div>
          <div
            className="mt-1 text-[18px] font-semibold tnum tracking-tight"
            style={{
              color:
                it.tone === "up"
                  ? "var(--green-up)"
                  : it.tone === "down"
                    ? "var(--red-down)"
                    : "var(--text-primary)",
            }}
          >
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoryChips({
  value,
  onChange,
}: {
  value: (typeof categories)[number];
  onChange: (v: (typeof categories)[number]) => void;
}) {
  return (
    <div
      className="h-9 p-0.5 rounded-full flex items-center gap-0.5"
      style={{ background: "rgb(var(--ov) / 0.04)", border: "1px solid rgb(var(--ov) / 0.06)" }}
    >
      <span className="px-2 text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        Cat
      </span>
      {categories.map((c) => {
        const active = c === value;
        const danger = c === "Z";
        const bg = active
          ? danger
            ? "rgba(217,65,94,0.18)"
            : "rgb(var(--ov) / 0.10)"
          : "transparent";
        const color = active
          ? danger
            ? "var(--red-down)"
            : "var(--text-primary)"
          : "var(--text-secondary)";
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="px-2.5 h-full text-[11.5px] font-medium rounded-full tnum transition"
            style={{ background: bg, color, minWidth: c === "All" ? 38 : 26 }}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

function Pill({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label
      className="h-9 px-3 rounded-full text-[12.5px] flex items-center gap-2 transition cursor-pointer"
      style={{
        background: value !== "All" ? "rgb(var(--brand-tint) / 0.08)" : "rgb(var(--ov) / 0.04)",
        border: `1px solid ${value !== "All" ? "rgb(var(--brand-tint) / 0.4)" : "rgb(var(--ov) / 0.06)"}`,
        color: "var(--text-secondary)",
      }}
    >
      <span className="opacity-70">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none font-medium cursor-pointer pr-1"
        style={{ color: "var(--text-primary)" }}
      >
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "var(--page-bg)" }}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function SegPill({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="h-9 p-0.5 rounded-full flex items-center gap-0.5"
      style={{
        background: "rgb(var(--ov) / 0.04)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            className="relative px-3 h-full text-[12px] font-medium rounded-full transition"
            style={{ color: active ? "var(--primary-foreground)" : "var(--text-secondary)" }}
          >
            {active && (
              <motion.span
                layoutId="segPill"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--primary)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{o}</span>
          </button>
        );
      })}
    </div>
  );
}

const CATEGORY_EXPLAINERS: { key: string; title: string; body: string }[] = [
  {
    key: "A",
    title: "A-Category Companies",
    body: "Companies which are regular in holding the annual general meetings and have declared dividend at the rate of ten percent or more in the last English calendar year.",
  },
  {
    key: "B",
    title: "B-Category Companies",
    body: "Companies which are regular in holding the annual general meetings but have failed to declare dividend at least at the rate of ten percent in the last English calendar year.",
  },
  {
    key: "G",
    title: "G-Category Companies",
    body: "Green-field companies of which shares are listed with the DSE before the company goes into commercial operation and prior to listing the said company declares the year of first declaration of dividend.",
  },
  {
    key: "N",
    title: "N-Category Companies",
    body: "Newly listed companies except green-field companies which shall be transferred to other categories in accordance with their first dividend declaration and respective compliance after listing of their shares.",
  },
  {
    key: "Z",
    title: "Z-Category Companies",
    body: 'Any listed company shall be shifted to "Z-category" immediately if: it fails to declare cash dividend for 2 consecutive years; fails to hold its AGM within the stipulated time; is not in operation/production for a minimum of 6 months (excluding renovation/BMRE or force majeure); reports net operating loss or negative operating cash flows for 2 consecutive years; or negative retained earnings exceed its paid-up capital.',
  },
];

function CategoriesExplained() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] transition"
        style={{
          background: "rgb(var(--ov) / 0.04)",
          border: "1px solid rgb(var(--ov) / 0.06)",
          color: "var(--text-secondary)",
        }}
        aria-expanded={open}
      >
        <Info className="w-3 h-3" />
        Categories explained
        <ChevronDown
          className="w-3 h-3 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 p-4 rounded-2xl grid gap-3 md:grid-cols-2"
              style={{
                background: "rgb(var(--ov) / 0.03)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              {CATEGORY_EXPLAINERS.map((c) => (
                <div key={c.key} className="flex gap-3">
                  <CategoryBadge category={c.key as never} size="xs" />
                  <div className="min-w-0">
                    <div
                      className="text-[12.5px] font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {c.title}
                    </div>
                    <p
                      className="text-[12px] leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {c.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
