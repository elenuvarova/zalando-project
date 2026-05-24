# JTBD Synthesis — Inputs to Design Phase

> Synthesis across [`research/competitive/`](../competitive/) and [`research/personas/`](../personas/). This is the lens the design phase (Week 4-5 in CLAUDE.md) uses to make redesign decisions. JTBDs are framed in the standard "When… I want to… so that…" structure, then mapped to one of the three Zalando surfaces in scope.

---

## Five primary JTBDs

Synthesized from the personas in `research/personas/` and cross-checked against patterns observed in the competitive scan. Each JTBD is annotated with strength of corpus evidence (observation / hypothesis), the personas it belongs to, and the surface where the redesign solves it.

### JTBD-1 — Assemble a coordinated outfit by a deadline
> **When** I have an occasion with a specific date (wedding, interview, holiday, event), **I want to** assemble a coordinated head-to-toe look in one session and have it delivered in time, **so that** I'm not scrambling at the last minute.

- **Personas:** Outfit Seeker (primary), Single-Item Shopper (secondary — when the "single item" turns out to need outfit context)
- **Evidence strength:** mixed. Fulfillment-against-deadline is corpus-strong (quotes #5, #14, #16, #18). Outfit-assembly intent is hypothesis-stage.
- **Surface:** PDP Complete the Look widget (#1) + Look Detail Page (#2). Bundle action and outfit-level save are core.
- **What the competitive scan teaches:** No mainstream e-commerce competitor solves this on the PDP. The bottom-right quadrant of the positioning map is empty for a reason — human-curated outfit utility doesn't scale via stylists per SKU. Zalando's path is creator-outfits-as-training-labels (best-practices #1, Stitch Fix pattern adapted).

### JTBD-2 — Find and confirm the right version of one specific item
> **When** an item in my wardrobe needs replacing, **I want to** find the right version of that item — correct fit, color, material — quickly and confidently, **so that** I can buy it and move on.

- **Personas:** Single-Item Shopper (primary). Bargain Hunter overlaps when the item is on sale.
- **Evidence strength:** corpus-strong (quotes #7, #10, #11, #12).
- **Surface:** PDP (#1) — specifically the alternatives section, separated from the supplementaries section.
- **What the competitive scan teaches:** Baymard's "58% of sites get cross-sell wrong" finding (anti-patterns #1) lands directly here. Alternatives ≠ supplementaries. The redesigned PDP must keep these as separate widgets with separate intent labels, never collapsed into one ambiguous "you may also like."

### JTBD-3 — Browse without intent, find what I didn't know I wanted
> **When** I have no specific shopping intent but want to engage with fashion, **I want to** explore a feed that surfaces things I'd genuinely like — visually, by mood, by style — without articulating what I'm looking for, **so that** I discover things I didn't know existed.

- **Personas:** Inspiration Browser (primary), Creator-Follower (secondary, as substitute when specific outfit unavailable).
- **Evidence strength:** **corpus-strong on the core JTBD AND now data-validated.** Customer-side: Zalando Design's own published user research (quotes #20, #21) directly endorses the JTBD. Data-side: 30-day H&M analysis shows 44 communities ≥10 SKUs, **63.6% spanning 2+ garment groups, 21 spanning 3+** — empirical confirmation that natural style clusters cross categories rather than collapsing same-category. This is the most defensible JTBD in the entire synthesis.
- **Surface:** Discovery navigation between creators by style cluster (#3). Also benefits from PDP rationale layer.
- **What the competitive scan teaches:** Pinterest's board pattern (best-practices #5) and Pinterest STL's invisible-rationale failure (anti-patterns #2) bracket the design space — boards as a save primitive YES, dots without rationale NO.
- **What the data analysis shows:** The force-directed graph at [`design/graph/style-clusters.json`](../../design/graph/style-clusters.json) (150 nodes / 495 edges / 8 communities exported from the full 65-community detection) is tied directly to this JTBD. The anchor SKUs (light-blue wide-leg denim, the case-study visual reference) cluster into **Community #17 "Blue · Trousers Denim"** — 70 members spanning 4 garment groups (34 Trousers Denim + 33 Trousers + 2 Blouses + 1 Dressed). This is the concrete design-decision anchor per CLAUDE.md anti-pattern #3: the graph drives the cluster-navigation IA on surface #3 because the cluster *demonstrably exists* in customer purchase behaviour. Without the data layer this would be a styling assertion; with it, it's a structural claim about how customers already shop.

### JTBD-4 — Recreate the exact outfit I saw on a creator
> **When** I see a specific outfit on a creator's page or social post, **I want to** identify and buy all the pieces in that exact outfit as a coherent set, **so that** I recreate the look I responded to.

- **Personas:** Creator-Follower (primary, sole).
- **Evidence strength:** **HYPOTHESIS — weakest in the synthesis.** Single corpus quote (#4) tangentially supports the "I came for something specific and it broke" mode. The JTBD is structurally required by the case study (the entire Get the Look creator program is built around it) but the corpus doesn't yet corroborate.
- **Surface:** Look Detail Page (#2). Bundle action, accurate tagging surfacing, sold-out graceful failure.
- **What the competitive scan teaches:** Uniqlo StyleHint (best-practices #3) solves this for a closed catalog; Pinterest STL (anti-patterns #2) shows what happens when tagging is hybrid CV+human and rationale is absent. Zalando's multi-brand catalog inherits the marketplace tagging problem — so the design must focus on the experience *around* the tags (rationale, bundle, graceful failure), not on fixing the tags themselves (scoped out in CLAUDE.md as data/ML problem).

### JTBD-5 — Get the deal at the right price *(counter-JTBD)*
> **When** I see a Zalando sale (Black Friday, end-of-season, flash), **I want to** filter to discounted items in my size that I'd buy anyway, **so that** I get the best price on what I would have bought.

- **Personas:** Bargain Hunter (primary, sole — counter-persona).
- **Evidence strength:** corpus-supported (quotes #3, #6, #15, #18).
- **Surface:** None of the three in redesign scope serve this JTBD; the design must NOT make it worse.
- **What the competitive scan teaches:** This JTBD is largely orthogonal to outfit-completion experience. The competitive set shows that algorithmic-utility bottom-left players (Lyst, Farfetch) serve price-finders well; the redesign should respect that path. Counter-metric in the Week 5 measurement plan must include sale-filtered conversion.

---

## How the JTBDs cluster (the design-input view)

Mapping JTBDs onto the bottom-right quadrant of the positioning map (the empty space the competitive scan identified):

```
                        JTBD-1: Assemble coordinated outfit by a deadline ◄─┐
                        JTBD-3: Browse without intent, find unknown wants ◄─┤   These three converge on
                        JTBD-4: Recreate exact outfit from creator         ◄─┘   the same redesign moves.
                                                                              
                        JTBD-2: Find right version of one specific item    ─── Adjacent. Borrows alternatives/supplementaries discipline.
                        
                        JTBD-5: Get the deal at the right price             ─── Counter. Must remain undisturbed.
```

The three convergent JTBDs (1, 3, 4) all need the same three redesign moves identified in the competitive scan's strategic findings:

1. **First-class outfit object** (per strategic finding #3). Required to make outfit-level save, outfit-level share, and outfit-level metrics possible. JTBDs 1 and 4 break without it; JTBD 3 leaks at the moment of return-later.
2. **Creator outfits as training labels** (per strategic finding #1). Required to make algorithmic outfit completion *coherent*. JTBDs 1 and 3 leak when widgets surface random items (Problem #3 / #5 / #6 in case study); JTBD 4 leaks when the creator's specific look can't be matched to coherent substitutes.
3. **Rationale surfaced on outfit recommendations** (per strategic finding #2). Required to convert algorithmic recs into something that *reads* as curated. JTBD 3 lives or dies by this — Inspiration Browser leaves when surfaces feel random. JTBDs 1 and 4 benefit from rationale at lower elasticity.

---

## What each surface must serve (design-phase brief)

### Surface #1 — PDP Complete the Look widget
**Primary JTBDs:** 1 (outfit assembly), 2 (single-item find).
**Secondary:** 3 (inspiration moments on a PDP), 5 (avoid making this worse).
**Key moves from this synthesis:**
- Cross-category enforcement (no five-jeans widgets — Baymard finding directly applied).
- Separate alternatives widget from supplementaries widget (Baymard 58% finding).
- Rationale line per supplementary outfit slot.
- Collapsible / sale-aware behavior to respect Bargain Hunter's counter-need.

### Surface #2 — Look Detail Page
**Primary JTBDs:** 4 (recreate exact outfit), 1 (outfit assembly continuation).
**Secondary:** 3 (Inspiration Browser explores Looks).
**Key moves:**
- Bundle "add all to bag" action.
- Outfit-level save (the Pinterest-board pattern adapted to Zalando Boards).
- Sold-out graceful failure with same-style-cluster substitution.
- Per-look rationale (the Net-a-Porter pattern adapted — short, not editorial-essay).

### Surface #3 — Discovery navigation between creators
**Primary JTBD:** 3 (browse without intent).
**Secondary:** 4 (Creator-Follower as substitute path when their specific creator's outfit fails).
**Key moves:**
- Style-cluster navigation (force-directed graph from Week 3 data analysis — tied to this JTBD per CLAUDE.md anti-pattern #3).
- Cluster attributes richer than color (silhouette, occasion, mood) — explicit response to anti-pattern #4 (SSENSE single-attribute-filter critique).

---

## Open questions for the design phase

These are questions the JTBD synthesis surfaces that the design phase must answer:

1. **Where does the outfit-level save live in the IA?** Sibling to wishlist (item-level)? Promoted Zalando Boards (already exists, currently buried)? New primary nav entry? This is the single biggest IA decision.
2. **Who writes the rationale text?** LLM-generated from existing recommender features (cheap, may feel generic)? Creator-supplied as part of look submission (richer, harder supply problem)? Editorial team (best quality, doesn't scale)? Hybrid by surface: editorial for hero looks, LLM for long-tail PDP widgets?
3. **How is the bundle action priced and shipped?** Is "add all to bag" a UX trick (just five Add to Bag calls) or a commerce primitive (outfit SKU, returnable as a unit)? The second is much more interesting and much harder.
4. **What's the sale-aware UX rule?** Concrete decision for the design phase: when a PDP loads under a sale-filter context, does the Complete the Look widget collapse by default? What other state changes?
5. **How does the Look Detail Page handle one-of-N-items sold-out?** Substitute in cluster? Show but disabled? Trigger "outfit alert" notification on restock? The Creator-Follower JTBD lives or dies here.

These are the questions the redesign mockups (Week 4-5) must answer in pixel form. The JTBD synthesis isolates them; the design phase decides them.

---

## Integrity carry-over for the case study (Week 6 writing)

When the case study presents JTBDs:

1. **Frame JTBDs 1 and 4 as hypotheses** with the corpus evidence honestly stated (mixed for JTBD-1; weak for JTBD-4). Senior hiring managers reading this should see that the candidate didn't pretend the corpus said more than it did.
2. **JTBD 3 is the strongest claim in the synthesis.** Anchor the inspiration-browsing narrative on Zalando Design's own published research quotes. That's defensible against any reviewer.
3. **JTBD 5 (counter-JTBD) gets dedicated airtime in the measurement plan section, not as a footnote.** This is the methodological-maturity signal — the redesign is honest about who it doesn't serve.

> Status: synthesis complete on the corpus available (23 quotes, see `research/personas/methodology-disclosure.md`). Re-run synthesis when the cron-scheduled extension agent — or a manual paste of Trustpilot/Reddit HTML into `research/personas/_raw/` — meaningfully increases the corpus. JTBD 4 is the highest-priority dimension to re-evidence.
