import { useState } from "react";
import { useApi } from "../api.js";
import { Spinner, Empty, ProductCard } from "../ui.jsx";

const SLOTS = [
  { key: "", label: "All" },
  { key: "bottom", label: "Trousers & denim" },
  { key: "top", label: "Tops" },
  { key: "outerwear", label: "Jackets" },
  { key: "shoes", label: "Shoes" },
  { key: "bag", label: "Bags" },
  { key: "accessory", label: "Accessories" },
];

export default function Shop() {
  const [slot, setSlot] = useState("");
  const { data, loading, error } = useApi(`/products?limit=60${slot ? `&slot=${slot}` : ""}`);

  return (
    <div className="wrap">
      <nav className="crumb"><span>Home / Shop</span></nav>
      <h1 style={{ fontSize: "1.6rem", margin: "0.25rem 0 0.25rem" }}>Shop the redesign</h1>
      <p className="sub" style={{ color: "var(--ink-3)", maxWidth: "60ch", marginBottom: "1.25rem" }}>
        A live catalogue powered by the real H&amp;M article data. Open any product to see the redesigned
        <b> Complete this outfit</b> widget. Tip: trousers &amp; denim have the richest outfits.
      </p>

      <div className="hdr-nav" style={{ border: "none", marginBottom: "1.25rem" }}>
        <div className="wrap" style={{ padding: 0, gap: "1.25rem" }}>
          {SLOTS.map((s) => (
            <a
              key={s.key}
              href={`#${s.key || "all"}`}
              className={slot === s.key ? "active" : undefined}
              onClick={(e) => { e.preventDefault(); setSlot(s.key); }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {loading && <Spinner />}
      {error && <Empty>Couldn't load the catalogue.</Empty>}
      {data && data.length === 0 && <Empty>No items in this category.</Empty>}
      {data && data.length > 0 && (
        <div className="grid">
          {data.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
