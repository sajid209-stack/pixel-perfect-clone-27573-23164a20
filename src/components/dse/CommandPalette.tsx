import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Search, CornerDownLeft } from "lucide-react";
import { companies } from "@/data/companies";
import { CategoryBadge } from "./CategoryBadge";

type Ctx = { open: boolean; setOpen: (v: boolean) => void };

let listeners = new Set<(v: boolean) => void>();
export function openCommandPalette() {
  listeners.forEach((l) => l(true));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = (v: boolean) => setOpen(v);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target as HTMLElement).isContentEditable);

      if (e.key === "Escape") { setOpen(false); return; }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !open && !isTyping) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    const pool = s
      ? companies.filter((c) => c.code.toLowerCase().includes(s) || c.name.toLowerCase().includes(s))
      : companies;
    return pool.slice(0, 12);
  }, [q]);

  useEffect(() => { setIdx(0); }, [q]);

  const choose = (code: string) => {
    setOpen(false);
    navigate({ to: "/company/$ticker", params: { ticker: code } });
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(results.length - 1, i + 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    if (e.key === "Enter" && results[idx]) { e.preventDefault(); choose(results[idx].code); }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[14vh] z-[101] w-[92vw] max-w-[560px] -translate-x-1/2 rounded-2xl overflow-hidden"
            style={{
              background: "rgb(var(--surface-rgb))",
              border: "1px solid rgb(var(--ov) / 0.10)",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="flex items-center gap-3 px-4 h-12 border-b"
              style={{ borderColor: "rgb(var(--ov) / 0.08)" }}
            >
              <Search className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onListKey}
                placeholder="Search ticker or company name…"
                className="flex-1 bg-transparent outline-none text-[14px]"
                style={{ color: "var(--text-primary)" }}
              />
              <kbd
                className="text-[10px] tnum px-1.5 py-0.5 rounded"
                style={{
                  background: "rgb(var(--ov) / 0.06)",
                  color: "var(--text-muted)",
                  border: "1px solid rgb(var(--ov) / 0.08)",
                }}
              >
                ESC
              </kbd>
            </div>

            <div className="max-h-[55vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
                  No companies match "{q}"
                </div>
              ) : (
                <ul role="listbox">
                  {results.map((c, i) => {
                    const active = i === idx;
                    const up = c.changePct >= 0;
                    return (
                      <li key={c.code}>
                        <button
                          onClick={() => choose(c.code)}
                          onMouseEnter={() => setIdx(i)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition"
                          style={{
                            background: active ? "rgb(var(--ov) / 0.06)" : "transparent",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{
                              background: "rgb(var(--ov) / 0.05)",
                              color: "var(--text-primary)",
                              border: "1px solid rgb(var(--ov) / 0.06)",
                            }}
                          >
                            {c.code.slice(0, 2)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                                {c.code}
                              </span>
                              <CategoryBadge category={c.category} size="xs" />
                            </div>
                            <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                              {c.name} · {c.sector}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[12px] tnum" style={{ color: "var(--text-primary)" }}>
                              ৳ {c.price.toLocaleString(undefined, { minimumFractionDigits: c.price < 100 ? 2 : 1 })}
                            </div>
                            <div
                              className="text-[10px] tnum"
                              style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}
                            >
                              {up ? "+" : ""}{c.changePct.toFixed(2)}%
                            </div>
                          </div>
                          {active && (
                            <CornerDownLeft className="w-3.5 h-3.5 ml-1" style={{ color: "var(--text-muted)" }} />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div
              className="flex items-center justify-between px-4 py-2 text-[10px]"
              style={{
                color: "var(--text-muted)",
                borderTop: "1px solid rgb(var(--ov) / 0.06)",
                background: "rgb(var(--ov) / 0.02)",
              }}
            >
              <span>↑↓ navigate · ↵ open</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
