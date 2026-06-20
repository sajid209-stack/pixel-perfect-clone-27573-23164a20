import { useEffect, useState } from "react";

/** Bangladesh trading hours: Sun–Thu, 10:00–14:30 BST (UTC+6). */
function nowInDhaka(): { date: Date; isOpen: boolean } {
  const now = new Date();
  const dhaka = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  const day = dhaka.getDay(); // 0 Sun … 6 Sat
  const minutes = dhaka.getHours() * 60 + dhaka.getMinutes();
  const tradingDay = day >= 0 && day <= 4; // Sun–Thu
  const isOpen = tradingDay && minutes >= 600 && minutes <= 870;
  return { date: dhaka, isOpen };
}

function fmt(d: Date) {
  return d.toLocaleString("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function MarketFreshness({ label = "as provided by DSE" }: { label?: string }) {
  const [state, setState] = useState(() => nowInDhaka());
  useEffect(() => {
    const id = setInterval(() => setState(nowInDhaka()), 30_000);
    return () => clearInterval(id);
  }, []);
  const { date, isOpen } = state;
  return (
    <div
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]"
      style={{ color: "var(--text-muted)" }}
    >
      <span
        className="inline-flex items-center gap-1.5 px-1.5 py-0.5"
        style={{
          background: isOpen ? "rgba(10,127,63,0.08)" : "rgba(120,120,120,0.08)",
          border: `1px solid ${isOpen ? "rgba(10,127,63,0.25)" : "var(--line)"}`,
          color: isOpen ? "#0a7f3f" : "var(--text-secondary)",
          borderRadius: 2,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontSize: 10,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: isOpen ? "#0a7f3f" : "var(--text-muted)",
          }}
        />
        {isOpen ? "Market Open" : "Market Closed"}
      </span>
      <span>{label}</span>
      <span aria-hidden>·</span>
      <span className="tnum" style={{ fontFamily: "var(--font-mono)" }}>
        last updated {fmt(date)} BST
      </span>
    </div>
  );
}
