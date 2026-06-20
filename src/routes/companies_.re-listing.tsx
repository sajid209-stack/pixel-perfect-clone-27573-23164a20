import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/companies_/re-listing")({
  head: () => ({
    meta: [
      { title: "Re-listing | DSE" },
      { name: "description", content: "Companies re-listed on the Dhaka Stock Exchange." },
      { property: "og:title", content: "Re-listing — DSE" },
      { property: "og:description", content: "Companies re-listed on the Exchange." },
    ],
  }),
  component: ReListingPage,
});

function ReListingPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Companies
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Re-listing
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Companies re-listed on the Exchange.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="rounded-md overflow-hidden" style={{ border: "1px solid var(--line)", background: "var(--surface)" }} data-cms="companies.re-listing">
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ background: "var(--bg)" }}>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Trading Code</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Company</th>
                <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Sector</th>
                <th className="px-3 py-2 text-right" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Re-listing Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>—</td>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>—</td>
                  <td className="px-3 py-2" style={{ color: "var(--ink)" }}>—</td>
                  <td className="px-3 py-2 text-right tnum" style={{ color: "var(--ink)" }}>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Placeholder rows. Live data will be wired to the DSE feed.
        </p>
      </section>
      <Footer />
    </div>
  );
}
