# Data Methodology — H&M as Proxy for Zalando

This document is the load-bearing honesty artifact for Week 3. It belongs in the case study's Section 7 (Honest Limitations) verbatim or near-verbatim. Senior hiring managers test specifically for this kind of disclosure — its absence is grounds for rejection in fashion-tech roles.

---

## What we have access to vs what we want

| | What we want | What we have |
|---|---|---|
| Source | Zalando transaction + outfit data | H&M Kaggle dataset |
| Catalog | Multi-brand marketplace, 4500+ brands | Single-brand (H&M private label + Cos, Other Stories) |
| Behavior unit | Outfit assembly by creator + customer | Co-purchase basket |
| Geography | EU multi-market | Mostly Europe + some global |
| Window | Last 12 months current | 2018-09 → 2020-09 (pre-pandemic into early-pandemic) |
| Outfit labels | Yes — Zalando Style Creator outfits | **No** — H&M does not publish styled-outfit labels |

The honest framing: **we have a basket-shaped dataset, we want an outfit-shaped dataset, and the case study must acknowledge the gap.**

## Why we use it anyway

Three reasons, in declining order of strength:

1. **It is the largest publicly available fashion-transaction dataset.** 31.7 M transactions × 1.37 M customers × 105 K SKUs. No other public dataset comes close. The choice is "use H&M with disclosure" or "use no data at all" — and a data-informed redesign is the case study's structural differentiator.
2. **The shopping pattern primitive is the same** — customers assembling a multi-item basket from a multi-category catalog, with some basket items chosen complementarily (jeans + top + shoes) and some chosen substitutionally (3 jeans, pick one). The mechanics generalize even if the specific co-purchases don't.
3. **H&M and Zalando overlap on customer ICP** — both serve mass-market European fashion shoppers in the same price tier. The H&M customer is *closer to* the Zalando customer than a luxury (Net-a-Porter) or US-marketplace (Stitch Fix) customer would be. Not identical, but adjacent.

## The proxy claim — what we can and cannot conclude

### What the H&M co-purchase data **can** demonstrate (defensible in case study)

- **The method works at scale.** Apriori on 31M transactions surfaces interpretable frequent itemsets. Louvain on the co-purchase graph surfaces communities with high colour_group / garment_group homogeneity. These are properties of the method, not of any particular catalog.
- **Communities cross categories.** The force-directed graph viz shows that natural communities — emergent from purchase behavior, not assigned — typically span top + bottom + accessory. This contradicts Zalando's current "Better together" widget pattern of surfacing same-category items (Case-study Problem #4, anti-pattern #1 in `research/competitive/`). The viz makes this visually undeniable.
- **The redesign's claim — "style coherence is a community-detection problem, not a styling decision" — has a working proof-of-concept.** Not on Zalando's own data, but on the closest available public analog.

### What the H&M co-purchase data **cannot** conclude (must NOT be claimed in case study)

- **The specific clusters that emerge for Zalando.** H&M baskets reflect H&M customers' purchasing patterns at H&M's store. The Zalando customer crossing brand lines (Bershka × Tory Burch × Adidas in one outfit) does something fundamentally different, and the H&M clusters do not predict it.
- **Stylistic coherence vs co-purchase coherence.** Co-purchase happens for many reasons that aren't stylistic — price-tier matching, sale-bundling, weather, gift-giving. Apriori finds items that are *bought together*, not items that are *worn together*. This distinction is the single most important nuance to surface.
- **Outfit assembly logic** in the Zalando Style Creator sense — where a human stylist explicitly composes 4-5 pieces into a single look. H&M data has nothing equivalent. The case study's "creator outfits as training labels" claim (per `research/competitive/best-practices.md` #1, Stitch Fix pattern) is **structurally untestable on H&M data** and must be presented as a forward-looking design recommendation, not an evidenced conclusion.

## How this gets framed in the case study (Week 6 writing)

The phrasing matters. Three drafts, in increasing strength:

❌ **Bad draft** (don't write this): *"We analyzed Zalando-like customer data to identify natural style clusters."*
> Implies Zalando data was used. Misleading.

⚠️ **Adequate draft**: *"We analyzed the public H&M dataset (31M transactions, 1.3M customers) as a proxy for Zalando shopper behavior. The community-detection results illustrate the method; the specific clusters would shift on Zalando's actual data."*
> Honest, but soft. Doesn't anticipate the obvious senior reviewer question.

✅ **Strong draft (with actual results)**: *"Zalando's transaction data is not public. We used H&M's Kaggle dataset (31M transactions, 1.3M customers, 2018-2020) — the largest available fashion-transaction corpus — as a proxy. We sampled a 30-day window (1.15M transactions, 250k customers, 29k articles), built a co-purchase graph from sparse pairwise co-occurrence (8,603 edges, 2,764 nodes), and ran Louvain community detection. The result: 65 communities, of which 44 had ≥10 SKUs and 28 (63.6%) spanned two or more garment groups — confirming that natural style clusters cross categories rather than collapsing into same-category bundles. The light-blue wide-leg denim reference SKUs (the visual anchor for the case study) clustered into a single dominant community of 70 items including 34 denim trousers, 33 other trousers, 2 blouses, and 1 dressed piece — exactly the cross-category coverage Zalando's current widgets fail to deliver. The proxy holds for demonstrating the method; it breaks for predicting Zalando-specific clusters (single-brand H&M baskets differ structurally from Zalando's multi-brand creator-driven outfits). The case study presents the viz as evidence that **style coherence can be modelled as a community-detection problem**, not as evidence of what those communities are on Zalando."*
> Names the dataset, names the size, names what holds with concrete numbers, names what breaks, names what the claim is. This is the version that goes in.

## Specific decisions in the analysis pipeline that the methodology forces

- **No predictive claims.** The notebooks do not train a recommender or evaluate on a held-out test set. We're describing the structure of communities in observed baskets, not predicting future outfit purchases.
- **Communities are labelled only by validation properties** (modal colour_group, modal garment_group, modal product_type). They are NOT given style-vocabulary labels like "Y2K denim revival" or "Scandinavian minimal." Inventing those labels from H&M data would over-claim. The case study can demonstrate that *if you had outfit labels*, the communities could be named — but we don't, so we don't.
- **The 30-day window default** in the notebooks is a sensitivity-control choice: long windows risk capturing seasonal shifts that don't reflect style affinity; short windows risk sparse co-purchase signal. 30 days (Aug 23 – Sep 22, 2020) yielded 1,155,933 transactions / 250,619 customers / 29,237 articles — defensible compromise documented in the EDA notebook.
- **Switched from Apriori to sparse co-occurrence matrix multiplication.** The notebook 02 originally used `mlxtend.frequent_patterns.apriori`, but at our scale (198k baskets × 5k items) it OOM'd at low support thresholds and over-pruned at higher ones — produced only 19 edges, all mega-popular same-category bestseller pairs (e.g., same SKU in two colours, lift > 300). The fix: build a sparse one-hot matrix `X`, compute pairwise co-occurrence as `X.T @ X` in a single sparse matmul, then filter by `min_cooccurrence_count >= 10` and `min_lift >= 1.5`. This is mathematically equivalent to what we needed from Apriori (pair-level frequent itemsets with lift), but scales to the full edge space without combinatorial blow-up. Yields 8,603 edges, 2,764 unique nodes, lift range 1.5–4262 (median 20). Method is documented in notebook 02 cells 8–9 with a comment explaining the switch.
- **Edge filters: min_cooc≥10, min_lift≥1.5.** Calibrated to surface long-tail style pairs (not just blockbuster co-purchases) while excluding chance co-occurrences. Sensitivity-tested values; documented inline in notebook 02.

## Counterpoint from the competitive scan

The competitive scan (`research/competitive/best-practices.md` #2, Farfetch) showed that Farfetch trained **deep siamese networks on thousands of hand-curated outfits** to learn stylistic compatibility. That is the actual production architecture this case study is gesturing at. Our H&M-on-Apriori approach is the **public-data-affordable demonstration** of the method's feasibility — not a claim that Apriori is what Zalando should ship. The case study can and should make this distinction explicit.

## What would close the proxy gap (future work, to mention in case study)

- Access to Zalando's outfit-creator data (private — would require employment or a research partnership).
- A small (~500-outfit) hand-curated outfit dataset built from public Zalando creator pages, which could be used as a **labelled validation set** for the H&M-derived clusters. This is feasible as a follow-on project; the case study can mention it as future work.
- The 2022 Farfetch Recommendations Challenge dataset (referenced in `research/competitive/sources.md`) — a smaller but actual multi-brand outfit dataset that may be more transferable than H&M for outfit-completion specifically.

## Final integrity claim

The case study presents H&M data as a **method demonstration**, not a **prediction**. Every chart, every cluster name, every statistic in the data-analysis section must be honest about which of those two claims it supports. If a claim cannot be defended as "this shows the *method* works," it cannot stay in.
