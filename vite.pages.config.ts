import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.VITE_BASE_PATH ?? (repositoryName ? `/${repositoryName}/` : "/");

export default defineConfig({
  vite: { base },
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
    },
  },
});
