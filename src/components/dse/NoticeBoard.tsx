import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Megaphone, Bell, FileText, AlertCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

type Notice = {
  code: string;
  type: "PSI" | "Dividend" | "AGM" | "Notice";
  title: string;
  body: string;
  date: string;
  time: string;
};

const todays: Notice[] = [
  {
    code: "REGL",
    type: "Notice",
    title: "BSEC Awareness Message for Investors",
    body:
      "Investors are requested to acquire proper knowledge, information and experience regarding different aspects of the Capital Market before investing. Avoid rumor-based decisions.",
    date: "30 Jun",
    time: "10:02",
  },
  {
    code: "SQURPHARMA",
    type: "Dividend",
    title: "Dividend Disbursement Notice",
    body:
      "Disbursement of cash dividend for the year ended 31 March 2026 has been completed through BEFTN/cheque to entitled shareholders.",
    date: "30 Jun",
    time: "11:14",
  },
  {
    code: "BATBC",
    type: "PSI",
    title: "Board Meeting Decision · 600% Cash Dividend",
    body:
      "The Board recommended 600% cash dividend for FY2025, subject to shareholders' approval at the forthcoming AGM.",
    date: "30 Jun",
    time: "12:30",
  },
  {
    code: "GP",
    type: "PSI",
    title: "Credit Rating Reaffirmed at AAA",
    body:
      "Long term rating reaffirmed at AAA and short term at ST-1 by CRAB based on audited financials of 2025.",
    date: "29 Jun",
    time: "16:45",
  },
  {
    code: "BRACBANK",
    type: "Notice",
    title: "Spot Trading Notice",
    body:
      "Shares to be traded under 'Spot' category from 01–03 July 2026. Record date: 06 July 2026.",
    date: "29 Jun",
    time: "14:20",
  },
  {
    code: "RENATA",
    type: "PSI",
    title: "New Biologics Manufacturing Facility",
    body:
      "Board approved a BDT 1,200 Cr biologics plant, financed through internal sources and bank borrowing.",
    date: "28 Jun",
    time: "13:05",
  },
  {
    code: "BEXIMCO",
    type: "AGM",
    title: "32nd AGM Notice",
    body:
      "32nd Annual General Meeting to be held on 28 July 2026 at 11:00 AM via digital platform.",
    date: "28 Jun",
    time: "10:30",
  },
];

const TABS = ["Today's News", "Last Seven Days", "News Archive"] as const;

const typeMeta: Record<Notice["type"], { color: string; bg: string; icon: typeof Bell }> = {
  PSI: { color: "var(--red-down, #c0392b)", bg: "rgba(192,57,43,0.10)", icon: AlertCircle },
  Dividend: { color: "var(--green-up, #1f7a3a)", bg: "rgba(31,122,58,0.10)", icon: FileText },
  AGM: { color: "var(--amber, #b8860b)", bg: "rgba(184,134,11,0.10)", icon: Bell },
  Notice: { color: "var(--brand-600, #0b4f8a)", bg: "rgba(11,79,138,0.08)", icon: Megaphone },
};

export function NoticeBoard() {
  const { t } = useLang();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Today's News");
  const [paused, setPaused] = useState(false);

  const items = todays;
  // duration scales roughly with content length
  const duration = Math.max(28, items.length * 6);

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{
          background: "linear-gradient(180deg, var(--brand-700, #093d6b), var(--brand-600, #0b4f8a))",
          color: "#fff",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.25)" }}
          />
          <div className="text-[12.5px] font-semibold tracking-wider uppercase">
            {t("Live Notice Board")}
          </div>
          <span className="text-[10.5px] uppercase tracking-wider opacity-80">
            · {t(tab)}
          </span>
        </div>
        <Link
          to="/news"
          className="text-[11.5px] inline-flex items-center gap-1 opacity-90 hover:opacity-100"
          style={{ color: "#fff" }}
        >
          {t("All notices")}
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Scrolling track */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="notice-viewport relative overflow-hidden flex-1"
        style={{
          background: "var(--surface)",
          minHeight: 360,
          maxHeight: 420,
        }}
      >
        <div
          className="notice-track"
          style={{
            animation: `notice-roll ${duration}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="px-3 py-3 space-y-2">
              {items.map((n, i) => {
                const meta = typeMeta[n.type];
                const Icon = meta.icon;
                return (
                  <Link
                    key={`${dup}-${i}`}
                    to="/news"
                    className="block group transition"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderLeft: `3px solid ${meta.color}`,
                      borderRadius: 2,
                      padding: "10px 12px",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className="inline-flex items-center justify-center"
                          style={{
                            width: 18,
                            height: 18,
                            background: meta.bg,
                            color: meta.color,
                            borderRadius: 2,
                          }}
                        >
                          <Icon className="w-3 h-3" />
                        </span>
                        <span
                          className="text-[10.5px] font-bold tracking-wider uppercase"
                          style={{ color: meta.color }}
                        >
                          {n.type}
                        </span>
                        <span
                          className="text-[12px] font-semibold truncate"
                          style={{ color: "var(--ink)" }}
                        >
                          {n.code}
                        </span>
                      </div>
                      <span
                        className="text-[10.5px] tnum whitespace-nowrap"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {n.date} · {n.time}
                      </span>
                    </div>
                    <div
                      className="text-[13px] font-semibold leading-snug group-hover:underline"
                      style={{ color: "var(--ink)" }}
                    >
                      {t(n.title)}
                    </div>
                    <p
                      className="mt-0.5 text-[12px] leading-[1.45]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t(n.body)}
                    </p>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* fade masks */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-8"
          style={{
            background: "linear-gradient(180deg, var(--surface), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          style={{
            background: "linear-gradient(0deg, var(--surface), transparent)",
          }}
        />
      </div>

      {/* Tabs footer */}
      <div
        className="grid grid-cols-3 text-[12px]"
        style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)" }}
      >
        {TABS.map((label, idx) => {
          const active = tab === label;
          return (
            <button
              key={label}
              onClick={() => setTab(label)}
              className="py-2 px-2 font-semibold transition"
              style={{
                color: active ? "var(--brand-600)" : "var(--text-secondary)",
                background: active ? "var(--surface)" : "transparent",
                borderRight: idx < TABS.length - 1 ? "1px solid var(--line)" : "none",
                borderTop: active ? "2px solid var(--brand-600)" : "2px solid transparent",
              }}
            >
              {t(label)}
            </button>
          );
        })}
      </div>

      <style>{`
        .notice-track {
          will-change: transform;
        }
        @keyframes notice-roll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}
