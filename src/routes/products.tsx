import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | Dhaka Stock Exchange" },
      { name: "description", content: "Products traded on the Dhaka Stock Exchange — Equity, Mutual Funds, Debt and Future Products." },
      { property: "og:title", content: "Products — DSE" },
      { property: "og:description", content: "Tradable products at DSE." },
    ],
  }),
  component: ProductsPage,
});

const EQUITY =
  "These are ordinary shares of listed companies. For a certain period from the IPO date a certain number of shares are not tradable. DSE Indices are calculated based on free-float shares of selected listed companies. Free float is adjusted for non-tradable shares, institutional holdings, strategic holdings, sponsor-director holdings and Government holdings. Equity shares, depending on the category, have a settlement period of T+2 or T+3. For implementation of record dates for corporate actions, shares are sometimes placed on T+0 settlement cycles for a certain number of days.";

const MUTUAL =
  "These are units of listed collective investment schemes, usually closed-end mutual funds governed by the Securities and Exchange Commission (Mutual Funds) Rules, 2001, backed by one corporate sponsor and usually named after the sponsor. Sponsors must hold at least 10% of the holding for at least 1 year and 1% for the total life of the fund. There are designated Asset Managers and Trustees. Mutual funds trade on a T+2 settlement cycle and are not part of any indices. Asset managers must disclose NAV weekly.";

const FUTURE =
  "DSE has already initiated steps to explore and launch various new tradable products starting with Convertibles, Bonds, Shariah Compliant Products including Sukuk, Index, ETFs and V-Next. Once these products are in mature form the department will seek to launch related hedging products. DSE is continuously communicating with domestic and global stakeholders.";

const DEBT: { name: string; body: string }[] = [
  {
    name: "Corporate Bonds",
    body:
      "Currently 9 corporate bonds including Beximco Sukuk Bond; traded on T+2; trading fee fixed at Taka 50 per transaction.",
  },
  {
    name: "Treasury Bonds",
    body:
      "251 Government Securities issued by Bangladesh Bank; common maturities 2, 5, 10, 15 and 20 years; par value BDT 100.",
  },
  {
    name: "Debentures",
    body:
      "Unsecured debt instruments issued by listed companies, carrying variable and fixed interest rates; all currently listed debentures are matured and still listed due to incomplete legal proceedings.",
  },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  const { t } = useLang();
  return (
    <div
      className="p-6"
      style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
    >
      <h2 className="text-[18px] font-semibold mb-3" style={{ color: "var(--ink)" }}>{t(title)}</h2>
      {children}
    </div>
  );
}

function ProductsPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Products & Services")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Products")}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-5">
        <Card title="Equity">
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>{t(EQUITY)}</p>
        </Card>

        <Card title="Mutual Funds">
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>{t(MUTUAL)}</p>
        </Card>

        <Card title="Debt">
          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--ink)" }}>
            {t("Three types of debt instruments are listed at DSE:")}
          </p>
          <div className="space-y-3">
            {DEBT.map((d) => (
              <div
                key={d.name}
                className="p-4"
                style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 2 }}
              >
                <div className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "var(--brand-600)" }}>
                  {t(d.name)}
                </div>
                <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink)" }}>{t(d.body)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Future Products">
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>{t(FUTURE)}</p>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
