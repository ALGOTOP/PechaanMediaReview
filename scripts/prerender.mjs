import { build } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// ── Step 1: Set up jsdom browser environment BEFORE any React imports ──
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "https://pnmh.site/",
  pretendToBeVisual: true,
});
const { window } = dom;

// Inject all browser globals needed by React, Radix UI, framer-motion, etc.
for (const key of Object.getOwnPropertyNames(window)) {
  if (!(key in globalThis)) {
    try { globalThis[key] = window[key]; } catch (_) {}
  }
}
globalThis.window = window;
globalThis.document = window.document;
globalThis.navigator = window.navigator;
globalThis.location = window.location;
globalThis.SVGElement = window.SVGElement;
globalThis.HTMLElement = window.HTMLElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.Event = window.Event;
globalThis.CustomEvent = window.CustomEvent;
globalThis.MutationObserver = window.MutationObserver;
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
globalThis.IntersectionObserver = class {
  observe() {} unobserve() {} disconnect() {}
};
globalThis.ResizeObserver = class {
  observe() {} unobserve() {} disconnect() {}
};

console.log("🔨 Building SSR bundle...");

// ── Step 2: Build the SSR entry bundle ──
await build({
  root: path.resolve(root, "client"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(root, "client/src"),
      "@assets": path.resolve(root, "attached_assets"),
      "@shared": path.resolve(root, "shared"),
    },
  },
  build: {
    ssr: "src/entry-server.tsx",
    outDir: path.resolve(root, "dist/server"),
    rollupOptions: {
      output: { format: "esm" },
    },
  },
  logLevel: "warn",
});

// ── Step 3: Find the built SSR file ──
const serverDir = path.resolve(root, "dist/server");
const candidates = ["entry-server.js", "entry-server.mjs"];
let ssrBundlePath = null;
for (const name of candidates) {
  const p = path.join(serverDir, name);
  if (fs.existsSync(p)) { ssrBundlePath = p; break; }
}
if (!ssrBundlePath) {
  const files = fs.readdirSync(serverDir);
  console.error("SSR bundle not found. Files in dist/server:", files);
  process.exit(1);
}

// ── Step 4: Render to HTML string ──
console.log("⚙️  Rendering app to HTML...");
const { render } = await import(ssrBundlePath);
let appHtml = "";
try {
  appHtml = render();
} catch (err) {
  console.error("❌ SSR render error:", err.message);
  console.error(err.stack);
  process.exit(1);
}

if (!appHtml || appHtml.length < 100) {
  console.error("❌ render() returned empty or near-empty output");
  process.exit(1);
}

// ── Step 5: Inject into built index.html ──
const htmlPath = path.resolve(root, "dist/public/index.html");
const template = fs.readFileSync(htmlPath, "utf-8");
const output = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);
fs.writeFileSync(htmlPath, output);

const tagCount = (output.match(/<(p|h1|h2|h3|h4|section|article|nav|header|footer)[^>]*>/gi) || []).length;
console.log(`✅ Pre-render complete — ${tagCount} content tags injected`);
