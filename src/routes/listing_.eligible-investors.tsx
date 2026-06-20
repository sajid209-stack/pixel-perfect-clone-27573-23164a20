import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/listing_/eligible-investors")({
  head: () => ({
    meta: [
      { title: "Eligible Investors (EIs) | Dhaka Stock Exchange" },
      { name: "description", content: "Eligible Investors (EIs) at the Dhaka Stock Exchange — definition, roles, benefits and lock-in periods." },
      { property: "og:title", content: "Eligible Investors (EIs) — DSE" },
      { property: "og:description", content: "Who EIs are and how they participate in IPOs." },
    ],
  }),
  component: EligibleInvestorsPage,
});

const EI_TYPES = [
  "Merchant Bank and Portfolio Manager",
  "Asset Manager",
  "Stock Dealer",
  "Bank",
  "Financial Institution",
  "Insurance Company",
  "Fund Manager",
  "Alternative Investment Fund and other Collective Investment Scheme",
  "Non-resident (NR) having account with any Security Custodian registered with the Commission",
  "Recognized Provident Funds, approved Pension Funds and approved Gratuity Funds",
  "any other category as approved by the Commission",
];

const ROLES = [
  "participate in the roadshow",
  "submit independent valuation of shares within 3 working days after the roadshow",
  "contribute to the indicative price",
  "provide comments on the Red-Herring Prospectus",
  "participate in electronic bidding through ESS",
  "submit bids within the permitted price band (±25% of indicative price)",
  "deposit the required bid amount",
  "participate in price discovery leading to the cut-off price",
  "receive allotment on a pro-rata basis in case of over-subscription",
];

const BENEFITS = [
  "EIs receive a reserved portion of the public offer — 40% under Book-Building and 10% under Fixed Price",
  "in case of over-subscription EIs receive shares pro-rata (not lottery)",
  "EIs participate in price discovery and may bid within a defined price band prior to public subscription",
  "EIs receive allocation prior to general investors in Book-Building",
];

const LOCKIN = [
  "90 days for 50% of allotted shares",
  "120 days for 25%",
  "180 days for the rest 25%",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { t } = useLang();
  return (
    <div>
      <h2 className="text-[18px] font-semibold mb-3" style={{ color: "var(--ink)" }}>{t(title)}</h2>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  const { t } = useLang();
  return (
    <ul className="space-y-2 list-disc pl-5 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
      {items.map((i) => <li key={i}>{t(i)}</li>)}
    </ul>
  );
}

function EligibleInvestorsPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Listing")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Eligible Investors (EIs)")}
          </h1>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
        <Section title="Who are Eligible Investors (EIs)?">
          <p className="text-[15px] leading-relaxed mb-3" style={{ color: "var(--ink)" }}>
            {t("\"Eligible Investor or EI\" means any of the following person who has business operation or investment in Bangladesh and is registered with the ESS of the stock exchange(s):")}
          </p>
          <Bullets items={EI_TYPES} />
        </Section>
        <Section title="Roles of EIs">
          <Bullets items={ROLES} />
        </Section>
        <Section title="Benefits of EIs">
          <Bullets items={BENEFITS} />
        </Section>
        <Section title="Lock-in periods for EIs (Book-Building)">
          <Bullets items={LOCKIN} />
        </Section>
      </section>
      <Footer />
    </div>
  );
}
