// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";
import path from "node:path";

const repositoryName = process.env["GITHUB_REPOSITORY"]?.split("/")[1];
const base = process.env["VITE_BASE_PATH"] ?? (repositoryName ? `/${repositoryName}/` : "/");
const catalogueData = JSON.parse(readFileSync(path.resolve("src/data/catalogue.json"), "utf8")) as {
  products: Array<{ category: string; slug: string }>;
};
const productPages = catalogueData.products.map(({ category, slug }) => ({
  path: `/products/${category}/${slug}`,
}));

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
    },
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/brands" },
      { path: "/contact" },
      { path: "/products" },
      { path: "/quote" },
      { path: "/products/building-materials" },
      { path: "/products/hardware" },
      { path: "/products/power-tools" },
      { path: "/products/hand-tools" },
      { path: "/products/paints-coatings" },
      { path: "/products/welding" },
      { path: "/products/adhesives-sealants" },
      { path: "/products/safety" },
      ...productPages,
    ],
    spa: { enabled: false },
  },
  vite: { base },
});
