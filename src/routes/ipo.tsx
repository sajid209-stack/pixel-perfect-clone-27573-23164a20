import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CalendarDays, CheckCircle2, ChevronDown, ChevronRight, Clock, FileDown, FileText, Inbox, TrendingUp } from "lucide-react";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHeroSlider, DEFAULT_HERO_SLIDES } from "@/components/dse/PageHeroSlider";
import { Segmented } from "@/components/dse/Segmented";

export const Route = createFileRoute("/ipo")({
  head: () => ({
    meta: [
      { title: "IPO Center — Subscriptions, upcoming & guide | DSE" },
      {
        name: "description",
        content:
          "Live IPO subscription windows, upcoming offerings, recent listings and a step-by-step guide for applying through your broker on the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "IPO Center | Dhaka Stock Exchange" },
      {
        property: "og:description",
        content: "Live, upcoming and recently listed IPOs on the DSE with full subscription details.",
      },
    ],
  }),
  component: IpoPage,
});

type Status = "open" | "upcoming" | "listed";

type Ipo = {
  code: string;
  name: string;
  sector: string;
  status: Status;
  cutoffPrice: number;
  faceValue: number;
  lotSize: number;
  size: string; // total raise
  method: "Book building" | "Fixed price";
  openDate: string;
  closeDate: string;
  listingDate?: string;
  listingGain?: number; // % above issue
  subscribed?: number; // x times
  pe?: number;
  use: string;
};

const ipos: Ipo[] = [
  {
    code: "NRBCBANK",
    name: "NRBC Bank PLC",
    sector: "Banking",
    status: "open",
    cutoffPrice: 30,
    faceValue: 10,
    lotSize: 200,
    size: "৳ 120 Cr",
    method: "Book building",
    openDate: "Jun 02, 2026",
    closeDate: "Jun 10, 2026",
    subscribed: 3.8,
    pe: 8.4,
    use: "Tier-1 capital strengthening, branch expansion and SME lending growth.",
  },
  {
    code: "SIKDERINS",
    name: "Sikder Insurance",
    sector: "Insurance",
    status: "open",
    cutoffPrice: 10,
    faceValue: 10,
    lotSize: 500,
    size: "৳ 16 Cr",
    method: "Fixed price",
    openDate: "Jun 04, 2026",
    closeDate: "Jun 12, 2026",
    subscribed: 12.6,
    pe: 14.2,
    use: "Investment in fixed deposits, government securities and listed shares.",
  },
  {
    code: "SENABIMA",
    name: "Sena Kalyan Insurance",
    sector: "Insurance",
    status: "upcoming",
    cutoffPrice: 10,
    faceValue: 10,
    lotSize: 500,
    size: "৳ 20 Cr",
    method: "Fixed price",
    openDate: "Jun 18, 2026",
    closeDate: "Jun 26, 2026",
    pe: 16.1,
    use: "Working capital and statutory deposit with the IDRA.",
  },
  {
    code: "BDSHIPYARD",
    name: "Bangladesh Shipyard",
    sector: "Engineering",
    status: "upcoming",
    cutoffPrice: 42,
    faceValue: 10,
    lotSize: 100,
    size: "৳ 86 Cr",
    method: "Book building",
    openDate: "Jul 01, 2026",
    closeDate: "Jul 08, 2026",
    pe: 11.6,
    use: "Dry dock expansion, new welding bay and partial debt repayment.",
  },
  {
    code: "GREENDELTA",
    name: "Green Delta Foods",
    sector: "Food & Beverage",
    status: "upcoming",
    cutoffPrice: 25,
    faceValue: 10,
    lotSize: 200,
    size: "৳ 40 Cr",
    method: "Fixed price",
    openDate: "Jul 14, 2026",
    closeDate: "Jul 22, 2026",
    pe: 13.4,
    use: "New cold-chain warehouse in Chittagong and packaging plant upgrade.",
  },
  {
    code: "META",
    name: "Meta Pharmaceuticals",
    sector: "Pharmaceuticals",
    status: "listed",
    cutoffPrice: 35,
    faceValue: 10,
    lotSize: 200,
    size: "৳ 75 Cr",
    method: "Book building",
    openDate: "Apr 02, 2026",
    closeDate: "Apr 10, 2026",
    listingDate: "May 06, 2026",
    listingGain: 28.4,
    subscribed: 6.2,
    pe: 12.8,
    use: "Capacity expansion for sterile injectable line.",
  },
  {
    code: "RUPALI",
    name: "Rupali Life Insurance",
    sector: "Insurance",
    status: "listed",
    cutoffPrice: 10,
    faceValue: 10,
    lotSize: 500,
    size: "৳ 18 Cr",
    method: "Fixed price",
    openDate: "Mar 12, 2026",
    closeDate: "Mar 20, 2026",
    listingDate: "Apr 15, 2026",
    listingGain: 11.2,
    subscribed: 8.4,
    pe: 18.6,
    use: "Statutory deposit and government securities portfolio.",
  },
  {
    code: "SOUTHSTEEL",
    name: "South Steel Ltd",
    sector: "Engineering",
    status: "listed",
    cutoffPrice: 48,
    faceValue: 10,
    lotSize: 100,
    size: "৳ 110 Cr",
    method: "Book building",
    openDate: "Feb 04, 2026",
    closeDate: "Feb 12, 2026",
    listingDate: "Mar 08, 2026",
    listingGain: -4.6,
    subscribed: 2.1,
    pe: 9.8,
    use: "Rolling mill upgrade and raw material inventory build-up.",
  },
];

const tabs: { key: Status | "all"; label: string }[] = [
  { key: "open", label: "Subscription open" },
  { key: "upcoming", label: "Upcoming" },
  { key: "listed", label: "Recently listed" },
];

function daysBetween(a: string, b: string) {
  return Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000));
}

function IpoPage() {
  const [tab, setTab] = useState<Status>("open");
  const [mainTab, setMainTab] = useState<"pipeline" | "archive" | "documents">("pipeline");
  const filtered = useMemo(() => ipos.filter((i) => i.status === tab), [tab]);

  const stats = useMemo(() => {
    const open = ipos.filter((i) => i.status === "open").length;
    const upcoming = ipos.filter((i) => i.status === "upcoming").length;
    const listed = ipos.filter((i) => i.status === "listed");
    const avgGain =
      listed.length === 0
        ? 0
        : Math.round(
            (listed.reduce((s, i) => s + (i.listingGain ?? 0), 0) / listed.length) * 10,
          ) / 10;
    return { open, upcoming, listed: listed.length, avgGain };
  }, []);

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />
      <PageHeroSlider slides={DEFAULT_HERO_SLIDES} />

      {/* Hero */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            Markets · IPO Center
          </div>
          <div className="text-[11px] mb-4" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
            <div>
              <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
                IPO Pipeline
              </h1>

              <p className="mt-4 text-[15px] max-w-[560px]" style={{ color: "var(--text-secondary)" }}>
                Every offering on the Dhaka Stock Exchange — currently open for subscription,
                scheduled in the coming weeks, or freshly trading. Read the prospectus, check the
                allotment ratio, and apply through your broker in minutes.
              </p>
            </div>
            <StatRow stats={stats} />
          </div>
        </div>
      </section>

      {/* Main tabs */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 flex items-center gap-6">
          {[
            { key: "pipeline", label: "IPO Pipeline" },
            { key: "archive", label: "IPO Archive" },
            { key: "documents", label: "Documents & Circulars" },
          ].map((t) => {
            const active = mainTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setMainTab(t.key as typeof mainTab)}
                className="relative py-4 text-[13px] font-medium transition"
                style={{ color: active ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {t.label}
                {active && (
                  <motion.span
                    layoutId="ipoMainTab"
                    className="absolute left-0 right-0 -bottom-px h-[2px]"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {mainTab === "pipeline" && (<>
      {/* Tabs */}
      <section className="sticky top-[104px] z-30" style={{
        background: "rgb(var(--surface-rgb) / 0.85)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgb(var(--ov) / 0.06)",
      }}>
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center gap-2 flex-wrap">
          {tabs.map((t) => {
            const active = t.key === tab;
            const count = ipos.filter((i) => i.status === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key as Status)}
                className="relative px-4 h-9 rounded-full text-[12.5px] font-medium flex items-center gap-2 transition"
                style={{ color: active ? "var(--primary-foreground)" : "var(--text-secondary)" }}
              >
                {active && (
                  <motion.span
                    layoutId="ipoTab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
                <span
                  className="relative text-[10.5px] tnum px-1.5 py-0.5 rounded-full"
                  style={{
                    background: active ? "rgba(7,9,10,0.15)" : "rgb(var(--ov) / 0.06)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-[1440px] mx-auto px-6 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {filtered.map((ipo, i) => (
              <IpoCard key={ipo.code} ipo={ipo} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[14px]" style={{ color: "var(--text-secondary)" }}>
            Nothing in this stage right now.
          </div>
        )}
      </section>

      {/* How to apply */}
      <section className="max-w-[1440px] mx-auto px-6 pt-20 pb-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
              How to apply
            </div>
            <h2 className="text-[36px] font-semibold tracking-[-0.01em] leading-[1.08]">
              Five steps,<br />about ten minutes.
            </h2>
            <p className="mt-4 text-[14px] max-w-[40ch]" style={{ color: "var(--text-secondary)" }}>
              Applications run through your TREC-holding broker over the EBL IPO portal. You'll
              need an active BO account and sufficient balance in your trading account before the
              cutoff.
            </p>
            <Link
              to="/companies"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium"
              style={{ color: "var(--primary)" }}
            >
              Browse listed companies <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ol className="space-y-3">
            {[
              {
                t: "Open a BO account",
                d: "A Beneficiary Owner (BO) account at any DSE depository participant — usually your broker. Bring NID, photo and bank details.",
              },
              {
                t: "Fund your trading account",
                d: "Transfer the application amount to your broker's customer account at least one day before the cutoff date.",
              },
              {
                t: "Submit the application",
                d: "Log in to your broker's online IPO portal, pick the issue, choose lot count and confirm. You'll receive an immediate reference.",
              },
              {
                t: "Wait for the lottery",
                d: "If the issue is oversubscribed, allotment is decided by computerised draw within 7 working days of closing.",
              },
              {
                t: "Trade on listing day",
                d: "Allotted shares land in your BO account the day before listing. You can sell from the opening bell on listing day.",
              },
            ].map((s, i) => (
              <motion.li
                key={s.t}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex gap-4 p-5 rounded-xl"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.55)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold tnum shrink-0"
                  style={{
                    background: "rgb(var(--brand-tint) / 0.10)",
                    color: "var(--primary)",
                    border: "1px solid rgb(var(--brand-tint) / 0.25)",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold">{s.t}</div>
                  <div className="mt-1 text-[12.5px] leading-[1.65]" style={{ color: "var(--text-secondary)" }}>
                    {s.d}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
      </>)}

      {mainTab === "archive" && <IpoArchive />}
      {mainTab === "documents" && <IpoDocuments />}

      <Footer />
    </div>
  );
}

function StatRow({ stats }: { stats: { open: number; upcoming: number; listed: number; avgGain: number } }) {
  const items = [
    { label: "Open now", value: stats.open.toString() },
    { label: "Upcoming", value: stats.upcoming.toString() },
    { label: "Recently listed", value: stats.listed.toString() },
    {
      label: "Avg listing gain",
      value: `${stats.avgGain > 0 ? "+" : ""}${stats.avgGain}%`,
      tone: stats.avgGain >= 0 ? ("up" as const) : ("down" as const),
    },
  ];
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden"
      style={{ background: "rgb(var(--ov) / 0.06)" }}
    >
      {items.map((it) => (
        <div key={it.label} className="px-4 py-3 min-w-[110px]" style={{ background: "var(--page-bg)" }}>
          <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            {it.label}
          </div>
          <div
            className="mt-1 text-[20px] font-semibold tnum tracking-tight"
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

function IpoCard({ ipo, i }: { ipo: Ipo; i: number }) {
  const today = "2026-06-05";
  const total = ipo.status === "open" ? daysBetween(ipo.openDate, ipo.closeDate) : 0;
  const elapsed = ipo.status === "open" ? daysBetween(ipo.openDate, today) : 0;
  const progress = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0;
  const remaining = ipo.status === "open" ? Math.max(0, total - elapsed) : 0;

  const tone =
    ipo.status === "open"
      ? { label: "Subscription open", color: "var(--primary)", bg: "rgb(var(--brand-tint) / 0.10)" }
      : ipo.status === "upcoming"
        ? { label: "Upcoming", color: "#f0c674", bg: "rgba(240,198,116,0.10)" }
        : { label: "Listed", color: "var(--text-secondary)", bg: "rgb(var(--ov) / 0.06)" };

  const gainUp = (ipo.listingGain ?? 0) >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="group relative p-7 rounded-2xl overflow-hidden"
      style={{
        background: "rgb(var(--surface-rgb) / 0.6)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <header className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] uppercase tracking-[0.18em] font-medium"
              style={{ background: tone.bg, color: tone.color }}
            >
              {ipo.status === "open" && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: tone.color }} />}
              {tone.label}
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              {ipo.method}
            </span>
          </div>
          <h3 className="text-[20px] font-semibold tracking-tight truncate">{ipo.name}</h3>
          <div className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            {ipo.code} · {ipo.sector}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            {ipo.status === "listed" ? "Listing gain" : "Cutoff price"}
          </div>
          {ipo.status === "listed" ? (
            <div className="text-[22px] font-semibold tnum mt-0.5" style={{ color: gainUp ? "var(--green-up)" : "var(--red-down)" }}>
              {gainUp ? "+" : ""}
              {ipo.listingGain?.toFixed(1)}%
            </div>
          ) : (
            <div className="text-[22px] font-semibold tnum mt-0.5">৳ {ipo.cutoffPrice}</div>
          )}
        </div>
      </header>

      {/* Live progress for open */}
      {ipo.status === "open" && (
        <div className="mb-5">
          <div className="flex items-center justify-between text-[11px] mb-1.5" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {remaining > 0 ? `${remaining} day${remaining === 1 ? "" : "s"} remaining` : "Closing today"}
            </span>
            <span className="tnum">
              {ipo.subscribed?.toFixed(1)}× subscribed
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgb(var(--ov) / 0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--primary)", height: "100%" }}
            />
          </div>
        </div>
      )}

      {/* Spec grid */}
      <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden mb-5" style={{ background: "rgb(var(--ov) / 0.05)" }}>
        <Spec label="Issue size" value={ipo.size} />
        <Spec label="Lot size" value={`${ipo.lotSize} sh`} />
        <Spec
          label={ipo.status === "listed" ? "Subscribed" : "Indicative P/E"}
          value={ipo.status === "listed" ? `${ipo.subscribed?.toFixed(1)}×` : ipo.pe ? `${ipo.pe.toFixed(1)}×` : "—"}
        />
      </div>

      {/* Schedule */}
      <div className="flex items-center gap-2 text-[12px] mb-5" style={{ color: "var(--text-secondary)" }}>
        <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
        {ipo.status === "listed" ? (
          <>
            Listed <span className="font-medium" style={{ color: "var(--text-primary)" }}>{ipo.listingDate}</span>
          </>
        ) : (
          <>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>{ipo.openDate}</span>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>{ipo.closeDate}</span>
          </>
        )}
      </div>

      <p className="text-[12.5px] leading-[1.65] mb-6" style={{ color: "var(--text-secondary)" }}>
        {ipo.use}
      </p>

      {/* Footer actions */}
      <div className="flex items-center justify-between">
        <button
          className="inline-flex items-center gap-1.5 text-[12px] font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          <FileText className="w-3.5 h-3.5" />
          Prospectus
        </button>

        {ipo.status === "open" ? (
          <Link
            to="/members"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[12.5px] font-medium transition"
            style={{
              background: "transparent",
              border: "1px solid rgb(var(--ov) / 0.15)",
              color: "var(--text-primary)",
            }}
          >
            Apply via your broker <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        ) : ipo.status === "upcoming" ? (
          <button
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[12.5px] font-medium"
            style={{
              background: "rgb(var(--ov) / 0.04)",
              border: "1px solid rgb(var(--ov) / 0.08)",
              color: "var(--text-primary)",
            }}
          >
            Notify me <CheckCircle2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Link
            to="/company/$ticker"
            params={{ ticker: ipo.code }}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[12.5px] font-medium"
            style={{
              background: "rgb(var(--ov) / 0.04)",
              border: "1px solid rgb(var(--ov) / 0.08)",
              color: "var(--text-primary)",
            }}
          >
            View profile <TrendingUp className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3" style={{ background: "var(--page-bg)" }}>
      <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="mt-1 text-[14px] font-semibold tnum tracking-tight">{value}</div>
    </div>
  );
}

/* ============================================================
 * IPO Archive
 * ============================================================ */

// SAMPLE — replace with real archive
const FIXED_PRICE_ARCHIVE: Record<string, { name: string }[]> = {
  "2024": [
    { name: "Sonali Life Insurance Co. Ltd." },
    { name: "Trust Islami Life Insurance Ltd." },
    { name: "NRB Bank PLC" },
    { name: "Midland Bank Ltd." },
  ],
  "2023": [
    { name: "Sikder Insurance Co. Ltd." },
    { name: "Yeakin Polymer Ltd." },
    { name: "Ring Shine Textiles Ltd." },
  ],
  "2022": [
    { name: "Navana Pharmaceuticals Ltd." },
    { name: "JMI Hospital Requisite Manufacturing Ltd." },
    { name: "Union Insurance Co. Ltd." },
    { name: "Chartered Life Insurance Co. Ltd." },
  ],
  "2021": [
    { name: "BD Thai Food & Beverage Ltd." },
    { name: "Sonali Paper & Board Mills Ltd." },
    { name: "Taufika Foods and Lovello Ice-cream PLC" },
    { name: "eGeneration Ltd." },
    { name: "South Bangla Agriculture & Commerce Bank Ltd." },
  ],
  "2020": [
    { name: "Robi Axiata Limited" },
    { name: "Energypac Power Generation Ltd." },
    { name: "Associated Oxygen Ltd." },
    { name: "Mir Akhter Hossain Ltd." },
    { name: "Express Insurance Ltd." },
    { name: "Crystal Insurance Company Ltd." },
  ],
  "2019": [
    { name: "New Line Clothings Ltd." },
    { name: "SS Steel Ltd." },
    { name: "Bengal Windsor Thermoplastics Ltd." },
    { name: "Silva Pharmaceuticals Ltd." },
  ],
  "2018": [
    { name: "Kattali Textile Ltd." },
    { name: "Queen South Textile Mills Ltd." },
    { name: "Intraco Refueling Station Ltd." },
    { name: "SK Trims & Industries Ltd." },
  ],
  "2017": [
    { name: "Nahee Aluminum Composite Panel Ltd." },
    { name: "Aamra Networks Ltd." },
    { name: "Advent Pharma Ltd." },
  ],
  "2016": [
    { name: "Bangladesh National Insurance Company Ltd." },
    { name: "Yeakin Polymer Ltd." },
    { name: "Ratanpur Steel Re-Rolling Mills Ltd." },
  ],
  "2015": [
    { name: "Zaheen Spinning Ltd." },
    { name: "Shasha Denims Ltd." },
    { name: "Simtex Industries Ltd." },
    { name: "Khulna Printing & Packaging Ltd." },
  ],
  "2014": [
    { name: "Hamid Fabrics Ltd." },
    { name: "The Peninsula Chittagong Ltd." },
    { name: "Matin Spinning Mills Ltd." },
  ],
  "2013": [
    { name: "Familytex (BD) Ltd." },
    { name: "Generation Next Fashions Ltd." },
    { name: "Regent Textile Mills Ltd." },
  ],
  "2012": [
    { name: "Global Heavy Chemicals Ltd." },
    { name: "Salvo Chemical Industry Ltd." },
    { name: "Saif Powertec Ltd." },
  ],
  "2011": [
    { name: "MI Cement Factory Ltd." },
    { name: "Mercantile Insurance Company Ltd." },
    { name: "Padma Life Insurance Ltd." },
  ],
};

type BookBuildRecord = {
  name: string;
  fields: Record<string, string>;
};

const BB_FIELDS = [
  "Nature of Business",
  "Subscription open",
  "Subscription Close",
  "For Non-Resident Bangladeshi",
  "Bidding Period for EII",
  "Listing Date",
  "Trading Date",
  "Reason for IPO",
  "Offer Price Per Share",
  "Indicative Price",
  "Face Value Per Share",
  "Market Lot (Shares)",
  "Pre IPO Placement (Shares)",
  "Sponsors Portion (Shares)",
  "Pre-IPO paid up capital",
  "Public Offer (Shares)",
] as const;

// SAMPLE — replace with real archive
function bbPlaceholder(name: string, nature = "—"): BookBuildRecord {
  return {
    name,
    fields: {
      "Nature of Business": nature,
      "Subscription open": "—",
      "Subscription Close": "—",
      "For Non-Resident Bangladeshi": "—",
      "Bidding Period for EII": "—",
      "Listing Date": "—",
      "Trading Date": "—",
      "Reason for IPO": "—",
      "Offer Price Per Share": "—",
      "Indicative Price": "—",
      "Face Value Per Share": "Tk. 10.00",
      "Market Lot (Shares)": "—",
      "Pre IPO Placement (Shares)": "—",
      "Sponsors Portion (Shares)": "—",
      "Pre-IPO paid up capital": "—",
      "Public Offer (Shares)": "—",
    },
  };
}

const BOOK_BUILDING_ARCHIVE: Record<string, BookBuildRecord[]> = {
  "2024": [bbPlaceholder("Best Holdings Limited")],
  "2022": [bbPlaceholder("Navana Pharmaceuticals Ltd.")],
  "2021": [bbPlaceholder("Walton Hi-Tech Industries Ltd.")],
  "2020": [bbPlaceholder("Energypac Power Generation Ltd.")],
  "2019": [bbPlaceholder("Runner Automobiles Ltd.")],
  "2018": [bbPlaceholder("Esquire Knit Composite Ltd.")],
  "2017": [bbPlaceholder("Oimex Electrode Ltd.")],
  "2016": [bbPlaceholder("Bashundhara Paper Mills Ltd.")],
  "2015": [bbPlaceholder("Aamra Technologies Ltd.")],
  "2011": [bbPlaceholder("MJL Bangladesh Ltd.")],
  "2010": [
    {
      name: "RAK Ceramics (Bangladesh) Limited",
      fields: {
        "Nature of Business":
          "The core business of RAK Ceramics (Bangladesh) Limited is to manufacture and sell tiles and sanitary wares.",
        "Subscription open": "November 21, 2010",
        "Subscription Close": "November 25, 2010",
        "For Non-Resident Bangladeshi": "December 04, 2010",
        "Bidding Period for EII": "October 24 – October 28, 2010",
        "Listing Date": "December 20, 2010",
        "Trading Date": "December 22, 2010",
        "Reason for IPO":
          "To repay long-term loans and finance BMRE of existing facilities.",
        "Offer Price Per Share": "Tk. 48.00",
        "Indicative Price": "Tk. 48.00",
        "Face Value Per Share": "Tk. 10.00",
        "Market Lot (Shares)": "100",
        "Pre IPO Placement (Shares)": "8,343,750",
        "Sponsors Portion (Shares)": "255,150,000",
        "Pre-IPO paid up capital": "Tk. 2,634,375,000",
        "Public Offer (Shares)": "34,687,500",
      },
    },
  ],
};

const FIXED_PRICE_YEARS = ["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011"];
const BOOK_BUILDING_YEARS = ["2024","2022","2021","2020","2019","2018","2017","2016","2015","2011","2010"];

function IpoArchive() {
  const [method, setMethod] = useState<"fixed" | "book">("fixed");
  const [openYear, setOpenYear] = useState<string | null>(method === "fixed" ? "2020" : "2010");

  return (
    <section className="max-w-[1440px] mx-auto px-6 pt-10 pb-16">
      <div className="mb-6">
        <Segmented
          ariaLabel="IPO archive method"
          value={method}
          onChange={(k) => {
            setMethod(k);
            setOpenYear(k === "fixed" ? "2020" : "2010");
          }}
          options={[
            { key: "fixed", label: "Fixed Price Method" },
            { key: "book", label: "Book Building Method" },
          ]}
        />
      </div>

      <div className="space-y-2">
        {(method === "fixed" ? FIXED_PRICE_YEARS : BOOK_BUILDING_YEARS).map((year) => {
          const open = openYear === year;
          return (
            <div
              key={year}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgb(var(--ov) / 0.08)", background: "rgb(var(--surface-rgb) / 0.5)" }}
            >
              <button
                onClick={() => setOpenYear(open ? null : year)}
                className="w-full flex items-center justify-between px-5 py-3 text-left"
              >
                <span className="text-[15px] font-semibold tnum">{year}</span>
                <ChevronDown
                  className="w-4 h-4 transition-transform"
                  style={{ transform: open ? "rotate(180deg)" : "none", color: "var(--text-muted)" }}
                />
              </button>
              {open && (
                <div className="px-5 pb-5 pt-1">
                  {method === "fixed" ? (
                    <FixedPriceTable rows={FIXED_PRICE_ARCHIVE[year] ?? []} />
                  ) : (
                    <div className="space-y-8">
                      {(BOOK_BUILDING_ARCHIVE[year] ?? []).map((rec) => (
                        <BookBuildingBlock key={rec.name} rec={rec} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FixedPriceTable({ rows }: { rows: { name: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid rgb(var(--ov) / 0.06)" }}>
      <table className="w-full text-[13px]">
        <thead>
          <tr style={{ background: "rgb(var(--ov) / 0.04)", color: "var(--text-muted)" }}>
            <th className="text-left px-4 py-2 font-medium w-16">#</th>
            <th className="text-left px-4 py-2 font-medium">Name of the Company</th>
            <th className="text-left px-4 py-2 font-medium w-32">IPO Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}>
              <td className="px-4 py-2 tnum" style={{ color: "var(--text-muted)" }}>{i + 1}</td>
              <td className="px-4 py-2">{r.name}</td>
              <td className="px-4 py-2">
                <a href="#" className="inline-flex items-center gap-1 text-[12.5px]" style={{ color: "var(--primary)" }}>
                  <FileDown className="w-4 h-4" /> PDF
                </a>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-[12.5px]" style={{ color: "var(--text-muted)" }}>
                No entries.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function BookBuildingBlock({ rec }: { rec: BookBuildRecord }) {
  return (
    <div>
      <h3 className="text-[16px] font-semibold mb-2">{rec.name}</h3>
      <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid rgb(var(--ov) / 0.06)" }}>
        <table className="w-full text-[13px]">
          <tbody>
            {BB_FIELDS.map((label, i) => (
              <tr key={label} style={{ borderTop: i === 0 ? "none" : "1px solid rgb(var(--ov) / 0.06)" }}>
                <td
                  className="px-4 py-2 align-top w-[280px]"
                  style={{ background: "rgb(var(--ov) / 0.03)", color: "var(--text-secondary)" }}
                >
                  {label}
                </td>
                <td className="px-4 py-2">{rec.fields[label] ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
 * Documents & Circulars
 * ============================================================ */

type DocSection =
  | { heading: string; kind: "empty" }
  | { heading: string; kind: "sub-empty"; subs: string[] }
  | { heading: string; kind: "static"; body: string; linkLabel: string };

const DOC_SECTIONS: DocSection[] = [
  { heading: "Prospectus of Forthcoming IPO", kind: "empty" },
  { heading: "IPO Allotment Result", kind: "empty" },
  { heading: "Draft prospectus/Information Memorandum submitted by Issuer", kind: "empty" },
  {
    heading: "Company's circular to Stock Brokers/Merchant Bankers",
    kind: "sub-empty",
    subs: ["Fixed Price", "Book Building", "Public Placement"],
  },
  {
    heading: "Consent Letter for forthcoming IPO(s)",
    kind: "sub-empty",
    subs: ["Fixed Price", "Book Building", "Public Placement"],
  },
  { heading: "Consolidated List for IPO", kind: "empty" },
  { heading: "Bank-Branch Code for forthcoming IPO(s)", kind: "empty" },
  {
    heading: "New Public Issue Application Process",
    kind: "static",
    body:
      "Applications for new public issues are submitted through the applicant's TREC-holding broker via the EBL IPO subscription portal. Investors must hold an active BO account and maintain sufficient balance in their consolidated customer account before the subscription cutoff.",
    linkLabel: "Application process guideline (PDF)",
  },
  { heading: "Extract of Prospectus submitted for IPO", kind: "empty" },
];

function IpoDocuments() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 pt-10 pb-16 space-y-4">
      {DOC_SECTIONS.map((s) => (
        <div
          key={s.heading}
          className="rounded-xl p-5"
          style={{ background: "rgb(var(--surface-rgb) / 0.55)", border: "1px solid rgb(var(--ov) / 0.06)" }}
        >
          <h3 className="text-[14.5px] font-semibold mb-3">{s.heading}</h3>

          {s.kind === "empty" && <EmptyDocList />}

          {s.kind === "sub-empty" && (
            <div className="space-y-4">
              {s.subs.map((sub) => (
                <div key={sub}>
                  <div className="text-[12px] uppercase tracking-[0.18em] mb-2" style={{ color: "var(--text-muted)" }}>
                    {sub}
                  </div>
                  <EmptyDocList />
                </div>
              ))}
            </div>
          )}

          {s.kind === "static" && (
            <div>
              <p className="text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                {s.body}
              </p>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium"
                style={{ color: "var(--primary)" }}
              >
                <FileDown className="w-4 h-4" /> {s.linkLabel}
              </a>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

function EmptyDocList() {
  return (
    <div
      className="flex items-center gap-2 px-4 py-4 rounded-lg text-[12.5px]"
      style={{
        background: "rgb(var(--ov) / 0.03)",
        border: "1px dashed rgb(var(--ov) / 0.12)",
        color: "var(--text-muted)",
      }}
    >
      <Inbox className="w-4 h-4" />
      No items currently published.
    </div>
  );
}
