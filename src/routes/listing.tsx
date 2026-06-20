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

import { TopBar } from "@/components/dse/TopBar";
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
      <TopBar />
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
            {tab === "criteria"   && <ComingSoonPanel title="Criteria for Listing" />}
            {tab === "procedure"  && <ComingSoonPanel title="Listing Procedure" />}
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
