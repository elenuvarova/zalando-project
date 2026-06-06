import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sequelize, dbKind } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Security headers + CSP. The case study is same-origin; img-src also allows the
// raw.githubusercontent fallback used for any inline repo images.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // React inline styles + bundled CSS
        imgSrc: ["'self'", "data:", "https://raw.githubusercontent.com"],
        fontSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

app.use(express.json());

// Light rate limit on the API surface.
app.use("/api", rateLimit({ windowMs: 60_000, max: 120, standardHeaders: true, legacyHeaders: false }));

// Liveness check — deliberately does NOT touch the database, so an expired free-tier
// Postgres can never take the (fully static) case-study site offline. Render's health
// check points here.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Separate, non-fatal DB probe for diagnostics.
app.get("/api/health/db", async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", db: dbKind });
  } catch (err) {
    console.error("DB health check failed:", err);
    res.status(503).json({ status: "error", db: dbKind });
  }
});

// Unknown API routes return JSON 404 rather than falling through to the SPA shell.
app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

if (process.env.NODE_ENV === "production") {
  const publicDir = path.join(__dirname, "public");
  app.use(express.static(publicDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Backend listening on :${PORT} — db: ${dbKind}`);
});
