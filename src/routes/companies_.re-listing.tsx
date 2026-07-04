import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/companies_/re-listing")({
  head: () => ({
    meta: [
      { title: "Re-listing | DSE" },
      { name: "description", content: "Re-listing documents from the Dhaka Stock Exchange." },
      { property: "og:title", content: "Re-listing — DSE" },
      { property: "og:description", content: "Re-listing documents from the Dhaka Stock Exchange." },
    ],
  }),
  component: ReListingPage,
});

// Ready to hold document entries once wired via CMS. Same structure as Right Offer Documents.
// SAMPLE — replace with real document registry
const DOCUMENTS: { title: string; href: string }[] = [];

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
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div
          style={{ border: "1px solid var(--line)", background: "var(--surface)", borderRadius: 2 }}
          data-cms="companies.re-listing"
        >
          {DOCUMENTS.length === 0 ? (
            <div
              className="px-4 py-10 text-center text-[13px]"
              style={{ color: "var(--text-secondary)" }}
            >
              No re-listing documents are currently available.
            </div>
          ) : (
            <ul>
              {DOCUMENTS.map((d, i) => (
                <li
                  key={i}
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
                >
                  <a
                    href={d.href}
                    className="block px-4 py-3 text-[13px] hover:underline"
                    style={{ color: "var(--ink)" }}
                  >
                    {d.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
