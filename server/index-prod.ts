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

  // Serve static assets (JS, CSS, images, etc.) — redirect:false prevents
  // express from 301-redirecting /audit-report → /audit-report/ so the
  // prerendered index.html is served cleanly at the original URL.
  app.use(express.static(distPath, { redirect: false }));

  // For every non-asset request, check whether a prerendered index.html
  // exists for that route and serve it; otherwise fall back to the SPA shell.
  app.use("*", (req, res) => {
    const cleanPath = req.path.replace(/\/+$/, ""); // strip trailing slashes
    if (cleanPath) {
      const prerendered = path.resolve(distPath, cleanPath.slice(1), "index.html");
      if (fs.existsSync(prerendered)) {
        return res.sendFile(prerendered);
      }
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
