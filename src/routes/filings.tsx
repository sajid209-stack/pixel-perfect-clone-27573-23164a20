import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/filings")({
  head: () => ({
    meta: [
      { title: "Disclosures & Filings | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Browse DSE disclosures and filings: auditor's opinions, PSI notices, proceeds utilisation, right offers, direct listing and re-listing.",
      },
      { property: "og:title", content: "Disclosures & Filings | DSE" },
      {
        property: "og:description",
        content: "Navigation hub for DSE disclosures and filings.",
      },
    ],
  }),
  component: FilingsPage,
});

type Card = { title: string; desc: string; href: string };

const CARDS: Card[] = [
  {
    title: "Auditor's Opinion and Others",
    desc: "Auditor's report notices and IPO/RPO/Rights proceeds-utilisation statements by year.",
    href: "/filings/auditors-opinion",
  },
  {
    title: "PSI and Material Information",
    desc: "Price-sensitive and material information disclosures from listed companies.",
    href: "/filings/psi",
  },
  {
    title: "Proceeds Utilisation",
    desc: "IPO, RPO and Rights issue proceeds utilisation statements filed by issuers.",
    href: "/filings/proceeds-utilisation",
  },
  {
    title: "Right Offer Documents",
    desc: "Right offer documents and related notices published by listed companies.",
    href: "/companies/right-offers",
  },
  {
    title: "Direct Listing",
    desc: "Applied, offloading and archived direct listing filings.",
    href: "/companies/direct-listing",
  },
  {
    title: "Re-listing",
    desc: "Re-listing applications and related disclosures.",
    href: "/companies/re-listing",
  },
];

function FilingsPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            {t("Dhaka Stock Exchange")}
          </div>
          <h1
            className="text-[28px] md:text-[34px] font-semibold tracking-tight leading-[1.1]"
            style={{ color: "var(--ink)" }}
          >
            {t("Disclosures & Filings")}
          </h1>
          <p
            className="mt-2 text-[13.5px] max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {t(
              "Browse disclosures and filings by category. Each section links to the dedicated page with notices and documents.",
            )}
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div
          className="text-[11px] font-semibold uppercase mb-3"
          style={{ letterSpacing: "0.14em", color: "var(--text-secondary)" }}
        >
          {t("Browse")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CARDS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="group block p-4 transition"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 2,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <h2
                  className="text-[14.5px] font-semibold leading-snug group-hover:underline"
                  style={{ color: "var(--ink)" }}
                >
                  {t(c.title)}
                </h2>
                <ArrowUpRight
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: "var(--brand-600)" }}
                />
              </div>
              <p
                className="mt-1.5 text-[12.5px] leading-[1.5]"
                style={{ color: "var(--text-secondary)" }}
              >
                {t(c.desc)}
              </p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
