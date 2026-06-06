"""
Build backend/data/prototype.json — the dataset that powers the interactive redesign.

Everything product-structural here is REAL, derived from the H&M analysis:
  - product names, types, colours, garment groups  -> articles_clean.parquet
  - "Complete this outfit" recommendations          -> cooccurrence_edges.parquet
    (top cross-garment-group co-purchase partners by lift, within the same
     Louvain community where possible)
  - style communities                                -> community_summary + design/graph/style-clusters.json

Synthesised (and disclosed in the UI): retail price, brand, and per-slot
provenance labels (creator / editor / sponsored). H&M is single-brand and has no
price in the public catalogue, so those are plausible stand-ins for a Zalando
multi-brand marketplace, not real values.

Run:  python data/build_prototype_data.py
"""
import json
import hashlib
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
INTERIM = ROOT / "data" / "interim"
OUT = ROOT / "backend" / "data" / "prototype.json"

# --- colour name -> hex (perceived_colour_master_name) -------------------------
COLOUR_HEX = {
    "Black": "#1a1a1a", "White": "#f4f4f2", "Grey": "#9aa0a6", "Beige": "#d8c4a8",
    "Blue": "#5b7fb4", "Bluish Green": "#3f9e8f", "Turquoise": "#3bb9c4",
    "Green": "#6a9a5b", "Khaki green": "#7a7d52", "Yellowish Green": "#9aa84f",
    "Brown": "#8a5a3c", "Mole": "#8c7b6b", "Pink": "#e0a0b4", "Red": "#c0473f",
    "Orange": "#e08a4a", "Yellow": "#e8c45a", "Lilac Purple": "#9a86c0",
    "Metal": "#b8bcc2", "Unknown": "#b5b5b5", "undefined": "#b5b5b5",
}

# product_group_name -> outfit slot (for cross-category composition)
GROUP_SLOT = {
    "Garment Upper body": "top", "Garment Lower body": "bottom",
    "Garment Full body": "full", "Shoes": "shoes", "Bags": "bag",
    "Accessories": "accessory", "Socks & Tights": "hosiery",
    "Swimwear": "swim", "Underwear": "underwear", "Nightwear": "nightwear",
}
SLOT_LABEL = {
    "top": "Top", "bottom": "Bottom", "full": "Dress", "shoes": "Shoes",
    "bag": "Bag", "accessory": "Accessory", "hosiery": "Hosiery", "swim": "Swimwear",
    "underwear": "Underwear", "nightwear": "Nightwear",
}
# slots we treat as "outfit completion" targets, in display order
OUTFIT_SLOTS = ["top", "bottom", "full", "outerwear", "shoes", "bag", "accessory"]

BRANDS = [
    "Bershka", "Pull&Bear", "Mango", "Vero Moda", "ONLY", "Pieces", "Monki",
    "Weekday", "ARKET", "Nike", "adidas Originals", "New Balance", "Levi's",
    "Tommy Jeans", "Calvin Klein", "Edited", "NA-KD", "Even&Odd", "Anna Field",
]
CREATORS = ["@lea.styles", "@marek.fit", "@anouk.wears", "@sophia.looks",
            "@noor.daily", "@ines.curates", "@jonas.fits", "@mila.thread"]

PRICE_BASE = {  # by slot -> (min, max) EUR
    "top": (16, 49), "bottom": (26, 79), "full": (35, 99), "outerwear": (49, 159),
    "shoes": (39, 119), "bag": (19, 89), "accessory": (9, 39), "hosiery": (6, 19),
    "swim": (15, 45), "underwear": (9, 29), "nightwear": (15, 39),
}


def h(article_id, salt=""):
    """Deterministic int from an article id."""
    return int(hashlib.md5(f"{salt}{article_id}".encode()).hexdigest(), 16)


def slot_of(product_group, garment_group):
    base = GROUP_SLOT.get(product_group, "accessory")
    # promote jackets/coats to a dedicated outerwear slot
    if base == "top" and garment_group in {"Outdoor", "Jacket", "Blazers"}:
        return "outerwear"
    return base


def price_for(article_id, slot):
    lo, hi = PRICE_BASE.get(slot, (15, 49))
    span = hi - lo
    raw = lo + (h(article_id, "p") % (span * 100)) / 100.0
    # land on .95 / .99 endings
    return round(raw) - 0.01


def main():
    arts = pd.read_parquet(INTERIM / "articles_clean.parquet").set_index("article_id")
    edges = pd.read_parquet(INTERIM / "cooccurrence_edges.parquet")
    communities = pd.read_parquet(INTERIM / "communities.parquet")
    graph = json.loads((ROOT / "design" / "graph" / "style-clusters.json").read_text())

    art_to_comm = dict(zip(communities["article_id"], communities["community"]))

    # --- universe: the 150 graph nodes + every cross-group co-purchase neighbour
    seed_ids = {n["id"] for n in graph["nodes"]}
    nbr = edges[(edges["source"].isin(seed_ids)) | (edges["target"].isin(seed_ids))]
    universe = set(seed_ids)
    universe |= set(nbr["source"]) | set(nbr["target"])
    universe = {a for a in universe if a in arts.index}

    # --- adjacency for outfit building: id -> list of (partner, lift, cross_group)
    adj = {}
    for r in edges.itertuples(index=False):
        for a, b in ((r.source, r.target), (r.target, r.source)):
            if a in universe:
                adj.setdefault(a, []).append((b, float(r.lift), bool(r.cross_group)))
    for a in adj:
        adj[a].sort(key=lambda t: -t[1])

    # --- products -------------------------------------------------------------
    products = {}
    for aid in sorted(universe):
        row = arts.loc[aid]
        pg = str(row["product_group_name"])
        gg = str(row["garment_group_name"])
        slot = slot_of(pg, gg)
        cmaster = str(row["perceived_colour_master_name"])
        brand = BRANDS[h(aid, "b") % len(BRANDS)]
        products[aid] = {
            "id": aid,
            "name": str(row["prod_name"]),
            "productType": str(row["product_type_name"]),
            "group": pg,
            "garmentGroup": gg,
            "slot": slot,
            "slotLabel": SLOT_LABEL.get(slot, "Item"),
            "colour": str(row["colour_group_name"]),
            "colourMaster": cmaster,
            "hex": COLOUR_HEX.get(cmaster, "#b5b5b5"),
            "appearance": str(row["graphical_appearance_name"]),
            "index": str(row["index_group_name"]),
            "detail": str(row["detail_desc"]) if str(row["detail_desc"]) != "nan" else "",
            "brand": brand,
            "price": price_for(aid, slot),
            "communityId": int(art_to_comm[aid]) if aid in art_to_comm else None,
        }

    def rationale(anchor, partner, lift):
        ac, pc = anchor["colourMaster"], partner["colourMaster"]
        neutrals = {"Black", "White", "Grey", "Beige", "Metal"}
        if pc == ac:
            colour_bit = f"Matching {pc.lower()} palette"
        elif pc in neutrals:
            colour_bit = f"Neutral {pc.lower()} that anchors the look"
        elif ac in neutrals:
            colour_bit = f"{pc} accent against the neutral base"
        else:
            colour_bit = f"Complementary {pc.lower()} accent"
        if lift >= 50:
            freq = f"bought together far more than chance ({lift:.0f}× lift)"
        elif lift >= 8:
            freq = f"frequently bought together ({lift:.0f}× lift)"
        else:
            freq = f"co-purchased above chance ({lift:.1f}× lift)"
        same_comm = anchor["communityId"] is not None and anchor["communityId"] == partner["communityId"]
        comm_bit = " · same style cluster" if same_comm else ""
        return f"{colour_bit} · {freq}{comm_bit}"

    def provenance(anchor_id, slot_idx):
        n = h(anchor_id, f"prov{slot_idx}") % 10
        if n < 6:
            return {"kind": "creator", "label": f"Styled by {CREATORS[h(anchor_id, str(slot_idx)) % len(CREATORS)]}"}
        if n < 8:
            return {"kind": "editor", "label": "Editor's pick"}
        return {"kind": "sponsored", "label": "Sponsored"}

    # --- outfits: top cross-slot partners by lift, one per slot ----------------
    outfits = {}
    for aid, anchor in products.items():
        seen_slots = {anchor["slot"]}
        items = []
        for partner_id, lift, cross in adj.get(aid, []):
            if partner_id not in products:
                continue
            p = products[partner_id]
            if p["slot"] in seen_slots or p["slot"] not in OUTFIT_SLOTS:
                continue
            seen_slots.add(p["slot"])
            items.append({
                "id": partner_id,
                "slot": p["slot"],
                "rationale": rationale(anchor, p, lift),
                "lift": round(lift, 1),
                "provenance": provenance(aid, len(items)),
            })
            if len(items) >= 4:
                break
        if len(items) >= 2:  # only keep anchors that yield a real outfit
            bundle = round(anchor["price"] + sum(products[i["id"]]["price"] for i in items), 2)
            outfits[aid] = {"anchorId": aid, "items": items, "bundlePrice": bundle}

    # --- communities (the 8 from the viz) -------------------------------------
    comm_rows = {c["id"]: c for c in graph["communities"]}
    comms = []
    for c in graph["communities"]:
        pids = [a for a, cid in art_to_comm.items() if cid == c["id"] and a in products]
        comms.append({
            "id": c["id"],
            "label": c["label"],
            "shortLabel": c["label"].split(" · ")[0],
            "hex": c["colour"],
            "modalColour": c.get("modal_colour"),
            "modalGarment": c.get("modal_garment"),
            "distinctiveColour": c.get("distinctive_colour"),
            "nGarmentGroups": c.get("n_garment_groups"),
            "size": c.get("size"),
            "productIds": pids[:60],
        })

    # --- looks: curated outfits with the strongest cross-category composition ---
    ranked = sorted(outfits.values(), key=lambda o: -len({products[i["id"]]["slot"] for i in o["items"]}))
    looks = []
    for i, o in enumerate(ranked[:8]):
        aid = o["anchorId"]
        anchor = products[aid]
        creator = CREATORS[h(aid, "look") % len(CREATORS)]
        looks.append({
            "id": f"look-{i+1}",
            "title": f"{anchor['colour']} {anchor['productType'].lower()}, styled",
            "creator": creator,
            "creatorTier": "Style Creator" if h(aid, "tier") % 3 else "Top Creator",
            "anchorId": aid,
            "communityId": anchor["communityId"],
            "rationale": f"Built around the {anchor['name'].lower()} — {len({products[i2['id']]['slot'] for i2 in o['items']})+1} pieces across the same style cluster.",
        })

    out = {
        "meta": {
            "generatedBy": "data/build_prototype_data.py",
            "source": "H&M Personalized Fashion Recommendations (Kaggle) — used as a proxy",
            "real": ["product names/types/colours/garment groups", "outfit recommendations (cross-group co-purchase lift)", "style communities (Louvain)"],
            "synthesised": ["retail price", "brand", "provenance labels (creator/editor/sponsored)"],
        },
        "products": list(products.values()),
        "outfits": outfits,
        "communities": comms,
        "looks": looks,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False))
    print(f"wrote {OUT.relative_to(ROOT)}")
    print(f"  products:   {len(products)}")
    print(f"  outfits:    {len(outfits)}")
    print(f"  communities:{len(comms)}")
    print(f"  looks:      {len(looks)}")


if __name__ == "__main__":
    main()
