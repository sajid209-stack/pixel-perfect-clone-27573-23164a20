import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHeroSlider, DEFAULT_HERO_SLIDES } from "@/components/dse/PageHeroSlider";
import { topGainers, topLosers, mostActive, sectors } from "@/components/dse/data";

export const Route = createFileRoute("/markets")({
  head: () => ({
    meta: [
      { title: "Market Statistics | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Full market statistics for the Dhaka Stock Exchange — movers, circuit breakers, margin-financeable securities, sector P/E, block trades, foreign trade summary and trading calendar.",
      },
      { property: "og:title", content: "Market Statistics | DSE" },
      { property: "og:description", content: "Complete daily market statistics from the Dhaka Stock Exchange." },
    ],
  }),
  component: MarketsPage,
});

/* ────────── shared table primitives ────────── */
function DataTable({
  headers,
  align,
  children,
}: {
  headers: string[];
  align?: ("left" | "right")[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
      <table className="w-full text-[13px]">
        <thead>
          <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
            {headers.map((h, i) => (
              <th
                key={h}
                className="px-3 py-2 text-[11px] font-semibold uppercase"
                style={{
                  textAlign: (align?.[i] ?? "left"),
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function ChangeCell({ v }: { v: number }) {
  const up = v >= 0;
  return (
    <span
      className="tnum font-semibold"
      style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}
    >
      {up ? "▲" : "▼"} {Math.abs(v).toFixed(2)}%
    </span>
  );
}

const zebra = (i: number) =>
  i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent";

/* ────────── sections ────────── */
const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "movers", label: "Movers" },
  { id: "circuit", label: "Circuit breakers" },
  { id: "margin", label: "Margin financeable" },
  { id: "pe", label: "Sector P/E" },
  { id: "blocks", label: "Block trades" },
  { id: "foreign", label: "Foreign trade" },
  { id: "sessions", label: "Sessions & calendar" },
];

function MarketsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />
      <PageHeroSlider slides={DEFAULT_HERO_SLIDES} containerClassName="max-w-[1200px] mx-auto px-6 pt-6 m-0" />

      {/* Header */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            Daily statistics
          </div>
          <h1
            className="text-[28px] md:text-[34px] font-semibold tracking-tight leading-[1.1]"
            style={{ color: "var(--ink)" }}
          >
            Market Statistics
          </h1>
          <p className="mt-2 text-[13.5px]" style={{ color: "var(--text-secondary)" }}>
            Live market statistics, indices, movers and sector performance — as provided by DSE.
          </p>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/markets/at-a-glance"
              className="inline-flex items-center px-3 h-8 text-[12px] font-semibold rounded-md text-white"
              style={{ background: "var(--brand-600)" }}
            >
              Market at a Glance →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-8 grid lg:grid-cols-[200px_minmax(0,1fr)] gap-8">
        {/* Sticky left rail */}
        <aside className="hidden lg:block">
          <nav
            className="sticky top-[120px] text-[13px]"
            style={{ borderLeft: "1px solid var(--line)" }}
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-4 py-2 hover:bg-[var(--surface-2)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 space-y-12">
          <SummarySection />
          <MoversSection />
          <CircuitBreakersSection />
          <MarginFinanceableSection />
          <SectorPESection />
          <BlockTradesSection />
          <ForeignTradeSection />
          <SessionsSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ────────── 1. Summary metric strip ────────── */
function SummarySection() {
  const metrics: { label: string; value: string; sub?: string; change?: number }[] = [
    { label: "DSEX", value: "6,241.30", change: 0.30 },
    { label: "DS30", value: "2,118.40", change: 0.18 },
    { label: "DSES", value: "1,340.20", change: -0.05 },
    { label: "Turnover", value: "৳1,124 Cr", sub: "312.4M shares" },
    { label: "Volume", value: "312.4M" },
    { label: "Trades", value: "184,219" },
    { label: "Market cap", value: "৳6.92 L Cr" },
    { label: "Breadth", value: "188 / 142", sub: "adv / dec" },
  ];
  return (
    <Section id="summary" title="Market summary">
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      >
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="px-4 py-3.5"
            style={{
              borderRight: (i + 1) % 4 !== 0 ? "1px solid var(--line)" : "none",
              borderTop: i >= 4 ? "1px solid var(--line)" : "none",
            }}
          >
            <div className="text-[10px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--text-muted)" }}>
              {m.label}
            </div>
            <div className="mt-1 tnum text-[18px] font-semibold leading-none" style={{ color: "var(--ink)" }}>
              {m.value}
            </div>
            {typeof m.change === "number" ? (
              <div className="mt-1.5 text-[12px]"><ChangeCell v={m.change} /></div>
            ) : (
              <div className="mt-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>{m.sub ?? "\u00a0"}</div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ────────── 2. Movers ────────── */
type MoverKey = "gainers" | "losers" | "active-value" | "active-volume";
const moverTabs: { key: MoverKey; label: string }[] = [
  { key: "gainers", label: "Top 10 Gainers" },
  { key: "losers", label: "Top 10 Losers" },
  { key: "active-value", label: "Most Active by Value" },
  { key: "active-volume", label: "Most Active by Volume" },
];

function MoversSection() {
  const [tab, setTab] = useState<MoverKey>("gainers");
  const rows = useMemo(() => {
    const base =
      tab === "gainers" ? topGainers
        : tab === "losers" ? topLosers
        : mostActive;
    // Pad/repeat the 5-row teaser data into a 10-row list as placeholder
    const padded = [...base, ...base].slice(0, 10).map((r, i) => ({
      ...r,
      code: i < base.length ? r.code : r.code + (i - base.length + 2),
    }));
    return padded;
  }, [tab]);

  return (
    <Section id="movers" title="Movers — full lists">
      <div className="flex flex-wrap gap-0.5 mb-3">
        {moverTabs.map((m) => {
          const active = tab === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setTab(m.key)}
              className="px-3 h-8 text-[12px] font-semibold uppercase"
              style={{
                background: active ? "var(--brand-600)" : "transparent",
                color: active ? "#fff" : "var(--text-secondary)",
                border: "1px solid " + (active ? "var(--brand-600)" : "var(--line)"),
                borderRadius: 2,
                letterSpacing: "0.06em",
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <DataTable
        headers={["#", "Ticker", "Name", "Price", "Change", "Volume", "Value"]}
        align={["left", "left", "left", "right", "right", "right", "right"]}
      >
        {rows.map((r, i) => (
          <tr key={r.code + i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)", background: zebra(i) }}>
            <td className="px-3 py-2 tnum" style={{ color: "var(--text-muted)" }}>{i + 1}</td>
            <td className="px-3 py-2 font-semibold" style={{ color: "var(--ink)" }}>
              <Link to="/company/$ticker" params={{ ticker: r.code }} style={{ color: "var(--brand-600)" }}>
                {r.code}
              </Link>
            </td>
            <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{r.name}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.price.toLocaleString()}</td>
            <td className="px-3 py-2 text-right"><ChangeCell v={r.change} /></td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.volume}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>
              ৳{(r.price * 1000).toLocaleString()}
            </td>
          </tr>
        ))}
      </DataTable>
    </Section>
  );
}

/* ────────── 3. Circuit breakers ────────── */
function CircuitBreakersSection() {
  const rows = [
    { code: "ANWARGALV", name: "Anwar Galvanising", limit: "Upper", price: 109.7, band: "8.75 – 109.70" },
    { code: "ACFL", name: "AFC Agro Biotech", limit: "Upper", price: 24.4, band: "2.00 – 24.40" },
    { code: "APOLOISPAT", name: "Apolo Ispat Complex", limit: "Upper", price: 3.5, band: "0.25 – 3.50" },
    { code: "APEXSPINN", name: "Apex Spinning", limit: "Lower", price: 315.9, band: "315.90 – 25.30" },
    { code: "APEXTANRY", name: "Apex Tannery", limit: "Lower", price: 105.5, band: "105.50 – 8.50" },
    { code: "BAYLEASING", name: "Bay Leasing", limit: "Lower", price: 4.5, band: "4.50 – 0.40" },
  ];
  return (
    <Section id="circuit" title="Circuit breakers" subtitle="Scrips that hit upper or lower circuit today.">
      <DataTable
        headers={["Ticker", "Name", "Limit", "Last price", "Permitted band (low–high)"]}
        align={["left", "left", "left", "right", "right"]}
      >
        {rows.map((r, i) => (
          <tr key={r.code} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)", background: zebra(i) }}>
            <td className="px-3 py-2 font-semibold" style={{ color: "var(--brand-600)" }}>{r.code}</td>
            <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{r.name}</td>
            <td className="px-3 py-2 text-[12px] font-semibold">
              <span
                className="px-1.5 py-0.5"
                style={{
                  color: r.limit === "Upper" ? "var(--green-up)" : "var(--red-down)",
                  background: r.limit === "Upper" ? "var(--green-up-light)" : "var(--red-down-light)",
                }}
              >
                {r.limit}
              </span>
            </td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.price.toFixed(2)}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--text-secondary)" }}>{r.band}</td>
          </tr>
        ))}
      </DataTable>
    </Section>
  );
}

/* ────────── 4. Margin financeable ────────── */
function MarginFinanceableSection() {
  const all = [
    { code: "BATBC", name: "BAT Bangladesh", sector: "Consumer Staples", ratio: "1:0.50" },
    { code: "GRAMEENS", name: "GrameenPhone", sector: "Telecom", ratio: "1:0.50" },
    { code: "SQPHARMA", name: "Square Pharmaceuticals", sector: "Pharmaceuticals", ratio: "1:0.50" },
    { code: "RENATA", name: "Renata Limited", sector: "Pharmaceuticals", ratio: "1:0.50" },
    { code: "BRAC", name: "BRAC Bank", sector: "Banking", ratio: "1:0.25" },
    { code: "DBBL", name: "Dutch-Bangla Bank", sector: "Banking", ratio: "1:0.25" },
    { code: "ISLAMIBNK", name: "Islami Bank BD", sector: "Banking", ratio: "1:0.25" },
    { code: "WALTONHIL", name: "Walton Hi-Tech", sector: "Engineering", ratio: "1:0.25" },
  ];
  const [q, setQ] = useState("");
  const filtered = all.filter(
    (r) => !q || r.code.toLowerCase().includes(q.toLowerCase()) || r.name.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <Section id="margin" title="Margin financeable securities" subtitle="Eligible scrips and applicable margin ratio.">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by ticker or name…"
        className="w-full md:w-80 h-9 px-3 mb-3 text-[13px] outline-none"
        style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
      />
      <DataTable
        headers={["Ticker", "Name", "Sector", "Margin ratio"]}
        align={["left", "left", "left", "right"]}
      >
        {filtered.map((r, i) => (
          <tr key={r.code} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)", background: zebra(i) }}>
            <td className="px-3 py-2 font-semibold" style={{ color: "var(--brand-600)" }}>{r.code}</td>
            <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{r.name}</td>
            <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{r.sector}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.ratio}</td>
          </tr>
        ))}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={4} className="px-3 py-6 text-center text-[12.5px]" style={{ color: "var(--text-muted)" }}>
              No matches.
            </td>
          </tr>
        )}
      </DataTable>
      <div
        className="mt-4 space-y-2 text-[11.5px] leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        <p>
          <span className="font-medium" style={{ color: "var(--text-secondary)" }}>Note:</span>{" "}
          All the A category equity securities listed in the main market of DSE are primarily
          evaluated for inclusion in the List of Margin Financeable Securities. Also, B category
          equity securities are evaluated for inclusion, provided that they have distributed at
          least 5% dividend for the latest financial year.
        </p>
        <p>
          Trailing P/E ratio is considered for the preparation of the List, subject to the
          availability of earning declarations for four consecutive quarters from the latest
          published EPS. In the absence of such declarations, the latest declared EPS is
          annualized for the calculation of P/E ratio.
        </p>
        <p>
          Closing Price (CP) and/or Adjusted Opening Price (AOP) is considered for calculation of
          Trailing P/E and Free Float Market Capitalization.
        </p>
        <p>
          <span className="font-medium" style={{ color: "var(--text-secondary)" }}>General Disclosure:</span>{" "}
          This List of Margin Financeable Securities has been prepared following the Sub-rule 7 of
          Rule 7, Rule 10, Sub-rules 3, 4, 5, 6, 7 of Rule 11 of The Bangladesh Securities and
          Exchange Commission (Margin) Rules, 2025. TREC holder companies are requested to ensure
          full compliance with all the other applicable rules while extending margin financing to
          their clients.
        </p>
        <p>
          <span className="font-medium" style={{ color: "var(--text-secondary)" }}>NB:</span>{" "}
          This is a primary list currently under development. Please let us know if any
          discrepancies are noticed.
        </p>
      </div>
    </Section>
  );
}

/* ────────── 5. Sector P/E ────────── */
function SectorPESection() {
  const rows = sectors.map((s, i) => ({
    name: s.name,
    pe: (10 + Math.abs(Math.sin(i + 1)) * 18).toFixed(2),
    weight: ((10 - i) * 1.6).toFixed(2) + "%",
    change: s.change,
  }));
  return (
    <Section id="pe" title="P/E at a glance" subtitle="Trailing P/E by sector with index weight.">
      <DataTable
        headers={["Sector", "Trailing P/E", "Index weight", "Change"]}
        align={["left", "right", "right", "right"]}
      >
        {rows.map((r, i) => (
          <tr key={r.name} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)", background: zebra(i) }}>
            <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.name}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.pe}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--text-secondary)" }}>{r.weight}</td>
            <td className="px-3 py-2 text-right"><ChangeCell v={r.change} /></td>
          </tr>
        ))}
      </DataTable>
    </Section>
  );
}

/* ────────── 6. Block trades ────────── */
function BlockTradesSection() {
  const rows = [
    { code: "BATBC", qty: "120,000", price: 211.5, value: "৳2.54 Cr", time: "11:42" },
    { code: "GRAMEENS", qty: "1,200,000", price: 28.4, value: "৳3.41 Cr", time: "12:08" },
    { code: "RENATA", qty: "8,000", price: 1240, value: "৳0.99 Cr", time: "12:31" },
    { code: "BRAC", qty: "600,000", price: 48.3, value: "৳2.90 Cr", time: "13:14" },
    { code: "WALTONHIL", qty: "5,500", price: 1620, value: "৳0.89 Cr", time: "13:42" },
  ];
  return (
    <Section id="blocks" title="Block transactions" subtitle="Negotiated trades executed in the block market today.">
      <DataTable
        headers={["Ticker", "Quantity", "Price", "Value", "Time"]}
        align={["left", "right", "right", "right", "right"]}
      >
        {rows.map((r, i) => (
          <tr key={r.code} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)", background: zebra(i) }}>
            <td className="px-3 py-2 font-semibold" style={{ color: "var(--brand-600)" }}>{r.code}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.qty}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.price.toFixed(2)}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.value}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--text-secondary)" }}>{r.time}</td>
          </tr>
        ))}
      </DataTable>
    </Section>
  );
}

/* ────────── 7. Foreign trade summary ────────── */
function ForeignTradeSection() {
  const rows = [
    { label: "Foreign buy", value: "৳184.20 Cr", change: 1.2 },
    { label: "Foreign sell", value: "৳146.80 Cr", change: -0.8 },
    { label: "Net foreign", value: "৳37.40 Cr", change: 2.4 },
    { label: "Share of turnover", value: "29.40%", change: 0.6 },
  ];
  return (
    <Section
      id="foreign"
      title="Foreign trade summary"
      subtitle={
        <>
          Aggregate non-resident activity. See{" "}
          <Link to="/foreign-investors" style={{ color: "var(--brand-600)" }}>
            Foreign Investor Guide
          </Link>{" "}
          for procedure.
        </>
      }
    >
      <DataTable headers={["Metric", "Value", "DoD"]} align={["left", "right", "right"]}>
        {rows.map((r, i) => (
          <tr key={r.label} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)", background: zebra(i) }}>
            <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.label}</td>
            <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>{r.value}</td>
            <td className="px-3 py-2 text-right"><ChangeCell v={r.change} /></td>
          </tr>
        ))}
      </DataTable>
    </Section>
  );
}

/* ────────── 8. Sessions & calendar ────────── */
function SessionsSection() {
  const sessions = [
    { label: "Pre-open", time: "09:30 – 10:00" },
    { label: "Continuous trading", time: "10:00 – 14:30" },
    { label: "Closing session", time: "14:30 – 14:40" },
    { label: "Post-close", time: "14:40 – 14:50" },
  ];
  const holidays = [
    { date: "Jun 16, 2026", name: "Eid-ul-Azha (observed)" },
    { date: "Aug 15, 2026", name: "National Mourning Day" },
    { date: "Sep 04, 2026", name: "Eid-e-Miladunnabi" },
    { date: "Dec 16, 2026", name: "Victory Day" },
  ];
  return (
    <Section
      id="sessions"
      title="Trading sessions & calendar"
      subtitle={
        <>
          Daily session timings and upcoming holidays. Full calendar in{" "}
          <Link to="/holidays" style={{ color: "var(--brand-600)" }}>Holidays</Link>.
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-4">
        <DataTable headers={["Session", "Time (BST)"]} align={["left", "right"]}>
          {sessions.map((s, i) => (
            <tr key={s.label} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)", background: zebra(i) }}>
              <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{s.label}</td>
              <td className="px-3 py-2 tnum text-right" style={{ color: "var(--text-secondary)" }}>{s.time}</td>
            </tr>
          ))}
        </DataTable>
        <DataTable headers={["Date", "Holiday"]} align={["left", "left"]}>
          {holidays.map((h, i) => (
            <tr key={h.date} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)", background: zebra(i) }}>
              <td className="px-3 py-2 tnum" style={{ color: "var(--ink)" }}>{h.date}</td>
              <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{h.name}</td>
            </tr>
          ))}
        </DataTable>
      </div>
    </Section>
  );
}

/* ────────── Section wrapper ────────── */
function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[120px]">
      <div className="mb-3 pb-2" style={{ borderBottom: "1px solid var(--line)" }}>
        <h2 className="text-[18px] font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
