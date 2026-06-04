import { motion } from "framer-motion";
import { Sprout, CandlestickChart } from "lucide-react";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        color: "var(--text-secondary)",
      }}
    >
      {children}
    </span>
  );
}

export function DualAudience() {
  return (
    <section className="py-16 px-6">
      <h2 className="text-center text-[22px] font-bold mb-8" style={{ color: "var(--text-primary)" }}>
        Where would you like to start?
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
          className="glass p-6 border-l-4"
          style={{ borderLeftColor: "rgba(255,255,255,0.6)" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <Sprout className="w-5 h-5" style={{ color: "#fff" }} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>New to investing?</h3>
              <p className="text-sm mt-1.5" style={{ color: "var(--text-secondary)" }}>
                Learn how the stock market works, how to open a BO account, and make your first investment with confidence.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Pill>What is a stock?</Pill>
                <Pill>Open a BO account</Pill>
                <Pill>Investor glossary</Pill>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
          className="glass-strong p-6 border-l-4"
          style={{ borderLeftColor: "var(--green-up)" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,240,160,0.18)", boxShadow: "0 0 20px rgba(16,240,160,0.35)" }}>
              <CandlestickChart className="w-5 h-5" style={{ color: "var(--green-up)" }} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base" style={{ color: "var(--green-up)" }}>Experienced investor?</h3>
              <p className="text-sm mt-1.5" style={{ color: "var(--text-secondary)" }}>
                Access live market data, sector analysis, circuit breaker lists, and detailed company financials.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Pill>Live market data</Pill>
                <Pill>Sector heatmap</Pill>
                <Pill>Circuit breakers</Pill>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
