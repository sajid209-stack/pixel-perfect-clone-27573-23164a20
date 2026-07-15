import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Bookmark, Clock, FileText, Printer, Share2 } from "lucide-react";
import { useMemo } from "react";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { buildFeed, getDisclosureById, typeMeta, type Disclosure } from "@/data/newsFeed";
import { assetUrl } from "@/lib/asset-url";
import newsPharma from "@/assets/news-pharma.jpg";
import newsIpo from "@/assets/news-ipo.jpg";
import heroTowerAsset from "@/assets/hero-dse-tower.jpg.asset.json";
import foreignInvestorsAsset from "@/assets/foreign-investors.jpg.asset.json";
import aboutDseAsset from "@/assets/about-dse-mega.jpg.asset.json";

const IMAGES = [
  newsPharma,
  newsIpo,
  assetUrl(heroTowerAsset),
  assetUrl(foreignInvestorsAsset),
  assetUrl(aboutDseAsset),
];

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function imageFor(d: Disclosure) {
  return IMAGES[hashCode(d.id + d.code) % IMAGES.length];
}

export const Route = createFileRoute("/news_/$id")({
  loader: ({ params }) => {
    const post = getDisclosureById(params.id);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Disclosure not found | DSE" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const title = `${post.code} — ${post.summary} | DSE Newsroom`;
    const image = imageFor(post);
    return {
      meta: [
        { title },
        { name: "description", content: post.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: post.summary },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
    };
  },
  component: NewsPostPage,
});

function NewsPostPage() {
  const { post } = Route.useLoaderData() as { post: Disclosure };
  const meta = typeMeta[post.type];
  const heroImage = imageFor(post);

  const feed = useMemo(() => buildFeed(), []);

  const sidebarPosts = useMemo(
    () => feed.filter((d) => d.id !== post.id && d.type === post.type).slice(0, 4),
    [feed, post.id, post.type],
  );

  const relatedCards = useMemo(
    () => feed.filter((d) => d.id !== post.id).slice(0, 4),
    [feed, post.id],
  );

  const readMins = Math.max(1, Math.round(post.body.split(/\s+/).length / 180));

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      <article className="max-w-[1180px] mx-auto px-6 pt-10 pb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] mb-6" style={{ color: "var(--text-muted)" }}>
          <Link to="/" className="hover:opacity-80">Home</Link>
          <span>/</span>
          <Link to="/news" className="hover:opacity-80">Newsroom</Link>
          <span>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{post.code}</span>
        </nav>

        {/* Category */}
        <div className="mb-4">
          <span
            className="text-[11px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded"
            style={{ background: meta.bg, color: meta.color }}
          >
            {post.type}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-semibold leading-[1.15] tracking-[-0.02em] mb-5 max-w-[900px]">
          {post.summary}
        </h1>

        {/* Byline */}
        <div className="flex items-center gap-3 flex-wrap mb-8">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10.5px] font-bold tnum"
            style={{ background: "rgb(var(--ov) / 0.06)", border: "1px solid rgb(var(--ov) / 0.08)" }}
          >
            {post.code.slice(0, 2)}
          </div>
          <Link
            to="/company/$ticker"
            params={{ ticker: post.code }}
            className="text-[13px] font-semibold hover:text-[color:var(--primary)] transition"
          >
            {post.name}
          </Link>
          <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
            {post.sector}
          </span>
          <span className="text-[12px] inline-flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
            <Clock className="w-3 h-3" /> {post.date} · {post.time} · {readMins} min read
          </span>
        </div>

        {/* Hero image */}
        <div
          className="rounded-xl overflow-hidden mb-10"
          style={{ border: "1px solid rgb(var(--ov) / 0.06)" }}
        >
          <img
            src={heroImage}
            alt={`${post.name} — ${post.type} filing`}
            className="w-full h-auto object-cover"
            style={{ aspectRatio: "16/9" }}
          />
        </div>

        {/* Body + sidebar */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          <div>
            <p className="text-[18px] leading-[1.65] mb-6 font-medium" style={{ color: "var(--text-primary)" }}>
              {post.summary}
            </p>
            <div className="text-[15.5px] leading-[1.8] space-y-5" style={{ color: "var(--text-secondary)" }}>
              <p>{post.body}</p>
              <p>
                This disclosure was submitted through the DSE electronic filing system in line with
                Bangladesh Securities and Exchange Commission (BSEC) rules. Investors are advised to
                review the accompanying documents before making trading decisions.
              </p>
              <blockquote
                className="pl-5 py-2 text-[17px] italic"
                style={{ borderLeft: "3px solid var(--primary)", color: "var(--text-primary)" }}
              >
                "All price-sensitive information must reach the market simultaneously and through
                official channels."
                <div className="text-[12px] not-italic mt-1" style={{ color: "var(--text-muted)" }}>
                  — DSE Listing Regulations
                </div>
              </blockquote>
              <h2 className="text-[22px] font-semibold tracking-tight pt-2" style={{ color: "var(--text-primary)" }}>
                What this means for investors
              </h2>
              <p>
                The filing may impact {post.code}'s short-term price discovery. Retail investors
                should consult their brokers or refer to the company's audited statements available
                on the DSE website before acting on this information.
              </p>
              <div
                className="rounded-xl p-5"
                style={{ background: "rgb(var(--ov) / 0.04)", border: "1px solid rgb(var(--ov) / 0.06)" }}
              >
                <div className="text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--text-muted)" }}>
                  Attached document
                </div>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-5 h-5 shrink-0" style={{ color: "var(--primary)" }} />
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                        {post.code}_{post.type.replace(/\s+/g, "_")}_{post.date.replace(/\s+/g, "")}.pdf
                      </div>
                      <div className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                        Official filing · 1.2 MB
                      </div>
                    </div>
                  </div>
                  <button
                    className="h-9 px-4 rounded-full text-[12.5px] font-semibold"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Article actions */}
            <div className="mt-8 pt-6 flex items-center justify-between gap-3 flex-wrap" style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
              <div className="flex items-center gap-1.5">
                <ActionBtn icon={<Share2 className="w-3.5 h-3.5" />} label="Share" />
                <ActionBtn icon={<Bookmark className="w-3.5 h-3.5" />} label="Save" />
                <ActionBtn icon={<Printer className="w-3.5 h-3.5" />} label="Print" />
              </div>
              <Link
                to="/company/$ticker"
                params={{ ticker: post.code }}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full text-[13px] font-semibold"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Open {post.code} <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            <div
              className="rounded-xl p-5"
              style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-muted)" }}>
                Recent posts
              </div>
              <ul className="space-y-4">
                {sidebarPosts.map((r) => (
                  <li key={r.id}>
                    <Link
                      to="/news_/$id"
                      params={{ id: r.id }}
                      className="flex gap-3 group"
                    >
                      <div
                        className="w-16 h-16 rounded-lg overflow-hidden shrink-0"
                        style={{ border: "1px solid rgb(var(--ov) / 0.06)" }}
                      >
                        <img src={imageFor(r)} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div
                          className="text-[13px] font-semibold leading-[1.35] line-clamp-2 group-hover:text-[color:var(--primary)] transition"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {r.summary}
                        </div>
                        <div className="text-[10.5px] mt-1" style={{ color: "var(--text-muted)" }}>
                          {r.code} · {r.date}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
                {sidebarPosts.length === 0 && (
                  <li className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    No recent posts.
                  </li>
                )}
              </ul>
            </div>

            {/* CTA card */}
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              <div className="text-[15px] font-semibold leading-[1.35] mb-2">
                Stay ahead of the market
              </div>
              <div className="text-[12.5px] opacity-90 mb-4">
                Get every price-sensitive filing in your inbox, minutes after it hits the exchange.
              </div>
              <Link
                to="/news"
                className="inline-flex items-center justify-center h-9 px-4 rounded-full text-[12.5px] font-semibold w-full"
                style={{ background: "rgba(255,255,255,0.14)", color: "var(--primary-foreground)" }}
              >
                Subscribe
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {/* Related posts */}
      <section className="max-w-[1180px] mx-auto px-6 pb-16">
        <div className="pt-10" style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
          <div className="flex items-end justify-between mb-6 gap-3 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] mb-1" style={{ color: "var(--text-muted)" }}>
                More from the newsroom
              </div>
              <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight">
                Blogs
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-1 text-[12.5px] font-semibold"
              style={{ color: "var(--primary)" }}
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {relatedCards.map((r) => {
              const m = typeMeta[r.type];
              return (
                <Link
                  key={r.id}
                  to="/news_/$id"
                  params={{ id: r.id }}
                  className="flex gap-4 p-3 rounded-xl group transition"
                  style={{
                    background: "rgb(var(--surface-rgb) / 0.6)",
                    border: "1px solid rgb(var(--ov) / 0.06)",
                  }}
                >
                  <div
                    className="w-[140px] h-[100px] rounded-lg overflow-hidden shrink-0"
                    style={{ border: "1px solid rgb(var(--ov) / 0.06)" }}
                  >
                    <img
                      src={imageFor(r)}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span
                        className="text-[10px] uppercase tracking-[0.16em] font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: m.bg, color: m.color }}
                      >
                        {r.type}
                      </span>
                      <span className="text-[11px] tnum uppercase" style={{ color: "var(--text-muted)" }}>
                        {r.date}
                      </span>
                    </div>
                    <div
                      className="text-[14.5px] font-semibold leading-[1.4] line-clamp-2 group-hover:text-[color:var(--primary)] transition"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {r.summary}
                    </div>
                    <div
                      className="text-[12.5px] leading-[1.5] mt-1.5 line-clamp-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {r.code} · {r.sector}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Newsroom
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium transition"
      style={{
        background: "rgb(var(--ov) / 0.04)",
        border: "1px solid rgb(var(--ov) / 0.06)",
        color: "var(--text-secondary)",
      }}
    >
      {icon} {label}
    </button>
  );
}
