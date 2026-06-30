import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

type Notice = {
  code: string;
  title: string;
  body: string;
  date: string;
};

const todays: Notice[] = [
  {
    code: "REGL",
    title: "BSEC NEWS: Awareness Message for Investors",
    body:
      "Investors are requested to consider the following facts at the time of making investment decision in the Capital Market: 1. Without acquiring proper knowledge, information and experience regarding different aspects and matters of Capital Market, one should not invest in the Capital Market. 2. The gain or loss, whichever comes from the investment, it belongs to you. So, well-thought-of decisions are essential.",
    date: "30 Jun",
  },
  {
    code: "SQURPHARMA",
    title: "Dividend Disbursement Notice",
    body:
      "The Company has completed disbursement of cash dividend for the year ended 31 March 2026 through BEFTN/cheque to the entitled shareholders as per record date.",
    date: "30 Jun",
  },
  {
    code: "BATBC",
    title: "Board Meeting Decision",
    body:
      "The Board of Directors has recommended 600% cash dividend for the year ended 31 December 2025, subject to approval of shareholders at the forthcoming AGM.",
    date: "30 Jun",
  },
  {
    code: "GP",
    title: "Credit Rating Report",
    body:
      "Long term rating reaffirmed at AAA and short term rating at ST-1 by Credit Rating Agency of Bangladesh Limited (CRAB) based on audited financials of 2025.",
    date: "29 Jun",
  },
  {
    code: "BRACBANK",
    title: "Spot Trading Notice",
    body:
      "Trading of the shares will be held under 'Spot' category from 01 July 2026 to 03 July 2026 and record date will be on 06 July 2026.",
    date: "29 Jun",
  },
  {
    code: "RENATA",
    title: "Price Sensitive Information",
    body:
      "The Board of Directors has decided to set up a new manufacturing facility for biologics at a project cost of approximately BDT 1,200 crore, to be financed through internal sources and bank borrowing.",
    date: "28 Jun",
  },
];

const TABS = ["Today's News", "Last Seven Days' News", "News Archive"] as const;

export function NoticeBoard() {
  const { t } = useLang();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Today's News");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  // Auto-scroll loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      if (!paused && el) {
        el.scrollTop += 0.5;
        if (el.scrollTop >= el.scrollHeight / 2) {
          el.scrollTop = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, tab]);

  const items = todays; // single dataset for now

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
    >
      <div
        className="px-3.5 py-2 flex items-center justify-between"
        style={{ background: "var(--brand-600)", color: "#fff" }}
      >
        <div className="text-[12.5px] font-semibold tracking-wide uppercase">
          {t("Today's News")}
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

      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex-1 overflow-hidden relative px-4 py-3"
        style={{
          background: "rgb(254 252 232)",
          minHeight: 320,
          maxHeight: 420,
        }}
      >
        {/* duplicate list for seamless loop */}
        {[0, 1].map((dup) => (
          <div key={dup} className="space-y-4">
            <p
              className="text-[13px] leading-[1.55]"
              style={{ color: "#8b2a2a" }}
            >
              {t(
                "Honorable Investors, Good morning! Please make your investment decision based on Company fundamentals, technical analysis, price level and disclosed information. Avoid rumor-based speculations."
              )}
            </p>
            {items.map((n, i) => (
              <div key={`${dup}-${i}`} className="text-[13px] leading-[1.55]">
                <div style={{ color: "#b8554d" }}>
                  <span className="font-semibold">{t("Trading Code")}:</span>{" "}
                  <span className="font-bold" style={{ color: "#8b2a2a" }}>
                    {n.code}
                  </span>
                </div>
                <div style={{ color: "#b8554d" }}>
                  <span className="font-semibold">{t("News Title")}:</span>{" "}
                  <span style={{ color: "#8b2a2a" }}>{t(n.title)}</span>
                </div>
                <p className="mt-1" style={{ color: "#8b2a2a" }}>
                  {t(n.body)}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        className="grid grid-cols-3 text-[12px]"
        style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)" }}
      >
        {TABS.map((label) => {
          const active = tab === label;
          return (
            <button
              key={label}
              onClick={() => setTab(label)}
              className="py-2 px-2 font-semibold transition"
              style={{
                color: active ? "var(--brand-600)" : "var(--text-secondary)",
                background: active ? "var(--surface)" : "transparent",
                borderRight: "1px solid var(--line)",
              }}
            >
              {t(label)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
