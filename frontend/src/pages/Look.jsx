import { useParams, Link } from "react-router-dom";
import { useApi, euro } from "../api.js";
import { GarmentTile } from "../garment.jsx";
import { Spinner, Empty, Price, ProvenanceBadge, Rationale } from "../ui.jsx";

export default function Look() {
  const { id } = useParams();
  const { data: look, loading, error } = useApi(`/looks/${id}`);

  if (loading) return <Spinner label="Loading look…" />;
  if (error || !look) return <Empty>Look not found. <Link to="/discover">Browse looks</Link></Empty>;

  const anchor = look.anchor;
  const pieces = anchor ? [{ ...anchor, slotLabel: anchor.slotLabel, rationale: "The starting piece this look is built around." }, ...look.items] : look.items;

  return (
    <div className="wrap">
      <nav className="crumb"><Link to="/">Home</Link> <span>/</span> <Link to="/discover">Looks</Link> <span>/</span> <span>{look.title}</span></nav>

      <div className="look">
        <div className="look-hero">
          {anchor && <GarmentTile hex={anchor.hex} slot={anchor.slot} appearance={anchor.appearance} label={look.title} />}
          <span className="gtile-note">illustrative look — composed from H&amp;M proxy items</span>
        </div>

        <div>
          <div className="look-creator">
            <span className="av">{look.creator.replace(/[@.]/g, "").slice(0, 2).toUpperCase()}</span>
            <div>
              <div style={{ fontWeight: 700 }}>{look.creator}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-3)" }}>{look.creatorTier}</div>
            </div>
          </div>
          {/* OUR FIX: "Get the look" restructured around the outfit-as-object */}
          <h1 style={{ fontSize: "1.5rem", margin: "0.25rem 0 0.5rem", textTransform: "capitalize" }}>{look.title}</h1>
          <p className="sub" style={{ color: "var(--ink-2)" }}>{look.rationale}</p>

          <div className="look-pieces">
            {pieces.map((it) => (
              <div className="look-piece" key={it.id}>
                <Link to={`/shop/product/${it.id}`} className="lp-tile">
                  <GarmentTile hex={it.hex} slot={it.slot} appearance={it.appearance} label={it.name} />
                </Link>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink-3)" }}>{it.slotLabel}</div>
                  <Link to={`/shop/product/${it.id}`} style={{ fontWeight: 700, fontSize: "0.9rem" }}>{it.brand}</Link>
                  <span style={{ color: "var(--ink-3)", fontSize: "0.82rem" }}> · {it.name}</span>
                  {it.provenance && <div style={{ margin: "0.25rem 0" }}><ProvenanceBadge provenance={it.provenance} /></div>}
                  {it.rationale && <div className="lp-why">{it.rationale}</div>}
                </div>
                <Price value={it.price} />
              </div>
            ))}
          </div>

          <div className="outfit-bar" style={{ marginTop: "1.25rem" }}>
            <div className="ob-total">Full look ({pieces.length} pieces) · <b>{euro(look.bundlePrice)}</b></div>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button className="btn btn-outline">♡ Save outfit</button>
              <button className="btn btn-accent">Add full look to bag</button>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--ink-3)", marginTop: "0.75rem" }}>
            Sold-out handling: if a piece is unavailable in your size, the redesign swaps in the nearest in-cluster alternate
            rather than dead-ending the look.
          </p>
        </div>
      </div>
    </div>
  );
}
