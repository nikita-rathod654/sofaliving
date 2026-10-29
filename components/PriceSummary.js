"use client";
import { MODELS, FABRICS, SEATS, COLOUR_LABELS, inr, adj, price } from "../lib/data";
import { useCountUp } from "../lib/hooks";
import { ArrowRight } from "./Icons";

export default function PriceSummary({ cfg, onSync }) {
  const m = MODELS.find((x) => x.id === cfg.model);
  const f = FABRICS.find((x) => x.id === cfg.fabric);
  const s = SEATS.find((x) => x.id === cfg.seats);
  const t = price(cfg);
  const shown = useCountUp(t);
  return (
    <div className="sum">
      <div className="sum-top">
        <small>Your configuration</small>
        <small className="live"><i />Live Quote</small>
      </div>
      <h4>The {m.id} · {COLOUR_LABELS[cfg.colour]} · {cfg.fabric.replace("Matte Vegan Leatherette", "Vegan Leatherette")} · {cfg.seats}</h4>
      <dl>
        <dt>Base Architecture ({m.id}):</dt><dd>{inr(m.price)}</dd>
        <dt>Fabric Tier ({f.id}):</dt><dd>{adj(f.add)}</dd>
        <dt>Seating Configuration ({s.id}):</dt><dd>{adj(s.add)}</dd>
      </dl>
      <div className="tot"><span>Total Calculated Investment:</span><b key={t} className="pop">{inr(shown)}</b></div>
      <button className="btn full" onClick={onSync}>Sync Selection to Enquiry Form <ArrowRight size={14} /></button>
    </div>
  );
}
