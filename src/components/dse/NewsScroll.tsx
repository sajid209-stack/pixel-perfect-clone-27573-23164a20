import { ArrowUpRight } from "lucide-react";

type NewsItem = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

const news: NewsItem[] = [
  {
    category: "Market",
    date: "Jun 06",
    title: "DSEX closes above 6,240 as pharma rallies",
    excerpt: "Pharmaceuticals led broad-based gains with Square and Renata both up over 1.5%.",
  },
  {
    category: "IPO",
    date: "Jun 05",
    title: "Three IPOs open for subscription next week",
    excerpt: "Combined capital raise targets ৳480 Cr across textile, fintech and energy issuers.",
  },
  {
    category: "Policy",
    date: "Jun 04",
    title: "BSEC clarifies new margin rules for retail",
    excerpt: "Revised circular caps exposure ratios and tightens disclosure timelines for brokers.",
  },
  {
    category: "Disclosure",
    date: "Jun 03",
    title: "BAT Bangladesh declares 450% final dividend",
    excerpt: "Board approves record date of June 18 for the FY2025 cash dividend distribution.",
  },
  {
    category: "Sector",
    date: "Jun 02",
    title: "Banking turnover hits 3-month high",
    excerpt: "Islami Bank and BRAC Bank drove a ৳212 Cr session on renewed institutional demand.",
  },
  {
    category: "Global",
    date: "Jun 01",
    title: "Frontier markets see steady inflows in May",
    excerpt: "Bangladesh attracted ~$42M in net foreign portfolio inflow, the highest since January.",
  },
];

export function NewsScroll() {
  return (
    <section
      className="relative"
      style={{ paddingTop: 56, paddingBottom: 56 }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between gap-6">
        <div>
          <div
            className="text-[12px] uppercase tracking-[0.22em] mb-5"
            style={{ color: "var(--text-muted)" }}
          >
            Newsroom
          </div>
          <h2
            className="text-[32px] md:text-[44px] font-semibold tracking-tight leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          >
            Latest from the market.
          </h2>
        </div>
        <a
          href="/news"
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: "var(--green-up)" }}
        >
          All news
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div
        className="news-scroll-track flex gap-5 overflow-x-auto px-6 pb-4"
        style={{
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: 24,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {news.map((n, i) => (
          <article
            key={i}
            className="news-card shrink-0 rounded-2xl flex flex-col"
            style={{
              scrollSnapAlign: "start",
              width: "min(86vw, 360px)",
              minHeight: 240,
              padding: 24,
              background: "rgb(var(--surface-rgb))",
              border: "1px solid rgb(var(--ov) / 0.08)",
            }}
          >
            <div
              className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-muted)" }}
            >
              <span>{n.category}</span>
              <span className="tnum">{n.date}</span>
            </div>
            <h3
              className="mt-4 text-[18px] leading-[1.3] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {n.title}
            </h3>
            <p
              className="mt-3 text-[14px] leading-[1.6]"
              style={{ color: "var(--text-secondary)" }}
            >
              {n.excerpt}
            </p>
            <div
              className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "var(--green-up)" }}
            >
              Read story
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </article>
        ))}
        <div className="shrink-0" style={{ width: 8 }} aria-hidden />
      </div>
    </section>
  );
}
