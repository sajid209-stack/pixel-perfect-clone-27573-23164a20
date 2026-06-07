import { Star } from "lucide-react";
import { useWatchlist } from "@/lib/userPrefs";

export function StarButton({
  code,
  size = 14,
  className = "",
}: {
  code: string;
  size?: number;
  className?: string;
}) {
  const { has, toggle } = useWatchlist();
  const active = has(code);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(code);
      }}
      aria-label={active ? `Remove ${code} from watchlist` : `Add ${code} to watchlist`}
      title={active ? "Remove from watchlist" : "Add to watchlist"}
      className={`inline-flex items-center justify-center rounded-full transition hover:scale-110 ${className}`}
      style={{
        width: size + 10,
        height: size + 10,
        color: active ? "#f5b300" : "var(--text-muted)",
      }}
    >
      <Star
        style={{ width: size, height: size }}
        fill={active ? "#f5b300" : "none"}
        strokeWidth={active ? 2 : 1.6}
      />
    </button>
  );
}
