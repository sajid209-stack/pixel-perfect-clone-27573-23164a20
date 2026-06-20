import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/departments")({
  head: () => ({
    meta: [
      { title: "Divisions and Departments | Dhaka Stock Exchange" },
      { name: "description", content: "Directory of divisions and departments at the Dhaka Stock Exchange PLC." },
      { property: "og:title", content: "Divisions and Departments — DSE" },
      { property: "og:description", content: "DSE division & department directory." },
    ],
  }),
  component: DepartmentsPage,
});

type Entry = { name: string; ext?: string; email?: string };
type Division = { name: string; head?: Entry; items: Entry[] };

const DIVISIONS: Division[] = [
  {
    name: "Office of the Managing Director",
    head: { name: "Office of the Managing Director", ext: "1012", email: "md@dse.com.bd" },
    items: [
      { name: "Internal Audit Department", ext: "1442", email: "int_audit@dse.com.bd" },
    ],
  },
  {
    name: "HR & Admin Division",
    head: { name: "HR & Admin Division", ext: "1040", email: "coo@dse.com.bd" },
    items: [
      { name: "Human Resources Department", ext: "1402", email: "hrd@dse.com.bd" },
      { name: "Common Services Department", ext: "1301", email: "csd@dse.com.bd" },
      { name: "DSE Training Academy", ext: "1341", email: "training@dse.com.bd" },
      { name: "Maintenance Admin Department", ext: "1901" },
      { name: "General Admin", ext: "1315" },
      { name: "Security Department", ext: "186", email: "security.dse@dse.com.bd" },
    ],
  },
  {
    name: "Market Development Division",
    head: { name: "Market Development Division", ext: "1040", email: "coo@dse.com.bd" },
    items: [
      { name: "Market Operations Department" },
      { name: "Product & Market Development Department", ext: "1841", email: "rpd@dse.com.bd" },
      { name: "OTC Market Department", ext: "1521", email: "impd@dse.com.bd" },
      { name: "Research & Information Department", ext: "1541", email: "research@dse.com.bd" },
    ],
  },
  {
    name: "Finance & Accounts Division",
    head: { name: "Finance & Accounts Division", ext: "1030" },
    items: [
      { name: "Clearing Accounts Department", ext: "1201", email: "dseclearing@dse.com.bd" },
      { name: "General Accounts Department", ext: "1241", email: "accounts@dse.com.bd" },
      { name: "Treasury Management Department", ext: "1248" },
      { name: "Risk Management Department", ext: "1821", email: "dsermd@dse.com.bd" },
    ],
  },
  {
    name: "Company Affairs Division",
    head: { name: "Company Affairs Division", ext: "1080" },
    items: [
      { name: "Board & Corporate Affairs Department", ext: "1101", email: "secretariat@dse.com.bd" },
      { name: "Legal Affairs Department", ext: "1121", email: "legal@dse.com.bd" },
      { name: "PR & Publication Department", ext: "1182", email: "pr@dse.com.bd" },
      { name: "TREC Affairs Department", ext: "1101", email: "tad@dse.com.bd" },
      { name: "Share Department", ext: "1101" },
    ],
  },
  {
    name: "ICT Division",
    head: { name: "ICT Division", ext: "2020", email: "cto@dse.com.bd" },
    items: [
      { name: "Application Support Department", ext: "2121", email: "app.support@dse.com.bd" },
      { name: "Backoffice Development", ext: "2141", email: "bo@dse.com.bd" },
      { name: "IT Infrastructure", ext: "2161", email: "infrastructure@dse.com.bd" },
      { name: "MIS & Development", ext: "2201", email: "mis@dse.com.bd" },
      { name: "Network Development (Local)", ext: "2242" },
      { name: "Network Development (Distance)", ext: "2221", email: "network.dept@dse.com.bd" },
      { name: "Web Development", ext: "2281", email: "web@dse.com.bd" },
      { name: "IT Strategy & Security", ext: "2181", email: "iss@dse.com.bd" },
    ],
  },
  {
    name: "Regulatory Affairs Division",
    head: { name: "Regulatory Affairs Division", ext: "1020", email: "cro@dse.com.bd" },
    items: [
      { name: "Monitoring & Compliance", ext: "1662", email: "mcd@dse.com.bd" },
      { name: "Investigation and Enforcement", ext: "1621", email: "ied@dse.com.bd" },
      { name: "Listing Affairs", ext: "1701", email: "listing@dse.com.bd" },
      { name: "Investor Complaints, Arbitration & Litigation", ext: "1641", email: "icald@dse.com.bd" },
      { name: "Corporate Governance & Financial Reporting Compliance", ext: "1601", email: "cgfrc@dse.com.bd" },
    ],
  },
];

function EntryRow({ e, head = false }: { e: Entry; head?: boolean }) {
  const { t } = useLang();
  return (
    <div
      className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3"
      style={{ borderTop: head ? "none" : "1px solid var(--line)" }}
    >
      <div
        className="flex-1 min-w-[200px] text-[14px]"
        style={{ color: "var(--ink)", fontWeight: head ? 600 : 500 }}
      >
        {t(e.name)}
      </div>
      <div
        className="text-[12.5px] tnum"
        style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)", minWidth: 70 }}
      >
        {e.ext ? `Ext. ${e.ext}` : ""}
      </div>
      <div className="text-[12.5px]" style={{ minWidth: 200 }}>
        {e.email ? (
          <a href={`mailto:${e.email}`} className="hover:underline break-all" style={{ color: "var(--brand-600)" }}>
            {e.email}
          </a>
        ) : (
          <span style={{ color: "var(--text-secondary)" }}>—</span>
        )}
      </div>
    </div>
  );
}

function DepartmentsPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Divisions and Departments")}
          </h1>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-6">
        {DIVISIONS.map((d) => (
          <div
            key={d.name}
            className="p-5"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
          >
            {d.head && <EntryRow e={d.head} head />}
            <div>
              {d.items.map((e) => <EntryRow key={e.name} e={e} />)}
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
