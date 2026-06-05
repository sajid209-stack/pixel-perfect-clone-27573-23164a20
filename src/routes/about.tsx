import { createFileRoute } from "@tanstack/react-router";

import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "About the Dhaka Stock Exchange — Bangladesh's premier capital market since 1954. Board of directors, BICM, sustainability, careers and data API.",
      },
      { property: "og:title", content: "About | Dhaka Stock Exchange" },
      { property: "og:description", content: "Bangladesh's premier capital market, connecting investors and companies since 1954." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { label: "Founded", value: "1954" },
  { label: "Listed companies", value: "356" },
  { label: "Market cap", value: "৳ 7.1 Lakh Cr" },
];

const keyFacts = [
  { label: "Established", value: "1954", note: "Incorporated under the Companies Act" },
  { label: "Regulator", value: "BSEC", note: "Bangladesh Securities and Exchange Commission" },
  { label: "Trading technology", value: "Nasdaq", note: "X-stream INET platform" },
  { label: "Settlement", value: "T+2", note: "Rolling settlement cycle" },
];

const directors = [
  { name: "Prof. Dr. Hafij Ullah", role: "Chairman", cat: "Independent Director" },
  { name: "M. Shahjahan", role: "Managing Director & CEO", cat: "Management" },
  { name: "Md. Moniruzzaman", role: "Director", cat: "Shareholder Director" },
  { name: "Tarique Iqbal", role: "Director", cat: "Independent Director" },
  { name: "Rahela Begum", role: "Director", cat: "Government Nominee" },
  { name: "Asif Ibrahim", role: "Director", cat: "Shareholder Director" },
];

const press = [
  { date: "Jun 02, 2026", title: "DSE launches new investor education portal in partnership with BICM" },
  { date: "May 18, 2026", title: "DSE completes upgrade to Nasdaq X-stream INET version 12.1" },
  { date: "Apr 30, 2026", title: "DSE and CSE sign MoU on joint market surveillance" },
  { date: "Mar 15, 2026", title: "DSE Annual Report FY2025 published" },
  { date: "Feb 08, 2026", title: "DSE celebrates 72nd founding anniversary" },
];

function initials(name: string) {
  return name
    .replace(/Prof\.|Dr\.|Md\.|M\./g, "")
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function SectionHeading({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      {kicker && (
        <div className="text-[11px] uppercase tracking-[0.24em] mb-2" style={{ color: "var(--text-muted)" }}>
          {kicker}
        </div>
      )}
      <h2 className="text-[26px] md:text-[30px] font-semibold tracking-tight leading-[1.15]">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-[14px] max-w-[70ch]" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      {/* Hero */}
      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: "var(--text-muted)" }}>
            About DSE
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            About the Dhaka<br />Stock Exchange
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Bangladesh's premier capital market, connecting investors and companies since 1954.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {stats.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px]"
                style={{
                  background: "rgb(var(--ov) / 0.04)",
                  border: "1px solid rgb(var(--ov) / 0.08)",
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>{s.label}:</span>
                <span className="font-semibold tnum" style={{ color: "var(--text-primary)" }}>{s.value}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 py-12 space-y-14">
        {/* Overview */}
        <section>
          <SectionHeading title="Bangladesh's gateway to capital markets" />
          <div className="grid md:grid-cols-2 gap-6 text-[14.5px] leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
            <p>
              The Dhaka Stock Exchange PLC (DSE) is the principal stock exchange of Bangladesh,
              incorporated in 1954 and located at DSE Tower, Nikunja-2, Dhaka. Operating under the
              oversight of the Bangladesh Securities and Exchange Commission (BSEC), DSE provides a
              regulated marketplace for the trading of equities, bonds, mutual funds, and other
              financial instruments.
            </p>
            <p>
              DSE operates on technology provided by Nasdaq, running one of South Asia's most modern
              trading platforms. With over 356 listed companies and a combined market capitalisation
              exceeding ৳ 7 lakh crore, the exchange plays a central role in mobilising capital for
              Bangladesh's growing economy.
            </p>
          </div>
        </section>

        {/* Key facts */}
        <section>
          <SectionHeading title="Key facts" />
          <div className="grid sm:grid-cols-2 gap-4">
            {keyFacts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl p-6"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.6)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
                  {f.label}
                </div>
                <div className="mt-2 text-[24px] font-semibold tracking-tight">{f.value}</div>
                <div className="mt-1 text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
                  {f.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Board */}
        <section id="board" className="scroll-mt-32">
          <SectionHeading
            title="Board of Directors"
            subtitle="The DSE board comprises independent directors, shareholder directors, and government nominees as prescribed by the Demutualization Act 2013."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {directors.map((d) => (
              <div
                key={d.name}
                className="rounded-2xl p-6 flex items-start gap-4"
                style={{
                  background: "rgb(var(--surface-rgb) / 0.6)",
                  border: "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-semibold shrink-0"
                  style={{ background: "#0f1b3d", color: "#ffffff" }}
                >
                  {initials(d.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-[14.5px] font-semibold truncate">{d.name}</div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {d.role}
                  </div>
                  <span
                    className="inline-flex mt-2 px-2 h-5 items-center rounded-full text-[10.5px]"
                    style={{
                      background: "rgb(var(--ov) / 0.06)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {d.cat}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[12px]" style={{ color: "var(--text-muted)" }}>
            Full board composition and committee details available in the Annual Report.
          </div>
        </section>

        {/* Press */}
        <section id="press" className="scroll-mt-32">
          <SectionHeading title="Press releases" />
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            {press.map((p, i) => (
              <div
                key={p.title}
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid rgb(var(--ov) / 0.06)",
                }}
              >
                <span
                  className="text-[11px] tnum px-2 h-6 inline-flex items-center rounded-full shrink-0"
                  style={{
                    background: "rgb(var(--ov) / 0.05)",
                    color: "var(--text-muted)",
                  }}
                >
                  {p.date}
                </span>
                <div className="flex-1 text-[13.5px]">{p.title}</div>
                <a
                  href="#"
                  className="text-[12.5px] shrink-0"
                  style={{ color: "var(--green-up)" }}
                >
                  Read →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* BICM */}
        <section id="bicm" className="scroll-mt-32">
          <SectionHeading title="BICM — Bangladesh Institute of Capital Market" />
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <p className="text-[14.5px] leading-[1.75] max-w-[75ch]" style={{ color: "var(--text-secondary)" }}>
              The Bangladesh Institute of Capital Market (BICM) is the training and research arm of
              the Dhaka Stock Exchange. BICM offers professional certification programmes, investor
              education workshops, and capital market research for practitioners, regulators, and the
              investing public.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { l: "Established", v: "2010" },
                { l: "Location", v: "DSE Tower, Dhaka" },
              ].map((i) => (
                <span
                  key={i.l}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px]"
                  style={{
                    background: "rgb(var(--ov) / 0.04)",
                    border: "1px solid rgb(var(--ov) / 0.08)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }}>{i.l}:</span>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{i.v}</span>
                </span>
              ))}
            </div>
            <a
              href="https://www.bicm.org.bd"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 text-[13px]"
              style={{ color: "var(--green-up)" }}
            >
              Visit BICM website →
            </a>
          </div>
        </section>

        {/* Sustainability */}
        <section id="sustainability" className="scroll-mt-32">
          <SectionHeading title="Sustainability & ESG" />
          <p className="text-[14.5px] leading-[1.8] max-w-[75ch]" style={{ color: "var(--text-secondary)" }}>
            DSE is committed to promoting sustainable capital market practices in Bangladesh. The
            exchange has introduced ESG disclosure guidelines for listed companies, promotes green
            bond listings, and is a signatory to the UN Sustainable Stock Exchanges (SSE) initiative.
          </p>
          <div className="mt-3 text-[12px]" style={{ color: "var(--text-muted)" }}>
            Full sustainability report available in the Annual Report.
          </div>
        </section>

        {/* Careers */}
        <section id="careers" className="scroll-mt-32">
          <SectionHeading title="Careers at DSE" />
          <p className="text-[14.5px] leading-[1.8] max-w-[75ch]" style={{ color: "var(--text-secondary)" }}>
            DSE employs professionals across technology, market operations, surveillance, regulation,
            finance, and corporate affairs. Vacancies are published on this page and through the
            Bangladesh Public Service Commission where applicable.
          </p>
          <div
            className="mt-5 rounded-2xl p-5 text-[13px]"
            style={{
              background: "rgb(var(--surface-rgb) / 0.6)",
              border: "1px solid rgb(var(--ov) / 0.06)",
              color: "var(--text-secondary)",
            }}
          >
            No positions currently advertised. Check back for updates or send a speculative
            application to{" "}
            <a href="mailto:hr@dsebd.org" style={{ color: "var(--green-up)" }}>
              hr@dsebd.org
            </a>
            .
          </div>
        </section>

        {/* API */}
        <section id="api" className="scroll-mt-32">
          <SectionHeading title="Market data & API access" />
          <p className="text-[14.5px] leading-[1.8] max-w-[75ch]" style={{ color: "var(--text-secondary)" }}>
            DSE provides real-time and historical market data to licensed data vendors, financial
            institutions, and technology partners. API access is available to approved subscribers
            under a data licensing agreement.
          </p>
          <ul className="mt-5 space-y-2 text-[13.5px]" style={{ color: "var(--text-secondary)" }}>
            <li>
              For data vendor licensing: contact{" "}
              <a href="mailto:dataservices@dsebd.org" style={{ color: "var(--green-up)" }}>
                dataservices@dsebd.org
              </a>
            </li>
            <li>
              For institutional data feeds: contact{" "}
              <a href="mailto:it@dsebd.org" style={{ color: "var(--green-up)" }}>
                it@dsebd.org
              </a>
            </li>
          </ul>
          <div className="mt-4 text-[12px]" style={{ color: "var(--text-muted)" }}>
            Public API documentation is in development. Contact us for enterprise arrangements.
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
