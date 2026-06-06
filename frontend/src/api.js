import { useEffect, useState } from "react";

// The written case study lives in Notion (publish it to web so visitors can open it).
export const CASE_STUDY = "https://www.notion.so/3772ead75652811cbb73e5ca14e56c63";
export const REPO = "https://github.com/elenuvarova/zalando-project";

// Same-origin /api — Vite proxies to the backend in dev; Express serves it in prod.
export async function api(path, signal) {
  const res = await fetch(`/api${path}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useApi(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    const ctrl = new AbortController();
    setState({ data: null, loading: true, error: null });
    api(path, ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: null, loading: false, error: err.message });
      });
    return () => ctrl.abort();
  }, [path]);
  return state;
}

export function euro(n) {
  if (n == null) return "";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}
