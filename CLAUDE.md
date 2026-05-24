# Zalando Project

*Outfit Discovery Redesign — portfolio case study*

## Project Context

Portfolio anchor case study for Product Designer job hunt (EU focus). Built in parallel with Roots AI Powered Product Manager course (6 weeks). Solo work, 15-25 hours/week.

**Designer:** Elena, UX/UI + branding designer, Antwerp.

**Goal:** strongest portfolio case study to land a Product Designer role in EU. Will live on personal site + published as article (Medium / UX Collective / Smashing).

**Target companies for job hunt:** Zalando, ASOS, Farfetch, Mango Digital, ABOUT YOU, Bol.com, Vinted, MyTheresa.

## What We Are Redesigning

Three connected Zalando surfaces:

1. **Product Detail Page** — Complete the Look widget (currently broken: 5 disjointed recommendation widgets, no coherence)
2. **Look Detail Page** — Get the Look panel (currently: inaccurate tagging, no outfit explanation, no bundle action)
3. **Discovery navigation** — style cluster navigation between creators

## What We Are NOT Redesigning (mention as future work)

- Get the Look hub browse experience (consumer-facing)
- Mobile-only deep work (covered at surface level only)
- Trend Spotter / Boards / Zalando Assistant integration
- Tagging accuracy itself (data/ML/ops problem, not a design problem — scoped out and surfaced as future work + design signal)

## 8 Core Problems Identified

1. Tagging accuracy — brown jumper tagged as red, polka dot skirt tagged as solid brown. Systemic across creators.
2. "Complete the Look" misnamed — shows full creator photos, not actual outfit completion.
3. "Better together" widget broken — no co-view affinity, random tops without style coherence.
4. Category monotone — all 5 widgets show jeans or tops, no shoes/bags/outerwear surfaced.
5. Zero style coherence — light-blue wide-leg denim paired with radically different vibes.
6. Algorithmic laziness — creators grouped by similar jeans, not stylistic affinity between looks.
7. Naming inconsistency — "Complete the Look" entry → "Get the Look" destination.
8. Missing AI explanation layer — outfit logic not surfaced to user.

**Hero problem for case study opening:** #3 "Better together" broken — real, named widget, demonstrably fails its promise, understandable in 3 seconds from a screenshot.

## Case Study Structure (6 sections + limitations)

1. Problem discovery — annotated screenshots, user journey
2. Research — composite personas (review-mined), competitive scan, JTBD synthesis
3. Data analysis — H&M dataset, Apriori, community detection, hero graph viz
4. Insights & design principles
5. Redesign — IA → lo-fi → mid-fi → hi-fi, mobile + desktop, edge cases
6. Success metrics + measurement plan (north-star, drivers, counter-metrics, A/B plan)
7. Honest limitations (½ page — senior thinking signal)

## Methodology Notes

### Composite Interviews
5 composite personas synthesized from 4 source pools:
- Trustpilot Zalando reviews (filter 1-2 stars + 5 stars)
- App Store / Google Play Zalando reviews
- Reddit r/femalefashionadvice, r/malefashionadvice (search "Zalando", "complete the look")
- TikTok / Instagram comments under Zalando creator posts

**Critical:** disclosed as composite in case study itself, NOT claimed as real interviews. Methodology described in appendix. Senior reviewers respect honest composite framing; they spot fake interviews.

Sketch of 5 personas:
- The Outfit Seeker — "look for wedding next month"
- The Single-Item Shopper — came for specific jeans, open to style ideas if easy
- The Inspiration Browser — no intent, looking for vibe
- The Creator-Follower — came via Instagram, wants specific outfit
- The Bargain Hunter — filters by sale, complete-the-look irrelevant (counter-persona)

### Data Analysis
H&M Personalized Fashion Recommendations dataset (Kaggle, 31M transactions, 1.3M customers) used as **proxy** because Zalando data not publicly available.

**Honest limitation to disclose:** co-purchase basket logic (Apriori) ≠ stylistic outfit completion. H&M as proxy is acknowledged in limitations section.

### Order of Work (critical)
Discovery → Research → Data analysis → Insights → Design → Validate.

Design starts in week 4-5, NOT before. The trap to avoid: subconscious desire to start with Figma. If work gets hard and impulse is to "run back to Figma to make pretty things" — DON'T.

## Sub-Agents

Research work in Week 2 is split into two parallel agents to maximize throughput. Both run independently — no dependency between them.

### Agent #1 — Competitive Scan
- **Brief:** `docs/agents/competitive-scan-brief.md`
- **Output:** `/research/competitive/`
- **Time budget:** 8-10 hours
- **Mission:** Evaluate 15+ competitors (ASOS, H&M, Mango, Net-a-Porter, Farfetch, SSENSE, Pinterest, Lyst, Stitch Fix, etc.) across 8 feature dimensions. Produce feature matrix, positioning map, anti-patterns, best practices, and 3 strategic findings.

### Agent #2 — Review Mining (Composite Personas)
- **Brief:** `docs/agents/review-mining-brief.md`
- **Output:** `/research/personas/`
- **Time budget:** 6-8 hours
- **Mission:** Synthesize 5 composite personas from Trustpilot, App Store, Reddit, social comments. 80+ verbatim quotes with citations. Counter-persona (Bargain Hunter) included.

### Coordination
- Agents run in parallel. No blocking dependency.
- Light coordination via `secondary-sources.md` in each output folder — each agent flags URLs useful to the sibling.
- Final JTBD synthesis (`/research/jtbd/`) happens manually after both agents complete. JTBD lens then informs design phase.

### Integrity Rules (non-negotiable)
- Composite personas MUST be disclosed as composites in the case study, not claimed as real interviews.
- Quote fabrication is grounds for excluding the work — every quote needs a real source URL.
- Counter-persona must remain in final personas, not get trimmed during synthesis.

## Tech Stack

- **Frontend:** Next.js + Tailwind on Vercel (case study page + interactive prototype)
- **Backend / data API:** Python (FastAPI) on Render
- **Database:** Postgres
- **Vector DB:** Pinecone (if needed for RAG over fashion theory)
- **Visualization:** D3.js / Cytoscape.js for force-directed graph (style cluster network)
- **Dev environment:** Claude Code + VS Code

## Roots Course Mapping (6 modules, 6 weeks)

- **M1** (MVP + deploy): Vercel landing page skeleton for case study
- **M2** (Claude Code setup): repo scaffold, skills wired, this CLAUDE.md
- **M3** (Research agents): two parallel sub-agents — competitive scan + review mining (composite personas). See "Sub-Agents" section above for briefs and coordination.
- **M4** (RAG + SQL): RAG over fashion theory, SQL agent on H&M data for interactive exploration
- **M5** (Product): interactive prototype of redesigned product page (React app — shippable, not mockup)
- **M6** (TG bot): portfolio bot answering recruiter questions about the case

## Skills to Consult

When working on this project, read relevant SKILL.md files before producing output:

- `figma-expert` — design system, Auto Layout, dev handoff
- `brand-identity` — personal brand carrier for case study
- `colour-pro` — palette decisions on case study page
- `frontend-design` — landing page polish
- `python-analytics` — H&M dataset analysis
- `layout-composition` — case study reading experience
- `typography` — editorial type system
- `hero-sections-library` — case study landing page hero

## File Conventions

Actual repo layout (folders at repo root, not under a `/case-study/` wrapper):

```
/docs/
  /agents/              # sub-agent briefs (competitive-scan, review-mining)
/research/
  /competitive/         # competitive scan output (Agent #1)
  /personas/            # composite personas + verbatim quotes (Agent #2)
  /jtbd/                # JTBD synthesis (manual, after both agents)
/data/                  # H&M analysis notebooks, output figures
/design/                # Figma exports, hi-fi screens, design system
/writing/               # Medium-ready article version, case study sections
/backend/               # API skeleton (currently Express + Sequelize starter; will migrate to FastAPI per Tech Stack)
/frontend/              # Site/prototype skeleton (currently Vite + React starter; will migrate to Next.js per Tech Stack)
CLAUDE.md               # this file
render.yaml             # Render Blueprint for free-tier deploy
```

Note: `backend/` and `frontend/` were scaffolded from a generic Express+Vite template. Tech Stack section above is the target stack — migrate when M1/M5 work begins, not before.

## Anti-Patterns (don't do this)

1. **Do not open Figma before research is done.** The trap is real and identified.
2. **Do not claim composite interviews as real interviews anywhere.** Methodology disclosure is non-negotiable.
3. **Do not build the force-directed graph without tying it to a specific design decision.** Beautiful viz that doesn't drive design = "designer wanted to show off." Tie graph to one concrete design choice in case study text.
4. **Do not present H&M insights without proxy disclosure.** Co-purchase ≠ outfit coherence.
5. **Do not redesign all 5 widgets.** Scope is product page widget + look detail page + discovery navigation. Three surfaces, not five.
6. **Do not write generic UX critique.** Specific named widgets, specific screenshots, specific quotes from review-mined personas.

## Success Criteria

Case study reads as senior thinking. Hiring managers should see:

- Data-informed design (not data-decorated design)
- Honest scope and explicit limitations
- Connected surfaces narrative, not single screen
- Methodological maturity (composite framing, proxy disclosure)
- Measurement plan with counter-metrics included
- Awareness that Zalando already has AI features (Assistant, Boards, Trend Spotter) — this redesign is not "the first AI in Zalando"

## Current Phase Tracker

Update this section as work progresses:

- [x] Week 1: Discovery — product page screenshots, 8 problems identified
- [ ] Week 1: Discovery — 4 additional product categories screenshotted (dress, sneakers, coat, accessory)
- [ ] Week 1: Discovery — mobile flow captured
- [ ] Week 1: Discovery — voice memos on each of 8 problems
- [ ] Week 1: Discovery — Figma audit file (screenshots + red annotations only)
- [x] Week 2: Research — composite personas from review mining *(5 personas in `research/personas/`, **99-quote corpus across 8 languages and 10+ markets — brief 80+ target comfortably met, no source >25%**; sourced from reviews.nl / PissedConsumer / reviews.io / fr.custplace.com / shopauskunft.de / trustedshops.de / Zalando Design Medium / App Store DE / smartcustomer; Trustpilot/Reddit/App-Store-deep remained inaccessible, substitution documented in `methodology-disclosure.md`; Creator-Follower JTBD remains the single hypothesis-stage gap; cron job `a2b7844f` continues collection)*
- [x] Week 2: Research — competitive scan *(14 competitors + Zalando across 8 dimensions; 6 files in `research/competitive/`; 3 strategic findings)*
- [x] Week 2: JTBD synthesis *(`research/jtbd/jtbd-synthesis.md` — 5 JTBDs incl. counter-JTBD, mapped to surfaces and personas)*
- [x] Week 3: Data — H&M dataset EDA, sparse co-occurrence, Louvain community detection *(**all 4 notebooks executed locally** on the H&M Kaggle dataset. 30-day window 2020-08-23 → 2020-09-22: 1.16M transactions, 250K customers, 29K articles. **8,603 co-occurrence edges across 2,764 nodes, 65 Louvain communities (44 large, 63.6% spanning 2+ garment groups, 21 spanning 3+).** Apriori swapped for sparse `X.T @ X` matrix multiplication after Apriori OOM'd at the support thresholds needed for long-tail cross-category pairs; methodologically equivalent for our purpose, documented in [`data/methodology.md`](data/methodology.md).)*
- [x] Week 3: Data — force-directed graph viz tied to design decision *(viz exported to [`design/graph/style-clusters.json`](design/graph/style-clusters.json) — 150 nodes / 495 links / 8 top communities. Anchor SKUs (light-blue wide-leg denim) cluster into **Community #17 "Blue · Trousers Denim"** spanning 4 garment groups (34 Denim + 33 Trousers + 2 Blouses + 1 Dressed) — the concrete cross-category style cluster the redesign's surface #3 navigation is built around. Preview PNG at [`design/graph/style-clusters-preview.png`](design/graph/style-clusters-preview.png).)*
- [x] Week 4: Insights & design principles *(6 principles in `design/design-principles.md` — interlock table by surface)*
- [ ] Week 4-5: Design — IA, lo-fi, mid-fi, hi-fi
- [x] Week 5: Measurement plan *(`design/measurement-plan.md` — north-star OAT, 5 drivers, 3 counter-metrics, 3-phase A/B with pre-registered hypotheses)*
- [~] Week 6: Writing, Medium article, portfolio site *(canonical 7-section case-study draft in [`writing/case-study.md`](writing/case-study.md) — all sections complete except Figma image embeds in Section 5 (lo-fi/mid-fi/hi-fi mockups marked `[TODO add when Figma file ships]`). Ready to be sliced into Medium-formatted version and personal-site page once visual design lands.)*
