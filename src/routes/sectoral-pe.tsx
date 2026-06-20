import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/sectoral-pe")({
  head: () => ({
    meta: [
      { title: "Sectoral Median P/E Ratio | Dhaka Stock Exchange" },
      { name: "description", content: "Sectoral median price-earning (P/E) ratio at the Dhaka Stock Exchange." },
      { property: "og:title", content: "Sectoral Median P/E Ratio — DSE" },
      { property: "og:description", content: "Sector-wise median P/E ratio." },
    ],
  }),
  component: SectoralPePage,
});

const AS_OF = "20 Jun, 2026";

const ROWS: { sector: string; pe: string }[] = [
  { sector: "Bank", pe: "8.42" },
  { sector: "Pharmaceuticals & Chemicals", pe: "14.71" },
  { sector: "Food & Allied", pe: "19.36" },
];

function SectoralPePage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Companies")}
          </div>
          <h1 className="mt-2 text-[22px] md:text-[30px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Sectoral Median Price Earning (P/E) Ratio as on")} {AS_OF}
          </h1>
          <div className="mt-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>
            {t("as provided by DSE")}
          </div>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-secondary)" }}>
            {t("Sample data for demonstration — live data will connect to the DSE API")}
          </div>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
          <table className="w-full text-[14px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>{t("Sector")}</th>
                <th className="text-right px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>{t("Median P/E")}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.sector} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-4 py-3" style={{ color: "var(--ink)" }}>{t(r.sector)}</td>
                  <td className="px-4 py-3 text-right tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.pe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </div>
  );
}
