import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/otc")({
  head: () => ({
    meta: [
      { title: "OTC Market | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Over-the-Counter market at DSE: company listing, instruments, order forms, trading manuals, circuit breaker, and news.",
      },
      { property: "og:title", content: "OTC Market | DSE" },
      {
        property: "og:description",
        content: "OTC company listing, instruments, forms and trading manuals.",
      },
    ],
  }),
  component: OtcPage,
});

const SECTIONS = [
  { id: "about", label: "About OTC Market" },
  { id: "listing", label: "OTC Company Listing" },
  { id: "instruments", label: "Instruments" },
  { id: "forms", label: "Order Forms" },
  { id: "manuals", label: "Trading Manuals" },
  { id: "breaker", label: "OTC Circuit Breaker" },
  { id: "news", label: "OTC News" },
  { id: "sale", label: "Sale Orders" },
] as const;
type SectionId = (typeof SECTIONS)[number]["id"];

function OtcPage() {
  const { t } = useLang();
  const [sec, setSec] = useState<SectionId>("about");

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      {/* Header */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            {t("Dhaka Stock Exchange")}
          </div>
          <h1
            className="text-[28px] md:text-[34px] font-semibold tracking-tight leading-[1.1]"
            style={{ color: "var(--ink)" }}
          >
            {t("OTC Market")}
          </h1>
          <p
            className="mt-2 text-[13.5px] max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
            data-cms="otc.intro"
          >
            {t(
              "Over-the-Counter facilities for transaction of shares of unlisted or delisted securities, as per BSEC's OTC Rules, 2001.",
            )}
          </p>
          <div className="mt-3 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
            {t("Live data — provided by DSE")} · {t("updated")} {new Date().toLocaleString()}
          </div>
        </div>
      </section>

      {sec === "sale" ? (
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-8">
          <HorizontalSectionNav sec={sec} setSec={setSec} />
          <SaleOrders />
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6">
          {/* Sub-nav */}
          <aside>
            {/* Mobile tabs */}
            <div
              className="md:hidden inline-flex flex-wrap"
              style={{ border: "1px solid var(--line)", borderRadius: 2 }}
            >
              {SECTIONS.map((s, i) => {
                const active = sec === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSec(s.id)}
                    className="px-3 h-8 text-[12px] font-semibold"
                    style={{
                      background: active ? "var(--brand-600)" : "transparent",
                      color: active ? "#fff" : "var(--ink)",
                      borderLeft: i !== 0 ? "1px solid var(--line)" : "none",
                    }}
                  >
                    {t(s.label)}
                  </button>
                );
              })}
            </div>
            {/* Desktop left nav */}
            <nav
              className="hidden md:flex flex-col"
              style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
            >
              {SECTIONS.map((s, i) => {
                const active = sec === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSec(s.id)}
                    className="text-left px-3 py-2 text-[13px]"
                    style={{
                      background: active ? "var(--surface-2)" : "transparent",
                      color: active ? "var(--brand-600)" : "var(--ink)",
                      fontWeight: active ? 700 : 500,
                      borderTop: i !== 0 ? "1px solid var(--line)" : "none",
                      borderLeft: active ? "3px solid var(--brand-600)" : "3px solid transparent",
                    }}
                  >
                    {t(s.label)}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main */}
          <main>
            {sec === "about" && <About />}
            {sec === "listing" && <Listing />}
            {sec === "instruments" && <Instruments />}
            {sec === "forms" && <Forms />}
            {sec === "manuals" && <Manuals />}
            {sec === "breaker" && <Breaker />}
            {sec === "news" && <News />}
          </main>
        </div>
      )}


      <Footer />
    </div>
  );
}

/* ---------- Shared helpers ---------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[20px] md:text-[22px] font-semibold tracking-tight mb-3"
      style={{ color: "var(--ink)" }}
    >
      {children}
    </h2>
  );
}

function LiveLabel() {
  const { t } = useLang();
  return (
    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
      {t("Live data — provided by DSE")}
    </span>
  );
}

function Footnote({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p
      data-cms={id}
      contentEditable
      suppressContentEditableWarning
      className="mt-2 text-[11px] outline-none"
      style={{ color: "var(--text-muted)" }}
    >
      {children}
    </p>
  );
}

/* ---------- 1) About ---------- */

const ABOUT_PARAS = [
  `Over-the-Counter (OTC) means the facilities provided by an exchange for the purpose of buying or selling of unlisted or delisted securities from the stock exchanges. Dhaka Stock Exchange PLC. provides OTC facilities for transaction of share of companies as per SEC's directive no. SEC/CMRRCD/2001-16 dated September 6, 2009 transaction procedure of which is followed by Securities and Exchange Commission (Over-the-Counter) Rules, 2001.`,
  `OTC Market started its journey on October 1, 2009 with 51 companies as per SEC Directive No. SEC/CMRRCD/2001-16/168 dated October 1, 2009. Among the companies, trading of the shares of United Commercial Bank Ltd. was resumed in the main market of DSE from June 13, 2010 under "Z" Category as per SEC Directive No. SEC/SRMIC/94-205/369 dated June 8, 2010.`,
  `25 companies were added with the existing OTC instruments with effect from October 1, 2010 as per SEC Directives No. SEC/CMRRCD/2001-16/65 dated September 28, 2010. Out of these 25 companies, only 10 companies were declared eligible for demat securities by Bangladesh Securities and Exchange Commission (BSEC) and subsequently these companies were transferred to the main market as the securities of those companies have been dematerialized.`,
  `4 companies were added with the existing OTC instruments with effect from October 20, 2010 as per SEC Directives No. SEC/SRMIC/94-198/623 dated October 5, 2010.`,
  `GMG Industrial Corporation Ltd. was delisted from OTC market effective from June 20, 2011 as per their application. Padma Cement Limited was delisted from OTC market effective from May 7, 2014 in accordance with the Honorable Court Order dated March 13, 2014 in the Company Matter No. 53 of 2012 following its liquidation. Wata Chemicals Ltd. was re-listed to Main Market from OTC Market with effect from May 14, 2014. Alif Industries Ltd. was re-listed to Main Market from OTC Market with effect from December 28, 2017. Sonali Paper & Board Mills Ltd. was re-listed to Main Market from OTC Market with effect from July 2, 2020.`,
  `4 companies namely Tamijuddin Textile Mills PLC, Monno Fabrics Limited, BD Monospool (Monospool Bangladesh PLC.), Paper processing (Magura Multiplex PLC.) were re-listed to Main Market from OTC Market with effect from June 13, 2021.`,
  `4 companies namely Apex Weaving and Finishing Mills Ltd., Bengal Biscuits Ltd., Himadri Ltd. and Wonderland Toys Ltd. were shifted from OTC Market to the Small Capital Platform effective from September 30, 2021.`,
  `Thus, total number of securities stood at 56 (fifty six) under OTC facility as on September 30, 2021.`,
  `The Bangladesh Securities Exchange Commission (BSEC) vide letter No. BSEC/SRMIC/170-2020/64 dated September 30, 2020 directed to suspend the trade of 4 companies namely Bangladesh Chemical Industries Ltd., Bangladesh Dyeing & Finishing Industries Ltd. Bangladesh Luggage Industries and Bangladesh Zipper Industries Ltd. effective from October 1, 2020.`,
];

function About() {
  return (
    <section>
      <SectionTitle>About OTC Market</SectionTitle>
      <div
        className="space-y-3 text-[13.5px] leading-[1.65]"
        style={{ color: "var(--text-secondary)" }}
        data-cms="otc.about.body"
      >
        {ABOUT_PARAS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

/* ---------- 2) Listing ---------- */

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
type ListingRow = { ticker: string; name: string };
const LISTING: ListingRow[] = [
  { ticker: "BENGALBSC", name: "Bengal Biscuits Ltd." },
  { ticker: "HIMADRI", name: "Himadri Ltd." },
];

function Listing() {
  const { t } = useLang();
  const [letter, setLetter] = useState<string>("ALL");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    return LISTING.filter((r) => {
      if (letter === "ALL") {
        // pass
      } else if (letter === "#") {
        if (/^[A-Za-z]/.test(r.name)) return false;
      } else if (r.name.toUpperCase()[0] !== letter) return false;
      const term = q.trim().toLowerCase();
      if (term && !r.ticker.toLowerCase().includes(term) && !r.name.toLowerCase().includes(term))
        return false;
      return true;
    });
  }, [letter, q]);

  return (
    <section>
      <SectionTitle>
        {t("Total OTC Company List")}: {LISTING.length}
      </SectionTitle>
      <p
        className="mb-3 text-[12.5px]"
        style={{ color: "var(--text-secondary)" }}
        data-cms="otc.listing.note"
      >
        {t(
          "List of Companies extended trading facilities on the Dhaka Stock Exchange Over-the-Counter (OTC) market with effect from October 05, 2009 under the Securities and Exchange Commission (Over-the-Counter) Rules, 2001 as per SEC Directive No. SEC/CMRRCD/2001-16/168 dated October 01, 2009.",
        )}
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Search company or trade code…")}
          className="h-8 px-3 text-[13px] outline-none flex-1 min-w-[200px] max-w-[320px]"
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
            color: "var(--ink)",
          }}
        />
        <LiveLabel />
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["ALL", ...ALPHABET, "#"].map((l) => {
          const active = letter === l;
          return (
            <button
              key={l}
              onClick={() => setLetter(l)}
              className="h-7 min-w-[28px] px-2 text-[12px] font-semibold"
              style={{
                border: "1px solid var(--line)",
                background: active ? "var(--brand-600)" : "var(--surface)",
                color: active ? "#fff" : "var(--ink)",
              }}
              title={l === "#" ? "Additional" : l}
            >
              {l === "#" ? t("Additional") : l}
            </button>
          );
        })}
      </div>

      <div
        className="overflow-x-auto"
        style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      >
        <table className="w-full text-[13px]" style={{ minWidth: 480 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              <th
                className="px-3 py-2 text-left text-[11px] font-semibold uppercase"
                style={{ letterSpacing: "0.1em", color: "var(--text-secondary)" }}
              >
                {t("Trade Code")}
              </th>
              <th
                className="px-3 py-2 text-left text-[11px] font-semibold uppercase"
                style={{ letterSpacing: "0.1em", color: "var(--text-secondary)" }}
              >
                {t("Company")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.ticker}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                }}
              >
                <td className="px-3 py-2 font-bold tracking-wide" style={{ color: "var(--brand-600)" }}>
                  {r.ticker}
                </td>
                <td className="px-3 py-2" style={{ color: "var(--ink)" }}>
                  {r.name}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-3 py-8 text-center text-[12.5px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t("No companies match your filters.")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footnote id="otc.listing.footnote">
        {t("Source: DSE OTC Market department. List updated periodically.")}
      </Footnote>
    </section>
  );
}

/* ---------- 3) Instruments ---------- */

const INSTRUMENTS = [
  { ticker: "BENGALBSC", name: "Bengal Biscuits Ltd.", ltp: 18.4, vol: 1200 },
  { ticker: "HIMADRI", name: "Himadri Ltd.", ltp: 9.7, vol: 850 },
];

function Instruments() {
  const { t } = useLang();
  return (
    <section>
      <SectionTitle>Instruments</SectionTitle>
      <div className="mb-2">
        <LiveLabel />
      </div>
      <div
        className="overflow-x-auto"
        style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      >
        <table className="w-full text-[13px]" style={{ minWidth: 560 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              {["Trade Code", "Company", "LTP", "Volume"].map((h, i) => (
                <th
                  key={h}
                  className="px-3 py-2 text-[11px] font-semibold uppercase"
                  style={{
                    textAlign: i >= 2 ? "right" : "left",
                    letterSpacing: "0.1em",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INSTRUMENTS.map((r, i) => (
              <tr
                key={r.ticker}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                }}
              >
                <td className="px-3 py-2 font-bold tracking-wide" style={{ color: "var(--brand-600)" }}>
                  {r.ticker}
                </td>
                <td className="px-3 py-2" style={{ color: "var(--ink)" }}>
                  {r.name}
                </td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>
                  {r.ltp.toFixed(2)}
                </td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>
                  {r.vol.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footnote id="otc.instruments.footnote">
        {t("LTP and volume reflect the most recent OTC session.")}
      </Footnote>
    </section>
  );
}

/* ---------- 4) Order Forms ---------- */

const FORMS = [
  { id: "sale-paper", label: "Sale Order Form For Paper Share", url: "#" },
  { id: "rev-sale-paper", label: "Revised Sale Order Form For Paper Share", url: "#" },
  { id: "buy-paper", label: "Buy Order Form For Paper Share", url: "#" },
  { id: "sale-demat", label: "Sale Order Form For Demated Share", url: "#" },
  { id: "rev-sale-demat", label: "Revised Sale Order Form For Demated Share", url: "#" },
  { id: "buy-demat", label: "Buy Order Form For Demated Share", url: "#" },
];

function Forms() {
  const { t } = useLang();
  return (
    <section>
      <SectionTitle>Order Forms</SectionTitle>
      <ul className="divide-y" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
        {FORMS.map((f) => (
          <li
            key={f.id}
            className="flex items-center justify-between px-3 py-3"
            style={{ borderColor: "var(--line)" }}
          >
            <span className="text-[13.5px]" style={{ color: "var(--ink)" }} data-cms={`otc.forms.${f.id}.label`}>
              {t(f.label)}
            </span>
            <a
              href={f.url}
              target="_blank"
              rel="noreferrer"
              className="text-[12px] font-semibold hover:underline"
              style={{ color: "var(--brand-600)" }}
              data-cms={`otc.forms.${f.id}.url`}
            >
              {t("Download PDF")} ↓
            </a>
          </li>
        ))}
      </ul>
      <Footnote id="otc.forms.footnote">
        {t("All forms are CMS-managed and provided in PDF format.")}
      </Footnote>
    </section>
  );
}

/* ---------- 5) Trading Manuals ---------- */

const DEMAT_STEPS = [
  `At first the selling TREC Holder shall send (pay-out) the saleable securities at DSE OTC Exchange DP (BO ID: 1204710032216266) through selling DP clearing account, in advance;`,
  `After that the selling TREC Holder will submit sale order to OTC Market department of DSE within 10:00 am to 02:30 pm on each trading day;`,
  `After receiving the salable securities and sale order, OTC Market will record the order in the database and provide an official receipt to the respective the selling TREC Holder;`,
  `OTC Market will display the sale order in OTC website for the buyers;`,
  `OTC Market is seller driven. It provides only pick and choose facilities for the buyers. The buyers (TREC Holder) have to check the OTC website for available sale orders and choose from the list;`,
  `After that, the buying TREC Holder will submit a buy order to the OTC Market and make full payment including the transaction fee and Advance Income Tax (AIT) to DSE through account payee cheque/pay order/demand draft/electronic fund transfer;`,
  `The OTC Market shall deliver the concerned securities to the buying TREC Holder upon availability of fund; and`,
  `The OTC Market shall make payment of the due amount to the selling TREC Holder by account payee cheque.`,
];

function Manuals() {
  const { t } = useLang();
  const [open, setOpen] = useState<"paper" | "demat">("demat");
  return (
    <section>
      <SectionTitle>Trading Manuals</SectionTitle>
      <div className="inline-flex mb-4" style={{ border: "1px solid var(--line)", borderRadius: 2 }}>
        {[
          { id: "paper" as const, label: "OTC Trading Manual (Paper Share)" },
          { id: "demat" as const, label: "OTC Trading Manual (Demat Share)" },
        ].map((m, i) => {
          const active = open === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setOpen(m.id)}
              className="px-3 h-8 text-[12px] font-semibold"
              style={{
                background: active ? "var(--brand-600)" : "transparent",
                color: active ? "#fff" : "var(--ink)",
                borderLeft: i !== 0 ? "1px solid var(--line)" : "none",
              }}
            >
              {t(m.label)}
            </button>
          );
        })}
      </div>

      {open === "paper" && (
        <div
          className="p-4 text-[13px]"
          style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text-secondary)" }}
          data-cms="otc.manuals.paper.body"
        >
          {t("The Paper Share trading manual is available for download.")}{" "}
          <a href="#" className="font-semibold hover:underline" style={{ color: "var(--brand-600)" }}>
            {t("Download PDF")} ↓
          </a>
        </div>
      )}

      {open === "demat" && (
        <div
          className="p-4"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          <h3 className="text-[14px] font-semibold mb-2" style={{ color: "var(--ink)" }}>
            {t("OTC Trading Manual (Demat Share)")}
          </h3>
          <ol
            className="list-decimal pl-5 space-y-2 text-[13px] leading-[1.6]"
            style={{ color: "var(--text-secondary)" }}
            data-cms="otc.manuals.demat.steps"
          >
            {DEMAT_STEPS.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}
      <Footnote id="otc.manuals.footnote">
        {t("Source: DSE OTC Market department. Procedures subject to BSEC directives.")}
      </Footnote>
    </section>
  );
}

/* ---------- 6) Circuit Breaker ---------- */

const BREAKER = [
  { ticker: "BENGALBSC", name: "Bengal Biscuits Ltd.", lower: 16.6, upper: 20.2 },
  { ticker: "HIMADRI", name: "Himadri Ltd.", lower: 8.7, upper: 10.7 },
];

function Breaker() {
  const { t } = useLang();
  const today = new Date().toLocaleDateString();
  return (
    <section>
      <SectionTitle>
        {t("OTC Circuit Breaker")} ({t("Applicable for")} {today})
      </SectionTitle>
      <div className="mb-2">
        <LiveLabel />
      </div>
      <div
        className="overflow-x-auto"
        style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      >
        <table className="w-full text-[13px]" style={{ minWidth: 560 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              {["Trade Code", "Company", "Lower Limit", "Upper Limit"].map((h, i) => (
                <th
                  key={h}
                  className="px-3 py-2 text-[11px] font-semibold uppercase"
                  style={{
                    textAlign: i >= 2 ? "right" : "left",
                    letterSpacing: "0.1em",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BREAKER.map((r, i) => (
              <tr
                key={r.ticker}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                }}
              >
                <td className="px-3 py-2 font-bold tracking-wide" style={{ color: "var(--brand-600)" }}>
                  {r.ticker}
                </td>
                <td className="px-3 py-2" style={{ color: "var(--ink)" }}>
                  {r.name}
                </td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>
                  {r.lower.toFixed(2)}
                </td>
                <td className="px-3 py-2 tnum text-right" style={{ color: "var(--ink)" }}>
                  {r.upper.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footnote id="otc.breaker.footnote">
        {t("Daily price limits applicable to OTC instruments, per BSEC directive.")}
      </Footnote>
    </section>
  );
}

/* ---------- 7) News ---------- */

const TODAY_NEWS = [
  { ticker: "BENGALBSC", title: "Bengal Biscuits: AGM notice published", date: new Date().toISOString().slice(0, 10) },
  { ticker: "HIMADRI", title: "Himadri Ltd.: trading suspended pending review", date: new Date().toISOString().slice(0, 10) },
];
const ARCHIVE_NEWS = [
  { ticker: "BENGALBSC", title: "Bengal Biscuits: quarterly disclosure", date: "2025-09-12" },
  { ticker: "HIMADRI", title: "Himadri Ltd.: directors' meeting", date: "2025-08-04" },
];

function News() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const archive = useMemo(() => {
    return ARCHIVE_NEWS.filter((n) => {
      const term = q.trim().toLowerCase();
      if (term && !n.ticker.toLowerCase().includes(term) && !n.title.toLowerCase().includes(term))
        return false;
      if (from && n.date < from) return false;
      if (to && n.date > to) return false;
      return true;
    });
  }, [q, from, to]);

  return (
    <section className="space-y-8">
      <div>
        <SectionTitle>Today's OTC News</SectionTitle>
        <div className="mb-2">
          <LiveLabel />
        </div>
        <ul style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
          {TODAY_NEWS.map((n, i) => (
            <li
              key={i}
              className="px-3 py-3 flex items-start justify-between gap-3"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
            >
              <div>
                <span
                  className="font-bold tracking-wide text-[12.5px] mr-2"
                  style={{ color: "var(--brand-600)" }}
                >
                  {n.ticker}
                </span>
                <span className="text-[13px]" style={{ color: "var(--ink)" }}>
                  {n.title}
                </span>
              </div>
              <span className="text-[11.5px] tnum shrink-0" style={{ color: "var(--text-muted)" }}>
                {n.date}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionTitle>OTC News Archive</SectionTitle>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search trading code or symbol…")}
            className="h-8 px-3 text-[13px] outline-none flex-1 min-w-[200px] max-w-[320px]"
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface)",
              color: "var(--ink)",
            }}
          />
          <label className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
            {t("From")}
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="ml-1 h-8 px-2 text-[12.5px] outline-none"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--ink)",
              }}
            />
          </label>
          <label className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
            {t("To")}
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="ml-1 h-8 px-2 text-[12.5px] outline-none"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--ink)",
              }}
            />
          </label>
        </div>
        <ul style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
          {archive.map((n, i) => (
            <li
              key={i}
              className="px-3 py-3 flex items-start justify-between gap-3"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
            >
              <div>
                <span
                  className="font-bold tracking-wide text-[12.5px] mr-2"
                  style={{ color: "var(--brand-600)" }}
                >
                  {n.ticker}
                </span>
                <span className="text-[13px]" style={{ color: "var(--ink)" }}>
                  {n.title}
                </span>
              </div>
              <span className="text-[11.5px] tnum shrink-0" style={{ color: "var(--text-muted)" }}>
                {n.date}
              </span>
            </li>
          ))}
          {archive.length === 0 && (
            <li className="px-3 py-6 text-center text-[12.5px]" style={{ color: "var(--text-muted)" }}>
              {t("No news matches your filters.")}
            </li>
          )}
        </ul>
        <Footnote id="otc.news.footnote">
          {t("Archive items are sourced from DSE OTC announcements.")}
        </Footnote>
      </div>
    </section>
  );
}

/* ---------- 8) Sale Orders ---------- */
// SAMPLE — replace at wiring with real OTC sale-order feed.
type SaleOrder = {
  code: string;
  qty: number;
  rate: number;
  orderType: string;
  saleDate: string;
  status: string;
  lastRate: number;
  lastDate: string;
  inst: "Demated" | "Paper";
  memId: string;
  member: string;
};

const SALE_ORDERS: SaleOrder[] = [
  { code: "UNITEDAIR", qty: 1699, rate: 1.8, orderType: "", saleDate: "17-06-26", status: "", lastRate: 1.8, lastDate: "25-01-26", inst: "Demated", memId: "021", member: "Royal Capital Ltd." },
  { code: "RAHIMTEXT", qty: 500, rate: 12.5, orderType: "", saleDate: "16-06-26", status: "", lastRate: 12.3, lastDate: "22-05-26", inst: "Demated", memId: "045", member: "LankaBangla Securities Ltd." },
  { code: "MEGHNAPET", qty: 2000, rate: 4.2, orderType: "", saleDate: "16-06-26", status: "", lastRate: 4.1, lastDate: "10-04-26", inst: "Paper", memId: "112", member: "IDLC Securities Ltd." },
  { code: "SHYAMPSUG", qty: 350, rate: 22.6, orderType: "", saleDate: "15-06-26", status: "", lastRate: 22.6, lastDate: "12-03-26", inst: "Paper", memId: "007", member: "AB Securities Ltd." },
  { code: "MODERNIND", qty: 1200, rate: 6.7, orderType: "", saleDate: "15-06-26", status: "", lastRate: 6.5, lastDate: "02-06-26", inst: "Demated", memId: "078", member: "BRAC EPL Stock Brokerage Ltd." },
  { code: "MEGHNACON", qty: 800, rate: 9.1, orderType: "", saleDate: "14-06-26", status: "", lastRate: 9.0, lastDate: "18-05-26", inst: "Demated", memId: "156", member: "UCB Stock Brokerage Ltd." },
  { code: "SAVARREF", qty: 250, rate: 15.4, orderType: "", saleDate: "14-06-26", status: "", lastRate: 15.4, lastDate: "05-02-26", inst: "Paper", memId: "094", member: "City Brokerage Ltd." },
  { code: "PADMAOIL", qty: 3000, rate: 2.9, orderType: "", saleDate: "13-06-26", status: "", lastRate: 2.8, lastDate: "20-05-26", inst: "Demated", memId: "203", member: "EBL Securities Ltd." },
  { code: "BDWELDING", qty: 700, rate: 5.6, orderType: "", saleDate: "13-06-26", status: "", lastRate: 5.5, lastDate: "11-04-26", inst: "Paper", memId: "061", member: "Prime Bank Securities Ltd." },
  { code: "GACHIHATA", qty: 450, rate: 7.8, orderType: "", saleDate: "12-06-26", status: "", lastRate: 7.7, lastDate: "28-03-26", inst: "Demated", memId: "134", member: "MTB Securities Ltd." },
  { code: "BEACHHATCH", qty: 900, rate: 3.4, orderType: "", saleDate: "12-06-26", status: "", lastRate: 3.4, lastDate: "15-05-26", inst: "Paper", memId: "088", member: "Southeast Bank Capital Services Ltd." },
  { code: "TULIPDAIRY", qty: 1500, rate: 4.6, orderType: "", saleDate: "11-06-26", status: "", lastRate: 4.5, lastDate: "01-06-26", inst: "Demated", memId: "042", member: "IIDFC Securities Ltd." },
  { code: "AZADIPRINT", qty: 620, rate: 8.2, orderType: "", saleDate: "11-06-26", status: "", lastRate: 8.1, lastDate: "19-04-26", inst: "Paper", memId: "175", member: "Sonali Securities Ltd." },
  { code: "MITAT", qty: 1100, rate: 11.0, orderType: "", saleDate: "10-06-26", status: "", lastRate: 10.9, lastDate: "07-05-26", inst: "Demated", memId: "059", member: "ICB Securities Trading Company Ltd." },
  { code: "MEHNAJUTE", qty: 400, rate: 17.3, orderType: "", saleDate: "10-06-26", status: "", lastRate: 17.2, lastDate: "22-02-26", inst: "Paper", memId: "126", member: "Popular Life Securities Ltd." },
  { code: "SUHRIDIND", qty: 250, rate: 24.8, orderType: "", saleDate: "09-06-26", status: "", lastRate: 24.5, lastDate: "18-03-26", inst: "Demated", memId: "017", member: "Standard Chartered Securities (Bangladesh) Ltd." },
  { code: "BDMONOPOOL", qty: 780, rate: 3.9, orderType: "", saleDate: "09-06-26", status: "", lastRate: 3.9, lastDate: "26-05-26", inst: "Paper", memId: "099", member: "Trust Bank Securities Ltd." },
  { code: "MEGHNASH", qty: 1300, rate: 6.1, orderType: "", saleDate: "08-06-26", status: "", lastRate: 6.0, lastDate: "12-05-26", inst: "Demated", memId: "148", member: "Dhaka Bank Securities Ltd." },
  { code: "APOLONIT", qty: 950, rate: 5.2, orderType: "", saleDate: "08-06-26", status: "", lastRate: 5.1, lastDate: "03-06-26", inst: "Paper", memId: "071", member: "NCC Bank Securities & Financial Services Ltd." },
  { code: "RANFOUNDRY", qty: 560, rate: 10.4, orderType: "", saleDate: "07-06-26", status: "", lastRate: 10.3, lastDate: "24-04-26", inst: "Demated", memId: "182", member: "Uttara Finance Securities Ltd." },
];

function SaleOrders() {
  const { t } = useLang();
  const [sort, setSort] = useState<"date" | "code">("date");
  const [visible, setVisible] = useState(20);

  const now = useMemo(() => new Date(), []);
  const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const rows = useMemo(() => {
    const arr = [...SALE_ORDERS];
    if (sort === "code") arr.sort((a, b) => a.code.localeCompare(b.code));
    else arr.sort((a, b) => b.saleDate.localeCompare(a.saleDate));
    return arr.slice(0, visible);
  }, [sort, visible]);

  const COLS = [
    "Sl No.", "Trade Code", "Qty.", "Rate", "Order Type", "Sale Order Date",
    "Order Status", "Last Traded Rate", "Last Traded Date", "Inst. Type", "Mem. ID", "Name of the Member Company",
  ];

  return (
    <section>
      <SectionTitle>
        {t("OTC Sale Order on")} {dateStr} {t("at")} {timeStr}
      </SectionTitle>

      <div className="flex flex-wrap gap-1 mb-3">
        {([
          { id: "date", label: "By Order Date" },
          { id: "code", label: "By Trade Code" },
        ] as const).map((o) => {
          const active = sort === o.id;
          return (
            <button
              key={o.id}
              onClick={() => setSort(o.id)}
              className="h-7 px-3 text-[12px] font-semibold"
              style={{
                border: "1px solid var(--line)",
                background: active ? "var(--brand-600)" : "var(--surface)",
                color: active ? "#fff" : "var(--ink)",
              }}
            >
              {t(o.label)}
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
        <table className="w-full text-[13px]" style={{ minWidth: 1100 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              {COLS.map((c) => (
                <th
                  key={c}
                  className="px-3 py-2 text-left text-[11px] font-semibold uppercase whitespace-nowrap"
                  style={{ letterSpacing: "0.08em", color: "var(--text-secondary)" }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={`${r.code}-${i}`}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                }}
              >
                <td className="px-3 py-2 tnum" style={{ color: "var(--text-secondary)" }}>{i + 1}</td>
                <td className="px-3 py-2 font-bold" style={{ color: "var(--brand-600)" }}>{r.code}</td>
                <td className="px-3 py-2 tnum" style={{ color: "var(--ink)" }}>{r.qty.toLocaleString()}</td>
                <td className="px-3 py-2 tnum" style={{ color: "var(--ink)" }}>{r.rate.toFixed(2)}</td>
                <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.orderType}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: "var(--ink)" }}>{r.saleDate}</td>
                <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.status}</td>
                <td className="px-3 py-2 tnum" style={{ color: "var(--ink)" }}>{r.lastRate.toFixed(2)}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: "var(--ink)" }}>{r.lastDate}</td>
                <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.inst}</td>
                <td className="px-3 py-2 tnum" style={{ color: "var(--ink)" }}>{r.memId}</td>
                <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.member}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible < SALE_ORDERS.length && (
        <div className="mt-3">
          <button
            onClick={() => setVisible((v) => Math.min(v + 20, SALE_ORDERS.length))}
            className="h-8 px-4 text-[12.5px] font-semibold"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
          >
            {t("Load more")}
          </button>
        </div>
      )}

      <Footnote id="otc.sale.footnote">
        {t("Sample rows shown — legacy feed contains ~499 entries; wire to live OTC sale-order source.")}
      </Footnote>
    </section>
  );
}
