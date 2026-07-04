import type { CSSProperties } from "react";

export type SegmentedOption<T extends string> = { key: T; label: string };

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
  style,
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-full ${className ?? ""}`}
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--line)",
        ...style,
      }}
    >
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.key)}
            className="px-4 h-8 rounded-full text-[12.5px] font-medium transition whitespace-nowrap"
            style={{
              background: active ? "var(--primary)" : "transparent",
              color: active ? "var(--primary-foreground)" : "var(--text-secondary)",
              border: "1px solid transparent",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
