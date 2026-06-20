import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Globe,
  ArrowLeftRight,
  Receipt,
  FileText,
  HelpCircle,
  Download,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/foreign-investors")({
  head: () => ({
    meta: [
      { title: "Foreign investors — Rules, tax & repatriation | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Trading and capital repatriation rules, tax & withholding rates, and BSEC / Bangladesh Bank regulations for non-resident investors on the DSE.",
      },
      { property: "og:title", content: "Foreign investors — DSE rules & regulations" },
      {
        property: "og:description",
        content: "NITA accounts, trading, FX repatriation, tax and the full regulatory rulebook.",
      },
    ],
  }),
  component: ForeignInvestorsPage,
});

type TabId = "trading" | "tax" | "regulations" | "faq";

const tabs: { id: TabId; label: string; Icon: typeof ArrowLeftRight }[] = [
  { id: "trading", label: "Trading & repatriation", Icon: ArrowLeftRight },
  { id: "tax", label: "Tax & withholding", Icon: Receipt },
  { id: "regulations", label: "Regulations & circulars", Icon: FileText },
  { id: "faq", label: "FAQ", Icon: HelpCircle },
];

const stats = [
  { label: "Foreign portfolio turnover (2026 YTD)", value: "৳ 9,420 Cr" },
  { label: "Non-resident BO accounts", value: "62,180" },
  { label: "Capital repatriation, last 12m", value: "USD 412 M" },
];

function ForeignInvestorsPage() {
  const [tab, setTab] = useState<TabId>("trading");

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      {/* Header */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Foreign investors</span>
          </div>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1"
              style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--primary)" }}
            >
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
                Foreign investors
              </h1>
              <p className="mt-4 text-[15px] max-w-[680px]" style={{ color: "var(--text-secondary)" }}>
                Everything a non-resident investor needs to trade on the DSE — account
                routes, trading and FX repatriation rules, tax rates, and the full
                BSEC / Bangladesh Bank rulebook.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {stats.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px]"
                style={{
                  background: "rgb(var(--ov) / 0.04)",
                  border: "1px solid rgb(var(--ov) / 0.08)",
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>{s.label}:</span>
                <span className="font-semibold tnum" style={{ color: "var(--text-primary)" }}>
                  {s.value}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-20 border-b backdrop-blur" style={{ background: "rgb(var(--surface-rgb) / 0.85)", borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative flex items-center gap-2 px-4 py-3.5 text-[13px] font-medium whitespace-nowrap transition cursor-pointer"
                style={{ color: active ? "var(--primary)" : "var(--text-secondary)" }}
              >
                <t.Icon className="w-3.5 h-3.5" />
                {t.label}
                {active && (
                  <span
                    className="absolute left-3 right-3 bottom-0 h-[2px] rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-6 py-10 space-y-12">
        {tab === "trading" && <TradingTab />}
        {tab === "tax" && <TaxTab />}
        {tab === "regulations" && <RegulationsTab />}
        {tab === "faq" && <FaqTab />}
      </main>

      <Footer />
    </div>
  );
}

/* ─────────────────────── Trading & Repatriation ─────────────────────── */

function TradingTab() {
  return (
    <div className="space-y-12">
      <Section title="Investor guides">
        <Link
          to="/listing/share-transfer"
          className="block p-4 rounded-xl transition hover:opacity-90"
          style={{
            background: "rgb(var(--ov) / 0.04)",
            border: "1px solid rgb(var(--ov) / 0.08)",
          }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--primary)" }}>
            Guide
          </div>
          <div className="mt-1 text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>
            Process of Gift/Transfer of Shares
          </div>
          <p className="mt-1 text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
            How to gift or transfer listed securities outside the trading system, under Listing Regulation 47.
          </p>
        </Link>
      </Section>
      <TradingTabBody />
    </div>
  );
}

function TradingTabBody() {
  const eligible = [
    "Listed equity shares (Main Board & SME)",
    "Listed corporate bonds, sukuk and debentures",
    "Mutual fund units listed on DSE",
    "Treasury bonds via the DSE bond platform",
    "Rights and bonus issues of holdings",
  ];
  const notEligible = [
    "Unlisted private equity (outside NITA scope)",
    "Derivatives (futures/options) — not yet permitted",
    "Margin financing for non-residents",
  ];

  return (
    <div className="space-y-12">
      <Section
        title="Trading channels"
        body="Non-resident investors trade exclusively through a Non-resident Investor Taka Account (NITA) maintained with an authorized dealer (AD) bank, linked to a Beneficiary Owner (BO) account at a DSE-licensed broker (TREC holder)."
      >
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "NITA account", d: "Single FX-convertible BDT account at an AD bank. Inward remittance only." },
            { t: "BO account", d: "Linked beneficiary owner account at CDBL via your DSE broker." },
            { t: "Custodian (optional)", d: "Institutional investors may appoint an SEC-approved custodian bank." },
          ].map((c) => (
            <Card key={c.t} title={c.t} body={c.d} />
          ))}
        </div>
      </Section>

      <Section title="Eligible & restricted securities">
        <div className="grid md:grid-cols-2 gap-4">
          <ListCard title="Eligible for foreign investment" items={eligible} tone="ok" />
          <ListCard title="Restricted or not permitted" items={notEligible} tone="warn" />
        </div>
      </Section>

      <Section
        title="Capital & profit repatriation"
        body="Sale proceeds, dividends, interest and bonus shares are freely repatriable through the same NITA account, subject to AD bank documentation."
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgb(var(--ov) / 0.08)" }}
        >
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ background: "rgb(var(--ov) / 0.04)", color: "var(--text-muted)" }}>
                <th className="text-left font-medium py-2.5 px-4">Flow</th>
                <th className="text-left font-medium py-2.5 px-4">Channel</th>
                <th className="text-left font-medium py-2.5 px-4">Documentation</th>
                <th className="text-left font-medium py-2.5 px-4">Typical T+</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Capital inflow (purchase)", "Inward FX → NITA → BO", "Form-C with AD bank", "T+0"],
                ["Sale proceeds", "Broker → NITA → outward FX", "Form-C, broker statement, BO ledger", "T+2"],
                ["Cash dividend", "Issuer → NITA → outward FX", "Dividend warrant + tax certificate", "T+3"],
                ["Bonus / rights shares", "Credited to BO (no FX)", "Corporate action notice", "Same day"],
              ].map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}>
                  {r.map((c, j) => (
                    <td key={j} className="py-2.5 px-4 tnum" style={{ color: j === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px]" style={{ color: "var(--text-muted)" }}>
          Source: Bangladesh Bank Guidelines for Foreign Exchange Transactions (GFET) Vol-1, Ch-9.
        </p>
      </Section>

      <Section title="Settlement & limits">
        <div className="grid md:grid-cols-2 gap-4">
          <Card title="Settlement cycle" body="T+1 for A, B, G, N category equities. T+0 for spot transactions and select bonds." />
          <Card title="Ownership cap" body="No aggregate foreign ownership cap on listed equities, except for sector-specific limits in banking (≤25%) and insurance (≤60%)." />
        </div>
      </Section>
    </div>
  );
}

/* ─────────────────────── Tax ─────────────────────── */

function TaxTab() {
  return (
    <div className="space-y-12">
      <Section
        title="Withholding & capital gains"
        body="Tax rates applicable to non-resident investors holding through a NITA account. Always confirm current rates with the National Board of Revenue (NBR) and your AD bank."
      >
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgb(var(--ov) / 0.08)" }}>
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ background: "rgb(var(--ov) / 0.04)", color: "var(--text-muted)" }}>
                <th className="text-left font-medium py-2.5 px-4">Income type</th>
                <th className="text-left font-medium py-2.5 px-4">Rate</th>
                <th className="text-left font-medium py-2.5 px-4">Basis</th>
                <th className="text-left font-medium py-2.5 px-4">Withheld by</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cash dividend (individual non-resident)", "20%", "Gross dividend", "Issuer"],
                ["Cash dividend (non-resident company)", "20%", "Gross dividend", "Issuer"],
                ["Capital gains on listed equities (individual)", "10%", "Net realised gain", "Self-assessed / broker"],
                ["Capital gains on listed equities (company)", "15%", "Net realised gain", "Self-assessed"],
                ["Interest on listed bonds & sukuk", "20%", "Gross interest", "Issuer / trustee"],
                ["Brokerage commission", "0.05%", "Transaction value", "Broker (TDS)"],
              ].map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}>
                  <td className="py-2.5 px-4" style={{ color: "var(--text-primary)" }}>{r[0]}</td>
                  <td className="py-2.5 px-4 tnum font-semibold" style={{ color: "var(--primary)" }}>{r[1]}</td>
                  <td className="py-2.5 px-4 tnum" style={{ color: "var(--text-secondary)" }}>{r[2]}</td>
                  <td className="py-2.5 px-4" style={{ color: "var(--text-secondary)" }}>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        title="Double Taxation Avoidance Agreements (DTAA)"
        body="Bangladesh has DTAAs with 39 jurisdictions. Reduced treaty rates on dividend and interest income can be claimed by submitting a tax-residency certificate to the AD bank prior to remittance."
      >
        <div className="grid md:grid-cols-4 gap-2">
          {[
            "United Kingdom", "United States", "Singapore", "UAE",
            "India", "China", "Malaysia", "Saudi Arabia",
            "Germany", "France", "Netherlands", "Japan",
            "South Korea", "Canada", "Switzerland", "Sweden",
          ].map((c) => (
            <div
              key={c}
              className="px-3 py-2 rounded-lg text-[12.5px]"
              style={{
                background: "rgb(var(--ov) / 0.04)",
                border: "1px solid rgb(var(--ov) / 0.06)",
                color: "var(--text-secondary)",
              }}
            >
              {c}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px]" style={{ color: "var(--text-muted)" }}>
          Full list of 39 partner jurisdictions available on the NBR website.
        </p>
      </Section>

      <Section title="Filing">
        <div className="grid md:grid-cols-2 gap-4">
          <Card title="No annual return required" body="If your only Bangladesh-source income is dividend and capital gains, taxes withheld at source are final — no annual return needed." />
          <Card title="Tax certificate" body="Request an annual TDS certificate from your broker and issuer for use in your home jurisdiction's foreign tax credit claim." />
        </div>
      </Section>
    </div>
  );
}

/* ─────────────────────── Regulations & Circulars ─────────────────────── */

function RegulationsTab() {
  const groups: { heading: string; docs: { name: string; fmt: string; size: string; tag?: string }[] }[] = [
    {
      heading: "Bangladesh Securities & Exchange Commission (BSEC)",
      docs: [
        { name: "Securities and Exchange Ordinance, 1969", fmt: "PDF", size: "1.4 MB" },
        { name: "BSEC (Public Issue) Rules, 2015 — amended 2023", fmt: "PDF", size: "2.0 MB", tag: "Updated" },
        { name: "BSEC (Foreign Portfolio Investors) Regulations", fmt: "PDF", size: "0.9 MB" },
        { name: "Substantial Acquisition & Takeover Rules, 2018", fmt: "PDF", size: "1.1 MB" },
      ],
    },
    {
      heading: "Bangladesh Bank — FX & repatriation",
      docs: [
        { name: "Guidelines for Foreign Exchange Transactions (GFET) Vol-1", fmt: "PDF", size: "5.2 MB" },
        { name: "FE Circular — NITA account operations", fmt: "PDF", size: "0.4 MB" },
        { name: "FE Circular Letter — Repatriation of sale proceeds", fmt: "PDF", size: "0.3 MB", tag: "2025" },
      ],
    },
    {
      heading: "Dhaka Stock Exchange",
      docs: [
        { name: "DSE (Listing) Regulations, 2015", fmt: "PDF", size: "2.1 MB" },
        { name: "DSE Trading Regulations", fmt: "PDF", size: "1.6 MB" },
        { name: "Direct Listing Regulations, 2006", fmt: "PDF", size: "0.7 MB" },
      ],
    },
    {
      heading: "National Board of Revenue (NBR)",
      docs: [
        { name: "Income Tax Act, 2023 — relevant sections", fmt: "PDF", size: "3.4 MB" },
        { name: "List of DTAA partner countries & rates", fmt: "PDF", size: "0.5 MB" },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <Section key={g.heading} title={g.heading}>
          <ul className="grid md:grid-cols-2 gap-2">
            {g.docs.map((d) => (
              <li key={d.name}>
                <a
                  href="#"
                  className="flex items-center justify-between gap-3 p-3.5 rounded-lg transition hover:opacity-90"
                  style={{
                    background: "rgb(var(--ov) / 0.04)",
                    border: "1px solid rgb(var(--ov) / 0.06)",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Download className="w-4 h-4 shrink-0" style={{ color: "var(--primary)" }} />
                    <span className="text-[13px] truncate" style={{ color: "var(--text-primary)" }}>{d.name}</span>
                    {d.tag && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide shrink-0"
                        style={{ background: "rgb(var(--brand-tint) / 0.15)", color: "var(--primary)" }}
                      >
                        {d.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] tnum shrink-0" style={{ color: "var(--text-muted)" }}>
                    {d.fmt} · {d.size}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section title="Regulator contacts">
        <div className="grid md:grid-cols-3 gap-4">
          <ContactCard
            name="BSEC"
            line1="Securities Commission Bhaban"
            line2="E-6/C Agargaon, Dhaka-1207"
            email="info@sec.gov.bd"
            url="https://sec.gov.bd"
          />
          <ContactCard
            name="Bangladesh Bank — FE Policy"
            line1="Motijheel, Dhaka-1000"
            line2="Foreign Exchange Policy Dept."
            email="fepd@bb.org.bd"
            url="https://www.bb.org.bd"
          />
          <ContactCard
            name="DSE — Foreign Investor Desk"
            line1="DSE Tower, Plot 46, Road 21"
            line2="Nikunja-2, Dhaka-1229"
            email="fid@dsebd.org"
            url="https://dsebd.org"
          />
        </div>
      </Section>
    </div>
  );
}

/* ─────────────────────── FAQ ─────────────────────── */

function FaqTab() {
  const faqs = [
    {
      q: "Do I need to visit Bangladesh to open a NITA account?",
      a: "No. Most AD banks accept fully remote onboarding with notarised passport copies, proof of address and a banker's reference letter. Your DSE broker can introduce you to partner banks.",
    },
    {
      q: "Is there a minimum investment size?",
      a: "There is no regulatory minimum for foreign portfolio investment in listed securities. Individual brokers may set their own onboarding minimums.",
    },
    {
      q: "Can I repatriate capital and gains in any currency?",
      a: "Yes — outward remittances from the NITA can be made in any major convertible currency at the prevailing AD bank rate.",
    },
    {
      q: "What is the lock-in period?",
      a: "There is no lock-in on listed equities for foreign portfolio investors. IPO allotments are subject to the same lock-in as resident investors (none for general public quota).",
    },
    {
      q: "Can a foreign company sponsor or take majority control of a listed company?",
      a: "Yes, subject to BSEC's Substantial Acquisition & Takeover Rules (2018) and sector caps (banking 25%, insurance 60%).",
    },
  ];
  return (
    <div className="max-w-[820px] mx-auto space-y-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-xl p-5"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
            <span className="text-[14.5px] font-semibold" style={{ color: "var(--text-primary)" }}>
              {f.q}
            </span>
            <span
              className="text-[18px] leading-none mt-0.5 transition-transform group-open:rotate-45 shrink-0"
              style={{ color: "var(--primary)" }}
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

/* ─────────────────────── shared atoms ─────────────────────── */

function Section({
  title,
  body,
  children,
}: {
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[22px] font-semibold tracking-tight">{title}</h2>
      {body && (
        <p className="mt-2 mb-5 text-[13.5px] leading-[1.7] max-w-[760px]" style={{ color: "var(--text-secondary)" }}>
          {body}
        </p>
      )}
      {!body && <div className="mb-5" />}
      {children}
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgb(var(--surface-rgb) / 0.6)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="text-[14.5px] font-semibold">{title}</div>
      <p className="mt-1.5 text-[12.5px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>{body}</p>
    </div>
  );
}

function ListCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "ok" | "warn";
}) {
  const color = tone === "ok" ? "var(--primary)" : "var(--amber)";
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgb(var(--surface-rgb) / 0.6)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="text-[14.5px] font-semibold mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactCard({
  name,
  line1,
  line2,
  email,
  url,
}: {
  name: string;
  line1: string;
  line2: string;
  email: string;
  url: string;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgb(var(--surface-rgb) / 0.6)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="text-[14.5px] font-semibold">{name}</div>
      <div className="mt-2 text-[12.5px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
        <div>{line1}</div>
        <div>{line2}</div>
      </div>
      <div className="mt-3 flex flex-col gap-1 text-[12.5px]">
        <a href={`mailto:${email}`} style={{ color: "var(--primary)" }}>{email}</a>
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1" style={{ color: "var(--primary)" }}>
          {url.replace(/^https?:\/\//, "")}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
