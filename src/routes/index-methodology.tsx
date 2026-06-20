import { createFileRoute, Link } from "@tanstack/react-router";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/index-methodology")({
  head: () => ({
    meta: [
      { title: "Algorithm of DSE Indices | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Algorithm of DSE indices following IOSCO Index Methodology: current and closing index formulas, market capitalisation calculation, and abbreviations.",
      },
      { property: "og:title", content: "Algorithm of DSE Indices" },
      {
        property: "og:description",
        content:
          "IOSCO-aligned algorithm used to calculate DSEX, DS30, DSES and CDSET indices.",
      },
    ],
  }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <div
      style={{ background: "var(--page-bg)", color: "var(--text-primary)" }}
      className="min-h-screen"
    >
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 pt-10 pb-8">
          <div
            className="text-[11px] uppercase tracking-[0.24em] mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            <Link to="/indices" className="hover:opacity-80">
              Markets · Indices
            </Link>{" "}
            · Methodology
          </div>
          <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
            Algorithm of DSE Indices
          </h1>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-10">
        <div
          className="max-w-[820px] p-6 rounded-lg border"
          style={{
            borderColor: "rgb(var(--ov) / 0.08)",
            background: "rgb(var(--ov) / 0.02)",
          }}
        >
          <p className="text-[15px] font-medium mb-4">
            Index Calculation Algorithm (according to IOSCO Index Methodology):
          </p>
          <ul className="space-y-3 text-[14px] font-mono leading-relaxed">
            <li>Current Index = ( Yesterday's Closing Index × Current M.Cap ) / Opening M.Cap</li>
            <li>Closing Index = ( Yesterday's Closing Index × Closing M.Cap ) / Opening M.Cap</li>
            <li>Current M.Cap = ∑ ( LTP × Total no. of indexed shares )</li>
            <li>Closing M.Cap = ∑ ( CP × Total no. of indexed shares )</li>
          </ul>
          <p className="mt-6 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>
              Abbreviations:
            </span>{" "}
            M.Cap = Market Capitalization; LTP = Last Traded Price; CP = Closing Price;
            IOSCO = International Organization of Securities Commissions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
