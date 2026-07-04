import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, ChevronDown, FileText } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/bonds_/government-securities")({
  head: () => ({
    meta: [
      { title: "Government Securities (G-Sec) | Dhaka Stock Exchange" },
      { name: "description", content: "BGTB/G-Sec announcements, MTM, YTM curve, auction calendar, and BSEC directives." },
      { property: "og:title", content: "Government Securities (G-Sec) — DSE" },
      { property: "og:description", content: "Announcements and reference links for Bangladesh Government Treasury Bonds and G-Sec." },
      { property: "og:url", content: "https://pixel-perfect-clone-27573.lovable.app/bonds/government-securities" },
    ],
    links: [{ rel: "canonical", href: "https://pixel-perfect-clone-27573.lovable.app/bonds/government-securities" }],
  }),
  component: GSecAnnouncementsPage,
});

type InternalLink = { kind: "internal"; label: string; to: string };
type ExtLink = { kind: "external"; label: string; href: string };
type Expand = { kind: "expand"; label: string; content: { title: string; href: string }[] };
type Item = InternalLink | ExtLink | Expand;

// SAMPLE — replace at wiring with real document registry
const ITEMS: Item[] = [
  { kind: "internal", label: "G-Sec Trades", to: "/bonds" },
  { kind: "external", label: "Mark to Market (MTM) of Govt. Securities", href: "https://gsom.bb.org.bd/mtm.php" },
  { kind: "external", label: "Yield to Maturity (YTM) Curve", href: "https://gsom.bb.org.bd/dailyYield.php" },
  { kind: "external", label: "Upcoming Auction Calendar", href: "https://www.bb.org.bd/en/index.php/monetaryactivity/auc_calendar" },
  {
    kind: "expand",
    label: "BSEC Directives and Others",
    content: [{ title: "Directive on BGTB/G-Sec Primary Auction Process", href: "#" }],
  },
];

// SAMPLE — replace at wiring
const PRIMARY_DEALER_DOC = { title: "Primary Dealer Bank List_BGTB_G-sec_BB", href: "#" };

function GSecAnnouncementsPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-8">
          <div className="text-[11px] font-semibold uppercase mb-2" style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}>
            Dhaka Stock Exchange
          </div>
          <h1 className="text-[26px] md:text-[32px] font-semibold tracking-tight leading-[1.1]" style={{ color: "var(--ink)" }}>
            BGTB/G-Sec Announcement and Notice
          </h1>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
          {ITEMS.map((it, i) => {
            const base = "w-full flex items-center justify-between px-4 py-3 text-[14px] text-left hover:bg-[var(--surface-2)] transition-colors";
            const border = i > 0 ? "1px solid var(--line)" : undefined;

            if (it.kind === "internal") {
              return (
                <Link key={it.label} to={it.to} className={base}
                  style={{ borderTop: border, color: "var(--ink)" }}>
                  <span className="font-medium">{it.label}</span>
                  <span aria-hidden style={{ color: "var(--brand-600)" }}>→</span>
                </Link>
              );
            }
            if (it.kind === "external") {
              return (
                <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className={base}
                  style={{ borderTop: border, color: "var(--ink)" }}>
                  <span className="font-medium">{it.label}</span>
                  <ExternalLink className="w-4 h-4" style={{ color: "var(--brand-600)" }} />
                </a>
              );
            }
            const isOpen = open === it.label;
            return (
              <div key={it.label} style={{ borderTop: border }}>
                <button
                  onClick={() => setOpen(isOpen ? null : it.label)}
                  aria-expanded={isOpen}
                  className={base}
                  style={{ color: "var(--ink)" }}
                >
                  <span className="font-medium">{it.label}</span>
                  <ChevronDown className="w-4 h-4 transition-transform" style={{ color: "var(--brand-600)", transform: isOpen ? "rotate(180deg)" : undefined }} />
                </button>
                {isOpen && (
                  <div className="px-4 py-3" style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}>
                    {it.content.map((d) => (
                      <a key={d.title} href={d.href} className="flex items-center gap-2 py-2 text-[13px] hover:underline"
                        style={{ color: "var(--brand-600)" }}>
                        <FileText className="w-4 h-4" />
                        <span>{d.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
          <a href={PRIMARY_DEALER_DOC.href} className="flex items-center gap-3 px-4 py-3 text-[14px] hover:bg-[var(--surface-2)] transition-colors"
            style={{ color: "var(--ink)" }}>
            <FileText className="w-4 h-4" style={{ color: "var(--brand-600)" }} />
            <span className="font-medium">{PRIMARY_DEALER_DOC.title}</span>
            <span className="ml-auto text-[11px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-secondary)" }}>PDF</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
