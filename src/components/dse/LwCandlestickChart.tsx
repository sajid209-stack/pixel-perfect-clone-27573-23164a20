import { useEffect, useRef, useState } from "react";
import type { UTCTimestamp } from "lightweight-charts";

export type LwBar = {
  time: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  up: boolean;
};

const UP = "#1d7a3f";
const DOWN = "#c0392b";

export function LwCandlestickChart({ data, height = 360 }: { data: LwBar[]; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !ref.current) return;
    const el = ref.current;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const lw = await import("lightweight-charts");
      if (disposed) return;
      const chart = lw.createChart(el, {
        autoSize: true,
        layout: {
          background: { color: "transparent" },
          textColor: "rgba(120,130,140,0.9)",
          fontSize: 11,
        },
        grid: {
          vertLines: { color: "rgba(120,130,140,0.08)" },
          horzLines: { color: "rgba(120,130,140,0.08)" },
        },
        rightPriceScale: { borderColor: "rgba(120,130,140,0.15)" },
        timeScale: { borderColor: "rgba(120,130,140,0.15)", timeVisible: false },
        crosshair: { mode: lw.CrosshairMode.Normal },
      });

      const candles = chart.addSeries(lw.CandlestickSeries, {
        upColor: UP,
        downColor: DOWN,
        borderUpColor: UP,
        borderDownColor: DOWN,
        wickUpColor: UP,
        wickDownColor: DOWN,
        priceFormat: { type: "price", precision: 2, minMove: 0.01 },
      });
      candles.priceScale().applyOptions({
        scaleMargins: { top: 0.05, bottom: 0.28 },
      });

      const volume = chart.addSeries(lw.HistogramSeries, {
        priceFormat: { type: "volume" },
        priceScaleId: "vol",
      });
      volume.priceScale().applyOptions({
        scaleMargins: { top: 0.78, bottom: 0 },
      });

      const toTime = (iso: string) =>
        Math.floor(new Date(iso + "T00:00:00Z").getTime() / 1000) as UTCTimestamp;

      candles.setData(
        data.map((b) => ({
          time: toTime(b.time),
          open: b.open,
          high: b.high,
          low: b.low,
          close: b.close,
        })),
      );
      volume.setData(
        data.map((b) => ({
          time: toTime(b.time),
          value: b.volume,
          color: b.up ? UP + "aa" : DOWN + "aa",
        })),
      );

      chart.timeScale().fitContent();
      cleanup = () => chart.remove();
    })();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [ready, data]);

  return <div ref={ref} style={{ width: "100%", height }} />;
}
