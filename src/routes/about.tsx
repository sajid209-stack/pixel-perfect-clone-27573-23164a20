import { createFileRoute, Link } from "@tanstack/react-router";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "About the Dhaka Stock Exchange — board of directors, press releases, careers, sustainability, BICM and the Data API.",
      },
      { property: "og:title", content: "About | Dhaka Stock Exchange" },
      { property: "og:description", content: "About the Dhaka Stock Exchange." },
    ],
  }),
  component: AboutPage,
});

type Section = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  soon?: boolean;
};

const sections: Section[] = [
  {
    id: "overview",
    kicker: "About us",
    title: "Bangladesh's premier capital market",
    body: "Established in 1954, the Dhaka Stock Exchange is the principal stock exchange of Bangladesh. We provide a transparent, regulated marketplace where companies raise capital and investors trade equities, bonds and mutual funds.",
  },
  {
    id: "board",
    kicker: "Board of directors",
    title: "Governance & leadership",
    body: "The DSE Board is composed of independent directors, shareholder representatives and the Managing Director. The board oversees strategy, risk and regulatory compliance under the supervision of the Bangladesh Securities and Exchange Commission.",
  },
  {
    id: "press",
    kicker: "Press releases",
    title: "Latest from the exchange",
    body: "Official press releases on market milestones, listings, system upgrades and regulatory matters. Media enquiries: press@dsebd.org.",
  },
  {
    id: "careers",
    kicker: "Careers",
    title: "Join the team",
    body: "Open roles across technology, market operations, listings and surveillance will be published here. Detailed listings are coming soon.",
    soon: true,
  },
  {
    id: "sustainability",
    kicker: "Sustainability",
    title: "ESG at the DSE",
    body: "Our sustainability framework — covering ESG disclosures, green bonds and the Sustainability-Linked Listing programme — is being finalised and will be published here.",
    soon: true,
  },
  {
    id: "bicm",
    kicker: "BICM",
    title: "Bangladesh Institute of Capital Market",
    body: "BICM offers professional certification, executive education and research for capital market participants. Programmes include the Certified Capital Market Professional (CCMP) qualification.",
  },
  {
    id: "api",
    kicker: "Data API",
    title: "Market data for developers",
    body: "A REST and WebSocket Data API for real-time quotes, end-of-day files and corporate actions is in private beta. Public access will open here.",
    soon: true,
  },
];

function AboutPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1100px] mx-auto px-6 pt-12 pb-10">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            About DSE
          </div>
          <h1 className="text-[44px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.04]">
            The exchange,<br />and the institution behind it.
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Seven decades of capital formation in Bangladesh. Read about the people, the governance
            and the programmes that keep the market running.
          </p>

          <nav className="mt-8 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 h-8 inline-flex items-center rounded-full text-[12px]"
                style={{
                  background: "rgb(var(--ov) / 0.04)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                  color: "var(--text-secondary)",
                }}
              >
                {s.kicker}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 py-12 space-y-12">
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="scroll-mt-32 rounded-2xl p-8"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--text-muted)" }}>
              <span>{s.kicker}</span>
              {s.soon && (
                <span
                  className="px-1.5 py-0.5 rounded-full normal-case tracking-normal text-[10px]"
                  style={{ background: "rgb(var(--ov) / 0.06)", color: "var(--text-muted)" }}
                >
                  coming soon
                </span>
              )}
            </div>
            <h2 className="text-[26px] font-semibold tracking-tight leading-[1.15]">{s.title}</h2>
            <p className="mt-3 text-[14.5px] leading-[1.75] max-w-[70ch]" style={{ color: "var(--text-secondary)" }}>
              {s.body}
            </p>
          </section>
        ))}

        <div className="text-center text-[12px]" style={{ color: "var(--text-muted)" }}>
          Looking for market data? <Link to="/companies" className="underline" style={{ color: "var(--green-up)" }}>Browse listed companies</Link>.
        </div>
      </main>

      <Footer />
    </div>
  );
}
