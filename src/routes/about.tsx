import { assetUrl } from "@/lib/asset-url";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import dseTower from "@/assets/hero-dse-tower.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About DSE — Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Learn about the Dhaka Stock Exchange — its history, leadership, structure and operations.",
      },
      { property: "og:title", content: "About DSE | Dhaka Stock Exchange" },
      {
        property: "og:description",
        content:
          "Learn about the Dhaka Stock Exchange — its history, leadership, structure and operations.",
      },
    ],
  }),
  component: AboutPage,
});

type LinkItem = { label: string; to: string; hash?: string };

const LINKS: LinkItem[] = [
  { label: "Introduction to DSE", to: "/about/introduction" },
  { label: "Mission & Vision", to: "/about/vision" },
  { label: "DSE at a Glance", to: "/about/at-a-glance" },
  { label: "Board of Directors", to: "/about/board" },
  { label: "Board Committees", to: "/about/committees" },
  { label: "DSE Management", to: "/about/management" },
  { label: "DSE Presidents / Chairmen", to: "/about/chairmen" },
  { label: "Function of DSE", to: "/about/introduction", hash: "function" },
  { label: "Legal Control", to: "/about/introduction", hash: "legal-control" },
  { label: "Clearing & Settlement", to: "/regulations", hash: "clearing-settlement" },
  { label: "DSE Indices", to: "/index-methodology" },
  { label: "Holidays & Trading Sessions", to: "/holidays" },
  { label: "Departments of DSE", to: "/about/departments" },
  { label: "TREC Holders' Directory", to: "/members" },
  { label: "Surveillance", to: "/about/surveillance" },
  { label: "Demutualization", to: "/about/demutualization" },
  { label: "DSE New Automation System", to: "/about/automation" },
  { label: "Major Events", to: "/about/major-events" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Annual Report", to: "/publications" },
];

function AboutPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            About DSE
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            About DSE
          </h1>
          <p className="mt-4 text-[15px] max-w-[680px]" style={{ color: "var(--text-secondary)" }}>
            Learn about the Dhaka Stock Exchange — its history, leadership, structure and operations.
          </p>
        </div>
       </section>

      <figure className="max-w-[1200px] mx-auto px-6 pt-8 m-0">
        <img
          src={assetUrl(dseTower)}
          alt="DSE Tower exterior"
          className="w-full block"
          style={{ maxHeight: 420, objectFit: "cover", borderRadius: 0 }}
        />
        <figcaption className="mt-2 text-[12px] italic" style={{ color: "#6b7280" }}>
          DSE Tower, Nikunja — headquarters of the Dhaka Stock Exchange.
        </figcaption>
      </figure>

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              className="group rounded-2xl p-5 flex items-center justify-between gap-4 transition"
              style={{
                background: "rgb(var(--surface-rgb) / 0.6)",
                border: "1px solid rgb(var(--ov) / 0.06)",
                color: "var(--text-primary)",
              }}
            >
              <span className="text-[14.5px] font-medium">{l.label}</span>
              <span
                className="text-[14px] shrink-0 transition-transform group-hover:translate-x-0.5"
                style={{ color: "var(--primary)" }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
