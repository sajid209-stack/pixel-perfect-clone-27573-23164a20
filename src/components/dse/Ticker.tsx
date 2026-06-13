import { Link } from "@tanstack/react-router";
import { tickerStocks } from "./data";

export function Ticker() {
  const items = [...tickerStocks, ...tickerStocks];
  return (
    <div
      className="h-[30px] overflow-hidden relative ticker-wrap flex items-center sticky z-40"
      style={{
        top: 36,
        background: "var(--surface-3, #eef1ee)",
        color: "var(--ink)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="shrink-0 px-2.5 ml-4 h-[22px] flex items-center text-[10px] font-semibold tracking-[0.18em] uppercase"
        style={{ background: "var(--brand-600, var(--brand))", color: "#ffffff", borderRadius: 2 }}
      >
        ● Live
      </div>
      <div
        className="flex-1 overflow-hidden ml-3"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
        }}
      >
        <div className="ticker-track inline-flex whitespace-nowrap">
          {items.map((s, i) => {
            const up = s.change >= 0;
            const isClone = i >= tickerStocks.length;
            const priceNum = parseFloat(s.price.replace(/,/g, ""));
            const abs = (priceNum * s.change) / 100;
            const absStr = Math.abs(abs).toFixed(2);
            const sign = up ? "+" : "−";
            const deltaColor = up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)";
            return (
              <Link
                key={i}
                to="/company/$ticker"
                params={{ ticker: s.code }}
                aria-hidden={isClone ? "true" : undefined}
                tabIndex={isClone ? -1 : undefined}
                className="px-6 text-[13px] tnum inline-flex items-center gap-2 transition whitespace-nowrap"
              >
                <span className="font-semibold" style={{ color: "var(--ink)" }}>{s.code}</span>
                <span style={{ color: "var(--text-secondary)" }}>{s.price}</span>
                <span className="text-[12px] inline-flex items-center gap-1.5" style={{ color: deltaColor }}>
                  <span>{up ? "▲" : "▼"}</span>
                  <span>{sign}{absStr}</span>
                  <span>{sign}{Math.abs(s.change)}%</span>
                </span>
                <span style={{ color: "var(--line)" }}>·</span>
              </Link>
            );
          })}
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
