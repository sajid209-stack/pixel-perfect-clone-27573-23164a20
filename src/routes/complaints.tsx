import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { FileText, ExternalLink, Building2, Landmark, CheckCircle2, Download } from "lucide-react";

const COMPLAINTS_REF_DOCS = [
  { title: "Public Alert 2026", file: "Public_Alert_2026.pdf", category: "Public Notice" },
  { title: "BSEC Complaint Reference", file: "secComplaint.pdf", category: "Regulatory Reference" },
];

function ReferenceDocsSection() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-[960px] px-4 py-8 md:py-10">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">Reference Documents</h2>
        <p className="text-xs text-muted-foreground mb-4">Payload CMS placeholder · documents to be wired to live data.</p>
        <div className="divide-y divide-border border border-border rounded-md bg-card">
          {COMPLAINTS_REF_DOCS.map((d) => (
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
    </section>
  );
}
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Investor complaints | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Complaint of investors against TREC holder companies and issuers of listed securities of DSE.",
      },
      { property: "og:title", content: "Investor complaints | DSE" },
      { property: "og:description", content: "Investor protection process at the Dhaka Stock Exchange." },
    ],
  }),
  component: ComplaintsPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  bo: z.string().trim().max(40).optional().or(z.literal("")),
  against: z.string().trim().min(1, "Required").max(150),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(10, "Please describe your complaint").max(2000),
});

type Tab = "issuers" | "trec";

function ComplaintsPage() {
  const [tab, setTab] = useState<Tab>("issuers");
  const [form, setForm] = useState({ name: "", email: "", bo: "", against: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  const field = "w-full rounded-lg px-3 py-2 text-[14px] outline-none";
  const fieldStyle = {
    background: "rgb(var(--surface-rgb) / 0.6)",
    border: "1px solid rgb(var(--ov) / 0.10)",
    color: "var(--text-primary)",
  } as const;

  const tabBtn = (id: Tab, label: string) => (
    <button
      key={id}
      onClick={() => setTab(id)}
      className="px-4 py-2 text-[13px] rounded-lg transition"
      style={{
        background: tab === id ? "var(--primary)" : "rgb(var(--surface-rgb) / 0.6)",
        color: tab === id ? "#fff" : "var(--text-secondary)",
        border: "1px solid rgb(var(--ov) / 0.08)",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1000px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>Investor complaints</span>
          </div>
          <h1 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.02em] leading-[1.1]">
            Complaint of Investors Against the TREC Holder Companies and Issuers of Listed Securities of DSE
          </h1>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-wrap gap-2">
          {tabBtn("issuers", "Against Issuers of Listed Securities")}
          {tabBtn("trec", "Against TREC Holder Companies")}
        </div>

        {tab === "issuers" && (
          <div
            className="rounded-2xl p-7"
            style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--primary)" }}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-[18px] font-semibold">Complaint of Investors Against Issuers of Listed Securities</div>
            <p className="mt-3 text-[13px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
              Complaints regarding non-disclosure, dividend non-payment, AGM/EGM issues or corporate
              governance breaches by listed issuers should be filed with the Bangladesh Securities
              and Exchange Commission (BSEC). DSE forwards investor representations to BSEC and the
              issuer's compliance officer for resolution.
            </p>
            <a
              href="https://www.sec.gov.bd"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 text-[13px]"
              style={{ color: "var(--primary)" }}
            >
              File with BSEC <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {tab === "trec" && (
          <div
            className="rounded-2xl p-7"
            style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--primary)" }}
            >
              <Landmark className="w-5 h-5" />
            </div>
            <div className="text-[18px] font-semibold">Investor Complaint against TREC Holder Companies of DSE</div>
            <p className="mt-3 text-[13px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
              Download the complaint form, fill it in, and submit it to the Investor Complaint
              Address &amp; Liaison Department (ICALD) of DSE along with supporting documents.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {[
                { label: "Form Regarding Investor Complaint against TREC Holder Company of DSE (English)" },
                { label: "Form Regarding Investor Complaint against TREC Holder Company of DSE (Bangla)" },
              ].map((f) => (
                <a
                  key={f.label}
                  href="#"
                  className="rounded-xl p-4 flex items-start gap-3 transition hover:opacity-90"
                  style={{
                    background: "rgb(var(--brand-tint) / 0.06)",
                    border: "1px solid rgb(var(--brand-tint) / 0.20)",
                  }}
                >
                  <FileText className="w-5 h-5 mt-0.5" style={{ color: "var(--primary)" }} />
                  <div className="flex-1">
                    <div className="text-[13px] font-medium leading-snug">{f.label}</div>
                    <div className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>PDF · CMS-managed</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* BSEC Directive */}
        <a
          href="#"
          className="rounded-2xl p-5 flex items-center gap-4 transition hover:opacity-90"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.08)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--primary)" }}
          >
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-semibold">BSEC Directive</div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              Directive on investor complaint resolution mechanism
            </div>
          </div>
          <span className="text-[13px]" style={{ color: "var(--primary)" }}>View →</span>
        </a>

        {/* Online complaint form */}
        <div
          className="rounded-2xl p-7"
          style={{ background: "rgb(var(--surface-rgb) / 0.6)", border: "1px solid rgb(var(--ov) / 0.06)" }}
        >
          <div className="text-[16px] font-semibold">Online complaint form</div>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            Submit your complaint directly to DSE Investor Complaint Address &amp; Liaison Department.
          </p>

          {sent ? (
            <div
              className="mt-6 rounded-xl p-5 flex items-start gap-3"
              style={{ background: "rgb(var(--brand-tint) / 0.08)", border: "1px solid rgb(var(--brand-tint) / 0.25)" }}
            >
              <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: "var(--primary)" }} />
              <div>
                <div className="text-[14px] font-semibold">Complaint received, {form.name}.</div>
                <div className="text-[13px] mt-1" style={{ color: "var(--text-secondary)" }}>
                  ICALD will acknowledge your complaint at {form.email} within 3 working days.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
              {[
                { k: "name", label: "Full name", type: "text" },
                { k: "email", label: "Email", type: "email" },
                { k: "bo", label: "BO account no. (optional)", type: "text" },
                { k: "against", label: "Complaint against (company / TREC)", type: "text" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="block text-[12px] mb-1.5" style={{ color: "var(--text-muted)" }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={(form as any)[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    className={field}
                    style={fieldStyle}
                  />
                  {errors[f.k] && <div className="text-[11px] mt-1" style={{ color: "#dc2626" }}>{errors[f.k]}</div>}
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-[12px] mb-1.5" style={{ color: "var(--text-muted)" }}>Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={field}
                  style={fieldStyle}
                />
                {errors.subject && <div className="text-[11px] mt-1" style={{ color: "#dc2626" }}>{errors.subject}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-[12px] mb-1.5" style={{ color: "var(--text-muted)" }}>Details of complaint</label>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={field}
                  style={fieldStyle}
                />
                {errors.message && <div className="text-[11px] mt-1" style={{ color: "#dc2626" }}>{errors.message}</div>}
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-[14px] font-medium transition hover:opacity-90"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  Submit complaint
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact block */}
        <div
          className="rounded-2xl p-6 text-[13px] leading-[1.85]"
          style={{
            background: "rgb(var(--brand-tint) / 0.06)",
            border: "1px solid rgb(var(--brand-tint) / 0.20)",
          }}
        >
          <div className="text-[14px] font-semibold mb-2">For any help, please contact:</div>
          <div style={{ color: "var(--text-secondary)" }}>
            Hotline #{" "}
            <a href="tel:+8801713276415" style={{ color: "var(--primary)" }}>01713-276415</a>,{" "}
            <a href="tel:+8801713369363" style={{ color: "var(--primary)" }}>01713-369363</a>,{" "}
            <a href="tel:+8801713425831" style={{ color: "var(--primary)" }}>01713425831</a> &amp;{" "}
            <a href="tel:+8801730331866" style={{ color: "var(--primary)" }}>01730-331866</a>;<br />
            PABX:{" "}
            <a href="tel:+8802223384601" style={{ color: "var(--primary)" }}>+88-02-223384601-07</a>{" "}
            (Ext: 1642-1646);<br />
            E-mail:{" "}
            <a href="mailto:icald@dse.com.bd" style={{ color: "var(--primary)" }}>icald@dse.com.bd</a>
          </div>
        </div>
      </main>

      <ReferenceDocsSection />

      <Footer />
    </div>
  );
}
