// Fallback illustration: shown when no photo exists in /public/sofas
export default function Sofa({ colour, seats, model }) {
  const w = { "2 Seater": 250, "3 Seater": 350, "L-Shape": 340 }[seats] || 350;
  const L = seats === "L-Shape";
  const x = (500 - w) / 2 - (L ? 20 : 0);
  const r = model === "Luna" ? 55 : model === "Cloud" ? 28 : 8;
  const c = { style: { fill: colour } };
  return (
    <svg viewBox="0 0 500 300" className="sofa" role="img" aria-label={`${model} sofa, ${seats}`}>
      <ellipse cx="250" cy="270" rx={w / 2 + 50} ry="11" fill="rgba(0,0,0,.14)" />
      <rect className="fl" x={x} y="70" width={w} height="115" rx={r} {...c} />
      <rect x={x} y="70" width={w} height="115" rx={r} fill="rgba(0,0,0,.1)" />
      {L && <rect className="fl" x={x + w - 100} y="185" width="150" height="55" rx={r / 3 + 8} {...c} />}
      <rect className="fl" x={x + 14} y="140" width={w - 28} height="62" rx={r / 2 + 8} {...c} />
      <rect x={x + 14} y="140" width={w - 28} height="62" rx={r / 2 + 8} fill="rgba(255,255,255,.12)" />
      <rect className="fl" x={x - 16} y="115" width="40" height="95" rx="18" {...c} />
      <rect className="fl" x={x + w - 24} y="115" width="40" height="95" rx="18" {...c} />
      {[x + 10, x + w - 10].map((l) => (<rect key={l} x={l} y="208" width="9" height="32" rx="3" fill="#4a3426" />))}
    </svg>
  );
}
