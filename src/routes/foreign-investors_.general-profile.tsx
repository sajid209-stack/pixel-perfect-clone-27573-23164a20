import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/foreign-investors_/general-profile")({
  head: () => ({
    meta: [
      { title: "General Profile of Bangladesh | Dhaka Stock Exchange" },
      {
        name: "description",
        content: "Key facts about Bangladesh for prospective investors.",
      },
      { property: "og:title", content: "General Profile of Bangladesh" },
      {
        property: "og:description",
        content: "Key facts about Bangladesh for prospective investors.",
      },
    ],
  }),
  component: GeneralProfilePage,
});

const ROWS: { label: string; value: string }[] = [
  { label: "Rainfall", value: "1194 mm to 3454 mm (average during monsoon, June–August)" },
  { label: "Humidity", value: "Highest 99 percent (July), Lowest 36 percent (December and January)" },
  { label: "Population", value: "152.51 Million (Population & Housing Census Report 2011, Bangladesh Bureau of Statistics)" },
  { label: "Population Growth Rate", value: "1.37 percent" },
  { label: "Population Density", value: "1015 Person per sq km" },
  { label: "Total fertility rate", value: "2.17 Children born/woman (2017 est.)" },
  { label: "Life expectancy", value: "73.4 years (2017 est.)" },
  { label: "Birth Rate", value: "18.8 births/1,000 population (2017 est.)" },
  { label: "Mortality rate", value: "5.4 deaths/1,000 population (2017 est.)" },
  { label: "Adult literacy rate", value: "72.8 Percent (15 years +)" },
  { label: "Language", value: "95 percent Bangla and 5 percent other dialect. English is widely spoken." },
  { label: "Religion", value: "Muslim (89.6%), Hindu (9.3%), Buddhist (0.60%), Christian (0.30%), & Animists and believers in tribal faiths (0.20%)" },
  { label: "Food", value: "Rice, Vegetables, pulses, fish and meat." },
  { label: "Mineral resources", value: "Natural gas, limestone, hard rock, coal, Lignite, silica sand, white clay, radioactive Sand etc. (There is a strong possibility of oil deposit)" },
  { label: "Human resources", value: "A substantial manpower reserve, trained from 34 public government and technical Universities along with 56 Private Universities and 18 Electronic media" },
  { label: "Skilled", value: "Engineers, technicians, physicians, economists, Accountants, administrative and managerial personnel; an abundance of low cost, easily trained and adaptable, hardworking, intelligent and youthful labour force." },
];

function GeneralProfilePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--brand-600)" }}
          >
            Foreign Investors
          </div>
          <h1
            className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            General Profile of Bangladesh
          </h1>
          <p
            className="mt-3 text-[14px] max-w-[720px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Key facts about Bangladesh for prospective investors.
          </p>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <dl
          className="grid grid-cols-1"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          {ROWS.map((r, i) => (
            <div
              key={r.label}
              className="grid grid-cols-[200px_minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)]"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--line)",
                background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent",
              }}
            >
              <dt
                className="px-3 md:px-4 py-2.5 text-[13px] font-semibold"
                style={{ color: "var(--ink)", borderRight: "1px solid var(--line)" }}
              >
                {r.label}
              </dt>
              <dd
                className="px-3 md:px-4 py-2.5 text-[13px] leading-[1.65]"
                style={{ color: "var(--text-secondary)" }}
              >
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
        <p
          className="mt-3 text-[11.5px]"
          style={{ color: "var(--text-muted)" }}
        >
          Source: Bangladesh Bureau of Statistics &amp; www.bbs.gov.bd
        </p>
      </section>

      <Footer />
    </div>
  );
}
