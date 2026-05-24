# Positioning Map — Outfit Discovery Landscape

## Axes

- **X axis:** Algorithmic ←→ Human-curated  
  *How are outfits constructed? Recommender-driven (left) vs editorial/stylist/UGC-driven (right).*
- **Y axis:** Utility (complete what I have) ←→ Inspiration (show me new)  
  *What user JTBD does the surface primarily serve?*

## ASCII plot (top-right is "human-curated inspiration"; bottom-left is "algorithmic utility")

```
                 INSPIRATION (show me new)
                          ▲
                          │
   Pinterest STL          │       Net-a-Porter PORTER
   Lemon8 / TikTok        │       Mango Discover
   Stitch Fix             │       SSENSE editorial
   ABOUT YOU Inspiration  │       ASOS Looks (UGC)
                          │       Uniqlo StyleHint (UGC)
   ───────────────────────┼───────────────────────────►
   Farfetch Inspire       │       (mostly empty)
   Lyst recommender       │
                          │       ┌──────────────────┐
   H&M Complete the Look  │       │  ⭐ TARGET ZONE  │
                          │       │  algo-assisted   │
   Whering W Pick         │       │  but coherent &  │
   (your wardrobe)        │       │  explainable     │
                          │       │  outfit utility  │
   Zalando (today)        │       └──────────────────┘
                          │
                          ▼
                 UTILITY (complete what I have)
   ◄──────────  ALGORITHMIC  ────────────────  HUMAN-CURATED  ──────►
```

## Quadrant analysis

### Top-left — Algorithmic Inspiration
*"Show me new, computed for me."*

- **Inhabitants:** Pinterest Shop the Look, Lemon8/TikTok Shop, Stitch Fix (sort of — it lives across two quadrants), ABOUT YOU Inspiration tab.
- **Strength:** scale. Endless inspiration personalized to the user.
- **Weakness:** weak commitment — the user is browsing, not assembling. Conversion is harder.

### Top-right — Human-Curated Inspiration
*"A stylist or creator showed me a coherent look."*

- **Inhabitants:** Net-a-Porter PORTER, Mango Discover, SSENSE editorial, ASOS Looks (UGC), Uniqlo StyleHint (UGC).
- **Strength:** style coherence is automatic — humans curate trustworthy outfits.
- **Weakness:** doesn't scale per-user; personalization is limited; commerce is item-level even if inspiration is outfit-level.

### Bottom-left — Algorithmic Utility
*"Complete what I'm holding."*

- **Inhabitants:** Farfetch Inspire, Lyst, H&M Complete the Look, Zalando (today), Whering (against the user's own wardrobe).
- **Strength:** direct commercial intent — user has a product in hand and wants the rest of the outfit.
- **Weakness (the Zalando problem):** algorithmic recs without rationale or coherence feel random. Without bundle action, friction stays high. This is where Zalando lives and where its current widgets fail.

### Bottom-right — Human-Curated Utility ⭐ **Sparse quadrant**
*"A coherent, explainable, completable outfit grounded in the item I'm looking at."*

- **Inhabitants:** Stitch Fix is the closest, but it operates outside the PDP context — the bundle is the entire product, not a widget on a marketplace.
- **Why it's empty for mass-market multi-brand marketplaces:** the economics don't pay for human stylists per SKU at the long tail of catalog scale. So competitors either go human-curated for the *editorial top of funnel* (Net-a-Porter, Mango, ASOS Looks) or stay algorithmic at the PDP utility level (Zalando, Farfetch, H&M).

## Where Zalando sits now

Bottom-left quadrant, **but failing at the basics of that quadrant** (no rationale, no coherence, no bundle action, monotone categories). Today Zalando is competing in "algorithmic utility" while delivering noticeably less than Farfetch, Lyst, or H&M on the algorithmic-utility execution.

## Strategic opportunity: the bridge to bottom-right

The bottom-right quadrant is **structurally underserved by mainstream e-commerce** because true human curation at marketplace scale is uneconomic. But the gap is reachable by **algo + rationale + bundle**:

- Use the existing Get the Look creator program (Zalando already has this content asset — it just lives in a separate hub) to inject human-curated outfit logic into PDP recommendations.
- Surface a **rationale layer** ("we paired this because… [color/silhouette/occasion/creator-style]") that makes algorithmic recs *read* as curated.
- Add a **bundle action** that turns outfit recognition into a single transaction.

These three moves — borrowed creator content, explained rationale, bundle action — let an algorithmic system *feel* curated, which is what closes the gap to the empty quadrant. None of the competitors currently in the bottom-left (Farfetch, Lyst, H&M) do all three.

> See [`strategic-findings.md`](strategic-findings.md) for the three-sentence brief on each move.

## Caveats on the plot

- Positioning is qualitative — based on observed product behavior in 2024-2026, not on internal product data.
- Some competitors span multiple quadrants (Pinterest does utility via Lens *and* inspiration via STL; Stitch Fix does inspiration via stylist + utility via the Fix bundle). They're placed by their *dominant* surface relevant to outfit completion.
- The diagram is schematic — distances are not proportional to anything quantitative. The point is structural neighborhoods, not Euclidean position.
