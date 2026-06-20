import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Dhaka Stock Exchange" },
      { name: "description", content: "Answers to common questions about the Dhaka Stock Exchange, trading, listings and investor basics." },
      { property: "og:title", content: "Frequently Asked Questions | DSE" },
      { property: "og:description", content: "FAQ for investors and stakeholders of the Dhaka Stock Exchange." },
    ],
  }),
  component: FaqPage,
});

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Stock Exchange?", a: "The stock exchange provides a sound and stable securities market where shares can be bought and sold." },
  { q: "What is the Role of the Stock Exchange?", a: "The stock exchange provides listed companies with a channel seek capital fund from the public and at the same time It provides the investors a place to buy and sell shares of the listed companies. The exchange also monitors the market to ensure that it is working efficiently, fairly and transparently." },
  { q: "How many Stock Exchanges in Bangladesh?", a: "There are Two stock exchanges in Bangladesh: DHAKA STOCK EXCHANGE PLC. - Established on 1954; Chittagong Stock Exchange Ltd. - Established on 1995. Of these, DHAKA STOCK EXCHANGE PLC. is the biggest stock exchange in the country." },
  { q: "How do you select the company Before You Invest?", a: "Don't put in your money until you have understood all relevant information regarding the investment. Prepare yourself for the vigorous homework of analyzing company's annual reports, EPS (Earning Per Share), accounts and other statements while keeping abreast of what's happening in the industry, country and elsewhere that may affect your investment. Consult your investment adviser/broker to get latest market information about shares you intend to buy or sell. Be skeptical of any thing picked up from rumors, particularly if you cannot rationally explain their choice." },
  { q: "What Do Investors Think For Long-term Investment?", a: "Bear in mind that even in the best of securities/shares, there can be short-term aberrations. It is important to have the power to hold your investments for longer periods. Studies have shown that investments properly timed and based on strong fundamentals have been very profitable for investors in the longer term." },
  { q: "What is 'Book closure' / 'Record Date'?", a: "While a company a dividend, right/ bonus shares or intends to hold any AGM/ EGM; it declares a book legislature closer provider/ Record Date to register the name of shareholders. Only shareholders whose names appear on the register after the book closure/ Record Date are eligible to attend in the AGM/ EGM and also to receive dividends & bonus shares and entitlement to right shares, if any." },
  { q: "What is the trade time of DSE?", a: "Generally Trading Time is from 10:00 am to 02:30 pm. Working Days: Sunday to Thursday" },
  { q: "What are the measures of market performance?", a: "There are four indicators of market performance: Market Capitalization; Value Turnover; Traded Volume; Index" },
  { q: "What Investment Products are Available?", a: "The following types of securities are available on the stock market for investment: Ordinary shares of listed companies; Mutual funds; Debenture; Bond" },
  { q: "What is 'Share'?", a: "Each share represents a small stake in the total paid up capital of a company. In fact a public limited company is one that is formed to accumulate capital from a large pool of investors. Therefore total capital of such companies is divided into smaller equal denomination units represented by a share/ capital. One may buy large or small lots to match the amount of money that one wants to invest. A company's share price can rise or fall as a result of its own performance or market conditions. Once the shares are bought and transferred to new investors name, the name will be entered in the company's share register, the new investors will then be entitled to receive all the benefits of share ownership including the rights to receive dividends, to vote at the company's general meetings and to receive the company's reports." },
  { q: "What is 'Market Capitalization'?", a: "Market Capitalization is the total market value, at the current stock exchange list price of the total number of equity shares issued by a company. Market Capitalization = ∑ (No. of Issued Share * Close Price)" },
  { q: "What is 'IPO'?", a: "Initial Public offer. Initial Public Offer or IPO means first offer of securities by an issuer to the general public." },
  { q: "What is 'Circuit Filter'?", a: "Circuit Filter is the maximum permissible deviation of the price (specified as percentage), of an aggressor order from the last trade price." },
  { q: "What is 'Circuit Breaker'?", a: "Circuit Breaker is the maximum permissible deviation of the price (specified as percentage) of the incoming order from the Circuit Breaker Base Price for that instrument. Orders violating circuit breaker will result rejection of the order." },
  { q: "What is 'Market Lot'?", a: "A Market Lot is the smallest tradable unit for an instrument except those traded in the Oddlot book. All order quantities can only be an integral multiple of the Market lot." },
  { q: "What is 'Odd Lot'?", a: "Stock market shares are generally bought and sold in market lots, which are easy to trade. Any number of shares less than the market lot makes an odd lot. Odd lots typically arise from bonus or rights issues." },
  { q: "What is 'Touchline Price'?", a: "The Touchline Price for an instrument is the best offer (sell) and best bid (buy) price amongst all orders in the order book. The touchline buy price is the highest price amongst all buy orders and the touchline sell price is the lowest price amongst all sell orders." },
  { q: "How orders are queued for trading?", a: "Orders are queued and traded according to first on price and then time priorities. Best-priced orders traded first. If there is more than one order at the same price, the order is placed by time priority." },
  { q: "What are the groups of instruments in DSE?", a: "The groups of instruments in DSE are: A, B, G, N and Z." },
  { q: "What are the requirements to obtain and retain a Trading Right Entitlement Certificate (TREC) of DSE?", a: "Company limited by shares incorporated under the Companies Act, 1994 can only obtain and retain a TREC of DSE; Minimum paid up capital of Taka 10,000,000 (Ten Million) only: Provided that the audited net worth of the TREC Holder shall not be less than 75% of its paid-up capital at any time; It must have adequate professional management including compliance officer, human resource, information technology infrastructure and financial capability as may be determined by the Exchange from time to time; The promoters, sponsors, substantial shareholders, MD/CEO, directors and key executives of the company comply with the Fit and Proper Criteria as may be specified by the Commission from time to time; None of the directors of the company have served as directors in a TREC holder or member of any Exchange which had been declared a defaulter or expelled as a member or its TREC has been cancelled by the Exchange; It has adequate policies, procedures, systems and controls to handle conflict management, monitoring of unethical conduct and market abuse, resolve investor complaints, prevent money laundering and combat terrorist financing and ensure compliance with applicable laws; and Comply with all the Rules and Regulations framed out in this regard." },
  { q: "Is TREC renewable?", a: "A TREC is yearly renewable with a fee of Tk. 50,000." },
  { q: "Can anyone hold more than one TREC of the Exchange at a time?", a: "No person shall hold more than one TREC of the Exchange at a time." },
  { q: "What are the requirements to obtain and retain a Trader Certificate (TC)?", a: "Be a citizen of Bangladesh; Aged 21 years or more; Graduation from any recognized university from Bangladesh or abroad; Must possess the \"Fit and Proper\" criteria as may be prescribed by the Exchange/BSEC from time to time; Has not been convicted by any court for moral turpitude; Any other qualification as may be notified by the Exchange from time to time; and Comply with all the Rules and Regulations framed out in this regard" },
  { q: "Is TC renewable?", a: "A TC is yearly renewable with a fee of Tk. 5,000." },
  { q: "What is the time interval of the data update at DSE website?", a: "Using the real time data DSE upgraded its official website (www.dsebd.org) where trade data updates in every 1 to 3 minutes interval." },
  { q: "How can I observe some specific instrument's current traded information from the DSE website in a page?", a: "You can make a Portfolio on the DSE official website (www.dsebd.org) to observe your desired specific instrument's current traded information all at once. (If you are a new user you have to signup first.) Right now, the registration is free." },
];

function FaqPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return FAQS.map((f, i) => ({ ...f, i }));
    return FAQS
      .map((f, i) => ({ ...f, i }))
      .filter((f) => f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term));
  }, [query]);

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1000px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">{t("Home")}</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>{t("Frequently Asked Questions")}</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05]">
            {t("Frequently Asked Questions")}
          </h1>
          <p className="mt-4 text-[15px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            {t("Answers to the most common questions about trading, listings, and investor basics at DSE.")}
          </p>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-6 py-12 space-y-6">
        <div
          className="rounded-xl flex items-center gap-3 px-4 py-2.5"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.08)",
          }}
        >
          <Search className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search questions…")}
            className="flex-1 bg-transparent outline-none text-[14px]"
            style={{ color: "var(--text-primary)" }}
          />
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {filtered.length} / {FAQS.length}
          </span>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
              {t("No questions match your search.")}
            </div>
          )}
          {filtered.map((f, n) => {
            const isOpen = openIdx === f.i;
            return (
              <div
                key={f.i}
                style={{ borderTop: n === 0 ? "none" : "1px solid rgb(var(--ov) / 0.06)" }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : f.i)}
                  className="w-full text-left flex items-start gap-3 px-5 py-4 transition hover:opacity-90"
                >
                  <span className="flex-1 text-[14px] font-medium">{t(f.q)}</span>
                  <ChevronDown
                    className="w-4 h-4 mt-1 flex-shrink-0 transition-transform"
                    style={{
                      color: "var(--primary)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-5 text-[13px] leading-[1.75] whitespace-pre-line"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t(f.a)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
