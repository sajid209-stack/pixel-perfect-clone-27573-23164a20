type Props = {
  points: number[];
  up: boolean;
  height?: number;
  width?: number;
  className?: string;
};

export function Sparkline({ points, up, height = 54, width = 240, className }: Props) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  const ys = points.map((p) => height - ((p - min) / range) * (height - 4) - 2);
  const xs = points.map((_, i) => i * stepX);
  const linePath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
  const color = up ? "var(--up, #1d7a3f)" : "var(--down, #c0392b)";
  const fillId = `spk-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${fillId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={1.4} />
    </svg>
  );
}

// Deterministic-ish demo intraday series
export function makeSeries(seed: number, len = 30, trendUp = true) {
  const out: number[] = [];
  let v = 100;
  for (let i = 0; i < len; i++) {
    const noise = Math.sin(seed + i * 0.7) * 1.2 + Math.cos(seed * 0.3 + i) * 0.8;
    const drift = (trendUp ? 1 : -1) * (i / len) * 3;
    v = 100 + drift + noise;
    out.push(v);
  }
  return out;
}
