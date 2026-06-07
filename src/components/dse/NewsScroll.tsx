import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";

type NewsItem = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
};

const news: NewsItem[] = [
  {
    category: "Market",
    date: "Jun 06",
    title: "DSEX closes above 6,240 as pharma rallies",
    excerpt: "Pharmaceuticals led broad-based gains with Square and Renata both up over 1.5%.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=720&q=80&auto=format&fit=crop",
  },
  {
    category: "IPO",
    date: "Jun 05",
    title: "Three IPOs open for subscription next week",
    excerpt: "Combined capital raise targets ৳480 Cr across textile, fintech and energy issuers.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&q=80&auto=format&fit=crop",
  },
  {
    category: "Policy",
    date: "Jun 04",
    title: "BSEC clarifies new margin rules for retail",
    excerpt: "Revised circular caps exposure ratios and tightens disclosure timelines for brokers.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=720&q=80&auto=format&fit=crop",
  },
];

export function NewsScroll() {
  const { t } = useLang();
  return (
    <section className="home-section relative">
      <div className="max-w-7xl mx-auto mb-8 flex items-end justify-between gap-6">
        <div>
          <div
            className="text-[12px] uppercase tracking-[0.22em] mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            {t("Newsroom")}
          </div>
          <h2
            className="text-[28px] md:text-[36px] font-semibold tracking-tight leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          >
            {t("Latest from the market.")}
          </h2>
        </div>
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap"
          style={{ color: "var(--green-up)" }}
        >
          {t("All news")}
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="news-grid gap-5">
          {news.map((n, i) => (
            <article
              key={i}
              className="news-card rounded-2xl flex flex-col overflow-hidden"
              style={{
                background: "rgb(var(--surface-rgb))",
                border: "1px solid rgb(var(--ov) / 0.08)",
              }}
            >
              <div
                className="w-full overflow-hidden"
                style={{ height: 180, background: "rgb(var(--ov) / 0.05)" }}
              >
                <img
                  src={n.image}
                  alt={n.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div
                  className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>{t(n.category)}</span>
                  <span className="tnum">{n.date}</span>
                </div>
                <h3
                  className="mt-3 text-[17px] leading-[1.3] font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t(n.title)}
                </h3>
                <p
                  className="mt-2 text-[13.5px] leading-[1.6]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t(n.excerpt)}
                </p>
                <Link
                  to="/news"
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--green-up)" }}
                >
                  {t("Read story")}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        @media (max-width: 768px) {
          .news-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            margin: 0 -16px;
            padding: 0 16px 8px;
          }
          .news-grid::-webkit-scrollbar { display: none; }
          .news-card {
            flex: 0 0 86%;
            max-width: 320px;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}
