import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  Printer,
  Share2,
  Twitter,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";


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

const TAGS = ["Market", "Investment", "IPO", "Economy", "Trading", "Regulations"];

function NewsPostPage() {
  const { post } = Route.useLoaderData() as { post: Disclosure };
  const meta = typeMeta[post.type];
  const heroImage = imageFor(post);
  const [copied, setCopied] = useState(false);

  const feed = useMemo(() => buildFeed(), []);
  const sidebarPosts = useMemo(
    () => feed.filter((d) => d.id !== post.id && d.type === post.type).slice(0, 4),
    [feed, post.id, post.type],
  );
  const mostRead = useMemo(() => feed.filter((d) => d.id !== post.id).slice(0, 5), [feed, post.id]);
  const relatedCards = useMemo(() => feed.filter((d) => d.id !== post.id).slice(0, 4), [feed, post.id]);
  const readMins = Math.max(3, Math.round(post.body.split(/\s+/).length / 180) + 4);


  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      {/* Breadcrumb */}
      <div className="max-w-[1240px] mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: "var(--text-muted)" }}>
          <Link to="/" className="hover:opacity-80">Home</Link>
          <span>/</span>
          <Link to="/news" className="hover:opacity-80">News</Link>
          <span>/</span>
          <span className="hover:opacity-80">Market Insights</span>
          <span>/</span>
          <span style={{ color: "var(--text-secondary)" }} className="truncate max-w-[300px]">
            {post.code}
          </span>
        </nav>
      </div>

      {/* Article Hero */}
      <header className="max-w-[1240px] mx-auto px-6 pt-6">
        <div className="mb-4">
          <span
            className="text-[11px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded"
            style={{ background: meta.bg, color: meta.color }}
          >
            {post.type}
          </span>
        </div>

        <h1 className="text-[34px] md:text-[52px] font-semibold leading-[1.1] tracking-[-0.02em] max-w-[960px] mb-5">
          {post.summary}
        </h1>

        <p
          className="text-[17px] md:text-[19px] leading-[1.6] max-w-[820px] mb-7"
          style={{ color: "var(--text-secondary)" }}
        >
          {post.body.slice(0, 180)}
          {post.body.length > 180 ? "…" : ""}
        </p>

        <div className="flex items-center justify-between gap-4 flex-wrap pb-6" style={{ borderBottom: "1px solid rgb(var(--ov) / 0.08)" }}>
          <div className="flex items-center gap-4 flex-wrap text-[12.5px]" style={{ color: "var(--text-muted)" }}>
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> DSE Newsroom
            </span>
            <span>·</span>
            <span>Published {post.date}, 2026</span>
            <span>·</span>
            <span>Updated {post.date}, 2026</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readMins} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <ActionBtn icon={<Share2 className="w-3.5 h-3.5" />} label="Share" onClick={copyLink} />
            <ActionBtn icon={<Printer className="w-3.5 h-3.5" />} label="Print" onClick={() => window.print()} />
          </div>
        </div>
      </header>

      {/* Featured image */}
      <div className="max-w-[1240px] mx-auto px-6 pt-8">
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgb(var(--ov) / 0.06)" }}>
          <img src={heroImage} alt={`${post.name} — ${post.type}`} className="w-full object-cover" style={{ aspectRatio: "16/9" }} />
        </div>
      </div>

      {/* Main grid: TOC | Article | Sidebar */}
      <div className="max-w-[1240px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)_300px] gap-10">
        {/* Floating TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="text-[10.5px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-muted)" }}>
              On this page
            </div>
            <ul className="space-y-2">
              {TOC.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="block text-[12.5px] py-1 border-l-2 pl-3 transition"
                    style={{
                      borderColor: active === t.id ? "var(--primary)" : "rgb(var(--ov) / 0.1)",
                      color: active === t.id ? "var(--primary)" : "var(--text-secondary)",
                      fontWeight: active === t.id ? 600 : 400,
                    }}
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Article body */}
        <article className="min-w-0 max-w-[720px]">
          <div className="text-[16px] leading-[1.8] space-y-6" style={{ color: "var(--text-secondary)" }}>
            <section id="introduction">
              <h2 className="text-[26px] md:text-[30px] font-semibold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
                Introduction
              </h2>
              <p>{post.body}</p>
              <p>
                This report examines the filing in the wider context of Bangladesh's capital market
                and its implications for institutional and retail participants over the coming
                trading sessions.
              </p>
            </section>

            <section id="market-overview">
              <h2 className="text-[26px] md:text-[30px] font-semibold tracking-tight mb-4 mt-4" style={{ color: "var(--text-primary)" }}>
                Market Overview
              </h2>
              <p>
                The Dhaka Stock Exchange closed the previous session with mixed sentiment. Turnover
                remained above the 30-day average as investors positioned ahead of upcoming
                disclosures across the {post.sector.toLowerCase()} sector.
              </p>

              <h3 className="text-[19px] font-semibold mt-6 mb-3" style={{ color: "var(--text-primary)" }}>
                Sector positioning
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Broad-based buying interest across large-cap {post.sector} names</li>
                <li>Foreign portfolio flows tilted net-positive for the week</li>
                <li>Bond-market yields held stable in the mid-curve</li>
              </ul>

              <div
                className="rounded-lg p-4 mt-6 flex gap-3 items-start"
                style={{ background: "rgb(var(--primary-rgb, 47 90 62) / 0.06)", border: "1px solid rgb(var(--primary-rgb, 47 90 62) / 0.15)" }}
              >
                <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--primary)" }} />
                <div className="text-[13.5px]" style={{ color: "var(--text-primary)" }}>
                  <strong>Key takeaway:</strong> This disclosure is filed under BSEC's continuous
                  disclosure regime — investors should consult the attached PDF before trading.
                </div>
              </div>
            </section>

            <section id="analysis">
              <h2 className="text-[26px] md:text-[30px] font-semibold tracking-tight mb-4 mt-4" style={{ color: "var(--text-primary)" }}>
                Analysis
              </h2>
              <p>
                Analysts see the announcement as a directional signal for {post.code} over the
                medium term. The following table summarises consensus estimates gathered from local
                brokerage desks.
              </p>

              <ol className="list-decimal pl-6 space-y-2 mt-4">
                <li>Review the full filing on the DSE portal</li>
                <li>Compare against the company's most recent audited statements</li>
                <li>Assess sector-relative valuation before repositioning</li>
              </ol>

              <div className="overflow-x-auto mt-6 rounded-lg" style={{ border: "1px solid rgb(var(--ov) / 0.08)" }}>
                <table className="w-full text-[13px]">
                  <thead style={{ background: "rgb(var(--ov) / 0.04)" }}>
                    <tr>
                      <th className="text-left px-4 py-2.5 font-semibold" style={{ color: "var(--text-primary)" }}>Metric</th>
                      <th className="text-right px-4 py-2.5 font-semibold" style={{ color: "var(--text-primary)" }}>Previous</th>
                      <th className="text-right px-4 py-2.5 font-semibold" style={{ color: "var(--text-primary)" }}>Current</th>
                      <th className="text-right px-4 py-2.5 font-semibold" style={{ color: "var(--text-primary)" }}>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["EPS (BDT)", "3.42", "4.11", "+20.2%"],
                      ["NAV per share", "48.20", "52.75", "+9.4%"],
                      ["P/E ratio", "14.6x", "12.9x", "-1.7x"],
                      ["Dividend yield", "2.1%", "2.6%", "+0.5pp"],
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}>
                        <td className="px-4 py-2.5" style={{ color: "var(--text-primary)" }}>{row[0]}</td>
                        <td className="px-4 py-2.5 text-right tnum">{row[1]}</td>
                        <td className="px-4 py-2.5 text-right tnum">{row[2]}</td>
                        <td className="px-4 py-2.5 text-right tnum font-semibold" style={{ color: "var(--green-up)" }}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <figure className="mt-8">
                <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgb(var(--ov) / 0.06)" }}>
                  <img src={IMAGES[(hashCode(post.id) + 1) % IMAGES.length]} alt="Supporting visual" className="w-full object-cover" style={{ aspectRatio: "16/9" }} />
                </div>
                <figcaption className="text-[12px] italic mt-2" style={{ color: "var(--text-muted)" }}>
                  Trading floor activity during the reference session. Source: DSE.
                </figcaption>
              </figure>

              <blockquote
                className="pl-5 py-2 my-8 text-[19px] italic"
                style={{ borderLeft: "3px solid var(--primary)", color: "var(--text-primary)" }}
              >
                "All price-sensitive information must reach the market simultaneously and through
                official channels."
                <div className="text-[12px] not-italic mt-1" style={{ color: "var(--text-muted)" }}>
                  — DSE Listing Regulations
                </div>
              </blockquote>
            </section>

            <section id="key-statistics">
              <h2 className="text-[26px] md:text-[30px] font-semibold tracking-tight mb-4 mt-4" style={{ color: "var(--text-primary)" }}>
                Key Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  ["Turnover", "৳842 Cr"],
                  ["Volume", "18.4M"],
                  ["Trades", "112,347"],
                  ["Market Cap", "৳7.2L Cr"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg p-4" style={{ background: "rgb(var(--ov) / 0.04)", border: "1px solid rgb(var(--ov) / 0.06)" }}>
                    <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>{k}</div>
                    <div className="text-[18px] font-semibold tnum" style={{ color: "var(--text-primary)" }}>{v}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="conclusion">
              <h2 className="text-[26px] md:text-[30px] font-semibold tracking-tight mb-4 mt-4" style={{ color: "var(--text-primary)" }}>
                Conclusion
              </h2>
              <p>
                The filing reinforces {post.code}'s adherence to continuous disclosure obligations
                and provides investors with the information needed to make informed decisions.
                For the complete document and supplementary exhibits, download the attachment below.
              </p>

              {/* Download block */}
              <div
                className="rounded-xl p-5 mt-6"
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
                      <div className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>Official filing · 1.2 MB</div>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[12.5px] font-semibold"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
            <div className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-muted)" }}>Tags</div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="text-[12px] px-3 py-1 rounded-full"
                  style={{ background: "rgb(var(--ov) / 0.05)", border: "1px solid rgb(var(--ov) / 0.08)", color: "var(--text-secondary)" }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
            <div className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-muted)" }}>Share this article</div>
            <div className="flex flex-wrap gap-2">
              <ShareBtn icon={<Facebook className="w-3.5 h-3.5" />} label="Facebook" />
              <ShareBtn icon={<Linkedin className="w-3.5 h-3.5" />} label="LinkedIn" />
              <ShareBtn icon={<Twitter className="w-3.5 h-3.5" />} label="X" />
              <ShareBtn icon={<Copy className="w-3.5 h-3.5" />} label={copied ? "Copied!" : "Copy Link"} onClick={copyLink} />
              <ShareBtn icon={<Mail className="w-3.5 h-3.5" />} label="Email" />
            </div>
          </div>

          {/* Author card */}
          <div
            className="mt-8 rounded-xl p-5 flex gap-4 items-start"
            style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-[16px] font-bold shrink-0"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              DN
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>DSE Newsroom</div>
              <div className="text-[12px] mb-2" style={{ color: "var(--text-muted)" }}>
                Editorial Desk · Dhaka Stock Exchange
              </div>
              <p className="text-[13px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
                Coverage of listed-company disclosures, regulatory notices, and market
                intelligence from Bangladesh's premier capital-market venue.
              </p>
              <Link
                to="/news"
                className="inline-flex items-center gap-1 mt-3 text-[12.5px] font-semibold"
                style={{ color: "var(--primary)" }}
              >
                View all articles <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
            <h3 className="text-[18px] font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              Discussion
            </h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full h-10 px-3 rounded-lg text-[13px] bg-transparent"
                  style={{ border: "1px solid rgb(var(--ov) / 0.12)", color: "var(--text-primary)" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-10 px-3 rounded-lg text-[13px] bg-transparent"
                  style={{ border: "1px solid rgb(var(--ov) / 0.12)", color: "var(--text-primary)" }}
                />
              </div>
              <textarea
                placeholder="Add your comment"
                rows={4}
                className="w-full px-3 py-2 rounded-lg text-[13px] bg-transparent"
                style={{ border: "1px solid rgb(var(--ov) / 0.12)", color: "var(--text-primary)" }}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 h-9 px-5 rounded-full text-[12.5px] font-semibold"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Submit
              </button>
            </form>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24 self-start">
          <SidebarCard title="Search Articles">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="search"
                placeholder="Search…"
                className="w-full h-9 pl-9 pr-3 rounded-lg text-[12.5px] bg-transparent"
                style={{ border: "1px solid rgb(var(--ov) / 0.12)", color: "var(--text-primary)" }}
              />
            </div>
          </SidebarCard>

          <SidebarCard title="Categories">
            <ul className="space-y-1.5">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <a href="#" className="text-[13px] flex items-center justify-between py-1 hover:text-[color:var(--primary)]" style={{ color: "var(--text-secondary)" }}>
                    <span>{c}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </SidebarCard>

          <SidebarCard title="Latest Articles">
            <ul className="space-y-3.5">
              {sidebarPosts.slice(0, 3).map((r) => (
                <li key={r.id}>
                  <Link to="/news_/$id" params={{ id: r.id }} className="flex gap-2.5 group">
                    <div
                      className="w-14 h-14 rounded-md overflow-hidden shrink-0"
                      style={{ border: "1px solid rgb(var(--ov) / 0.06)" }}
                    >
                      <img src={imageFor(r)} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-semibold leading-[1.35] line-clamp-2 group-hover:text-[color:var(--primary)]" style={{ color: "var(--text-primary)" }}>
                        {r.summary}
                      </div>
                      <div className="text-[10.5px] mt-1" style={{ color: "var(--text-muted)" }}>{r.date}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </SidebarCard>

          <SidebarCard title="Most Read">
            <ol className="space-y-2.5">
              {mostRead.map((r, i) => (
                <li key={r.id} className="flex gap-3">
                  <span className="text-[18px] font-bold tnum leading-none" style={{ color: "var(--primary)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link to="/news_/$id" params={{ id: r.id }} className="text-[12.5px] font-medium leading-[1.4] line-clamp-2 hover:text-[color:var(--primary)]" style={{ color: "var(--text-primary)" }}>
                    {r.summary}
                  </Link>
                </li>
              ))}
            </ol>
          </SidebarCard>

          <SidebarCard title="Market Snapshot">
            <ul className="space-y-2">
              {SNAPSHOT.map((s) => (
                <li key={s.code} className="flex items-center justify-between text-[12.5px]">
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{s.code}</span>
                  <span className="tnum" style={{ color: "var(--text-secondary)" }}>{s.val}</span>
                  <span className="tnum font-semibold" style={{ color: s.up ? "var(--green-up)" : "var(--red-down)" }}>{s.chg}</span>
                </li>
              ))}
            </ul>
          </SidebarCard>

          <SidebarCard title="Downloads">
            <ul className="space-y-2">
              {["Annual Report", "Market Report", "IPO Prospectus"].map((d) => (
                <li key={d}>
                  <a href="#" className="flex items-center gap-2 text-[12.5px] py-1 hover:text-[color:var(--primary)]" style={{ color: "var(--text-secondary)" }}>
                    <Download className="w-3.5 h-3.5" /> {d}
                  </a>
                </li>
              ))}
            </ul>
          </SidebarCard>

          <div
            className="rounded-xl p-5"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            <div className="text-[14px] font-semibold mb-1.5">Newsletter</div>
            <div className="text-[12px] opacity-90 mb-3">Weekly digest of disclosures and market intelligence.</div>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full h-9 px-3 rounded-md text-[12.5px] mb-2 bg-white/15 placeholder:text-white/60"
              style={{ color: "var(--primary-foreground)", border: "1px solid rgba(255,255,255,0.2)" }}
            />
            <button
              className="inline-flex items-center justify-center h-9 px-4 rounded-md text-[12.5px] font-semibold w-full"
              style={{ background: "rgba(255,255,255,0.18)", color: "var(--primary-foreground)" }}
            >
              Subscribe
            </button>
          </div>
        </aside>
      </div>

      {/* Related articles */}
      <section className="max-w-[1240px] mx-auto px-6 pb-16">
        <div className="pt-10" style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Related Articles
            </h2>
            <Link to="/news" className="inline-flex items-center gap-1 text-[12.5px] font-semibold" style={{ color: "var(--primary)" }}>
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCards.map((r) => {
              const m = typeMeta[r.type];
              return (
                <Link
                  key={r.id}
                  to="/news_/$id"
                  params={{ id: r.id }}
                  className="rounded-xl overflow-hidden group flex flex-col"
                  style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={imageFor(r)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.16em] font-semibold px-1.5 py-0.5 rounded" style={{ background: m.bg, color: m.color }}>
                        {r.type}
                      </span>
                      <span className="text-[10.5px] tnum uppercase" style={{ color: "var(--text-muted)" }}>{r.date}</span>
                    </div>
                    <div className="text-[14px] font-semibold leading-[1.4] line-clamp-2 mb-1.5 group-hover:text-[color:var(--primary)]" style={{ color: "var(--text-primary)" }}>
                      {r.summary}
                    </div>
                    <div className="text-[12px] leading-[1.5] line-clamp-2 mb-3" style={{ color: "var(--text-secondary)" }}>
                      {r.code} · {r.sector}
                    </div>
                    <div className="mt-auto text-[12px] font-semibold inline-flex items-center gap-1" style={{ color: "var(--primary)" }}>
                      Read More <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Link to="/news" className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Newsroom
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}>
      <div className="text-[10.5px] uppercase tracking-[0.2em] mb-3 font-semibold" style={{ color: "var(--text-muted)" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium transition"
      style={{ background: "rgb(var(--ov) / 0.04)", border: "1px solid rgb(var(--ov) / 0.06)", color: "var(--text-secondary)" }}
    >
      {icon} {label}
    </button>
  );
}

function ShareBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12px] font-medium transition hover:opacity-80"
      style={{ background: "rgb(var(--ov) / 0.05)", border: "1px solid rgb(var(--ov) / 0.08)", color: "var(--text-primary)" }}
    >
      {icon} {label}
    </button>
  );
}
