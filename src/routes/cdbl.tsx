import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/cdbl")({
  head: () => ({
    meta: [
      { title: "CDBL — Central Depository Bangladesh Limited | DSE" },
      { name: "description", content: "About the Central Depository Bangladesh Limited and how it supports settlement." },
      { property: "og:title", content: "CDBL — Central Depository Bangladesh Limited" },
      { property: "og:description", content: "About CDBL and how it supports settlement." },
    ],
  }),
  component: CdblPage,
});

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What do the initials CDBL stand for?",
    a: "Central Depository Bangladesh Limited.",
  },
  {
    q: "Why is a depository needed?",
    a: (
      <>
        The need for a depository arose from shortcomings in the present settlement system, resulting in:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>lengthy delays in delivery settlement and transfer of securities;</li>
          <li>tedious procedures for verification of securities and transfer deeds;</li>
          <li>considerable time involved in dispatching cash dividends and bonus shares;</li>
          <li>risk of damaged, lost, forged and duplicate securities;</li>
          <li>serious problems associated with physical custody;</li>
          <li>tedious procedure involved in pledging of physical securities to raise capital.</li>
        </ul>
      </>
    ),
  },
  {
    q: "What are the categories of Participants at CDBL?",
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Trading Participant</strong> — may only settle stock exchange trades and cannot maintain accounts on behalf of customers;
        </li>
        <li>
          <strong>Full Service Participant</strong> — a stock exchange member who may hold shares and operate accounts on behalf of customers;
        </li>
        <li>
          <strong>Custody Participant</strong> — may hold shares and operate accounts on behalf of customers but is not a stock exchange member;
        </li>
        <li>
          <strong>Settlement Agent Participant</strong> — may settle stock exchange trades on behalf of stock exchange members.
        </li>
      </ul>
    ),
  },
  {
    q: "What is Dematerialization (demat)?",
    a: "Dematerialization is a process by which physical certificates are converted into electronic form for credit to the investor's account in the depository. Once a security is eligible for holding in CDBL then all stock exchange trades must be settled through the depository.",
  },
];

function CdblPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Investor Services
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            CDBL — Central Depository Bangladesh Limited
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            About the Central Depository Bangladesh Limited and how it supports settlement.
          </p>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <ul className="space-y-2" data-cms="cdbl.faq">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className="rounded-md overflow-hidden"
                style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-4 py-3"
                  style={{ color: "var(--ink)" }}
                >
                  <span className="text-[14px] font-semibold">{item.q}</span>
                  <span className="text-[14px]" style={{ color: "var(--text-secondary)" }}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-[13.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 h-10 rounded-md text-[13px] font-semibold text-white"
            style={{ background: "var(--brand-600)" }}
          >
            CDBL Official Website →
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
