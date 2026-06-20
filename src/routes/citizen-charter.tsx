import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/citizen-charter")({
  head: () => ({
    meta: [
      { title: "Citizen Charter (সিটিজেন্‌স চার্টার) | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "ঢাকা স্টক এক্সচেঞ্জ পিএলসি-এর সিটিজেন্‌স চার্টার, ফোকাল পয়েন্ট কর্মকর্তা, নীতিমালা এবং পরিবীক্ষণ প্রতিবেদন।",
      },
      { property: "og:title", content: "সিটিজেন্‌স চার্টার | DSE" },
      { property: "og:description", content: "DSE Citizen Charter and related documents." },
    ],
  }),
  component: CitizenCharterPage,
});

const SECTIONS: { id: string; label: string }[] = [
  { id: "service-commitment", label: "সেবা প্রদান প্রতিশ্রুতি (সিটিজেন্‌স চার্টার)" },
  { id: "updated-charter", label: "হালনাগাদকৃত সিটিজেন্‌স চার্টার" },
  { id: "focal-point", label: "ফোকাল পয়েন্ট কর্মকর্তা/পরিবীক্ষণ কমিটি" },
  { id: "policies", label: "নীতিমালা/সভার সিদ্ধান্ত/কার্যবিবরণী" },
  { id: "reports", label: "ত্রৈমাসিক/ষান্মাসিক পরিবীক্ষণ/মূল্যায়ন প্রতিবেদন" },
];

function CitizenCharterPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            ঢাকা স্টক এক্সচেঞ্জ পিএলসি
          </div>
          <h1
            className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
            lang="bn"
          >
            Citizen Charter (সিটিজেন্‌স চার্টার)
          </h1>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-3" lang="bn">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href="#"
            data-cms={`citizenCharter.${s.id}`}
            className="flex items-center gap-3 p-4 hover:opacity-80 transition"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }}
          >
            <Download className="w-4 h-4 shrink-0" style={{ color: "var(--brand-600)" }} />
            <span className="text-[14px] md:text-[15px]" style={{ color: "var(--ink)" }}>
              {s.label}
            </span>
          </a>
        ))}
      </section>

      <Footer />
    </div>
  );
}
