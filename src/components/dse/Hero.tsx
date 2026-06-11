import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroDhaka from "@/assets/hero-dhaka.jpg";

export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--brand)", color: "#ffffff" }}
    >
      {/* Background photo at ~20% */}
      <img
        src={heroDhaka}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.2 }}
      />
      {/* Subtle brand scrim for legibility on right edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, var(--brand) 0%, color-mix(in oklab, var(--brand) 90%, transparent) 55%, color-mix(in oklab, var(--brand) 70%, transparent) 100%)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-7 py-12 md:py-[46px]">
        <div
          className="text-[11px] font-semibold uppercase mb-5"
          style={{ letterSpacing: "0.12em", color: "rgba(255,255,255,0.75)" }}
        >
          Official Market Operator · Est. 1954
        </div>

        <h1
          className="font-bold tracking-tight leading-[1.12]"
          style={{
            color: "#ffffff",
            fontSize: "clamp(26px, 4.2vw, 34px)",
            maxWidth: 680,
            fontFamily: "var(--font-heading)",
          }}
        >
          Bangladesh's capital market, in one trusted place
        </h1>

        <p
          className="mt-4 text-[15px] leading-[1.6]"
          style={{ color: "rgba(255,255,255,0.78)", maxWidth: 560 }}
        >
          Real-time prices, company disclosures, IPO pipeline and regulated market
          data from the Dhaka Stock Exchange.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 px-4 h-10 text-[13.5px] font-semibold transition"
            style={{
              background: "#ffffff",
              color: "var(--brand)",
              borderRadius: 6,
            }}
          >
            Explore the market
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/foreign-investors"
            className="inline-flex items-center gap-2 px-4 h-10 text-[13.5px] font-semibold transition"
            style={{
              background: "transparent",
              color: "#ffffff",
              border: "1.5px solid rgba(255,255,255,0.6)",
              borderRadius: 6,
            }}
          >
            For foreign investors
          </Link>
        </div>
      </div>
    </section>
  );
}
