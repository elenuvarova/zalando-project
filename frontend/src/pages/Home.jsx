import { Link } from "react-router-dom";
import { useApi } from "../api.js";
import { ProductCard } from "../ui.jsx";

const CASE_STUDY = "https://github.com/elenuvarova/zalando-project/blob/main/writing/case-study.md";

export default function Home() {
  // Feature a few products that have rich outfits (trousers/denim land well).
  const { data } = useApi("/products?slot=bottom&limit=8");

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Outfit completion, actually completed.</h1>
          <p>
            Zalando stacks five recommendation widgets that all promise to complete your look — and deliver five more pairs of
            jeans. This is a concept redesign of three connected surfaces, rebuilt around <b>outfit-as-object</b>, a
            <b> rationale on every pairing</b>, and <b>style-cluster discovery</b> — and it's powered by a real recommendation
            engine built from millions of transactions.
          </p>
          <div className="cta-row">
            <Link to="/shop" className="btn btn-primary">Shop the redesign</Link>
            <Link to="/analytics" className="btn btn-outline">See the data</Link>
            <a href={CASE_STUDY} className="btn btn-outline" target="_blank" rel="noopener noreferrer">Read the case study ↗</a>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section" style={{ borderTop: "none" }}>
          <div className="home-band">
            <Link to="/shop" className="home-tile">
              <span className="badge badge-cluster">Redesigned PDP</span>
              <h3>Complete this outfit →</h3>
              <p>Cross-category pieces chosen by real co-purchase affinity, each with the reason it works and a one-tap bundle.</p>
            </Link>
            <Link to="/discover" className="home-tile">
              <span className="badge badge-cluster">Discovery</span>
              <h3>Discover by style cluster →</h3>
              <p>Navigate by aesthetic affinity instead of category, using communities the algorithm found in basket data.</p>
            </Link>
            <Link to="/analytics" className="home-tile">
              <span className="badge badge-cluster">The data</span>
              <h3>See the evidence →</h3>
              <p>Louvain community detection on 31M transactions: 63.6% of style clusters cross garment categories.</p>
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="kpi-row">
            <div className="kpi"><b>836</b><span>real products in the catalogue</span></div>
            <div className="kpi"><b>237</b><span>data-driven outfits</span></div>
            <div className="kpi"><b>8</b><span>style clusters to explore</span></div>
            <div className="kpi"><b>3</b><span>connected surfaces redesigned</span></div>
          </div>
        </section>

        {data && data.length > 0 && (
          <section className="section">
            <h2>Start here — trousers &amp; denim</h2>
            <p className="sub">These have the richest "Complete this outfit" recommendations. Open one to see the fix.</p>
            <div className="grid">
              {data.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
