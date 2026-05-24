# Best Practices — What competitors do exceptionally well

Five patterns worth borrowing — selected because they are *transferable* to Zalando's multi-brand marketplace at scale, not unique to closed-catalog or luxury models that don't port over.

---

## 1. Stitch Fix — Stylist outfits as training data for the recommender

**Where:** Stitch Fix's hybrid stylist + algorithm architecture. Sources: [Multithreaded (Stitch Fix Engineering) — *Experts in-the-Loop at Stitch Fix*](https://multithreaded.stitchfix.com/blog/2022/09/02/stylists-in-the-loop/), [Stitch Fix Algorithms Tour](https://algorithms-tour.stitchfix.com/).

**What they do:** Stitch Fix uses human stylists to assemble outfits for clients. Crucially, they also use those stylist-curated outfits as labeled training data for the recommendation model. Early tests showed stylist-trained models delivered a **14% increase in their internal quality measure** versus algorithm-only baselines.

**Why it works:** Stylists encode tacit knowledge — silhouette balance, occasion fit, color theory — that's hard to learn from co-purchase data alone. By using their output as supervision, the algorithm learns *style coherence*, not just co-affinity. The 14% number is the empirical demonstration that this isn't just rhetoric.

**Pattern to consider adopting:** Zalando already has the Style Creator program producing curated outfits — those are an underused training corpus. Use creator-curated looks as labels to train the PDP recommendation widget, rather than relying purely on co-view / co-purchase signal (which is what produces the "Better together" widget's current incoherence). This is the bridge from algorithmic to human-curated that the case study's force-directed graph viz is meant to illustrate.

---

## 2. Farfetch — Deep siamese networks for stylistic compatibility on a multi-brand catalog

**Where:** Farfetch's "Inspire" recommendation engine. Source: [Farfetch Tech Blog — *How to build a recommender system: it's all about rocket science*](https://www.farfetchtechblog.com/en/blog/post/how-to-build-a-recommender-system-it-s-all-about-rocket-science-part-1/).

**What they do:** Farfetch trained a model on thousands of hand-curated outfits and uses deep siamese neural networks to learn relationships between products that are *stylistically complementary* — explicitly distinct from co-purchase or visual-similarity signals. The model is content-aware (uses product attributes) to compensate for product lifespans being either very short or very long, which breaks pure item-item collaborative filtering.

**Why it works:** Farfetch's catalog problem is structurally similar to Zalando's — multi-brand, long-tail, high turnover. A siamese network trained on outfit labels learns what "goes with" looks like, even for items the model has never seen sold together. That generalization is the lever that makes outfit completion scale across a marketplace.

**Pattern to consider adopting:** The H&M dataset analysis in the case study (Week 3) can prototype the *idea* of a style-compatibility embedding, with the caveat (already documented in CLAUDE.md) that H&M co-purchase data ≠ style compatibility. The honest framing for the case study is: "Farfetch shows it's possible to model stylistic compatibility at multi-brand scale; here is a proof-of-concept on the only public dataset I had; production would need outfit labels from the creator program."

---

## 3. Uniqlo StyleHint — UGC with automatic, accurate SKU tagging on a closed catalog

**Where:** [StyleHint app](https://www.stylehint.com/us/en) — Uniqlo's outfit inspiration platform fed by store staff and community uploads. Source: [Fast Company — *Uniqlo will help you re-create that perfect outfit you just spotted on the internet*](https://www.fastcompany.com/90431751/uniqlo-will-help-you-recreate-that-perfect-outfit-you-just-spotted-on-the-internet).

**What they do:** Users upload outfit photos. Image-recognition auto-tags any Uniqlo SKU in the photo, making every piece directly shoppable. Store staff post their daily outfits, which become first-class content alongside community uploads. Weekly themed challenges drive supply.

**Why it works:** Three things compound. (a) Tagging is accurate because the catalog is closed — the model only has to recognize Uniqlo SKUs, not the universe of fashion. (b) Provenance is honest — staff posts and community posts are visually distinct. (c) The supply side has structure (challenges, staff cadence), so the content doesn't go stale.

**Pattern to consider adopting:** Zalando's catalog isn't closed, so the auto-tagging accuracy lift won't transfer cleanly (this is exactly why the case study scopes tagging-accuracy out as a data/ML problem). But the **staff-as-creator** and **weekly-challenge** patterns are directly portable. Zalando's existing creator program could publish weekly themed challenges ("Wide-leg denim for office") that drive curated outfit supply *and* feed the cross-category constraint discussed in [`anti-patterns.md`](anti-patterns.md) #1.

---

## 4. Net-a-Porter (PORTER) — Editorial rationale text as the differentiator

**Where:** Net-a-Porter's PORTER editorial section. Source: [PORTER — *Net-a-Porter's Daily Fashion, Beauty & Lifestyle Editorial*](https://www.net-a-porter.com/en-us/porter), [*What To Wear / Outfit Ideas*](https://www.net-a-porter.com/en-us/campaigns/what-to-wear/).

**What they do:** Every editorial outfit includes copy explaining *why* the pairing works — fabric pairing, silhouette, occasion, mood. The shoppable items are embedded in the rationale, not bolted on after it.

**Why it works:** The rationale layer does two jobs. First, it builds trust — the reader sees that a stylist actually thought about this. Second, it functions as taste education — readers learn the styling logic, which compounds: they make better future choices on their own, which makes them return for more. This is something pure algorithmic recs cannot do at all, however good the math is.

**Pattern to consider adopting:** This is the single highest-leverage and lowest-cost borrowing in the entire competitive set. A short rationale on each outfit on the Look Detail Page — two lines, not an essay — converts algorithmic recommendations *from* "trust me" *to* "here's why," which closes the trust gap the current Zalando widgets open. This is the explanation layer named in problem #8 of the eight identified problems. **Implementation:** at minimum, surface attributes the recommender already uses internally (color match, silhouette family, occasion tag) as human-readable rationale. At ambition, generate one-line rationale via LLM with the creator program's editorial as the style guide.

---

## 5. Pinterest — Boards as the canonical save-as-outfit primitive

**Where:** Pinterest's board model. Source: [Pinterest Newsroom — *Introducing the next wave of visual search and shopping*](https://newsroom-archive.pinterest.com/introducing-the-next-wave-of-visual-search-and-shopping), [VentureBeat — *Pinterest launches Lens Your Look fashion search feature*](https://venturebeat.com/ai/pinterest-launches-new-visual-search-feature-and-scan-codes).

**What they do:** Pinterest's primary save unit is the board — a curated collection — not the individual pin. Users naturally accumulate outfit ideas as boards ("Spring 2026 capsule", "Wedding guest", "Wide-leg denim outfits"). The board *is* the persistent outfit construct.

**Why it works:** Saving an outfit is a different mental action from saving an item, and Pinterest is the only consumer surface where the outfit-shaped save is the default. The board pattern also solves the "return to context" problem — a user can leave Pinterest, come back weeks later, and find an outfit they were assembling exactly where they left it.

**Pattern to consider adopting:** Zalando's wishlist today is item-shaped, which is why "save the outfit" is structurally impossible. The redesign should introduce an **outfit-shaped save primitive** — either by promoting Zalando Boards (already exists, currently under-surfaced in CLAUDE.md's mention of "Boards") to first-class on PDP and Look Detail Page, or by adding "Save outfit" as a sibling action to "Save item." Either way, the data model needs outfits to be saveable objects, not just bundles of saved items. This is the single redesign decision that most clearly distinguishes the case study from a "make-the-widget-prettier" exercise.
