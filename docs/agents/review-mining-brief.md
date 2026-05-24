# Research Agent Brief #2: Composite Persona Synthesis via Review Mining

Part of a two-agent research pair. See `competitive-scan-brief.md` for sibling agent. Both can run in parallel.

## Mission

Synthesize 5 composite personas from publicly available review and discussion sources about Zalando's outfit discovery and shopping experience. Output supports a portfolio case study redesigning Zalando's outfit discovery experience.

**Time budget:** 6-8 hours equivalent. Depth over breadth — better 5 well-grounded personas than 10 shallow ones.

## Context (read first, do not skip)

We are redesigning three connected Zalando surfaces:

1. Product Detail Page — Complete the Look widget
2. Look Detail Page — Get the Look panel with tagged products
3. Discovery navigation between creators

Real user interviews are not feasible at this stage. Composite personas synthesized from publicly available review and discussion data are the working alternative.

**Critical:** these personas are disclosed as composites in the case study, NOT claimed as real interviews. Methodological honesty is a senior signal — hiring managers actively spot fake interviews and reject candidates for it. Composite framing + transparent methodology = methodological maturity.

## Sources to Mine

### Trustpilot
- `be.trustpilot.com/review/zalando.be`
- `de.trustpilot.com/review/zalando.de`
- `nl.trustpilot.com/review/zalando.nl`
- `uk.trustpilot.com/review/zalando.co.uk`

Filter strategy: 1-2 stars for frustrations, 5 stars for what works, 3 stars for nuanced mixed reviews (often the most useful).

### App Store / Google Play
Zalando app reviews across multiple regions (BE, DE, NL, UK, FR, ES). Mobile reviewers tend to be more emotional and specific about UX friction.

### Reddit
- r/femalefashionadvice
- r/malefashionadvice
- r/Zalando (if active)
- r/europe (consumer complaints / praise threads)
- r/Frugal (counter-perspective)
- r/sustainability (ethics-driven shoppers)

Search queries: `Zalando`, `Complete the Look`, `outfit`, `wide leg jeans`, `creator outfit`, `Get the Look`, `Zalando review`, `Zalando haul`, `Zalando vs ASOS`, `Zalando wishlist`.

### Social
- TikTok: search `Zalando haul`, `Zalando outfit`, `Zalando review`, `what I got from Zalando` — read comments, not just posts. Comments often contain richer JTBD signal than the post itself.
- Instagram: comments on @zalando posts and on creator posts that tag Zalando

### Long-form
- YouTube haul / review videos (read transcripts and top comments)
- Medium / Substack fashion writers covering Zalando
- Wirecutter, NYT, fashion press reviews

## Methodology (4 steps, ~7 hours)

### Step 1 — Quote Collection (3 hours)

Build a structured table with these columns:

- `quote` — verbatim text (do not paraphrase)
- `source_url` — direct link
- `platform` — Trustpilot / App Store / Reddit / TikTok / etc.
- `date` — when published
- `jtbd_signal` — what is the user trying to accomplish
- `frustration` — what failed (if applicable)
- `persona_hint` — which composite this might map to

Target: 80-120 raw quotes minimum. Diversity matters — do not pull 40% from one Trustpilot page.

### Step 2 — Pattern Clustering (1 hour)

Group quotes by recurring frustration and recurring JTBD. Identify which patterns are strong (10+ supporting quotes) vs weak (1-2 quotes). Weak patterns get noted but do not drive personas.

### Step 3 — Composite Persona Synthesis (2 hours)

Construct 5 composite personas. Each persona grounded in minimum 8 quotes with citations.

Personas to develop (sketch):

1. **The Outfit Seeker** — comes with specific need ("look for wedding next month", "interview outfit")
2. **The Single-Item Shopper** — came for specific item (jeans, shoes), open to style ideas if frictionless
3. **The Inspiration Browser** — no specific intent, looking for vibe / what's new
4. **The Creator-Follower** — came via Instagram / TikTok / creator post, wants the specific outfit shown
5. **The Bargain Hunter** — filters by sale, complete-the-look irrelevant or actively annoying (counter-persona)

If the data surfaces a stronger persona than one of these, adapt — but always include a counter-persona.

### Step 4 — Methodology Disclosure (1 hour)

Write `methodology-disclosure.md` describing:

- How sources were chosen
- How quotes were collected (search queries, date ranges, region filters)
- How patterns were identified
- How composites were constructed
- Limitations of this approach (selection bias, recency bias, vocal minority bias)
- Why this is acceptable as case study research input given constraints

## Required Output

All deliverables live in `/research/personas/`:

### Output 1: `raw-quotes.csv`
Structured table with all 80-120 collected quotes. CSV or markdown table — designer preference: CSV for sortability.

### Output 2: Five persona files
- `persona-1-outfit-seeker.md`
- `persona-2-single-item-shopper.md`
- `persona-3-inspiration-browser.md`
- `persona-4-creator-follower.md`
- `persona-5-bargain-hunter.md`

Each file contains:

- Name (composite, indicate composite)
- Demographic sketch (composite, indicate composite)
- Context — when do they shop on Zalando, what triggers a visit
- JTBD statement (when… I want to… so that…)
- Top 3 frustrations, each with N supporting quotes + citations
- Top 3 needs, each with N supporting quotes + citations
- Behavior patterns
- What Zalando does well for them
- What fails them
- One verbatim quote that captures their voice (with citation)

### Output 3: `summary.md`
- All 5 personas in 1-paragraph form
- JTBD map (each persona's primary JTBD in proper format)
- Strongest patterns surfaced across all personas
- Weakest signals (excluded but noted for transparency)
- Counter-persona reasoning (why The Bargain Hunter or equivalent is included)

### Output 4: `methodology-disclosure.md`
Honest methodology document as described in Step 4.

### Output 5: `secondary-sources.md`
URLs to save for the competitive-scan sibling agent (see Coordination section below).

## Anti-Patterns

1. **Do not fabricate quotes.** Every quote must exist in a cited source. If a needed quote does not exist, the pattern is weaker than expected — adjust the persona, do not invent.

2. **Do not claim personas as interview-based.** Always frame as composite synthesized from review mining. The case study will disclose this; the persona files should also disclose it in their headers.

3. **Do not skip the counter-persona.** Including a user who does not need the feature being redesigned (Bargain Hunter or equivalent) shows methodological maturity.

4. **Do not over-weight one source.** If 40% of quotes come from one Trustpilot page, the personas reflect that page's selection bias. Aim for source diversity across platforms and regions.

5. **Do not generalize to "all Zalando users."** Frame as 5 archetypes observed in review discourse, not as exhaustive coverage of the customer base.

6. **Do not pad personas with demographic clichés.** "30-year-old marketing manager who loves yoga" is cardboard. Demographic details should be sparse and only included if grounded in source patterns (e.g., reviews from app store skew toward mobile-first users — that is a real demographic signal).

## Coordination with Sibling Agent

A parallel competitive-scan agent works in `/research/competitive/` evaluating 15+ competitor outfit discovery patterns. The two agents do not depend on each other and can run in parallel.

Light coordination touchpoints:

- If during your review mining you encounter **detailed UX critiques of Zalando competitors** (e.g., a long Medium post comparing ASOS and Zalando outfit features), save those URLs to `/research/competitive/secondary-sources.md` for the sibling agent.

- If you encounter **Zalando feature deep-dives in reviews** (e.g., "the Get the Look hub is impossible to find from the homepage"), tag those quotes carefully — they reinforce the redesign rationale beyond persona work.

- Do not block on the sibling agent. Both deliverables are independent.

## Quality Bar

- Every persona claim has a citation
- Counter-persona included
- Methodology disclosure is explicit and honest
- Personas feel grounded, not cardboard
- 80+ quotes minimum with source diversity (no single source above 25% of quotes)
- Quotes are verbatim, never paraphrased silently

**Defensibility test:** if a hiring manager asks "where did this persona's frustration come from?", the answer should be 8 URLs, not a vibe.

## Out of Scope (do not research)

- Demographic statistics from third-party panels (Statista, Nielsen, etc.) — interesting but not what this brief needs
- Zalando's own published customer research (not publicly available, do not speculate)
- Sentiment analysis or NPS aggregates — this is qualitative work, not quantitative
- Competitor reviews of competitor products — that's the sibling agent's job

## Stop Conditions

- 8 hours of equivalent work
- 5 personas with ≥8 grounding quotes each completed
- Methodology disclosure written
- Whichever comes first

Return the markdown documents and CSV. Do not ask clarifying questions before starting — the brief is self-contained. If something is genuinely ambiguous, make a reasonable assumption and flag it in `methodology-disclosure.md`.
