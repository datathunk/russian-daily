// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: { port: 3030, strictPort: true },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
  nitro: {
    preset: "cloudflare-pages",
    replace: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    alias: {
      "react/jsx-dev-runtime": "/Users/datathunk/dev/AI/russian-daily/src/shims/jsx-dev-runtime.ts",
    },
    externals: {
      inline: [],
      external: ["bun:sqlite", "bun:ffi"],
    },
  },
});
