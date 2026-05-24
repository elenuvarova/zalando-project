# Three Strategic Findings — 30-second brief to a design lead

Each finding: three sentences, framed around where Zalando can leapfrog (not catch up).

---

## Finding 1 — The empty quadrant is "algo-curated outfit utility with rationale"

The competitive map shows mainstream e-commerce splits cleanly into algorithmic utility (Farfetch, Lyst, H&M, Zalando today) and human-curated inspiration (Net-a-Porter, Mango, ASOS Looks, Uniqlo StyleHint) — and nobody is doing both at PDP scale because human curation per SKU is uneconomic. Zalando already has the asset the competitors lack: a Style Creator program producing thousands of human-curated outfits that, today, sit in a separate "Get the Look" hub disconnected from the PDP recommendation widgets. The leapfrog play is to **use creator-curated outfits as training labels for the PDP recommender** (Stitch Fix proved this delivers a measurable quality lift over algo-only) so algorithmic widgets surface stylistically coherent outfits and *feel* curated — without paying for human curation per SKU.

> See [`positioning-map.md`](positioning-map.md) and [`best-practices.md`](best-practices.md) #1.

---

## Finding 2 — Rationale is the single highest-leverage borrowed pattern

Of every competitor surface I scanned, only Net-a-Porter's editorial (PORTER) routinely surfaces a *why-these-go-together* rationale on outfits — every other surface (Pinterest dots, ASOS Looks, H&M Complete the Look, Farfetch Inspire, Lyst recs, Zalando widgets) makes the user infer the styling logic from the visual juxtaposition alone. Rationale solves three problems at once: it builds trust in algorithmic recs (closing problem #8 in the identified Zalando problems), it makes the redesign demonstrably differentiated from the bottom-left quadrant where Zalando currently competes, and it's *cheap* — the recommender already computes the features (color match, silhouette family, occasion tag) needed to generate a one-line rationale, they just aren't surfaced. The case-study story is sharpest if the rationale layer is presented as "we already had this information — we just stopped hiding it from the user."

> See [`best-practices.md`](best-practices.md) #4.

---

## Finding 3 — Make "outfit" a first-class saveable object, or the redesign stays cosmetic

Today on Zalando, you can save items; you cannot save an outfit. Across the competitive set, the platforms that successfully treat outfit as the user's intent (Pinterest boards, Whering lookbooks, Stitch Fix saved Fixes) all share one property: the outfit is a first-class saveable, shareable, returnable object in their product model, not a bundle that disassembles when the user moves on. Without this change, every other redesign move — better widget, bundle action, cross-category enforcement, rationale layer — leaks at the moment of save, because the user can only persist fragments of what they were assembling; with it, the redesign has the durable behavior change that lets Zalando measure outfit-level engagement (a north-star metric for the case study's measurement plan that no item-level metric can capture).

> See [`best-practices.md`](best-practices.md) #5 and [`anti-patterns.md`](anti-patterns.md) #5.

---

## What these three findings imply together

They form a stack:

1. **Finding 3** changes the data model (outfit becomes a first-class object).
2. **Finding 1** changes how the algorithm learns (creator outfits become training labels).
3. **Finding 2** changes what the user sees (rationale gets surfaced on each outfit).

In that order, the redesign is structurally coherent: a new object type, a new training signal, a new explanation layer. In any other order, you get a partial fix that leaks. This is the spine of the redesign narrative the case study can build around.
