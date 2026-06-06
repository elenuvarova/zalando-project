import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useApi, CASE_STUDY } from "../api.js";
import { Spinner } from "../ui.jsx";

const StyleClustersGraph = lazy(() => import("../StyleClustersGraph.jsx"));

const METHODOLOGY = "https://github.com/elenuvarova/zalando-project/blob/main/data/methodology.md";

const FINDINGS = [
  { v: "72.2%", l: "of multi-item baskets span 2+ garment groups — real customers shop cross-category" },
  { v: "63.6%", l: "of the 44 actionable Louvain communities span 2+ garment groups" },
  { v: "65", l: "style communities emerged from co-purchase behaviour alone" },
  { v: "#17", l: "the light-blue denim cluster — 70 SKUs across 4 garment groups" },
];

export default function Analytics() {
  const { data: communities } = useApi("/communities");

  return (
    <div className="wrap analytics">
      <nav className="crumb"><span>Home / The data</span></nav>
      <h1 style={{ fontSize: "1.8rem", margin: "0.25rem 0 0.5rem" }}>The data behind the redesign</h1>
      <p className="lead">
        The redesign's core claim — that style coherence already crosses categories and is solvable at marketplace scale —
        isn't an opinion. It comes from running Apriori-style co-occurrence and <b>Louvain community detection</b> over millions
        of real fashion transactions. Communities of items that customers actually buy together emerge on their own, and most of
        them cross garment categories.
      </p>

      <div className="proxy-note">
        <b>Proxy disclosure.</b> Zalando's transaction data isn't public, so this uses the <b>H&amp;M Personalized Fashion
        Recommendations</b> dataset (Kaggle — 31M transactions) as a proxy. It demonstrates the <i>method</i>, not Zalando's
        specific clusters. Full write-up: <a href={METHODOLOGY} target="_blank" rel="noopener noreferrer">data/methodology.md ↗</a>.
      </div>

      <div className="finding-grid">
        {FINDINGS.map((f) => (
          <div className="finding" key={f.v}>
            <b>{f.v}</b>
            <span>{f.l}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: "1.25rem", margin: "1.5rem 0 0.25rem" }}>The style-cluster network</h2>
      <p className="sub" style={{ color: "var(--ink-3)", maxWidth: "64ch" }}>
        150 SKUs, 495 co-purchase edges, 8 top communities. Each colour is a community the algorithm discovered. This graph is
        the design artifact for the <Link to="/discover">Discover-by-style</Link> navigation — click any node to open the item.
      </p>
      <Suspense fallback={<Spinner label="Loading the interactive graph…" />}>
        <StyleClustersGraph />
      </Suspense>

      {communities && (
        <div className="disco-clusters" style={{ marginTop: "1.5rem" }}>
          {communities.map((c) => (
            <Link key={c.id} to={`/discover?c=${c.id}`} className="cluster-card">
              <span className="cc-dot" style={{ background: c.hex }} />
              <span className="badge badge-cluster">{c.productCount} items · {c.nGarmentGroups} groups</span>
              <h3>{c.shortLabel}</h3>
              <div className="cc-meta">distinctive colour: {c.distinctiveColour}</div>
            </Link>
          ))}
        </div>
      )}

      <section className="section">
        <h2>Why this drives the design</h2>
        <p className="sub">
          Same-category widgets (five more pairs of jeans) fight what the data shows people actually do. The redesigned
          <Link to="/shop"> Complete this outfit</Link> widget enforces cross-category composition, and
          <Link to="/discover"> Discover by style</Link> turns these communities into navigable territory. Full reasoning in the
          <a href={CASE_STUDY} target="_blank" rel="noopener noreferrer"> case study ↗</a>.
        </p>
      </section>
    </div>
  );
}
