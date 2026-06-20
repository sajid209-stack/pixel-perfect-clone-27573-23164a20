import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/companies_/direct-listing")({
  head: () => ({
    meta: [
      { title: "Direct Listing | DSE" },
      { name: "description", content: "Companies listed by direct listing on the Dhaka Stock Exchange." },
      { property: "og:title", content: "Direct Listing — DSE" },
      { property: "og:description", content: "Companies listed by direct listing." },
    ],
  }),
  component: DirectListingPage,
});

const SECTIONS = [
  { title: "Companies applied for Direct Listing", cms: "companies.direct-listing.applied" },
  { title: "Companies offloading Shares", cms: "companies.direct-listing.offloading" },
  { title: "Direct Listing Archive", cms: "companies.direct-listing.archive" },
];

function Table({ cms }: { cms: string }) {
  return (
    <div className="rounded-md overflow-hidden" style={{ border: "1px solid var(--line)", background: "var(--surface)" }} data-cms={cms}>
      <table className="w-full text-[13px]">
        <thead>
          <tr style={{ background: "var(--bg)" }}>
            <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Trading Code</th>
            <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Company</th>
            <th className="px-3 py-2 text-left" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Sector</th>
            <th className="px-3 py-2 text-right" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
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
  );
}

function DirectListingPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Companies
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Direct Listing
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Companies listed by direct listing.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="text-[18px] font-semibold mb-3" style={{ color: "var(--ink)" }}>{s.title}</h2>
            <Table cms={s.cms} />
          </div>
        ))}
        <p className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
          Placeholder rows. Live data will be wired to the DSE feed.
        </p>
      </section>
      <Footer />
    </div>
  );
}
