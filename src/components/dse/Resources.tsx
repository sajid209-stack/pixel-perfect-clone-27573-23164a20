import { FileDown, CalendarDays, Calculator, FileText, Phone } from "lucide-react";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="glass p-8">{children}</div>;
}

function IconBox({ children, color = "var(--green-up)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
      style={{ background: "rgba(16,240,160,0.12)", color, boxShadow: "0 0 18px rgba(16,240,160,0.25)" }}
    >
      {children}
    </div>
  );
}

export function Resources() {
  return (
    <section className="py-40 px-6 relative" style={{ background: "radial-gradient(700px 400px at 50% 100%, rgba(16,240,160,0.03), transparent 65%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="text-[12px] uppercase tracking-[0.18em] mb-4" style={{ color: "var(--text-muted)" }}>Resources</div>
          <h2 className="text-[36px] md:text-[44px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>Tools & reports</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <IconBox><FileDown className="w-5 h-5" /></IconBox>
          <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>Market reports</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {["Daily summary", "Weekly bulletin", "Monthly digest"].map((r) => (
              <li key={r} className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <FileText className="w-3.5 h-3.5" style={{ color: "var(--red-down)" }} />
                <a className="hover:underline">{r}</a>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <IconBox><CalendarDays className="w-5 h-5" /></IconBox>
          <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>Trading calendar</h3>
          <div className="mt-3 space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <div><span style={{ color: "var(--text-muted)" }}>Next holiday:</span> <span className="font-medium" style={{ color: "var(--text-primary)" }}>Eid ul-Adha · Jun 7, 2026</span></div>
            <div><span style={{ color: "var(--text-muted)" }}>Next trading day:</span> <span className="font-medium" style={{ color: "var(--text-primary)" }}>Jun 8, 2026 · 10:00 AM</span></div>
          </div>
          <a className="text-xs font-medium mt-3 inline-block" style={{ color: "var(--green-up)" }}>View full calendar →</a>
        </Card>

        <Card>
          <IconBox><Calculator className="w-5 h-5" /></IconBox>
          <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>Investor tools</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {["Circuit breaker list", "BO account guide", "Investor complaints portal"].map((r) => (
              <li key={r}><a className="hover:underline" style={{ color: "var(--text-secondary)" }}>{r}</a></li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            <Phone className="w-3.5 h-3.5" style={{ color: "var(--green-up)" }} />
            <span>24/7 helpline: <span className="font-semibold tnum" style={{ color: "var(--text-primary)" }}>+880 9612-345678</span></span>
          </div>
        </Card>
        </div>
      </div>
    </section>
  );
}
