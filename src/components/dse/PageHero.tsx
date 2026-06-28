import { assetUrl } from "@/lib/asset-url";

type Pointer = { url: string };

export function PageHero({
  src,
  alt,
  caption,
  maxHeight = 320,
}: {
  src: Pointer;
  alt: string;
  caption?: string;
  maxHeight?: number;
}) {
  return (
    <figure className="max-w-[960px] mx-auto px-4 md:px-6 pt-6 m-0">
      <img
        src={assetUrl(src)}
        alt={alt}
        className="w-full block"
        style={{
          maxHeight,
          objectFit: "cover",
          borderRadius: 0,
          border: "1px solid var(--line)",
        }}
      />
      {caption && (
        <figcaption className="mt-2 text-[12px] italic" style={{ color: "#6b7280" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
