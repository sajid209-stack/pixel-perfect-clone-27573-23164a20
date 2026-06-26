import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroTowerAsset from "@/assets/hero-dse-tower.jpg.asset.json";
import heritageCryoutAsset from "@/assets/heritage-cryout-1998.jpg.asset.json";

const heroTower = assetUrl(heroTowerAsset);
const heritageCryout = assetUrl(heritageCryoutAsset);

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  headline: string;
  subtext: string;
  cta: { label: string; to: string };
};

const slides: Slide[] = [
  {
    image: heroTower,
    alt: "Dhaka Stock Exchange tower at Nikunja",
    eyebrow: "Official Market Operator · Est. 1954",
    headline: "Bangladesh's capital market, in one trusted place.",
    subtext: "Real-time prices, disclosures and regulated market data.",
    cta: { label: "Explore the market", to: "/companies" },
  },
  {
    image: heritageCryout,
    alt: "Heritage of the Dhaka Stock Exchange trading floor, 1998",
    eyebrow: "Seven decades of the market",
    headline: "From the trading floor to a national exchange.",
    subtext: "Learn how the DSE has shaped Bangladesh's capital markets since 1954.",
    cta: { label: "Our history", to: "/about/introduction" },
  },
  {
    image: heroTower,
    alt: "Foreign investor access to Bangladesh",
    eyebrow: "Foreign investor access",
    headline: "Access Bangladesh's growth story.",
    subtext: "Trading rules, tax treatment and repatriation — all in one guide.",
    cta: { label: "Foreign investor guide", to: "/foreign-investors" },
  },
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setIdx((n + slides.length) % slides.length);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ borderBottom: "1px solid var(--line)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-frame relative w-full" style={{ height: 260 }}>
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0, pointerEvents: i === idx ? "auto" : "none" }}
            aria-hidden={i !== idx}
          >
            <img
              src={s.image}
              alt={s.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(8,22,40,0.88) 0%, rgba(8,22,40,0.70) 38%, rgba(8,22,40,0.32) 70%, rgba(8,22,40,0.20) 100%)",
              }}
            />
            <div className="relative h-full max-w-[1200px] mx-auto px-7 flex items-center">
              <div style={{ maxWidth: 580 }}>
                <div
                  className="text-[11px] font-semibold uppercase mb-3"
                  style={{ letterSpacing: "0.14em", color: "rgba(255,255,255,0.88)" }}
                >
                  {s.eyebrow}
                </div>
                <h1
                  className="font-semibold tracking-tight leading-[1.12] text-white"
                  style={{ fontSize: "clamp(26px, 3.4vw, 38px)" }}
                >
                  {s.headline}
                </h1>
                <p
                  className="hero-sub mt-3 text-[14.5px] leading-[1.55]"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {s.subtext}
                </p>
                <div className="mt-5">
                  <Link
                    to={s.cta.to}
                    className="inline-flex items-center gap-2 px-4 h-10 text-[13.5px] font-semibold"
                    style={{ background: "#ffffff", color: "var(--brand)", borderRadius: 2 }}
                  >
                    {s.cta.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          aria-label="Previous slide"
          onClick={() => go(idx - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "#fff",
            borderRadius: 2,
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(idx + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "#fff",
            borderRadius: 2,
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className="live-dot"
              style={{
                width: i === idx ? 22 : 8,
                height: 8,
                background: i === idx ? "#ffffff" : "rgba(255,255,255,0.55)",
                border: "none",
                transition: "width 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
