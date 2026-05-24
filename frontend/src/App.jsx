import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (active) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [url]);

  return { data, error, loading };
}

function Card({ title, state }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {state.loading && <p className="muted">Loading…</p>}
      {state.error && <p className="error">Error: {state.error}</p>}
      {state.data && <pre>{JSON.stringify(state.data, null, 2)}</pre>}
    </section>
  );
}

export default function App() {
  const hello = useFetch("/api/hello");
  const health = useFetch("/api/health");

  return (
    <main>
      <h1>AI Workshop Template</h1>
      <p className="muted">
        React + Vite frontend, Express + Sequelize backend. SQLite locally,
        Postgres on Render.
      </p>
      <Card title="GET /api/hello" state={hello} />
      <Card title="GET /api/health" state={health} />
    </main>
  );
}
