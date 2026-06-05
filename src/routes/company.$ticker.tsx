import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { companyIndex } from "@/components/dse/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/company/$ticker")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.ticker} — Company profile | DSE` },
      { name: "description", content: `Live price, financials, and disclosures for ${params.ticker} on the Dhaka Stock Exchange.` },
    ],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  const { ticker } = Route.useParams();
  const co = companyIndex.find((c) => c.code === ticker.toUpperCase());

  return (
    <div className="min-h-screen">
      <TopBar />
      <Nav />
      <main className="max-w-[1440px] mx-auto px-6 pt-12 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to market
        </Link>

        <div className="flex items-baseline gap-4">
          <h1
            className="text-[48px] font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {ticker.toUpperCase()}
          </h1>
          {co && (
            <span className="text-[18px]" style={{ color: "var(--text-secondary)" }}>
              {co.name}
            </span>
          )}
        </div>

        {co ? (
          <div className="mt-4 flex items-baseline gap-4 tnum">
            <span className="text-[36px] font-semibold" style={{ color: "var(--text-primary)" }}>
              ৳ {co.price.toLocaleString()}
            </span>
            <span className="text-[13px] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(127,217,176,0.10)", color: "var(--green-up)" }}>
              {co.sector}
            </span>
          </div>
        ) : (
          <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
            Company profile coming soon.
          </p>
        )}

        <div className="mt-16 p-10 rounded-2xl text-center"
          style={{ background: "rgb(var(--ov) / 0.03)", border: "1px solid rgb(var(--ov) / 0.06)" }}>
          <div className="text-[13px] uppercase tracking-[0.22em] mb-3"
            style={{ color: "var(--text-muted)" }}>
            Phase 2 · Part 2
          </div>
          <p className="text-[18px] max-w-[52ch] mx-auto" style={{ color: "var(--text-secondary)" }}>
            The full Bloomberg-style company profile (price chart, key stats, financial snapshot,
            shareholders, announcements) will land here next.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
