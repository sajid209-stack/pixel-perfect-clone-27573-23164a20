import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/actuarial-valuation")({
  head: () => ({
    meta: [
      { title: "Actuarial Valuation Conduction Status | Dhaka Stock Exchange" },
      { name: "description", content: "Status of actuarial valuation conduction for listed companies on the Dhaka Stock Exchange." },
      { property: "og:title", content: "Actuarial Valuation Status — DSE" },
      { property: "og:description", content: "Actuarial valuation conduction status." },
    ],
  }),
  component: ActuarialPage,
});

const AS_OF = "20 Jun, 2026";

const ROWS: { company: string; code: string; status: string }[] = [
  { company: "Eastern Insurance Company Ltd.", code: "EASTERNINS", status: "Conducted" },
  { company: "Sandhani Life Insurance Co. Ltd.", code: "SANDHANINS", status: "Conducted" },
  { company: "Padma Life Insurance Co. Ltd.", code: "PADMALIFE", status: "Not Conducted" },
];

function StatusPill({ s }: { s: string }) {
  const ok = s.toLowerCase() === "conducted";
  return (
    <span
      className="inline-block px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
      style={{
        color: ok ? "#0a7f3f" : "#a3262c",
        background: ok ? "rgba(10,127,63,0.08)" : "rgba(163,38,44,0.08)",
        border: `1px solid ${ok ? "rgba(10,127,63,0.25)" : "rgba(163,38,44,0.25)"}`,
        borderRadius: 2,
      }}
    >
      {s}
    </span>
  );
}

function ActuarialPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Companies")}
          </div>
          <h1 className="mt-2 text-[22px] md:text-[30px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Actuarial Valuation Conduction Status as on")} {AS_OF}
          </h1>
          <div className="mt-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>
            {t("as provided by DSE")}
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-4">
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}>
          <table className="w-full text-[14px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>{t("Company")}</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>{t("Trade Code")}</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>{t("Status")}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.code} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-4 py-3" style={{ color: "var(--ink)" }}>{r.company}</td>
                  <td className="px-4 py-3 tnum" style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.code}</td>
                  <td className="px-4 py-3"><StatusPill s={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
          {t("Source: Available Actuarial Valuation Report / based on audited Financial Statements.")}
        </p>
      </section>
      <Footer />
    </div>
  );
}
