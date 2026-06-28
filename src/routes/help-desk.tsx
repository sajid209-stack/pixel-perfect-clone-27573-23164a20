import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHeroSlider, DEFAULT_HERO_SLIDES } from "@/components/dse/PageHeroSlider";

export const Route = createFileRoute("/help-desk")({
  head: () => ({
    meta: [
      { title: "Help Desk of DSE | Dhaka Stock Exchange" },
      { name: "description", content: "Contact DSE help desk for capital market related queries." },
      { property: "og:title", content: "Help Desk of DSE" },
      { property: "og:description", content: "Phone numbers and extensions for DSE departments." },
    ],
  }),
  component: HelpDeskPage,
});

const ROWS: [string, string][] = [
  ["Ext: 1701–1715", "Listing Affairs Department"],
  ["Ext: 1161–1171", "PR & Publication Department"],
  ["Ext: 1661–1672", "Monitoring & Compliance Department"],
  ["Ext: 1541–1547", "Research & Information Department"],
  ["Ext: 2121–2127", "Mobile Trade (Application Support Department)"],
  ["Ext: 1561–1564", "OTC Market"],
  ["Ext: 1546", "Library"],
];

function HelpDeskPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />
      <PageHeroSlider slides={DEFAULT_HERO_SLIDES} />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1000px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Help Desk of DSE</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            Help Desk of DSE
          </h1>
          <p className="mt-4 text-[15px] max-w-[760px]" style={{ color: "var(--text-secondary)" }}>
            Honorable investors and concerned stakeholders are hereby requested to contact with
            Dhaka Stock Exchange PLC. via below mentioned phone number/hotline for any capital
            market related queries during office hour (from 9:00 am to 4:00 pm):
          </p>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-6 py-12 space-y-8">
        <div
          className="rounded-2xl p-5 text-[14px]"
          style={{
            background: "rgb(var(--brand-tint) / 0.06)",
            border: "1px solid rgb(var(--brand-tint) / 0.20)",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>PABX: </span>
          <a href="tel:+8802223384601" style={{ color: "var(--primary)" }}>
            +88-02-223384601-07
          </a>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <table className="w-full text-[14px]">
            <thead>
              <tr style={{ background: "rgb(var(--ov) / 0.04)", color: "var(--text-muted)" }}>
                <th className="text-left px-5 py-3 font-medium w-[220px]">Extension</th>
                <th className="text-left px-5 py-3 font-medium">Department</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([ext, dept]) => (
                <tr key={ext} style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}>
                  <td className="px-5 py-3 font-medium">{ext}</td>
                  <td className="px-5 py-3" style={{ color: "var(--text-secondary)" }}>{dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[13px]" style={{ color: "var(--text-muted)" }}>
          See also:{" "}
          <Link to="/help-desk/nrb" style={{ color: "var(--primary)" }}>
            Help Desk for Non-Resident Bangladeshi (NRB) →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
