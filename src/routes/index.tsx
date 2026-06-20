import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Hero } from "@/components/dse/Hero";
import { QuickAccessTiles } from "@/components/dse/QuickAccessTiles";
import { TodaysMarket } from "@/components/dse/TodaysMarket";
import { NewsScroll } from "@/components/dse/NewsScroll";
import { ForeignInvestorBand } from "@/components/dse/ForeignInvestorBand";
import { HomeFooter } from "@/components/dse/HomeFooter";
import { MarketFreshness } from "@/components/dse/MarketFreshness";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhaka Stock Exchange — Bangladesh's Capital Market" },
      { name: "description", content: "Real-time DSEX data, company disclosures, IPO pipeline, and market intelligence from Bangladesh's premier stock exchange." },
      { property: "og:title", content: "Dhaka Stock Exchange — Bangladesh's Capital Market" },
      { property: "og:description", content: "Real-time DSEX data, disclosures, and market intelligence." },
    ],
  }),
  component: Home,
});

function FreshnessRow({ label }: { label: string }) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-3 -mb-2">
      <MarketFreshness label={label} />
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <QuickAccessTiles />
      <FreshnessRow label="Indices & movers — as provided by DSE" />
      <TodaysMarket />
      <FreshnessRow label="Newsroom — as provided by DSE" />
      <NewsScroll />
      <FreshnessRow label="Foreign trade — as provided by DSE" />
      <ForeignInvestorBand />
      <HomeFooter />
    </div>
  );
}
