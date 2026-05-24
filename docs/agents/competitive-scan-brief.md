# Research Agent Brief #1: Competitive Fashion Recommendation Scan

Part of a two-agent research pair. See `review-mining-brief.md` for sibling agent. Both can run in parallel.

## Mission

Conduct a competitive scan of outfit discovery and recommendation patterns across fashion e-commerce, marketplaces, social shopping, and AI styling tools. Output supports a portfolio case study redesigning Zalando's outfit discovery experience.

**Time budget:** 8-10 hours equivalent. Cast wide, scope narrow.

## Context (read first, do not skip)

We are redesigning three connected Zalando surfaces:

1. Product Detail Page — Complete the Look widget
2. Look Detail Page — Get the Look panel with tagged products
3. Discovery navigation between creators

**Identified problems on Zalando:**
- Tagging accuracy (brown jumpers tagged as red, polka dot skirts tagged as solid colors)
- Naming inconsistency between widgets ("Complete the Look" entry → "Get the Look" destination)
- No style coherence in recommendations
- Missing explanation layer (user has to decode style logic)
- No bundle action ("add all to bag")
- Category monotone (only jeans/tops surfaced, no shoes/bags/outerwear)
- Sponsored content blends with organic (trust issue)
- Algorithmic grouping by similar items, not stylistic affinity

**Goal of redesign:** fix the outfit-completion experience.
**Goal of competitive scan:** identify which patterns work, which fail, where Zalando can leapfrog.

**Important constraint:** Zalando already has Virtual fitting room, Zalando Assistant (AI fashion advisor), Trend Spotter, Boards. The redesign is NOT "the first AI in Zalando." Frame findings accordingly.

## Competitors to Scan

### Direct fashion e-commerce (priority — cover all)
- ASOS — Style Match, Buy the Look, Outfit Builder
- H&M — Complete the Look widget, Style Edits
- Mango — Outfit Inspiration, look detail pages
- Net-a-Porter / Mr Porter — editorial Get the Look (luxury benchmark)
- Farfetch — algorithmic recommendations, brand affinity
- SSENSE — minimal but interesting discovery IA
- Uniqlo — StyleHint feature
- ABOUT YOU — Inspiration tab, outfit cards

### Marketplace / aggregator
- Lyst — outfit completion at marketplace level
- ShopStyle — collections-based discovery

### Discovery-first (adjacent but critical)
- Pinterest — visual search, board-based outfit assembly (where people actually outfit-shop)
- Whering app — wardrobe-based outfit suggestions
- Stylebook — closet outfit planner

### Social shopping
- Instagram Shop tags
- TikTok Shop creator content
- Lemon8 — outfit inspiration with tagged products

### AI styling (industry direction)
- Stitch Fix — algorithmic styling
- Save Your Wardrobe — AI outfit assembly

**Geo-blocked workarounds:** if a US-only competitor is inaccessible, document via UX critiques on Medium, Mobbin, Baymard Institute, or Pageflows. Note as "secondary source" in citation.

## 8 Feature Dimensions to Evaluate

For each competitor, evaluate on:

1. **Outfit completion mechanism** — algorithm / creator-curated / editorial / hybrid
2. **Trust signal** — how sponsored content is disclosed vs organic
3. **Tagging accuracy** — are incorrect tags visible / how is tagging done (auto vs human)
4. **Style coherence rationale** — is style logic explained to user
5. **Bundle action** — "add all to bag" present, prominent, friction level
6. **Save-as-outfit affordance** — can user save the outfit (not just individual items)
7. **Cross-category suggestion** — are shoes/bags/outerwear/accessories surfaced
8. **Personalization layer** — does anonymous vs logged-in experience differ meaningfully

## Required Output

### Section 1 — Feature Matrix

Markdown table:
- Rows: competitors (one per row)
- Columns: 8 dimensions
- Cells: 1-3 words evaluation + brief note
- Mark cells with ✅ where competitor solves what Zalando fails
- Mark with ⚠️ where competitor has the same problem as Zalando
- Mark with ❌ where competitor is worse

### Section 2 — Positioning Map

2x2 plot:
- X axis: algorithmic → human-curated
- Y axis: utility (complete what I have) → inspiration (show me new)

Plot all competitors. Identify which quadrant is underserved (potential redesign opportunity).

Output as structured markdown description for now — the designer will visualize.

### Section 3 — Anti-Patterns (3-5)

What competitors do that demonstrably fails or harms UX. Each entry:
- Competitor name + source URL
- What they do (1-2 sentences)
- Why it fails (1-2 sentences)
- Lesson for our redesign (1 sentence)

### Section 4 — Best Practices (3-5)

What competitors do exceptionally well. Each entry:
- Competitor name + source URL
- What they do (1-2 sentences)
- Why it works (1-2 sentences)
- Pattern to consider adopting (1 sentence)

### Section 5 — Three Strategic Findings

Three findings, three sentences max each. The "if I had to brief a design lead in 30 seconds" findings. Focus on where Zalando can leapfrog, NOT where it can catch up.

## Method Notes

- **Use the web aggressively.** Real screenshots beat assumptions.
- **Visit actual product pages,** not marketing landing pages. Pick a consistent category — suggest: women's wide-leg jeans, since that's our Zalando reference.
- **For mobile-first competitors** (TikTok, Lemon8, Whering) note how the experience differs from desktop.
- **Read 2-3 third-party UX critiques** of each competitor where available (Baymard, NN/g, Mobbin, Pageflows, Medium UX articles) — saves time vs direct exploration.
- **If a competitor's outfit feature is buried or unfindable,** that itself is a finding worth noting.
- **For each claim cite a source URL.** Every claim must be defensible if a hiring manager asks "where did you find this?"

## Out of Scope (do not research)

- Marketing campaigns, brand positioning, financials
- Backend/ML architecture (unless publicly documented and directly relevant)
- Mobile app vs web differences beyond surface-level observation
- Sustainability features
- Pricing or promotion strategy
- Checkout / payment / fulfillment

## Deliverable Format

Single markdown document, 2500-4000 words, with the 5 sections above.

- Include source URLs for every claim
- Flag any competitor where access wasn't possible (geo-blocked, login wall, etc.)
- Include screenshot URLs where available (or describe what was seen)
- End with a "Sources consulted" appendix listing all URLs

## Quality Bar

This research feeds a portfolio case study targeting Product Designer roles at EU fashion tech (Zalando, ASOS, Farfetch, Mango Digital, ABOUT YOU, Bol.com, Vinted, MyTheresa).

**Defensibility test:** if a hiring manager challenges any claim, the answer should be a URL, not a vibe.

**Senior signal test:** findings should reveal patterns that aren't obvious from a 5-minute glance at the competitor. Surface non-obvious insights.

## Coordination with Sibling Agent

A parallel review-mining agent works in `/research/personas/` synthesizing 5 composite personas from Trustpilot, Reddit, App Store, and social comments. The two agents do not depend on each other and can run in parallel.

Light coordination touchpoints:

- If you encounter strong **user quotes about competitor features** (e.g., a Reddit thread complaining that ASOS outfit completion misses occasion) during your competitive scan, save URLs to `/research/personas/secondary-sources.md` for the sibling agent. Those quotes triangulate well with persona JTBDs.

- If you find **UX critiques that mention specific user frustrations** (e.g., Baymard study noting "users abandon outfit pages because no add-all-to-bag"), tag them in your findings — they reinforce the persona-side evidence.

- Do not block on the sibling agent. Both deliverables are independent.

## Output Location

All deliverables live in `/research/competitive/`:

- `feature-matrix.md` (Section 1)
- `positioning-map.md` (Section 2)
- `anti-patterns.md` (Section 3)
- `best-practices.md` (Section 4)
- `strategic-findings.md` (Section 5)
- `sources.md` (URL appendix)

Or one consolidated `competitive-scan.md` with all 5 sections, if that reads better. Designer preference: split files for easier reference during design synthesis.

## Stop Conditions

- After 10 hours of equivalent work
- After 15 competitors covered
- After 5 strong anti-patterns + 5 strong best practices identified
- Whichever comes first

Return the markdown document. Do not ask clarifying questions before starting — the brief is self-contained. If something is genuinely ambiguous, make a reasonable assumption and flag it in the document.
