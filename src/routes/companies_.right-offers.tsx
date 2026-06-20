import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/companies_/right-offers")({
  head: () => ({
    meta: [
      { title: "Rights Offer Documents | DSE" },
      { name: "description", content: "Approved Rights Offer Documents (ROD) from DSE-listed companies." },
      { property: "og:title", content: "Rights Offer Documents — DSE" },
      { property: "og:description", content: "Approved Rights Offer Documents (ROD)." },
    ],
  }),
  component: RightOffersPage,
});

const ROWS = Array.from({ length: 6 }).map(() => ({ company: "—", date: "—" }));

function RightOffersPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Companies
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Rights Offer Documents
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Approved Rights Offer Documents (ROD).
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <ul className="divide-y rounded-md overflow-hidden" style={{ border: "1px solid var(--line)", background: "var(--surface)" }} data-cms="companies.right-offers">
          {ROWS.map((r, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-3" style={{ borderColor: "var(--line)" }}>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: "var(--ink)" }}>{r.company}</div>
                <div className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>Approved: {r.date}</div>
              </div>
              <div className="flex gap-2">
                <a href="#" className="px-3 h-8 inline-flex items-center text-[12px] rounded-md" style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>Abridged Version</a>
                <a href="#" className="px-3 h-8 inline-flex items-center text-[12px] rounded-md text-white" style={{ background: "var(--brand-600)" }}>Full Version</a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Placeholder entries. Documents will be wired to the DSE feed.
        </p>
      </section>
      <Footer />
    </div>
  );
}
