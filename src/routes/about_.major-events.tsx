import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { PageHero } from "@/components/dse/PageHero";
import { useLang } from "@/i18n/LanguageContext";
import heroAsset from "@/assets/hero-dse-tower.jpg.asset.json";

export const Route = createFileRoute("/about_/major-events")({
  head: () => ({
    meta: [
      { title: "Major Events of DSE | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "A timeline of major milestones in the history of the Dhaka Stock Exchange — from cry-out trading to demutualization and DSE-Mobile.",
      },
      { property: "og:title", content: "Major Events of DSE" },
      { property: "og:description", content: "Milestones in DSE's history." },
    ],
  }),
  component: MajorEventsPage,
});

const EVENTS: { date: string; title: string }[] = [
  { date: "Aug 09, 1998", title: "Last trading day of cry-out system" },
  { date: "Aug 10, 1998", title: "Inauguration of Automated Trading System" },
  { date: "Oct 11, 2005", title: "Launching of trading Govt. T-Bond in the DSE" },
  { date: "Dec 24, 2003", title: "Full DP launching ceremony of DSE under CDBL" },
  { date: "Apr 28, 2013", title: "DSE Submitted the 'Demutualization Act' to BSEC" },
  { date: "Aug 28, 2013", title: "DSE submitted the Demutualization Scheme to BSEC" },
  { date: "Nov 21, 2013", title: "EGM of DSE" },
  { date: "Sep 03, 2014", title: "Inauguration of new surveillance software of DSE" },
  { date: "Mar 09, 2016", title: "Inauguration of DSE-Mobile" },
  { date: "May 14, 2018", title: "Strategic investment agreement signed between DSE and Chinese consortium" },
  { date: "Sep 30, 2018", title: "Inauguration Ceremony DSE SME Platform" },
  { date: "Sep 04, 2022", title: "Inauguration of Alternative Trading Board (ATB) at DSE" },
];

function MajorEventsPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight uppercase tracking-wide" style={{ color: "var(--ink)" }}>
            {t("ALL MAJOR EVENTS OF DSE")}
          </h1>
        </div>
      </section>
      <PageHero src={heroAsset} alt="DSE Tower" />

      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <ol className="relative" style={{ borderLeft: "2px solid var(--line)" }}>
          {EVENTS.map((e) => (
            <li key={e.title} className="relative pl-6 pb-8 last:pb-0">
              <span
                className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full"
                style={{ background: "var(--brand-600)", boxShadow: "0 0 0 3px var(--bg)" }}
              />
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] tnum"
                style={{ color: "var(--brand-600)", fontFamily: "var(--font-mono)" }}>
                {e.date}
              </div>
              <div className="mt-1 text-[15px] md:text-[16px] font-semibold leading-snug" style={{ color: "var(--ink)" }}>
                {t(e.title)}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Footer />
    </div>
  );
}
