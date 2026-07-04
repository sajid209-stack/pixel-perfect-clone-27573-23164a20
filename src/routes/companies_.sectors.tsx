import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/companies_/sectors")({
  head: () => ({
    meta: [
      { title: "Sector wise Company List | Dhaka Stock Exchange" },
      { name: "description", content: "Count of DSE-listed instruments grouped by industry sector." },
      { property: "og:title", content: "Sector wise Company List — DSE" },
      { property: "og:description", content: "DSE-listed instruments grouped by industry sector with per-sector counts." },
      { property: "og:url", content: "https://pixel-perfect-clone-27573.lovable.app/companies/sectors" },
    ],
    links: [{ rel: "canonical", href: "https://pixel-perfect-clone-27573.lovable.app/companies/sectors" }],
  }),
  component: SectorsPage,
});

// SAMPLE — replace Quantity at wiring
const SECTORS: { name: string; slug: string; quantity: number }[] = [
  { name: "Bank", slug: "bank", quantity: 36 },
  { name: "Financial Institutions", slug: "financial-institutions", quantity: 23 },
  { name: "Insurance", slug: "insurance", quantity: 57 },
  { name: "Mutual Funds", slug: "mutual-funds", quantity: 36 },
  { name: "Food & Allied", slug: "food-allied", quantity: 20 },
  { name: "Pharmaceuticals & Chemicals", slug: "pharmaceuticals-chemicals", quantity: 33 },
  { name: "Textile", slug: "textile", quantity: 58 },
  { name: "Engineering", slug: "engineering", quantity: 42 },
  { name: "Ceramics Sector", slug: "ceramics", quantity: 5 },
  { name: "Tannery Industries", slug: "tannery", quantity: 6 },
  { name: "Paper & Printing", slug: "paper-printing", quantity: 4 },
  { name: "Jute", slug: "jute", quantity: 3 },
  { name: "Cement", slug: "cement", quantity: 7 },
  { name: "Fuel & Power", slug: "fuel-power", quantity: 24 },
  { name: "Services & Real Estate", slug: "services-real-estate", quantity: 6 },
  { name: "IT Sector", slug: "it", quantity: 12 },
  { name: "Telecommunication", slug: "telecommunication", quantity: 3 },
  { name: "Travel & Leisure", slug: "travel-leisure", quantity: 5 },
  { name: "Miscellaneous", slug: "miscellaneous", quantity: 15 },
  { name: "Bond", slug: "bond", quantity: 221 },
  { name: "Corporate Bond", slug: "corporate-bond", quantity: 8 },
  { name: "Debenture", slug: "debenture", quantity: 8 },
  { name: "Treasury Bond", slug: "treasury-bond", quantity: 8 },
];

function SectorsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-8">
          <div className="text-[11px] font-semibold uppercase mb-2" style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}>
            Dhaka Stock Exchange
          </div>
          <h1 className="text-[26px] md:text-[32px] font-semibold tracking-tight leading-[1.1]" style={{ color: "var(--ink)" }}>
            Sector wise Company List
          </h1>
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="overflow-x-auto" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
          <table className="w-full text-[13.5px]" style={{ minWidth: 640 }}>
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                {["#", "Name of the Industry", "Quantity", "Detail"].map((h, i) => (
                  <th key={h}
                    className={`px-4 py-2 text-[11px] font-semibold uppercase ${i === 0 || i === 2 ? "text-right" : i === 3 ? "text-center" : "text-left"}`}
                    style={{ letterSpacing: "0.1em", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECTORS.map((s, i) => (
                <tr key={s.slug} style={{ borderTop: "1px solid var(--line)", background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent" }}>
                  <td className="px-4 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{i + 1}</td>
                  <td className="px-4 py-2">
                    <Link
                      to="/companies"
                      search={{ sector: s.slug }}
                      className="font-semibold hover:underline"
                      style={{ color: "var(--brand-600)" }}
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{s.quantity}</td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      to="/markets/latest-share-price"
                      search={{ sector: s.slug }}
                      className="text-[12.5px] hover:underline"
                      style={{ color: "var(--brand-600)" }}
                    >
                      More info
                    </Link>
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}>
                <td className="px-4 py-3" />
                <td className="px-4 py-3 font-bold" style={{ color: "var(--ink)" }} colSpan={3}>
                  Total Companies: 640
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
}
