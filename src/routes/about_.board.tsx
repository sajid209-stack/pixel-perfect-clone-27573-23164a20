import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/board")({
  head: () => ({
    meta: [
      { title: "Board of Directors | Dhaka Stock Exchange" },
      { name: "description", content: "Board of Directors of the Dhaka Stock Exchange PLC." },
      { property: "og:title", content: "Board of Directors — DSE" },
      { property: "og:description", content: "DSE Board of Directors." },
    ],
  }),
  component: BoardPage,
});

type Member = { name: string; role: string; email?: string; bio?: string };

const CHAIRMAN_BIO =
  "Mominul Islam, the Chairman of the Dhaka Stock Exchange PLC. (DSE) has over 25 years of experience in global and local financial institutions, excelling in leadership and strategic roles. He has a strong background in financial and capital markets, and has successfully led major business transformations… He founded CLink Advisory in 2024 and previously served as Managing Director & CEO of IPDC Finance Limited. His career also includes significant roles at Standard Chartered Bank and American Express Bank. He is a Six Sigma Black Belt.";

const MEMBERS: Member[] = [
  { name: "Mominul Islam", role: "Chairman", bio: CHAIRMAN_BIO },
  { name: "Maj Gen Mohammad Quamruzzaman (retd)", role: "Director" },
  { name: "Brigadier General Rashed", role: "Director" },
  { name: "Syed Hammadul Karim", role: "Director" },
  { name: "Mohammed Ishaque Miah", role: "Director" },
  { name: "Shahnaz Sultana", role: "Director" },
  { name: "Syeda Zakeerin Bakht Nasir", role: "Director" },
  { name: "Md. Shakil Rizvi", role: "Shareholder Director" },
  { name: "Mohammad Shahjahan", role: "Shareholder Director" },
  { name: "Richard D'Rozario", role: "Shareholder Director" },
  { name: "Minhaz Mannan Emon", role: "Director" },
  { name: "Wang Hai", role: "Director, SZSE" },
  { name: "Mohammad Asadur Rahman, FCS", role: "COO & MD Acting" },
];

function ProfileCard({ m }: { m: Member }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 2 }} className="p-5">
      <div className="flex items-start gap-4">
        <div
          className="w-16 h-16 shrink-0 flex items-center justify-center"
          style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 2 }}
          aria-hidden
        >
          <User className="w-7 h-7" style={{ color: "var(--text-secondary)" }} />
        </div>
        <div className="min-w-0">
          <div className="text-[15px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {m.name}
          </div>
          <div className="text-[12px] mt-1" style={{ color: "var(--brand-600)" }}>
            {t(m.role)}
          </div>
          {m.email && (
            <a href={`mailto:${m.email}`} className="text-[12px] mt-1 inline-block hover:underline" style={{ color: "var(--text-secondary)" }}>
              {m.email}
            </a>
          )}
        </div>
      </div>
      {m.bio && (
        <>
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold"
            style={{ color: "var(--brand-600)" }}
          >
            {open ? t("Hide bio") : t("Read bio")}
            <ChevronDown className="w-3.5 h-3.5 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none" }} />
          </button>
          {open && (
            <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {m.bio}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function BoardPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <TopBar />
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("Board of Directors")}
          </h1>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MEMBERS.map((m) => <ProfileCard key={m.name} m={m} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
