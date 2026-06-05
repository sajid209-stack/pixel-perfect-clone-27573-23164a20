import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/listing")({
  head: () => ({
    meta: [
      { title: "Listing Requirements | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Eligibility, paid-up capital, disclosure and governance requirements for listing on the Main and SME boards of the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "Listing Requirements | Dhaka Stock Exchange" },
      {
        property: "og:description",
        content: "Eligibility and process for listing on the Dhaka Stock Exchange.",
      },
    ],
  }),
  component: ListingPage,
});

const boards = [
  {
    name: "Main Board",
    minCapital: "৳ 30 Cr",
    minProfit: "Profitable for 2 of last 3 years",
    minShareholders: "1,000",
    track: "5 years",
  },
  {
    name: "SME Board",
    minCapital: "৳ 5 Cr",
    minProfit: "Profitable for 1 of last 2 years",
    minShareholders: "200 (qualified investors only)",
    track: "2 years",
  },
];

const requirements = [
  "Incorporation under the Companies Act 1994 as a public limited company.",
  "Audited financial statements prepared under IFRS by an ICAB panel auditor.",
  "Compliance with the BSEC Corporate Governance Code, including independent directors.",
  "Approved prospectus filed with BSEC and consented for public offer.",
  "Demat-eligible shares dematerialised through CDBL prior to listing.",
  "Lock-in on sponsor and pre-IPO placement shares as per BSEC notification.",
];

const steps = [
  { t: "Engage an issue manager", d: "Appoint a BSEC-licensed issue manager and complete due diligence." },
  { t: "File with BSEC", d: "Submit the draft prospectus, RJSC documents and financials to the BSEC for consent." },
  { t: "Roadshow & price discovery", d: "For book-building issues, hold the roadshow with eligible investors and determine the cutoff price." },
  { t: "Public subscription", d: "Open the subscription window through TREC-holding brokers via the centralised IPO portal." },
  { t: "Allotment & listing", d: "Complete the lottery (if oversubscribed), credit BO accounts and ring the bell on listing day." },
];

function ListingPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1100px] mx-auto px-6 pt-12 pb-10">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            Services · Listing
          </div>
          <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
            List on the Dhaka<br />Stock Exchange.
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Two boards, one disclosure regime. Raise growth capital, broaden ownership and bring
            your company under the BSEC's regulated marketplace.
          </p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-[24px] font-semibold tracking-tight mb-6">Choose a board</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {boards.map((b) => (
              <div
                key={b.name}
                className="rounded-2xl p-7"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.6)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <div className="text-[18px] font-semibold">{b.name}</div>
                <dl className="mt-5 space-y-3 text-[13px]">
                  <Row label="Minimum paid-up capital" value={b.minCapital} />
                  <Row label="Profitability" value={b.minProfit} />
                  <Row label="Public shareholders" value={b.minShareholders} />
                  <Row label="Operating track record" value={b.track} />
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-semibold tracking-tight mb-6">Eligibility & compliance</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {requirements.map((r) => (
              <li
                key={r}
                className="flex gap-3 p-4 rounded-xl text-[13.5px] leading-[1.65]"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.55)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                  color: "var(--text-secondary)",
                }}
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--green-up)" }} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[24px] font-semibold tracking-tight mb-6">Listing process</h2>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li
                key={s.t}
                className="flex gap-4 p-5 rounded-xl"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.55)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold tnum shrink-0"
                  style={{
                    background: "rgba(127,217,176,0.10)",
                    color: "var(--green-up)",
                    border: "1px solid rgba(127,217,176,0.25)",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold">{s.t}</div>
                  <div className="mt-1 text-[12.5px] leading-[1.65]" style={{ color: "var(--text-secondary)" }}>
                    {s.d}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="rounded-2xl p-7 flex flex-wrap items-center justify-between gap-4"
          style={{
            background: "rgba(127,217,176,0.06)",
            border: "1px solid rgba(127,217,176,0.20)",
          }}
        >
          <div>
            <div className="text-[16px] font-semibold">Ready to begin the conversation?</div>
            <div className="text-[13px] mt-1" style={{ color: "var(--text-secondary)" }}>
              Browse our member brokers and TREC-holding issue managers.
            </div>
          </div>
          <Link
            to="/members"
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-semibold"
            style={{ background: "var(--green-up)", color: "#07090A" }}
          >
            Member directory <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt style={{ color: "var(--text-muted)" }}>{label}</dt>
      <dd className="font-medium text-right" style={{ color: "var(--text-primary)" }}>
        {value}
      </dd>
    </div>
  );
}
