import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/holidays")({
  head: () => ({
    meta: [
      { title: "Holidays and Trading Sessions | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "DSE holiday calendar for 2026 and the daily trading sessions — pre-open, continuous, closing and post-closing.",
      },
      { property: "og:title", content: "Holidays & Trading Sessions | DSE" },
      { property: "og:description", content: "Calendar and trading sessions of DSE." },
    ],
  }),
  component: HolidaysPage,
});

type Holiday = { date: string; occasion: string; note?: string };

const HOLIDAYS_2026: Holiday[] = [
  { date: "Feb 21, 2026", occasion: "International Mother Language Day" },
  { date: "Mar 17, 2026", occasion: "Birthday of Father of the Nation & Children's Day" },
  { date: "Mar 26, 2026", occasion: "Independence Day" },
  { date: "Apr 14, 2026", occasion: "Bengali New Year (Pohela Boishakh)" },
  { date: "May 01, 2026", occasion: "May Day" },
  { date: "Jun 16, 2026", occasion: "Eid-ul-Azha", note: "*" },
  { date: "Aug 15, 2026", occasion: "National Mourning Day" },
  { date: "Sep 04, 2026", occasion: "Eid-e-Miladunnabi", note: "*" },
  { date: "Dec 16, 2026", occasion: "Victory Day" },
  { date: "Dec 25, 2026", occasion: "Christmas Day" },
];

const SESSIONS = [
  {
    name: "Pre-Open and Opening Session",
    body: "An order-entry and call-auction phase before continuous trading. Buy/sell orders are accepted and matched in a single opening auction to determine the opening price.",
  },
  {
    name: "Continuous Session",
    body: "Regular two-way auction trading where orders are matched continuously by price–time priority throughout the trading day.",
  },
  {
    name: "Closing and Post-Closing Session",
    body: "A closing-price determination phase followed by a post-close window where trades may be entered at the established closing price.",
  },
];

function HolidaysPage() {
  const { t } = useLang();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Dhaka Stock Exchange")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Holidays and Trading Sessions")}
          </h1>
        </div>
      </section>

      {/* List of holidays */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <h2 className="text-[18px] md:text-[20px] font-semibold" style={{ color: "var(--ink)" }}>
          {t("List of Holidays")}
        </h2>
        <p className="mt-2 text-[14px]" style={{ color: "var(--text-secondary)" }}>
          {t("DSE will observe following Holidays during the Calendar Year 2026 (January to December).")}
        </p>

        <div className="mt-4 overflow-x-auto" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                {[t("Date"), t("Occasion")].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--line)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOLIDAYS_2026.map((h, i) => (
                <tr key={h.date} style={{
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                  borderTop: "1px solid var(--line)",
                }}>
                  <td className="px-3 py-2.5 tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>{h.date}</td>
                  <td className="px-3 py-2.5" style={{ color: "var(--text-secondary)" }}>
                    {h.occasion}{h.note ? <span style={{ color: "var(--red-down)" }}> {h.note}</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] italic" style={{ color: "var(--text-muted)" }}>
          {t("(*): Subject to Appearance of the Moon.")}
        </p>
      </section>

      {/* Trading sessions */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <h2 className="text-[18px] md:text-[20px] font-semibold" style={{ color: "var(--ink)" }}>
          {t("Trading Sessions")}
        </h2>
        <p className="mt-2 text-[14px]" style={{ color: "var(--text-secondary)" }}>
          {t("Trading at DSE is conducted in 3 phases:")}
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {SESSIONS.map((s, idx) => (
            <div key={s.name} className="p-4" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--brand-600)" }}>
                {t("Phase")} {idx + 1}
              </div>
              <div className="mt-1 text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
                {t(s.name)}
              </div>
              <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
                {t(s.body)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
          <h3 className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
            {t("Opening Price Algorithm for call auction mechanism")}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
            {t("During the Pre-Open and Opening Session, buy and sell orders are collected and a single equilibrium price is determined by the call auction algorithm — the price that maximises executable volume, minimises order imbalance and is closest to the previous reference price. All matched trades execute at this single opening price.")}
          </p>
        </div>

        <div className="mt-4 p-4" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
          <h3 className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
            {t("Closing and Post-closing session")}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
            {t("The closing price for a security shall be determined as per the weighted average price of all the trades in the last 30 (thirty) minutes before the closing session. If there is no trade during the above specified time, the weighted average price of maximum 20 (twenty) number of trades preceding the above 30 (thirty) minutes shall be taken for determination of closing price. If there has been no trade in the security during the continuous trading session the opening price of the security shall be treated as the closing price.")}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
