import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Images } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";
import dseTower from "@/assets/dse-automation-4.jpg.asset.json";

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

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-4">
        <h2 className="text-[22px] md:text-[26px] font-semibold leading-tight" style={{ color: "#0C2C53" }}>
          Clearing &amp; Settlement System
        </h2>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The Dhaka Stock Exchange operates a T+2 rolling settlement cycle for equity transactions. Trades executed on a trading day (T) are settled on the second business day that follows (T+2).
        </p>
        <div>
          <h3 className="text-[15px] font-semibold mb-2" style={{ color: "var(--ink)" }}>Settlement process</h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            <li><strong>Trade execution</strong> — orders are matched on the Automated Trading System (ATS)</li>
            <li><strong>Trade confirmation</strong> — contract notes are generated and distributed to TREC holders</li>
            <li><strong>Clearing</strong> — net obligations are calculated through multilateral netting</li>
            <li><strong>Securities transfer</strong> — dematerialised securities move through CDBL (Central Depository Bangladesh Limited)</li>
            <li><strong>Fund settlement</strong> — cash obligations are cleared through the designated settlement bank</li>
            <li><strong>Completion</strong> — settlement confirmation is issued to all parties on T+2</li>
          </ol>
        </div>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          <strong>Settlement Guarantee Fund (SGF):</strong> DSE maintains a Settlement Guarantee Fund to protect against TREC holder default and to ensure settlement finality.
        </p>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          <strong>Z-category securities:</strong> Companies classified in the Z category settle on a T+3 basis and are subject to additional trading restrictions as directed by BSEC.
        </p>
        <p className="text-[14px] pt-1">
          <Link to="/regulations" className="underline" style={{ color: "var(--brand-600)" }}>
            See related rules on the Regulations page →
          </Link>
        </p>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-4">
        <h2 className="text-[22px] md:text-[26px] font-semibold leading-tight" style={{ color: "#0C2C53" }}>
          DSE Tower &amp; Data Center
        </h2>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The DSE Tower is located at Plot 46, Road 21, Nikunja-2, Dhaka-1229. It serves as the headquarters of the Dhaka Stock Exchange and houses the exchange's primary data center.
        </p>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The data center supports the Automated Trading System (ATS), the market surveillance platform, market data dissemination services, and disaster recovery infrastructure — designed to meet the operational continuity requirements of a regulated exchange.
        </p>
        <figure style={{ maxWidth: 560, border: "1px solid var(--line)", borderRadius: 0 }}>
          <img src={assetUrl(dseTower)} alt="DSE Tower exterior" loading="lazy" className="w-full h-auto block" />
          <figcaption className="text-[12px] italic px-3 py-2" style={{ color: "#6b7280" }}>
            The DSE Tower houses the exchange's primary data center.
          </figcaption>
        </figure>
      </section>

      <Footer />
    </div>
  );
}
