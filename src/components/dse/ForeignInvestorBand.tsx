import { Link } from "@tanstack/react-router";
import { Globe, ArrowRight, ArrowLeftRight, Receipt, FileText } from "lucide-react";

const links = [
  {
    Icon: ArrowLeftRight,
    title: "Trading & repatriation",
    desc: "NITA channel, eligible securities, FX outflows.",
    to: "/foreign-investors",
  },
  {
    Icon: Receipt,
    title: "Tax & withholding",
    desc: "Dividend, capital gains and DTAA treaty rates.",
    to: "/foreign-investors",
  },
  {
    Icon: FileText,
    title: "Regulations & circulars",
    desc: "BSEC, Bangladesh Bank and DSE rulebook PDFs.",
    to: "/foreign-investors",
  },
];

export function ForeignInvestorBand() {
  return (
    <section className="home-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          className="p-6 md:p-8"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--line)",
          }}
        >
          <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-8 items-stretch">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--brand-600)" }}>
                <Globe className="w-3.5 h-3.5" />
                For foreign investors
              </div>
              <h2 className="mt-3 text-[24px] md:text-[28px] font-semibold tracking-tight leading-[1.15]" style={{ color: "var(--ink)" }}>
                Foreign Investor Guide
              </h2>
              <p className="mt-3 text-[13.5px] leading-[1.65] max-w-[380px]" style={{ color: "var(--text-secondary)" }}>
                Operational guidance for non-resident participants — NITA account
                procedure, eligible securities, capital repatriation, applicable
                taxation and the relevant BSEC and Bangladesh Bank circulars.
              </p>
              <Link
                to="/foreign-investors"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold"
                style={{ color: "var(--brand-600)" }}
              >
                Open the guide
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-3 items-stretch min-w-0 w-full h-full">
              {links.map((l) => (
                <Link
                  key={l.title}
                  to={l.to}
                  className="group p-4 flex flex-col h-full min-h-[142px] min-w-0 transition"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 2,
                  }}
                >
                  <div
                    className="flex items-center justify-center mb-3"
                    style={{
                      width: 34,
                      height: 34,
                      background: "var(--surface-3)",
                      border: "1px solid var(--line)",
                      color: "var(--brand-600)",
                      borderRadius: 2,
                    }}
                  >
                    <l.Icon className="w-4 h-4" />
                  </div>
                  <div className="text-[13.5px] font-semibold" style={{ color: "var(--ink)" }}>{l.title}</div>
                  <p className="mt-1 text-[12px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
                    {l.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
