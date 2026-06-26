import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";
import curbAsset from "@/assets/heritage-curb-market.jpg.asset.json";
import cryoutAsset from "@/assets/heritage-cryout-1998.jpg.asset.json";

function HistoricFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-6 mx-auto m-0" style={{ maxWidth: 560 }}>
      <img
        src={src}
        alt={alt}
        className="w-full block"
        style={{ borderRadius: 0, border: "1px solid var(--line)" }}
      />
      <figcaption className="mt-2 text-[12px] italic" style={{ color: "var(--text-muted, #6b7280)" }}>
        {caption}
      </figcaption>
    </figure>
  );
}


export const Route = createFileRoute("/about_/introduction")({
  head: () => ({
    meta: [
      { title: "Introduction to DSE | Dhaka Stock Exchange" },
      { name: "description", content: "The origins and core functions of Bangladesh's premier stock exchange." },
      { property: "og:title", content: "Introduction to DSE" },
      { property: "og:description", content: "History and functions of the Dhaka Stock Exchange." },
    ],
  }),
  component: IntroductionPage,
});

const HISTORY: string[] = [
  "The necessity of establishing a stock exchange in the then East Pakistan was first recognised by the government when, early in 1952, it was learnt that the Calcutta Stock Exchange had prohibited transactions of Pakistani shares and securities. The Provincial Industrial Advisory Council of Pakistan soon set up an organizing committee for the formation of a stock exchange in East Pakistan. A decisive step was taken in the second meeting of the organizing committee held on 13thMarch, 1953. In the cabinet room, Eden Building, under the chairmanship of A. Khaleeli, Secretary of the Government of East Bengal, Commerce, Labor and Industries Department, various aspects of the issue were discussed in detail. The central government's proposal regarding the opening a branch of Karachi Stock Exchange at Dhaka did not find favor with the meeting who felt that East Pakistan should have an independent stock exchange. It was suggested that Dacca Narayanganj Chamber of Commerce & Industry should approach its members for purchasing the membership cards at RS. 2000 each for the proposed Stock Exchange. It was thought that the location of the exchange should be either at Dhaka or Narayanganj or Chittagong. An organizing committee was appointed consisting of leading commercial and industrial personalities of the province with Mirza Mehdi Ispahani as the convener in order to organize the exchange.",
  "The chamber informed its members and members of its affiliated associations on the proceedings of the above meeting, requesting them to intimate whether they were interested in joining the proposed stock exchange. This was followed by meeting at the chamber of which about 100 persons were interested in the formation of the exchange on July 7, 1953. The meeting invited 8 gentlemen to become promoters of the exchange with M Mehdi Ispahani as the convener and authorized them to draw up the Memorandum and Articles of Association of the Exchange and proceed to obtain registration under the Company's Act, 1913. The other 7 promoters of the exchange were J. M. Addision-Scott, Mohamed Hanif, A. C. Jain, A.K. Khan, Abdul Jalil, M. Shabbir Ahmed and Sakhawat Hossain.",
  "It was also decided that membership fee was to be RS. 2,000 and subscription at the rate of RS. 15 per month. The exchange was to consist of not more than 150 members. A meeting of the promoters was held at the chamber on September 03, 1953 when it was decided to appoint Orr Dignam & Co. as the solicitor to draw up the memorandum and articles of association of the stock exchange based on the rules prevailing in the stock exchanges in other countries and by taking into account the local conditions.",
  "The 8 promoters incorporated the formation as the East Pakistan Stock Exchange Association Limited on April 28, 1954. As public limited company the name was revised to East Pakistan Stock Exchange Ltd on June 23, 1962. Again on May 14, 1964 the name of East Pakistan Stock Exchange Limited was changed to \"Dacca Stock Exchange Ltd.\"",
  "At the time of incorporation, the authorized capital of the Exchange was RS. 3,00,000 divided into 150 shares of RS. 2,000 each and by an extra ordinary general meeting held on February 22, 1964 the authorized capital of the exchange was increased to RS. 5,00,000 divided into 250 shares of RS. 2,000 each. The paid up capital of the exchange stood at RS. 4,60,000 divided into 230 shares of RS. 2,000 each. However, 35 shares out of 230 shares were issued at RS. 80,00,000 only with a face value of RS. 2,000 at a premium of RS. 79,98,000 each.",
  "Although incorporated in 1954, the formal trading started in 1956 at Narayanganj after obtaining the certificate of commencement of business. But in 1958 it was shifted to Dhaka and started functioning at the Narayangonj Chamber Building in Motijheel C/A.",
  "On October 1, 1957 the Stock Exchange purchased a land measuring 8.75 katha at 9F Motijheel C/A from the Government and shifted to its own current location in 1959.",
];

const FUNCTIONS: string[] = [
  "Listing of Companies (As per Listing Regulations).",
  "Providing the screen based automated trading of listed Securities.",
  "Settlement of trading (As per Settlement of Transaction Regulations).",
  "Gifting of share / granting approval to the transaction/transfer of share outside the trading system of the exchange (As per Listing Regulations 47).",
  "Market Administration & Control.",
  "Market Surveillance.",
  "Publication of Monthly Review.",
  "Monitoring the activities of listed companies (As per Listing Regulations).",
  "Investors grievance Cell (Disposal of complaint bye laws 1997).",
  "Investors Protection Fund (As per investor protection fund Regulations 2014).",
  "Announcement of Price sensitive or other information about listed companies through online.",
];

function IntroductionPage() {
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
            {t("Introduction to DSE")}
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            {t("The origins and core functions of Bangladesh's premier stock exchange.")}
          </p>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
        <div>
          <h2 className="text-[20px] md:text-[22px] font-semibold mb-4" style={{ color: "var(--ink)" }}>
            {t("History")}
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            {HISTORY.map((p, i) => (
              <p key={i} id={i === 3 ? "legal-control" : undefined} style={i === 3 ? { scrollMarginTop: 80 } : undefined}>
                {t(p)}
              </p>
            ))}

          </div>
        </div>

        <div>
          <h2 className="text-[20px] md:text-[22px] font-semibold mb-3" style={{ color: "var(--ink)" }}>
            {t("Function of DSE")}
          </h2>
          <p className="text-[15px] leading-relaxed mb-3" style={{ color: "var(--ink)" }}>
            {t("The major functions are:")}
          </p>
          <ul className="space-y-2 list-disc pl-5 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
            {FUNCTIONS.map((f) => (
              <li key={f}>{t(f)}</li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
