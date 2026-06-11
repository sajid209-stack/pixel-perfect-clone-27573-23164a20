import { Link } from "@tanstack/react-router";
import { tickerStocks } from "./data";

export function Ticker() {
  const items = [...tickerStocks, ...tickerStocks];
  return (
    <div
      className="h-[38px] overflow-hidden relative ticker-wrap flex items-center"
      style={{
        background: "var(--brand-600)",
        color: "#ffffff",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="shrink-0 px-3 ml-4 h-[20px] flex items-center text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm"
        style={{ background: "rgba(255,255,255,0.14)", color: "#ffffff" }}
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
            return (
              <Link
                key={i}
                to="/company/$ticker"
                params={{ ticker: s.code }}
                aria-hidden={isClone ? "true" : undefined}
                tabIndex={isClone ? -1 : undefined}
                className="px-5 text-[13px] tnum inline-flex items-center gap-2 hover:opacity-100 opacity-95 transition"
              >
                <span className="font-semibold" style={{ color: "#ffffff" }}>{s.code}</span>
                <span style={{ color: "rgba(255,255,255,0.78)" }}>{s.price}</span>
                <span style={{ color: up ? "#7ee6a8" : "#f3a6a0" }}>
                  {up ? "▲" : "▼"}{Math.abs(s.change)}%
                </span>
                <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
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
