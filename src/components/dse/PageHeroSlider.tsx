import { useEffect, useState } from "react";
import { assetUrl } from "@/lib/asset-url";

type Pointer = { url: string };
type Slide = { src: Pointer; alt: string; caption?: string };

export function PageHeroSlider({
  slides,
  maxHeight = 320,
  interval = 4500,
}: {
  slides: Slide[];
  maxHeight?: number;
  interval?: number;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [slides.length, interval]);

  return (
    <figure className="max-w-[1280px] mx-auto px-4 md:px-6 pt-6 m-0">
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: maxHeight,
          border: "1px solid var(--line)",
          borderRadius: 0,
          background: "var(--bg)",
        }}
      >
        {slides.map((s, i) => (
          <img
            key={i}
            src={assetUrl(s.src)}
            alt={s.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0 }}
            aria-hidden={i !== idx}
          />
        ))}
        {slides.length > 1 && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? 18 : 6,
                  height: 6,
                  background: i === idx ? "#ffffff" : "rgba(255,255,255,0.6)",
                  border: "none",
                  transition: "width 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
      {slides[idx]?.caption && (
        <figcaption className="mt-2 text-[12px] italic" style={{ color: "#6b7280" }}>
          {slides[idx].caption}
        </figcaption>
      )}
    </figure>
  );
}

export const DEFAULT_HERO_SLIDES: Slide[] = [
  { src: { url: "/__l5e/assets-v1/7551ffde-ee22-4aa3-a080-b98fde86b863/dse-tower.jpg" }, alt: "DSE Tower" },
  { src: { url: "/__l5e/assets-v1/151b92b9-f3e2-452a-8d0a-d8f3ce86e9d4/dse-automation-1.jpg" }, alt: "DSE automation" },
  { src: { url: "/__l5e/assets-v1/13c1b9e4-c241-42a7-aa06-45c59576252e/dse-automation-3.jpg" }, alt: "DSE event" },
  { src: { url: "/__l5e/assets-v1/f5041342-beaa-4a48-8f48-77a4f328c302/dse-automation-5.jpg" }, alt: "DSE floor" },
];
