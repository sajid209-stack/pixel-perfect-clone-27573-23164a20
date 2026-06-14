import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeftRight, Receipt, FileText, ChevronRight } from "lucide-react";
import fiImage from "@/assets/foreign-investors.jpg.asset.json";

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

function GlobeGraphic() {
  return (
    <svg
      viewBox="0 0 480 360"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="fi-globe-fill" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1b2f55" />
          <stop offset="100%" stopColor="#0b1729" />
        </radialGradient>
      </defs>
      <rect width="480" height="360" fill="#0b1729" />
      <g transform="translate(240 180)" stroke="#3a7bd5" strokeOpacity="0.55" fill="none">
        <circle r="120" fill="url(#fi-globe-fill)" stroke="#2a4d85" />
        {[...Array(7)].map((_, i) => (
          <ellipse key={`lat-${i}`} cx="0" cy="0" rx="120" ry={120 - i * 18} strokeWidth="0.6" />
        ))}
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={`lon-${i}`}
            cx="0"
            cy="0"
            rx={120 - i * 14}
            ry="120"
            strokeWidth="0.6"
            transform={`rotate(${i * 22.5})`}
          />
        ))}
      </g>
      <g stroke="#22c55e" strokeOpacity="0.75" fill="none" strokeWidth="1.2">
        <path d="M80 240 Q 200 80 360 130" />
        <path d="M120 90 Q 240 200 400 220" />
        <path d="M60 160 Q 240 260 420 90" strokeOpacity="0.45" />
      </g>
      <g fill="#22c55e">
        <circle cx="80" cy="240" r="3.5" />
        <circle cx="360" cy="130" r="3.5" />
        <circle cx="120" cy="90" r="3" />
        <circle cx="400" cy="220" r="3" />
        <circle cx="240" cy="180" r="4" fill="#4ade80" />
      </g>
    </svg>
  );
}

export function ForeignInvestorBand() {
  return (
    <section className="home-section">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div
          className="grid grid-cols-1 md:grid-cols-[42%_58%] overflow-hidden"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          {/* Left: branded image panel */}
          <div className="relative min-h-[300px] text-white">
            <GlobeGraphic />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,23,41,0.35) 0%, rgba(11,23,41,0.85) 70%, rgba(11,23,41,0.95) 100%)",
              }}
            />
            <div className="relative h-full flex flex-col justify-end p-6 md:p-7">
              <div
                className="text-[11px] font-semibold uppercase"
                style={{ letterSpacing: "0.14em", color: "#7ed3a0" }}
              >
                For foreign investors
              </div>
              <h2 className="mt-2 text-[24px] md:text-[26px] font-semibold tracking-tight leading-[1.15]">
                Foreign Investor Guide
              </h2>
              <p className="mt-2 text-[13px] leading-[1.6] text-white/80 max-w-[380px]">
                Operational guidance for non-resident participants — NITA accounts,
                eligible securities, capital repatriation, taxation, and the
                relevant BSEC and Bangladesh Bank circulars.
              </p>
              <Link
                to="/foreign-investors"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white underline underline-offset-4 w-fit"
              >
                Open the guide
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: stacked link rows */}
          <div className="flex flex-col" style={{ background: "var(--surface-2)" }}>
            {links.map((l, i) => (
              <Link
                key={l.title}
                to={l.to}
                className="group flex items-center gap-4 p-5 flex-1 transition-colors"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 38,
                    height: 38,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    color: "var(--brand-600)",
                    borderRadius: 2,
                  }}
                >
                  <l.Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[16px] font-semibold leading-tight"
                    style={{ color: "var(--ink)" }}
                  >
                    {l.title}
                  </div>
                  <p
                    className="mt-1 text-[14px] leading-[1.5]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {l.desc}
                  </p>
                </div>
                <ChevronRight
                  className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                  style={{ color: "var(--brand-600)" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
