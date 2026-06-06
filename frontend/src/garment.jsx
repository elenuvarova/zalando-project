// Garment art — clean flat-lay silhouettes used as the product-image stand-in
// (we have no real H&M photos). Each shape is tinted with the item's real colour.
// Honest placeholder, clearly intentional rather than a broken <img>.

function shade(hex, amt) {
  // darken/lighten a #rrggbb hex by amt (-1..1) for outline/shadow
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = amt < 0 ? 0 : 255, p = Math.abs(amt);
  r = Math.round((f - r) * p + r); g = Math.round((f - g) * p + g); b = Math.round((f - b) * p + b);
  return `rgb(${r},${g},${b})`;
}

const SHAPES = {
  top: (
    <path d="M34 26 L46 20 Q50 25 54 20 L66 26 L80 36 L72 50 L64 45 L64 96 Q50 100 36 96 L36 45 L28 50 L20 36 Z" />
  ),
  outerwear: (
    <>
      <path d="M32 24 L46 20 L50 26 L54 20 L68 24 L82 38 L73 52 L65 46 L65 100 L50 104 L35 100 L35 46 L27 52 L18 38 Z" />
      <line x1="50" y1="26" x2="50" y2="100" strokeWidth="1.4" />
    </>
  ),
  bottom: (
    <path d="M36 22 L64 22 L66 34 L60 100 L50 100 L50 50 L50 100 L40 100 L34 34 Z" />
  ),
  full: (
    <path d="M38 22 L46 18 Q50 23 54 18 L62 22 L58 40 L72 104 Q50 110 28 104 L42 40 Z" />
  ),
  shoes: (
    <path d="M22 70 Q24 52 40 52 L58 52 Q78 56 82 72 L82 80 Q82 84 78 84 L24 84 Q20 84 20 80 Z" />
  ),
  bag: (
    <>
      <path d="M34 44 Q34 30 50 30 Q66 30 66 44" fill="none" strokeWidth="3" />
      <path d="M30 44 L70 44 L74 96 L26 96 Z" />
    </>
  ),
  accessory: (
    <>
      <rect x="20" y="56" width="60" height="14" rx="2" />
      <rect x="46" y="52" width="16" height="22" rx="2" fill="none" strokeWidth="2.5" />
    </>
  ),
  hosiery: (
    <path d="M40 22 L60 22 L62 30 L57 100 L51 100 L50 46 L49 100 L43 100 L38 30 Z" />
  ),
};
SHAPES.swim = SHAPES.top;
SHAPES.underwear = SHAPES.accessory;
SHAPES.default = SHAPES.top;

export function GarmentTile({ hex = "#b5b5b5", slot = "top", appearance, label }) {
  const fill = hex || "#b5b5b5";
  const stroke = shade(fill, -0.35);
  const shape = SHAPES[slot] || SHAPES.default;
  const dotty = appearance && /dot|spot/i.test(appearance);
  const stripe = appearance && /stripe/i.test(appearance);
  return (
    <svg className="gtile" viewBox="0 0 100 120" role="img" aria-label={label || "garment"} preserveAspectRatio="xMidYMid meet">
      <defs>
        {dotty && (
          <pattern id={`dot-${slot}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.6" fill={shade(fill, 0.5)} />
          </pattern>
        )}
        {stripe && (
          <pattern id={`str-${slot}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
            <rect width="8" height="4" fill={shade(fill, 0.45)} />
          </pattern>
        )}
      </defs>
      <g fill={fill} stroke={stroke} strokeWidth="1.6" strokeLinejoin="round">
        {shape}
      </g>
      {(dotty || stripe) && (
        <g fill={`url(#${dotty ? "dot" : "str"}-${slot})`} stroke="none" opacity="0.85">
          {shape}
        </g>
      )}
    </svg>
  );
}
