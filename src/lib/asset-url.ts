// Lovable assets are served from /__l5e/assets-v1/* on Lovable hosting.
// When deployed to other hosts (e.g. Vercel), that path 404s, so we
// rewrite to the project's stable Lovable CDN origin.
const LOVABLE_CDN_ORIGIN = "https://pixel-perfect-clone-27573.lovable.app";

export function assetUrl(pointer: { url: string }): string {
  const path = pointer.url;
  if (typeof window === "undefined") {
    // SSR: emit absolute URL so it works regardless of host.
    return LOVABLE_CDN_ORIGIN + path;
  }
  const host = window.location.hostname;
  if (host.endsWith("lovable.app") || host === "localhost" || host === "127.0.0.1") {
    return path;
  }
  return LOVABLE_CDN_ORIGIN + path;
}
