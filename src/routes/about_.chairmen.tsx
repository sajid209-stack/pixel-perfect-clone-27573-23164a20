import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHero } from "@/components/dse/PageHero";
import heroAsset from "@/assets/dse-automation-4.jpg.asset.json";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/chairmen")({
  head: () => ({
    meta: [
      { title: "DSE Presidents / Chairmen | Dhaka Stock Exchange" },
      { name: "description", content: "Past Chairmen and Presidents who have led the Dhaka Stock Exchange." },
      { property: "og:title", content: "DSE Presidents / Chairmen" },
      { property: "og:description", content: "Roster of past DSE Chairmen and Presidents." },
    ],
  }),
  component: ChairmenPage,
});

type Row = { name: string; designation: "Chairman" | "President" | "—"; from: string; to: string };

// Placeholder dataset — to be wired to the DSE-provided roster source.
const ROWS: Row[] = Array.from({ length: 8 }, () => ({
  name: "—",
  designation: "—",
  from: "—",
  to: "—",
}));

function ChairmenPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("DSE Presidents / Chairmen")}
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            {t("Past Chairmen and Presidents who have led the Dhaka Stock Exchange.")}
          </p>
        </div>
      </section>
      <PageHero src={heroAsset} alt="DSE leadership" />

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-3">
        <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          {t("Roster as provided by DSE")}
        </div>
        <div
          className="overflow-x-auto"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
          data-cms="about.chairmen.roster"
        >
          <table className="w-full text-[13.5px]">
            <thead>
              <tr style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
                {["Photo", "Name", "Designation", "From", "To"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
                  <td className="px-3 py-2">
                    <div
                      aria-hidden
                      className="grid place-items-center text-[10px]"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "var(--bg)",
                        border: "1px solid var(--line)",
                        color: "var(--text-muted)",
                      }}
                    >
                      —
                    </div>
                  </td>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.name}</td>
                  <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{t(r.designation)}</td>
                  <td className="px-3 py-2 tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>{r.from}</td>
                  <td className="px-3 py-2 tnum" style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>{r.to}</td>
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
