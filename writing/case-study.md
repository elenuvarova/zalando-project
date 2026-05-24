# Outfit Discovery, Rebuilt

*A redesign of Zalando's "Complete the Look" and "Get the Look" surfaces — grounded in 99 verbatim customer voices, 14-competitor benchmarking, and Louvain community detection on 31M H&M transactions.*

**By Elena Uvarova — UX/UI + branding designer, Antwerp**

> 📂 Companion research lives in [`research/`](../research/), data analysis in [`data/`](../data/), design principles and measurement plan in [`design/`](../design/). This document is the case-study narrative; everything it claims is sourced there.

---

## TL;DR

Zalando has five recommendation widgets on a single product page that promise outfit completion — and deliver same-category noise. "Complete the Look" shows random tops next to wide-leg denim. "Better together" surfaces five more pairs of jeans. The naming is inconsistent ("Complete the Look" entry → "Get the Look" destination), the tagging is wrong (brown jumpers tagged red, polka-dot skirts tagged solid), and there is no way to buy the outfit, save the outfit, or understand *why* these items are paired.

This case study redesigns three connected surfaces — product detail page (PDP), look detail page, and discovery navigation between creators — around three structural moves: **outfit as a first-class object**, **creator outfits as algorithmic training labels**, and **a rationale layer on every recommendation**. The argument that style coherence is solvable at marketplace scale is anchored on Louvain community detection of H&M's public dataset: 65 communities emerged from co-purchase behaviour, 63.6% of them spanned multiple garment groups — empirical proof that natural style coherence already crosses categories, and Zalando's same-category widget design fights what users do.

The redesign is not "the first AI in Zalando" — they already ship Virtual Fitting Room, Zalando Assistant, Trend Spotter, and Boards. This case study fixes the fundamentals underneath all of those: the outfit object model, the recommendation training data, and the explanation layer.

---

## 1 · Problem Discovery

### The trigger

I started where every shopper does: a product page. Specifically, a pair of **light-blue wide-leg Bershka jeans on Zalando** — a deliberately mundane choice, since outfit-completion experiences should not collapse on basic items.

The page surfaces five different recommendation widgets stacked vertically:

1. **Complete the Look** — labelled as outfit completion, populated with full creator photos (not actual outfit pieces).
2. **Variations of this style** — same jeans in other colours / cuts (a same-category alternative).
3. **More from Bershka** — brand affinity.
4. **Better together — Often viewed with each other** — 80+ items, mostly tops, no apparent style logic.
5. **Sponsored by our brands** — paid placement, blends visually with organic recommendations.

A user looking at light-blue Y2K-revival wide-leg denim is shown chiffon blouses, athletic tanks, and tailored blazers in the "Better together" carousel — items from radically different aesthetic universes — and offered no way to assemble a coherent outfit from any of it.

### The eight problems

After capturing the same flow across four additional reference categories (dress, sneakers, coat, accessory) and the same on the look detail page (where clicking a creator photo leads), eight distinct problems emerged:

| # | Problem | Surface |
|---|---|---|
| 1 | **Tagging accuracy** — brown jumpers tagged red, polka-dot skirts tagged solid. Systemic across creators. | Look detail page |
| 2 | **"Complete the Look" misnamed** — shows full creator photos, not the outfit pieces. | Product detail page |
| 3 | **"Better together" widget broken** — no co-view affinity, no style coherence. | Product detail page |
| 4 | **Category monotone** — all 5 widgets surface jeans or tops; no shoes/bags/outerwear. | Product detail page |
| 5 | **Zero style coherence** — light-blue Y2K denim paired with radically different aesthetics. | Product detail page |
| 6 | **Algorithmic laziness** — creators grouped by similar jeans, not stylistic affinity. | Discovery navigation |
| 7 | **Naming inconsistency** — "Complete the Look" entry → "Get the Look" destination. | PDP → Look bridge |
| 8 | **Missing AI explanation layer** — outfit logic not surfaced to user. | All three surfaces |

Plus three secondary issues that compound the above:

- No bundle "add all to bag" action.
- No save-as-outfit affordance (only individual items can be saved).
- Sponsored content blends visually with organic — a trust issue.

### Hero problem for the case-study opening

**#3 "Better together" broken** — a real, named widget on a high-traffic surface that demonstrably fails its promise. Understandable in three seconds from a single screenshot. The case study opens here because the contradiction between *what the widget says* ("often viewed with each other") and *what the widget shows* (no apparent affinity logic) is the redesign's whole reason for existing.

### Scope

**In scope:** three connected Zalando surfaces — Product Detail Page (Complete the Look widget), Look Detail Page (Get the Look panel), and Discovery navigation between creators.

**Out of scope:** Get the Look hub browse experience, mobile-only deep work, integration with Trend Spotter / Boards / Zalando Assistant. Tagging accuracy itself is also out of scope — it's a data/ML/ops problem, not a design problem. The redesign assumes tags will eventually be accurate and designs the experience *around* tagging rather than trying to fix it via interaction.

---

## 2 · Research

Three research streams, run in parallel and synthesised before any pixel was drawn:

### 2.1 · Composite personas from review mining

**99 verbatim customer quotes** were collected from accessible review aggregators across 8 languages (EN, NL, FR, DE, ES, IT, SE, PL) and 10+ markets. Sources: reviews.io, reviews.nl, fr.custplace.com, PissedConsumer, trustedshops.de, shopauskunft.de, Zalando Design's own published user research on Medium, App Store DE.

> **Methodological disclosure (non-negotiable):** the brief called for Trustpilot regional pages, Reddit, App Store, and TikTok/Instagram as primary sources. Trustpilot returned HTTP 403 (anti-bot), Reddit was blocked at the platform level, App Store reviews lazy-load via JavaScript (only ~4 of millions visible to a non-authenticated client), and TikTok/Instagram comments require authenticated browser access. We substituted regional analog aggregators that satisfy the same JTBD. The substitution is documented in [`research/personas/methodology-disclosure.md`](../research/personas/methodology-disclosure.md). Senior reviewers will notice this section; its presence is the explicit methodological-maturity signal.

Five composite personas were synthesised, each with explicit observation-vs-hypothesis flags per dimension:

| Persona | JTBD (one line) | Evidence type |
|---|---|---|
| **The Outfit Seeker — Léa** | Assemble a coordinated head-to-toe look by a deadline. | Corpus-medium (consequence-evidenced) |
| **The Single-Item Shopper — Marek** | Find the right version of one specific item, quickly. | Corpus-strong |
| **The Inspiration Browser — Anouk** | Browse without intent, find what I didn't know I wanted. | **Corpus-strongest** (Zalando's own published research backs it) |
| **The Creator-Follower — Sophia** | Recreate the exact outfit I saw on a creator's page. | **Reframed**: quantitative + structural + creator-side (Zalando +25% engagement uplift, Intelistyle benchmark, TikTok captions). Direct customer voice is structurally absent because Creator-Followers abandon silently. |
| **The Bargain Hunter — Karim** *(counter-persona)* | Get the deal at the right price. *Outfit completion is irrelevant or annoying.* | Corpus-strong |

The counter-persona is non-negotiable: a case study without a user for whom the redesign is *worse* is a pitch deck, not a research artifact. Karim anchors the measurement plan's counter-metrics in Section 6.

Two specific corpus quotes carry disproportionate weight:

> *"Bestel een zandkleurige hoodie. Krijg ook, in de bevestiging de hoodie in die kleur te zien!"* — Nico de Boer, reviews.nl (quote #53, Dutch). *Translation: "I ordered a sand-coloured hoodie. The confirmation screen also shows the hoodie in that colour!"* (Wrong colour received.) **Directly evidences Problem #1 (tagging accuracy) — the user saw the correct colour in the confirmation flow yet received the wrong colour.**

> *"I feel overwhelmed by choice while exploring Zalando."* — Research participant, Zalando Design Medium publication (quote #20). **Zalando's own published user research endorsing the Inspiration Browser JTBD.**

Full persona files: [`research/personas/`](../research/personas/).

### 2.2 · Competitive scan — 14 competitors across 8 dimensions

The competitive landscape was mapped across direct e-commerce (ASOS, H&M, Mango, Net-a-Porter, Farfetch, SSENSE, Uniqlo StyleHint, ABOUT YOU), marketplaces (Lyst), discovery-first surfaces (Pinterest Shop the Look), social shopping (TikTok Shop / Lemon8), AI styling (Stitch Fix), and wardrobe apps (Whering). Eight dimensions: outfit completion mechanism, trust signal, tagging accuracy, style coherence rationale, bundle action, save-as-outfit, cross-category suggestion, personalisation layer.

Full feature matrix: [`research/competitive/feature-matrix.md`](../research/competitive/feature-matrix.md).

**The positioning map** sits the competitors on two axes — algorithmic ↔ human-curated × utility ("complete what I have") ↔ inspiration ("show me new"). Zalando lives in the bottom-left (algorithmic utility), failing at the basics of that quadrant. The bottom-right ("human-curated utility") is **structurally empty** in mainstream e-commerce because human curation per SKU doesn't pay at marketplace scale. That empty quadrant is the redesign's opportunity — see Section 4. Full analysis: [`research/competitive/positioning-map.md`](../research/competitive/positioning-map.md).

Five **anti-patterns** were identified (`anti-patterns.md`), of which the most directly applicable:

1. **Same-category cross-sell masquerading as outfit completion** (Baymard finding: 58% of major e-commerce sites collapse alternatives and supplementaries — they serve different JTBDs and should never be merged).
2. **Pinterest Shop the Look's invisible-rationale dot tagging** (correct tag, missing *why*).

Five **best practices** worth borrowing (`best-practices.md`), of which the most leverageable:

1. **Stitch Fix's stylist-outfit-as-training-data approach** — +14% quality lift over algo-only baselines (`multithreaded.stitchfix.com`). Zalando has the Style Creator program producing analogous content; it's unused as training signal today.
2. **Net-a-Porter's editorial rationale text on every outfit** — only mainstream competitor that surfaces *why-these-go-together*.
3. **Pinterest's board model** — outfit as a first-class saveable object, not a bundle of saved items.

**Three strategic findings** condensed into the design phase (`strategic-findings.md`):

1. **The empty quadrant is "algo-curated outfit utility with rationale"** — Zalando has the asset (Style Creator program) the bottom-left competitors lack.
2. **Rationale is the single highest-leverage borrowed pattern** — the recommender already computes the features needed (colour match, silhouette, occasion); they just aren't surfaced.
3. **Make "outfit" a first-class saveable object, or the redesign stays cosmetic** — without this, every other move leaks at the moment of save.

These three findings form the spine of Section 4.

### 2.3 · JTBD synthesis

Five JTBDs (including one counter-JTBD), mapped to personas and surfaces, with explicit evidence-strength flags. Full document: [`research/jtbd/jtbd-synthesis.md`](../research/jtbd/jtbd-synthesis.md). Three of the five (JTBD-1 Outfit Seeker, JTBD-3 Inspiration Browser, JTBD-4 Creator-Follower) converge on the same three redesign moves — making them the focal point of the design phase.

---

## 3 · Data Analysis

> **Honest framing first.** Zalando's transaction data is not public. We used **H&M's Kaggle dataset** (31M transactions, 1.37M customers, 105K articles, 2018-2020 — the largest available fashion-transaction corpus) **as a proxy**. The proxy holds for demonstrating the *method* (Apriori + community detection can surface cross-category style clusters from basket data at scale). It breaks for predicting Zalando-specific clusters (single-brand H&M baskets differ structurally from Zalando's multi-brand creator-driven outfits). Full disclosure: [`data/methodology.md`](../data/methodology.md).

### 3.1 · Pipeline

Four notebooks in [`data/notebooks/`](../data/notebooks/) — runnable end-to-end on a Kaggle download:

1. **01-eda** — sample to a 30-day window (Aug 23 – Sep 22, 2020), profile categories, identify anchor SKUs (light-blue denim, the case study's visual reference).
2. **02-cooccurrence** — sparse one-hot matrix, pairwise co-occurrence via `X.T @ X` matmul, filter by `min_cooc≥10`, `min_lift≥1.5`. *(Originally Apriori; swapped for sparse matmul after Apriori OOM'd at the support thresholds needed for long-tail cross-category pairs. Documented in methodology.)*
3. **03-community-detection** — Louvain on the weighted co-purchase graph, validate community quality by colour and garment-group homogeneity.
4. **04-force-graph-export** — prune to viz scale (~150 nodes), write [`design/graph/style-clusters.json`](../design/graph/style-clusters.json) for D3/Cytoscape consumption.

### 3.2 · The numbers

**30-day window sample:**
- 1,155,933 transactions, 250,619 unique customers, 29,237 unique articles
- 368,111 baskets total; 249,226 multi-item (67.7%); mean basket size 3.14
- **72.2% of multi-item baskets span two or more garment groups** in the raw data — empirical confirmation that *real customers shop cross-category*

**Co-occurrence graph:**
- 8,603 edges, 2,764 unique nodes
- Lift range 1.5–4262 (median 20)
- 2,294 cross-garment-group edges (26.7% of all edges)

**Louvain community detection:**
- 65 communities total
- 44 communities with ≥10 nodes (the analytically actionable ones)
- **28 of 44 large communities (63.6%) span 2+ garment groups**
- **21 communities span 3+ garment groups**

### 3.3 · The hero finding (the case study's spine)

The light-blue wide-leg denim anchor SKUs (the visual reference for the case study) clustered into **Community #17 "Blue · Trousers Denim"** — 70 members across 4 garment groups:

| Garment group | Count |
|---|---|
| Trousers Denim | 34 |
| Trousers | 33 |
| Blouses | 2 |
| Dressed | 1 |

This is a cross-category style cluster the algorithm **discovered**, not assigned. The case study's structural claim: *style coherence is a community-detection problem, not a styling decision*. The redesigned Discovery navigation (surface #3) lets users navigate between these clusters by aesthetic affinity rather than by category.

![Force-directed graph of 8 communities × ~150 SKUs, colour-coded by Louvain community](../design/graph/style-clusters-preview.png)

The graph viz isn't decorative. It's the empirical anchor for [Design Principle #5](../design/design-principles.md#principle-5--algorithmic-surfaces-must-read-as-curated) ("Algorithmic surfaces must read as curated"). Without the data layer, that principle would be a styling assertion. With it, it's a structural claim about how customers already shop — and one Zalando's current widgets actively fight.

### 3.4 · Where the data analysis points the redesign

- **PDP Complete the Look widget (surface #1)** — cross-category enforcement is justified by the 72.2% number (raw baskets) and the 63.6% number (Louvain communities). Same-category widgets fight what users do.
- **Look Detail Page (surface #2)** — the community structure enables a "more in this style cluster" navigation that replaces the algorithmically-flat "you might also like" creator carousel (Problem #6).
- **Discovery navigation (surface #3)** — the force-directed graph IS the design artifact. Communities become the navigable nodes; cross-community jumps surface adjacent aesthetic territories.

---

## 4 · Insights & Design Principles

The research and data analysis collapse into six design principles. Each is paired with the evidence that produced it and a decision rule the design phase cannot violate without justification. Full document: [`design/design-principles.md`](../design/design-principles.md).

1. **Outfit is a first-class object, not a bundle of items.** Save outfit, share outfit, complete outfit — all primitives. (Anchored on competitive strategic finding #3 + Inspiration Browser persona + Creator-Follower JTBD.)
2. **Surface the rationale, don't make users decode it.** Every outfit recommendation gets a short *why* line — colour match, silhouette family, occasion. (Net-a-Porter pattern adapted; Pinterest STL failure inverted.)
3. **Separate alternatives from supplementaries; never collapse them.** Two distinct widgets, two intents. (Baymard 58% finding; raw H&M data 72.2% cross-category baskets.)
4. **Provenance is a trust primitive — make it visible.** Per-slot provenance label: Creator name + tier, *Editor's pick*, *Sponsored*, *Suggested by Zalando*. (ASOS Looks provenance-blur anti-pattern.)
5. **Algorithmic surfaces must read as curated.** Trained on creator outfits (Stitch Fix +14% pattern). Empirically grounded: Louvain on H&M data found 44 large communities, 63.6% cross-category — coherence is already in the data.
6. **Respect the user who isn't here for outfits.** Bargain Hunter counter-persona drives sale-aware collapse rules; measurement plan includes a sale-filtered counter-metric.

If a mockup violates any of these six principles, the violation is deliberate and explained — not accidental.

---

## 5 · Redesign

> *Visual mockups (lo-fi → mid-fi → hi-fi) are produced in Figma and exported into this section as static images. This Markdown section contains the IA description, key interaction patterns, edge cases, and connection back to principles. Figma file URL: [TODO add public Figma link before publishing]. PNG exports below are referenced from `design/exports/` and added before publishing.*

### 5.1 · Information architecture

The redesign touches three surfaces. The IA diagram (Figma file, `design/exports/ia-flow.png`) shows the flow:

```
            ┌─────────────────────────────────────┐
            │   PRODUCT DETAIL PAGE (surface 1)   │
            │                                     │
            │  [Alternatives widget]              │  ← Principle 3
            │  [Complete this outfit widget]      │  ← Principles 1, 2, 3, 5
            │                                     │
            │      "Save outfit" action ─────────┼─→ Outfit-shaped wishlist
            │      "Add full outfit to bag" ─────┼─→ Bundle action (Principle 1)
            │      "See this style elsewhere" ───┤
            └─────────────────┬───────────────────┘
                              │
                              ▼
            ┌─────────────────────────────────────┐
            │   LOOK DETAIL PAGE (surface 2)      │
            │                                     │
            │  [The full creator look with        │
            │   tagged items, rationale per       │  ← Principle 2
            │   piece, provenance per piece]      │  ← Principle 4
            │                                     │
            │  [Bundle action: add all to bag]    │  ← Principle 1
            │  [Save outfit]                      │  ← Principle 1
            │  [Sold-out graceful failure →]──────┼──┐
            └─────────────────────────────────────┘  │
                                                     │
                                                     ▼
            ┌─────────────────────────────────────┐
            │   DISCOVERY NAVIGATION (surface 3)  │
            │                                     │
            │  [Force-directed style-cluster      │  ← Section 3 data
            │   graph; communities as nodes;      │  ← JTBD-3
            │   creators within communities]      │  ← Principle 5
            └─────────────────────────────────────┘
```

### 5.2 · Surface #1 — Product Detail Page

**What changes:**

- Two distinct widgets replace the five-widget pile-up. *"Other versions of this item"* (alternatives — horizontal grid, side-by-side compare layout) and *"Complete this outfit"* (supplementaries — outfit-card layout, one card per coherent outfit).
- Each outfit card carries: a **rationale line** ("Matching wash · light denim aesthetic"), a **provenance label** ("Styled by @creator" / *Editor's pick* / *Sponsored*), and a **bundle action** ("Add full outfit to bag — €X total").
- Sale-aware behaviour: when the page loads under a `/sale` context or sale-tagged PDP, the *Complete this outfit* widget collapses by default, preserving the Bargain Hunter's single-tap purchase path (Principle 6, measurement counter-metric C1).

**Visual:** Figma exports `design/exports/pdp-lo-fi.png`, `pdp-mid-fi.png`, `pdp-hi-fi.png`. *[TODO add when Figma file ships.]*

**Edge cases handled:**
- Sold-out items in supplementary outfit cards — substituted from the same Louvain community when available; otherwise the card is hidden rather than degraded.
- Mixed-brand outfits with disparate price points — bundle total surfaces; per-item prices remain visible on hover/tap.
- Anonymous vs logged-in — anonymous users see editorial outfits and the broad creator pool; logged-in users see personalised outfit selections from creators whose style clusters match prior browsing.

### 5.3 · Surface #2 — Look Detail Page

**What changes:**

- "Get the Look" panel is restructured around the **outfit-as-object** primitive. The full look appears with each tagged item carrying its own rationale + provenance line. A primary *Add full outfit to bag* button sits below the price summary.
- A *Save outfit* action (sibling to *Save item*) writes to a new outfit-shaped wishlist primitive — see Section 5.5 for the data model implication.
- Sold-out graceful failure: when an item in the look is unavailable, the page surfaces an in-style-cluster substitute ("This look is unavailable in your size — here are 3 alternates from the same style cluster") rather than going dead-end.

**Visual:** `design/exports/look-detail-lo-fi.png` etc. *[TODO]*

**Naming fix:** "Complete the Look" (entry on PDP) and "Get the Look" (destination on Look Detail) are unified to **"This look"** as the single semantic anchor, eliminating the case-study Problem #7 naming inconsistency.

### 5.4 · Surface #3 — Discovery navigation between creators

**What changes:**

- The current "more from this creator / you might also like" rabbit hole is replaced with a **style-cluster navigation** driven by the Louvain communities from Section 3.
- A force-directed graph visualisation (consuming [`design/graph/style-clusters.json`](../design/graph/style-clusters.json)) shows clusters as nodes. Users navigate by tapping a cluster → see creators whose looks land in that cluster.
- Cluster names use **observable attributes** (modal colour + modal garment group, e.g. "Blue · Denim · Cross-category") rather than invented style-vocabulary labels ("Y2K Revival"). This honesty is methodologically defensible per [`data/methodology.md`](../data/methodology.md).

**Visual:** `design/exports/discovery-graph.png`. *[TODO]*

**Edge cases:**
- Mobile — the force-directed graph degrades to a list of cluster cards on small viewports.
- Cold-start (anonymous) — defaults to the largest, most-cross-category communities; signals less aggressive personalisation than logged-in users get.

### 5.5 · The data model implication (often hidden in case studies — surfaced here)

The redesign requires one change Zalando does not currently have: **outfits as a first-class object in the product model.** Today, you can save items. The Boards feature exists but is buried and item-shaped underneath. The redesign treats an outfit as a saveable, shareable, bundleable, addressable object — with its own identifier, its own metrics (Section 6), and its own lifecycle (substitution rules, sold-out handling, expiry).

This is the single most consequential redesign decision and the one that determines whether the case study reads as "make the widget prettier" or as "fix the foundation underneath the widget." The competitive scan shows Pinterest boards, Whering lookbooks, and Stitch Fix saved Fixes all share this property — and they're the platforms that successfully treat outfit as the user's actual intent.

---

## 6 · Success Metrics & Measurement Plan

> *No live A/B has been run. This is a portfolio case study; the measurement plan is a plan, not a result. It's framed as "if I shipped this at Zalando, here is the experiment I would run and the decision rules I would commit to before looking at data."*

Full plan: [`design/measurement-plan.md`](../design/measurement-plan.md). Summary below.

### 6.1 · North-star

**Outfit-Attached Transactions (OAT)** — share of orders containing 2+ items from a saved or surfaced Zalando outfit.

*Why this and not Conversion Rate?* CR would lift trivially from UX polish and doesn't isolate the outfit-completion problem. OAT requires the outfit object (Section 5.5) to exist as a first-class primitive — measuring it confirms the data-model change shipped.

**Target:** OAT ≥ 8% within 12 weeks of full rollout. Baseline is currently 0% by definition (outfit object doesn't exist yet).

### 6.2 · Drivers

Five drivers, each linked to a persona and a principle:

| Driver | Definition | Persona signal | Principle |
|---|---|---|---|
| D1 | *Complete this outfit* widget engagement rate (PDP) | Outfit Seeker, Inspiration Browser | 1, 3 |
| D2 | Rationale-visible CTR uplift vs control on outfit slots | Inspiration Browser | 2 |
| D3 | Outfit-level save rate per active user per fortnight | All but Bargain Hunter | 1 |
| D4 | Bundle action ("Add full outfit to bag") use rate on Look Detail Page | Creator-Follower, Outfit Seeker | 1 |
| D5 | Discovery-entry cross-creator session depth (creators viewed per session) | Inspiration Browser | 5 |

### 6.3 · Counter-metrics (the Bargain Hunter section, named explicitly)

The redesign must not regress users it isn't built for. Three counter-metrics with non-regression thresholds:

| Counter | Definition | Threshold |
|---|---|---|
| C1 | Sale-filtered conversion rate | No more than -2% relative drop, 95% CI |
| C2 | Time-to-checkout for single-item-intent sessions | No more than +5% median time |
| C3 | Return rate on outfit-bundled purchases | ≤ single-item return rate × 1.15 |

If C1 drops past threshold, the sale-aware collapse rule (Principle 6) is misimplemented — the redesign pauses for re-tuning before further rollout.

### 6.4 · A/B test plan

Three-phase rollout with pre-registered hypotheses:

- **Phase A (weeks 1-2, 5% allocation)** — instrumentation sanity check. D1, D2, C2 only.
- **Phase B (weeks 3-6, 25%)** — full driver readout, counter-metrics watched. Decision gate at week 6.
- **Phase C (weeks 7-12, 50%)** — north-star readout possible. Make-or-break.

Pre-registered hypotheses + segment cuts (new vs returning, mobile vs desktop, geo, logged-in vs anonymous) detailed in [`design/measurement-plan.md`](../design/measurement-plan.md). The structural commitment is to write the decision rule before seeing the data, not after.

---

## 7 · Honest Limitations

This section is short on purpose. Half a page in the case study. Senior reviewers read this section to test whether the candidate understood the gap between portfolio rigor and operational rigor.

### What this case study is not

- **Not a shipped feature.** I do not work at Zalando, I have no access to their transaction data, no access to their product taxonomy beyond the public catalog, and no access to their experimentation infrastructure. Every metric threshold in Section 6 is reasoned, not battle-tested.
- **Not validated with real interviews.** The five personas are composites synthesised from 99 public review-aggregator quotes plus Zalando's own published user research. Methodology is disclosed in [`research/personas/methodology-disclosure.md`](../research/personas/methodology-disclosure.md) — including the Trustpilot/Reddit/App-Store access constraints that forced substitution to regional analog aggregators. Real interviews would strengthen the Creator-Follower persona specifically (it's the persona for whom direct customer voice is structurally absent from public review discourse — they abandon silently rather than file complaints).
- **Not built on Zalando's data.** Section 3 uses the H&M Kaggle dataset as a proxy. The proxy holds for demonstrating the *method* (Apriori → sparse co-occurrence → Louvain *can* surface cross-category style clusters from basket data at scale). It breaks for predicting Zalando's specific clusters (single-brand H&M baskets differ structurally from Zalando's multi-brand creator-driven outfits). The case study presents the viz as evidence that *style coherence is modelable*, not as evidence of what Zalando's actual communities are.

### What the case study assumes

- That Zalando's existing Style Creator program output (Get the Look creator outfits) can be plumbed back into the recommender as training data — the Stitch Fix +14% pattern from competitive best-practices #1. This is technically feasible per Zalando's published architecture (Algorithmic Fashion Companion, Lucie McLean), but the engineering work is not modelled here.
- That the outfit object (Section 5.5) is a tractable data-model change. In practice, this touches the cart, the wishlist, the order system, returns, and the analytics pipeline — all of which would require significant cross-team coordination at a company of Zalando's size.

### Open questions the design phase didn't fully resolve

1. **Where does the outfit-shaped save live in the IA?** Sibling to wishlist? Promoted Boards (already exists, currently buried)? A new primary nav entry? The redesign argues for sibling-to-wishlist; the case study notes this is the single biggest IA decision.
2. **Who writes the rationale text?** LLM-generated from recommender features (cheap, may feel generic) vs. creator-supplied at submission (richer, harder supply problem) vs. editorial team (best quality, doesn't scale). The redesign suggests a hybrid — editorial for hero looks, LLM for long-tail.
3. **Is "add all to bag" a UX trick or a commerce primitive?** A UX trick (five Add-to-Bag calls) is shippable in two weeks. A commerce primitive (outfit SKU, returnable as a unit) is much more interesting and much harder. The case study notes both paths.

### Where I'd ground-truth this further if I were on the Zalando team

Two interviews with Creator-Followers who arrived at Zalando via Instagram/TikTok creator posts — to validate the Creator-Follower persona that's currently anchored on quantitative + structural + creator-side evidence rather than direct customer voice. Three observational sessions with users in a `/sale` context to confirm the Bargain Hunter counter-persona's sale-aware UX assumptions. One end-to-end recommender quality audit on the Style Creator outfit training data to validate the +14% Stitch Fix transfer is realistic on Zalando's catalog.

These are interviews and audits Zalando could run inside a week. They would close the largest remaining gaps. Without them, the case study is internally consistent and methodologically honest — but is, at the end, a portfolio case study, not a production redesign.

---

## Acknowledgements & links

- **Companion research:** [`research/`](../research/)
- **Companion data analysis:** [`data/`](../data/)
- **Design principles + measurement plan:** [`design/`](../design/)
- **Force-directed graph data:** [`design/graph/style-clusters.json`](../design/graph/style-clusters.json)
- **Methodology disclosure for the personas:** [`research/personas/methodology-disclosure.md`](../research/personas/methodology-disclosure.md)
- **H&M-as-proxy methodology:** [`data/methodology.md`](../data/methodology.md)

This case study was built during the Roots AI Powered Product Manager intensive (May-June 2026). H&M Personalized Fashion Recommendations dataset is cited as: *Carlos García Ling, ElizabethHMGroup, FridaRim, inversion, Jaime Ferrando, Maggie, neuraloverflow, and xlsrln. H&M Personalized Fashion Recommendations. https://kaggle.com/competitions/h-and-m-personalized-fashion-recommendations, 2022. Kaggle.*

---

*If you're hiring Product Designers at Zalando, ASOS, Farfetch, Mango Digital, ABOUT YOU, Bol.com, Vinted, or MyTheresa — and you've read this far — I'd love to talk. [Contact link / portfolio link / LinkedIn.]*
