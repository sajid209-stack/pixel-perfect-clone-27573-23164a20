import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/at-a-glance")({
  head: () => ({
    meta: [
      { title: "DSE at a Glance | Dhaka Stock Exchange" },
      { name: "description", content: "Key metrics of the Dhaka Stock Exchange at a glance." },
      { property: "og:title", content: "DSE at a Glance" },
      { property: "og:description", content: "Headline numbers for DSE." },
    ],
  }),
  component: AtAGlancePage,
});

const METRICS: { label: string; value: string; sub?: string }[] = [
  { label: "Listed Securities", value: "650+", sub: "Equities, bonds, MFs, ETFs" },
  { label: "Listed Equities", value: "350+" },
  { label: "Market Capitalization", value: "BDT 6.8 Tn", sub: "Equities" },
  { label: "DSEX Index", value: "5,420.18" },
  { label: "DS30 Index", value: "1,962.44" },
  { label: "DSES (Shariah) Index", value: "1,184.07" },
  { label: "Avg. Daily Turnover", value: "BDT 612 Cr" },
  { label: "TREC Holders", value: "250" },
  { label: "Trading Sessions / Day", value: "1", sub: "10:00 – 14:30 BST" },
  { label: "Trading Days / Week", value: "5", sub: "Sun – Thu" },
  { label: "Settlement Cycle", value: "T+2", sub: "A & B categories" },
  { label: "Regulator", value: "BSEC" },
];

function AtAGlancePage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("DSE at a Glance")}
          </h1>
          <div className="mt-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>
            {t("as provided by DSE")}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="p-4"
              style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
            >
              <div className="text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-secondary)" }}>
                {t(m.label)}
              </div>
              <div className="mt-2 text-[22px] font-semibold tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>
                {m.value}
              </div>
              {m.sub && (
                <div className="mt-1 text-[12px]" style={{ color: "var(--text-secondary)" }}>
                  {t(m.sub)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
