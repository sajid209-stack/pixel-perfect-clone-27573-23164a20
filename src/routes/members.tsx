import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Mail,
  ShieldCheck,
  Building2,
  Star,
  ArrowUpRight,
  Filter,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Member Brokers — Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Find a licensed DSE trading member. Browse brokerage houses with branch coverage, service tier and contact details.",
      },
      { property: "og:title", content: "DSE Member Brokers" },
      {
        property: "og:description",
        content: "Licensed trading members of the Dhaka Stock Exchange.",
      },
    ],
  }),
  component: MembersPage,
});

type Tier = "Full service" | "Discount" | "Institutional";

type Member = {
  id: string;
  name: string;
  code: string;
  city: "Dhaka" | "Chittagong" | "Sylhet" | "Khulna" | "Rajshahi";
  branches: number;
  tier: Tier;
  rating: number;
  founded: number;
  services: string[];
  phone: string;
  email: string;
  website: string;
  featured?: boolean;
};

const members: Member[] = [
  {
    id: "m1",
    name: "LankaBangla Securities",
    code: "TREC-042",
    city: "Dhaka",
    branches: 23,
    tier: "Full service",
    rating: 4.7,
    founded: 1997,
    services: ["Equity", "Mutual fund", "Margin", "Advisory", "Mobile app"],
    phone: "+880 9612 116666",
    email: "info@lbsbd.com",
    website: "lankabangla.com",
    featured: true,
  },
  {
    id: "m2",
    name: "BRAC EPL Stock Brokerage",
    code: "TREC-018",
    city: "Dhaka",
    branches: 15,
    tier: "Full service",
    rating: 4.6,
    founded: 2009,
    services: ["Equity", "Research", "Institutional", "Mobile app"],
    phone: "+880 2 9852442",
    email: "info@bracepl.com",
    website: "bracepl.com",
    featured: true,
  },
  {
    id: "m3",
    name: "IDLC Securities",
    code: "TREC-076",
    city: "Dhaka",
    branches: 12,
    tier: "Full service",
    rating: 4.5,
    founded: 2006,
    services: ["Equity", "Margin", "Advisory", "Portfolio"],
    phone: "+880 2 9514304",
    email: "info@idlc.com",
    website: "idlc.com",
  },
  {
    id: "m4",
    name: "City Brokerage",
    code: "TREC-104",
    city: "Dhaka",
    branches: 8,
    tier: "Full service",
    rating: 4.3,
    founded: 2010,
    services: ["Equity", "Mutual fund", "Mobile app"],
    phone: "+880 2 9569810",
    email: "info@citybrokerage.com.bd",
    website: "citybrokerage.com.bd",
  },
  {
    id: "m5",
    name: "EBL Securities",
    code: "TREC-188",
    city: "Dhaka",
    branches: 11,
    tier: "Full service",
    rating: 4.4,
    founded: 2009,
    services: ["Equity", "Margin", "Research", "Custody"],
    phone: "+880 2 9569480",
    email: "info@eblsecurities.com",
    website: "eblsecurities.com",
  },
  {
    id: "m6",
    name: "UCB Stock Brokerage",
    code: "TREC-211",
    city: "Dhaka",
    branches: 9,
    tier: "Discount",
    rating: 4.1,
    founded: 2013,
    services: ["Equity", "Low commission", "Mobile app"],
    phone: "+880 2 9551105",
    email: "info@ucbstock.com",
    website: "ucbstock.com",
  },
  {
    id: "m7",
    name: "MTB Securities",
    code: "TREC-159",
    city: "Dhaka",
    branches: 6,
    tier: "Discount",
    rating: 4.0,
    founded: 2010,
    services: ["Equity", "Low commission"],
    phone: "+880 2 8332297",
    email: "info@mtbsecurities.com",
    website: "mtbsecurities.com",
  },
  {
    id: "m8",
    name: "Royal Capital",
    code: "TREC-067",
    city: "Chittagong",
    branches: 5,
    tier: "Full service",
    rating: 4.2,
    founded: 1999,
    services: ["Equity", "Advisory", "Margin"],
    phone: "+880 31 2517901",
    email: "info@royalcapitalbd.com",
    website: "royalcapitalbd.com",
  },
  {
    id: "m9",
    name: "PFI Securities",
    code: "TREC-091",
    city: "Chittagong",
    branches: 4,
    tier: "Full service",
    rating: 4.0,
    founded: 2001,
    services: ["Equity", "Mutual fund", "Custody"],
    phone: "+880 31 2510700",
    email: "info@pfisecurities.com",
    website: "pfisecurities.com",
  },
  {
    id: "m10",
    name: "AAA Finance & Investment",
    code: "TREC-008",
    city: "Dhaka",
    branches: 7,
    tier: "Institutional",
    rating: 4.4,
    founded: 1994,
    services: ["Institutional", "Research", "Custody", "Block deals"],
    phone: "+880 2 9551414",
    email: "info@aaafinance.com",
    website: "aaafinance.com",
  },
  {
    id: "m11",
    name: "Prime Bank Securities",
    code: "TREC-128",
    city: "Sylhet",
    branches: 3,
    tier: "Full service",
    rating: 4.1,
    founded: 2010,
    services: ["Equity", "Margin", "Advisory"],
    phone: "+880 821 711234",
    email: "info@primebanksec.com",
    website: "primebanksec.com",
  },
  {
    id: "m12",
    name: "Standard Capital",
    code: "TREC-053",
    city: "Khulna",
    branches: 2,
    tier: "Discount",
    rating: 3.9,
    founded: 2005,
    services: ["Equity", "Low commission"],
    phone: "+880 41 2830501",
    email: "info@standardcapital.com.bd",
    website: "standardcapital.com.bd",
  },
];

const cities = ["All", "Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi"] as const;
const tiers = ["All", "Full service", "Discount", "Institutional"] as const;

const tierMeta: Record<Tier, { bg: string; fg: string; border: string }> = {
  "Full service": {
    bg: "rgba(16,240,160,0.10)",
    fg: "var(--green-up)",
    border: "rgba(16,240,160,0.30)",
  },
  Discount: {
    bg: "rgba(116,170,255,0.10)",
    fg: "#74AAFF",
    border: "rgba(116,170,255,0.30)",
  },
  Institutional: {
    bg: "rgba(201,168,76,0.12)",
    fg: "#C9A84C",
    border: "rgba(201,168,76,0.30)",
  },
};

function MembersPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<(typeof cities)[number]>("All");
  const [tier, setTier] = useState<(typeof tiers)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      if (city !== "All" && m.city !== city) return false;
      if (tier !== "All" && m.tier !== tier) return false;
      if (q && !(m.name.toLowerCase().includes(q) || m.code.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, city, tier]);

  const stats = useMemo(
    () => ({
      total: members.length,
      branches: members.reduce((a, m) => a + m.branches, 0),
      cities: new Set(members.map((m) => m.city)).size,
      avgRating: (members.reduce((a, m) => a + m.rating, 0) / members.length).toFixed(1),
    }),
    [],
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav />

      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.22em] mb-5"
            style={{
              background: "rgba(16,240,160,0.08)",
              border: "1px solid rgba(16,240,160,0.25)",
              color: "var(--green-up)",
            }}
          >
            <ShieldCheck className="w-3 h-3" />
            Licensed members
          </div>
          <h1
            className="text-[44px] md:text-[56px] leading-[1.04] tracking-[-0.02em] font-semibold max-w-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            Find a trading member you can trust.
          </h1>
          <p
            className="mt-4 text-[16px] max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Every brokerage house listed here holds an active Trading Right Entitlement Certificate
            from the Dhaka Stock Exchange. Compare service tiers, branch coverage and contact details
            before you open a BO account.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          {[
            { label: "Active members", value: stats.total, icon: Building2 },
            { label: "Combined branches", value: stats.branches, icon: MapPin },
            { label: "Cities covered", value: stats.cities, icon: Globe },
            { label: "Avg. rating", value: stats.avgRating, icon: Star },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="p-5 rounded-2xl"
              style={{
                background: "rgb(var(--surface-rgb) / 0.55)",
                border: "1px solid rgb(var(--ov) / 0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <s.icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              </div>
              <div
                className="text-[28px] font-semibold tnum tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {s.value}
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.18em] mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-[1440px] mx-auto px-6 pt-2 pb-6">
        <div
          className="sticky top-[88px] z-30 p-3 rounded-2xl flex flex-col lg:flex-row gap-3 lg:items-center"
          style={{
            background: "rgb(var(--surface-rgb) / 0.7)",
            backdropFilter: "blur(18px) saturate(180%)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 h-10 rounded-xl flex-1"
            style={{
              background: "rgb(var(--ov) / 0.04)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by broker name or TREC code…"
              className="flex-1 bg-transparent outline-none text-[13.5px] placeholder:opacity-60"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <div className="flex gap-1 flex-wrap">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className="relative px-3 h-8 rounded-full text-[12px] font-medium transition"
                  style={{
                    color: city === c ? "#07090A" : "var(--text-secondary)",
                  }}
                >
                  {city === c && (
                    <motion.span
                      layoutId="memberCityPill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--green-up)" }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-1 flex-wrap">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className="relative px-3 h-8 rounded-full text-[12px] font-medium transition"
                style={{
                  color: tier === t ? "var(--text-primary)" : "var(--text-muted)",
                  background:
                    tier === t ? "rgb(var(--ov) / 0.08)" : "transparent",
                  border:
                    tier === t
                      ? "1px solid rgb(var(--ov) / 0.10)"
                      : "1px solid transparent",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-5">
          <div className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            Showing <span style={{ color: "var(--text-primary)" }}>{filtered.length}</span> of{" "}
            {members.length} members
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((m, i) => {
              const meta = tierMeta[m.tier];
              return (
                <motion.article
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  className="group p-5 rounded-2xl flex flex-col gap-4 transition cursor-pointer"
                  style={{
                    background: "rgb(var(--surface-rgb) / 0.55)",
                    border: "1px solid rgb(var(--ov) / 0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(16,240,160,0.25)";
                    e.currentTarget.style.background = "rgb(var(--surface-rgb) / 0.75)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgb(var(--ov) / 0.06)";
                    e.currentTarget.style.background = "rgb(var(--surface-rgb) / 0.55)";
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] uppercase tracking-[0.22em] tnum"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {m.code}
                        </span>
                        {m.featured && (
                          <span
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-[0.18em]"
                            style={{
                              background: "rgba(201,168,76,0.12)",
                              color: "#C9A84C",
                              border: "1px solid rgba(201,168,76,0.30)",
                            }}
                          >
                            <Award className="w-2.5 h-2.5" />
                            Featured
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-[16px] font-semibold leading-tight truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {m.name}
                      </h3>
                    </div>
                    <div
                      className="px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
                      style={{
                        background: meta.bg,
                        color: meta.fg,
                        border: `1px solid ${meta.border}`,
                      }}
                    >
                      {m.tier}
                    </div>
                  </div>

                  <div
                    className="grid grid-cols-3 gap-3 pt-3"
                    style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}
                  >
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-[0.18em] mb-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        HQ
                      </div>
                      <div
                        className="text-[13px] font-medium flex items-center gap-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <MapPin className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
                        {m.city}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-[0.18em] mb-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Branches
                      </div>
                      <div
                        className="text-[13px] font-medium tnum"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {m.branches}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-[0.18em] mb-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Rating
                      </div>
                      <div
                        className="text-[13px] font-medium tnum flex items-center gap-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <Star
                          className="w-3 h-3"
                          style={{ color: "#C9A84C", fill: "#C9A84C" }}
                        />
                        {m.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {m.services.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 rounded-md text-[10.5px]"
                        style={{
                          background: "rgb(var(--ov) / 0.04)",
                          color: "var(--text-secondary)",
                          border: "1px solid rgb(var(--ov) / 0.06)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center justify-between pt-3 mt-auto"
                    style={{ borderTop: "1px solid rgb(var(--ov) / 0.06)" }}
                  >
                    <div className="flex gap-3 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Call
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Email
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Site
                      </span>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition"
                      style={{ color: "var(--green-up)" }}
                    >
                      View profile
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div
            className="mt-10 p-12 text-center rounded-2xl"
            style={{
              background: "rgb(var(--surface-rgb) / 0.45)",
              border: "1px dashed rgb(var(--ov) / 0.10)",
              color: "var(--text-muted)",
            }}
          >
            No member matches the current filters.
          </div>
        )}
      </section>

      {/* Become a member CTA */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="p-10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,240,160,0.10) 0%, rgba(116,170,255,0.06) 100%)",
            border: "1px solid rgba(16,240,160,0.20)",
          }}
        >
          <div className="max-w-xl">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-2"
              style={{ color: "var(--green-up)" }}
            >
              Apply for TREC
            </div>
            <h3
              className="text-[26px] md:text-[30px] font-semibold leading-tight tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Want to become a DSE trading member?
            </h3>
            <p
              className="mt-2 text-[14px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Review eligibility, capital adequacy and the application process for a Trading Right
              Entitlement Certificate.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[13.5px] font-semibold cursor-pointer hover:scale-[1.02] transition"
            style={{
              background: "var(--green-up)",
              color: "#07090A",
              boxShadow: "0 6px 20px -6px rgba(16,240,160,0.55)",
            }}
          >
            Membership guide
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
