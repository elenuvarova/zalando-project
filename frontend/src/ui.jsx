import { Link } from "react-router-dom";
import { GarmentTile } from "./garment.jsx";
import { euro } from "./api.js";

export function Spinner({ label = "Loading…" }) {
  return <div className="spinner">{label}</div>;
}

export function Empty({ children }) {
  return <div className="empty">{children}</div>;
}

export function Price({ value, sale, was }) {
  return (
    <span className="price">
      <span className={`now${sale ? " sale" : ""}`}>{euro(value)}</span>
      {was && <span className="was">{euro(was)}</span>}
    </span>
  );
}

export function ProvenanceBadge({ provenance }) {
  if (!provenance) return null;
  const cls =
    provenance.kind === "creator" ? "badge-creator" : provenance.kind === "editor" ? "badge-editor" : "badge-sponsored";
  return <span className={`badge ${cls}`}>{provenance.label}</span>;
}

// Rationale line — the "why these go together" explanation (our fix #2).
export function Rationale({ text }) {
  if (!text) return null;
  // bold the lift figure ("12× lift") without innerHTML
  const parts = text.split(/(\d+(?:\.\d+)?× lift)/);
  return (
    <p className="oc-why">
      {parts.map((part, i) => (/× lift$/.test(part) ? <b key={i}>{part}</b> : part))}
    </p>
  );
}

export function ProductCard({ p }) {
  return (
    <Link to={`/shop/product/${p.id}`} className="pcard">
      <div className="tile-wrap">
        <GarmentTile hex={p.hex} slot={p.slot} appearance={p.appearance} label={`${p.colour} ${p.productType}`} />
        <button
          type="button"
          className="wish"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          ♡
        </button>
      </div>
      <div className="pmeta">
        <div className="pbrand">{p.brand}</div>
        <div className="pname">{p.name}</div>
        <Price value={p.price} />
      </div>
    </Link>
  );
}
