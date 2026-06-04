import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const cols = [
  { title: "Markets", items: ["Equities", "Bonds", "Mutual Funds", "SME Board", "Indices", "Historical data"] },
  { title: "About DSE", items: ["About us", "Board of directors", "Press releases", "Careers", "Sustainability", "Annual reports"] },
  { title: "Services", items: ["Broker directory", "Listing requirements", "BICM", "Investor education", "Complaints portal", "Data API"] },
];

export function Footer() {
  return (
    <footer style={{ background: "rgba(0,0,0,0.4)", color: "#fff", borderTop: "1px solid var(--border)", backdropFilter: "blur(14px)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold text-sm" style={{ color: "var(--navy-deep)" }}>DSE</div>
            <div className="font-semibold">Dhaka Stock Exchange</div>
          </div>
          <p className="text-sm mt-3" style={{ color: "var(--sky-100)" }}>Bangladesh's Premier Capital Market</p>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--sky-100)" }}>
            DSE Tower, Plot 46, Road 21<br />Nikunja-2, Dhaka-1229<br />+880 2 5566 9100
          </p>
          <div className="flex gap-3 mt-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold mb-3">{c.title}</div>
            <ul className="space-y-2 text-sm" style={{ color: "var(--sky-100)" }}>
              {c.items.map((i) => (
                <li key={i}><a className="hover:text-white transition">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: "var(--sky-100)" }}>
          <div>© 2026 Dhaka Stock Exchange PLC. Regulated by Bangladesh Securities and Exchange Commission.</div>
          <div className="flex gap-4">
            <a className="hover:text-white">Privacy policy</a>
            <a className="hover:text-white">Terms</a>
            <a className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
