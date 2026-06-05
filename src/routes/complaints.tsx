import { createFileRoute, Link } from "@tanstack/react-router";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints Portal | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "File and track investor complaints against TREC-holders, listed issuers and intermediaries on the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "Complaints Portal | Dhaka Stock Exchange" },
      { property: "og:description", content: "Investor complaints portal." },
    ],
  }),
  component: ComplaintsPage,
});

function ComplaintsPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[900px] mx-auto px-6 pt-12 pb-10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            <span>Services · Complaints</span>
            <span
              className="px-1.5 py-0.5 rounded-full normal-case tracking-normal text-[10px]"
              style={{ background: "rgb(var(--ov) / 0.06)", color: "var(--text-muted)" }}
            >
              coming soon
            </span>
          </div>
          <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
            Investor complaints portal.
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            A unified portal to file and track complaints against TREC-holders, listed issuers and
            other intermediaries is being prepared with the BSEC. Until it launches, please use the
            channels below.
          </p>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto px-6 py-12 grid md:grid-cols-2 gap-5">
        <ContactCard
          title="Investor Grievance Cell — DSE"
          lines={[
            "investor@dsebd.org",
            "+880 2 5566 9100 (ext. 415)",
            "DSE Tower, Nikunja-2, Dhaka-1229",
          ]}
        />
        <ContactCard
          title="BSEC Complaint Cell"
          lines={[
            "complaint@sec.gov.bd",
            "+880 2 4811 8011",
            "Securities Commission Bhaban, Agargaon, Dhaka",
          ]}
        />
      </main>

      <section className="max-w-[900px] mx-auto px-6 pb-16">
        <div
          className="rounded-2xl p-7"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <h2 className="text-[20px] font-semibold tracking-tight mb-3">Before you file</h2>
          <ol className="space-y-2 text-[13.5px] list-decimal pl-5" style={{ color: "var(--text-secondary)" }}>
            <li>Raise the issue with your broker's compliance officer first; most matters resolve within 7 working days.</li>
            <li>Keep your BO account number, contract notes and any correspondence ready.</li>
            <li>Be specific about the date, instrument and amount in dispute.</li>
          </ol>
          <div className="mt-6 text-[12px]" style={{ color: "var(--text-muted)" }}>
            Need a member's contact?{" "}
            <Link to="/members" className="underline" style={{ color: "var(--green-up)" }}>
              Browse the broker directory
            </Link>
            .
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ContactCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgb(var(--surface-rgb) / 0.6)",
        border: "1px solid rgb(var(--ov) / 0.06)",
      }}
    >
      <div className="text-[15px] font-semibold mb-3">{title}</div>
      <ul className="space-y-1.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}
