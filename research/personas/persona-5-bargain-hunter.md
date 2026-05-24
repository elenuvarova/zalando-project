# Persona 5 — The Bargain Hunter (Counter-Persona)

> **⚠️ COMPOSITE. NOT A REAL INTERVIEW.** Synthesized from publicly available Zalando reviews. Name and demographics are constructed; behaviors and frustrations are drawn from cited verbatim quotes (`raw-quotes.csv`). This is the **counter-persona** — the user for whom the redesigned outfit-completion experience is *irrelevant or actively annoying*. Its retention is non-negotiable per the brief's integrity rules and CLAUDE.md (a counter-persona signals methodological maturity). See `methodology-disclosure.md`.

---

## Composite sketch

- **Name (composite):** Karim
- **Where (composite):** any market — Bargain Hunter is geography-agnostic
- **Trigger to visit Zalando:** sale alerts, Black Friday, end-of-season clearances, price tracking
- **Mental model when shopping:** "What's on discount that fits me? I'll take it. I don't care about the outfit — I care about the deal."

## JTBD statement

> **When** I see a sale on Zalando — Black Friday, end-of-season, flash discount — **I want to** filter to the discounted items in my size that I can use, **so that** I get the best price on items I would have bought anyway, regardless of outfit context.

## Top 3 frustrations

1. **Delivery promises that don't survive the sale-buying window** — *observation*. Sale shopping is time-pressured (item will sell out, deal will end), so delivery failure on a sale order has a sharper cost:  
   > "Really bad service, I ordered things on black Friday. They lost my package. Although black Friday finished, they refused to give me different product in same price level and even they refused any another support." — Miroslav, reviews.io (quote #6)
   > "Delivery times are not at all what is promised when you are ordering. It would be fairer not to promise delivery in 1-3 days when its actually more than one week." — Anonymous, reviews.io (quote #18)

2. **Outfit-completion noise on the path to the deal** — *hypothesis*. The "Complete the Look" widget on a discounted item PDP is visual interference for the Bargain Hunter — they want price, size, ship-by-date, not a styled outfit suggestion. No direct corpus quote — but this is structurally why the counter-persona exists. Their UX preference is *less* of the redesigned feature, not *more*.

3. **Promotion mechanics that hide the actual price or break at checkout** — *observation, single strong quote*:  
   > "Firstly was able to use PayPal then all of a sudden this option was not available so contacted them to ask why but they said it wasn't anything to do with them." — C, reviews.io (quote #17)
   > "Zalando is the One of the worst liars and worst service, what you see online sales it says 3 days delivery meaning it's 3 months delivery time." — Anonymous, reviews.io (quote #5) — *price-quoting at sale time is also where this persona is most sensitive*

## Top 3 needs

1. **Frictionless sale filtering** — % off, size, category. The Bargain Hunter wants the algorithmic-utility experience that the Inspiration Browser actively dislikes.
2. **Stable, predictable checkout** — payment methods don't disappear mid-flow; shipping cost doesn't shift; promo codes apply visibly.
3. **An outfit-completion widget that stays out of the way** — collapsed, dismissable, not crowding the PDP layout.

## Behavior patterns

- Sale-driven, not outfit-driven. Shops Black Friday, end-of-season, flash sales.
- Price-anchored — will return at lower price points repeatedly:  
  > "I am very glad to be able to buy so pretty clothes at Zalando with so affordable prices. Most of all what I most love about Zalando is that is extremely RELIABLE always credit my account on time concerning my returns." — Suzana Hong Roque, reviews.io (quote #3)
- Loyalty is to the deal, not the brand. Explicit Amazon-switch threat when service fails:  
  > "Please, this company has liars and scammers in customer service. Save nerves, time and money and buy at amazon. This company is an ugly ugly joke." — Anonymous, reviews.io (quote #15)

## What Zalando does well for them (when it works)

- Genuine sale price points on a broad multi-brand catalog. The Bargain Hunter quote (#3) is the most explicitly positive in the entire corpus — and it's anchored to affordability and returns reliability, not style or curation.

## What fails them

- Delivery promises that don't survive (corpus-strong).
- Promotion/checkout flow issues (quote #17).
- *NOT* failed by: outfit-completion widget quality, tagging accuracy, style coherence. **These dimensions are largely orthogonal to this persona's needs.**

## Voice quote (verbatim)

> "I am very glad to be able to buy so pretty clothes at Zalando with so affordable prices. Most of all what I most love about Zalando is that is extremely RELIABLE always credit my account on time concerning my returns."  
> — Suzana Hong Roque, reviews.io (quote #3) — the rare verbatim corpus quote that's strongly positive, and it's all about price and returns reliability — nothing about outfit or style

## Why this persona is the counter-persona

The redesigned outfit-discovery experience makes the Bargain Hunter's path **marginally worse, not better**, if the outfit widgets become more prominent. The redesign needs to:

1. **Respect their irrelevance.** Outfit-completion components must be collapsible / dismissable / aware of sale-filtered browsing context (a user in `/sale` shouldn't get the same widget weighting as a user on a full-price PDP).
2. **Not cannibalize their measurement.** The redesign's success metrics must include a **counter-metric** for sale-filtered conversion — if outfit-discovery improvements lift outfit-adjacent metrics but suppress sale-path conversion, that's a tradeoff the team must surface, not hide.
3. **Preserve checkout stability.** Bargain Hunter's primary failure mode (corpus-observed) is checkout/payment friction, which is orthogonal to the redesign — but a redesign that touches PDP layout must not regress the existing sale-buying path.

This is the methodological-maturity signal: not every user benefits from every redesign. Saying so out loud, with citations, is what distinguishes the case study from a "the new design is universally better" pitch deck.

## Connection to redesign

- Surface #1 (PDP) — must accommodate this persona's "stay out of the way" need. Outfit-completion widget should be present but not dominant, especially in sale contexts.
- Surface #2 (Look Detail Page) — largely irrelevant for this persona. They don't navigate via Looks.
- Surface #3 (Discovery between creators) — irrelevant. They navigate via sale filters and category browsing.
- **Measurement plan implication:** counter-metric on sale-filtered conversion is required. This persona is the reason the case study's measurement plan (Week 5) MUST include counter-metrics, not just drivers and north-star.
