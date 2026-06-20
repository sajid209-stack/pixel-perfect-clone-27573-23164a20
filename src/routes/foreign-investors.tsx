import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Globe, BookOpen, Users } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/foreign-investors")({
  head: () => ({
    meta: [
      { title: "Foreign investors — Guide | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Guide for foreign and non-resident investors on the Dhaka Stock Exchange: NITA accounts, BO accounts, custodians, trading and tax basics.",
      },
      { property: "og:title", content: "Foreign investors — DSE guide" },
      {
        property: "og:description",
        content: "Who are foreign investors, how to start, NITA & BO accounts, custodian banks, and tax basics.",
      },
    ],
  }),
  component: ForeignInvestorsPage,
});

type TabId = "fi" | "nrb";

const tabs: { id: TabId; label: string; Icon: typeof BookOpen }[] = [
  { id: "fi", label: "Foreign Investor Guide", Icon: BookOpen },
  { id: "nrb", label: "NRB Guide", Icon: Users },
];

function ForeignInvestorsPage() {
  const [tab, setTab] = useState<TabId>("fi");

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
                A practical guide for non-resident investors interested in the
                Bangladesh capital market, reproduced from DSE's foreign
                investor guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource cards (kept at top) */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10">
        <div className="grid md:grid-cols-3 gap-3">
          <ResourceCard
            to="/listing/share-transfer"
            title="Process of Gift/Transfer of Shares"
            body="How to gift or transfer listed securities outside the trading system."
          />
          <ResourceCard
            to="/foreign-investors/general-profile"
            title="General Profile of Bangladesh"
            body="Key facts about Bangladesh for prospective investors."
          />
          <ResourceCard
            to="/foreign-investors/economy"
            title="Economy of Bangladesh"
            body="Macroeconomic indicators and trends."
          />
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-20 border-b backdrop-blur mt-10" style={{ background: "rgb(var(--surface-rgb) / 0.85)", borderColor: "rgb(var(--ov) / 0.06)" }}>
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
        {tab === "fi" && <ForeignInvestorGuide />}
        {tab === "nrb" && <NrbGuide />}
      </main>

      <Footer />
    </div>
  );
}

/* ─────────────────────── Foreign Investor Guide ─────────────────────── */

function ForeignInvestorGuide() {
  const custodians = [
    "HSBC",
    "Standard Chartered Bank",
    "Dhaka Bank",
    "Southeast Bank",
    "AB Bank (Arab Bangladesh Bank)",
    "BRAC Bank",
    "Citi N.A.",
    "Agrani Bank",
  ];

  return (
    <div className="space-y-12">
      <Section title="Who are Foreign Investors?">
        <Bullets
          items={[
            "Any foreigners residing in Bangladesh or abroad willing to invest in Bangladesh Capital Markets are considered Foreign Investors.",
            "Bangladesh provides a very friendly and open investment atmosphere for foreign investors.",
            "No Capital Gains Tax on individuals.",
            "A long-established legislative and legal framework protects foreign investment in Bangladesh.",
          ]}
        />
      </Section>

      <Section title="How to start">
        <Bullets
          items={[
            "Open a NITA Account with an AD (Authorized Dealer) of the foreign currency department of any financial institution, or through a custodian.",
            "Select a Custodian in Bangladesh (HSBC, Standard Chartered, Dhaka Bank, Southeast Bank, AB Bank, or Citi NA).",
            "Open a BO account through the custodian.",
            "Open a Trading Account with your preferred broker (optional — the custodian can provide the service through the cash account/NITA on behalf of the investor).",
            "Start trading.",
          ]}
        />
      </Section>

      <Section title="What is a NITA Account?">
        <Bullets
          items={[
            "The Non-resident Investment Taka Account (NITA) is an account for channeling foreign currency in, as well as repatriation of earnings from investment.",
            "All earnings from investments (e.g. cash dividends) are credited to the NITA account.",
            "An audited statement certifying that all proper taxes are withheld from earnings (usually handled by the custodian) is used for fund repatriation.",
          ]}
        />
      </Section>

      <Section title="Common services provided by local Custodians">
        <div className="flex flex-wrap gap-2">
          {[
            "Account services",
            "Trade settlement services",
            "Registration services",
            "Safe-keeping services",
            "Corporate Action services",
            "Foreign Exchange services",
            "Cash management services",
            "Market expertise",
            "Escrow services",
          ].map((s) => (
            <span
              key={s}
              className="inline-flex h-8 items-center px-3 rounded-full text-[12.5px]"
              style={{
                background: "rgb(var(--ov) / 0.04)",
                border: "1px solid rgb(var(--ov) / 0.08)",
                color: "var(--text-secondary)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Trading (Custodian ↔ Broker)">
        <Bullets
          items={[
            "The custodian usually receives orders via SWIFT or another acceptable standard and carries out share and monetary transactions with the local broker.",
            "DVP (Delivery versus Payment): delivers shares from the FI's BO to the broker's BO upon receiving payment — applicable for sale orders.",
            "RVP (Receive versus Payment): receives shares to the FI's BO and makes payment — applicable for buy orders.",
          ]}
        />
      </Section>

      <Section title="What is a BO account?">
        <Bullets
          items={[
            "BO stands for Beneficiary Owners account. It holds shares purchased or credited due to corporate declarations.",
          ]}
        />
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <SubCard
            title="Requirements — Individuals"
            items={[
              "Attested photographs",
              "Bank statements",
              "Copy of pay slip or tax return (optional, as part of KYC)",
              "Copy of employment certificate or trade license",
              "Copy of passport",
              "Nominee photographs and details",
              "Other relevant forms",
            ]}
          />
          <SubCard
            title="Requirements — Institutional"
            items={[
              "Memorandum & Articles of Association",
              "Certificate of incorporation",
              "Board resolution permitting investment/trade in Bangladesh",
              "Custodian details",
              "Board resolution naming authorized persons with identification and specimen signatures",
            ]}
          />
        </div>
      </Section>

      <Section title="Tax Rates">
        <Bullets
          items={[
            "No Capital Gains Tax on individuals (subject to the condition that the assessee is entitled to a similar exemption in their country of residence).",
            "Income tax is 25% for individuals.",
            "25% tax at source is deducted by the issuer on cash dividends.",
          ]}
        />
      </Section>

      <Section
        title="Custodian Banks in Bangladesh"
        body="Full contact details are available in the DSE foreign investor guide."
      >
        <ul className="grid md:grid-cols-2 gap-2">
          {custodians.map((c) => (
            <li
              key={c}
              className="px-4 py-3 rounded-lg text-[13px]"
              style={{
                background: "rgb(var(--ov) / 0.04)",
                border: "1px solid rgb(var(--ov) / 0.06)",
                color: "var(--text-primary)",
              }}
            >
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
        Source: Dhaka Stock Exchange — Foreign Investor Guide.
      </p>
    </div>
  );
}

/* ─────────────────────── NRB Guide ─────────────────────── */

function NrbGuide() {
  return (
    <div className="space-y-6">
      <Section
        title="NRB Guide"
        body="Information for Non-Resident Bangladeshis (NRBs) interested in investing in the Bangladesh capital market is maintained on the NRB Help Desk."
      >
        <Link
          to="/help-desk/nrb"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-[13px] font-semibold"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          Open NRB Help Desk
        </Link>
      </Section>
    </div>
  );
}

/* ─────────────────────── shared atoms ─────────────────────── */

function ResourceCard({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <Link
      to={to}
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
        {title}
      </div>
      <p className="mt-1 text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
        {body}
      </p>
    </Link>
  );
}

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

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li
          key={it}
          className="flex gap-2.5 text-[13.5px] leading-[1.7]"
          style={{ color: "var(--text-secondary)" }}
        >
          <span
            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: "var(--primary)" }}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function SubCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgb(var(--surface-rgb) / 0.6)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="text-[14px] font-semibold mb-3">{title}</div>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li
            key={it}
            className="text-[12.5px] leading-[1.6]"
            style={{ color: "var(--text-secondary)" }}
          >
            • {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
