import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Hero } from "@/components/dse/Hero";
import { Ticker } from "@/components/dse/Ticker";
import { DualAudience } from "@/components/dse/DualAudience";
import { CompactMarketGrid } from "@/components/dse/CompactMarketGrid";
import { Resources } from "@/components/dse/Resources";
import { NewsScroll } from "@/components/dse/NewsScroll";
import { Footer } from "@/components/dse/Footer";

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

function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Nav />
      <Ticker />
      <Hero />
      <CompactMarketGrid />
      <DualAudience />
      <Resources />
      <NewsScroll />
      <Footer />
    </div>
  );
}
