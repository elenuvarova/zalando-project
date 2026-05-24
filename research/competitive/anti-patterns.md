# Anti-Patterns — What competitors do that demonstrably fails

These are patterns where a competitor's outfit-discovery design hurts UX in a way directly relevant to the Zalando redesign. Each is sourced; lessons connect back to one of the three Zalando surfaces in scope.

---

## 1. Same-category cross-sell masquerading as outfit completion (industry-wide)

**Where:** Most multi-brand marketplaces — Baymard's research finds **58% of major e-commerce sites only offer one type of cross-sell (alternatives *or* supplementaries) or collapse both into the same element**, limiting effectiveness. Source: [Baymard — *Product Page Usability: Recommend Both Alternative & Supplementary Products (Only 42% Get it Right)*](https://baymard.com/blog/product-page-suggestions).

**What they do:** Show "you may also like" or "complete the look" carousels that are actually populated with co-purchase or visually-similar items — not items that complete an outfit. The user looking at jeans sees five more jeans.

**Why it fails:** It conflates two different JTBDs. Alternatives serve "help me decide" (am I buying the right jeans?). Supplementaries serve "help me finish" (what shoes/top/jacket go with these jeans?). Mixing them collapses both jobs, and the supplementary need — the more *commercially* valuable one because it grows basket size — is the one that gets starved.

**Lesson for our redesign:** This is exactly Zalando's "Category monotone" problem (#4 in the eight identified problems). The redesigned PDP widget must enforce a cross-category constraint *by design* — never let all five slots fill with jeans or all with tops. Treat alternatives and supplementaries as separate widgets with separate intent labels.

---

## 2. Pinterest Shop the Look: invisible-rationale dot tagging

**Where:** Pinterest Shop the Look Pins. Sources: [Social Media Today — *How Pinterest's New 'Shop the Look' Pins Work*](https://www.socialmediatoday.com/social-business/how-pinterests-new-shop-look-pins-work-and-potential-brand-opportunities), [Pinterest Engineering — *Automating Shop the Look on Pinterest*](https://medium.com/pinterest-engineering/automating-shop-the-look-on-pinterest-a17aeff0eae2).

**What they do:** Overlay white dots on outfit images. Tapping a dot links to the tagged product (often off-Pinterest at a third-party retailer). The system is hybrid: computer vision identifies objects, sometimes augmented by human-curated tagging.

**Why it fails:** Two specific failures relevant to us. First, the CV-auto-tagged dots are noisy — historical reporting and engineering blog posts acknowledge the matching has been an ongoing accuracy problem, so the dot can land on the right object but link to the wrong SKU. Second, and more important: **the dot tells you *what* item is in the look, but not *why* the outfit works**. The user gets pulled out to a retailer to buy one piece without ever understanding the styling logic — so the inspiration moment doesn't compound into multi-item conversion.

**Lesson for our redesign:** Tagging is necessary but not sufficient. A correct tag answers "what is this?" An outfit experience must also answer "why are these together?" The Look Detail Page (surface #2) is the natural place to add a short rationale per outfit — not a full essay, just the connective tissue ("matching wash", "monochrome", "occasion: wedding"). This is also the strongest signal that the redesign is *not* solving tagging accuracy (a data/ML problem) but is solving the *experience around* tagging.

---

## 3. ASOS Looks: weak provenance — sponsored, organic, and UGC look identical

**Where:** ASOS Looks / Buy the Look surfaces. Sources: [DesignRush — *ASOS eCommerce App Design Analysis*](https://www.designrush.com/best-designs/apps/asos-app-design), [Medium / Hannan Adam — *ASOS UX/UI Case Study*](https://medium.com/@hannanadam80/asos-an-e-commerce-ux-ui-case-study-b7b45412b98e).

**What they do:** ASOS Looks aggregates UGC photos of customers wearing items. The user can browse the outfits and shop them. There's a points incentive for posters when their shared look drives sales — i.e., posters are weakly monetized.

**Why it fails:** Three things blur. (a) Brand-styled marketing photography is interleaved with (b) UGC from incentivized posters and (c) sponsored content from brands paying for placement. Visually they look the same. The user can't tell whether they're seeing an organic "real person wearing this" recommendation or a paid placement. This is the exact "sponsored blends with organic" issue Zalando shares (problem #7 in the eight identified problems, by analog).

**Lesson for our redesign:** Provenance is a trust primitive. The Look Detail Page should make explicit *who* curated the outfit (creator name + tier badge, sponsored / partner / organic label) and the PDP widget should show provenance per recommended outfit slot. Not a heavy disclosure — just a one-line "Styled by X (creator) / Sponsored / Editor's pick" that the user can scan in a glance.

---

## 4. SSENSE: single-attribute filtering as the only personalization surface

**Where:** SSENSE filtering UX. Source: [Pratt IXD — *Design Critique: SSENSE*](https://ixd.prattsi.org/2023/09/design-critique-ssense/).

**What they do:** SSENSE's product-listing pages deliberately keep filters minimal — color is the dominant stylistic filter. The minimal IA is intentional and brand-coherent (editorial-first, magazine-like).

**Why it fails:** When applied to a catalog of tens of thousands of products, single-attribute filtering breaks down. The Pratt critique calls this out specifically — "users can easily become overwhelmed… filter by only one stylistic attribute won't go very far in helping a user with the goal of finding a product with a specific feature." Minimal IA is a luxury affordance that works on a curated catalog and breaks on a marketplace catalog.

**Lesson for our redesign:** Zalando's discovery navigation (surface #3) cannot lift SSENSE-style minimal IA at face value. The "navigate between creators by style cluster" mechanic only works if the underlying clusters carry richer attributes than color — silhouette, occasion, mood, aesthetic family. The H&M Apriori + community-detection work on the dataset (Week 3 of the case study) is where those richer cluster attributes can come from. Don't borrow SSENSE's minimalism; borrow its discipline about keeping the navigation legible.

---

## 5. Lyst: aggregation without outfit construct

**Where:** Lyst's marketplace personalization. Sources: [Glossy — *How the LVMH-backed aggregator Lyst does business*](https://www.glossy.co/fashion/how-the-lvmh-backed-aggregator-lyst-does-business/), [The Current Daily — *Lyst integrated checkout*](https://thecurrentdaily.com/2013/06/04/personalised-fashion-marketplace-lyst-launches-integrated-checkout/).

**What they do:** Lyst aggregates millions of items from thousands of retailers and personalizes the feed using behavioral data (likes, search, purchase intent). The product is item-level personalization at marketplace scale.

**Why it fails (for outfit completion):** Lyst is excellent at "find me items like X" and unprincipled at "complete the outfit around X." There's no outfit construct — no curated bundles, no cross-category enforcement, no styling layer. So it scales personalization without ever scaling coherence. The result is a recommendation feed where the user sees more of what they've already engaged with, never an *outfit*.

**Lesson for our redesign:** Personalization in absence of an outfit construct produces sameness, not styling. Zalando's redesign must keep "outfit" as a first-class object in the product model — saveable, shareable, completeable, with cross-category constraints. The temptation to copy Lyst-style personalization onto every widget should be resisted: that produces the bottom-left quadrant failure mode shown in [`positioning-map.md`](positioning-map.md), not the bottom-right opportunity.
