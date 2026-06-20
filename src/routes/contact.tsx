import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Reach the Dhaka Stock Exchange — address, phone, email, key desks and an enquiry form.",
      },
      { property: "og:title", content: "Contact | Dhaka Stock Exchange" },
      {
        property: "og:description",
        content: "Address, phone, email and enquiry form for the Dhaka Stock Exchange.",
      },
    ],
  }),
  component: ContactPage,
});

const desks: { label: string; email: string; to?: string }[] = [
  { label: "Listing queries", email: "listing@dse.com.bd" },
  { label: "Market operations", email: "operations@dse.com.bd" },
  { label: "Investor complaints", email: "complaints@dse.com.bd", to: "/complaints" },
  { label: "Media & press", email: "media@dse.com.bd" },
  { label: "Foreign investor desk", email: "fid@dse.com.bd", to: "/foreign-investors" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  category: z.enum(["General", "Listing", "Data", "Complaint", "Media"]),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

function ContactPage() {
  const [status, setStatus] = useState<null | "ok" | { error: string }>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      category: fd.get("category"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      setStatus({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    setStatus("ok");
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--ink)" }}>
      <Nav />

      {/* Header */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div className="max-w-[1100px] mx-auto px-6 py-10">
          <div
            className="text-[11px] font-semibold uppercase mb-2"
            style={{ letterSpacing: "0.14em", color: "var(--brand-600)" }}
          >
            Dhaka Stock Exchange
          </div>
          <h1
            className="text-[32px] md:text-[40px] font-semibold tracking-tight leading-[1.05]"
            style={{ color: "var(--ink)" }}
          >
            Contact
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-10">
        <div className="max-w-[1100px] mx-auto px-6 grid lg:grid-cols-2 gap-8">
          {/* Left: address + desks */}
          <div>
            <h2 className="text-[13px] font-semibold uppercase mb-4" style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}>
              Contact the Exchange
            </h2>

            <div className="p-5" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
              <div className="text-[14px] font-semibold mb-1" style={{ color: "var(--ink)" }}>Registered office</div>
              <p className="text-[13.5px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
                DSE Tower, Plot 46, Road 21,<br />
                Nikunja-2, Dhaka-1229, Bangladesh.
              </p>

              <div className="mt-4 grid grid-cols-[88px_1fr] gap-y-1.5 text-[13px]">
                <span style={{ color: "var(--text-muted)" }}>Phone</span>
                <span className="tnum" style={{ color: "var(--ink)" }}>+88-02-41040189-200</span>
                <span style={{ color: "var(--text-muted)" }}>Fax</span>
                <span className="tnum" style={{ color: "var(--ink)" }}>+88-02-41040096</span>
                <span style={{ color: "var(--text-muted)" }}>Email</span>
                <a href="mailto:info@dse.com.bd" style={{ color: "var(--brand-600)" }}>info@dse.com.bd</a>
                <span style={{ color: "var(--text-muted)" }}>Helpline</span>
                <span className="tnum" style={{ color: "var(--ink)" }}>+880 9612-345678</span>
              </div>
            </div>

            <div className="p-5 mt-4" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
              <div className="text-[14px] font-semibold mb-2" style={{ color: "var(--ink)" }}>Office hours</div>
              <div className="grid grid-cols-[140px_1fr] gap-y-1 text-[13px]">
                <span style={{ color: "var(--text-muted)" }}>Office (Sun–Thu)</span>
                <span className="tnum" style={{ color: "var(--ink)" }}>09:00 – 17:00 BST</span>
                <span style={{ color: "var(--text-muted)" }}>Pre-open</span>
                <span className="tnum" style={{ color: "var(--ink)" }}>09:30 – 10:00</span>
                <span style={{ color: "var(--text-muted)" }}>Continuous trading</span>
                <span className="tnum" style={{ color: "var(--ink)" }}>10:00 – 14:30</span>
                <span style={{ color: "var(--text-muted)" }}>Post-close</span>
                <span className="tnum" style={{ color: "var(--ink)" }}>14:30 – 14:40</span>
              </div>
            </div>

            <div className="mt-4" style={{ border: "1px solid var(--line)", background: "var(--surface)" }}>
              <div
                className="px-4 py-2.5 text-[11px] font-semibold uppercase"
                style={{ letterSpacing: "0.12em", color: "var(--text-secondary)", borderBottom: "1px solid var(--line)" }}
              >
                Key desks
              </div>
              <table className="w-full text-[13px]">
                <tbody>
                  {desks.map((d, i) => (
                    <tr key={d.label} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
                      <td className="px-4 py-2.5" style={{ color: "var(--ink)" }}>
                        {d.to ? (
                          <Link to={d.to} style={{ color: "var(--ink)" }} className="hover:underline">
                            {d.label}
                          </Link>
                        ) : (
                          d.label
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <a href={`mailto:${d.email}`} className="tnum hover:underline" style={{ color: "var(--brand-600)" }}>
                          {d.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: form + map */}
          <div>
            <h2 className="text-[13px] font-semibold uppercase mb-4" style={{ letterSpacing: "0.12em", color: "var(--text-secondary)" }}>
              Send an enquiry
            </h2>

            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-4"
              style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
            >
              <Field label="Name">
                <input
                  name="name"
                  required
                  maxLength={100}
                  className="w-full h-10 px-3 text-[13.5px] outline-none"
                  style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                />
              </Field>
              <Field label="Email">
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  className="w-full h-10 px-3 text-[13.5px] outline-none"
                  style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                />
              </Field>
              <Field label="Category">
                <select
                  name="category"
                  defaultValue="General"
                  className="w-full h-10 px-3 text-[13.5px] outline-none"
                  style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                >
                  <option>General</option>
                  <option>Listing</option>
                  <option>Data</option>
                  <option>Complaint</option>
                  <option>Media</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  name="message"
                  required
                  maxLength={1000}
                  rows={5}
                  className="w-full px-3 py-2 text-[13.5px] outline-none resize-y"
                  style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                />
              </Field>

              {status === "ok" && (
                <div className="text-[12.5px]" style={{ color: "var(--green-up)" }}>
                  Thank you — we'll respond within two business days.
                </div>
              )}
              {status && status !== "ok" && (
                <div className="text-[12.5px]" style={{ color: "var(--red-down)" }}>
                  {status.error}
                </div>
              )}

              <button
                type="submit"
                className="h-10 px-5 text-[13px] font-semibold"
                style={{
                  background: "var(--brand-600)",
                  color: "#fff",
                  border: "1px solid var(--brand-600)",
                  borderRadius: 2,
                }}
              >
                Submit enquiry
              </button>
            </form>

            <div className="mt-4" style={{ border: "1px solid var(--line)" }}>
              <iframe
                title="DSE Tower location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=90.4140%2C23.8265%2C90.4240%2C23.8345&layer=mapnik&marker=23.8305%2C90.4190"
                className="w-full block"
                style={{ height: 260, border: 0, filter: "grayscale(0.15)" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11.5px] font-semibold uppercase mb-1.5" style={{ letterSpacing: "0.1em", color: "var(--text-muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}
