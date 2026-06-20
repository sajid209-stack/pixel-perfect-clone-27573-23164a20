import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Images } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/automation")({
  head: () => ({
    meta: [
      { title: "DSE New Automation System | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Selection of the Automation Project partners for the Dhaka Stock Exchange — press release and picture gallery.",
      },
      { property: "og:title", content: "DSE New Automation System" },
      { property: "og:description", content: "Automation project announcement at DSE." },
    ],
  }),
  component: AutomationPage,
});

function AutomationPage() {
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
            {t("DSE New Automation System")}
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-3">
        <a
          href="#"
          data-cms="automation.pressRelease"
          className="flex items-center gap-3 p-4 hover:opacity-80 transition"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
        >
          <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
          <span className="text-[14px]" style={{ color: "var(--ink)" }}>
            {t("Press Release - Dhaka Stock Exchange announces selection of Automation Project partners")}
          </span>
        </a>
        <Link
          to="/gallery"
          className="flex items-center gap-3 p-4 hover:opacity-80 transition"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
        >
          <Images className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
          <span className="text-[14px]" style={{ color: "var(--ink)" }}>{t("Picture Gallery")}</span>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
