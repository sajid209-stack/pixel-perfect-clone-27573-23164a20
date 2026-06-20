import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/about_/management")({
  head: () => ({
    meta: [
      { title: "DSE Management (MANCOM) | Dhaka Stock Exchange" },
      { name: "description", content: "Management Committee (MANCOM) of the Dhaka Stock Exchange PLC." },
      { property: "og:title", content: "DSE Management (MANCOM)" },
      { property: "og:description", content: "DSE MANCOM members." },
    ],
  }),
  component: ManagementPage,
});

type Member = { name: string; role: string; email?: string; bio?: string };

const MD_BIO =
  "Nuzhat Anwar has joined as the Managing Director of Dhaka Stock Exchange on December 28, 2025… She brings over two decades of experience in financial markets, banking, and development finance. Prior to her appointment, she worked at the International Finance Corporation (IFC)… She holds a Master's degree in Commerce (Finance) from the University of Dhaka.";

const MEMBERS: Member[] = [
  { name: "Nuzhat Anwar", role: "Managing Director", email: "md@dse.com.bd", bio: MD_BIO },
  { name: "Mohammad Asadur Rahman, FCS", role: "Chief Operating Officer", email: "coo@dse.com.bd" },
  { name: "Dr. Md. Asifur Rahman", role: "Chief Technology Officer", email: "cto@dse.com.bd" },
  { name: "Md. Samiul Islam", role: "GM & Chief Financial Officer (Acting)", email: "samiul.islam@dse.com.bd" },
  { name: "Md. Tariqul Islam", role: "GM, ICT Division", email: "tariqul.islam@dse.com.bd" },
  { name: "Mohammad Shafiqul Islam Bhuiyan, FCS", role: "GM, Regulatory Affairs Division & Chief Regulatory Officer (Acting)", email: "shafiqul.bhuiyan@dse.com.bd" },
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
            <a href={`mailto:${m.email}`} className="text-[12px] mt-1 block hover:underline break-all" style={{ color: "var(--text-secondary)" }}>
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

function ManagementPage() {
  const { t } = useLang();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("About DSE")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("DSE Management (MANCOM)")}
          </h1>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MEMBERS.map((m) => <ProfileCard key={m.name} m={m} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
