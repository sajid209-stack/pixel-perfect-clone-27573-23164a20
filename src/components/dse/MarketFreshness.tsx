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
  const { date } = state;
  return (
    <div
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]"
      style={{ color: "var(--text-muted)" }}
    >
      <span>{label}</span>
      <span aria-hidden>·</span>
      <span className="tnum" style={{ fontFamily: "var(--font-mono)" }}>
        last updated {fmt(date)} BST
      </span>
    </div>
  );
}
