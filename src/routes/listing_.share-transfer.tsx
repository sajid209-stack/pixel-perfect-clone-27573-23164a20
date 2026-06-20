import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/listing_/share-transfer")({
  head: () => ({
    meta: [
      { title: "Process of Gift / Transfer of Shares | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "How to gift or transfer listed securities outside the trading system, under Listing Regulation 47.",
      },
      { property: "og:title", content: "Process of Gift / Transfer of Shares" },
      {
        property: "og:description",
        content:
          "Step-by-step procedure for gift/transfer of listed securities under DSE (Listing) Regulations, 2015 — regulation 47.",
      },
    ],
  }),
  component: ShareTransferPage,
});

type Step = { n: number; title: string; body: React.ReactNode };

const STEPS: Step[] = [
  {
    n: 1,
    title: "Download Required Form",
    body: (
      <div className="space-y-3">
        <p>
          Download from{" "}
          <a
            href="http://www.dsebd.org/share-transfer.php"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--brand-600)" }}
            className="hover:underline"
          >
            http://www.dsebd.org/share-transfer.php
          </a>
          .
        </p>
        <div>
          <div className="font-semibold" style={{ color: "var(--ink)" }}>
            A. Forms for gift/transfer of listed securities as per Regulation 47 of the Dhaka Stock Exchange (Listing) Regulations, 2015:
          </div>
          <ul className="mt-2 list-disc pl-5 space-y-1.5">
            <li>
              Annexure-6 under Schedule-B [Applicable for transfer of securities by way of gift among the family members i.e. spouse, son, daughter, father, mother, brother and sister]
            </li>
            <li>
              Annexure-7 under Schedule-B [Applicable for (i) Transfer of securities for execution of a Court order; (ii) Acquisition of securities in consideration of other than cash; and (iii) Transfer of shares in case of confiscation/loan default.]
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold" style={{ color: "var(--ink)" }}>
            B. Acquisition cost declaration format for tax purposes (If the transferor is a sponsor/director/placement holder)
          </div>
        </div>
      </div>
    ),
  },
  {
    n: 2,
    title: "Duly fill up the Applicable Forms",
    body: <p>Use applicable forms as mentioned in Step 1.</p>,
  },
  {
    n: 3,
    title: "Verify Signature",
    body: (
      <p>
        Signature of the transferor should be verified by the authorized officer of the Issuer/Asset Manager/Depository Participant along with their name, date and seal with designation.
      </p>
    ),
  },
  {
    n: 4,
    title: "Documents to be enclosed",
    body: (
      <div className="space-y-4">
        <div>
          <div className="font-semibold" style={{ color: "var(--ink)" }}>
            For Annexure-6 under Schedule-B:
          </div>
          <ul className="mt-2 list-disc pl-5 space-y-1.5">
            <li>National ID Card/Passport of both transferor and transferee(s) attested by the signature verifier;</li>
            <li>Updated BO-ISIN holding report (DPA6) of both transferor and transferee(s);</li>
            <li>Shareholding/unit holding position of both transferor and transferee(s) (if transferor/transferee(s) are sponsor/director) issued by the issuer/asset manager;</li>
            <li>If the transferor is a sponsor/director, acquisition cost declaration format for tax purposes;</li>
            <li>In case of transfer of entire holding of shares by sponsor/director, extract of Board Resolution;</li>
            <li>Any other documents required by the Exchange.</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold" style={{ color: "var(--ink)" }}>
            For Annexure-7 under Schedule-B:
          </div>
          <ul className="mt-2 list-disc pl-5 space-y-1.5">
            <li>If transferor or transferee is an institution, extract of Board Resolution;</li>
            <li>Updated BO-ISIN holding report (DPA6) of both the parties;</li>
            <li>Shareholding/unit holding position of both seller/transferor and buyer/transferee(s) issued by the Issuer/Asset Manager;</li>
            <li>Loan agreement between lender and borrower highlighting specific provision about authorization of confiscation of securities in case of default;</li>
            <li>Necessary documents for pledged shares (i.e., DP26, DP32, DP89, Form 17-1, Form 17-2, etc);</li>
            <li>Necessary documents as a proof of default;</li>
            <li>Attested photocopy of National ID card of both seller/transferor and buyer/transferee (in case of individual);</li>
            <li>Any other documents required by the Exchange.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    n: 5,
    title: "Submit application form for approval along with relevant Documents.",
    body: null,
  },
  {
    n: 6,
    title:
      "Pay service charge and Advance Income Tax (AIT) (if applicable) through Pay Order in favor of 'Dhaka Stock Exchange PLC.' at the time of receiving approval letter.",
    body: (
      <div className="space-y-3">
        <div>
          <div className="font-semibold" style={{ color: "var(--ink)" }}>Service Charge:</div>
          <p className="mt-1">
            0.05% on the closing price of the securities to be transferred or Taka 50.00 (fifty) whichever is higher. The closing price of the securities prevailing on the day of approval accorded by the Exchange shall be taken as the price of the securities for the purpose of such service charge.
          </p>
          <p className="mt-2">
            <span className="font-semibold" style={{ color: "var(--ink)" }}>Example:</span> Mr. X wants to transfer 10,000 shares of ABC Company Limited and closing price per share is Tk. 30. Total Market Value = (10,000 * 30) = Tk. 300,000. Service Charge = (300,000 * 0.05%) = Tk. 150. Therefore, Mr. X has to pay Tk. 150 as service charge.
          </p>
        </div>
        <div>
          <div className="font-semibold" style={{ color: "var(--ink)" }}>Advance Income Tax (AIT):</div>
          <p className="mt-1">15% on Capital Gain of transferred shares/units.</p>
          <p className="mt-2">
            <span className="font-semibold" style={{ color: "var(--ink)" }}>Example:</span> Mr. X is a sponsor director who wants to transfer 10,000 shares, closing price Tk. 30, Acquisition Cost (weighted average) Tk. 14. Total Market Value = (10,000 * 30) = Tk. 300,000. Total Acquisition Cost = (10,000 * 14) = Tk. 140,000. Total Capital Gain = (300,000 - 140,000) = Tk. 160,000. AIT = (160,000 * 15%) = Tk. 24,000. Therefore, Mr. X has to pay Tk. 24,000 as Advance Income Tax (AIT).
          </p>
        </div>
        <p style={{ color: "var(--text-secondary)" }}>
          <span className="font-semibold" style={{ color: "var(--ink)" }}>Note:</span> AIT is applicable for Sponsor/Director/Placement Holder.
        </p>
      </div>
    ),
  },
  {
    n: 7,
    title: "Submit declaration",
    body: (
      <div className="space-y-2">
        <p>
          Submit declaration form to BSEC and Exchanges prior to execution of transfer (in case of sponsor/director/placement holder). Declaration for buy/sell/transfer of shares/units as per Listing Regulation 34 (1) &amp; (2):
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Declaration form for Sponsors or Directors;</li>
          <li>Declaration form for Placement Holders.</li>
        </ul>
        <p>
          Declaration forms are available at{" "}
          <a
            href="http://www.dsebd.org/share-transfer.php"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--brand-600)" }}
            className="hover:underline"
          >
            http://www.dsebd.org/share-transfer.php
          </a>
        </p>
      </div>
    ),
  },
  {
    n: 8,
    title: "Execute Transfer",
    body: (
      <p>
        Go to concerned Depository Participant (DP) to execute the transfer and complete the formalities. The execution shall be completed within 30 (thirty) working days from the date of approval or any days mentioned in the approval letter.
      </p>
    ),
  },
  {
    n: 9,
    title: "Submit Completion Report",
    body: (
      <p>
        Submit completion report along with relevant documents relating to the said transfer within 7 (seven) days of such execution.
      </p>
    ),
  },
];

function ShareTransferPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--brand-600)" }}
          >
            Listing
          </div>
          <h1
            className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            Process of Gift / Transfer of Shares
          </h1>
          <p
            className="mt-3 text-[14px] max-w-[720px]"
            style={{ color: "var(--text-secondary)" }}
          >
            How to gift or transfer listed securities outside the trading system, under Listing Regulation 47.
          </p>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <h2
          className="text-[15px] md:text-[16px] font-semibold leading-snug mb-6"
          style={{ color: "var(--ink)" }}
        >
          Process of gift/transfer of listed securities outside the trading system of the Exchange under regulation 47 of the Dhaka Stock Exchange (Listing) Regulations, 2015
        </h2>

        <ol className="space-y-6">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="flex gap-4"
              style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}
            >
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--brand-600)",
                  border: "1px solid var(--line)",
                }}
              >
                {s.n}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="text-[15px] font-semibold mb-2"
                  style={{ color: "var(--ink)" }}
                >
                  Step {s.n} — {s.title}
                </div>
                {s.body && (
                  <div
                    className="text-[14px] leading-[1.75]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.body}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Footer />
    </div>
  );
}
