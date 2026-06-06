// Single source of truth for the static assets the SPA fetches at runtime.
// The canonical files live in writing/ and design/graph/; this copies them into
// frontend/public/ (gitignored) before dev and build so local == production.
//
// In the Docker build the canonical sources aren't present in the frontend stage
// (the Dockerfile COPYs them in explicitly), so a missing source is skipped, not fatal.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const publicDir = resolve(here, "..", "public");

const assets = [
  ["writing/case-study.md", "case-study.md"],
  ["design/graph/style-clusters.json", "style-clusters.json"],
  ["design/graph/style-clusters-preview.png", "style-clusters-preview.png"],
];

mkdirSync(publicDir, { recursive: true });

for (const [from, to] of assets) {
  const src = resolve(repoRoot, from);
  if (!existsSync(src)) {
    console.log(`copy-assets: skip ${from} (not present — Docker provides it)`);
    continue;
  }
  copyFileSync(src, resolve(publicDir, to));
  console.log(`copy-assets: ${from} → public/${to}`);
}
