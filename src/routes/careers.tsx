import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Career Opportunity at DSE | Dhaka Stock Exchange" },
      { name: "description", content: "Career and internship opportunities at the Dhaka Stock Exchange." },
      { property: "og:title", content: "Career Opportunity at DSE" },
      { property: "og:description", content: "Career and internship opportunities at DSE." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            About DSE
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Career Opportunity at DSE
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Welcome to DSE Careers!
          </p>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-6">
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          The Dhaka Stock Exchange PLC. (DSE), premier Exchange of the country, is a demutualized and self-regulatory organization with a vision to be the leading exchange in the region and a key driver of economic growth with state-of-art technology. At DSE, we continuously upgrade ourselves and strive to provide world-class service to ensure highest level of confidence among stakeholders and to add value to Bangladesh's capital market. DSE is committed to contribute to the country's economic growth through creation of wealth, facilitating access to capital market and penetrating untapped market. DSE offers every employee a very good-natured and vibrant working environment, encouraging to bring out the best in every employee. DSE, in its HR mission for developing global standard professionals in capital market, intends to recruit the most brilliant and the brightest, energetic, self-motivated and innovative personalities who are expected to take part in the management of the Exchange in due course of time. If you are looking for a challenging career in the fast-growing financial market and thrive in a fast-paced environment, explore your options at DSE.
        </p>
        <div className="pt-2">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--brand-600)" }}>
            Career Opportunities
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            There is no vacancy.
          </p>
        </div>
        <div className="pt-2">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--brand-600)" }}>
            Internship Opportunities
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            As a DSE intern, you'll have the invaluable opportunity to immerse yourself in our organizational culture and gain firsthand experience of our business operations before you complete your studies. This hands-on experience can provide you with valuable insights and skills that can enhance your professional development. If you're eager to embark on this enriching journey, apply through the following link:{" "}
            <a
              href="https://career.dse.com.bd:8443"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--brand-600)" }}
            >
              https://career.dse.com.bd:8443
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
