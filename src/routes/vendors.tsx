import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/vendors")({
  head: () => ({
    meta: [
      { title: "Panel of Back-Office Software Vendors | DSE" },
      { name: "description", content: "DSE-empanelled back-office software vendors." },
      { property: "og:title", content: "Panel of Back-Office Software Vendors — DSE" },
      { property: "og:description", content: "DSE-empanelled back-office software vendors." },
    ],
  }),
  component: VendorsPage,
});

const VENDORS = [
  "United Corporate Advisory Services Limited",
  "Orange Solutions Ltd.",
  "Cygnus Innovation Ltd.",
  "LeadSoft Bangladesh Limited",
  "LankaBangla Information System Limited",
  "DataSoft Systems Bangladesh Limited",
  "AdaSoft International Limited",
];

function VendorsPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Investor Services
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Panel of Back-Office Software Vendors
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            DSE-empanelled back-office software vendors.
          </p>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <ol className="grid sm:grid-cols-2 gap-3" data-cms="vendors.list">
          {VENDORS.map((name, i) => (
            <li
              key={name}
              className="flex items-start gap-3 rounded-md p-4"
              style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
            >
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-semibold shrink-0"
                style={{ background: "var(--bg)", color: "var(--brand-600)", border: "1px solid var(--line)" }}
              >
                {i + 1}
              </span>
              <span className="text-[14px] font-medium" style={{ color: "var(--ink)" }}>{name}</span>
            </li>
          ))}
        </ol>
      </section>
      <Footer />
    </div>
  );
}
