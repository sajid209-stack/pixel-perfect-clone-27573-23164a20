import { createFileRoute, Link } from "@tanstack/react-router";
import { Landmark, Building2 } from "lucide-react";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Investor complaints | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "How to file an investor complaint against a DSE trading member or a listed company.",
      },
      { property: "og:title", content: "Investor complaints | DSE" },
      { property: "og:description", content: "Investor protection process at the Dhaka Stock Exchange." },
    ],
  }),
  component: ComplaintsPage,
});

function ComplaintsPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      {/* Header */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1000px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Investor complaints</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            Investor complaints
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            DSE takes investor protection seriously. If you have a complaint against a broker or
            listed company, follow the process below.
          </p>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-6 py-12 space-y-8">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Card 1 */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgba(127,217,176,0.10)", color: "var(--green-up)" }}
            >
              <Landmark className="w-5 h-5" />
            </div>
            <div className="text-[16px] font-semibold">Complaint against a trading member</div>
            <ol className="mt-4 space-y-3 text-[13px] leading-[1.7] list-decimal pl-5" style={{ color: "var(--text-secondary)" }}>
              <li>First raise the issue directly with the brokerage's compliance officer.</li>
              <li>
                If unresolved within 15 working days, file with DSE Investor Services:{" "}
                <a href="mailto:investorservices@dsebd.org" style={{ color: "var(--green-up)" }}>
                  investorservices@dsebd.org
                </a>
              </li>
              <li>DSE will acknowledge within 3 working days and initiate mediation.</li>
              <li>If mediation fails, the matter may be referred to BSEC arbitration.</li>
            </ol>
          </div>

          {/* Card 2 */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgba(127,217,176,0.10)", color: "var(--green-up)" }}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-[16px] font-semibold">Complaint against a listed company</div>
            <p className="mt-4 text-[13px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
              Complaints regarding non-disclosure, dividend non-payment, or corporate governance
              breaches should be filed directly with the Bangladesh Securities and Exchange
              Commission (BSEC).
            </p>
            <a
              href="https://www.sec.gov.bd"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 text-[13px]"
              style={{ color: "var(--green-up)" }}
            >
              File with BSEC →
            </a>
          </div>
        </div>

        {/* Contact box */}
        <div
          className="rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3 text-[13px]"
          style={{
            background: "rgba(127,217,176,0.06)",
            border: "1px solid rgba(127,217,176,0.20)",
          }}
        >
          <div>
            <a href="mailto:investorservices@dsebd.org" style={{ color: "var(--green-up)" }}>
              investorservices@dsebd.org
            </a>
            <span className="mx-2" style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ color: "var(--text-secondary)" }}>+880 2 5566 9100 ext. 120</span>
          </div>
        </div>

        <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
          DSE Investor Services is available Sunday to Thursday, 10:00 AM – 4:00 PM.
        </div>
      </main>

      <Footer />
    </div>
  );
}
