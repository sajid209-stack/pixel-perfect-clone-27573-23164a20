// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
    // Vercel uses the Build Output API — emit to .vercel/output, not dist/.
    output: {
      dir: ".vercel/output",
      serverDir: ".vercel/output/functions/__nitro.func",
      publicDir: ".vercel/output/static",
    },
  },
});
