# Measurement Plan — Zalando Outfit Discovery Redesign

> The case study's Week 5 deliverable. North-star, drivers, counter-metrics, A/B plan. Built from the [JTBD synthesis](../research/jtbd/jtbd-synthesis.md), the [personas](../research/personas/) (especially the [Bargain Hunter counter-persona](../research/personas/persona-5-bargain-hunter.md)), and the [design principles](design-principles.md).

The measurement plan exists for one purpose: to make the redesign falsifiable. If we ship and the numbers don't move, we know. If they move in unexpected ways, we know which tradeoff just happened. Without this, the case study reads as a pitch deck.

---

## North-star metric

**Outfit-attached transactions (OAT) — share of orders containing 2+ items from a saved or surfaced Zalando outfit.**

**Why this and not something more familiar:**
- *Conversion rate* would lift trivially from any UX polish and doesn't speak to the outfit-completion problem.
- *Items per order* moves on cross-sell improvements generally; doesn't isolate outfit-shaped behavior from same-category bundling.
- *OAT* requires the outfit object to be first-class (per design principle #1), so the very act of being able to measure it confirms the data-model change actually shipped.

**Target:** OAT >= 8% within 12 weeks of rollout, against a current baseline that needs to be established at instrumentation time (the outfit object doesn't exist yet, so OAT is currently 0% by definition — instrumentation work surfaces the realistic floor against existing co-purchase patterns).

**What OAT does NOT measure (be honest in the case study):** the *quality* of the outfit attachment — a user buying jeans + jeans because the widget surfaced two pairs counts. That's why the next layer (drivers) exists.

---

## Driver metrics

The North-star moves because the drivers move. Five drivers, mapped to the JTBDs and personas.

### D1 — Supplementary widget engagement rate (PDP)
- **Definition:** % of PDP sessions where the user interacts (hover ≥1s, scroll-into-view ≥2s, or click) with the *Complete the outfit* widget specifically (not the alternatives widget — Baymard separation per [design principle #3](design-principles.md#principle-3--separate-alternatives-from-supplementaries-never-collapse-them)).
- **Why this driver moves the north-star:** more user attention to outfit-completion → more outfit-shaped baskets.
- **Persona signal:** Outfit Seeker (primary), Inspiration Browser (secondary on PDP).
- **Instrumentation note:** must distinguish from the alternatives widget. Same-element conflation is exactly the Baymard 58% problem the redesign is meant to fix.

### D2 — Rationale visibility uplift on outfit clicks
- **Definition:** click-through rate on outfit slots in the *with-rationale* variant vs *without-rationale* control, holding the underlying recommendations constant.
- **Why this driver:** if the rationale layer (per [principle #2](design-principles.md#principle-2--surface-the-rationale-dont-make-users-decode-it)) doesn't move clicks, the layer isn't doing its job and the case study's strategic finding #2 doesn't hold.
- **Persona signal:** Inspiration Browser (primary — this is the persona that lives or dies on coherence-readable surfaces).
- **Target:** rationale variant CTR ≥ control CTR × 1.10 (10% relative lift) for statistical viability against typical traffic at PDP scale.

### D3 — Outfit-level save rate
- **Definition:** outfits saved (via the new outfit-shaped save primitive) per active user per week.
- **Why this driver:** outfit-as-first-class-object (principle #1) is the structural change underneath the redesign. If users don't save outfits, the data model investment doesn't pay back.
- **Persona signal:** Creator-Follower (primary), Inspiration Browser (primary), Outfit Seeker (heavy use for return-after-research).
- **Target:** ≥1 outfit save per active user per fortnight for the cohort exposed to the new save UI. The framing matters more than the exact number — first-time use within 2 weeks is the binary signal.

### D4 — Bundle action use rate on Look Detail Page
- **Definition:** % of Look Detail Page sessions where the user invokes the *Add full outfit to bag* action (whether or not they complete checkout).
- **Why this driver:** the bundle action is the most directly outfit-completion-shaped behavior available. Use rate is the readiness-to-buy-the-outfit signal.
- **Persona signal:** Creator-Follower (primary), Outfit Seeker (primary).
- **Target:** ≥15% of Look Detail Page sessions invoke the action within 8 weeks of rollout.

### D5 — Discovery navigation: cross-creator session depth
- **Definition:** average number of distinct creators viewed per session entering via the discovery navigation surface (#3).
- **Why this driver:** the force-directed style-cluster nav is the bet that browsing-without-intent can be made productive (JTBD-3). If users still bounce after one creator, the cluster nav isn't doing the work.
- **Persona signal:** Inspiration Browser (primary), Creator-Follower as substitute path.
- **Target:** ≥2.0 distinct creators per discovery-entry session, up from the current single-creator baseline that needs to be established at instrumentation.

---

## Counter-metrics (the Bargain Hunter section, named explicitly)

The redesign must not regress users it isn't meant to serve. Three counter-metrics, with non-regression thresholds.

### C1 — Sale-filtered conversion rate
- **Definition:** conversion rate on sessions where the user is browsing under a sale filter (`/sale`, sale facet applied, or sale-tagged PDP).
- **Persona link:** Bargain Hunter (counter-persona, JTBD-5).
- **Non-regression threshold:** sale-filtered conversion must not drop by more than 2% relative in the A/B test holdout cohort, with 95% confidence.
- **Trigger:** if this drops past threshold, the sale-aware PDP collapse rule (design principle #6) is failing and the redesign must be re-tuned before full rollout.

### C2 — Time-to-checkout for single-item intent sessions
- **Definition:** median seconds from PDP land to "Add to Bag" click for sessions where the user does not interact with the supplementary widget.
- **Persona link:** Single-Item Shopper (JTBD-2). Defends against the redesign accidentally adding friction to the one-item trip.
- **Non-regression threshold:** ≤+5% median time vs control. If the supplementary widget visually crowds the primary buy path, this catches it.

### C3 — Return rate on outfit-bundled purchases
- **Definition:** % of items returned within 30 days, conditioned on whether the item was bought via the bundle action vs individually.
- **Persona link:** broadly relevant — guards against the redesign making it *easier to buy* outfits that don't actually work.
- **Non-regression threshold:** bundle-bought return rate ≤ single-item return rate × 1.15 (15% relative ceiling). If bundle-bought returns balloon, the system is over-encouraging incoherent outfits and the rationale + creator-training pipeline (principles #2, #5) need recalibration before further rollout.

---

## A/B test plan

### Unit of randomization
User-level, sticky across sessions for ≥30 days (so D3 and C3 can measure return behavior).

### Traffic allocation
- 10% holdout (no redesign) — always-on for the first 12 weeks to enable post-rollout monitoring.
- Variants ramp in three phases:
  - **Phase A (weeks 1-2): 5%** — instrumentation sanity check. Looking only at D1 (engagement), D2 (CTR), C2 (time-to-checkout). North-star and counter-metrics not yet powered.
  - **Phase B (weeks 3-6): 25%** — full driver readout, counter-metrics watched. Decision gate at week 6 on full rollout.
  - **Phase C (weeks 7-12): 50%** — north-star readout possible. Make-or-break for the redesign.

### Pre-registered hypotheses (decision rules)
- **H1:** OAT in the variant > OAT in holdout, by ≥3 absolute percentage points, p<0.05 at Phase C. *If holds:* rollout to 100%. *If fails:* roll back, root-cause which driver didn't move.
- **H2:** D2 (rationale CTR uplift) holds at ≥10% relative at Phase B. *If fails:* test removing rationale in a sub-arm to confirm direction. The case study's strategic finding #2 (rationale is the highest-leverage borrowing) needs this to hold to remain defensible.
- **H3:** C1 (sale-filtered conversion) non-regression holds throughout. *If fails:* the sale-aware collapse rule (principle #6) is misimplemented; pause rollout, fix, restart Phase B.

### Segment cuts to pre-register
Because the personas are heterogeneous, the average effect can hide segment effects. Pre-register these cuts:

- New visitors (first session) vs returning visitors — Outfit Seeker often arrives via search with a specific occasion; new-visitor effect may be larger.
- Mobile vs desktop — case study notes mobile is surface-level scope; mobile primary segment for the Creator-Follower persona.
- Geo: DE / NL / BE / UK / ES — multi-market matters because Trustpilot regional patterns differ.
- Logged-in vs anonymous — personalization layer (matrix dimension #8) only kicks in for logged-in users.

If the average holds but a major segment regresses, that's a finding too — and the case study should treat it as such, not hide it.

---

## What the case study writes about this section (Week 6)

When the case study presents the measurement plan:

1. **Lead with the counter-metrics, not the north-star.** That ordering signals seniority — most case studies bury the counter-metrics or skip them entirely. Naming the Bargain Hunter explicitly as the reason C1 exists is the methodological-maturity move CLAUDE.md anti-pattern #6 ("Do not write generic UX critique") is set up to favor.
2. **Be honest that no live A/B has been run.** This is a portfolio case study; the measurement plan is a plan, not a result. Frame as "if I shipped this at Zalando, this is the experiment I would run and the decision rules I would commit to before looking at data." Pre-registered hypotheses are credibility currency in a senior interview.
3. **Connect each metric back to a persona and a principle.** Every D and every C carries the link. This is what turns a metric list into a measurement *plan*.

---

## Honest limitations of this measurement plan

For the case study's half-page limitations section (Week 6, item 7 of the structure):

- **OAT baseline doesn't exist yet** because the outfit object doesn't exist yet. The first 4-8 weeks are instrumentation + baseline establishment, not active experimentation.
- **D3 (outfit save rate) assumes the save UI ships** as designed. If the design phase deprioritizes outfit save, the entire driver framework loosens.
- **Counter-metrics on the Bargain Hunter rely on sale-context detection being accurate.** If sale-detection is noisy, C1 will be noisy, and the rollout decision risks being made on bad signal.
- **The case study is not a real shipped feature.** All thresholds are reasoned, not battle-tested. A real Zalando team would have historical effect-size priors that this plan doesn't.

These limitations are not weaknesses to hide — they're the surface where senior reviewers test whether the candidate understood the gap between portfolio rigor and operational rigor. Naming them is the protection.
