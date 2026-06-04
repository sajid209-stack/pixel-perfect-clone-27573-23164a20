import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import innovationImg from "@/assets/feature-innovation.jpg";
import trustImg from "@/assets/feature-trust.jpg";

type Story = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

const stories: Story[] = [
  {
    eyebrow: "Market intelligence",
    title: "Innovation and trust go hand-in-hand at the DSE.",
    body: "The Dhaka Stock Exchange leads Bangladesh's capital market with deep liquidity, transparent disclosures, and infrastructure built for the next generation of investors and listed companies.",
    cta: "Read more",
    image: innovationImg,
    imageAlt: "Glowing green stock chart visualization",
  },
  {
    eyebrow: "Listings",
    title: "Building Bangladesh's capital, one listing at a time.",
    body: "From early-stage growth companies to established conglomerates, the DSE provides a venue where ambition meets capital — backed by world-class governance and regulatory oversight.",
    cta: "Explore listings",
    image: trustImg,
    imageAlt: "Dhaka skyline at dusk with green accents",
    reverse: true,
  },
];

export function FeatureStories() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-[12px] uppercase tracking-[0.18em] mb-3" style={{ color: "var(--text-muted)" }}>
          Insights
        </div>
        <h2 className="text-[36px] md:text-[44px] font-bold tracking-tight max-w-[24ch]" style={{ color: "var(--text-primary)" }}>
          Stories from Bangladesh's market.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto space-y-28">
        {stories.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${s.reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-[4/3]"
                style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)" }}
              >
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  width={1280}
                  height={1280}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(7,9,10,0.55) 100%)",
                  }}
                />
              </div>
              <div
                className="absolute -inset-6 -z-10 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(16,240,160,0.10), transparent 70%)", filter: "blur(40px)" }}
              />
            </div>

            <div className={s.reverse ? "lg:pr-8" : "lg:pl-8"}>
              <div className="text-[12px] uppercase tracking-[0.18em] mb-5" style={{ color: "var(--green-up)" }}>
                {s.eyebrow}
              </div>
              <h3
                className="text-[32px] md:text-[40px] font-bold leading-[1.1] tracking-tight max-w-[18ch]"
                style={{ color: "var(--text-primary)" }}
              >
                {s.title}
              </h3>
              <p
                className="mt-6 text-[17px] leading-[1.7] max-w-[52ch]"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.body}
              </p>
              <a
                className="mt-10 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition group cursor-pointer"
                style={{
                  background: "var(--green-up)",
                  color: "#07090A",
                  boxShadow: "0 10px 30px -10px rgba(16,240,160,0.6)",
                }}
              >
                {s.cta}
                <ArrowUpRight className="w-4 h-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
