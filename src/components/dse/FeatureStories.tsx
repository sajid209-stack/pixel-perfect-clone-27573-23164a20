import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import innovationImg from "@/assets/feature-innovation.jpg";
import trustImg from "@/assets/feature-trust.jpg";


type Story = {
  num: string;
  eyebrow: string;
  title: string;
  italic: string;
  body: string;
  cta: string;
  ctaTo: string;
  image: string;
  imageAlt: string;
  stats: { label: string; value: string }[];
};

const stories: Story[] = [
  {
    num: "01",
    eyebrow: "Market intelligence",
    title: "Innovation and trust,",
    italic: "hand in hand.",
    body: "The Dhaka Stock Exchange leads Bangladesh's capital market with deep liquidity, transparent disclosures, and infrastructure built for the next generation of investors and listed companies.",
    cta: "Browse market reports",
    ctaTo: "/reports",
    image: innovationImg,
    imageAlt: "Glowing green stock chart visualization",
    stats: [
      { label: "Listed companies", value: "352" },
      { label: "Market cap", value: "৳6.8T" },
      { label: "Avg. daily volume", value: "312M" },
    ],
  },
  {
    num: "02",
    eyebrow: "Listings",
    title: "Building capital,",
    italic: "one listing at a time.",
    body: "From early-stage growth companies to established conglomerates, the DSE provides a venue where ambition meets capital — backed by world-class governance and regulatory oversight.",
    cta: "Explore listings",
    ctaTo: "/companies",
    image: trustImg,
    imageAlt: "Dhaka skyline at dusk with green accents",
    stats: [
      { label: "IPOs in 2026", value: "14" },
      { label: "Capital raised", value: "৳1,820 Cr" },
      { label: "Pipeline", value: "23" },
    ],
  },
];


function StoryBlock({ story, index }: { story: Story; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const reverse = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${reverse ? "" : ""}`}
    >
      {/* IMAGE side */}
      <div className={`relative lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <div className="relative">
          {/* big number overlay */}
          <div
            className={`absolute z-20 text-[120px] md:text-[180px] font-bold leading-none tracking-tighter pointer-events-none ${
              reverse ? "-right-4 -top-12" : "-left-4 -top-12"
            }`}
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgb(var(--ov) / 0.15)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {story.num}
          </div>

          <div
            className="relative overflow-hidden rounded-[28px] aspect-[5/6] lg:aspect-[5/4]"
            style={{
              boxShadow: "0 40px 100px -30px rgb(var(--ov-inv) / 0.8), 0 0 0 1px rgb(var(--ov) / 0.06)",
            }}
          >
            <motion.img
              src={story.image}
              alt={story.imageAlt}
              width={1280}
              height={1280}
              loading="lazy"
              style={{ y: imageY }}
              className="w-full h-[115%] object-cover scale-105"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 30%, rgb(var(--surface-rgb) / 0.7) 100%)",
              }}
            />
            {/* floating stat badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3 p-4 rounded-2xl"
              style={{
                background: "rgb(var(--surface-rgb) / 0.65)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgb(var(--ov) / 0.08)",
              }}
            >
              {story.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                  <div className="text-[18px] font-semibold tracking-tight tnum" style={{ color: "var(--text-primary)" }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div
            className="absolute -inset-8 -z-10 rounded-[40px] pointer-events-none"
            style={{
              background: "radial-gradient(60% 60% at 50% 50%, rgb(var(--brand-tint) / 0.12), transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>
      </div>

      {/* TEXT side */}
      <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background: "var(--primary)" }} />
          <div className="text-[11px] uppercase tracking-[0.22em] font-medium" style={{ color: "var(--primary)" }}>
            {story.eyebrow}
          </div>
        </div>

        <h3
          className="text-[36px] md:text-[52px] font-semibold leading-[1.02] tracking-[-0.02em]"
          style={{ color: "var(--text-primary)" }}
        >
          {story.title}<br />
          <span className="italic font-light" style={{ color: "var(--primary)" }}>{story.italic}</span>
        </h3>

        <p className="mt-7 text-[17px] leading-[1.65] max-w-[48ch]" style={{ color: "var(--text-secondary)" }}>
          {story.body}
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            to={story.ctaTo}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition group cursor-pointer"
            style={{
              background: "var(--primary)",
              color: "#07090A",
              boxShadow: "0 12px 32px -12px rgb(var(--brand-tint) / 0.65)",
            }}
          >
            {story.cta}
            <ArrowUpRight className="w-4 h-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </motion.article>
  );
}

export function FeatureStories() {
  return (
    <section className="py-32 md:py-20 px-6 relative overflow-hidden">
      {/* ambient grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgb(var(--ov) / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ov) / 1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }} />

      <div className="max-w-7xl mx-auto mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <Sparkles className="w-4 h-4" style={{ color: "var(--primary)" }} />
          <div className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: "var(--primary)" }}>
            Insights & stories
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[44px] md:text-[72px] font-semibold tracking-[-0.025em] leading-[0.95]"
            style={{ color: "var(--text-primary)" }}
          >
            Stories from<br />
            <span className="italic font-light" style={{ color: "var(--primary)" }}>Bangladesh's market.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[16px] leading-[1.7] max-w-[42ch]"
            style={{ color: "var(--text-secondary)" }}
          >
            How innovation, capital, and oversight come together to shape one of South Asia's most dynamic exchanges.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-40 relative">
        {stories.map((s, i) => (
          <StoryBlock key={s.num} story={s} index={i} />
        ))}
      </div>
    </section>
  );
}
