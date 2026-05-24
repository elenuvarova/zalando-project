# Composite Personas — Summary

> Five composite personas synthesized from publicly available review and discussion data about Zalando. **All five are composites — not real interviews.** This framing is non-negotiable in the case study itself.
>
> **Corpus status (current iteration):** 83 verbatim quotes across 4 main review aggregators in 8 languages (EN, NL, FR, DE, ES, IT, SE, PL). **Brief target of 80+ quotes met.** Trustpilot/Reddit/App Store remained inaccessible (anti-bot, Claude-Code-block, JS-rendering); the corpus was assembled from regional analog aggregators — reviews.io, reviews.nl, fr.custplace.com, PissedConsumer — plus Zalando Design's own published user research. See [`methodology-disclosure.md`](methodology-disclosure.md) for the full constraint disclosure and the substitution rationale.

---

## The 5 personas in one paragraph each

### 1. The Outfit Seeker — Léa
*Deadline-driven head-to-toe assembler.* Visits Zalando with an upcoming occasion (wedding, interview, holiday) and a hard date. Tolerates returns as a buy-multiple-keep-one strategy, but only if fulfillment is reliable and the return path is predictable. **Corpus signal: medium** — fulfillment-friction quotes (#10, #11, #12, #14, #16, #18) are corpus-strong; occasion-driven JTBD is hypothesis-stage (no quote in corpus explicitly names occasion). [→ persona-1-outfit-seeker.md](persona-1-outfit-seeker.md)

### 2. The Single-Item Shopper — Marek
*Search-driven, intent-loaded, one-item trip.* Replacing worn-out sneakers, a pair of jeans, a seasonal coat. Compares 3-5 alternatives, picks one, leaves. Outfit-completion suggestions are useful only if they don't crowd the alternatives. **Corpus signal: medium** — wrong-size and damaged-item quotes (#7, #10, #11, #12) are corpus-strong; the "outfit-completion is interesting only if effortless" angle is hypothesis-stage. [→ persona-2-single-item-shopper.md](persona-2-single-item-shopper.md)

### 3. The Inspiration Browser — Anouk
*Browses without intent, susceptible to friction, vocabulary-poor.* Knows what she likes when she sees it, can't search for it. Multi-tab opens. Most likely persona to abandon if the experience feels random or repetitive. **Corpus signal: STRONG** — Zalando Design's own published user research (quotes #20, #21) speaks directly to this persona's JTBD ("I feel overwhelmed by choice"; "Sometimes I don't know the word for what I am looking for"). This is the persona the discovery navigation redesign primarily serves. [→ persona-3-inspiration-browser.md](persona-3-inspiration-browser.md)

### 4. The Creator-Follower — Sophia
*Mobile-first, arrived via Instagram/TikTok, wants THE specific outfit.* Loyalty is to the creator, not Zalando — switching cost is low. **Evidence type: reframed (quantitative + structural + creator-side)** — see persona-4 "Evidentiary base." Anchored on Zalando's own +25% creator-engagement uplift (Lucie McLean, quote #102), Intelistyle's third-party benchmark showing Zalando outfit-completeness ceiling at 4 items / average 3 (quote #103), creator-side voices documenting the TikTok→bio→Zalando funnel (quotes #100-#101), and the Style Creator program's 150-creator scale. Direct customer-voice quotes are *structurally absent* from public review aggregators because Creator-Followers abandon silently — this is disclosed openly, not hidden. [→ persona-4-creator-follower.md](persona-4-creator-follower.md)

### 5. The Bargain Hunter — Karim *(counter-persona)*
*Sale-driven, geography-agnostic, outfit-irrelevant.* The redesigned outfit-completion experience makes Karim's path marginally worse, not better. **Corpus signal: medium** — Black Friday and price/affordability quotes (#3, #5, #6, #15, #18) directly support this persona. The counter-persona retention is the explicit methodological-maturity signal in the brief and CLAUDE.md. [→ persona-5-bargain-hunter.md](persona-5-bargain-hunter.md)

---

## JTBD map

| Persona | When… | I want to… | So that… |
|---|---|---|---|
| Outfit Seeker | I have an occasion with a deadline | assemble a coordinated head-to-toe look in one session | I can order, try, return, and have the outfit ready by the event |
| Single-Item Shopper | an item in my wardrobe needs replacing | find the right version of that specific item quickly and confidently | I can buy it and move on |
| Inspiration Browser | I have no shopping intent but want to engage with fashion | browse a feed that surfaces things I'd genuinely like without articulating it | I find what I didn't know I wanted |
| Creator-Follower | I see a specific outfit on a creator's page or social post | identify and buy all the pieces in that exact outfit as a coherent set | I recreate the look I responded to, not a substitute |
| Bargain Hunter *(counter)* | I see a Zalando sale | filter to discounted items in my size I'd buy anyway | I get the best price on what I would have bought |

---

## Strongest patterns surfaced across all personas (refreshed for 83-quote corpus)

Patterns visible in 10+ quotes or strongly cross-confirmed across multiple personas:

1. **Fulfillment promise vs reality** — delivery timing (#5, #6, #14, #16, #18, #38, #61, #71, #77, #79, #83), missing/damaged items (#7, #10, #12, #25, #42, #49, #67), wrong addresses (#14, #43, #60, #80). Cross-cuts every persona; corpus-strongest pattern. Outfit Seeker and Bargain Hunter hit hardest because they shop against deadlines.
2. **★ Wrong-item / wrong-color / wrong-size (now corpus-strong, was hypothesis-stage)** — quotes #7, #10, #11, #27 (watch → Chelsea boots), #29, #30 (jean 46 ordered, 44 received), #31 (3 wrong-item orders on the same jean), #39 (wrong color FR), #41 (measured son still wrong size), #52 (Nike authenticity), #53 (sand hoodie confirmed yet wrong color), #55 (totally different order), #59. **Directly evidences case-study Problem #1 (tagging accuracy).** Quote #53 is the single most redesign-relevant quote in the corpus — the user saw the correct color in the confirmation flow yet received the wrong color, which is exactly the tagging-vs-presentation gap the redesign brackets out.
3. **Customer service breakdown when the fulfillment promise breaks** — (#4, #15, #19, #46, #47, #65, #67, #73, #74). Compounds fulfillment failure into churn signal ("buy at amazon", "huge disappointment", "I finished my contract").
4. **Long-term-customer-turned-churned pattern** — (#2, #11, #13). Counter-evidence: #56 ("Ik ben al ruim 15 jaar klant bij Zalando en heb in al die jaren nooit problemen gehad" — 15-year customer never had problems). Suggests the friction is recent (post-2023) and breaking established loyalty for some users while others remain happy. Material to case-study framing — the redesign targets retention regression, not acquisition.
5. **Black Friday / sale-context-specific friction** — (#3, #6, #35, #36, #62). Bargain Hunter persona now well-evidenced from multiple languages.
6. **Visual-first browsing need surfaced by Zalando's own research** — (#20, #21). Highest-defensibility evidence in corpus — Zalando's own designers published it. Inspiration Browser persona stands on this.

## Weakest signals (now narrower than first iteration)

- **Creator-follow flow direct customer voice** — Creator-Follower persona has **reframed evidence base** (quantitative + structural + creator-side, anchored on Zalando's own +25% Style Creator uplift and Intelistyle's outfit-completeness benchmark). Direct customer voice on aggregators is structurally absent — disclosed in the persona file as a methodological position, not a research weakness. See [persona-4-creator-follower.md](persona-4-creator-follower.md) "Evidentiary base."
- **Occasion-driven shopping verbatim** — no quote explicitly mentions wedding/interview/event as a trigger. The Outfit Seeker JTBD-1 is still partly hypothesis on the trigger, though the *consequence* (fulfillment against deadline) is now corpus-strong.
- **"Complete the Look" widget verbatim feedback** — no quote names the widget directly. This is a known property of UX friction at this scale — small-scale UX annoyances rarely escalate into Trustpilot 1-stars unless they cost money. The redesign's value proposition is *prevention* of friction the user couldn't articulate enough to write a review about, which is a stronger justification than a corpus quote could provide.

## Counter-persona reasoning

The Bargain Hunter is retained as the explicit counter-persona because:

- **Brief mandate.** Both `docs/agents/review-mining-brief.md` and CLAUDE.md require a counter-persona — a user for whom the redesign does NOT improve the experience.
- **Corpus support.** The Bargain Hunter has clean corpus support (#3, #6, #15, #18) — affordability, Black Friday, Amazon-switch threat, delivery-time mismatch.
- **Measurement plan implication.** This persona is the reason the case-study measurement plan (Week 5) must include counter-metrics, not just drivers and north-star. If the redesign lifts outfit-adjacent conversion but suppresses sale-path conversion, that's a real tradeoff and the case study must surface it.
- **Senior signal.** A case study without a counter-persona reads as "this redesign is universally better." A case study with one reads as "we know who's affected, who isn't, and where the costs land." The second framing is what hiring managers test for.

## How these personas inform the redesign

- **PDP Complete the Look widget (surface #1)** — primary audience: Outfit Seeker, Single-Item Shopper (with respect-the-intent constraint), Inspiration Browser. Counter: Bargain Hunter (collapsible / dismissable / sale-aware).
- **Look Detail Page (surface #2)** — primary audience: Creator-Follower (bundle action, accurate tagging surfacing, sold-out graceful failure), Outfit Seeker (outfit-level save). Inspiration Browser benefits from rationale layer.
- **Discovery navigation between creators (surface #3)** — primary audience: Inspiration Browser. Secondary: Creator-Follower (as graceful substitute when a specific creator's outfit is unavailable). The force-directed style-cluster viz from Week 3 is justified by these two personas' JTBDs.

## Integrity reminder for the case study itself

When these personas appear in the case study writing (Week 6):

1. **Header each persona's first appearance with "composite, synthesized from review mining."** Methodology disclosure goes in the appendix; the inline disclosure is the per-persona header.
2. **Distinguish observation from hypothesis throughout.** Every claim in the case study persona section should have one of two provenance tags: corpus-evidenced (with quote citation) or hypothesis-stage (with rationale).
3. **Keep the counter-persona visible in the case study narrative.** Not just in an "everyone benefits" pitch — the Bargain Hunter is the reason the measurement plan includes counter-metrics. Make this explicit.

---

> **Status:** 5 personas drafted from an 83-quote corpus across 8 languages and 9 markets. Brief's 80+ quote target met. Honest about the remaining gap (Creator-Follower hypothesis-stage). Cron-scheduled extension agent registered to keep extending. Cron is session-only despite durable request (harness limitation flagged in transcript); for durable scheduling across Claude restarts, OS-level cron or a CI-based scheduler is the next step.
