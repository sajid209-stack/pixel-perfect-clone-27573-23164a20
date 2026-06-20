import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "User Feedback | Dhaka Stock Exchange" },
      { name: "description", content: "Share your feedback with the Dhaka Stock Exchange." },
      { property: "og:title", content: "User Feedback — DSE" },
      { property: "og:description", content: "Share your feedback with the DSE." },
    ],
  }),
  component: FeedbackPage,
});

const schema = z.object({
  name: z.string().trim().nonempty("Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().nonempty("Subject is required").max(150),
  message: z.string().trim().nonempty("Message is required").max(2000),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function FeedbackPage() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const fe: FieldErrors = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FieldErrors;
        if (k && !fe[k]) fe[k] = i.message;
      });
      setErrors(fe);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setValues({ name: "", email: "", subject: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--line)",
    color: "var(--ink)",
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[760px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Contact
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            User Feedback
          </h1>
          <p className="mt-3 text-[14px] max-w-[640px]" style={{ color: "var(--text-secondary)" }}>
            Share your feedback with the Dhaka Stock Exchange.
          </p>
        </div>
      </section>
      <section className="max-w-[760px] mx-auto px-4 md:px-6 py-8 md:py-10">
        {submitted && (
          <div
            className="mb-5 rounded-md p-3 text-[13px]"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)" }}
          >
            Thank you — your feedback has been recorded.
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {(["name", "email", "subject"] as const).map((k) => (
            <div key={k}>
              <label className="block text-[12px] font-medium mb-1 uppercase tracking-[0.12em]" style={{ color: "var(--text-secondary)" }}>
                {k}
              </label>
              <input
                type={k === "email" ? "email" : "text"}
                value={values[k]}
                onChange={onChange(k)}
                maxLength={k === "email" ? 255 : k === "subject" ? 150 : 100}
                className="w-full rounded-md px-3 py-2 text-[14px] outline-none"
                style={inputStyle}
              />
              {errors[k] && <div className="mt-1 text-[12px]" style={{ color: "#c33" }}>{errors[k]}</div>}
            </div>
          ))}
          <div>
            <label className="block text-[12px] font-medium mb-1 uppercase tracking-[0.12em]" style={{ color: "var(--text-secondary)" }}>
              Message
            </label>
            <textarea
              value={values.message}
              onChange={onChange("message")}
              maxLength={2000}
              rows={6}
              className="w-full rounded-md px-3 py-2 text-[14px] outline-none"
              style={inputStyle}
            />
            {errors.message && <div className="mt-1 text-[12px]" style={{ color: "#c33" }}>{errors.message}</div>}
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md px-5 py-2 text-[13px] font-semibold"
              style={{ background: "var(--brand)", color: "#fff" }}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
}
