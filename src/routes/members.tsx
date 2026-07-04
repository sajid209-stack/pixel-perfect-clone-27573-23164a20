import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "TREC Holders' Directory | Dhaka Stock Exchange" },
      { name: "description", content: "Directory of Dhaka Stock Exchange TREC Holders — 307 registered members." },
      { property: "og:title", content: "TREC Holders' Directory — DSE" },
      { property: "og:description", content: "Search DSE TREC Holders by name, location, or representative." },
    ],
  }),
  component: MembersPage,
});

// SAMPLE — replace at wiring (real dataset has 307 entries)
type Member = {
  name: string;
  trecNo: string;
  trecCode: string;
  address: string;
  district: string;
  area: string;
  repName: string;
  repDesignation: string;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
  website?: string;
  dealer: "Yes" | "No";
};

const DISTRICTS = [
  "Dhaka","Chattogram","Sylhet","Khulna","Rajshahi","Barishal","Rangpur","Mymensingh",
  "Cumilla","Narayanganj","Gazipur","Bogura","Jashore","Cox's Bazar","Faridpur",
  "Feni","Noakhali","Dinajpur","Pabna","Tangail","Kishoreganj","Manikganj","Munshiganj",
  "Narsingdi","Netrokona","Sherpur","Jamalpur","Habiganj","Moulvibazar","Sunamganj",
  "Chandpur","Lakshmipur","Brahmanbaria","Kushtia","Meherpur","Chuadanga","Jhenaidah",
  "Magura","Narail","Satkhira","Bagerhat","Pirojpur","Bhola","Patuakhali","Barguna",
  "Jhalokati","Nilphamari","Panchagarh","Thakurgaon",
];
const AREAS = [
  "Motijheel","Gulshan","Dhanmondi","Banani","Uttara","Mirpur","Mohakhali","Tejgaon",
  "Agrabad","Nasirabad","Halishahar","Zindabazar","Ambarkhana","Boyra","Khalishpur",
  "Shaheb Bazar","Naogaon Road","Bandar Bazar",
];

// SAMPLE — ~36 sample members across letters
const NAMES = [
  "A N F Management Company Limited","AB Investments Limited","Al-Muntaha Trading Limited",
  "Apex Investments Limited","Alpha Securities Ltd.","Anwar Securities Ltd.",
  "BLI Securities Limited","Bengal Investments Ltd.","B & B Enterprise Limited","BD Sunlife Securities Ltd.",
  "City Brokerage Limited","Continental Trading (Pvt) Ltd.","Crest Securities Ltd.","Chowdhury Equities Ltd.",
  "DBH Finance Ltd.","Delta Capital Ltd.","Dhaka Bank Securities Ltd.",
  "EBL Securities Ltd.","Eastern Bank Investments Ltd.","Eskayef Capital Ltd.",
  "First Securities Services Ltd.","Fareast Islami Securities Ltd.",
  "Green Delta Capital Ltd.","Grameen Capital Management Ltd.",
  "Habib Securities Ltd.","Harun Traders Ltd.",
  "IDLC Securities Ltd.","International Leasing Securities Ltd.","Islami Bank Capital Mgmt. Ltd.",
  "Janata Capital Ltd.","Jamuna Bank Securities Ltd.",
  "K-Securities & Consultants Ltd.","Karim Securities Ltd.",
  "LankaBangla Investments Ltd.","Lafarge Capital Ltd.",
  "Modern Securities Ltd.","Mutual Trust Securities Ltd.",
];

const CODES = ["001","002","003","007","010","012","015","018","021","024","027","033","040","045","051","058","063","070","076","082","088","094","101","108","115","122","129","136","143","150","157","164","171","178","185","192","199","206"];

function synthMember(name: string, i: number): Member {
  const district = DISTRICTS[i % DISTRICTS.length];
  const area = AREAS[i % AREAS.length];
  const code = CODES[i % CODES.length];
  return {
    name,
    trecNo: code,
    trecCode: code,
    address: `${100 + i}, ${area} C/A, ${district}`,
    district,
    area,
    repName: ["Md. Rahman","Farhana Islam","Kamrul Hasan","Nusrat Jahan","Tanvir Ahmed","Sabrina Akter"][i % 6],
    repDesignation: ["Chief Executive Officer","Managing Director","Director","CEO & Head of Brokerage"][i % 4],
    phone: `+880-2-955${(1000 + i).toString()}`,
    mobile: `+8801${700 + (i % 90)}${(100000 + i * 137).toString().slice(0, 6)}`,
    fax: `+880-2-956${(1000 + i).toString()}`,
    email: `info@${name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10)}.com`,
    website: i % 3 === 0 ? `https://www.${name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10)}.com` : undefined,
    dealer: i % 3 === 0 ? "No" : "Yes",
  };
}

const MEMBERS: Member[] = NAMES.map(synthMember);

// SAMPLE — ~15 sample web-links rows of ~75
const WEB_LINKS: { serial: number; trecNo: string; company: string; dealer: "Yes" | "No"; url: string }[] =
  MEMBERS.slice(0, 15).map((m, i) => ({
    serial: i + 1,
    trecNo: m.trecNo,
    company: m.name,
    dealer: m.dealer,
    url: "#",
  }));

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type TabKey = "alpha" | "location" | "search" | "web";
const TABS: { key: TabKey; label: string }[] = [
  { key: "alpha", label: "By Alphabetic Order" },
  { key: "location", label: "By Location" },
  { key: "search", label: "Search" },
  { key: "web", label: "Web Links" },
];

function MembersPage() {
  const [tab, setTab] = useState<TabKey>("alpha");
  const [active, setActive] = useState<Member | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div className="text-[11px] font-semibold uppercase mb-2" style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}>
            Dhaka Stock Exchange
          </div>
          <h1 className="text-[26px] md:text-[32px] font-semibold tracking-tight leading-[1.1]" style={{ color: "var(--ink)" }}>
            TREC Holders' Directory
          </h1>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            Total DSE TREC Holder: 307
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div role="tablist" className="flex flex-wrap gap-1 mb-6" style={{ borderBottom: "1px solid var(--line)" }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className="text-[13px] px-4 py-2 uppercase tracking-wider font-semibold"
              style={{
                borderBottom: tab === t.key ? "2px solid var(--brand-600)" : "2px solid transparent",
                color: tab === t.key ? "var(--brand-600)" : "var(--text-secondary)",
                background: "transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "alpha" && <AlphaTab members={MEMBERS} onOpen={setActive} />}
        {tab === "location" && <LocationTab members={MEMBERS} onOpen={setActive} />}
        {tab === "search" && <SearchTab members={MEMBERS} onOpen={setActive} />}
        {tab === "web" && <WebLinksTab />}
      </section>

      {active && <MemberModal member={active} onClose={() => setActive(null)} />}

      <Footer />
    </div>
  );
}

function AlphaTab({ members, onOpen }: { members: Member[]; onOpen: (m: Member) => void }) {
  const grouped = useMemo(() => {
    const g: Record<string, Member[]> = {};
    for (const m of members) {
      const L = m.name[0].toUpperCase();
      (g[L] ||= []).push(m);
    }
    for (const k of Object.keys(g)) g[k].sort((a, b) => a.name.localeCompare(b.name));
    return g;
  }, [members]);

  return (
    <div>
      <h2 className="text-[15px] font-semibold mb-3" style={{ color: "var(--ink)" }}>
        TREC Holder List by Alphabetical Order: 307
      </h2>
      <div className="mb-6 flex flex-wrap gap-1 p-3" style={{ border: "1px solid var(--line)", background: "var(--surface-2)" }}>
        {LETTERS.map((l) => {
          const has = !!grouped[l];
          return has ? (
            <a key={l} href={`#letter-${l}`} className="w-8 h-8 flex items-center justify-center text-[12px] font-semibold"
              style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--brand-600)", fontFamily: "var(--font-mono)" }}>
              {l}
            </a>
          ) : (
            <span key={l} className="w-8 h-8 flex items-center justify-center text-[12px]"
              style={{ border: "1px solid var(--line)", color: "var(--text-secondary)", opacity: 0.4, fontFamily: "var(--font-mono)" }}>
              {l}
            </span>
          );
        })}
      </div>

      <div className="space-y-8">
        {LETTERS.filter((l) => grouped[l]).map((l) => (
          <div key={l} id={`letter-${l}`} style={{ scrollMarginTop: 100 }}>
            <div className="mb-3 pb-2 flex items-baseline gap-3" style={{ borderBottom: "1px solid var(--line)" }}>
              <span className="text-[22px] font-semibold" style={{ color: "var(--brand-600)", fontFamily: "var(--font-mono)" }}>{l}</span>
              <span className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                {grouped[l].length} member{grouped[l].length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {grouped[l].map((m) => (
                <button key={m.trecNo + m.name} onClick={() => onOpen(m)} className="text-left text-[13px] hover:underline py-1"
                  style={{ color: "var(--ink)" }}>
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationTab({ members, onOpen }: { members: Member[]; onOpen: (m: Member) => void }) {
  const [district, setDistrict] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const results = useMemo(() => {
    if (!district && !area) return [];
    return members.filter((m) => (!district || m.district === district) && (!area || m.area === area));
  }, [district, area, members]);

  const selectStyle: React.CSSProperties = {
    border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)",
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <label className="flex-1 text-[12px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-secondary)" }}>
          District
          <select value={district} onChange={(e) => setDistrict(e.target.value)}
            className="w-full mt-1 px-3 py-2 text-[13px] font-normal normal-case tracking-normal" style={selectStyle}>
            <option value="">— Select district —</option>
            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <div className="text-[12px] font-semibold uppercase pb-2 md:pb-3" style={{ color: "var(--text-secondary)" }}>OR</div>
        <label className="flex-1 text-[12px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-secondary)" }}>
          Area
          <select value={area} onChange={(e) => setArea(e.target.value)}
            className="w-full mt-1 px-3 py-2 text-[13px] font-normal normal-case tracking-normal" style={selectStyle}>
            <option value="">— Select area —</option>
            {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
      </div>

      <ResultsList results={results} onOpen={onOpen} empty="Select a district or area to see TREC Holders." />
    </div>
  );
}

function SearchTab({ members, onOpen }: { members: Member[]; onOpen: (m: Member) => void }) {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");

  const results = useMemo(() => {
    const s1 = q1.trim().toLowerCase(), s2 = q2.trim().toLowerCase(), s3 = q3.trim().toLowerCase();
    if (!s1 && !s2 && !s3) return [];
    return members.filter((m) => {
      if (s1 && !(m.name.toLowerCase().includes(s1) || m.trecNo.includes(s1))) return false;
      if (s2 && !m.repName.toLowerCase().includes(s2)) return false;
      if (s3 && !(m.district.toLowerCase().includes(s3) || m.area.toLowerCase().includes(s3))) return false;
      return true;
    });
  }, [q1, q2, q3, members]);

  return (
    <div className="space-y-5">
      <SearchBlock label="Search TREC Holder by TREC No or Company Name" value={q1} onChange={setQ1} placeholder="Type TREC No or Company Name…" />
      <SearchBlock label="Search TREC Holder by Authorized Representative Name" value={q2} onChange={setQ2} placeholder="Type representative name…" />
      <SearchBlock label="Search TREC Holder's Offices by District or Location" value={q3} onChange={setQ3} placeholder="Type district or area…" />
      <div className="pt-2">
        <ResultsList results={results} onOpen={onOpen} empty="Enter a query above to search TREC Holders." />
      </div>
    </div>
  );
}

function SearchBlock({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="p-4" style={{ border: "1px solid var(--line)", background: "var(--surface-2)" }}>
      <div className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>{label}</div>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 text-[13px]"
        style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }} />
    </div>
  );
}

function ResultsList({ results, onOpen, empty }: { results: Member[]; onOpen: (m: Member) => void; empty: string }) {
  if (results.length === 0) {
    return <p className="text-[13px] p-4" style={{ color: "var(--text-secondary)", border: "1px dashed var(--line)" }}>{empty}</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {results.map((m) => (
        <button key={m.trecNo + m.name} onClick={() => onOpen(m)} className="text-left p-4 hover:shadow-sm transition"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
          <div className="text-[13.5px] font-semibold" style={{ color: "var(--ink)" }}>{m.name}</div>
          <div className="mt-1 text-[12px]" style={{ color: "var(--text-secondary)" }}>
            <span style={{ fontFamily: "var(--font-mono)" }}>TREC #{m.trecNo}</span> · {m.area}, {m.district}
          </div>
          <div className="mt-1 text-[12px]" style={{ color: "var(--text-secondary)" }}>
            {m.repName} — {m.repDesignation}
          </div>
        </button>
      ))}
    </div>
  );
}

function WebLinksTab() {
  return (
    <div>
      <h2 className="text-[15px] font-semibold mb-3" style={{ color: "var(--ink)" }}>DSE TREC Holder Website Links</h2>
      <div className="overflow-x-auto" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
        <table className="w-full text-[13px]" style={{ minWidth: 640 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
              {["Serial No.", "TREC Holder No.", "Company Name", "Dealer"].map((h, i) => (
                <th key={h} className={`px-3 py-2 text-[11px] font-semibold uppercase ${i === 2 ? "text-left" : i === 3 ? "text-center" : "text-right"}`}
                  style={{ letterSpacing: "0.1em", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WEB_LINKS.map((r, i) => (
              <tr key={r.serial} style={{ borderTop: "1px solid var(--line)", background: i % 2 === 1 ? "rgba(0,0,0,0.018)" : "transparent" }}>
                <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{r.serial}</td>
                <td className="px-3 py-2 tnum text-right" style={{ fontFamily: "var(--font-mono)" }}>{r.trecNo}</td>
                <td className="px-3 py-2">
                  <a href={r.url} target="_blank" rel="noreferrer" className="font-semibold hover:underline" style={{ color: "var(--brand-600)" }}>
                    {r.company}
                  </a>
                </td>
                <td className="px-3 py-2 text-center" style={{ fontFamily: "var(--font-mono)" }}>{r.dealer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const rows: [string, React.ReactNode][] = [
    ["Company Name", member.name],
    ["TREC Holder No.", <span style={{ fontFamily: "var(--font-mono)" }}>{member.trecNo}</span>],
    ["TREC Code", <span style={{ fontFamily: "var(--font-mono)" }}>{member.trecCode}</span>],
    ["Address", member.address],
    ["District", member.district],
    ["Area", member.area],
    ["Authorized Representative", `${member.repName} — ${member.repDesignation}`],
    ["Office Phone", <span style={{ fontFamily: "var(--font-mono)" }}>{member.phone}</span>],
    ["Mobile", <span style={{ fontFamily: "var(--font-mono)" }}>{member.mobile}</span>],
    ["Fax", <span style={{ fontFamily: "var(--font-mono)" }}>{member.fax}</span>],
    ["E-mail", <a href={`mailto:${member.email}`} className="hover:underline" style={{ color: "var(--brand-600)" }}>{member.email}</a>],
    ["Website", member.website ? <a href={member.website} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: "var(--brand-600)" }}>{member.website}</a> : <span style={{ color: "var(--text-secondary)" }}>—</span>],
    ["Dealer", member.dealer],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }} onClick={onClose}>
      <div className="max-w-[720px] w-full max-h-[85vh] overflow-y-auto" style={{ background: "var(--surface)", border: "1px solid var(--line)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between p-5" style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--brand-600)" }}>
              TREC Holder
            </div>
            <h3 className="text-[18px] font-semibold mt-1" style={{ color: "var(--ink)" }}>{member.name}</h3>
          </div>
          <button onClick={onClose} className="text-[20px] leading-none px-2" style={{ color: "var(--text-secondary)" }} aria-label="Close">×</button>
        </div>
        <dl className="divide-y" style={{ borderColor: "var(--line)" }}>
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 px-5 py-3" style={{ borderTop: "1px solid var(--line)" }}>
              <dt className="text-[12px] uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>{k}</dt>
              <dd className="text-[13px]" style={{ color: "var(--ink)" }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
