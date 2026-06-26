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
        <h2 className="text-[20px] md:text-[24px] font-semibold leading-tight" style={{ color: "#0C2C53" }}>
          Clearing &amp; Settlement System
        </h2>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The DSE operates a T+2 rolling settlement cycle for equities. This means transactions executed on a trading day (T) are settled on the second business day following the trade (T+2).
        </p>
        <p className="text-[14px] font-medium" style={{ color: "var(--ink)" }}>Settlement process overview:</p>
        <ol className="list-decimal pl-5 text-[14px] leading-relaxed space-y-1" style={{ color: "var(--ink)" }}>
          <li>Trade execution — orders matched on the Automated Trading System (ATS)</li>
          <li>Trade confirmation — contract notes generated and distributed to TREC holders</li>
          <li>Clearing — net obligations calculated through the multilateral netting system</li>
          <li>Securities transfer — dematerialised securities transferred via CDBL (Central Depository Bangladesh Limited)</li>
          <li>Fund transfer — cash obligations settled through the designated settlement bank</li>
          <li>Settlement completion — confirmation issued to all parties on T+2</li>
        </ol>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink)" }}>
          <span className="font-semibold">Settlement Guarantee Fund (SGF):</span> DSE maintains a Settlement Guarantee Fund to protect against TREC holder default and ensure settlement finality.
        </p>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink)" }}>
          <span className="font-semibold">Z category:</span> Companies in the Z category are subject to T+3 settlement and additional trading restrictions as directed by BSEC.
        </p>
        <p className="text-[13px] leading-relaxed pt-2" style={{ color: "var(--muted)" }}>
          Relevant regulations: Settlement Regulations 2013, Settlement Guarantee Fund Regulations 2013 — available on the{" "}
          <Link to="/regulations" className="underline" style={{ color: "var(--brand-600)" }}>Regulations page</Link>.
        </p>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-3">
        <h2 className="text-[20px] md:text-[24px] font-semibold leading-tight" style={{ color: "#0C2C53" }}>
          DSE Tower &amp; Data Center
        </h2>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The DSE Tower is located at Plot 46, Road 21, Nikunja-2, Dhaka-1229. The complex serves as the headquarters of the Dhaka Stock Exchange and houses the exchange's primary data center infrastructure.
        </p>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The data center supports the Automated Trading System (ATS), the surveillance platform, market data dissemination services, and disaster recovery infrastructure. The facility is designed to meet the operational continuity requirements of a regulated exchange environment.
        </p>
      </section>

      <Footer />
    </div>
  );
}
