import { useSearchParams, Link } from "react-router-dom";
import { useApi } from "../api.js";
import { GarmentTile } from "../garment.jsx";
import { Spinner, Empty, ProductCard } from "../ui.jsx";

function ClusterProducts({ id }) {
  const { data, loading } = useApi(`/communities/${id}`);
  if (loading) return <Spinner />;
  if (!data) return <Empty>Cluster not found.</Empty>;
  return (
    <section className="section">
      <h2>
        <span className="cc-dot" style={{ background: data.hex }} /> {data.shortLabel} cluster
      </h2>
      <p className="sub">
        {data.size} SKUs · spans {data.nGarmentGroups} garment groups · distinctive colour: {data.distinctiveColour}.
        These items co-occur in real baskets — a coherent aesthetic the algorithm discovered, not a category.
      </p>
      <div className="grid">
        {data.products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

export default function Discover() {
  const [params, setParams] = useSearchParams();
  const selected = params.get("c");
  const { data: communities, loading } = useApi("/communities");
  const { data: looks } = useApi("/looks");

  return (
    <div className="wrap">
      <nav className="crumb"><span>Home / Discover by style</span></nav>
      <div className="disco-head">
        <div>
          <h1 style={{ fontSize: "1.6rem", margin: "0.25rem 0" }}>Discover by style cluster</h1>
          <p className="sub" style={{ color: "var(--ink-2)", maxWidth: "60ch", margin: 0 }}>
            Our fix for the broken "more from this creator" rabbit hole: browse by <b>aesthetic affinity</b> instead of by
            category. Each cluster is a community of items real customers buy together. Pick one to shop it.
          </p>
        </div>
        <Link to="/analytics" className="btn btn-outline">▦ See the data &amp; graph →</Link>
      </div>

      {loading && <Spinner />}
      {communities && (
        <div className="disco-clusters" style={{ marginTop: "1.5rem" }}>
          {communities.map((c) => (
            <button
              key={c.id}
              className={`cluster-card${selected === String(c.id) ? " sel" : ""}`}
              onClick={() => setParams(selected === String(c.id) ? {} : { c: String(c.id) })}
            >
              <span className="cc-dot" style={{ background: c.hex }} />
              <span className="badge badge-cluster">{c.productCount} items · {c.nGarmentGroups} groups</span>
              <h3>{c.shortLabel}</h3>
              <div className="cc-meta">Modal: {c.modalColour} {c.modalGarment} · distinctive: {c.distinctiveColour}</div>
            </button>
          ))}
        </div>
      )}

      {selected ? <ClusterProducts id={selected} /> : (
        <p className="sub" style={{ marginTop: "1.25rem", color: "var(--ink-3)" }}>Select a cluster above to browse its items.</p>
      )}

      {looks && looks.length > 0 && (
        <section className="section">
          <h2>Looks in these clusters</h2>
          <p className="sub">Creator-styled outfits, each anchored in a style cluster above.</p>
          <div className="grid">
            {looks.map((l) => (
              <Link key={l.id} to={`/shop/look/${l.id}`} className="pcard">
                <div className="tile-wrap">
                  {l.anchor && (
                    <GarmentTile hex={l.anchor.hex} slot={l.anchor.slot} appearance={l.anchor.appearance} label={l.title} />
                  )}
                </div>
                <div className="pmeta">
                  <div className="pbrand" style={{ textTransform: "capitalize" }}>{l.title}</div>
                  <div className="pname">{l.creator} · {l.creatorTier}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
