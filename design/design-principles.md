# Design Principles — Zalando Outfit Discovery Redesign

> Six principles distilled from the [research](../research/), the [competitive scan](../research/competitive/), the [personas](../research/personas/), and the [JTBD synthesis](../research/jtbd/jtbd-synthesis.md). Each principle is paired with the evidence that produced it and the decision rule it gives the design phase. These are the rails the Week 4-5 mockups should not jump.

---

## Principle 1 — Outfit is a first-class object, not a bundle of items

**Evidence:**
- Competitive scan strategic finding #3 (`research/competitive/strategic-findings.md`): only platforms where outfit is a saveable primitive (Pinterest boards, Whering lookbooks, Stitch Fix saved Fixes) solve outfit-completion durably.
- Inspiration Browser JTBD-3: "save what catches the eye" leaks when only items can be saved.
- Creator-Follower JTBD-4: recreating an outfit requires the outfit to exist as a unit in the system, not just as four loosely related items.

**Decision rule for design:** every screen where outfits appear must expose an outfit-level action — save, share, bundle, or continue. No screen treats the outfit as decoration around individual items.

**Counter-check:** Bargain Hunter (persona-5) doesn't need this; design must not block their item-level path.

---

## Principle 2 — Surface the rationale, don't make users decode it

**Evidence:**
- Competitive scan strategic finding #2: only Net-a-Porter editorial surfaces *why-these-go-together* rationale; everyone else (Pinterest, ASOS, H&M, Farfetch, Lyst, Zalando) leaves the styling logic invisible.
- Case study Problem #8: missing AI explanation layer.
- Inspiration Browser JTBD-3 leaks when surfaces feel random or repetitive — rationale is what turns algorithmic into algo-curated.
- Anti-patterns #2 (Pinterest STL): dots without rationale teach the user *what* the items are, never *why* they're together.

**Decision rule for design:** every outfit recommendation surfaces at least one short rationale line — color match, silhouette family, occasion, or creator-style. No outfit ever shows up as five product images with no connective text. One line, not an essay.

**Counter-check:** the rationale must use vocabulary that doesn't require fashion-school training (per Inspiration Browser quote #21 — "Sometimes I don't know the word for what I am looking for").

---

## Principle 3 — Separate alternatives from supplementaries; never collapse them

**Evidence:**
- Anti-patterns #1 (Baymard): 58% of sites get this wrong; alternatives and supplementaries serve different JTBDs (find the right item vs finish the outfit).
- Case study Problem #4: category monotone — all 5 widgets show jeans or tops.
- Single-Item Shopper (persona-2) needs alternatives undisturbed by supplementaries.
- Outfit Seeker (persona-1) needs supplementaries to be findable.
- **Data layer (H&M analysis, 30-day window):** 72.2% of real multi-item baskets span 2+ garment groups (raw data); 26.7% of co-occurrence edges (lift≥1.5) cross garment groups. Users naturally shop cross-category — the same-category widget design fights what users actually do.

**Decision rule for design:** the PDP holds two distinct widgets — *Other versions of this item* (alternatives) and *Complete this outfit* (supplementaries). They have different labels, different layouts (alternatives in a horizontal compare-grid; supplementaries in an outfit-card with rationale). They are never merged into a single ambiguous "you may also like."

**Counter-check:** the supplementaries widget must enforce cross-category coverage — never all-jeans, never all-tops. Algorithmically constrained.

---

## Principle 4 — Provenance is a trust primitive — make it visible

**Evidence:**
- Anti-patterns #3 (ASOS Looks): provenance blur between brand photography, UGC, and sponsored content visually collapses the trust signal.
- Case study Problem #7 (analog): sponsored content blends with organic on Zalando.
- Creator-Follower (persona-4) follows specific creators — provenance is their navigation.

**Decision rule for design:** every outfit on the Look Detail Page and every supplementary outfit slot on the PDP carries a visible provenance label — creator name + tier badge for creator looks, *Editor's pick* for editorial, *Sponsored* for paid placement, *Suggested by Zalando* for algorithmic. The label is scannable in one glance, not buried in expand-more.

**Counter-check:** provenance must not crowd the visual — one short line, consistent placement, never two competing badges.

---

## Principle 5 — Algorithmic surfaces must read as curated

**Evidence:**
- Competitive scan strategic finding #1: Stitch Fix's stylist-outfit-as-training-data approach delivered +14% quality lift over algo-only baseline. Zalando has the unused asset (Style Creator program) to do this.
- Case study Problems #3, #5, #6: "Better together" broken, zero style coherence, algorithmic laziness — all variants of "the algorithm is showing its work and the work is bad."
- Inspiration Browser (persona-3) is the persona most sensitive to algorithmic randomness.
- **Data layer (H&M analysis):** Louvain on the co-purchase graph surfaced 65 communities; **63.6% of the 44 large communities (≥10 nodes) span 2+ garment groups, 21 span 3+** — meaning natural style coherence is already encoded in purchase behaviour and is recoverable algorithmically. The anchor (light-blue wide-leg denim) clustered into a 70-item community spanning Denim + Trousers + Blouses + Dressed — a cross-category style cluster the algorithm *discovered*, not assigned. This is the structural proof that "algo-curated" is achievable on commerce data alone (see [`research/jtbd/jtbd-synthesis.md`](../research/jtbd/jtbd-synthesis.md) JTBD-3).

**Decision rule for design:** algorithmic recommendation surfaces are trained on creator-curated outfits, not on raw co-view / co-purchase data alone. The system surfaces outfits that pass a coherence threshold (color/silhouette/occasion alignment) or it shows fewer slots, never noise to fill the layout. *Empty is allowed; incoherent is not.*

**Counter-check:** "trained on creator outfits" is an ML claim that the case study makes carefully — H&M dataset is a proxy (CLAUDE.md flagged). The design principle stands; the production implementation note is in `research/jtbd/jtbd-synthesis.md`.

---

## Principle 6 — Respect the user who isn't here for outfits

**Evidence:**
- Bargain Hunter (persona-5) is the counter-persona — outfit-completion improvements are at best neutral, at worst friction.
- Anti-patterns #5 (Lyst): personalization without an outfit construct still serves price-finders well; the design must respect that adjacent quadrant.
- Quote #6 (Miroslav, reviews.io): Black Friday context strong — sale-buying timing-pressured and outfit-irrelevant.

**Decision rule for design:** when the user is in a sale-filtered browsing context — `/sale`, sale filter applied on a PLP, or sale-tagged PDP — the Complete the Look widget collapses by default. Outfit recommendations are present but not dominant. The single-tap purchase path is undisturbed.

**Counter-check:** the measurement plan (next deliverable) includes a counter-metric for sale-filtered conversion. If the redesign regresses Bargain Hunter conversion meaningfully, that's a tradeoff to surface and decide on — not to hide.

---

## How these principles interlock

| Principle | Surface #1 (PDP) | Surface #2 (Look Detail) | Surface #3 (Discovery) |
|---|---|---|---|
| 1 — Outfit as first-class object | Save outfit alongside save item | Bundle action; outfit save is primary | Style clusters operate at outfit level |
| 2 — Surface the rationale | Rationale line per supplementary | Per-look rationale, short | Cluster names that *mean* something |
| 3 — Alternatives ≠ supplementaries | Two distinct widgets | N/A (this surface is outfit-centric) | N/A |
| 4 — Provenance is a trust primitive | Per-slot provenance label | Creator/editor/sponsor label per look | Creator name on cluster nodes |
| 5 — Algo reads as curated | Trained on creator outfits | Curated as primary, algo as fallback | Style clusters from creator data |
| 6 — Respect the non-outfit user | Sale-aware collapse | Less relevant on this surface | Less relevant on this surface |

If a mockup violates any principle, the violation must be deliberate and explained — not accidental. This is the design phase's discipline.

---

## What these principles will NOT tell you

For honesty in the case study writing:

- Typography, color, motion, micro-interactions — these are downstream of the principles, not specified here.
- Specific component patterns (cards vs lists, modal vs inline) — these depend on responsive context.
- Cross-platform parity (web vs app vs mobile web) — out of scope per the case study (mobile is surface-level only).
- Accessibility specifics — the principles are pre-accessibility; the design phase adds WCAG compliance per Zalando's existing standards.

These six principles are the spine. The mockups put muscle on it.
