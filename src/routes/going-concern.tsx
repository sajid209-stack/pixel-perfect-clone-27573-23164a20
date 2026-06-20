import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/going-concern")({
  head: () => ({
    meta: [
      { title: "Companies with Going Concern threat | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "List of DSE-listed companies with a 'Going Concern threat' as disclosed in available audited financial statements.",
      },
      { property: "og:title", content: "Going Concern threat | DSE" },
      {
        property: "og:description",
        content: "Companies flagged with a Going Concern threat at DSE.",
      },
    ],
  }),
  component: GoingConcernPage,
});

const SAMPLE = [
  { company: "Imam Button Industries Ltd.", code: "IMAMBUTTON", sector: "Engineering" },
  { company: "Meghna Condensed Milk Industries Ltd.", code: "MEGCONMILK", sector: "Food & Allied" },
  { company: "Shyampur Sugar Mills Ltd.", code: "SHYAMPSUG", sector: "Food & Allied" },
];

function GoingConcernPage() {
  const { t } = useLang();
  const asOn = new Date().toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Dhaka Stock Exchange")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("List of companies having 'Going Concern threat' as on")} {asOn}
          </h1>
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand-600)" }} />
            {t("as provided by DSE")}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="overflow-x-auto" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                {[t("Company"), t("Trade Code"), t("Sector")].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--line)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SAMPLE.map((r, i) => (
                <tr key={r.code} style={{
                  background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
                  borderTop: "1px solid var(--line)",
                }}>
                  <td className="px-3 py-2.5" style={{ color: "var(--ink)" }}>{r.company}</td>
                  <td className="px-3 py-2.5 tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>{r.code}</td>
                  <td className="px-3 py-2.5" style={{ color: "var(--text-secondary)" }}>{r.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] italic" style={{ color: "var(--text-muted)" }}>
          {t("Source: Respective available audited Financial Statements.")}
        </p>
      </section>

      <Footer />
    </div>
  );
}
