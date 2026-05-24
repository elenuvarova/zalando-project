# AI Workshop Template

A minimal full-stack starter: React (Vite) frontend, Node + Express backend with Sequelize, SQLite for local dev and Postgres on Render. Deploys for free on Render via a `render.yaml` Blueprint.

## Stack

- **Frontend:** React 18 + Vite 5 (JavaScript)
- **Backend:** Node.js + Express (ES modules)
- **ORM:** Sequelize
- **Database:** SQLite locally, PostgreSQL on Render (selected automatically from `DATABASE_URL`)
- **Deploy:** Render free tier (Docker web service + free Postgres)

## Project structure

```
.
├── backend/
│   ├── package.json
│   ├── server.js
│   └── db.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── styles.css
├── Dockerfile
├── render.yaml
├── .env.example
├── .gitignore
├── .dockerignore
└── README.md
```

## Local development

No database to install — SQLite is built in. Sequelize writes to `backend/data.sqlite` on first run.

Open two terminals.

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Then open <http://localhost:5173>. Vite proxies `/api/*` to the backend on `:3001`.

## Deploy to Render

1. Push this repo to GitHub.
2. In Render, click **New → Blueprint** and connect the repo.
3. Render reads `render.yaml`, provisions the free Postgres database, builds the Dockerfile, and wires `DATABASE_URL` into the web service automatically.

Notes on the free tier:
- The web service **sleeps after inactivity** — the first request after a quiet period takes ~30s.
- Render's **free Postgres expires after 30 days** and must be replaced.

## Endpoints

- `GET /api/health` — returns `{ status: "ok", db: "sqlite" | "postgres" }` after `sequelize.authenticate()`.
- `GET /api/hello` — returns `{ message: "Hello from the backend 👋" }`.
- `GET /*` (production only) — serves the built frontend from `backend/public/`.
