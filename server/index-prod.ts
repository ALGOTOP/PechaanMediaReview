import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Check for a prerendered index.html BEFORE serving static assets.
  // Using app.use(fn) without a path argument means req.path is the real
  // request path (Express does not strip anything), so /audit-report correctly
  // resolves to dist/public/audit-report/index.html without a redirect.
  app.use((req, res, next) => {
    const urlPath = req.path.replace(/\/+$/, ""); // strip trailing slashes
    if (urlPath) {
      const prerendered = path.resolve(distPath, urlPath.slice(1), "index.html");
      if (fs.existsSync(prerendered)) {
        return res.sendFile(prerendered);
      }
    }
    next();
  });

  // Serve static assets (JS, CSS, images, fonts, etc.)
  app.use(express.static(distPath));

  // Fallback: SPA shell for any route without a prerendered file
  app.use((_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
