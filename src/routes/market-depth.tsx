import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { companyIndex } from "@/components/dse/data";

export const Route = createFileRoute("/market-depth")({
  head: () => ({
    meta: [
      { title: "Market Depth | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Top 10 buy and sell orders per instrument on the Dhaka Stock Exchange.",
      },
      { property: "og:title", content: "Market Depth | DSE" },
      {
        property: "og:description",
        content: "Order book depth — top 10 buy and sell orders per instrument.",
      },
    ],
  }),
  component: MarketDepthPage,
});

function MarketDepthPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const matches = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return companyIndex
      .filter((c) => c.code.includes(q) || c.name.toUpperCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const rows = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <h1
          className="text-[26px] md:text-[32px] font-semibold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {t("Market Depth")}
        </h1>
        <p
          className="mt-2 text-[14px] md:text-[15px] leading-[1.6] max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {t(
            "Top 10 buy and sell orders for any listed instrument on the Dhaka Stock Exchange.",
          )}
        </p>
        <div
          className="mt-2 text-[11px]"
          style={{ color: "var(--text-secondary)" }}
        >
          {t(
            "Sample data for demonstration — live data will connect to the DSE API",
          )}
        </div>

        <div
          className="mt-5 rounded-md p-4 text-[13px] leading-[1.6]"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          To get live top 10 buy and sell order, investors are requested to
          register with DSE-Mobile app or M-invest (Laptop/desktop).
        </div>

        {/* Instrument selector */}
        <div className="mt-6">
          <label
            className="block text-[12px] mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("Please select an instrument")}
          </label>
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              value={selected ?? query}
              onChange={(e) => {
                setSelected(null);
                setQuery(e.target.value);
              }}
              placeholder={t("Search trading code or company name")}
              className="w-full pl-9 pr-3 py-2 rounded-md text-[14px] outline-none"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
            {!selected && matches.length > 0 && (
              <div
                className="absolute z-10 mt-1 w-full rounded-md overflow-hidden"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                }}
              >
                {matches.map((m) => (
                  <button
                    key={m.code}
                    onClick={() => {
                      setSelected(m.code);
                      setQuery("");
                    }}
                    className="block w-full text-left px-3 py-2 text-[13px] hover:opacity-80"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span className="font-medium">{m.code}</span>
                    <span
                      className="ml-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {m.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {selected && (
            <div
              className="mt-2 text-[12px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("Showing depth for")}{" "}
              <span
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {selected}
              </span>
            </div>
          )}
        </div>

        {/* Order book */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BUY */}
          <div
            className="rounded-md overflow-hidden"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="px-4 py-2.5 text-[13px] font-medium flex items-center justify-between"
              style={{
                background: "var(--surface-2)",
                borderBottom: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <span>{t("BUY")}</span>
              <span
                className="text-[11px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {t("Top 10")}
              </span>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ color: "var(--text-secondary)" }}>
                  <th className="text-left px-4 py-2 font-normal text-[11px] uppercase tracking-wide">
                    #
                  </th>
                  <th className="text-right px-4 py-2 font-normal text-[11px] uppercase tracking-wide">
                    {t("Price")}
                  </th>
                  <th className="text-right px-4 py-2 font-normal text-[11px] uppercase tracking-wide">
                    {t("Volume")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((i) => (
                  <tr
                    key={i}
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <td
                      className="px-4 py-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {i}
                    </td>
                    <td
                      className="px-4 py-2 text-right tabular-nums"
                      style={{ color: "var(--text-muted)" }}
                    >
                      —
                    </td>
                    <td
                      className="px-4 py-2 text-right tabular-nums"
                      style={{ color: "var(--text-muted)" }}
                    >
                      —
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SELL */}
          <div
            className="rounded-md overflow-hidden"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="px-4 py-2.5 text-[13px] font-medium flex items-center justify-between"
              style={{
                background: "var(--surface-2)",
                borderBottom: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <span>{t("SELL")}</span>
              <span
                className="text-[11px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {t("Top 10")}
              </span>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ color: "var(--text-secondary)" }}>
                  <th className="text-left px-4 py-2 font-normal text-[11px] uppercase tracking-wide">
                    #
                  </th>
                  <th className="text-right px-4 py-2 font-normal text-[11px] uppercase tracking-wide">
                    {t("Price")}
                  </th>
                  <th className="text-right px-4 py-2 font-normal text-[11px] uppercase tracking-wide">
                    {t("Volume")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((i) => (
                  <tr
                    key={i}
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <td
                      className="px-4 py-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {i}
                    </td>
                    <td
                      className="px-4 py-2 text-right tabular-nums"
                      style={{ color: "var(--text-muted)" }}
                    >
                      —
                    </td>
                    <td
                      className="px-4 py-2 text-right tabular-nums"
                      style={{ color: "var(--text-muted)" }}
                    >
                      —
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="mt-3 inline-flex items-center gap-1.5 text-[11px]"
          style={{ color: "var(--text-muted)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--brand-600)" }}
          />
          {t("as provided by DSE")}
        </div>
      </main>
      <Footer />
    </div>
  );
}
