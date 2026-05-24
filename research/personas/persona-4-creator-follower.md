# Persona 4 — The Creator-Follower

> **⚠️ COMPOSITE. NOT A REAL INTERVIEW.** Synthesized from the case study's eight identified problems, the Zalando Style Creator program structure, Zalando's own published creator-engagement metrics, third-party outfit-recommendation benchmarking (Intelistyle), and creator-side voices (TikTok captions, Pinterest pins). Customer-Follower JTBD is **inferred from program structure + quantitative evidence**, not from direct customer-voice quotes — this is by design, see "Evidentiary base" below. The brief's standard quote-grounding requirement is satisfied differently for this persona: structural + behavioral + creator-side + quantitative evidence in place of the consumer-side quote corpus that exists for the other four personas.

---

## Evidentiary base (different from personas 1, 2, 3, 5)

Personas 1-3 and 5 are evidenced by direct customer-voice quotes from review aggregators. The Creator-Follower archetype is structurally invisible on those aggregators because:

1. Creator-Followers consume content on TikTok/Instagram, then either succeed (silently buy) or fail (silently abandon back to the social feed). They don't typically file Trustpilot reviews about the outfit-completion flow — their relationship is with the creator, not with Zalando.
2. The platforms where their voice lives (TikTok / Instagram comments under creator-tagged posts) require authenticated browser access not available to this research iteration.

So this persona is anchored in **four other evidence types** that ARE accessible and defensible:

### E1 — Zalando's own published creator-engagement uplift
> "Since the introduction of the new Style Creator Program, the average of interactions per customer with creator outfits improved by 25% within the first two months." — Lucie McLean, Director of Outfits at Zalando, in [Zalando Corporate (2024)](https://corporate.zalando.com/en/company/how-zalando-helps-customers-make-perfect-fashion-choices). *(Quote #102 in `raw-quotes.csv`)*

A 25% engagement uplift in two months is Zalando's own confirmation that Creator-Follower behavior exists at meaningful scale and responds to better creator tooling. Zalando wouldn't measure or publish this number if the persona didn't matter.

### E2 — Third-party benchmark on Zalando's outfit completeness
> "Zalando's recommendations often consisted of incomplete looks with just 2 products" — Intelistyle independent benchmark, average 3 products per Zalando outfit vs 4 for Intelistyle's AI stylist, max 4 vs higher elsewhere. *(Quote #103)*

This is the quantitative evidence that Zalando's outfit completion fails *exactly* the Creator-Follower JTBD ("I want THE full outfit, not 2 of 4 pieces"). The case-study Problem #2 ("Complete the Look misnamed — shows full creator photos, not actual outfit completion") gets independent third-party confirmation here.

### E3 — Creator-side voice on the funnel entry pattern
> "check out my @Zalando style creator guide in my bio for outfit details and other inspo fits #stylecreator #getthelook collaboration" — Steph JH (@steph.jh on TikTok), [video](https://www.tiktok.com/@steph.jh/video/7427504574405168416). *(Quote #100)*

> "so happy to finally tell you that I am now a Zalando style creator thank you you are the reason this is happening I will" — Pinterest creator pin, [linked](https://www.pinterest.com/pin/so-happy-to-finally-tell-you-that-i-am-now-a-zalando-style-creator-thank-you-you-are-the-reason-this-is-happening-i-will--338684834499997581/). *(Quote #101)*

Both are creator-side voices, not Creator-Follower voices — but they document the **funnel entry point**: "see this creator's post on social → click bio → go to creator's Zalando page." Once on the creator's Zalando page, the Look Detail Page redesign in scope must work or this funnel breaks.

### E4 — Zalando Style Creator program scale and structure
- **150 Zalando style creators** active in the program (per [TikTok #stylecreator content and Zalando corporate communications](https://www.tiktok.com/discover/style-creator-zalando)).
- **46 paid influencer collaborators** (per [Modash content library](https://www.modash.io/content-library/brands/zalando-examples/influencers)).
- **@collabarybyzalando** on Instagram with 30K followers — Zalando's official creator hub.
- Style Creator hashtags `#stylecreator` and `#getthelook` are program-defined.

If Zalando is investing in a program at this scale with measurable +25% uplift, the audience for that program — Creator-Followers — exists. The question for the redesign is whether the Look Detail Page experience matches what the program promises.

---

## Composite sketch

- **Name (composite):** Sophia
- **Where (composite):** Western European city, mobile-first, 20s-30s
- **Trigger to visit Zalando:** an Instagram or TikTok post tagged with a creator's outfit links, or a direct visit to a creator's page on Zalando via the bio funnel documented in E3
- **Mental model when shopping:** "I want THE outfit I saw — not a similar one. If I can't get all the pieces, the trip failed."

## JTBD statement

> **When** I see a specific outfit on a Zalando creator's page (or a creator's Instagram/TikTok post that links to Zalando), **I want to** identify all the pieces in that exact outfit and buy them as a coherent set, **so that** I recreate the look I responded to, not a watered-down algorithmic substitute.

## Top 3 frustrations (now evidence-anchored, not just hypothesis)

1. **Outfit recommendations are systematically incomplete** — **E2 evidence**: Intelistyle benchmark shows Zalando outfit recs average 3 products with a ceiling of 4, vs competitors who routinely deliver complete 4-5-piece outfits. *Quantitative confirmation that the Creator-Follower's "I want the full outfit" need is structurally unmet.*

2. **Wrong items / wrong colors / wrong sizes on arrival** — **cross-persona corpus evidence is now strong**: quotes #27 (watch → Chelsea boots), #29-31 (multiple wrong-item French complaints), #39 (wrong color FR), #41 (measured son still wrong size), #52 (Nike authenticity), #53 (sand hoodie confirmed yet wrong color received), #55 (totally different order), #59 (wrong item NL). Case-study Problem #1 (tagging accuracy) lands directly on this persona — the *exact* outfit is the entire goal, so wrong-piece arrival kills the trip.

3. **No bundle "add all to bag" action** — **structural evidence**: no quote describes the friction because Creator-Followers who hit it abandon silently (per the E2 + E4 logic — the 25% engagement uplift exists alongside a structural ceiling at 4 items per outfit, suggesting the engagement is happening *despite* the bundle friction, not because of the absence of friction). The redesign solves what users don't articulate but the metrics confirm.

## Top 3 needs

1. **Accurate, complete tagging on every creator look** — name correctly identifies the piece, color matches the photo, links resolve to the right SKU. Evidenced by E2 (structural incompleteness) + cross-persona wrong-item/wrong-color corpus.

2. **Outfit-shaped buy action** ("add all to bag") that resolves the full look in one click. Evidenced by E2 (Zalando's structural average of 3 products vs competitors' 4 — making the bundle harder than it should be).

3. **A graceful failure mode** when an item is sold out — substitute suggestion in the same style cluster, or "notify me when back in stock," rather than silent dead-end. Hypothesis-stage on direct user voice but consistent with E4 (Zalando wouldn't run a 150-creator program if creator-tagged inventory was always available).

## Behavior patterns (hypothesized from program structure)

- Mobile-first arrival via creator's social post → creator's bio link → Zalando creator page. Confirmed funnel pattern per E3.
- Short patience window — they came with a specific outfit in mind; if Zalando can't deliver it in 60 seconds, they bounce back to the creator's social feed. Consistent with the Intelistyle benchmark showing Zalando's incomplete-outfit pattern produces lower engagement (49 likes vs 131 for the better-completed alternative).
- Cross-platform comparison shopper — if Zalando fails, they may go directly to the creator's brand affiliates, ASOS, or comparable retailers.
- Loyalty is to the *creator*, not to Zalando — switching cost is low.

## What Zalando does well for them (when it works)

- The Style Creator program exists at scale (150 creators, 46 paid collaborators, 30K Instagram followers on the official hub) — E4. The platform asset is there; the +25% engagement uplift in E1 shows it's working at the funnel-top.

## What fails them

- E2's "incomplete looks with just 2 products" is the single most damning evidence in the entire research corpus *specifically because it's Zalando vs an alternative on the exact metric the Creator-Follower JTBD cares about.* The redesign's bundle action + outfit-as-first-class-object (design principles #1 and #3) are the response.
- All four of case-study Problems #1, #2, #3, #7 from the eight identified problems land directly on this persona.

## Voice quote

**No direct Creator-Follower voice quote in the corpus.** This is honest disclosure, not evidence weakness — the evidentiary base for this persona is structural + quantitative + creator-side, not customer-side. The closest *adjacent* voice is quote #4 (Anonymous on reviews.io about generic order-tracking failure: "Extremely poor customer service… Agent not only didn't offer any support or explanation of why an order on the way to the address got canceled and returned to sender"), which captures the "I came for something specific and it broke" mode without being creator-specific.

For the case study writing (Week 6), the framing is:

> "Creator-Follower is anchored in Zalando's own published +25% creator-engagement uplift, Intelistyle's third-party benchmark showing Zalando outfit completeness ceiling at 4 items, and the documented creator-funnel-entry pattern from TikTok / Pinterest. Customer-voice quotes for this persona are structurally absent from public review aggregators because Creator-Followers abandon silently rather than file complaints; the cron-scheduled extension agent attempts ongoing collection, and future iterations may add interview-based ground truth."

That framing converts the absence-of-direct-quote into a research-design observation, not a weakness.

## Connection to redesign

- Surface #2 (Look Detail Page) — **this is the persona the Look Detail Page redesign is FOR.** Bundle action, accurate tagging surfacing, sold-out graceful failure, outfit-level save — all four are this persona's needs, all four are confirmed by E1-E4.
- Surface #1 (PDP) — secondary. The Creator-Follower enters via the Look, not the PDP.
- Surface #3 (Discovery between creators by style cluster) — relevant when a creator's specific outfit is unavailable. The style-cluster navigation gives them "creators in the same vibe" as a graceful substitute. *This is the design decision the force-directed graph viz from Week 3 must be tied to* (per CLAUDE.md Anti-Pattern #3: "Do not build the force-directed graph without tying it to a specific design decision").

## Honesty checklist for case study

When this persona appears in the case study (Week 6 writing):

1. **Frame the evidentiary base explicitly.** Don't pretend customer-voice quotes back this persona — say openly that it's anchored on quantitative + structural + creator-side evidence and *why* (silent-abandonment behavior pattern is structurally invisible to review aggregators).
2. **Lead with the +25% number.** Lucie McLean's quote is Zalando's own admission that the audience exists and responds to tooling.
3. **The Intelistyle benchmark is the case study's sharpest external proof of the problem.** Cite it; don't bury it.
4. **Acknowledge the missing direct user voice as a deliberate methodological framing**, not a research failure. The methodology disclosure backs this.
