import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function IpoPipeline() {
  return (
    <section className="py-10 md:py-12 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              Capital raising
            </div>
            <h3
              className="text-[22px] md:text-[26px] font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              IPO pipeline
            </h3>
          </div>
          <Link
            to="/ipo"
            className="text-[12px] font-medium inline-flex items-center gap-1"
            style={{ color: "var(--green-up)" }}
          >
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="ipo-pipeline-grid grid md:grid-cols-2 gap-4" style={{ maxHeight: 240 }}>
          {/* Active subscription */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 rounded-2xl"
            style={{
              background: "rgba(16,240,160,0.04)",
              border: "1px solid rgba(16,240,160,0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{ background: "var(--green-up)", color: "#07090A" }}
              >
                Live
              </span>
              <span
                className="text-[11px] uppercase tracking-wider"
                style={{ color: "var(--green-up)" }}
              >
                Subscription open
              </span>
            </div>
            <div
              className="font-semibold text-[17px] mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Sample Bangladesh Co.
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                ৳ <span className="tnum font-semibold text-[17px]" style={{ color: "var(--text-primary)" }}>10</span>/share
              </span>
              <span className="text-xs tnum" style={{ color: "var(--text-muted)" }}>
                Closes Jun 10
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span style={{ color: "var(--text-muted)" }}>Subscribed</span>
              <span className="tnum font-semibold" style={{ color: "var(--green-up)" }}>73%</span>
            </div>
            <div
              className="ipo-progress h-1.5 w-full rounded-full overflow-hidden"
              style={{ background: "rgb(var(--ov) / 0.06)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "73%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: "var(--green-up)" }}
              />
            </div>
          </motion.div>

          {/* Next upcoming */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl"
            style={{
              background: "rgb(var(--ov) / 0.02)",
              border: "1px solid rgb(var(--ov) / 0.06)",
            }}
          >
            <div
              className="text-[11px] uppercase tracking-wider mb-2"
              style={{ color: "var(--amber)" }}
            >
              Upcoming · Jun 18
            </div>
            <div
              className="font-semibold text-[17px] mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Another Sample Co.
            </div>
            <div className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              ৳ <span className="tnum font-semibold text-[17px]" style={{ color: "var(--text-primary)" }}>15</span>/share
            </div>
            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              Subscription opens in 13 days
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
