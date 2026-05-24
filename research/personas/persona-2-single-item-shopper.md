# Persona 2 — The Single-Item Shopper

> **⚠️ COMPOSITE. NOT A REAL INTERVIEW.** Synthesized from publicly available Zalando reviews. Name and demographics are constructed; behaviors and frustrations are drawn from cited verbatim quotes (`raw-quotes.csv`). See `methodology-disclosure.md` for source-coverage audit.

---

## Composite sketch

- **Name (composite):** Marek
- **Where (composite):** mid-size European city — Warsaw, Madrid, Milan, Cologne
- **Trigger to visit Zalando:** a specific replacement need — worn-out sneakers, a new pair of jeans, a coat for the season
- **Mental model when shopping:** "I'm here for one thing. Don't overcomplicate it. Show me alternatives so I pick the right one — but I'm not building an outfit."

## JTBD statement

> **When** an item in my wardrobe needs replacing, **I want to** find the right version of that specific item quickly and confidently, **so that** I can buy it and move on. *Outfit completion is interesting only if it lands on my screen without me asking — I'm not here to assemble.*

## Top 3 frustrations

1. **Wrong-size / wrong-item arrival breaks the single-item trip's only purpose** — *observation, multiple quotes*:  
   > "I have made few purchases from them 2 weeks ago, everything was good until received the goods, 3 items were good but on was not the size I've ordered." — Khaled H, reviews.io (quote #10)
   > "I have been buying from Zalando for many years and never had any real issues other than being sent the wrong sizes from time to time… Until recently." — Helen, reviews.io (quote #11)

2. **Defective / damaged items wreck trust on the one product the trip was about** — *observation*:  
   > "An absolute disgrace. Repeatedly sent visibly damaged trainers, and the so-called customer service agents are repugnant & barely literate." — Rachid, reviews.io (quote #7)

3. **Missing items from a multi-piece order against the one item that mattered** — *observation*:  
   > "Esperienza NEGATIVA. Nella scatola inviata non erano presenti 2 articoli (PAGATI) e nemmeno la documentazione per effettuare il reso." (Translation: NEGATIVE experience. 2 items (PAID) were missing from the box and no documentation for the return either.) — Ivan Plachesi, reviews.io (quote #12)

## Top 3 needs

1. **A fast path from search → PDP → checkout** for the one item — alternatives shown side-by-side, not buried.
2. **Accurate tagging on the PDP itself** — color/material/pattern correctly described before purchase. (Ties directly to Problem #1 in the eight identified problems: brown tagged red, polka-dot tagged solid.)
3. **A "complete the look" widget that is *opt-in*, not *intrusive*** — when shopping for one item, the Single-Item Shopper finds outfit-completion suggestions either useful (if relevant and effortless) or annoying (if they crowd out the alternatives they actually need). The widget design must respect this. (Hypothesis — no direct corpus quote names "Complete the Look" widget specifically.)

## Behavior patterns

- Search-driven, not browse-driven — uses category navigation and filters, not editorial hubs.
- Sensitive to PDP accuracy: photo, color name, material, sizing chart.
- Will compare 3-5 alternatives on a single category before committing.
- Reads reviews. Sees patterns like "runs small" / "color is darker than photo" and adjusts.
- Tends to buy *one* size, not the buy-multiple-keep-one pattern of the Outfit Seeker.

## What Zalando does well for them (when it works)

- Catalog breadth and brand variety per category — the Single-Item Shopper can compare effectively across labels:  
  > "They have a huge variety of items from different brands, the shipment is most of the time fast." — Fernanda, reviews.io (quote #8)
- Long-term reliability when nothing goes wrong:  
  > "I have been buying from Zalando for many years and never had any real issues other than being sent the wrong sizes from time to time" — Helen, reviews.io (quote #11)

## What fails them

- Tagging inaccuracy on PDPs (case-study Problem #1; corpus-corroborated indirectly through "color completely different" complaints surfaced in search snippets — but no clean verbatim citation in the current corpus, so this is hypothesis-stage in `raw-quotes.csv` even though the case-study premise observes it directly).
- Wrong-item-on-arrival (corpus-strong).
- The PDP recommendation widget showing 5 more jeans when they came for jeans — useless visual noise (Problem #4; hypothesis-stage in corpus).

## Voice quote (verbatim)

> "I have been buying from Zalando for many years and never had any real issues other than being sent the wrong sizes from time to time… Until recently."  
> — Helen, reviews.io (quote #11) — captures the long-term, occasional-friction, single-pattern-of-failure tone

## Connection to redesign

- Surface #1 (PDP Complete the Look widget) — the design must serve the Single-Item Shopper's "don't overcomplicate it" need. Default state should not crowd the alternatives; outfit-completion can be one collapsed section, not the front and center.
- Surface #2 (Look Detail Page) — secondary for this persona.
- Surface #3 (Discovery between creators) — largely irrelevant for this persona; they came with intent.
