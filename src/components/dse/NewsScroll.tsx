import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";
import newsPharma from "@/assets/news-pharma.jpg";
import newsIpo from "@/assets/news-ipo.jpg";

type NewsItem = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image?: string;
  alt?: string;
};

const news: NewsItem[] = [
  {
    category: "Market",
    date: "Jun 06",
    title: "DSEX closes above 6,240 as pharma rallies",
    excerpt: "Pharmaceuticals led broad-based gains with Square and Renata both up over 1.5%.",
    image: newsPharma,
    alt: "Pharmaceutical production line in a modern facility",
  },
  {
    category: "IPO",
    date: "Jun 05",
    title: "Three IPOs open for subscription next week",
    excerpt: "Combined capital raise targets ৳480 Cr across textile, fintech and energy issuers.",
    image: newsIpo,
    alt: "Executives ringing the bell at a stock exchange IPO listing",
  },
  {
    category: "Policy",
    date: "Jun 04",
    title: "BSEC clarifies new margin rules for retail",
    excerpt: "Revised circular caps exposure ratios and tightens disclosure timelines for brokers.",
  },
];

export function NewsScroll() {
  const { t } = useLang();
  return (
    <section className="home-section relative">
      <div className="max-w-7xl mx-auto mb-5 flex items-end justify-between gap-6">
        <div>
          <div
            className="text-[12px] uppercase tracking-[0.22em] mb-2"
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
              className="news-card rounded-2xl flex flex-col p-6 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(155deg, rgba(127,217,176,0.10) 0%, rgba(127,217,176,0.03) 60%, rgb(var(--surface-rgb)) 100%)",
                border: "1px solid rgba(127,217,176,0.18)",
              }}
            >
              <div
                className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: "rgba(22,169,116,0.12)",
                    color: "var(--green-up)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {t(n.category)}
                </span>
                <span className="tnum">{n.date}</span>
              </div>
              <h3
                className="mt-5 text-[19px] md:text-[20px] leading-[1.3] font-semibold tracking-tight"
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
                className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--green-up)" }}
              >
                {t("Read story")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
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
            min-height: 220px;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}
