import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Eye, ArrowLeftRight } from "lucide-react";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/listing")({
  head: () => ({
    meta: [
      { title: "List your company on the DSE | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Listing routes, regulations, process and contacts for companies considering an IPO, SME board or bond listing on the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "List your company on the DSE" },
      { property: "og:description", content: "Access Bangladesh's deepest pool of institutional and retail capital." },
    ],
  }),
  component: ListingPage,
});

const stats = [
  { label: "Listed companies", value: "356" },
  { label: "Capital raised in 2026", value: "৳ 1,820 Cr" },
  { label: "Avg IPO listing gain", value: "+11.7%" },
];

const whyCards = [
  {
    Icon: BarChart3,
    title: "Access to growth capital",
    body: "Raise equity capital from Bangladesh's 3.5 million retail investors and a growing institutional base — without taking on debt.",
  },
  {
    Icon: Eye,
    title: "Brand credibility",
    body: "Listed companies benefit from daily media coverage, mandatory disclosure discipline, and the credibility that comes with public accountability.",
  },
  {
    Icon: ArrowLeftRight,
    title: "Liquidity for shareholders",
    body: "Provide an exit path for founders, early investors and employee shareholders through a regulated, transparent secondary market.",
  },
];

const routes = [
  {
    name: "Main Board (IPO)",
    bullets: [
      "Minimum paid-up capital: ৳ 30 Cr (post-issue)",
      "Minimum public offering: 10% of post-issue capital",
      "Minimum 3 years of audited accounts required",
      "BSEC approval required",
      "Price discovery: Fixed price or book building",
    ],
  },
  {
    name: "SME Board",
    bullets: [
      "For smaller companies with paid-up capital ৳ 5–30 Cr",
      "Minimum 2 years audited accounts",
      "Simplified disclosure requirements",
      "Only institutional and sophisticated investors in primary offering",
    ],
  },
  {
    name: "Bonds & Debentures",
    bullets: [
      "For debt instruments — corporate bonds, sukuk, green bonds",
      "Minimum issue size: ৳ 50 Cr",
      "Credit rating required from an approved rating agency",
      "Zero-coupon and convertible structures permitted",
    ],
  },
];

const steps = [
  {
    t: "Appoint an issue manager",
    d: "A BSEC-registered issue manager (merchant bank) advises on structure, prepares the prospectus, and manages the BSEC application.",
  },
  {
    t: "Prepare the prospectus",
    d: "Audited financials (3 years), material contracts, risk factors, use of proceeds, and management profiles. Typically takes 3–6 months.",
  },
  {
    t: "Submit to BSEC",
    d: "The issue manager files the draft prospectus with BSEC for review. BSEC may request revisions.",
  },
  { t: "Receive BSEC consent", d: "On average 60–90 days after initial filing." },
  {
    t: "Open subscription",
    d: "Public subscription window (typically 5 working days for fixed price, longer for book building).",
  },
  {
    t: "Allotment and listing",
    d: "Shares allotted within 7 working days of closing. Trading begins on DSE and CSE simultaneously on listing day.",
  },
];

const docs = [
  { name: "DSE Listing Regulations 2015 (amended 2022)", fmt: "PDF", size: "2.1 MB" },
  { name: "SME Board Listing Rules", fmt: "PDF", size: "0.8 MB" },
  { name: "Bond & Sukuk Listing Guidelines", fmt: "PDF", size: "1.2 MB" },
];

function ListingPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      {/* Header */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Listing</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            List your company<br />on the DSE
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Access Bangladesh's deepest pool of institutional and retail capital.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {stats.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px]"
                style={{
                  background: "rgb(var(--ov) / 0.04)",
                  border: "1px solid rgb(var(--ov) / 0.08)",
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>{s.label}:</span>
                <span className="font-semibold tnum" style={{ color: "var(--text-primary)" }}>{s.value}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 py-12 space-y-14">
        {/* Why list */}
        <section>
          <h2 className="text-[24px] font-semibold tracking-tight mb-6">Why list</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {whyCards.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl p-6"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.6)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--green-up)" }}
                >
                  <c.Icon className="w-5 h-5" />
                </div>
                <div className="text-[16px] font-semibold">{c.title}</div>
                <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Routes */}
        <section>
          <h2 className="text-[24px] font-semibold tracking-tight mb-6">Three routes to listing</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {routes.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.6)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <div className="text-[16px] font-semibold mb-4">{r.name}</div>
                <ul className="space-y-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span style={{ color: "var(--green-up)" }} className="shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-[24px] font-semibold tracking-tight mb-6">From decision to listing day</h2>
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
                    background: "rgb(var(--brand-tint) / 0.10)",
                    color: "var(--green-up)",
                    border: "1px solid rgb(var(--brand-tint) / 0.25)",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold">{s.t}</div>
                  <div className="mt-1 text-[12.5px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                    {s.d}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Docs + Contact */}
        <section>
          <h2 className="text-[24px] font-semibold tracking-tight mb-6">Get started</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgb(var(--surface-rgb) / 0.6)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              <div className="text-[16px] font-semibold">Listing regulations</div>
              <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                Download the full DSE listing regulations, SME board rules, and bond listing
                requirements.
              </p>
              <ul className="mt-5 space-y-2">
                {docs.map((d) => (
                  <li key={d.name}>
                    <a
                      href="#"
                      className="flex items-center justify-between gap-3 p-3 rounded-lg text-[13px] transition"
                      style={{
                        background: "rgb(var(--ov) / 0.04)",
                        border: "1px solid rgb(var(--ov) / 0.06)",
                      }}
                    >
                      <span>{d.name}</span>
                      <span className="text-[11px] tnum shrink-0" style={{ color: "var(--text-muted)" }}>
                        {d.fmt} · {d.size}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgb(var(--surface-rgb) / 0.6)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              <div className="text-[16px] font-semibold">Contact the listing division</div>
              <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                Our listing team is available to discuss eligibility and guide your issue manager
                through the process.
              </p>
              <ul className="mt-5 space-y-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                <li>
                  <a href="mailto:listing@dsebd.org" style={{ color: "var(--green-up)" }}>
                    listing@dsebd.org
                  </a>
                </li>
                <li>+880 2 5566 9100 ext. 201</li>
                <li>DSE Tower, Plot 46, Road 21, Nikunja-2, Dhaka-1229</li>
                <li>Office hours: Sun–Thu, 10:00 AM – 5:00 PM</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
