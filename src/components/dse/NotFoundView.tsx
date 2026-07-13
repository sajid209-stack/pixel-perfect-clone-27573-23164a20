import { Link } from "@tanstack/react-router";
import { Home, Search, LifeBuoy, ArrowLeft } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function NotFoundView() {
  const { t } = useLang();
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg)", minHeight: "70vh" }}
    >
      {/* Decorative brand gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 300px at 50% 0%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative max-w-[960px] mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
        <div
          className="inline-block text-[10px] font-semibold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full"
          style={{
            color: "var(--brand-600)",
            border: "1px solid color-mix(in oklab, var(--brand) 30%, transparent)",
            background: "color-mix(in oklab, var(--brand) 8%, transparent)",
          }}
        >
          {t("Error 404")}
        </div>

        <div
          className="mt-6 font-semibold leading-none tnum"
          style={{
            fontSize: "clamp(96px, 18vw, 200px)",
            letterSpacing: "-0.04em",
            background:
              "linear-gradient(180deg, var(--brand-600) 0%, var(--brand) 60%, color-mix(in oklab, var(--brand) 40%, transparent) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          404
        </div>

        <h1
          className="mt-2 text-[22px] md:text-[30px] font-semibold"
          style={{ color: "var(--ink)" }}
        >
          {t("Page not found")}
        </h1>
        <p
          className="mt-3 mx-auto text-[14px] md:text-[15px] max-w-[560px]"
          style={{ color: "var(--text-secondary)" }}
        >
          {t(
            "The page you're looking for may have been moved, renamed, or is temporarily unavailable. Try one of the links below.",
          )}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
            style={{ background: "var(--brand)", color: "#fff" }}
          >
            <Home className="w-4 h-4" />
            {t("Go home")}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
            style={{
              border: "1px solid var(--line)",
              color: "var(--ink)",
              background: "var(--surface)",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Go back")}
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { to: "/sitemap", icon: Search, title: "Site Map", desc: "Browse every section of DSE." },
            { to: "/companies", icon: Home, title: "Companies", desc: "Listed companies and prices." },
            { to: "/help-desk", icon: LifeBuoy, title: "Help Desk", desc: "Get assistance from our team." },
          ].map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-lg p-4 transition"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
              }}
            >
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center mb-2"
                style={{
                  background: "color-mix(in oklab, var(--brand) 10%, transparent)",
                  color: "var(--brand-600)",
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {t(title)}
              </div>
              <div className="text-[12.5px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                {t(desc)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
