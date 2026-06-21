import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const ssrDir = path.resolve(root, "dist/server");
const candidates = ["entry-server.js", "entry-server.mjs"];
let ssrBundlePath = null;
for (const name of candidates) {
  const p = path.join(ssrDir, name);
  if (fs.existsSync(p)) { ssrBundlePath = p; break; }
}

if (!ssrBundlePath) {
  console.error("❌ SSR bundle not found — run prerender first");
  process.exit(1);
}

const { routes } = await import(ssrBundlePath);

const lastmod = new Date().toISOString().split("T")[0];
const baseUrl = "https://pnmh.site";

const urlEntries = routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

const outPath = path.resolve(root, "dist/public/sitemap.xml");
fs.writeFileSync(outPath, sitemap);
console.log(`✅ Sitemap — ${routes.length} URLs written to dist/public/sitemap.xml`);
