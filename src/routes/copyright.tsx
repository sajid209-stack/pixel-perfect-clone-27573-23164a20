import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/copyright")({
  head: () => ({
    meta: [
      { title: "Copyright | Dhaka Stock Exchange" },
      { name: "description", content: "Copyright notice for the Dhaka Stock Exchange website." },
      { property: "og:title", content: "Copyright — DSE" },
      { property: "og:description", content: "Copyright notice for the DSE website." },
    ],
  }),
  component: CopyrightPage,
});

const BULLETS = [
  `You may only print or download to a local hard disk extracts for your personal and non-commercial use only, but may not copy and reproduce the source code of the website or any of its contents anywhere.`,
  `You may not, except with our prior written permission, distribute, telecast, broadcast or commercially exploit the content in another website or TV channel. Nor may you transmit it or store it in any other website or other form of electronic retrieval system.`,
];

function CopyrightPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Legal
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Copyright
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Copyright notice for the Dhaka Stock Exchange website.
          </p>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-5">
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          This website and its contents are copyright of Dhaka Stock Exchange PLC. — © 2011 Dhaka Stock Exchange PLC. All rights reserved.
        </p>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          Any redistribution, telecast, broadcast or reproduction of part or all of the contents in any form is prohibited other than the following:
        </p>
        <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          {BULLETS.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          Infringement of copyright as laid down in the above notice may result in claims for damages and/or criminal liabilities.
        </p>
      </section>
      <Footer />
    </div>
  );
}
