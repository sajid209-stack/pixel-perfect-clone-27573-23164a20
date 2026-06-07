import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import heroGradient from "@/assets/hero-gradient.jpg";

type Story = {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  ctaTo: string;
  image: string;
  accent: string;
};

const stories: Story[] = [
  {
    eyebrow: "Listing",
    title: "Walton Hi-Tech debuts new bond on DSE Mainboard",
    desc: "Bangladesh's homegrown electronics leader raises BDT 8.5B through a sustainability-linked bond — the largest of its kind on the exchange.",
    cta: "View company",
    ctaTo: "/company/WALTONHIL",
    image: heroGradient,
    accent: "#10F0A0",
  },
  {
    eyebrow: "Market data",
    title: "DSEX FTSE South Asia Index futures open for trading",
    desc: "A new benchmark instrument designed to give regional and institutional investors transparent exposure to Bangladesh's blue-chip equities.",
    cta: "Explore the index",
    ctaTo: "/indices",
    image: heroGradient,
    accent: "#7FD9B0",
  },
  {
    eyebrow: "Investor education",
    title: "Unlocking shareholder value for listed companies",
    desc: "A new DSE programme helping issuers improve disclosure quality, investor relations, and long-term capital formation.",
    cta: "Browse market reports",
    ctaTo: "/reports",
    image: heroGradient,
    accent: "#4FD1C5",
  },
];


export function Hero() {
  const [active, setActive] = useState(0);
  const { t } = useLang();

  // auto-advance
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % stories.length), 7000);
    return () => clearInterval(t);
  }, []);

  const story = stories[active];

  return (
    <section className="relative">
      <div className="max-w-[1440px] mx-auto px-6 pt-0 pb-16">

        {/* Featured carousel */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            border: "1px solid rgb(var(--ov) / 0.08)",
            background: "rgb(var(--surface-rgb) / 0.6)",
          }}
        >
          <div className="relative h-[460px] md:h-[520px]">
            {/* Background image crossfade */}
            <AnimatePresence mode="sync">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={story.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* Brand tint overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(105deg, ${story.accent}33 0%, transparent 55%)`,
                  }}
                />
                {/* Readability gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(7,9,10,0.78) 0%, rgba(7,9,10,0.45) 45%, rgba(7,9,10,0) 70%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay card */}
            <div className="relative h-full flex items-center">
              <div className="px-6 md:px-12 max-w-[640px] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="p-7 md:p-9 rounded-xl"
                    style={{
                      background: "rgba(11, 14, 16, 0.72)",
                      backdropFilter: "blur(20px) saturate(160%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="text-[11px] uppercase tracking-[0.22em] mb-4 inline-flex items-center gap-2"
                      style={{ color: story.accent }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: story.accent }}
                      />
                      {t(story.eyebrow)}
                    </div>
                    <h2 className="text-[20px] md:text-[34px] font-semibold tracking-tight leading-[1.15] text-white">
                      {t(story.title)}
                    </h2>
                    <p className="mt-4 text-[13px] md:text-[15.5px] leading-[1.65] text-white/70">
                      {t(story.desc)}
                    </p>
                    <Link
                      to={story.ctaTo}
                      className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition hover:scale-[1.02]"
                      style={{
                        background: story.accent,
                        color: "#07090A",
                        boxShadow: `0 8px 24px -8px ${story.accent}88`,
                      }}
                    >
                      {t(story.cta)}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 border-t"
            style={{
              borderColor: "rgb(var(--ov) / 0.08)",
              background: "rgb(var(--surface-rgb) / 0.85)",
              backdropFilter: "blur(14px)",
            }}
          >
            {stories.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className="relative text-left px-5 md:px-7 py-5 md:py-6 transition group"
                  style={{
                    borderRight:
                      i < stories.length - 1
                        ? "1px solid rgb(var(--ov) / 0.06)"
                        : "none",
                  }}
                >
                  {/* progress / active bar */}
                  <span
                    className="absolute left-0 right-0 bottom-0 h-[3px] overflow-hidden"
                    style={{ background: "rgb(var(--ov) / 0.06)" }}
                  >
                    {isActive && (
                      <motion.span
                        key={`bar-${active}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 7, ease: "linear" }}
                        className="block h-full origin-left"
                        style={{ background: s.accent }}
                      />
                    )}
                  </span>

                  <div
                    className="text-[10px] uppercase tracking-[0.22em] mb-2"
                    style={{
                      color: isActive ? s.accent : "var(--text-muted)",
                    }}
                  >
                    {t(s.eyebrow)}
                  </div>
                  <div
                    className="text-[14px] md:text-[15px] font-semibold leading-snug line-clamp-2 transition"
                    style={{
                      color: isActive
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {t(s.title)}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
