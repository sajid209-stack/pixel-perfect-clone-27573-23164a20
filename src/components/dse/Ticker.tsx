import { tickerStocks } from "./data";

export function Ticker() {
  const items = [...tickerStocks, ...tickerStocks];
  return (
    <div className="h-12 overflow-hidden relative">
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
    </div>
  );
}
