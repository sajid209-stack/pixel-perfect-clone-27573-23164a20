import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/data-archives")({
  head: () => ({
    meta: [
      { title: "DSE Data Archive | Dhaka Stock Exchange" },
      { name: "description", content: "Historical DSE market data — last two years." },
      { property: "og:title", content: "DSE Data Archive" },
      { property: "og:description", content: "Historical DSE market data — last two years." },
    ],
  }),
  component: DataArchivePage,
});

const CARDS = [
  { title: "DSE Market Summary", desc: "Daily aggregate summary of turnover, volume, trades and indices.", cms: "archive.market-summary" },
  { title: "Day End Archive", desc: "End-of-day instrument-level prices and statistics.", cms: "archive.day-end" },
  { title: "DSE News Archive", desc: "Historical news, disclosures and corporate announcements.", cms: "archive.news" },
  { title: "Close Price", desc: "Closing prices for all listed securities over time.", cms: "archive.close-price" },
];

function DataArchivePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Market Information
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            DSE Data Archive
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Historical market data, last two years.
          </p>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid sm:grid-cols-2 gap-4">
          {CARDS.map((c) => (
            <a
              key={c.title}
              href="#"
              data-cms={c.cms}
              className="block rounded-md p-5 transition hover:opacity-95"
              style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
            >
              <div className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>{c.title}</div>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{c.desc}</p>
              <div className="mt-3 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--brand-600)" }}>
                Open archive →
              </div>
            </a>
          ))}
        </div>
        <p className="mt-6 text-[11.5px] uppercase tracking-[0.14em]" style={{ color: "var(--text-secondary)" }}>
          Last 2 years data.
        </p>
      </section>
      <Footer />
    </div>
  );
}
