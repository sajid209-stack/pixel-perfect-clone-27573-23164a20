import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroDhaka from "@/assets/hero-dhaka.jpg";

export function Hero() {
  return (
    <section
      className="relative w-full"
      style={{
        background: "#ffffff",
        color: "var(--ink)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="relative max-w-[1180px] mx-auto px-7 py-10 md:py-12 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
        <div>
          <div
            className="text-[11px] font-semibold uppercase mb-4"
            style={{ letterSpacing: "0.12em", color: "var(--brand)" }}
          >
            Official Market Operator · Est. 1954
          </div>

          <h1
            className="font-semibold tracking-tight leading-[1.15]"
            style={{
              color: "var(--ink)",
              fontSize: "clamp(26px, 4vw, 34px)",
              maxWidth: 620,
              fontFamily: "var(--font-heading)",
            }}
          >
            Bangladesh's capital market, in one trusted place
          </h1>

          <p
            className="mt-4 text-[15px] leading-[1.6]"
            style={{ color: "var(--text-secondary)", maxWidth: 540 }}
          >
            Real-time prices, company disclosures, IPO pipeline and regulated
            market data from the Dhaka Stock Exchange.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/companies"
              className="inline-flex items-center gap-2 px-4 h-10 text-[13.5px] font-semibold transition"
              style={{
                background: "var(--brand)",
                color: "#ffffff",
                borderRadius: 2,
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
                color: "var(--brand)",
                border: "1.5px solid var(--brand)",
                borderRadius: 2,
              }}
            >
              For foreign investors
            </Link>
          </div>
        </div>

        {/* Contained photo — not a full dark background */}
        <div
          className="hidden md:block relative overflow-hidden"
          style={{
            border: "1px solid var(--line)",
            aspectRatio: "4 / 3",
            background: "var(--surface-2)",
          }}
        >
          <img
            src={heroDhaka}
            alt="Dhaka skyline"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
