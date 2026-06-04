import { tickerStocks } from "./data";

export function Ticker() {
  const items = [...tickerStocks, ...tickerStocks];
  return (
    <div className="h-12 flex items-center overflow-hidden relative">
      <div
        className="flex-shrink-0 px-4 h-full flex items-center text-[12px] font-semibold uppercase tracking-wider z-10"
        style={{ color: "var(--green-up)" }}
      >
        ● Live
      </div>
      <div
        className="flex-1 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 240px, black calc(100% - 240px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 240px, black calc(100% - 240px), transparent 100%)",
        }}
      >
        <div className="ticker-track inline-flex whitespace-nowrap">
          {items.map((s, i) => {
            const up = s.change >= 0;
            return (
              <span key={i} className="px-6 text-[15px] tnum inline-flex items-center gap-2.5">
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{s.code}</span>
                <span style={{ color: "var(--text-secondary)" }}>{s.price}</span>
                <span style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}>
                  {up ? "▲" : "▼"}{Math.abs(s.change)}%
                </span>
                <span style={{ color: "var(--text-muted)" }}>·</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
