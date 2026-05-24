# Secondary Sources — for the competitive-scan sibling

> The brief asks each research agent to flag URLs useful to the sibling agent. In this iteration both deliverables (competitive scan AND review mining) were produced by the same parent agent, so there is no sibling to hand off to. This file is retained for the cron-scheduled extension agent (and for any future re-runs of either brief) to drop URLs it stumbles on.

## URLs useful to a competitive-scan run (encountered during review mining)

- [Zalando Design (Medium) — How we redesigned online fashion browsing](https://medium.com/zalando-design/how-we-redesigned-online-fashion-browsing-7362bf5685d1) — describes Zalando's own visual-filter redesign with user research that motivated it. Already used in competitive scan `sources.md`.
- [Zalando Corporate — Zalando's strategy in action: Our mission on inspiration and entertainment](https://corporate.zalando.com/en/technology/zalandos-strategy-action-our-mission-inspiration-and-entertainment) — Zalando's own framing of its inspiration/entertainment direction. Useful for case-study positioning.
- [AppsFlyer — Zalando's AI-powered app: Fashion meets personalization](https://www.appsflyer.com/blog/measurement-analytics/zalando-ai-fashion-personalization/) — third-party writeup of Zalando's AI personalization. Worth checking for cited customer behavior data.
- [TheDroidsOnRoids — 10 Best Fashion Apps in 2026](https://www.thedroidsonroids.com/blog/10-best-fashion-apps) — competitive coverage list, worth cross-referencing.

## URLs to re-attempt in future runs

Blocked or rate-limited during this run; structurally accessible (the block may be transient / anti-bot):

- All Trustpilot regional pages (`uk.trustpilot.com`, `www.trustpilot.com/review/zalando.de|.nl|.be|.dk`) — returned 403. Re-attempt after a week, possibly with different fetch tooling.
- `www.reddit.com` and all subreddit search URLs — blocked at Claude Code level. Re-attempt only if Claude Code's Reddit block is lifted (out of session control).
- `apps.apple.com/de/app/zalando…` and Play Store equivalents — JS-rendered, returned only 4 of millions of reviews. Re-attempt with an iOS/Android scraping toolchain (out of session scope).
- `sikayetvar.com` — was rejected at fetch-permission level in this run, then `forward2me.com` was found to have no verbatim reviews. Both could be re-attempted with different paths.

## URLs to explore that weren't tried

- TikTok Shop creator outfit posts under `#zalandoootd`, `#zalandohaul` — access requires login; consider OAuth-equipped MCP server.
- Instagram comments on `@zalando` and creator-tagged posts — same login constraint.
- Zalando's own published designer Medium articles by topic — Zalando Design publishes more than the 4 we sampled; `https://medium.com/zalando-design/tagged/user-research` lists more.
- Sitejabber, ProductReview, Yotpo — alternative review aggregators.
- YouTube haul/review video transcripts — accessible if YouTube's transcript export works via WebFetch.

## Notes for the cron agent

When the cron agent fires (`a2b7844f`, weekdays 09:17), prefer in this order:

1. **Reviews.io pages 4 through N** until the source is genuinely exhausted (page 3 already showed substantial overlap with page 1).
2. **Zalando Design Medium publication article list** — new articles get published; previously unread ones may contain user research quotes.
3. **A single retry per week against Trustpilot UK and Reddit** — log the outcome regardless. Don't burn budget repeating the same week.
4. **One newly attempted aggregator per run** — Sitejabber, ProductReview, Yotpo, etc.

Do not exceed the 10-minute / 10-quote stop condition per fire. Quality > quantity.
