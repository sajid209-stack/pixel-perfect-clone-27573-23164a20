import { ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

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
  {
    category: "Disclosure",
    date: "Jun 03",
    title: "BAT Bangladesh declares 450% final dividend",
    excerpt: "Board approves record date of June 18 for the FY2025 cash dividend distribution.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=720&q=80&auto=format&fit=crop",
  },
  {
    category: "Sector",
    date: "Jun 02",
    title: "Banking turnover hits 3-month high",
    excerpt: "Islami Bank and BRAC Bank drove a ৳212 Cr session on renewed institutional demand.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=720&q=80&auto=format&fit=crop",
  },
  {
    category: "Global",
    date: "Jun 01",
    title: "Frontier markets see steady inflows in May",
    excerpt: "Bangladesh attracted ~$42M in net foreign portfolio inflow, the highest since January.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=720&q=80&auto=format&fit=crop",
  },
];

export function NewsScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, moved: 0 });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current = { startX: e.clientX, scrollLeft: el.scrollLeft, moved: 0 };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragState.current.startX;
    dragState.current.moved = Math.abs(dx);
    el.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try { trackRef.current?.releasePointerCapture(e.pointerId); } catch {}
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="relative" style={{ paddingTop: 56, paddingBottom: 56 }}>
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
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        className="news-scroll-track flex gap-5 overflow-x-auto px-6 pb-2 select-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: isDragging ? "grabbing" : "grab",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {news.map((n, i) => (
          <article
            key={i}
            className="news-card shrink-0 rounded-2xl flex flex-col overflow-hidden"
            style={{
              width: "min(86vw, 340px)",
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
                draggable={false}
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div
                className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "var(--text-muted)" }}
              >
                <span>{n.category}</span>
                <span className="tnum">{n.date}</span>
              </div>
              <h3
                className="mt-3 text-[17px] leading-[1.3] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {n.title}
              </h3>
              <p
                className="mt-2 text-[13.5px] leading-[1.6]"
                style={{ color: "var(--text-secondary)" }}
              >
                {n.excerpt}
              </p>
              <div
                className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--green-up)" }}
              >
                Read story
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </article>
        ))}
        <div className="shrink-0" style={{ width: 8 }} aria-hidden />
      </div>
      <style>{`.news-scroll-track::-webkit-scrollbar{display:none}`}</style>
    </section>
  );
}
