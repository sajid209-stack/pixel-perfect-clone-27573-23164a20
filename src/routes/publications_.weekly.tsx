import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/publications_/weekly")({
  head: () => ({
    meta: [
      { title: "Weekly Report | Dhaka Stock Exchange" },
      { name: "description", content: "Weekly market report of the Dhaka Stock Exchange." },
      { property: "og:title", content: "Weekly Report — DSE" },
      { property: "og:description", content: "Weekly market report." },
    ],
  }),
  component: WeeklyPage,
});

const ROWS: { name: string; thisYear: string; prevYear: string }[] = [
  { name: "Square Pharmaceuticals Ltd.", thisYear: "248.50", prevYear: "212.10" },
  { name: "BRAC Bank PLC", thisYear: "42.80", prevYear: "37.60" },
  { name: "Grameenphone Ltd.", thisYear: "318.40", prevYear: "295.20" },
];

const AS_OF = "Week 25, 2026";

function WeeklyPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>{t("Publications")}</div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>{t("Weekly Report")}</h1>
          <div className="mt-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>{AS_OF} · {t("as provided by DSE")}</div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
          <table className="w-full text-[14px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
                {["SL", "Name of the Company", "This Year", "Previous Year"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold ${i >= 2 ? "text-right" : "text-left"}`}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.name} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-4 py-3 tnum" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{i + 1}</td>
                  <td className="px-4 py-3" style={{ color: "var(--ink)" }}>{r.name}</td>
                  <td className="px-4 py-3 text-right tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.thisYear}</td>
                  <td className="px-4 py-3 text-right tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.prevYear}</td>
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
