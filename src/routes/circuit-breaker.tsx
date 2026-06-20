import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/circuit-breaker")({
  head: () => ({
    meta: [
      { title: "Circuit Breaker | Dhaka Stock Exchange" },
      { name: "description", content: "Daily circuit breaker limits per instrument, as set by DSE." },
      { property: "og:title", content: "Circuit Breaker — DSE" },
      { property: "og:description", content: "Daily circuit breaker limits per instrument, as set by DSE." },
    ],
  }),
  component: CircuitBreakerPage,
});

type Row = {
  code: string;
  company: string;
  close: string;
  lower: string;
  upper: string;
};

// Placeholder shell — wired later to DSE feed. No invented numeric values.
const PLACEHOLDER_ROWS: Row[] = Array.from({ length: 8 }).map(() => ({
  code: "—",
  company: "—",
  close: "—",
  lower: "—",
  upper: "—",
}));

type SortKey = keyof Row;

function CircuitBreakerPage() {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("code");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const rows = useMemo(() => {
    const filtered = PLACEHOLDER_ROWS.filter(
      (r) =>
        !q.trim() ||
        r.code.toLowerCase().includes(q.toLowerCase()) ||
        r.company.toLowerCase().includes(q.toLowerCase()),
    );
    const sorted = [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return sorted;
  }, [q, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (k === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  }

  const headers: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "code", label: "Trading Code" },
    { key: "company", label: "Company" },
    { key: "close", label: "Close Price", align: "right" },
    { key: "lower", label: "Lower Limit", align: "right" },
    { key: "upper", label: "Upper Limit", align: "right" },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Markets
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Circuit Breaker
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Daily circuit breaker limits per instrument, as set by DSE.
          </p>
          <div className="mt-2 text-[11px]" style={{ color: "var(--text-secondary)" }}>
            Sample data for demonstration — live data will connect to the DSE API
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center justify-between gap-3 mb-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by code or company…"
            className="h-9 px-3 rounded-md text-[13px] outline-none w-full max-w-[320px]"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
          />
          <span className="text-[11.5px] italic" style={{ color: "var(--text-secondary)" }}>
            Awaiting DSE feed
          </span>
        </div>

        <div className="rounded-md overflow-hidden" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
          <div className="overflow-auto">
            <table className="w-full text-[13px]" data-cms="markets.circuit-breaker">
              <thead>
                <tr style={{ background: "var(--bg)" }}>
                  {headers.map((h) => (
                    <th
                      key={h.key}
                      onClick={() => toggleSort(h.key)}
                      className={`px-3 py-2 cursor-pointer select-none whitespace-nowrap ${
                        h.align === "right" ? "text-right" : "text-left"
                      }`}
                      style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}
                    >
                      {h.label}
                      {sortKey === h.key && (
                        <span className="ml-1">{sortDir === "asc" ? "▲" : "▼"}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.code}</td>
                    <td className="px-3 py-2" style={{ color: "var(--ink)" }}>{r.company}</td>
                    <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{r.close}</td>
                    <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{r.lower}</td>
                    <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>{r.upper}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Placeholder rows shown. Live limits will be wired to the official DSE feed.
        </p>
      </section>
      <Footer />
    </div>
  );
}
