import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Bookmark, Clock, FileText, Printer, Share2 } from "lucide-react";
import { useMemo } from "react";

import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { buildFeed, getDisclosureById, typeMeta, type Disclosure } from "@/data/newsFeed";

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
    return {
      meta: [
        { title },
        { name: "description", content: post.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: post.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: NewsPostPage,
});

function NewsPostPage() {
  const { post } = Route.useLoaderData() as { post: Disclosure };
  const meta = typeMeta[post.type];

  const related = useMemo(
    () =>
      buildFeed()
        .filter((d) => d.id !== post.id && (d.code === post.code || d.type === post.type))
        .slice(0, 5),
    [post.id, post.code, post.type],
  );

  const readMins = Math.max(1, Math.round(post.body.split(/\s+/).length / 180));

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      <article className="max-w-[1120px] mx-auto px-6 pt-10 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] mb-8" style={{ color: "var(--text-muted)" }}>
          <Link to="/" className="hover:opacity-80">Home</Link>
          <span>/</span>
          <Link to="/news" className="hover:opacity-80">Newsroom</Link>
          <span>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{post.code}</span>
        </nav>

        {/* Header */}
        <header className="mb-10 pb-8" style={{ borderBottom: "1px solid rgb(var(--ov) / 0.08)" }}>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span
              className="text-[10.5px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded"
              style={{ background: meta.bg, color: meta.color }}
            >
              {post.type}
            </span>
            <Link
              to="/company/$ticker"
              params={{ ticker: post.code }}
              className="text-[12px] font-semibold hover:opacity-80"
              style={{ color: "var(--primary)" }}
            >
              {post.code}
            </Link>
            <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              {post.sector}
            </span>
            <span className="text-[12px] inline-flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              <Clock className="w-3 h-3" /> {post.date} · {post.time} · {readMins} min read
            </span>
          </div>

          <h1 className="text-[36px] md:text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] mb-5">
            {post.summary}
          </h1>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/company/$ticker"
              params={{ ticker: post.code }}
              className="group inline-flex items-center gap-3"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-[12px] font-bold tnum"
                style={{
                  background: "rgb(var(--ov) / 0.06)",
                  border: "1px solid rgb(var(--ov) / 0.08)",
                }}
              >
                {post.code.slice(0, 2)}
              </div>
              <div>
                <div className="text-[14px] font-semibold group-hover:text-[color:var(--primary)] transition">
                  {post.name}
                </div>
                <div className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                  Filed with DSE · {post.date}
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-1.5">
              <ActionBtn icon={<Share2 className="w-3.5 h-3.5" />} label="Share" />
              <ActionBtn icon={<Bookmark className="w-3.5 h-3.5" />} label="Save" />
              <ActionBtn icon={<Printer className="w-3.5 h-3.5" />} label="Print" />
            </div>
          </div>
        </header>

        {/* Body grid */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <div>
            <p className="text-[18px] leading-[1.65] mb-6 font-medium" style={{ color: "var(--text-primary)" }}>
              {post.summary}
            </p>
            <div className="text-[15px] leading-[1.8] space-y-5" style={{ color: "var(--text-secondary)" }}>
              <p>{post.body}</p>
              <p>
                This disclosure was submitted through the DSE electronic filing system in line with
                Bangladesh Securities and Exchange Commission (BSEC) rules. Investors are advised to
                review the accompanying documents before making trading decisions.
              </p>
              <blockquote
                className="pl-5 py-2 text-[16px] italic"
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
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" style={{ color: "var(--primary)" }} />
                    <div>
                      <div className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>
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

            <div className="mt-10 pt-6 flex items-center justify-between" style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Newsroom
              </Link>
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
          <aside className="space-y-6">
            <div
              className="rounded-xl p-5"
              style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-muted)" }}>
                Related filings
              </div>
              <ul className="space-y-4">
                {related.map((r) => {
                  const m = typeMeta[r.type];
                  return (
                    <li key={r.id}>
                      <Link
                        to="/news_/$id"
                        params={{ id: r.id }}
                        className="block group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[9.5px] uppercase tracking-[0.16em] font-semibold px-1.5 py-0.5 rounded"
                            style={{ background: m.bg, color: m.color }}
                          >
                            {r.type}
                          </span>
                          <span className="text-[10.5px]" style={{ color: "var(--text-muted)" }}>
                            {r.code} · {r.date}
                          </span>
                        </div>
                        <div
                          className="text-[13px] leading-[1.45] group-hover:text-[color:var(--primary)] transition line-clamp-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {r.summary}
                        </div>
                      </Link>
                    </li>
                  );
                })}
                {related.length === 0 && (
                  <li className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    No related filings.
                  </li>
                )}
              </ul>
            </div>

            <div
              className="rounded-xl p-5"
              style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-muted)" }}>
                About the company
              </div>
              <div className="text-[14px] font-semibold mb-1">{post.name}</div>
              <div className="text-[12px] mb-3" style={{ color: "var(--text-muted)" }}>
                {post.sector} · Listed on DSE
              </div>
              <Link
                to="/company/$ticker"
                params={{ ticker: post.code }}
                className="inline-flex items-center gap-1 text-[12.5px] font-semibold"
                style={{ color: "var(--primary)" }}
              >
                View company profile <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>
        </div>
      </article>

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
