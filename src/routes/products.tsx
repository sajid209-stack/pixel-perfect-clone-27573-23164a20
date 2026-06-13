import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import {
  TrendingUp,
  Landmark,
  PieChart,
  Sparkles,
  FileText,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Services | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Instruments traded on the DSE — equities, bonds, mutual funds, ETFs, sukuk — plus trading sessions and settlement cycles.",
      },
      { property: "og:title", content: "Products & Services | DSE" },
      {
        property: "og:description",
        content: "The instruments traded on the DSE and how trading and settlement work.",
      },
    ],
  }),
  component: ProductsPage,
});

type Product = {
  id: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  name: string;
  desc: string;
  to?: string;
  hash?: string;
  external?: boolean;
  soon?: boolean;
  linkLabel: string;
};

const PRODUCTS: Product[] = [
  {
    id: "equities",
    icon: TrendingUp,
    name: "Equities",
    desc: "Ordinary shares of listed companies. T+2 settlement for A/B/N categories, T+3 for Z. Category bands govern margin and trading rules.",
    to: "/products",
    hash: "equities",
    linkLabel: "Read more",
  },
  {
    id: "bonds",
    icon: Landmark,
    name: "Bonds & Government Securities",
    desc: "Corporate bonds, debentures and Bangladesh government treasury securities listed on the DSE.",
    to: "/bonds",
    linkLabel: "Open Bonds desk",
  },
  {
    id: "funds",
    icon: PieChart,
    name: "Mutual Funds & ETFs",
    desc: "Open-ended and closed-end mutual funds plus exchange-traded funds — NAV table and fund directory.",
    to: "/funds",
    linkLabel: "Open Funds desk",
  },
  {
    id: "sukuk",
    icon: Sparkles,
    name: "Sukuk (Shariah-compliant)",
    desc: "Asset-backed Shariah-compliant instruments. Listed sovereign and corporate sukuk traded on the exchange.",
    to: "/products",
    hash: "sukuk",
    linkLabel: "Read more",
  },
  {
    id: "debentures",
    icon: FileText,
    name: "Debentures",
    desc: "Legacy listed corporate debentures — fixed-income instruments retained for historical issuers.",
    to: "/products",
    hash: "debentures",
    linkLabel: "Read more",
  },
  {
    id: "derivatives",
    icon: Layers,
    name: "Derivatives / V-Next",
    desc: "Equity and index derivatives are planned under the V-Next platform programme.",
    soon: true,
    linkLabel: "Coming soon",
  },
];

const SESSIONS = [
  { name: "Pre-open", time: "09:30 – 10:00", note: "Order entry only; no matching" },
  { name: "Continuous trading", time: "10:00 – 14:20", note: "Order matching" },
  { name: "Post-close", time: "14:20 – 14:30", note: "Closing price determination" },
];

const SETTLEMENT = [
  { cycle: "T+2", scope: "A / B / N category equities" },
  { cycle: "T+3", scope: "Z category equities" },
  { cycle: "T+0", scope: "Spot / record-date trades" },
];

function ProductsPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />

      {/* Header */}
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--brand-600)" }}
          >
            Dhaka Stock Exchange
          </div>
          <h1
            className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            Products &amp; Services
          </h1>
          <p
            className="mt-2 text-[14px] md:text-[15px] leading-[1.55] max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            The instruments traded on the DSE and how trading and settlement work.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            const body = (
              <div
                className="h-full flex flex-col p-5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 2,
                  opacity: p.soon ? 0.72 : 1,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5" style={{ color: "var(--brand-600)" }} />
                  <div className="text-[16px] font-semibold" style={{ color: "var(--ink)" }}>
                    {p.name}
                  </div>
                  {p.soon && (
                    <span
                      className="ml-auto text-[10px] font-semibold uppercase tracking-wider px-1.5 py-px"
                      style={{ background: "#FEF3C7", color: "#92400E", borderRadius: 2 }}
                    >
                      Coming soon
                    </span>
                  )}
                </div>
                <p
                  className="text-[13px] leading-[1.55] flex-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.desc}
                </p>
                <div
                  className="mt-4 text-[12px] font-semibold uppercase tracking-wider"
                  style={{ color: p.soon ? "var(--text-muted)" : "var(--brand-600)" }}
                >
                  {p.linkLabel}
                  {!p.soon && " →"}
                </div>
              </div>
            );
            if (p.soon || !p.to) return <div key={p.id}>{body}</div>;
            return (
              <Link
                key={p.id}
                to={p.to}
                hash={p.hash}
                className="block hover:opacity-95 transition"
              >
                {body}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trading & Settlement explainer */}
      <section
        className="border-t"
        style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--text-muted)" }}
          >
            How it works
          </div>
          <h2
            className="mt-1 text-[20px] md:text-[22px] font-semibold"
            style={{ color: "var(--ink)" }}
          >
            Trading &amp; Settlement
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sessions */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 2,
              }}
            >
              <div
                className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--line)" }}
              >
                Trading sessions
              </div>
              <table className="w-full text-[13px]">
                <tbody>
                  {SESSIONS.map((s, i) => (
                    <tr
                      key={s.name}
                      style={{ background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent" }}
                    >
                      <td
                        className="px-4 py-2 font-semibold"
                        style={{ color: "var(--ink)", width: "32%" }}
                      >
                        {s.name}
                      </td>
                      <td
                        className="px-4 py-2 tnum"
                        style={{ color: "var(--ink)", fontFamily: "var(--font-mono)", width: "28%" }}
                      >
                        {s.time}
                      </td>
                      <td className="px-4 py-2" style={{ color: "var(--text-secondary)" }}>
                        {s.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Settlement */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 2,
              }}
            >
              <div
                className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--line)" }}
              >
                Settlement cycles
              </div>
              <table className="w-full text-[13px]">
                <tbody>
                  {SETTLEMENT.map((s, i) => (
                    <tr
                      key={s.cycle}
                      style={{ background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent" }}
                    >
                      <td
                        className="px-4 py-2 font-semibold tnum"
                        style={{
                          color: "var(--ink)",
                          fontFamily: "var(--font-mono)",
                          width: "28%",
                        }}
                      >
                        {s.cycle}
                      </td>
                      <td className="px-4 py-2" style={{ color: "var(--text-secondary)" }}>
                        {s.scope}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-[12px] italic" style={{ color: "var(--text-muted)" }}>
            Indicative session times and settlement cycles pending live feed.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
