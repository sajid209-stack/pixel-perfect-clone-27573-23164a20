import { Link } from "@tanstack/react-router";
import { tickerStocks } from "./data";

export function Ticker() {
  const items = [...tickerStocks, ...tickerStocks];
  return (
    <div className="h-12 overflow-hidden relative ticker-wrap">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        <div
          className="flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 120px, black calc(100% - 120px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 120px, black calc(100% - 120px), transparent 100%)",
          }}
        >
          <div className="ticker-track inline-flex whitespace-nowrap">
            {items.map((s, i) => {
              const up = s.change >= 0;
              const isClone = i >= tickerStocks.length;
              return (
                <Link
                  key={i}
                  to="/company/$ticker"
                  params={{ ticker: s.code }}
                  aria-hidden={isClone ? "true" : undefined}
                  tabIndex={isClone ? -1 : undefined}
                  className="px-6 text-[15px] tnum inline-flex items-center gap-2.5 hover:opacity-100 opacity-90 transition"
                >
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{s.code}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{s.price}</span>
                  <span style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}>
                    {up ? "▲" : "▼"}{Math.abs(s.change)}%
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>·</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        .ticker-wrap:hover .ticker-track,
        .ticker-wrap:focus-within .ticker-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
