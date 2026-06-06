# Outfit Discovery, Rebuilt — Zalando UX Case Study

The web home of a Product Designer case study: a redesign of Zalando's *Complete the Look* and
*Get the Look* surfaces, grounded in 99 verbatim customer voices, a 14-competitor scan, and Louvain
community detection on 31M H&M transactions.

This repo serves the case study as a polished reading experience — it fetches and renders
[`writing/case-study.md`](writing/case-study.md) and swaps the static force-graph figure for a live,
interactive D3 visualisation of the style clusters. The companion research, data analysis, design
principles and measurement plan live alongside it in [`research/`](research/), [`data/`](data/) and
[`design/`](design/).

> The case-study narrative and methodology are the substance; this app is its presentation layer.

## Stack

- **Frontend:** React 18 + Vite 5 — `react-markdown` (+ `remark-gfm`, `rehype-slug`,
  `rehype-autolink-headings`) and `react-force-graph-2d`. Self-hosted Fraunces + Inter via `@fontsource`.
- **Backend:** Node.js + Express (ES modules), hardened with `helmet` (CSP) and `express-rate-limit`.
- **ORM:** Sequelize — SQLite locally, PostgreSQL in production (selected from `DATABASE_URL`).
- **Deploy:** single Docker image on Render — Express serves the built SPA from `backend/public/`.

The reading experience includes: editorial serif/sans type pairing, light + dark themes (respecting
`prefers-color-scheme`), a sticky table of contents with scroll-spy, a reading-progress bar,
horizontally-scrollable data tables, an accessible interactive graph, and print/PDF styles.

## How the content assets flow

The SPA fetches three files at runtime: `case-study.md`, `style-clusters.json`,
`style-clusters-preview.png`. Their **single source of truth** is `writing/` and `design/graph/`.
[`frontend/scripts/copy-assets.mjs`](frontend/scripts/copy-assets.mjs) copies them into
`frontend/public/` (gitignored) on `predev`/`prebuild`, so local and production render identical
content. In the Docker build the canonical sources are injected directly (see the `Dockerfile`).

## Project structure

```text
.
├── backend/            # Express + Sequelize API + static SPA host
│   ├── server.js       # helmet/CSP, rate limit, /api/health (DB-independent), SPA fallback
│   └── db.js           # SQLite ↔ Postgres selected from DATABASE_URL
├── frontend/           # React + Vite reading experience
│   ├── index.html      # title, meta description, Open Graph + Twitter card, favicon
│   ├── scripts/
│   │   └── copy-assets.mjs
│   └── src/
│       ├── App.jsx               # markdown render, TOC + scroll-spy, theme, progress
│       └── StyleClustersGraph.jsx# interactive force-directed graph
├── writing/            # canonical case-study.md  (source of truth)
├── research/  data/  design/     # companion artefacts referenced by the case study
├── Dockerfile          # multi-stage: build SPA → slim runtime serving it
└── render.yaml         # Render Blueprint
```

## Local development

No database to install — SQLite is the dev default (`backend/data.sqlite` on first run). Two terminals:

```bash
cd backend  && npm install && npm run dev    # http://localhost:3001
cd frontend && npm install && npm run dev    # http://localhost:5173
```

`predev` copies the content assets into `frontend/public/` automatically. Vite proxies `/api/*` to
the backend. Running the backend alone does **not** serve the SPA — the static branch is
production-only (`NODE_ENV=production`).

## Deploy to Render

1. Push to GitHub.
2. In Render: **New → Blueprint**, connect the repo. Render reads `render.yaml`, builds the
   Dockerfile, and (optionally) provisions Postgres, wiring `DATABASE_URL` in.

Free-tier notes:
- The web service **sleeps after inactivity** — the first request after a quiet period takes ~30s.
- Render's **free Postgres expires after 30 days**. `GET /api/health` is intentionally
  **DB-independent**, so an expired database can never take the (fully static) site offline.

## Endpoints

- `GET /api/health` — `{ status: "ok" }`. Liveness only; does not touch the database.
- `GET /api/health/db` — `{ status, db }`. Diagnostic DB probe; `503` if unreachable.
- `GET /*` (production) — serves the built SPA from `backend/public/`.
