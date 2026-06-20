import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { FileText, CheckCircle2 } from "lucide-react";
import { TopBar } from "@/components/dse/TopBar";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/help-desk/nrb")({
  head: () => ({
    meta: [
      { title: "Help Desk for NRB | Dhaka Stock Exchange" },
      { name: "description", content: "Help desk for Non-Resident Bangladeshi investors at DSE." },
      { property: "og:title", content: "Help Desk for Non-Resident Bangladeshi (NRB)" },
      { property: "og:description", content: "Inquiry form and startup guide for NRB investors." },
    ],
  }),
  component: NrbPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  country: z.string().trim().min(1, "Country is required").max(80),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function NrbPage() {
  const [form, setForm] = useState({ name: "", email: "", country: "", message: "" });
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

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--text-primary)" }} className="min-h-screen">
      <TopBar />
      <Nav />

      <section className="border-b" style={{ borderColor: "rgb(var(--ov) / 0.06)" }}>
        <div className="max-w-[1000px] mx-auto px-6 pt-10 pb-10">
          <div className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            <Link to="/" className="hover:opacity-100 opacity-70">Home</Link>
            <span className="mx-2 opacity-50">›</span>
            <Link to="/help-desk" className="hover:opacity-100 opacity-70">Help Desk</Link>
            <span className="mx-2 opacity-50">›</span>
            <span>NRB</span>
          </div>
          <h1 className="text-[36px] md:text-[48px] font-semibold tracking-[-0.02em] leading-[1.05]">
            Help Desk for Non-Resident Bangladeshi (NRB)
          </h1>
          <p className="mt-4 text-[15px] max-w-[760px]" style={{ color: "var(--text-secondary)" }}>
            As per the decision of the management, a help desk for Non-Resident Bangladeshi (NRB)
            has been opened at DHAKA STOCK EXCHANGE PLC.
          </p>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-6 py-12 space-y-8">
        <a
          href="#"
          className="rounded-2xl p-5 flex items-center gap-4 transition hover:opacity-90"
          style={{
            background: "rgb(var(--brand-tint) / 0.06)",
            border: "1px solid rgb(var(--brand-tint) / 0.20)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgb(var(--brand-tint) / 0.10)", color: "var(--primary)" }}
          >
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-semibold">An Introductory Startup Guide for NRB</div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>PDF · CMS-managed</div>
          </div>
          <span className="text-[13px]" style={{ color: "var(--primary)" }}>Download →</span>
        </a>

        <div
          className="rounded-2xl p-7"
          style={{
            background: "rgb(var(--surface-rgb) / 0.6)",
            border: "1px solid rgb(var(--ov) / 0.06)",
          }}
        >
          <div className="text-[16px] font-semibold">Inquiry form</div>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            For any inquiry, please use the form below to write to us:
          </p>

          {sent ? (
            <div
              className="mt-6 rounded-xl p-5 flex items-start gap-3"
              style={{ background: "rgb(var(--brand-tint) / 0.08)", border: "1px solid rgb(var(--brand-tint) / 0.25)" }}
            >
              <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: "var(--primary)" }} />
              <div>
                <div className="text-[14px] font-semibold">Thank you, {form.name}.</div>
                <div className="text-[13px] mt-1" style={{ color: "var(--text-secondary)" }}>
                  Your inquiry has been received. The NRB Help Desk will reply to {form.email} shortly.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
              {[
                { k: "name", label: "Name", type: "text" },
                { k: "email", label: "Email", type: "email" },
                { k: "country", label: "Country", type: "text" },
              ].map((f) => (
                <div key={f.k} className={f.k === "country" ? "md:col-span-2" : ""}>
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
                <label className="block text-[12px] mb-1.5" style={{ color: "var(--text-muted)" }}>
                  Message
                </label>
                <textarea
                  rows={5}
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
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
