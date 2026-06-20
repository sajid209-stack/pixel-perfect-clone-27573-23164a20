import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  LineChart,
  PiggyBank,
  PlayCircle,
  Scale,
  Search,
  Shield,
  Sparkles,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Investor education | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Plain-language guides on opening a BO account, reading financial statements, understanding indices, IPO mechanics and investor protection on the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "Learn | Dhaka Stock Exchange" },
      {
        property: "og:description",
        content: "Plain-language guides to investing on the Dhaka Stock Exchange.",
      },
    ],
  }),
  component: LearnPage,
});

type Level = "Beginner" | "Intermediate" | "Advanced";
type Category =
  | "Getting started"
  | "Markets & products"
  | "Reading reports"
  | "Strategy"
  | "Regulation";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  level: Level;
  minutes: number;
  format: "Guide" | "Video" | "Glossary";
  featured?: boolean;
};

const articles: Article[] = [
  {
    id: "bo-account",
    title: "How to open a BO account in 15 minutes",
    excerpt:
      "Step-by-step walk-through for opening a Beneficiary Owner account with a depository participant, the documents to bring, and what to do on day one.",
    category: "Getting started",
    level: "Beginner",
    minutes: 6,
    format: "Guide",
    featured: true,
  },
  {
    id: "first-trade",
    title: "Placing your first trade — order types explained",
    excerpt:
      "Market, limit, stop-loss and odd-lot orders, with screenshots from common broker platforms and what each one actually costs in commission.",
    category: "Getting started",
    level: "Beginner",
    minutes: 8,
    format: "Guide",
  },
  {
    id: "indices-explained",
    title: "DSEX, DS30, DSES — what each index actually measures",
    excerpt:
      "Why the broad-market DSEX moves differently from the blue-chip DS30, how free-float weighting works, and when to look at the Shariah-screened DSES.",
    category: "Markets & products",
    level: "Beginner",
    minutes: 5,
    format: "Guide",
    featured: true,
  },
  {
    id: "ipo-process",
    title: "How a Bangladeshi IPO actually works",
    excerpt:
      "From draft prospectus to listing day — the role of issue managers, the BSEC review window, book-building vs fixed-price, and the lottery allotment.",
    category: "Markets & products",
    level: "Intermediate",
    minutes: 11,
    format: "Guide",
  },
  {
    id: "read-income-statement",
    title: "Reading an income statement without the jargon",
    excerpt:
      "Revenue, gross profit, EBITDA, net income — what each line actually tells you about a company, and the three red flags to watch for.",
    category: "Reading reports",
    level: "Beginner",
    minutes: 9,
    format: "Guide",
  },
  {
    id: "balance-sheet-bd",
    title: "Decoding the balance sheet of a Bangladeshi bank",
    excerpt:
      "Why a bank's balance sheet looks different from any other listed company, and how to read CRAR, NPL ratio and deposit mix without an accounting degree.",
    category: "Reading reports",
    level: "Intermediate",
    minutes: 12,
    format: "Guide",
  },
  {
    id: "valuation-101",
    title: "P/E, P/B and dividend yield in 10 minutes",
    excerpt:
      "The three ratios every investor on the DSE should be able to compute by heart, plus the sector benchmarks for what is actually expensive.",
    category: "Strategy",
    level: "Intermediate",
    minutes: 10,
    format: "Guide",
    featured: true,
  },
  {
    id: "diversification",
    title: "Building a 10-stock portfolio for the DSE",
    excerpt:
      "A worked example covering sector weights, position sizing, rebalancing rules and how to think about cash drag in a frontier market.",
    category: "Strategy",
    level: "Advanced",
    minutes: 14,
    format: "Guide",
  },
  {
    id: "investor-protection",
    title: "Your rights as a retail investor",
    excerpt:
      "What the Investor Protection Fund covers, how to file a complaint against a broker, and the BSEC complaints route when it matters most.",
    category: "Regulation",
    level: "Beginner",
    minutes: 4,
    format: "Guide",
  },
  {
    id: "insider-trading",
    title: "Insider trading rules every investor should know",
    excerpt:
      "The Bangladesh Securities and Exchange Commission rules on insider trading, blackout windows, and what counts as price-sensitive information.",
    category: "Regulation",
    level: "Intermediate",
    minutes: 7,
    format: "Guide",
  },
  {
    id: "video-tour",
    title: "Tour of the DSE trading floor (video)",
    excerpt:
      "A 4-minute video walking through the modern automated trading system, the surveillance desk and the clearing & settlement cycle.",
    category: "Markets & products",
    level: "Beginner",
    minutes: 4,
    format: "Video",
  },
  {
    id: "glossary",
    title: "Glossary — 80 terms every DSE investor will hear",
    excerpt:
      "From AGM to Z-category — a searchable glossary of the terminology used across disclosures, broker conversations and financial news.",
    category: "Getting started",
    level: "Beginner",
    minutes: 3,
    format: "Glossary",
  },
];

const categoryMeta: Record<Category, { icon: LucideIcon; tone: string }> = {
  "Getting started": { icon: GraduationCap, tone: "var(--primary)" },
  "Markets & products": { icon: LineChart, tone: "#7fbcd9" },
  "Reading reports": { icon: BookOpen, tone: "#f0c674" },
  Strategy: { icon: PiggyBank, tone: "var(--primary)" },
  Regulation: { icon: Shield, tone: "var(--red-down)" },
};

const cats: ("All" | Category)[] = [
  "All",
  "Getting started",
  "Markets & products",
  "Reading reports",
  "Strategy",
  "Regulation",
];

const levels: ("All" | Level)[] = ["All", "Beginner", "Intermediate", "Advanced"];

const journeySteps: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Wallet,
    title: "Set up",
    desc: "Open a BO account and link a trading account with a TREC-holding broker.",
  },
  {
    icon: BookOpen,
    title: "Understand",
    desc: "Learn how indices, IPOs and disclosures work before placing capital.",
  },
  {
    icon: LineChart,
    title: "Analyse",
    desc: "Read financial statements, compute valuation ratios and screen the market.",
  },
  {
    icon: Sparkles,
    title: "Build",
    desc: "Construct a diversified portfolio with sensible position sizes and rebalancing rules.",
  },
  {
    icon: Scale,
    title: "Stay safe",
    desc: "Know your rights, the regulatory framework and how to file a complaint.",
  },
];

function LearnPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (cat !== "All" && a.category !== cat) return false;
      if (level !== "All" && a.level !== level) return false;
      if (q && !(a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)))
        return false;
      return true;
    });
  }, [cat, level, query]);

  const featured = useMemo(() => articles.filter((a) => a.featured).slice(0, 3), []);

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            Investor education
          </div>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
            <div>
              <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
                Investor Education
              </h1>

              <p className="mt-4 text-[15px] max-w-[560px]" style={{ color: "var(--text-secondary)" }}>
                Whether you're opening your first BO account or modelling a discounted-cash-flow on
                a listed bank, every guide here is written by working professionals — no fluff, no
                pitch, no upsell.
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-px rounded-xl overflow-hidden"
              style={{ background: "rgb(var(--ov) / 0.06)" }}
            >
              <Stat label="Guides" value={articles.filter((a) => a.format === "Guide").length.toString()} />
              <Stat label="Videos" value={articles.filter((a) => a.format === "Video").length.toString()} />
              <Stat label="Glossary terms" value="80" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-[1440px] mx-auto px-6 pt-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
              Editor's picks
            </div>
            <h2 className="text-[26px] font-semibold tracking-tight">Start here</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((a, i) => (
            <FeaturedCard key={a.id} a={a} i={i} />
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="max-w-[1440px] mx-auto px-6 pt-16">
        <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
          The investor journey
        </div>
        <h2 className="text-[26px] font-semibold tracking-tight mb-6">Five stages, in order</h2>

        <div
          className="rounded-2xl p-2 grid md:grid-cols-5 gap-px overflow-hidden"
          style={{
            background: "rgb(var(--ov) / 0.06)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          {journeySteps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="px-5 py-6 rounded-xl"
                style={{ background: "var(--page-bg)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgb(var(--brand-tint) / 0.10)",
                      color: "var(--primary)",
                      border: "1px solid rgb(var(--brand-tint) / 0.20)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className="text-[10.5px] uppercase tracking-[0.2em] tnum"
                    style={{ color: "var(--text-muted)" }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="text-[14.5px] font-semibold mb-1.5">{s.title}</div>
                <div className="text-[12px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
                  {s.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-[1440px] mx-auto px-6 pt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
              All guides
            </div>
            <h2 className="text-[26px] font-semibold tracking-tight">Browse the library</h2>
          </div>
        </div>

        <div
          className="rounded-2xl p-3 mb-6 flex items-center gap-2 flex-wrap"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div
            className="flex items-center gap-2 h-9 pl-3 pr-3 rounded-full text-[13px] min-w-[240px] flex-1 max-w-md"
            style={{
              background: "rgb(var(--ov) / 0.04)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides…"
              className="flex-1 bg-transparent outline-none placeholder:opacity-60"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {cats.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="relative px-3 h-8 rounded-full text-[12px] font-medium transition"
                  style={{ color: active ? "var(--primary-foreground)" : "var(--text-secondary)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="learnCat"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--primary)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 ml-auto">
            {levels.map((l) => {
              const active = l === level;
              return (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className="px-2.5 h-7 rounded-full text-[11px] font-medium transition"
                  style={{
                    background: active ? "rgb(var(--ov) / 0.06)" : "transparent",
                    color: active ? "var(--text-primary)" : "var(--text-muted)",
                    border: active ? "1px solid rgb(var(--ov) / 0.10)" : "1px solid transparent",
                  }}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((a, i) => (
              <ArticleCard key={a.id} a={a} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
            No guides match your filters.
          </div>
        )}
      </section>

      {/* CTA strip */}
      <section className="max-w-[1440px] mx-auto px-6 pt-20 pb-10">
        <div
          className="rounded-2xl p-10 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            background:
              "linear-gradient(160deg, rgb(var(--brand-tint) / 0.10) 0%, rgb(var(--ov) / 0.02) 100%)",
            border: "1px solid rgb(var(--brand-tint) / 0.18)",
          }}
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] mb-2" style={{ color: "var(--text-muted)" }}>
              Ready to apply what you've learned?
            </div>
            <h2 className="text-[30px] font-semibold tracking-tight leading-[1.1] max-w-[34ch]">
              Browse all listed companies and start building your watchlist.
            </h2>
          </div>
          <Link
            to="/companies"
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[14px] font-semibold shrink-0"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 6px 20px -6px rgb(var(--brand-tint) / 0.55)",
            }}
          >
            Open the screener <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 min-w-[110px]" style={{ background: "var(--page-bg)" }}>
      <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="mt-1 text-[20px] font-semibold tnum tracking-tight">{value}</div>
    </div>
  );
}

function FeaturedCard({ a, i }: { a: Article; i: number }) {
  const meta = categoryMeta[a.category];
  const Icon = meta.icon;
  return (
    <motion.a
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="group block p-7 rounded-2xl cursor-pointer transition-colors relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgb(var(--ov) / 0.04) 0%, rgb(var(--ov) / 0.01) 100%)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${meta.tone}1A`, color: meta.tone }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
          {a.category}
        </div>
      </div>
      <h3 className="text-[20px] font-semibold leading-[1.25] tracking-tight mb-3 group-hover:text-[color:var(--text-primary)]">
        {a.title}
      </h3>
      <p className="text-[13px] leading-[1.7] mb-6" style={{ color: "var(--text-secondary)" }}>
        {a.excerpt}
      </p>
      <div className="flex items-center justify-between text-[11.5px]" style={{ color: "var(--text-muted)" }}>
        <span className="tnum">{a.minutes} min read</span>
        <span className="inline-flex items-center gap-1 transition group-hover:text-[color:var(--primary)]">
          Read guide <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </motion.a>
  );
}

function ArticleCard({ a, i }: { a: Article; i: number }) {
  const meta = categoryMeta[a.category];
  const Icon = a.format === "Video" ? PlayCircle : a.format === "Glossary" ? BookOpen : meta.icon;
  return (
    <motion.a
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.15) }}
      whileHover={{ y: -2 }}
      className="group block p-6 rounded-xl cursor-pointer transition-colors"
      style={{
        background: "rgb(var(--surface-rgb) / 0.6)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${meta.tone}1A`, color: meta.tone }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="text-[10px] uppercase tracking-[0.16em] px-1.5 py-0.5 rounded"
            style={{ background: "rgb(var(--ov) / 0.05)", color: "var(--text-muted)" }}
          >
            {a.level}
          </span>
          {a.format !== "Guide" && (
            <span
              className="text-[10px] uppercase tracking-[0.16em] px-1.5 py-0.5 rounded"
              style={{ background: `${meta.tone}1A`, color: meta.tone }}
            >
              {a.format}
            </span>
          )}
        </div>
      </div>
      <h3 className="text-[15.5px] font-semibold leading-[1.35] tracking-tight mb-2">
        {a.title}
      </h3>
      <p className="text-[12.5px] leading-[1.65] mb-5 line-clamp-3" style={{ color: "var(--text-secondary)" }}>
        {a.excerpt}
      </p>
      <div className="flex items-center justify-between text-[11px]" style={{ color: "var(--text-muted)" }}>
        <span className="tnum">{a.minutes} min · {a.category}</span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" style={{ color: "var(--primary)" }} />
      </div>
    </motion.a>
  );
}
