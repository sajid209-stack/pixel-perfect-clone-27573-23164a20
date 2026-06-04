import { tickerStocks } from "./data";

export function Ticker() {
  const items = [...tickerStocks, ...tickerStocks];
  return (
    <div
      className="h-10 flex items-center overflow-hidden relative"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        className="flex-shrink-0 px-3 h-full flex items-center text-[11px] font-semibold uppercase tracking-wider z-10"
        style={{ background: "rgba(127,217,176,0.10)", color: "var(--green-up)" }}
      >
        ● Live
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="ticker-track inline-flex whitespace-nowrap">
          {items.map((s, i) => {
            const up = s.change >= 0;
            return (
              <span key={i} className="px-5 text-[13px] tnum inline-flex items-center gap-2">
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
