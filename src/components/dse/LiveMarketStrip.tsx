const cells = [
  { label: "DSEX", value: "6,241.30", delta: "+0.30%", up: true },
  { label: "DS30", value: "2,118.40", delta: "+0.18%", up: true },
  { label: "DSES", value: "1,340.20", delta: "−0.05%", up: false },
  { label: "Turnover", value: "৳1,124 Cr", sub: "312.4M shares" },
  { label: "Breadth", value: "188 / 142", sub: "adv / dec" },
] as const;

export function LiveMarketStrip() {
  return (
    <section
      className="w-full"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-5">
          {cells.map((c, i) => (
            <div
              key={c.label}
              className="px-4 py-4"
              style={{
                borderLeft: i > 0 ? "1px solid var(--line)" : "none",
              }}
            >
              <div
                className="text-[10px] font-semibold uppercase"
                style={{ letterSpacing: "0.12em", color: "var(--text-muted)" }}
              >
                {c.label}
              </div>
              <div
                className="mt-1.5 tnum text-[18px] font-semibold leading-none"
                style={{ color: "var(--ink)" }}
              >
                {c.value}
              </div>
              {"delta" in c ? (
                <div
                  className="mt-1.5 tnum text-[12px] font-semibold"
                  style={{ color: c.up ? "var(--green-up)" : "var(--red-down)" }}
                >
                  {c.up ? "▲" : "▼"} {c.delta.replace(/^[−+]/, "")}
                </div>
              ) : (
                <div
                  className="mt-1.5 text-[11px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {c.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
