import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { longSeries } from "./data";

const indices = [
  { key: "DSEX", name: "DSEX", sub: "Broad market", value: 6241.3, change: 0.30, prev: 6222.9 },
  { key: "DS30", name: "DS30", sub: "Blue chips", value: 2118.4, change: 0.18, prev: 2114.6 },
  { key: "DSES", name: "DSES", sub: "Shariah", value: 1340.2, change: -0.05, prev: 1340.87 },
] as const;

type IndexKey = (typeof indices)[number]["key"];

const periods = ["1D", "1W", "1M", "3M", "YTD"] as const;
type Period = (typeof periods)[number];

const mini = (up: boolean, seed = 0) =>
  Array.from({ length: 30 }, (_, i) => ({
    i,
    v:
      100 +
      (up ? i * 0.6 : -i * 0.2) +
      Math.sin((i + seed) / 2.3) * 2.4 +
      Math.cos((i + seed) / 5) * 1.2,
  }));

/* ---------- Index selector card ---------- */

function IndexCard({
  idx,
  active,
  onClick,
  i,
}: {
  idx: (typeof indices)[number];
  active: boolean;
  onClick: () => void;
  i: number;
}) {
  const up = idx.change >= 0;
  const data = useMemo(() => mini(up, i), [up, i]);
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
      whileHover={{ y: -2 }}
      className="group relative text-left p-7 rounded-2xl overflow-hidden transition-colors"
      style={{
        background: active
          ? "linear-gradient(160deg, rgba(127,217,176,0.07) 0%, rgb(var(--ov) / 0.01) 100%)"
          : "linear-gradient(160deg, rgb(var(--ov) / 0.025) 0%, rgb(var(--ov) / 0.005) 100%)",
      }}
    >
      {active && (
        <motion.div
          layoutId="indexActive"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(127,217,176,0.18), 0 30px 60px -40px rgba(127,217,176,0.4)",
          }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
        />
      )}

      <div className="relative flex items-start justify-between">
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--text-muted)" }}
          >
            {idx.sub}
          </div>
          <div
            className="mt-2 text-[15px] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {idx.name}
          </div>
        </div>
        <div
          className="text-[12px] tnum px-2 py-0.5 rounded-full"
          style={{
            background: up
              ? "rgba(127,217,176,0.10)"
              : "rgba(232,136,154,0.10)",
            color: up ? "var(--green-up)" : "var(--red-down)",
          }}
        >
          {up ? "▲" : "▼"} {Math.abs(idx.change).toFixed(2)}%
        </div>
      </div>

      <div
        className="relative mt-6 text-[34px] font-semibold tnum tracking-tight leading-none"
        style={{ color: "var(--text-primary)" }}
      >
        {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
      <div className="relative mt-2 text-[12px] tnum" style={{ color: "var(--text-muted)" }}>
        Prev close {idx.prev.toLocaleString()}
      </div>

      <div className="relative h-16 mt-6 -mx-1 opacity-90">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`mini-${idx.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={up ? "var(--green-up)" : "var(--red-down)"}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={up ? "var(--green-up)" : "var(--red-down)"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={up ? "var(--green-up)" : "var(--red-down)"}
              strokeWidth={1.4}
              fill={`url(#mini-${idx.key})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.button>
  );
}

/* ---------- Main chart panel ---------- */

function StatCol({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div>
      <div
        className="text-[10px] uppercase tracking-[0.22em] mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
      <div
        className="text-[18px] font-medium tnum tracking-tight"
        style={{ color: accent ?? "var(--text-primary)" }}
      >
        {value}
      </div>
    </div>
  );
}

export function IndicesPanel() {
  const [activeKey, setActiveKey] = useState<IndexKey>("DSEX");
  const [period, setPeriod] = useState<Period>("1M");
  const active = indices.find((i) => i.key === activeKey)!;
  const up = active.change >= 0;

  const high = Math.max(...longSeries.map((d) => d.value));
  const low = Math.min(...longSeries.map((d) => d.value));

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial header */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mb-10 items-end">
          <div>
            <div
              className="text-[12px] uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Index performance
            </div>
            <h2
              className="text-[40px] md:text-[52px] font-semibold tracking-tight leading-[1.05]"
              style={{ color: "var(--text-primary)" }}
            >
              The shape <br /> of the session.
            </h2>
          </div>
          <p
            className="text-[17px] leading-[1.8] max-w-[46ch] lg:justify-self-end"
            style={{ color: "var(--text-secondary)" }}
          >
            Three benchmarks, one tape. Pick an index and a window — the chart
            redraws against the previous close so you can read the move at a glance.
          </p>
        </div>

        {/* Index selector — 3 large interactive cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {indices.map((idx, i) => (
            <IndexCard
              key={idx.key}
              idx={idx}
              i={i}
              active={activeKey === idx.key}
              onClick={() => setActiveKey(idx.key)}
            />
          ))}
        </div>

        {/* Main chart canvas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Header strip */}
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div className="flex items-baseline gap-5">
              <div
                className="text-[12px] uppercase tracking-[0.22em]"
                style={{ color: "var(--text-muted)" }}
              >
                {active.name}
              </div>
              <div
                className="text-[40px] md:text-[48px] font-semibold tnum tracking-tight leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                {active.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div
                className="text-[14px] tnum"
                style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}
              >
                {up ? "▲" : "▼"} {(active.value - active.prev).toFixed(2)} ·{" "}
                {up ? "+" : ""}
                {active.change.toFixed(2)}%
              </div>
            </div>

            {/* Period pills */}
            <div
              className="flex gap-1 p-1 rounded-full"
              style={{ background: "rgb(var(--ov) / 0.03)" }}
            >
              {periods.map((p) => {
                const isActive = p === period;
                return (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className="relative px-4 py-1.5 text-[12px] tnum rounded-full transition-colors"
                    style={{
                      color: isActive ? "var(--navy-deep)" : "var(--text-secondary)",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="periodActive"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--green-up)" }}
                        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                      />
                    )}
                    <span className="relative">{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10 pb-10 border-b" style={{ borderColor: "rgb(var(--ov) / 0.05)" }}>
            <StatCol label="Open" value="6,225.10" />
            <StatCol label="High" value={high.toLocaleString()} accent="var(--green-up)" />
            <StatCol label="Low" value={low.toLocaleString()} accent="var(--red-down)" />
            <StatCol label="Volume" value="312.4M" />
          </div>

          {/* Chart */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey + period}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-[380px] -mx-2"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={longSeries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mainArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--green-up)" stopOpacity={0.30} />
                      <stop offset="100%" stopColor="var(--green-up)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                    axisLine={false}
                    tickLine={false}
                    interval={Math.floor(longSeries.length / 8)}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(2)}k`}
                    domain={["dataMin - 20", "dataMax + 20"]}
                    orientation="right"
                    width={48}
                  />
                  <Tooltip
                    cursor={{ stroke: "rgb(var(--ov) / 0.12)", strokeDasharray: "3 3" }}
                    contentStyle={{
                      borderRadius: 10,
                      border: "none",
                      background: "rgba(15,20,18,0.92)",
                      backdropFilter: "blur(12px)",
                      color: "var(--text-primary)",
                      fontSize: 12,
                      boxShadow: "0 20px 50px -20px rgb(var(--ov-inv) / 0.6)",
                    }}
                  />
                  <ReferenceLine
                    y={active.prev}
                    stroke="var(--text-muted)"
                    strokeDasharray="3 6"
                    strokeOpacity={0.6}
                    label={{
                      value: `Prev ${active.prev.toLocaleString()}`,
                      fontSize: 10,
                      fill: "var(--text-muted)",
                      position: "insideTopRight",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--green-up)"
                    strokeWidth={1.8}
                    fill="url(#mainArea)"
                    isAnimationActive
                    animationDuration={1200}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
