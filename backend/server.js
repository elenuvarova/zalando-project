import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sequelize, dbKind } from "./db.js";
import * as catalog from "./catalog.js";

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

// --- Catalog / recommendation API (data from the H&M analysis) ---------------
app.get("/api/meta", (_req, res) => res.json(catalog.meta));

app.get("/api/products", (req, res) => {
  res.json(catalog.listProducts(req.query));
});

app.get("/api/products/:id", (req, res) => {
  const p = catalog.getProduct(req.params.id);
  return p ? res.json(p) : res.status(404).json({ error: "Product not found" });
});

// "Complete this outfit" — cross-category co-purchase recommendation.
app.get("/api/products/:id/outfit", (req, res) => {
  const o = catalog.getOutfit(req.params.id);
  return o ? res.json(o) : res.status(404).json({ error: "Product not found" });
});

app.get("/api/communities", (_req, res) => res.json(catalog.listCommunities()));

app.get("/api/communities/:id", (req, res) => {
  const c = catalog.getCommunity(req.params.id);
  return c ? res.json(c) : res.status(404).json({ error: "Community not found" });
});

app.get("/api/looks", (_req, res) => res.json(catalog.listLooks()));

app.get("/api/looks/:id", (req, res) => {
  const l = catalog.getLook(req.params.id);
  return l ? res.json(l) : res.status(404).json({ error: "Look not found" });
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
