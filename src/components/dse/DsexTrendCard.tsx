import { useState } from "react";
import { Sparkline, makeSeries } from "./Sparkline";

const ranges = ["1D", "1W", "1M"] as const;
type Range = typeof ranges[number];

const seriesByRange: Record<Range, number[]> = {
  "1D": makeSeries(2, 40, true),
  "1W": makeSeries(5, 40, true),
  "1M": makeSeries(9, 40, true),
};

export function DsexTrendCard() {
  const [r, setR] = useState<Range>("1D");
  const points = seriesByRange[r];
  const first = points[0];
  const last = points[points.length - 1];
  const chg = ((last - first) / first) * 100;
  const up = chg >= 0;
  return (
    <div
      className="flex flex-col"
      style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
    >
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <div>
          <div className="text-[10px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--text-muted)" }}>
            DSEX · {r}
          </div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="tnum text-[15px] font-semibold" style={{ color: "var(--ink)" }}>6,241.30</span>
            <span className="tnum text-[11.5px] font-semibold" style={{ color: up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)" }}>
              {up ? "▲" : "▼"} {Math.abs(chg).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex gap-0.5">
          {ranges.map((k) => {
            const active = r === k;
            return (
              <button
                key={k}
                onClick={() => setR(k)}
                className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  background: active ? "var(--brand)" : "transparent",
                  color: active ? "#fff" : "var(--text-muted)",
                  borderRadius: 2,
                }}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-2 py-2">
        <Sparkline points={points} up={up} height={96} />
      </div>
    </div>
  );
}
