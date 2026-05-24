# Data Analysis — H&M Dataset Pipeline

Week 3 of the case study. The deliverable is **one force-directed graph viz** tied to **one specific design decision** — the style-cluster navigation surface (Discovery between creators, redesign surface #3, JTBD-3 Inspiration Browser). Per CLAUDE.md anti-pattern #3: *"Do not build the force-directed graph without tying it to a specific design decision. Beautiful viz that doesn't drive design = 'designer wanted to show off.'"*

This folder is the analysis scaffold. **All four notebooks are ready to run; you provide the data.**

---

## 1 · The dataset (download once)

[H&M Personalized Fashion Recommendations — Kaggle](https://www.kaggle.com/competitions/h-and-m-personalized-fashion-recommendations/data)

- 31.7 M transactions
- 1.37 M customers
- 105 K articles
- 2018-09 → 2020-09 window

You'll need:

- `transactions_train.csv` (~3.4 GB) — the main basket source
- `articles.csv` (~37 MB) — SKU metadata (product_type, colour_group, garment_group, etc.)
- `customers.csv` (~200 MB) — only used lightly for sanity checks

**Download steps:**

```bash
# 1. install Kaggle CLI if you don't have it
pip install kaggle

# 2. Kaggle API token (one-time)
# Go to https://www.kaggle.com/settings → Account → "Create New API Token"
# It downloads kaggle.json — place at ~/.kaggle/kaggle.json
chmod 600 ~/.kaggle/kaggle.json

# 3. accept the competition rules on the Kaggle web page (one click)
# (CLI cannot download until you've clicked Accept on the competition page)

# 4. download into this folder
cd "data/raw"
kaggle competitions download -c h-and-m-personalized-fashion-recommendations
unzip h-and-m-personalized-fashion-recommendations.zip
```

The notebooks expect files at `data/raw/{transactions_train,articles,customers}.csv`. The folder is `.gitignored` — these files are too large to commit.

## 2 · The pipeline

```
data/raw/                     ← Kaggle CSVs (you download)
   │
   ├── notebooks/01-eda.ipynb              ← Explore, sample, profile. Output: data/interim/sample_30d.parquet
   │
   ├── notebooks/02-apriori-basket.ipynb   ← Apriori frequent itemsets on sessionised baskets.
   │                                         Output: data/interim/cooccurrence_edges.parquet
   │
   ├── notebooks/03-community-detection.ipynb  ← Louvain communities on the co-purchase graph.
   │                                              Output: data/interim/communities.parquet
   │
   └── notebooks/04-force-graph-export.ipynb   ← Export graph JSON for D3/Cytoscape consumption.
                                                  Output: design/graph/style-clusters.json
```

Each notebook writes its outputs to `data/interim/` (small, parquet-compressed) and the **final viz JSON** goes to `design/graph/` where the frontend prototype will read it.

## 3 · What each notebook does in one line

1. **01-eda.ipynb** — sample down to a manageable 30-day window, profile category distribution, identify the wide-leg-denim-equivalent SKUs for reference-category anchoring.
2. **02-apriori-basket.ipynb** — group transactions into customer sessions, run Apriori at support=0.001 / lift>1.5, surface the top 5000 co-occurrence pairs. **This is the closest H&M-data-can-give to Zalando's "Better together" widget logic.**
3. **03-community-detection.ipynb** — build an undirected weighted graph from the co-occurrence edges, run Louvain to find communities. **These communities are the proxy for style clusters.** Validate by colour_group / garment_group homogeneity.
4. **04-force-graph-export.ipynb** — pick the top-K communities by size, prune to ~150 nodes total (force-directed viz collapses past ~200 nodes), export to D3/Cytoscape-friendly JSON with community colour assignments + node-degree-sized layout hints.

## 4 · What this output drives in the case study

The force-directed graph in `design/graph/style-clusters.json` is consumed by the Section 5 redesign mockups to demonstrate:

- **Style-cluster navigation** between creators (Discovery surface #3 in the redesign). Each Louvain community becomes a navigable style cluster on the redesigned discovery surface.
- **Cross-category coverage** (Principle #3 in `design/design-principles.md`). The graph viz visually shows how a coherent style cluster naturally crosses garment groups (top + bottom + accessory) rather than collapsing into same-category recommendations like Zalando's current "Better together" widget.

The single sentence in the case study that the graph supports: *"Style coherence isn't a styling decision — it's a community-detection problem. These [N] clusters emerged from co-purchase behavior on 31M transactions; the redesigned Discovery surface lets users navigate between them by vibe, not by category."*

That sentence is the design-decision anchor per the CLAUDE.md anti-pattern. The viz exists to make it concrete.

## 5 · Honest limitations (carry into case study Section 7)

Documented in [`methodology.md`](methodology.md). Headline:

> H&M co-purchase data is a **proxy** for Zalando style affinity. Co-purchase (basket logic, Apriori) ≠ stylistic outfit completion. The clusters that emerge from H&M baskets reflect what H&M customers happen to buy together, not what Zalando creators style together. The case study acknowledges this in its limitations section and frames the result as *demonstrating the method*, not *predicting the actual Zalando clusters*.

Disclosure is mandatory in the case study — see CLAUDE.md anti-pattern #4 *("Do not present H&M insights without proxy disclosure")*.

## 6 · Running it

```bash
# from data/
pip install -r requirements.txt
jupyter notebook notebooks/

# run notebooks in order: 01 → 02 → 03 → 04
# each notebook writes its outputs before the next one needs them
```

Total runtime estimate on a modern laptop (M-series Mac, 16GB RAM):

- 01-eda: ~3 minutes
- 02-apriori: ~15-30 minutes (the expensive one — Apriori on millions of baskets)
- 03-community-detection: ~5 minutes
- 04-force-graph-export: ~30 seconds

Notebooks are designed to use a **30-day window sample** by default. If you have time, lift the date filter in `01-eda.ipynb` to use the full 2-year window and see whether the communities shift meaningfully — that's a sensitivity check worth one paragraph in the case study.
