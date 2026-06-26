import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import { useLang } from "@/i18n/LanguageContext";

const GUIDES_GROUPS = [
  {
    heading: "For Investors",
    docs: [
      { title: "DSE Mobile User Guide", file: "DSE-Mobile User Guide.pdf", category: "User Guide" },
      { title: "DSE Investor (PC/Desktop) User Guide", file: "DSE-Investor User Guide.pdf", category: "User Guide" },
      { title: "DSE Mobile Registration Form", file: "DSE Mobile Registration Form.pdf", category: "Form" },
      { title: "DSE Mobile Registration Form — Printable", file: "DSE Mobile Registration Form (Printable).pdf", category: "Form" },
    ],
  },
  {
    heading: "For TREC Holders",
    docs: [
      { title: "Guidelines of DSE Mobile Service for TRECs", file: "Guidelines of DSE-Mobile Service.pdf", category: "Guidelines" },
      { title: "DSE Mobile Service Requisition Form — Editable", file: "DSE-Mobile Service Requisition Form (Editable).pdf", category: "Form" },
    ],
  },
];

function GuidesFormsSection() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-[960px] px-4 py-8 md:py-10">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">Guides & Forms</h2>
        <p className="text-xs text-muted-foreground mb-6">Payload CMS placeholder · documents to be wired to live data.</p>
        <div className="space-y-6">
          {GUIDES_GROUPS.map((g) => (
            <div key={g.heading}>
              <h3 className="text-sm font-semibold text-foreground mb-2">{g.heading}</h3>
              <div className="divide-y divide-border border border-border rounded-md bg-card">
                {g.docs.map((d) => (
                  <a key={d.file} href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors group">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{d.title}</div>
                      <div className="text-xs text-muted-foreground">{d.category} · {d.file}</div>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/dse-mobile")({
  head: () => ({
    meta: [
      { title: "DSE-Mobile Service | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "DSE-Mobile is a platform of DSE-FlexTP providing real-time market updates and trading capabilities for DSE investors.",
      },
      { property: "og:title", content: "DSE-Mobile Service" },
      { property: "og:description", content: "Real-time market and trading on mobile." },
    ],
  }),
  component: DseMobilePage,
});

function DseMobilePage() {
  const { t } = useLang();
  const para = "text-[14px] md:text-[15px] leading-[1.7]";
  const paraStyle = { color: "var(--text-secondary)" } as const;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            {t("Dhaka Stock Exchange")}
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {t("DSE-Mobile Service")}
          </h1>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-5">
        <p className={para} style={paraStyle}>
          {t(
            "DHAKA STOCK EXCHANGE PLC. (DSE) has implemented a Centralized Order Management System 'DSE-FlexTP' for the TREC holders of the Exchange to manage their orders. DSE-Mobile is a platform of DSE-FlexTP by which investors of DSE can get real-time market updates and as well as can trade (if TREC permitted). DSE-Mobile service was launched on March 09, 2016. This is connecting investors to the state-of-the-art technology of trading.",
          )}
        </p>
        <p className={para} style={paraStyle}>
          {t(
            "DSE is focusing on smart service to end customers through Mobile service. There are two applications under DSE-Mobile service:",
          )}
        </p>

        <div>
          <h2 className="text-[16px] font-semibold" style={{ color: "var(--ink)" }}>
            {t("1. DSE-Mobile (APP)")}
          </h2>
          <p className={`${para} mt-2`} style={paraStyle}>
            {t(
              "A mobile application which provides real time securities quotes (bid/ask), Request for Streaming (RFS) trading capabilities, managing and monitoring resting orders in a secure mode, synchronization with trader-dealer terminal. It is a native mobile application for iOS and Android phones, with these versions:",
            )}
          </p>
          <ul className="mt-3 space-y-2 text-[14px] leading-[1.65]" style={paraStyle}>
            <li>
              <span className="font-semibold" style={{ color: "var(--ink)" }}>{t("DSE-Mobile VIP")}</span>
              {": "}
              {t("allows investor to be aware of his portfolio and favorites and keep in touch with a professional trader who manages best execution of orders.")}
            </li>
            <li>
              <span className="font-semibold" style={{ color: "var(--ink)" }}>{t("DSE-Mobile Trader")}</span>
              {": "}
              {t("as VIP, plus the ability to manage his own orders — submission, modification, cancellation.")}
            </li>
            <li>
              <span className="font-semibold" style={{ color: "var(--ink)" }}>{t("DSE-Mobile Biz Owner")}</span>
              {": "}
              {t("allows a business owner to be aware of his broking business status — for dealer account of a TREC holder only.")}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[16px] font-semibold" style={{ color: "var(--ink)" }}>
            {t("2. DSE-Investor")}
          </h2>
          <p className={`${para} mt-2`} style={paraStyle}>
            {t(
              "Allows an investor to be aware of his portfolio and favorites and manage his own orders; runs on any HTML-5 compatible browser from PC, Laptop etc.",
            )}
          </p>
        </div>

        <p className={para} style={paraStyle}>
          {t("Investor should apply in the prescribed Form to the TREC, which will register the user in the DSE-FlexTP System.")}
        </p>

        <div>
          <h2 className="text-[16px] font-semibold" style={{ color: "var(--ink)" }}>{t("Fees and Charges")}</h2>
          <p className={`${para} mt-2`} style={paraStyle}>
            {t(
              "DSE provides a DSE-Mobile connection to interested TREC Holder Companies upon payment of BDT 125.00 (including VAT and Tax) for each connection per month. It is TREC business policy to impose fees to the investor for the DSE-Mobile service; there is no additional charge (registration, commission, transaction etc.) to investors except the DSE-imposed charge to TRECs.",
            )}
          </p>
        </div>

        <div>
          <h2 className="text-[16px] font-semibold" style={{ color: "var(--ink)" }}>{t("Support Service")}</h2>
          <p className={`${para} mt-2`} style={paraStyle}>
            {t(
              "The TREC manages investor KYC, fund and portfolio, and provides primary support — user management, clarification on trading rules, operational issues, query/information and technical support; unresolved issues are reported to the respective DSE team.",
            )}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
