import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle2,
  ClipboardList,
  Coins,
  Download,
  FileText,
  GanttChart,
  Scale,
} from "lucide-react";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/listing")({
  head: () => ({
    meta: [
      { title: "Listing on DSE — Benefits, Criteria, Procedure, Fees | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Everything you need to list a company on the DSE — benefits, eligibility criteria, listing procedure, fee schedule, IPO timeline, regulatory provisions and downloadable forms.",
      },
      { property: "og:title", content: "Listing on DSE — Benefits, Criteria, Procedure, Fees" },
      {
        property: "og:description",
        content: "Listing hub for issuers, advisers and merchant banks.",
      },
    ],
  }),
  component: ListingHubPage,
});

type TabKey =
  | "benefits"
  | "criteria"
  | "procedure"
  | "fees"
  | "timeline"
  | "provisions"
  | "forms";

const TABS: { key: TabKey; label: string; Icon: typeof Award }[] = [
  { key: "benefits",   label: "Benefits of Listing",          Icon: Award },
  { key: "criteria",   label: "Criteria for Listing",         Icon: CheckCircle2 },
  { key: "procedure",  label: "Listing Procedure",            Icon: ClipboardList },
  { key: "fees",       label: "Listing Fees",                 Icon: Coins },
  { key: "timeline",   label: "IPO Timeline",                 Icon: GanttChart },
  { key: "provisions", label: "Provisions & Mandatory Listing", Icon: Scale },
  { key: "forms",      label: "Formats & Forms",              Icon: FileText },
];

function ListingHubPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<TabKey>("benefits");

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      {/* Header */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-8">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">{t("Home")}</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>{t("Listing")}</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            {t("List your company")}<br />{t("on the DSE")}
          </h1>
          <p className="mt-4 text-[15px] max-w-[680px]" style={{ color: "var(--text-secondary)" }}>
            {t(
              "Benefits, eligibility, procedure, fees, regulatory provisions and downloadable forms — everything an issuer or merchant bank needs in one place.",
            )}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-0 z-20 border-b" style={{ background: "var(--page-bg)", borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto no-scrollbar -mx-2 px-2">
            {TABS.map((tb) => {
              const active = tb.key === tab;
              return (
                <button
                  key={tb.key}
                  onClick={() => setTab(tb.key)}
                  className="relative shrink-0 inline-flex items-center gap-2 px-3.5 py-3 text-[12.5px] transition-colors whitespace-nowrap"
                  style={{
                    color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <tb.Icon className="w-3.5 h-3.5" />
                  {t(tb.label)}
                  {active && (
                    <motion.div
                      layoutId="listingTabUnderline"
                      className="absolute left-2 right-2 -bottom-px h-[2px] rounded-full"
                      style={{ background: "var(--primary)" }}
                      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 py-10 md:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "benefits"   && <BenefitsPanel />}
            {tab === "criteria"   && <CriteriaPanel />}
            {tab === "procedure"  && <ProcedurePanel />}
            {tab === "fees"       && <FeesPanel />}
            {tab === "timeline"   && <TimelinePanel />}
            {tab === "provisions" && <ProvisionsPanel />}
            {tab === "forms"      && <FormsPanel />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- Shared bits ---------- */

function PanelHeader({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  const { t } = useLang();
  return (
    <header className="mb-8">
      {kicker && (
        <div className="text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--text-muted)" }}>
          {t(kicker)}
        </div>
      )}
      <h2 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.015em] leading-[1.15]">{t(title)}</h2>
      {lead && (
        <p className="mt-3 max-w-[760px] text-[14px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
          {t(lead)}
        </p>
      )}
    </header>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 md:p-7 ${className}`}
      style={{
        background: "rgb(var(--surface-rgb) / 0.6)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      {children}
    </div>
  );
}

function ComingSoonPanel({ title }: { title: string }) {
  const { t } = useLang();
  return (
    <div>
      <PanelHeader kicker="Listing" title={title} />
      <Card>
        <p className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
          {t("Content for this section is being prepared and will appear here shortly.")}
        </p>
      </Card>
    </div>
  );
}

/* ---------- Benefits ---------- */

const BENEFITS: { title: string; body: string }[] = [
  {
    title: "Preferential Tax Benefit",
    body: "Listed companies enjoy preferential tax benefit than that of un-listed companies.",
  },
  {
    title: "Fund Raising and exit route to investors",
    body: "Listing provides an opportunity to the corporate/entrepreneurs to raise capital to fund new projects/undertake expansions/diversifications and for acquisitions. Listing also provides an exit route to private equity investors.",
  },
  {
    title: "Liquidity/Ready Marketability of Security",
    body: "Listing brings in liquidity and ready marketability of securities on a continuous basis adding prestige and importance to listed companies.",
  },
  {
    title: "Ability to raise further capital",
    body: "An initial listing increases a company's ability to raise further capital through various routes like preferential issue, rights issue, repeat public offerings etc. and in the process attract a wide and varied body of institutional and professional investors.",
  },
  {
    title: "Enhance Corporate Value and Branding",
    body: "Coverage by media, including market news in print and electronic media, international data provider like Bloomberg, information in Exchange's websites etc., will allow your company to enhance its corporate and product reputation in Bangladesh as well as outside the country. The company will be able to retain and attract excellent people as well.",
  },
  {
    title: "Fair Price for the Securities",
    body: "The prices are publicly arrived at on the basis of demand and supply; the stock exchange quotations are generally reflective of the real value of the security. Thus listing helps generate an independent valuation of the company by the market.",
  },
  {
    title: "Collateral Value of Securities",
    body: "Listed securities are acceptable to lenders as collateral for credit facilities. A listed company can also borrow from financial institutions easily as it is rated favorably by lenders of capital; the company can also raise additional funds from the public through the new issue market with a greater degree of assurance.",
  },
  {
    title: "Better Corporate Practice",
    body: "Since the violation of the securities laws entails the regulatory measures like, fine/halt/suspension/de-listing of securities from the exchange, the listed companies are expected to follow fair practices to the advantage of investors and public.",
  },
  {
    title: "Supervision and Control of Trading in Securities",
    body: "The transactions in listed securities are required to be carried uniformly as per the rules, regulations and bye-laws of the Commission/Exchange. All transactions in securities are monitored by the regulatory mechanisms of the stock exchange, preventing unfair trade practices. It improves the confidence of small investors and protects them.",
  },
  {
    title: "Timely Disclosure of Corporate Information",
    body: "The listing regulations and other securities laws provides for timely disclosure of information relating to dividend, bonus and right issues, record date, facilities for transfer, company related information etc by the company. Thus providing more transparency and building investor confidence.",
  },
  {
    title: "Benefits to the Public",
    body: "The data daily culled out by the stock exchange in the form of price quotations, provide valuable information to the public which can be used for project and research studies. The stock exchange prices can be an index of the state of the economy. Financial institutions, NRB, individual investor's, etc. can take wise decisions before making investments.",
  },
];

function BenefitsPanel() {
  const { t } = useLang();
  return (
    <div>
      <PanelHeader
        kicker="Listing"
        title="Benefits of Listing"
        lead="Listing provides an exclusive privilege to securities in the stock exchange. Only listed shares are quoted on the stock exchange. Stock exchange facilitates transparency in transactions of listed securities in perfect equality and competitive conditions. Listing is beneficial to the company, to the investor, and to the public at large. The important advantages of listing are listed below:"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {BENEFITS.map((b, i) => (
          <Card key={b.title}>
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold tnum shrink-0"
                style={{
                  background: "rgb(var(--brand-tint) / 0.10)",
                  color: "var(--primary)",
                  border: "1px solid rgb(var(--brand-tint) / 0.25)",
                }}
              >
                {i + 1}
              </div>
              <div className="min-w-0">
                <div className="text-[15px] font-semibold">{t(b.title)}</div>
                <p className="mt-1.5 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                  {t(b.body)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------- Fees ---------- */

function FeesPanel() {
  const { t } = useLang();
  const rowsInitial = [
    { label: "Ordinary shares", a: "Up to ৳10 crore of paid-up capital", b: "@ 0.25%" },
    { label: "Ordinary shares", a: "Above ৳10 crore of paid-up capital", b: "@ 0.15%" },
    { label: "Preferred shares & fixed income", a: "Up to ৳10 crore of size of issue", b: "@ 0.25%" },
    { label: "Preferred shares & fixed income", a: "Above ৳10 crore of size of issue", b: "@ 0.15%" },
    { label: "Mutual funds & other funds", a: "Up to ৳10 crore of size of fund", b: "@ 0.25%" },
    { label: "Mutual funds & other funds", a: "Above ৳10 crore of size of fund", b: "@ 0.15%" },
  ];
  const rowsAnnual = [
    { label: "Ordinary shares", a: "Up to ৳100 crore of paid-up capital", b: "@ 0.05%" },
    { label: "Ordinary shares", a: "Above ৳100 crore of paid-up capital", b: "@ 0.02%" },
    { label: "Preferred shares & fixed income", a: "Up to ৳100 crore of size of issue", b: "@ 0.05%" },
    { label: "Preferred shares & fixed income", a: "Above ৳100 crore of size of issue", b: "@ 0.02%" },
    { label: "Mutual fund & other funds", a: "Up to ৳100 crore of size of fund", b: "@ 0.05%" },
    { label: "Mutual fund & other funds", a: "Above ৳100 crore of size of fund", b: "@ 0.02%" },
  ];

  return (
    <div>
      <PanelHeader
        kicker="Listing"
        title="Initial and Annual Listing Fees, Etc. (Under Regulation - 42)"
      />

      <div className="space-y-6">
        <Card>
          <h3 className="text-[18px] font-semibold mb-1">{t("Initial Listing Fees")}</h3>
          <p className="text-[13px] mt-2" style={{ color: "var(--text-secondary)" }}>
            (1) {t("An issuer shall pay to the Exchange an initial listing fee at the following rates:")}
          </p>

          <FeesTable rows={rowsInitial} />

          <p
            className="mt-4 text-[12.5px] leading-[1.7] p-3 rounded-lg"
            style={{
              color: "var(--text-secondary)",
              background: "rgb(var(--brand-tint) / 0.06)",
              border: "1px solid rgb(var(--brand-tint) / 0.16)",
            }}
          >
            {t(
              "However, the total initial listing fee shall be minimum of Taka 50,000.00 (fifty thousand) and maximum of Taka 10,000,000.00 (ten million) for each of the categories as mentioned above.",
            )}
          </p>

          <p className="mt-4 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
            (2){" "}
            {t(
              "Whenever an issuer increases the number of securities listed with the Exchange, shall pay the Exchange a fee at the same rate as provided in sub-regulation (1) above for the additional securities to be listed.",
            )}
          </p>
        </Card>

        <Card>
          <h3 className="text-[18px] font-semibold mb-1">{t("Annual Listing Fees")}</h3>
          <p className="text-[13px] mt-2" style={{ color: "var(--text-secondary)" }}>
            (3){" "}
            {t(
              "Every issuer of listed securities shall pay annual listing fee to the exchange within 31st March of every Gregorian calendar year at the following rates:",
            )}
          </p>

          <FeesTable rows={rowsAnnual} />

          <p
            className="mt-4 text-[12.5px] leading-[1.7] p-3 rounded-lg"
            style={{
              color: "var(--text-secondary)",
              background: "rgb(var(--brand-tint) / 0.06)",
              border: "1px solid rgb(var(--brand-tint) / 0.16)",
            }}
          >
            {t(
              "However, the total annual listing fee shall be minimum Taka 50,000.00 (fifty thousand) and maximum Taka 6,00,000.00 (six lac) for each of the categories as mentioned above.",
            )}
          </p>
        </Card>
      </div>
    </div>
  );
}

function FeesTable({ rows }: { rows: { label: string; a: string; b: string }[] }) {
  const { t } = useLang();
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-[13px] min-w-[560px]">
        <thead>
          <tr
            className="text-left text-[10.5px] uppercase tracking-[0.18em]"
            style={{ color: "var(--text-muted)" }}
          >
            <th className="py-2 pr-4 font-normal">{t("Security type")}</th>
            <th className="py-2 pr-4 font-normal">{t("Slab")}</th>
            <th className="py-2 pl-4 font-normal text-right">{t("Rate")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t" style={{ borderColor: "rgb(var(--ov) / 0.05)" }}>
              <td className="py-3 pr-4 font-medium">{t(r.label)}</td>
              <td className="py-3 pr-4" style={{ color: "var(--text-secondary)" }}>
                {t(r.a)}
              </td>
              <td className="py-3 pl-4 text-right tnum font-medium" style={{ color: "var(--primary)" }}>
                {r.b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Provisions ---------- */

function ProvisionsPanel() {
  const { t } = useLang();
  return (
    <div>
      <PanelHeader
        kicker="Listing"
        title="Provisions of Conversion into Public Limited Company and Mandatory Listing (As per BSEC notification No. SEC/CMRRCD/2006-159/36/Admin/03-44 dated May 05, 2010 and published in the Bangladesh Gazette on June 1, 2010)"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
            {t("Provision 1")}
          </div>
          <h3 className="text-[18px] font-semibold mb-3">{t("Conversion")}</h3>
          <p className="text-[13.5px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
            {t(
              "A private limited company shall, complying due legal process, convert itself into a public limited company in any of the following cases:",
            )}
          </p>
          <ul className="mt-3 space-y-2 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
            <li className="flex gap-2">
              <span style={{ color: "var(--primary)" }} className="shrink-0">•</span>
              <span>
                {t(
                  "Within six months from the date its existing paid up capital and the further capital it intends to raise exceeds, in total, taka forty crore; or",
                )}
              </span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--primary)" }} className="shrink-0">•</span>
              <span>
                {t(
                  "Within twelve months from the date of publication of the notification in the official gazette, in case its existing paid up capital has already exceeded, in total, taka forty crore.",
                )}
              </span>
            </li>
          </ul>
        </Card>

        <Card>
          <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--text-muted)" }}>
            {t("Provision 2")}
          </div>
          <h3 className="text-[18px] font-semibold mb-3">{t("Mandatory Listing")}</h3>
          <p className="text-[13.5px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
            {t(
              "A public limited company, including the said converted public limited company, whose paid up capital exceeds taka fifty crore shall, complying due legal process, apply to the Commission for making an issue of capital through public offering to the extent prescribed by the Commission from time to time:",
            )}
          </p>
          <ul className="mt-3 space-y-2 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
            <li className="flex gap-2">
              <span style={{ color: "var(--primary)" }} className="shrink-0">•</span>
              <span>
                {t(
                  "Within one year from the date its paid up capital exceeds taka fifty crore, or from the date of publication of this notification in the official gazette, whichever comes later, if it has already been in commercial operation for three years or more.",
                )}
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Forms ---------- */

const FORMS: { name: string; href: string }[] = [
  { name: "Format for Shareholding report under Reg. 35(2)", href: "#" },
  { name: "Format for Free Float Holding Report", href: "#" },
  { name: "Share Transfer form - by way of Gift", href: "#" },
  { name: "Share Transfer form - by way of other than Gift", href: "#" },
  { name: "Declaration for Buying and Selling of Securities by Sponsors or Directors", href: "#" },
  { name: "Declaration for Selling of Securities by Placement Holders", href: "#" },
  { name: "Acquisition cost declaration format for tax purposes", href: "#" },
];

function FormsPanel() {
  const { t } = useLang();
  return (
    <div>
      <PanelHeader
        kicker="Listing"
        title="Formats & Forms"
        lead="Downloadable formats and declaration forms commonly required by issuers, sponsors and directors. PDFs are managed by the DSE listing department."
      />
      <Card>
        <ul className="divide-y" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
          {FORMS.map((f) => (
            <li key={f.name} className="first:pt-0 last:pb-0" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
              <a
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 py-3 text-[13.5px] group"
              >
                <span className="flex items-center gap-3">
                  <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--primary)" }} />
                  <span style={{ color: "var(--text-primary)" }} className="group-hover:underline">
                    {t(f.name)}
                  </span>
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-[11.5px] tnum shrink-0 px-2 py-1 rounded-md"
                  style={{
                    color: "var(--text-secondary)",
                    background: "rgb(var(--ov) / 0.04)",
                    border: "1px solid rgb(var(--ov) / 0.06)",
                  }}
                >
                  <Download className="w-3 h-3" />
                  PDF
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ---------- IPO Timeline ---------- */

const MILESTONES: { date: string; title: string; body: string; status: "done" | "active" | "upcoming" }[] = [
  {
    date: "12 May 2026",
    title: "Prospectus filed with BSEC",
    body: "Draft red-herring prospectus submitted via the issue manager. Comment period opens.",
    status: "done",
  },
  {
    date: "04 Jun 2026",
    title: "BSEC consent received",
    body: "Regulatory consent issued. Subscription window scheduled within 25 working days.",
    status: "active",
  },
  {
    date: "30 Jun 2026",
    title: "Listing day on DSE",
    body: "Allotment within 7 working days of subscription closing. Trading begins on DSE and CSE simultaneously.",
    status: "upcoming",
  },
];

function TimelinePanel() {
  const { t } = useLang();
  return (
    <div>
      <PanelHeader
        kicker="Listing"
        title="IPO Timeline"
        lead="Live milestones for the most recent active IPO. Three sample milestones shown — the full schedule is published by the issue manager."
      />
      <Card>
        <div className="flex items-center gap-2 text-[11px] mb-6" style={{ color: "var(--text-muted)" }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
          {t("Live · as provided by DSE")}
        </div>

        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-4 top-1 bottom-1 w-px"
            style={{ background: "rgb(var(--ov) / 0.10)" }}
          />
          {MILESTONES.map((m) => {
            const isDone = m.status === "done";
            const isActive = m.status === "active";
            return (
              <li key={m.title} className="relative pl-12 pb-7 last:pb-0">
                <span
                  className="absolute left-2 top-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: isDone
                      ? "var(--primary)"
                      : isActive
                        ? "rgb(var(--brand-tint) / 0.18)"
                        : "rgb(var(--ov) / 0.06)",
                    border: isActive
                      ? "1.5px solid var(--primary)"
                      : "1px solid rgb(var(--ov) / 0.12)",
                    boxShadow: isActive ? "0 0 0 4px rgb(var(--brand-tint) / 0.12)" : "none",
                  }}
                >
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "var(--primary-foreground)" }} />}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
                  )}
                </span>
                <div
                  className="text-[11px] uppercase tracking-[0.2em] mb-1 tnum"
                  style={{
                    color: isActive ? "var(--primary)" : "var(--text-muted)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {m.date}
                  {isActive && <span className="ml-2 normal-case tracking-normal">· {t("In progress")}</span>}
                </div>
                <div className="text-[15px] font-semibold">{t(m.title)}</div>
                <p className="mt-1 text-[13px] leading-[1.7] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
                  {t(m.body)}
                </p>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}

/* ---------- Criteria for Listing ---------- */

type CriteriaItem = string | { lead: string; sub: string[] };

const CRITERIA_GENERAL: CriteriaItem[] = [
  "The issuer must be a public limited company formed for perpetual business and operating as a going concern.",
  {
    lead: "Minimum Capital Requirement:",
    sub: [
      "Pre-IPO paid-up capital: at least Tk. 30 crore.",
      "Minimum public offer: 10% of post-IPO paid-up capital.",
      "Post-IPO paid-up capital must be at least Tk. 50 crore.",
      "Sponsors and directors must jointly hold minimum 30% of post-IPO paid-up capital at all times.",
    ],
  },
  {
    lead: "The company must obtain Board approval specifying:",
    sub: ["Decision to go public.", "Offer size.", "Method of issue."],
  },
  {
    lead: "The issuer must have:",
    sub: [
      "Profit in the latest financial year from core business.",
      "No accumulated retained loss at application date (Relaxed for regulated and greenfield companies, subject to business plan disclosure).",
    ],
  },
  "No material change (including capital increase) is allowed after audited financial statements used in the prospectus.",
  "At least 90% of proceeds from any previous capital issue must have been utilized.",
  {
    lead: "Issue manager and its related parties:",
    sub: [
      "Must not be connected with the issuer.",
      "Must not hold issuer's securities before IPO (Relaxation allowed for bidding under book-building with disclosure).",
    ],
  },
  {
    lead: "Financial Statements & Audit Compliance:",
    sub: [
      "Financial statements must comply with IFRS/IAS.",
      "Audit must follow ISA, Financial Reporting Act, 2015, Companies Act, 1994.",
      "CEO & CFO must certify compliance with FRC Standards.",
      "Auditor must issue compliance certificate and is responsible for audit accuracy.",
      "Cost audit must be completed as per the Companies Act, 1994.",
      "Latest financial statements must be audited by BSEC-approved panel auditors.",
    ],
  },
  "The issuer must be regular in holding Annual General Meetings (AGMs).",
  "Full compliance with BSEC Corporate Governance Code is mandatory.",
  "The issuer, its directors, and shareholders holding 5% or more shares must not be loan defaulters, as per Bangladesh Bank CIB report.",
  "At least 35% of the issue must be underwritten on a firm commitment basis.",
  "The issuer must fully comply with all prospectus preparation requirements under the Rules.",
  "Asset valuation must follow BSEC-issued valuation guidelines.",
  {
    lead: "No paid-up capital increase (cash or non-cash) within last 2 years, except:",
    sub: [
      "Bonus shares.",
      "Approved collaborative investments.",
      "Rights issue.",
      "Strategic investor placement.",
      "PPP or state/foreign-majority companies.",
    ],
  },
  {
    lead: "Full history of capital raising since incorporation must be submitted, duly attested by the Managing Director or Chief Executive Officer and supported by:",
    sub: [
      "Banker's certificate.",
      "Auditor's certificate.",
      "Bank statements (last 5 years or applicable period).",
    ],
  },
  "Issuer must declare that it will submit quarterly audited reports on utilization of IPO proceeds within 10 days of quarter end.",
  "All convertible instruments must be fully converted into ordinary shares before IPO.",
];

const CRITERIA_FIXED_NON_GREENFIELD: CriteriaItem[] = [
  "Shares may be offered at par, premium, or discount.",
  "Post-IPO paid-up capital must not exceed Tk. 125 crore (Relaxed for regulated companies).",
  {
    lead: "If issued at premium, the issuer must:",
    sub: [
      "Have at least 3 years of commercial operation.",
      "Earn net profit and positive operating cash flow in last 2 years.",
      "Obtain minimum single-A credit rating.",
    ],
  },
];

const CRITERIA_FIXED_GREENFIELD: CriteriaItem[] = [
  "Greenfield companies may issue shares only at par or discount.",
  "Post-IPO paid-up capital may exceed Tk. 125 crore.",
  "Must show positive projected net profit within 2 years, verified under ISAE-3400.",
  "Sponsors, directors, and strategic investors must collectively hold minimum 75% of post-IPO capital until 02 consecutive profitable years after IPO.",
  "Sponsors must demonstrate successful business history, including profitability and cash flow.",
  "Management must have adequate skill and experience to run the project.",
  "Detailed operational plan (including EPC contract, if applicable) must be in place.",
  "Prospectus cover page must clearly disclose that the company is a greenfield entity and investment risk is significantly higher than operating companies.",
];

const CRITERIA_BOOK_BUILDING: CriteriaItem[] = [
  "Shares must be offered only at the cut-off price determined through bidding.",
  "If pre-IPO paid-up capital or net worth is Tk. 500 crore or more, the company may offer less than 10% but not below 5% of post-IPO paid-up capital.",
  "The issuer must have at least 3 years of commercial operation.",
  "The issuer must have net profit after tax and positive net operating cash flow in each of the immediately preceding 2 financial years.",
  "The profitability and operational history requirements do not apply to PPP companies recognized by PPP Authority, or companies with majority state or foreign ownership.",
  "The issuer must have minimum single-A long-term credit rating from a BSEC-registered credit rating company.",
  "The issuer must execute separate agreements with the issue manager for issue management and registrar to the issue.",
];

const CRITERIA_RPO: CriteriaItem[] = [
  {
    lead: "Information on RPO must be disclosed as price sensitive information:",
    sub: [
      "Immediately after Board decision.",
      "After shareholder approval.",
      "After BSEC approval.",
    ],
  },
  "Initial disclosures must clearly state that the RPO is subject to BSEC approval.",
  "The RPO must be approved by Board of Directors, Shareholders in General Meeting, and Bangladesh Securities and Exchange Commission.",
  "At least 90% of proceeds from the previous public offer or rights issue must have been utilized and duly reported to BSEC.",
  "At least 35% of the RPO must be underwritten on a firm commitment basis.",
  "The issuer must have at least investment-grade credit rating from a BSEC-registered credit rating company.",
];

function CriteriaList({ items }: { items: CriteriaItem[] }) {
  const { t } = useLang();
  return (
    <ol className="space-y-3 text-[13.5px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold tnum mt-0.5"
            style={{
              background: "rgb(var(--brand-tint) / 0.10)",
              color: "var(--primary)",
              border: "1px solid rgb(var(--brand-tint) / 0.22)",
            }}
          >
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            {typeof it === "string" ? (
              <span>{t(it)}</span>
            ) : (
              <>
                <div className="font-medium" style={{ color: "var(--text-primary)" }}>
                  {t(it.lead)}
                </div>
                <ul className="mt-2 space-y-1.5">
                  {it.sub.map((s, j) => (
                    <li key={j} className="flex gap-2">
                      <span style={{ color: "var(--primary)" }} className="shrink-0">•</span>
                      <span>{t(s)}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function CriteriaGroup({
  badge,
  title,
  items,
}: {
  badge: string;
  title: string;
  items: CriteriaItem[];
}) {
  const { t } = useLang();
  return (
    <Card>
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] uppercase tracking-[0.18em] mb-3"
        style={{
          background: "rgb(var(--brand-tint) / 0.08)",
          color: "var(--primary)",
          border: "1px solid rgb(var(--brand-tint) / 0.20)",
        }}
      >
        {t(badge)}
      </div>
      <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight mb-5 leading-snug">
        {t(title)}
      </h3>
      <CriteriaList items={items} />
    </Card>
  );
}

function CriteriaPanel() {
  return (
    <div>
      <PanelHeader
        kicker="Listing"
        title="Criteria for public offer/listing"
        lead="Eligibility Criteria for being listed at DSE — Public Offer of Equity Securities · Key Application Requirements."
      />
      <div className="space-y-6">
        <CriteriaGroup
          badge="Rule 4, sub-rule (1)"
          title="General requirements (as per BSEC (Public Offer of Equity Securities) Rules, 2025)"
          items={CRITERIA_GENERAL}
        />
        <CriteriaGroup
          badge="Rule 4, sub-rule (2)"
          title="Additional requirements for companies except green field company under fixed price method"
          items={CRITERIA_FIXED_NON_GREENFIELD}
        />
        <CriteriaGroup
          badge="Rule 4, sub-rule (3)"
          title="Additional requirements for green field company under fixed price method"
          items={CRITERIA_FIXED_GREENFIELD}
        />
        <CriteriaGroup
          badge="Rule 4, sub-rule (4)"
          title="Additional requirements for book-building method"
          items={CRITERIA_BOOK_BUILDING}
        />
        <CriteriaGroup
          badge="Rule 4, sub-rule (5)"
          title="Additional requirements for repeat public offer (RPO)"
          items={CRITERIA_RPO}
        />
      </div>
    </div>
  );
}

/* ---------- Listing Procedure ---------- */

type ProcStep = { title: string; body?: string; bullets?: string[] };

const PROCEDURE_STEPS: ProcStep[] = [
  {
    title: "Decision to go Public",
    body:
      "Obtain Board approval specifying decision to raise capital through public offer, offer size, and method of issue (Fixed Price or Book-Building).",
    bullets: [
      "Ensure eligibility under Rule 4: minimum pre-IPO paid-up capital (Tk. 30 crore).",
      "Minimum public offer size (10% of post-IPO capital, subject to exceptions).",
      "Sponsors/directors to hold minimum 30% of post-IPO capital.",
    ],
  },
  {
    title: "Appoint intermediaries",
    bullets: [
      "Issue Manager (registered with BSEC).",
      "Underwriter(s) (minimum 35% firm commitment).",
      "Registrar to the Issue.",
    ],
  },
  {
    title: "Financial statements & audit",
    body:
      "Get financial statements prepared in compliance with IFRS/IAS, audited by a BSEC panel auditor, not older than 120 days at submission.",
  },
  {
    title: "Credit rating & company website",
    body:
      "Obtain credit rating (mandatory in applicable cases such as premium issue or book-building). Develop a company website.",
  },
  {
    title: "Preparation of Prospectus",
    bullets: [
      "Prepare Draft Prospectus (Fixed Price) or Red-Herring Prospectus (Book-Building).",
      "Prospectus must be prepared as per Annexure-H of BSEC (Public Offer of Equity Securities) Rules, 2025, contain all required disclosures, and include valuation methods (Annexure-C).",
    ],
  },
  {
    title: "In case of IPO under Book-Building",
    bullets: [
      "Conduct Roadshow.",
      "Invite Eligible Investors (minimum 10 working days' notice).",
      "Collect EI valuation within 3 working days.",
      "Determine indicative price (supported by at least 4 valuation methods).",
    ],
  },
  {
    title: "Application to BSEC and Stock Exchange(s)",
    bullets: [
      "Submit application simultaneously to BSEC (for consent) and Stock Exchange(s) (for listing).",
      "Upload draft/red-herring prospectus on issuer website and issue manager website.",
    ],
  },
  {
    title: "Exchange review",
    bullets: [
      "Exchange shall review documents.",
      "Visit factory/business premises (within 20 days).",
      "Seek clarification if required.",
      "Provide recommendation to BSEC within 30 days.",
    ],
  },
  {
    title: "BSEC decision",
    body:
      "BSEC shall review the application and issue consent or rejection within 20 days of Exchange recommendation.",
  },
  {
    title: "Bidding by Eligible Investors (Book-Building only)",
    body:
      "After BSEC consent to commence bidding, bidding conducted through ESS, open for 72 hours (round the clock); price band ±25% of indicative price; cut-off price determined through system.",
    bullets: [
      "Publish EI allotment list (within 3 working days).",
      "Transfer funds to issuer escrow (within 4 working days).",
      "Refund excess bid money (within 5 working days).",
      "Submit final prospectus (including cut-off price) to BSEC for approval.",
    ],
  },
  {
    title: "Approval of IPO",
    bullets: [
      "Collect consent letter from BSEC.",
      "Publish abridged prospectus.",
    ],
  },
  {
    title: "Subscription Process",
    bullets: [
      "Fixed Price Method — EI subscription through ESS (120 hours); general subscription opens after 10 working days of publication and remains open up to 15 working days.",
      "Book-Building Method — general subscription opens at cut-off price after final approval.",
    ],
  },
  {
    title: "Lottery and Allotment",
    bullets: [
      "In case of over-subscription, lottery basis for General Investors and NRBs, pro-rata basis for EIs, Mutual Funds, Employees, and HNIs.",
      "Final allotment list prepared and published.",
      "Excess subscription money refunded within statutory period.",
      "Underwriters to subscribe in case of under-subscription (within prescribed timeline).",
    ],
  },
  {
    title: "Post-Subscription Compliance",
    bullets: [
      "Submit subscription status to BSEC and Exchanges within 5 working days.",
      "Submit proof of underwriter subscription (if applicable).",
      "Complete allotment and refund process.",
    ],
  },
  {
    title: "Listing Approval by Exchange(s)",
    bullets: [
      "Apply for listing after completion of allotment and refund.",
      "Exchange reviews compliance.",
      "Upon approval, listing is granted.",
    ],
  },
  {
    title: "Credit of Shares and Commencement of Trading",
    bullets: [
      "Issuer requests CDBL to credit shares to BO accounts.",
      "Exchange announces trading date.",
      "Trading commences after CDBL confirmation.",
    ],
  },
];

const DIRECT_LISTING: ProcStep[] = [
  {
    title: "Scope and applicability",
    bullets: [
      "Direct Listing means listing of existing securities without issuing new shares through public offering.",
      "Direct listing is applicable for Government-Owned Companies only.",
    ],
  },
  {
    title: "Eligibility requirements",
    bullets: [
      "Minimum paid-up capital must be Tk. 300 million.",
      "The company must have no accumulated loss.",
      "Be in commercial operation for at least the last 5 years.",
      "Have earned profit in at least 3 of the last 5 completed financial years with steady growth.",
      "Have positive net current assets for the last 3 financial years.",
      "Have positive net operating cash flow for the last 3 financial years.",
      "Comply with BSEC Corporate Governance Guidelines.",
      "No sponsor or director shall be a bank defaulter.",
      "Obtain a minimum investment grade credit rating.",
    ],
  },
  {
    title: "Application",
    body:
      "Application must be submitted to DSE with prescribed form and Tk. 50,000 fee, with copy to BSEC.",
    bullets: [
      "Required documents including audited financial statements (last 5 years), shareholding details, undertakings, resolutions and information document must be submitted.",
    ],
  },
  {
    title: "Review timeline",
    bullets: [
      "DSE examines the application within 15 days and may require rectification within 30 days.",
      "DSE shall approve listing within 15 working days after full compliance or reject within 60 days with reasons from the date of application.",
    ],
  },
  {
    title: "Information Document publication",
    body:
      "The Information Document must be published in one Bangla and one English national newspaper at least 7 days before trading and posted on BSEC, DSE and issuer websites.",
  },
  {
    title: "Sponsor/Director restrictions",
    bullets: [
      "Sponsors and directors must offload at least 25% of their shareholdings within 30 trading days after trading begins.",
      "Cannot sell more than 50% of their holdings until after one full accounting year's AGM following listing.",
      "Are restricted from purchasing shares for 1 year from listing date.",
    ],
  },
  {
    title: "Initial trading mechanism",
    body:
      "Special initial trading mechanism applies including spot trading for first two days and normal T+2 settlement from the fourth trading day.",
  },
];

function ProcedureSteps({ steps }: { steps: ProcStep[] }) {
  const { t } = useLang();
  return (
    <ol className="relative space-y-4">
      <span
        aria-hidden
        className="absolute left-[15px] top-2 bottom-2 w-px"
        style={{ background: "rgb(var(--ov) / 0.08)" }}
      />
      {steps.map((s, i) => (
        <li
          key={i}
          className="relative pl-12 p-5 rounded-xl"
          style={{
            background: "rgb(var(--surface-rgb) / 0.55)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <span
            className="absolute left-1 top-4 w-8 h-8 rounded-full flex items-center justify-center text-[12.5px] font-semibold tnum"
            style={{
              background: "rgb(var(--brand-tint) / 0.10)",
              color: "var(--primary)",
              border: "1px solid rgb(var(--brand-tint) / 0.25)",
            }}
          >
            {i + 1}
          </span>
          <div className="text-[15px] font-semibold leading-snug">{t(s.title)}</div>
          {s.body && (
            <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
              {t(s.body)}
            </p>
          )}
          {s.bullets && (
            <ul className="mt-3 space-y-1.5 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
              {s.bullets.map((b, j) => (
                <li key={j} className="flex gap-2">
                  <span style={{ color: "var(--primary)" }} className="shrink-0">•</span>
                  <span>{t(b)}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

function ProcedurePanel() {
  const { t } = useLang();
  return (
    <div>
      <PanelHeader
        kicker="Listing"
        title="Listing Procedure"
        lead="From the board decision to commencement of trading — the end-to-end procedure for a public offer on the DSE, followed by the separate Direct Listing route for government-owned companies."
      />

      <section className="mb-10">
        <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight mb-5">
          {t("Public Offer — step-by-step")}
        </h3>
        <ProcedureSteps steps={PROCEDURE_STEPS} />
      </section>

      <section>
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight">
            {t("Direct Listing Process")}
          </h3>
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] uppercase tracking-[0.18em]"
            style={{
              background: "rgb(var(--brand-tint) / 0.08)",
              color: "var(--primary)",
              border: "1px solid rgb(var(--brand-tint) / 0.20)",
            }}
          >
            {t("DSE (Listing) Regulations, 2015")}
          </span>
        </div>
        <ProcedureSteps steps={DIRECT_LISTING} />
      </section>
    </div>
  );
}
