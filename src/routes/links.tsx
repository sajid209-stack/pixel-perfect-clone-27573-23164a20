import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Quick Links | Dhaka Stock Exchange" },
      { name: "description", content: "Quick links to regulators, partners and global stock exchanges." },
      { property: "og:title", content: "Quick Links | DSE" },
      { property: "og:description", content: "Curated external links from the Dhaka Stock Exchange." },
    ],
  }),
  component: LinksPage,
});

type Item = { name: string; href: string };

const REGULATORS: Item[] = [
  { name: "Bangladesh Securities and Exchange Commission (BSEC)", href: "https://www.sec.gov.bd" },
  { name: "Central Depository Bangladesh Limited (CDBL)", href: "https://www.cdbl.com.bd" },
  { name: "Bangladesh Bank", href: "https://www.bb.org.bd" },
  { name: "Bangladesh Bureau of Statistics", href: "https://www.bbs.gov.bd" },
  { name: "Bangladesh Investment Development Authority (BIDA)", href: "https://bida.gov.bd" },
  { name: "Bangladesh Institute of Capital Market (BICM)", href: "https://www.bicm.ac.bd" },
  { name: "HSBC", href: "https://www.hsbc.com.bd" },
];

const EXCHANGES: Item[] = [
  "American Stock Exchange",
  "Amman Stock Exchange",
  "Australian Stock Exchange",
  "Bahrain Stock Exchange",
  "Bombay Stock Exchange Ltd.",
  "Colombo Stock Exchange",
  "Copenhagen Stock Exchange",
  "Doha Securities Market",
  "Dubai Financial Market",
  "Helsinki Stock Exchange",
  "Hong Kong Stock Exchange",
  "Indonesia Stock Exchange",
  "Islamabad Stock Exchange",
  "Istanbul Stock Exchange",
  "Karachi Stock Exchange",
  "Kuala Lumpur Stock Exchange",
  "Kuwait Stock Exchange",
  "Lahore Stock Exchange",
  "London Stock Exchange",
  "Maldives Stock Exchange",
  "NASDAQ",
  "National Stock Exchange of India",
  "Nepal Stock Exchange Ltd.",
  "New Zealand Stock Exchange",
  "Palestine Securities Exchange",
  "Shanghai Futures Exchange",
  "Singapore Exchange",
  "Stock Exchange of Thailand",
  "Stockholm Stock Exchange",
  "Switzerland Stock Exchange",
  "Taiwan Stock Exchange",
  "The Calcutta Stock Exchange Associations Ltd.",
  "Tokyo Stock Exchange",
  "Toronto Stock Exchange",
].map((name) => ({ name, href: "#" }));

const GROUPS: { title: string; items: Item[] }[] = [
  { title: "Regulators & Partners", items: REGULATORS },
  { title: "Other Stock Exchanges", items: EXCHANGES },
];

function LinksPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Quick Links</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            Quick Links
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Curated external resources — regulators, partners and global stock exchanges. All links
            are CMS-managed and open in a new tab.
          </p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 py-12 space-y-12">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-[20px] font-semibold tracking-[-0.01em]">{g.title}</h2>
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                {g.items.length} links
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {g.items.map((it) => (
                <a
                  key={it.name}
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-4 flex items-start gap-3 transition hover:opacity-90"
                  style={{
                    background: "rgb(var(--surface-rgb) / 0.6)",
                    border: "1px solid rgb(var(--ov) / 0.06)",
                  }}
                >
                  <div className="flex-1 min-w-0 text-[13px] font-medium leading-snug">{it.name}</div>
                  <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
