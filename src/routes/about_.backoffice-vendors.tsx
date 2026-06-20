import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/backoffice-vendors")({
  head: () => ({
    meta: [
      { title: "Panel of Back-Office Software Vendors | Dhaka Stock Exchange" },
      { name: "description", content: "Panel of back-office software vendors approved at the Dhaka Stock Exchange." },
      { property: "og:title", content: "Back-Office Software Vendors — DSE" },
      { property: "og:description", content: "Approved back-office software vendors panel." },
    ],
  }),
  component: VendorsPage,
});

const VENDORS = [
  "United Corporate Advisory Services Limited",
  "Orange Solutions Ltd.",
  "Cygnus Innovation Ltd.",
  "LeadSoft Bangladesh Limited",
  "LankaBangla Information System Limited",
  "DataSoft Systems Bangladesh Limited",
  "AdaSoft International Limited",
];

function VendorsPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Panel of Back-Office Software Vendors")}
          </h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <ol
          className="divide-y"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 2,
          }}
        >
          {VENDORS.map((v, i) => (
            <li
              key={v}
              className="flex items-baseline gap-4 px-5 py-4"
              style={{ borderColor: "var(--line)" }}
            >
              <span
                className="tnum text-[12px] w-6 shrink-0"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px]" style={{ color: "var(--ink)" }}>{v}</span>
            </li>
          ))}
        </ol>
      </section>
      <Footer />
    </div>
  );
}
