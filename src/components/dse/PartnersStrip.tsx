const PARTNERS: { name: string; domain: string }[] = [
  { name: "Bangladesh Securities and Exchange Commission", domain: "sec.gov.bd" },
  { name: "Bangladesh Bank", domain: "bb.org.bd" },
  { name: "Central Depository Bangladesh Limited", domain: "cdbl.com.bd" },
  { name: "Global Reporting Initiative", domain: "globalreporting.org" },
  { name: "International Finance Corporation", domain: "ifc.org" },
  { name: "Sustainable Stock Exchanges Initiative", domain: "sseinitiative.org" },
  { name: "World Federation of Exchanges", domain: "world-exchanges.org" },
  { name: "South Asian Federation of Exchanges", domain: "safe-asia.com" },
];

export function PartnersStrip() {
  const token = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY;

  return (
    <section
      className="border-t border-b"
      style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      aria-labelledby="partners-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--brand-600)" }}
            >
              Sustainability & Partnerships
            </div>
            <h2
              id="partners-heading"
              className="mt-1 text-[20px] md:text-[24px] font-semibold leading-tight"
              style={{ color: "var(--ink)" }}
            >
              Institutions DSE works with
            </h2>
            <p className="mt-1 text-[13px]" style={{ color: "var(--text-secondary)" }}>
              Regulators, depositories and global partners supporting Bangladesh's capital market.
            </p>
          </div>
          <a
            href="/sustainability"
            className="hidden md:inline-flex text-[12.5px] font-semibold"
            style={{ color: "var(--brand-600)" }}
          >
            View sustainability →
          </a>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {PARTNERS.map((p) => (
            <li
              key={p.domain}
              title={p.name}
              className="h-16 flex items-center justify-center px-3 rounded-md transition hover:opacity-100 opacity-80"
              style={{ background: "var(--bg)", border: "1px solid var(--line)" }}
            >
              {token ? (
                <img
                  src={`https://img.logo.dev/${p.domain}?token=${token}&size=120&format=png`}
                  alt={`${p.name} logo`}
                  className="max-h-10 max-w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <span
                  className="text-[11px] font-semibold text-center leading-tight"
                  style={{ color: "var(--ink)" }}
                >
                  {p.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
