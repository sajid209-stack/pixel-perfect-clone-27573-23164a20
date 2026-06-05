import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import dseLogo from "@/assets/dse-logo.png.asset.json";

const cols = [
  { title: "Markets", items: ["Equities", "Bonds", "Mutual Funds", "SME Board", "Indices", "Historical data"] },
  { title: "About DSE", items: ["About us", "Board of directors", "Press releases", "Careers", "Sustainability", "Annual reports"] },
  { title: "Services", items: ["Broker directory", "Listing requirements", "BICM", "Investor education", "Complaints portal", "Data API"] },
];

export function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: "rgb(var(--ov) / 0.04)",
        color: "var(--text-primary)",
        borderTop: "1px solid var(--border)",
        backdropFilter: "blur(14px)",
      }}
    >

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={dseLogo.url} alt="Dhaka Stock Exchange" className="w-12 h-12 object-contain bg-white rounded-lg p-1" />
            <div className="font-semibold">Dhaka Stock Exchange</div>
          </div>
          <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>Bangladesh's Premier Capital Market</p>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            DSE Tower, Plot 46, Road 21<br />Nikunja-2, Dhaka-1229<br />+880 2 5566 9100
          </p>
          <div className="flex gap-3 mt-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center transition"
                style={{ border: "1px solid rgb(var(--ov) / 0.15)", color: "var(--text-secondary)" }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{c.title}</div>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              {c.items.map((i) => (
                <li key={i}><a className="transition hover:opacity-100 opacity-80 cursor-pointer">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgb(var(--ov) / 0.08)" }}>
        <div
          className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <div>© 2026 Dhaka Stock Exchange PLC. Regulated by Bangladesh Securities and Exchange Commission.</div>
          <div className="flex gap-4">
            <a className="cursor-pointer hover:opacity-100 opacity-80">Privacy policy</a>
            <a className="cursor-pointer hover:opacity-100 opacity-80">Terms</a>
            <a className="cursor-pointer hover:opacity-100 opacity-80">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
