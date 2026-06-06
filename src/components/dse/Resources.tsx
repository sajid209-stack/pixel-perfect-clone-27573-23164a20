import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  Phone,
  ShieldCheck,
} from "lucide-react";

/* ---------- Reports — editorial list with date column ---------- */

const reports = [
  { date: "Jun 04", title: "Daily market summary", meta: "PDF · 1.2 MB", tag: "Daily" },
  { date: "May 30", title: "Weekly bulletin · Wk 22", meta: "PDF · 3.8 MB", tag: "Weekly" },
  { date: "May 31", title: "Monthly digest · May 2026", meta: "PDF · 6.4 MB", tag: "Monthly" },
];


function ReportsPanel() {
  return (
    <div className="lg:col-span-7">
      <div className="flex items-baseline justify-between mb-6">
        <div
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-muted)" }}
        >
          Reports & filings
        </div>
        <Link
          to="/reports"
          className="text-[12px] inline-flex items-center gap-1 cursor-pointer"
          style={{ color: "var(--text-secondary)" }}
        >
          Archive <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      <div>
        {reports.map((r, i) => (
          <motion.a
            key={r.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
            className="group grid grid-cols-[80px_1fr_auto] items-center gap-6 py-5 border-t cursor-pointer relative"
            style={{ borderColor: "rgb(var(--ov) / 0.05)" }}
          >
            <div
              className="text-[12px] tnum uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {r.date}
            </div>
            <div className="min-w-0">
              <div
                className="text-[17px] md:text-[19px] font-medium tracking-tight transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {r.title}
              </div>
              <div
                className="text-[12px] mt-1 flex items-center gap-3"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase"
                  style={{
                    background: "rgba(127,217,176,0.06)",
                    color: "var(--green-up)",
                  }}
                >
                  {r.tag}
                </span>
                <span className="report-meta">{r.meta}</span>
              </div>
            </div>
            <ArrowUpRight
              className="w-5 h-5 transition-all opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: "var(--text-secondary)" }}
            />
          </motion.a>
        ))}
        <div className="h-px w-full" style={{ background: "rgb(var(--ov) / 0.05)" }} />
        <div className="mt-4">
          <Link
            to="/reports"
            className="text-[12px] font-medium inline-flex items-center gap-1"
            style={{ color: "var(--green-up)" }}
          >
            View all reports → <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}


/* ---------- Side rail: calendar countdown + tools + helpline ---------- */

function CalendarTile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden p-8"
      style={{
        background:
          "linear-gradient(160deg, rgba(127,217,176,0.06) 0%, rgb(var(--ov) / 0.01) 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 100% 0%, rgba(127,217,176,0.10), transparent 70%)",
        }}
      />
      <div className="relative flex items-start justify-between">
        <div
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-muted)" }}
        >
          Next session
        </div>
        <CalendarDays className="w-4 h-4" style={{ color: "var(--green-up)" }} />
      </div>

      <div className="relative mt-8">
        <div
          className="text-[64px] leading-none font-semibold tnum tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          08
        </div>
        <div
          className="text-[14px] mt-2 tnum"
          style={{ color: "var(--text-secondary)" }}
        >
          June 2026 · 10:00 AM BST
        </div>
      </div>

      <div className="relative mt-8 pt-6 border-t" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="flex items-baseline justify-between">
          <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
            Closed for
          </span>
          <span
            className="text-[12px] tnum"
            style={{ color: "var(--text-primary)" }}
          >
            Eid ul-Adha
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
            Holiday
          </span>
          <span className="text-[12px] tnum" style={{ color: "var(--text-primary)" }}>
            Jun 7, 2026
          </span>
        </div>
      </div>

      <a
        className="relative mt-6 inline-flex items-center gap-1 text-[12px] font-medium cursor-pointer"
        style={{ color: "var(--green-up)" }}
      >
        Full calendar <ArrowUpRight className="w-3 h-3" />
      </a>
    </motion.div>
  );
}

const tools = [
  { label: "Circuit breaker list", Icon: ShieldCheck },
  { label: "BO account guide", Icon: FileText },
  { label: "Investor complaints portal", Icon: FileText },
];

function ToolsTile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="text-[11px] uppercase tracking-[0.22em] mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        Investor tools
      </div>
      <div>
        {tools.map((t, i) => (
          <a
            key={t.label}
            className="group flex items-center justify-between py-4 border-t cursor-pointer"
            style={{ borderColor: "rgb(var(--ov) / 0.05)" }}
          >
            <div className="flex items-center gap-3">
              <t.Icon
                className="w-4 h-4"
                style={{ color: "var(--text-muted)" }}
              />
              <span
                className="text-[14px]"
                style={{ color: "var(--text-primary)" }}
              >
                {t.label}
              </span>
            </div>
            <ArrowUpRight
              className="w-4 h-4 transition-all opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: "var(--text-secondary)" }}
            />
          </a>
        ))}
        <div className="h-px w-full" style={{ background: "rgb(var(--ov) / 0.05)" }} />
      </div>
    </motion.div>
  );
}

function HelplineTile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-between gap-4 pt-6 border-t"
      style={{ borderColor: "rgb(var(--ov) / 0.06)" }}
    >
      <div>
        <div
          className="text-[11px] uppercase tracking-[0.22em] mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          24/7 helpline
        </div>
        <div
          className="text-[18px] tnum"
          style={{ color: "var(--text-primary)" }}
        >
          +880 9612-345678
        </div>
      </div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "rgba(127,217,176,0.08)" }}
      >
        <Phone className="w-4 h-4" style={{ color: "var(--green-up)" }} />
      </div>
    </motion.div>
  );
}

/* ---------- Section ---------- */

export function Resources() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mb-10 items-end">
          <div>
            <div
              className="text-[12px] uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Resources
            </div>
            <h2
              className="text-[40px] md:text-[52px] font-semibold tracking-tight leading-[1.05]"
              style={{ color: "var(--text-primary)" }}
            >
              Read the market, <br />
              on your own time.
            </h2>
          </div>
          <p
            className="text-[17px] leading-[1.8] max-w-[48ch] lg:justify-self-end"
            style={{ color: "var(--text-secondary)" }}
          >
            Daily tapes, weekly bulletins, and the calendar that tells you when
            the bell rings next — everything you need to stay close to the desk.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-16">
          <ReportsPanel />
          <div className="lg:col-span-5 space-y-12">
            <CalendarTile />
            <ToolsTile />
            <HelplineTile />
          </div>
        </div>
      </div>
    </section>
  );
}
