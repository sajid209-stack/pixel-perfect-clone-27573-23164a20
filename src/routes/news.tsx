import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText, Filter, Search, X } from "lucide-react";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { companies } from "@/data/companies";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Disclosures | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Live price-sensitive disclosures, dividend declarations, AGM notices and regulatory filings from listed companies on the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "News & Disclosures | Dhaka Stock Exchange" },
      {
        property: "og:description",
        content: "Live disclosures and filings from listed companies on the DSE.",
      },
    ],
  }),
  component: NewsPage,
});

type DisclosureType = "Price sensitive" | "Dividend" | "AGM notice" | "Regulatory";

type Disclosure = {
  id: string;
  code: string;
  name: string;
  sector: string;
  type: DisclosureType;
  date: string;
  time: string;
  summary: string;
  body: string;
};

/* Flatten recentAnnouncements from the company dataset and add a few editorial entries */
function buildFeed(): Disclosure[] {
  const fromCompanies: Disclosure[] = [];
  let id = 0;
  for (const co of companies) {
    for (const a of co.recentAnnouncements ?? []) {
      fromCompanies.push({
        id: `c-${id++}`,
        code: co.code,
        name: co.name,
        sector: co.sector,
        type: a.type as DisclosureType,
        date: a.date,
        time: `${10 + (id % 5)}:${(15 + (id * 7) % 45).toString().padStart(2, "0")}`,
        summary: a.summary,
        body:
          a.summary +
          ". Full disclosure text would appear here, including financial details, board resolutions and any relevant attachments filed with the BSEC and submitted to the Dhaka Stock Exchange.",
      });
    }
  }
  const extra: Disclosure[] = [
    {
      id: "x-1",
      code: "BEXIMCO",
      name: "Beximco Ltd",
      sector: "Conglomerate",
      type: "Price sensitive",
      date: "Jun 05",
      time: "11:42",
      summary: "Subsidiary Beximco Pharma signs MoU with Aspen South Africa for vaccine fill-finish capacity.",
      body: "Beximco Limited disclosed today that its pharmaceutical subsidiary has entered into a Memorandum of Understanding with Aspen South Africa for a vaccine fill-finish partnership. The arrangement is expected to add up to USD 14M of annualised revenue over a 24-month ramp.",
    },
    {
      id: "x-2",
      code: "ACI",
      name: "ACI Limited",
      sector: "Consumer",
      type: "Dividend",
      date: "Jun 05",
      time: "10:08",
      summary: "Board recommends final cash dividend of 30% for FY2025; record date set for June 22.",
      body: "The Board of Directors at its meeting held on June 5, 2026 recommended a final cash dividend of 30% (BDT 3 per share of BDT 10 face value) for the year ended March 31, 2026.",
    },
    {
      id: "x-3",
      code: "OLYMPIC",
      name: "Olympic Industries",
      sector: "Food & Beverage",
      type: "AGM notice",
      date: "Jun 04",
      time: "16:30",
      summary: "33rd AGM scheduled for July 14, 2026 via digital platform; record date June 26.",
      body: "Notice is hereby given that the 33rd Annual General Meeting of Olympic Industries Limited will be held on Tuesday, July 14, 2026 at 11:00 AM through a digital platform in accordance with BSEC directive.",
    },
    {
      id: "x-4",
      code: "BSRMSTEEL",
      name: "BSRM Steel",
      sector: "Engineering",
      type: "Regulatory",
      date: "Jun 04",
      time: "14:55",
      summary: "BSEC clarification: no undisclosed information behind recent price movement.",
      body: "In response to a query from the Dhaka Stock Exchange regarding unusual price movement, BSRM Steel Limited confirms that there is no undisclosed price-sensitive information that may have any impact on the share price.",
    },
  ];
  return [...extra, ...fromCompanies];
}

const typeMeta: Record<DisclosureType, { color: string; bg: string }> = {
  "Price sensitive": { color: "var(--red-down)", bg: "rgba(232,136,154,0.10)" },
  Dividend: { color: "var(--green-up)", bg: "rgba(127,217,176,0.10)" },
  "AGM notice": { color: "#7fbcd9", bg: "rgba(127,188,217,0.10)" },
  Regulatory: { color: "#f0c674", bg: "rgba(240,198,116,0.10)" },
};

const types: ("All" | DisclosureType)[] = [
  "All",
  "Price sensitive",
  "Dividend",
  "AGM notice",
  "Regulatory",
];

function NewsPage() {
  const all = useMemo(() => buildFeed(), []);
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(all[0]?.id ?? "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((d) => {
      if (type !== "All" && d.type !== type) return false;
      if (q && !(d.code.toLowerCase().includes(q) || d.name.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q)))
        return false;
      return true;
    });
  }, [all, type, query]);

  const selected = useMemo(
    () => filtered.find((d) => d.id === selectedId) ?? filtered[0],
    [filtered, selectedId],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: all.length };
    for (const t of types) {
      if (t === "All") continue;
      c[t] = all.filter((d) => d.type === t).length;
    }
    return c;
  }, [all]);

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      {/* Hero */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 pt-10 pb-8">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            News · Disclosures
          </div>
          <div className="text-[11px] mb-4" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
          <div>
            <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
              The newsroom<br />of the exchange.
            </h1>
            <p className="mt-4 text-[15px] max-w-[560px]" style={{ color: "var(--text-secondary)" }}>
              Every price-sensitive disclosure, dividend declaration, AGM notice and regulatory
              filing from listed companies — as it arrives at the exchange.
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section
        className="sticky top-[104px] z-30"
        style={{
          background: "rgb(var(--surface-rgb) / 0.85)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgb(var(--ov) / 0.06)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center gap-2 flex-wrap">
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
              placeholder="Search ticker, company or keyword…"
              className="flex-1 bg-transparent outline-none placeholder:opacity-60"
              style={{ color: "var(--text-primary)" }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="opacity-60 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {types.map((t) => {
              const active = t === type;
              return (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="relative px-3 h-8 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition"
                  style={{ color: active ? "#07090A" : "var(--text-secondary)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="newsTab"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--green-up)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                  <span
                    className="relative text-[10px] tnum px-1.5 py-0.5 rounded-full"
                    style={{ background: active ? "rgba(7,9,10,0.15)" : "rgb(var(--ov) / 0.06)" }}
                  >
                    {counts[t] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex-1" />
          <div className="text-[12px] tnum flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
            <Filter className="w-3 h-3" /> {filtered.length} disclosure{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      {/* Feed + detail */}
      <section className="max-w-[1440px] mx-auto px-6 py-8 grid lg:grid-cols-[1.1fr_1fr] gap-6">
        {/* Feed */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <ul className="max-h-[760px] overflow-auto">
            <AnimatePresence initial={false}>
              {filtered.map((d, i) => {
                const active = selected?.id === d.id;
                const meta = typeMeta[d.type];
                return (
                  <motion.li
                    key={d.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, delay: Math.min(i * 0.012, 0.18) }}
                  >
                    <button
                      onClick={() => setSelectedId(d.id)}
                      className="w-full text-left px-5 py-4 transition flex gap-4 relative"
                      style={{
                        background: active ? "rgb(var(--ov) / 0.04)" : "transparent",
                        borderBottom:
                          i === filtered.length - 1 ? "none" : "1px solid rgb(var(--ov) / 0.05)",
                      }}
                    >
                      {active && (
                        <motion.span
                          layoutId="newsActive"
                          className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
                          style={{ background: "var(--green-up)" }}
                        />
                      )}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 tnum"
                        style={{
                          background: "rgb(var(--ov) / 0.05)",
                          border: "1px solid rgb(var(--ov) / 0.06)",
                        }}
                      >
                        {d.code.slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[10px] uppercase tracking-[0.16em] font-medium px-1.5 py-0.5 rounded"
                            style={{ background: meta.bg, color: meta.color }}
                          >
                            {d.type}
                          </span>
                          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                            {d.code} · {d.date} · {d.time}
                          </span>
                        </div>
                        <div
                          className="text-[13.5px] leading-[1.55] line-clamp-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {d.summary}
                        </div>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
              No disclosures match your filters.
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-[170px] self-start">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.article
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-7"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.6)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-[10.5px] uppercase tracking-[0.18em] font-medium px-2 py-0.5 rounded"
                    style={{
                      background: typeMeta[selected.type].bg,
                      color: typeMeta[selected.type].color,
                    }}
                  >
                    {selected.type}
                  </span>
                  <span className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                    Filed {selected.date} · {selected.time}
                  </span>
                </div>

                <Link
                  to="/company/$ticker"
                  params={{ ticker: selected.code }}
                  className="group inline-flex items-baseline gap-2 mb-1"
                >
                  <span className="text-[26px] font-semibold tracking-tight">{selected.code}</span>
                  <span
                    className="text-[13px] group-hover:text-[color:var(--green-up)] transition"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {selected.name}
                  </span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition"
                    style={{ color: "var(--green-up)" }}
                  />
                </Link>
                <div className="text-[11.5px] mb-6" style={{ color: "var(--text-muted)" }}>
                  {selected.sector}
                </div>

                <h2 className="text-[18px] font-semibold leading-[1.35] mb-4">{selected.summary}</h2>
                <p className="text-[13.5px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
                  {selected.body}
                </p>

                <div className="mt-7 pt-5 flex items-center justify-between" style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}>
                  <button
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                  <Link
                    to="/company/$ticker"
                    params={{ ticker: selected.code }}
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[12.5px] font-semibold"
                    style={{ background: "var(--green-up)", color: "#07090A" }}
                  >
                    Open {selected.code} <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
