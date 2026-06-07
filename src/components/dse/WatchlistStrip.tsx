import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useWatchlist } from "@/lib/userPrefs";
import { findCompany } from "@/data/companies";
import { useLang } from "@/i18n/LanguageContext";

export function WatchlistStrip() {
  const { items } = useWatchlist();
  const { t } = useLang();
  if (!items.length) return null;
  const rows = items.map((c) => findCompany(c)).filter((x): x is NonNullable<typeof x> => !!x);
  if (!rows.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-0 pt-3">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.06em", color: "var(--text-secondary)" }}
        >
          {t("My watchlist")}
        </div>
        <span className="text-[10px] tnum" style={{ color: "var(--text-muted)" }}>
          {rows.length}
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {rows.map((c) => {
          const up = c.changePct >= 0;
          return (
            <Link
              key={c.code}
              to="/company/$ticker"
              params={{ ticker: c.code }}
              className="shrink-0 flex items-center gap-2 px-3 h-9 rounded-full transition"
              style={{
                background: "rgb(var(--surface-rgb))",
                border: "1px solid rgb(var(--ov) / 0.08)",
              }}
            >
              <span className="text-[12px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {c.code}
              </span>
              <span className="text-[12px] tnum" style={{ color: "var(--text-secondary)" }}>
                ৳{c.price.toLocaleString(undefined, { minimumFractionDigits: c.price < 100 ? 2 : 1 })}
              </span>
              <span
                className="text-[10px] tnum font-medium px-1.5 py-0.5 rounded"
                style={{
                  color: up ? "var(--green-up)" : "var(--red-down)",
                  background: up ? "rgb(var(--brand-tint) / 0.10)" : "rgba(232,136,154,0.10)",
                }}
              >
                {up ? "▲" : "▼"} {Math.abs(c.changePct).toFixed(2)}%
              </span>
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
}
