import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { NotFoundView } from "@/components/dse/NotFoundView";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "404 — Page Not Found | Dhaka Stock Exchange" },
      { name: "description", content: "The page you are looking for could not be found on the Dhaka Stock Exchange website." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "404 — Page Not Found | DSE" },
      { property: "og:description", content: "The page you are looking for could not be found." },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <NotFoundView />
      <Footer />
    </div>
  );
}
