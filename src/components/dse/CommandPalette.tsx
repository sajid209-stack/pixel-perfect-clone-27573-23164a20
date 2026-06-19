import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Search, CornerDownLeft, Clock, X, Building2, Newspaper, FileText } from "lucide-react";
import { companies } from "@/data/companies";
import { CategoryBadge } from "./CategoryBadge";
import { useLang } from "@/i18n/LanguageContext";

/* ---------- sample non-company data (structured so it can later come from the DSE DB) ---------- */

type NewsHit = { id: string; title: string; tag: string; date: string; to: string };
type PageHit = { id: string; title: string; description: string; to: string };

const newsItems: NewsHit[] = [
  { id: "n1", title: "DSEX closes above 6,240 as pharma rallies", tag: "Market", date: "Jun 06", to: "/news" },
  { id: "n2", title: "Three IPOs open for subscription next week", tag: "IPO", date: "Jun 05", to: "/news" },
  { id: "n3", title: "BSEC clarifies new margin rules for retail", tag: "Policy", date: "Jun 04", to: "/news" },
  { id: "n4", title: "Square Pharma declares 65% cash dividend", tag: "Disclosure", date: "Jun 03", to: "/news" },
  { id: "n5", title: "Foreign turnover rises 12% week-on-week", tag: "Foreign", date: "Jun 02", to: "/foreign-investors" },
  { id: "n6", title: "Bond market notice: T-bond auction calendar", tag: "Notice", date: "Jun 01", to: "/bonds" },
];

const pageItems: PageHit[] = [
  { id: "p-home", title: "Home", description: "Live market overview, indices and movers.", to: "/" },
  { id: "p-markets", title: "Markets", description: "Equities, bonds, funds and instruments.", to: "/markets" },
  { id: "p-companies", title: "Companies", description: "All 356 listed issuers.", to: "/companies" },
  { id: "p-indices", title: "Indices", description: "DSEX, DS30 and shariah benchmarks.", to: "/indices" },
  { id: "p-ipo", title: "IPO", description: "Subscription pipeline and prospectuses.", to: "/ipo" },
  { id: "p-news", title: "News", description: "Market news and price-sensitive disclosures.", to: "/news" },
  { id: "p-learn", title: "Learn", description: "Investor education hub.", to: "/learn" },
  { id: "p-about", title: "About DSE", description: "Organisation, governance and history.", to: "/about" },
  { id: "p-members", title: "Members", description: "Broker and DP member directory.", to: "/members" },
  { id: "p-regulations", title: "Regulations", description: "Listing rules, bylaws and rulebook.", to: "/regulations" },
  { id: "p-reports", title: "Reports", description: "Daily, weekly and annual reports.", to: "/reports" },
  { id: "p-foreign", title: "Foreign investors", description: "How non-residents can invest in DSE.", to: "/foreign-investors" },
  { id: "p-complaints", title: "Complaints", description: "Lodge and track investor complaints.", to: "/complaints" },
  { id: "p-contact", title: "Contact", description: "Reach DSE offices and helpline.", to: "/contact" },
  { id: "p-bonds", title: "Bonds", description: "Corporate, treasury and sukuk.", to: "/bonds" },
  { id: "p-funds", title: "Funds", description: "Mutual funds and ETF directory.", to: "/funds" },
  { id: "p-corp", title: "Corporate actions", description: "Dividends, splits and AGMs.", to: "/corporate-actions" },
];

/* ---------- open/close pub/sub ---------- */

let listeners = new Set<(v: boolean) => void>();
export function openCommandPalette() {
  listeners.forEach((l) => l(true));
}
export const openSiteSearch = openCommandPalette;

/* ---------- recent searches ---------- */

const RECENTS_KEY = "dse-site-search-recents";
function loadRecents(): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((s) => typeof s === "string").slice(0, 6) : [];
  } catch { return []; }
}
function saveRecents(list: string[]) {
  try { localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, 6))); } catch {}
}

/* ---------- component ---------- */

type FlatResult =
  | { kind: "company"; item: typeof companies[number] }
  | { kind: "news"; item: NewsHit }
  | { kind: "page"; item: PageHit };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [recents, setRecents] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t, lang } = useLang();

  useEffect(() => {
    const fn = (v: boolean) => setOpen(v);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || (target as HTMLElement).isContentEditable);
      if (e.key === "Escape") { setOpen(false); return; }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); return; }
      if (e.key === "/" && !open && !isTyping) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setRecents(loadRecents());
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const { companyHits, newsHits, pageHits, flat } = useMemo(() => {
    const s = q.trim().toLowerCase();
    const cHits = s
      ? companies.filter((c) => c.code.toLowerCase().includes(s) || c.name.toLowerCase().includes(s)).slice(0, 6)
      : [];
    const nHits = s
      ? newsItems.filter((n) => n.title.toLowerCase().includes(s) || n.tag.toLowerCase().includes(s)).slice(0, 5)
      : [];
    const pHits = s
      ? pageItems.filter((p) => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)).slice(0, 5)
      : [];
    const f: FlatResult[] = [
      ...cHits.map((c) => ({ kind: "company" as const, item: c })),
      ...nHits.map((n) => ({ kind: "news" as const, item: n })),
      ...pHits.map((p) => ({ kind: "page" as const, item: p })),
    ];
    return { companyHits: cHits, newsHits: nHits, pageHits: pHits, flat: f };
  }, [q]);

  useEffect(() => { setIdx(0); }, [q]);

  const commit = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recents.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 6);
    setRecents(next);
    saveRecents(next);
  };

  const go = (r: FlatResult) => {
    commit(q);
    setOpen(false);
    if (r.kind === "company") navigate({ to: "/company/$ticker", params: { ticker: r.item.code } });
    else navigate({ to: r.item.to });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(flat.length - 1, i + 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    if (e.key === "Enter" && flat[idx]) { e.preventDefault(); go(flat[idx]); }
    if (e.key === "Tab") {
      // focus trap: keep focus inside panel
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>('input,button,[tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  if (typeof document === "undefined") return null;

  const ph = lang === "bn" ? "টিকার, কোম্পানি, নিউজ বা পেজ খুঁজুন…" : "Search companies, news, pages…";
  const noResults = lang === "bn" ? "কোনো ফলাফল পাওয়া যায়নি" : "No results match";
  const recentLabel = lang === "bn" ? "সাম্প্রতিক অনুসন্ধান" : "Recent searches";
  const startLabel = lang === "bn" ? "টাইপ শুরু করুন—কোম্পানি, নিউজ ও পেজ খুঁজে দেখুন" : "Start typing to search companies, news and pages";

  let runningIdx = -1;
  const groupHeader = (icon: React.ReactNode, label: string, count: number) => (
    <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
      style={{ color: "var(--text-muted)" }}>
      {icon}<span>{label}</span><span className="opacity-60">· {count}</span>
    </div>
  );

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
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[10vh] z-[101] w-[94vw] max-w-[680px] -translate-x-1/2 overflow-hidden"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5)",
              borderRadius: 4,
            }}
          >
            <div className="flex items-center gap-3 px-4 h-14 border-b" style={{ borderColor: "var(--line)" }}>
              <Search className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder={ph}
                aria-label={ph}
                className="flex-1 bg-transparent outline-none text-[14px]"
                style={{ color: "var(--ink)" }}
              />
              <kbd className="text-[10px] tnum px-1.5 py-0.5"
                style={{ background: "rgb(var(--ov) / 0.06)", color: "var(--text-muted)", border: "1px solid var(--line)", borderRadius: 2 }}>
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto" role="listbox">
              {!q.trim() ? (
                <div className="px-4 py-5">
                  {recents.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                          {recentLabel}
                        </div>
                        <button
                          onClick={() => { setRecents([]); saveRecents([]); }}
                          className="text-[11px] inline-flex items-center gap-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <X className="w-3 h-3" /> clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {recents.map((r) => (
                          <button
                            key={r}
                            onClick={() => { setQ(r); inputRef.current?.focus(); }}
                            className="inline-flex items-center gap-1.5 px-2.5 h-7 text-[12px]"
                            style={{ border: "1px solid var(--line)", background: "var(--surface-2, var(--surface))", color: "var(--ink)", borderRadius: 2 }}
                          >
                            <Clock className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
                            {r}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="py-10 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
                      {startLabel}
                    </div>
                  )}
                </div>
              ) : flat.length === 0 ? (
                <div className="px-4 py-10 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
                  {noResults} "{q}"
                </div>
              ) : (
                <>
                  {companyHits.length > 0 && (
                    <>
                      {groupHeader(<Building2 className="w-3 h-3" />, t("Companies"), companyHits.length)}
                      <ul>
                        {companyHits.map((c) => {
                          runningIdx++;
                          const active = runningIdx === idx;
                          const my = runningIdx;
                          const up = c.changePct >= 0;
                          return (
                            <li key={c.code} role="option" aria-selected={active}>
                              <button
                                onClick={() => go({ kind: "company", item: c })}
                                onMouseEnter={() => setIdx(my)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition"
                                style={{ background: active ? "rgb(var(--ov) / 0.06)" : "transparent" }}
                              >
                                <div className="w-8 h-8 flex items-center justify-center text-[10px] font-bold shrink-0"
                                  style={{ background: "rgb(var(--ov) / 0.05)", color: "var(--ink)", border: "1px solid var(--line)", borderRadius: 2 }}>
                                  {c.code.slice(0, 2)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>{c.code}</span>
                                    <CategoryBadge category={c.category} size="xs" />
                                  </div>
                                  <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                                    {c.name} · {c.sector}
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-[12px] tnum" style={{ color: "var(--ink)" }}>
                                    ৳ {c.price.toLocaleString(undefined, { minimumFractionDigits: c.price < 100 ? 2 : 1 })}
                                  </div>
                                  <div className="text-[10px] tnum" style={{ color: up ? "var(--green-up)" : "var(--red-down)" }}>
                                    {up ? "+" : ""}{c.changePct.toFixed(2)}%
                                  </div>
                                </div>
                                {active && <CornerDownLeft className="w-3.5 h-3.5 ml-1" style={{ color: "var(--text-muted)" }} />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  {newsHits.length > 0 && (
                    <>
                      {groupHeader(<Newspaper className="w-3 h-3" />, t("News & disclosures"), newsHits.length)}
                      <ul>
                        {newsHits.map((n) => {
                          runningIdx++;
                          const active = runningIdx === idx;
                          const my = runningIdx;
                          return (
                            <li key={n.id} role="option" aria-selected={active}>
                              <button
                                onClick={() => go({ kind: "news", item: n })}
                                onMouseEnter={() => setIdx(my)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition"
                                style={{ background: active ? "rgb(var(--ov) / 0.06)" : "transparent" }}
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="text-[13px] font-medium truncate" style={{ color: "var(--ink)" }}>{n.title}</div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="inline-flex items-center px-1.5 h-[16px] text-[10px] font-semibold uppercase tracking-wider"
                                      style={{ background: "rgb(var(--ov) / 0.06)", color: "var(--text-secondary)", border: "1px solid var(--line)", borderRadius: 2 }}>
                                      {n.tag}
                                    </span>
                                    <span className="text-[11px] tnum" style={{ color: "var(--text-muted)" }}>{n.date}</span>
                                  </div>
                                </div>
                                {active && <CornerDownLeft className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  {pageHits.length > 0 && (
                    <>
                      {groupHeader(<FileText className="w-3 h-3" />, t("Pages"), pageHits.length)}
                      <ul>
                        {pageHits.map((p) => {
                          runningIdx++;
                          const active = runningIdx === idx;
                          const my = runningIdx;
                          return (
                            <li key={p.id} role="option" aria-selected={active}>
                              <button
                                onClick={() => go({ kind: "page", item: p })}
                                onMouseEnter={() => setIdx(my)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition"
                                style={{ background: active ? "rgb(var(--ov) / 0.06)" : "transparent" }}
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>{p.title}</div>
                                  <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{p.description}</div>
                                </div>
                                {active && <CornerDownLeft className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2 text-[10px]"
              style={{ color: "var(--text-muted)", borderTop: "1px solid var(--line)", background: "rgb(var(--ov) / 0.02)" }}>
              <span>↑↓ navigate · ↵ open · ESC close</span>
              <span>{flat.length} results</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
