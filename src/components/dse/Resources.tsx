import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

/* ---------- Data ---------- */

const reports = [
  { date: "Jun 04", title: "Daily market summary", meta: "PDF · 1.2 MB", tag: "Daily" },
  { date: "May 30", title: "Weekly bulletin · Wk 22", meta: "PDF · 3.8 MB", tag: "Weekly" },
  { date: "May 31", title: "Monthly digest · May 2026", meta: "PDF · 6.4 MB", tag: "Monthly" },
];

const upcomingSessions = [
  { day: "08", month: "Jun", note: "Regular session · 10:00 BST" },
  { day: "09", month: "Jun", note: "Regular session · 10:00 BST" },
  { day: "10", month: "Jun", note: "Regular session · 10:00 BST" },
];

const tools = [
  { label: "Circuit breaker list", Icon: ShieldCheck },
  { label: "BO account guide", Icon: FileText },
  { label: "Investor complaints portal", Icon: FileText },
];

/* ---------- Shared card shell ---------- */

function CardShell({
  title,
  action,
  children,
  delay = 0,
}: {
  title: string;
  action?: { label: string; to?: string; hash?: string };
  children: React.ReactNode;
  delay?: number;
}) {
  const { t } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl flex flex-col"
      style={{
        padding: 20,
        background:
          "linear-gradient(160deg, rgb(var(--ov) / 0.04) 0%, rgb(var(--ov) / 0.01) 100%)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--text-muted)" }}
        >
          {t(title)}
        </div>
        {action ? (
          <Link
            to={action.to ?? "/reports"}
            hash={action.hash}
            className="text-[11px] inline-flex items-center gap-1"
            style={{ color: "var(--green-up)" }}
          >
            {t(action.label)} <ArrowUpRight className="w-3 h-3" />
          </Link>
        ) : null}
      </div>
      {children}
    </motion.div>
  );
}

/* ---------- Reports card ---------- */

function ReportsCard() {
  const { t } = useLang();
  return (
    <CardShell title="Reports & filings" action={{ label: "View all", to: "/reports" }}>
      <div className="flex-1">
        {reports.map((r) => (
          <a
            key={r.title}
            className="group grid grid-cols-[56px_1fr_auto] items-center gap-3 py-2 border-t cursor-pointer"
            style={{ borderColor: "rgb(var(--ov) / 0.05)", minHeight: 44 }}
          >
            <div
              className="text-[11px] tnum uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {r.date}
            </div>
            <div className="min-w-0">
              <div
                className="text-[14px] font-medium tracking-tight truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {t(r.title)}
              </div>
              <div
                className="text-[11px] mt-0.5 flex items-center gap-2"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase"
                  style={{
                    background: "rgba(127,217,176,0.06)",
                    color: "var(--green-up)",
                  }}
                >
                  {t(r.tag)}
                </span>
                <span className="report-meta">{r.meta}</span>
              </div>
            </div>
            <ArrowUpRight
              className="w-4 h-4 opacity-40 group-hover:opacity-100"
              style={{ color: "var(--text-secondary)" }}
            />
          </a>
        ))}
      </div>
      <div className="mt-3">
        <Link
          to="/reports"
          className="text-[12px] font-medium inline-flex items-center gap-1"
          style={{ color: "var(--green-up)" }}
        >
          {t("View all reports →")} <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </CardShell>
  );
}

/* ---------- Sessions card ---------- */

function SessionsCard() {
  const { t } = useLang();
  return (
    <CardShell title="Next sessions" action={{ label: "Full calendar", to: "/reports", hash: "calendar" }}>
      {/* Desktop / tablet: vertical list */}
      <div className="sessions-list flex-1 space-y-2">
        {upcomingSessions.map((s) => (
          <div
            key={s.day + s.month}
            className="flex items-center gap-3 border-t"
            style={{ borderColor: "rgb(var(--ov) / 0.05)", minHeight: 44 }}
          >
            <div
              className="text-[18px] tnum font-semibold leading-none w-8"
              style={{ color: "var(--text-primary)" }}
            >
              {s.day}
            </div>
            <div
              className="text-[11px] uppercase tracking-wider tnum w-9"
              style={{ color: "var(--text-muted)" }}
            >
              {s.month}
            </div>
            <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
              {t(s.note)}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: single compact inline row */}
      <div className="sessions-inline hidden items-center gap-2">
        <CalendarDays className="w-4 h-4" style={{ color: "var(--green-up)" }} />
        <div className="text-[13px] tnum" style={{ color: "var(--text-primary)" }}>
          {upcomingSessions.map((s) => `${s.month} ${parseInt(s.day, 10)}`).join(" · ")}
        </div>
      </div>

      <div className="mt-3">
        <Link
          to="/reports"
          hash="calendar"
          className="text-[12px] font-medium inline-flex items-center gap-1"
          style={{ color: "var(--green-up)" }}
        >
          {t("Full calendar →")} <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </CardShell>
  );
}

/* ---------- Tools card ---------- */

function ToolsCard() {
  const { t } = useLang();
  return (
    <CardShell title="Investor tools" delay={0.05}>
      <div className="flex-1">
        {tools.map((tool) => (
          <a
            key={tool.label}
            className="group flex items-center justify-between border-t cursor-pointer"
            style={{ borderColor: "rgb(var(--ov) / 0.05)", minHeight: 44 }}
          >
            <div className="flex items-center gap-3">
              <tool.Icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <span className="text-[13px]" style={{ color: "var(--text-primary)" }}>
                {t(tool.label)}
              </span>
            </div>
            <ArrowUpRight
              className="w-4 h-4 opacity-30 group-hover:opacity-100"
              style={{ color: "var(--text-secondary)" }}
            />
          </a>
        ))}
      </div>

      <div
        className="flex items-center justify-between gap-3 mt-3 pt-3 border-t"
        style={{ borderColor: "rgb(var(--ov) / 0.06)" }}
      >
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.22em] mb-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            {t("24/7 helpline")}
          </div>
          <div className="text-[14px] tnum" style={{ color: "var(--text-primary)" }}>
            +880 9612-345678
          </div>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(127,217,176,0.08)" }}
        >
          <Phone className="w-4 h-4" style={{ color: "var(--green-up)" }} />
        </div>
      </div>
    </CardShell>
  );
}

/* ---------- Section ---------- */

export function Resources() {
  const { t } = useLang();
  return (
    <section className="home-section relative">
      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center justify-between gap-4 mb-6 pb-3 border-b"
          style={{ borderColor: "rgb(var(--ov) / 0.08)" }}
        >
          <div
            className="text-[11px] font-medium uppercase"
            style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
          >
            {t("Market reports & tools")}
          </div>
          <Link
            to="/reports"
            className="text-[11px] font-medium inline-flex items-center gap-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("Browse archive →")} <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          <ReportsCard />
          <SessionsCard />
          <ToolsCard />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .report-meta { display: none !important; }
          .sessions-list { display: none !important; }
          .sessions-inline { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
