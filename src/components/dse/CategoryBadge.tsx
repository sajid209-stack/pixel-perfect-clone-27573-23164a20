import type { ShareCategory } from "@/data/companies";

type BadgeCategory = ShareCategory | "G";

const STYLES: Record<BadgeCategory, { bg: string; color: string; border: string; title: string }> = {
  A: { bg: "rgb(var(--ov) / 0.05)",    color: "var(--text-secondary)", border: "rgb(var(--ov) / 0.12)", title: "A — pays ≥10% dividend, AGM regular" },
  B: { bg: "rgb(var(--ov) / 0.05)",    color: "var(--text-secondary)", border: "rgb(var(--ov) / 0.12)", title: "B — dividend less than 10% in past year" },
  G: { bg: "rgba(34,160,90,0.10)",     color: "#16a34a",               border: "rgba(34,160,90,0.45)", title: "G — green-field company, pre-commercial operation" },
  N: { bg: "rgb(var(--ov) / 0.05)",    color: "var(--text-secondary)", border: "rgb(var(--ov) / 0.12)", title: "N — newly listed" },
  Z: { bg: "rgba(217,65,94,0.10)",     color: "var(--red-down)",       border: "rgba(217,65,94,0.45)", title: "Z — no dividend or AGM, regulator caution" },
};

export function CategoryBadge({
  category,
  size = "sm",
}: { category: BadgeCategory; size?: "xs" | "sm" }) {
  const s = STYLES[category];
  if (!s) return null;
  const px = size === "xs" ? "px-[5px]" : "px-1.5";
  const py = size === "xs" ? "py-0" : "py-0.5";
  const text = size === "xs" ? "text-[9px]" : "text-[10px]";
  return (
    <span
      title={s.title}
      className={`inline-flex items-center justify-center ${px} ${py} ${text} rounded font-bold uppercase tracking-wider tnum`}
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        lineHeight: 1.4,
        minWidth: 18,
      }}
    >
      {category}
    </span>
  );
}
