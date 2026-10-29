export const COLOURS = { Beige: "#d8c3a2", Charcoal: "#464a52", Olive: "#5d6b3b", Midnight: "#1f3547" };
export const COLOUR_LABELS = { Beige: "Warm Beige", Charcoal: "Charcoal Grey", Olive: "Forest Olive", Midnight: "Midnight Blue" };

export const MODELS = [
  {
    id: "Luna", name: "The Luna Curved", tag: "Curved Artistry", price: 42999, note: "Curved Bouclé",
    desc: "Organic curved silhouette enveloped in soft, tactile bouclé. Ideal for fluid, conversational open-plan spaces.",
    feats: ["Curved Silhouette", "High-Traffic Bouclé", "Soft Density"],
    colours: ["Beige", "Charcoal", "Olive", "Midnight"],
  },
  {
    id: "Urban", name: "The Urban Mid-Century", tag: "Modern Classic", price: 54999, note: "Mid-Century Clean",
    desc: "Clean geometric profiles, button-tufted backrests, and tapered walnut legs. Tailored for urban architectural spaces.",
    feats: ["Mid-Century Clean Lines", "Solid Walnut Trim", "Firm Ergonomic Support"],
    colours: ["Charcoal", "Beige", "Olive", "Midnight"],
  },
  {
    id: "Cloud", name: "The Cloud Sectional", tag: "Deep Sanctuary", price: 64999, note: "Deep Sectional",
    desc: "Generous deep-seated sectional lounge featuring modular configuration and down-layer microfiber down.",
    feats: ["L-Shape Modular", 'Deep Lounge 42"', "Stain-Resistant Linen"],
    colours: ["Olive", "Beige", "Charcoal", "Midnight"],
  },
];

export const FABRICS = [
  { id: "Natural Linen", add: 0, note: "Breathable, tactile, organic weave" },
  { id: "Royal Velvet", add: 5000, note: "Plush depth, stain-guarded barrier" },
  { id: "Matte Vegan Leatherette", add: 8000, note: "Scratch-resistant & easily wipeable" },
];

export const SEATS = [
  { id: "2 Seater", add: -6000, note: "Compact", pill: "2 Seater Compact" },
  { id: "3 Seater", add: 0, note: "Signature", pill: "3 Seater Standard" },
  { id: "L-Shape", add: 14000, note: "With Chaise", pill: "L-Shape Chaise" },
];

export const DEFAULT_CFG = { model: "Luna", colour: "Beige", fabric: "Natural Linen", seats: "3 Seater" };

export const inr = (n) => "₹" + n.toLocaleString("en-IN");
export const adj = (n) => (n === 0 ? "Included (+₹0)" : n > 0 ? "+" + inr(n) : "-" + inr(-n));
export const price = (c) =>
  MODELS.find((m) => m.id === c.model).price +
  FABRICS.find((f) => f.id === c.fabric).add +
  SEATS.find((s) => s.id === c.seats).add;

// The colour each model's real photo was shot in.
const NATIVE = { Luna: "Beige", Urban: "Charcoal", Cloud: "Olive" };

// Looks for a colour-specific photo first (e.g. luna-midnight.png).
// The main model photo (luna.png) is only used for its own colour,
// otherwise the SVG sofa fallback shows in the selected colour.
export const photoSrcs = (model, colour) => {
  const base = `/sofas/${model.toLowerCase()}`;
  const c = colour.toLowerCase();
  const list = [`${base}_${c}.png`];
  if (c === "midnight") list.push(`${base}_midnigth.png`);
  if (NATIVE[model] === colour) list.push(`${base}.png`);
  return list;
};