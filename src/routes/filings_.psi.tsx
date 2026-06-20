import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/filings_/psi")({
  head: () => ({
    meta: [
      { title: "PSI and Material Information | DSE" },
      { name: "description", content: "Price-sensitive and material information disclosures from listed companies." },
      { property: "og:title", content: "PSI and Material Information — DSE" },
      { property: "og:description", content: "Price-sensitive and material information disclosures from listed companies." },
    ],
  }),
  component: PsiPage,
});

function PsiPage() {
  const [q, setQ] = useState("");
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Disclosures & Filings
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            PSI and Material Information
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Price-sensitive and material information disclosures from listed companies.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center justify-between gap-3 mb-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by company or notice…"
            className="h-9 px-3 rounded-md text-[13px] outline-none w-full max-w-[320px]"
            style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
          />
          <span className="text-[11.5px] italic" style={{ color: "var(--text-secondary)" }}>
            Awaiting DSE feed
          </span>
        </div>

        <div
          className="rounded-md overflow-hidden"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
          data-cms="filings.psi"
        >
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ background: "var(--bg)" }}>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Company</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Date</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Notice title</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>—</td>
                  <td className="px-3 py-2 tnum" style={{ color: "var(--ink)" }}>—</td>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Reverse-chronological. Live notices will be wired to the DSE feed.
        </p>
      </section>
      <Footer />
    </div>
  );
}
