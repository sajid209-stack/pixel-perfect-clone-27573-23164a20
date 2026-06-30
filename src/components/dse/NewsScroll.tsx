import { assetUrl } from "@/lib/asset-url";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";
import newsPharma from "@/assets/news-pharma.jpg";
import newsIpo from "@/assets/news-ipo.jpg";
import heroTowerAsset from "@/assets/hero-dse-tower.jpg.asset.json";
import { NoticeBoard } from "./NoticeBoard";

type NewsItem = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
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
    image: assetUrl(heroTowerAsset),
    alt: "Dhaka Stock Exchange tower exterior",
  },
];

export function NewsScroll() {
  const { t } = useLang();
  return (
    <section className="home-section">
      <div className="max-w-[1180px] mx-auto">
        <div
          className="flex items-center justify-between gap-4 mb-3 pb-2 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div
            className="text-[11.5px] font-semibold uppercase flex items-center gap-2"
            style={{ letterSpacing: "0.05em", color: "var(--text-secondary)" }}
          >
            <span>{t("Newsroom")}</span>
            <span className="md:hidden font-normal normal-case tracking-normal text-[11px]" style={{ color: "var(--text-muted)" }}>swipe →</span>
          </div>
          <Link
            to="/news"
            className="text-[12.5px] font-semibold inline-flex items-center gap-1"
            style={{ color: "var(--brand-600)" }}
          >
            {t("All news")}
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {[
            { label: "All", href: "/news" },
            { label: "Price sensitive", href: "/news?filter=price-sensitive" },
            { label: "Notices", href: "/news?filter=notices" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="px-2.5 h-7 inline-flex items-center text-[11.5px] font-semibold"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--text-secondary)",
                borderRadius: 2,
              }}
            >
              {t(c.label)}
            </a>
          ))}
        </div>



        <div className="news-grid">
          {news.map((n, i) => (
            <article
              key={i}
              className="news-card flex flex-col h-full transition"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderLeft: i > 0 ? "none" : "1px solid var(--line)",
              }}
            >
              {n.image ? (
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16 / 9", borderBottom: "1px solid var(--line)" }}
                >
                  <img
                    src={n.image}
                    alt={n.alt ?? ""}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    background: "var(--surface-2)",
                    borderBottom: "1px solid var(--line)",
                  }}
                />
              )}
              <div className="flex flex-col flex-1 p-3.5">
                <div
                  className="flex items-center justify-between text-[11.5px] uppercase mb-2"
                  style={{ letterSpacing: "0.05em", color: "var(--text-muted)" }}
                >
                  <span
                    className="px-1.5 py-0.5 font-semibold"
                    style={{
                      background: "var(--surface-3)",
                      color: "var(--brand-600)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    {t(n.category)}
                  </span>
                  <span className="tnum">{n.date}</span>
                </div>
                <h3
                  className="text-[16px] leading-[1.3] font-semibold tracking-tight"
                  style={{ color: "var(--ink)" }}
                >
                  {t(n.title)}
                </h3>
                <p
                  className="mt-1.5 text-[14px] leading-[1.5]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t(n.excerpt)}
                </p>
                <Link
                  to="/news"
                  className="mt-auto pt-3 inline-flex items-center gap-1 text-[12px] font-semibold"
                  style={{ color: "var(--brand-600)" }}
                >
                  {t("Read story")}
                  <ArrowUpRight className="w-3.5 h-3.5" />
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
          .news-grid { grid-template-columns: 1fr; }
          .news-card { border-left: 1px solid var(--line) !important; border-top: none !important; }
          .news-card:first-child { border-top: 1px solid var(--line) !important; }
        }
      `}</style>
    </section>
  );
}

