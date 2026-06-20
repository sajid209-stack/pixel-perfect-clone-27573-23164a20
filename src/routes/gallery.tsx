import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";
import heritageCryoutAsset from "@/assets/heritage-cryout-1998.jpg.asset.json";
import heroTowerAsset from "@/assets/hero-dse-tower.jpg.asset.json";
import aboutDseMegaAsset from "@/assets/about-dse-mega.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Dhaka Stock Exchange" },
      {
        name: "description",
        content:
          "Photographs of DSE events, heritage moments, the trading floor, leadership and facilities.",
      },
      { property: "og:title", content: "Gallery | DSE" },
      {
        property: "og:description",
        content: "DSE photography — events, heritage, trading floor, leadership and facilities.",
      },
    ],
  }),
  component: GalleryPage,
});

const ALBUMS = [
  { id: "all", label: "All" },
  { id: "events", label: "Events" },
  { id: "heritage", label: "Heritage" },
  { id: "floor", label: "Trading Floor" },
  { id: "leadership", label: "Leadership" },
  { id: "facilities", label: "Facilities" },
] as const;

type AlbumId = (typeof ALBUMS)[number]["id"];

type Photo = {
  src: string;
  album: Exclude<AlbumId, "all">;
  caption: string;
  year: string;
};

const PHOTOS: Photo[] = [
  { src: heritageCryoutAsset.url, album: "heritage", caption: "Outcry trading on Motijheel floor", year: "1998" },
  { src: heroTowerAsset.url, album: "facilities", caption: "DSE Tower, Nikunja headquarters", year: "2018" },
  { src: aboutDseMegaAsset.url, album: "leadership", caption: "DSE Board strategy meeting", year: "2024" },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=70", album: "events", caption: "Annual Investor Conference plenary", year: "2025" },
  { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70", album: "leadership", caption: "Chairman addressing the AGM", year: "2024" },
  { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=70", album: "leadership", caption: "Senior management briefing", year: "2023" },
  { src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=70", album: "floor", caption: "Trading desks during continuous session", year: "2025" },
  { src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=70", album: "floor", caption: "Market data wall in the operations room", year: "2024" },
  { src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=70", album: "floor", caption: "Live indices ticker", year: "2025" },
  { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=70", album: "facilities", caption: "DSE Tower exterior at dusk", year: "2022" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=70", album: "facilities", caption: "Investor lounge, ground floor", year: "2023" },
  { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70", album: "events", caption: "IPO listing ceremony — bell ringing", year: "2025" },
  { src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=1200&q=70", album: "events", caption: "Capital Markets Awards night", year: "2024" },
  { src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=70", album: "events", caption: "Foreign investor roundtable", year: "2024" },
  { src: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&q=70", album: "heritage", caption: "Original DSE building, Motijheel", year: "1956" },
  { src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1200&q=70", album: "heritage", caption: "Demutualization signing ceremony", year: "2013" },
];

function GalleryPage() {
  const [album, setAlbum] = useState<AlbumId>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () => (album === "all" ? PHOTOS : PHOTOS.filter((p) => p.album === album)),
    [album],
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, filtered.length]);

  const current = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Nav />

      <main className="flex-1">
        <section
          className="border-b"
          style={{ borderColor: "var(--line)", background: "var(--surface)" }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2"
              style={{ color: "var(--brand-600)" }}
            >
              Dhaka Stock Exchange
            </div>
            <h1
              className="text-[28px] md:text-[36px] font-semibold tracking-tight"
              style={{ color: "var(--ink)" }}
            >
              Gallery
            </h1>
            <p
              className="mt-2 text-[14px] md:text-[15px] max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Photographs from DSE events, the trading floor, leadership moments and our heritage.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Album filter chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {ALBUMS.map((a) => {
              const active = album === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setAlbum(a.id)}
                  className="px-3 py-1.5 text-[12px] font-semibold transition"
                  style={{
                    borderRadius: 2,
                    border: "1px solid var(--line)",
                    background: active ? "var(--brand-600)" : "var(--surface)",
                    color: active ? "#fff" : "var(--ink)",
                  }}
                >
                  {a.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div
            className="grid gap-2 md:gap-3"
            style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}
          >
            <style>{`
              @media (min-width: 640px) { .gallery-grid { grid-template-columns: repeat(3, minmax(0,1fr)) !important; } }
              @media (min-width: 1024px) { .gallery-grid { grid-template-columns: repeat(4, minmax(0,1fr)) !important; } }
            `}</style>
            <div
              className="gallery-grid col-span-full grid gap-2 md:gap-3"
              style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}
            >
              {filtered.map((p, i) => (
                <button
                  key={p.src + i}
                  onClick={() => setLightboxIdx(i)}
                  className="group relative overflow-hidden text-left"
                  style={{
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    borderRadius: 2,
                    aspectRatio: "1 / 1",
                  }}
                >
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition group-hover:scale-[1.02]"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 px-2 py-1.5 text-[11px]"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                      color: "#fff",
                    }}
                  >
                    <span className="font-semibold tnum mr-1">{p.year}</span>
                    <span className="opacity-90">{p.caption}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div
              className="text-center py-12 text-[13px]"
              style={{ color: "var(--text-muted)" }}
            >
              No photographs in this album yet.
            </div>
          )}

          <p
            className="mt-6 text-[11px] italic"
            style={{ color: "var(--text-muted)" }}
          >
            Images are indicative placeholders pending the official DSE photo library.
          </p>
        </section>
      </main>

      {/* Lightbox */}
      {current && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 2 }}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
            }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 2 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length));
            }}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 2 }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative flex flex-col"
            style={{
              maxWidth: "min(90vw, 90vh)",
              maxHeight: "90vh",
              background: "var(--surface)",
              borderRadius: 2,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                aspectRatio: "1 / 1",
                maxHeight: "75vh",
                background: "#000",
                overflow: "hidden",
              }}
            >
              <img src={current.src} alt={current.caption} className="w-full h-full object-contain" />
            </div>
            <div className="px-4 py-3 flex items-baseline gap-3" style={{ borderTop: "1px solid var(--line)" }}>
              <span className="text-[12px] font-semibold tnum" style={{ color: "var(--brand-600)" }}>
                {current.year}
              </span>
              <span className="text-[13px]" style={{ color: "var(--ink)" }}>
                {current.caption}
              </span>
              <span className="ml-auto text-[11px] tnum" style={{ color: "var(--text-muted)" }}>
                {lightboxIdx + 1} / {filtered.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
