import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/investor-protection")({
  head: () => ({
    meta: [
      { title: "Investors' Protection Fund | DSE" },
      { name: "description", content: "DSE maintains an Investors' Protection Fund as per the Investors' Protection Fund Regulations." },
      { property: "og:title", content: "Investors' Protection Fund — DSE" },
      { property: "og:description", content: "DSE maintains an Investors' Protection Fund as per the Investors' Protection Fund Regulations." },
    ],
  }),
  component: InvestorProtectionPage,
});

const DOCS = [
  "Investors' Protection Fund Regulations-2014",
  "Investors' Protection Fund Regulations-1999",
];

function InvestorProtectionPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Investor Services
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Investors' Protection Fund
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            DSE maintains an Investors' Protection Fund as per the Investors' Protection Fund Regulations.
          </p>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <ul className="space-y-3" data-cms="investor-protection.docs">
          {DOCS.map((d) => (
            <li key={d}>
              <a
                href="#"
                className="flex items-center justify-between rounded-md p-4"
                style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
              >
                <span className="text-[14px] font-medium" style={{ color: "var(--ink)" }}>{d}</span>
                <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--brand-600)" }}>PDF →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}
