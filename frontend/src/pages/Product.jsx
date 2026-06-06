import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApi, euro } from "../api.js";
import { GarmentTile } from "../garment.jsx";
import { Spinner, Empty, Price, ProvenanceBadge, Rationale } from "../ui.jsx";

const SIZES = ["XS", "S", "M", "L", "XL"];

function OutfitCard({ item }) {
  return (
    <div className="outfit-card">
      <Link to={`/shop/product/${item.id}`} className="tile-wrap">
        <GarmentTile hex={item.hex} slot={item.slot} appearance={item.appearance} label={`${item.colour} ${item.productType}`} />
        <span className="gtile-note">illustrative</span>
      </Link>
      <div className="oc-body">
        <span className="oc-slot">{item.slotLabel}</span>
        <ProvenanceBadge provenance={item.provenance} />
        <Link to={`/shop/product/${item.id}`} className="oc-brand">{item.brand}</Link>
        <span className="oc-name">{item.name}</span>
        <Rationale text={item.rationale} />
        <div className="oc-foot">
          <Price value={item.price} />
          <button className="btn btn-outline btn-sm" type="button">Add</button>
        </div>
      </div>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const { data: p, loading, error } = useApi(`/products/${id}`);
  const { data: outfit } = useApi(`/products/${id}/outfit`);
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);

  if (loading) return <Spinner label="Loading product…" />;
  if (error || !p) return <Empty>Product not found. <Link to="/shop">Back to shop</Link></Empty>;

  const soldOutSize = SIZES[(parseInt(p.id.slice(-1), 10) || 0) % SIZES.length];

  return (
    <div className="wrap">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <Link to="/shop">{p.index}</Link> <span>/</span>
        <Link to="/shop">{p.garmentGroup}</Link> <span>/</span> <span>{p.name}</span>
      </nav>

      <div className="pdp">
        <div className="pdp-gallery">
          <GarmentTile hex={p.hex} slot={p.slot} appearance={p.appearance} label={`${p.colour} ${p.productType}`} />
          <span className="gtile-note">illustrative — no product photo available (H&amp;M proxy)</span>
        </div>

        <div className="pdp-info">
          <div className="pdp-brand">{p.brand}</div>
          <h1>{p.name}</h1>
          <div className="pdp-price"><Price value={p.price} /></div>

          <div className="pdp-attr">
            <span className="badge badge-cluster"><span className="swatch" style={{ background: p.hex }} />{p.colour}</span>
            <span className="badge badge-cluster">{p.productType}</span>
            <span className="badge badge-cluster">{p.appearance}</span>
            {p.community && (
              <Link to={`/discover?c=${p.community.id}`} className="badge badge-cluster">
                ● {p.community.shortLabel} cluster
              </Link>
            )}
          </div>

          <div className="size-row" role="group" aria-label="Select size">
            {SIZES.map((s) => (
              <button
                key={s}
                className={`size-btn${size === s ? " sel" : ""}`}
                disabled={s === soldOutSize}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="pdp-cta">
            <button
              className="btn btn-primary btn-block"
              onClick={() => setAdded(true)}
              disabled={!size}
            >
              {added ? "Added to bag ✓" : size ? "Add to bag" : "Select a size"}
            </button>
            <button className="icon-btn" aria-label="Add to wishlist">♡</button>
          </div>

          {p.detail && <p className="pdp-detail">{p.detail}</p>}
        </div>
      </div>

      {/* OUR FIX: cross-category outfit completion with rationale + provenance + bundle */}
      {outfit && outfit.available && outfit.items.length > 0 && (
        <section className="section">
          <h2>Complete this outfit <span className="tag">REDESIGN</span></h2>
          <p className="sub">
            Cross-category pieces that genuinely go with this item — chosen by co-purchase affinity within the same style
            cluster, each with the reason it works. Not five more pairs of jeans.
          </p>
          <div className="outfit">
            {outfit.items.map((it) => <OutfitCard key={it.id} item={it} />)}
          </div>
          <div className="outfit-bar">
            <div className="ob-total">
              Full outfit ({outfit.items.length + 1} pieces) · <b>{euro(outfit.bundlePrice)}</b>
            </div>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button className="btn btn-outline">♡ Save outfit</button>
              <button className="btn btn-accent">Add full outfit to bag</button>
            </div>
          </div>
        </section>
      )}

      {p.community && (
        <section className="section">
          <h2>See this style elsewhere</h2>
          <p className="sub">This item sits in the <b>{p.community.label}</b> style cluster — explore creators and looks in the same aesthetic.</p>
          <Link to={`/discover?c=${p.community.id}`} className="btn btn-outline">Explore the {p.community.shortLabel} cluster →</Link>
        </section>
      )}
    </div>
  );
}
