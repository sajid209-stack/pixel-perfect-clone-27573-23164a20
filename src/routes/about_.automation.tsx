import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Images } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/automation")({
  head: () => ({
    meta: [
      { title: "DSE New Automation System | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Selection of the Automation Project partners for the Dhaka Stock Exchange — press release and picture gallery.",
      },
      { property: "og:title", content: "DSE New Automation System" },
      { property: "og:description", content: "Automation project announcement at DSE." },
    ],
  }),
  component: AutomationPage,
});

function AutomationPage() {
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
            {t("DSE New Automation System")}
          </h1>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-3">
        <a
          href="#"
          data-cms="automation.pressRelease"
          className="flex items-center gap-3 p-4 hover:opacity-80 transition"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
        >
          <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
          <span className="text-[14px]" style={{ color: "var(--ink)" }}>
            {t("Press Release - Dhaka Stock Exchange announces selection of Automation Project partners")}
          </span>
        </a>
        <Link
          to="/gallery"
          className="flex items-center gap-3 p-4 hover:opacity-80 transition"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
        >
          <Images className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
          <span className="text-[14px]" style={{ color: "var(--ink)" }}>{t("Picture Gallery")}</span>
        </Link>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-3">
        <h2 className="text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "#0C2C53" }}>
          Clearing &amp; Settlement System
        </h2>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The DSE operates a T+2 rolling settlement cycle for equities. Transactions executed on trading day (T) settle on the second business day following the trade (T+2). The settlement process runs in five stages: (1) Trade execution — orders matched on the Automated Trading System; (2) Trade confirmation — contract notes issued to TREC holders; (3) Clearing — net obligations calculated via multilateral netting; (4) Securities transfer — dematerialised securities moved through CDBL (Central Depository Bangladesh Limited); (5) Fund settlement — cash obligations cleared through the designated settlement bank. DSE maintains a Settlement Guarantee Fund (SGF) to protect against TREC holder default and ensure settlement finality. Z-category companies are subject to T+3 settlement and additional restrictions per BSEC directive.
        </p>
        <p className="text-[13px] leading-relaxed pt-2" style={{ color: "var(--muted)" }}>
          Settlement Regulations &amp; SGF Regulations → available on the{" "}
          <Link to="/regulations" className="underline" style={{ color: "var(--brand-600)" }}>Regulations page</Link>
        </p>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-3">
        <h2 className="text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "#0C2C53" }}>
          DSE Tower &amp; Data Center
        </h2>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The DSE Tower is located at Plot 46, Road 21, Nikunja-2, Dhaka-1229, serving as the exchange's headquarters and primary data center. The facility houses the Automated Trading System (ATS), the market surveillance platform, market data dissemination infrastructure, and disaster recovery systems — designed to meet the operational continuity requirements of a regulated exchange.
        </p>
      </section>


      <Footer />
    </div>
  );
}
