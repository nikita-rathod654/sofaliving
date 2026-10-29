"use client";
import { useRef, useState } from "react";
import Photo from "./Photo";
import ColourSelector from "./ColourSelector";
import PriceSummary from "./PriceSummary";
import { Cube, Swatch, Truck, Shield, Rotate, Copy, Check } from "./Icons";
import { MODELS, FABRICS, SEATS, COLOURS, COLOUR_LABELS, inr, adj, price, photoSrcs } from "../lib/data";
import { useCountUp } from "../lib/hooks";

const Step = ({ n, label, t, children }) => (
  <div className="step">
    <header><span>Step 0{n} / 04</span><span>{label}</span></header>
    <h4>{t}</h4>
    {children}
  </div>
);

export default function SofaCustomiser({ cfg, set, reset, share, onSync }) {
  const m = MODELS.find((x) => x.id === cfg.model);
  const seat = SEATS.find((s) => s.id === cfg.seats);
  const total = price(cfg);
  const shown = useCountUp(total);
  const tilt = useRef(null);
  const [spin, setSpin] = useState(false);

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.setProperty("--ry", x * 10 + "deg");
    tilt.current.style.setProperty("--rx", -y * 8 + "deg");
  };
  const leave = () => {
    tilt.current.style.setProperty("--ry", "0deg");
    tilt.current.style.setProperty("--rx", "0deg");
  };
  const inspect = () => {
    if (spin) return;
    setSpin(true);
    setTimeout(() => setSpin(false), 1400);
  };

  return (
    <div className="cust">
      <div className="prev">
        <div className="stage big" onMouseMove={move} onMouseLeave={leave}>
          <div className={"tilt" + (spin ? " spin" : "")} ref={tilt}>
            {/* key no longer includes seats, so the photo doesn't reload on seating change */}
            <Photo key={cfg.model + cfg.colour} srcs={photoSrcs(cfg.model, cfg.colour)}
              alt={`${cfg.model} sofa in ${COLOUR_LABELS[cfg.colour]}`} model={cfg.model} seats={cfg.seats} colour={COLOURS[cfg.colour]} />
          </div>
          <span className="pill two"><b>{cfg.model} Model</b><small><i className="dot" style={{ background: COLOURS[cfg.colour] }} />{COLOUR_LABELS[cfg.colour]}</small></span>
          <span className="pill r">{seat.pill}</span>
          <button className="ov l" onClick={inspect}><Cube size={13} />360° Inspection Ready</button>
          <button className="ov r" onClick={onSync}><Swatch size={13} />Free Swatches Available</button>
        </div>
        <div className="est">
          <div><small>Real-time estimate</small><b key={total} className="pop">{inr(shown)}</b> <em>All Taxes Incl.</em></div>
          <span className="ship"><Truck size={14} />Zero Delivery Fee</span>
        </div>
        <div className="note"><Shield size={16} /><p>Every customized order enters 3D CAD modeling within 12 hours. You will receive real-time workshop build photographs during your frame&apos;s assembly.</p></div>
        <div className="tools">
          <button onClick={reset}><Rotate size={13} />Reset selection</button>
          <button onClick={share}><Copy size={13} />Copy summary</button>
        </div>
      </div>

      <div className="ctrl">
        <Step n="1" label="Base Architecture" t="Choose Sofa Model">
          <div className="opts three">
            {MODELS.map((x) => (
              <button key={x.id} aria-pressed={x.id === cfg.model} className={"opt" + (x.id === cfg.model ? " on" : "")} onClick={() => set("model", x.id)}>
                <span className="chk"><Check size={10} strokeWidth={3} /></span>
                <b>{x.id}</b><small>{x.note}</small><em>{inr(x.price)}</em>
              </button>
            ))}
          </div>
        </Step>
        <Step n="2" label={COLOUR_LABELS[cfg.colour]} t="Choose Fabric Colour">
          <ColourSelector colours={m.colours} value={cfg.colour} onChange={(v) => set("colour", v)} />
        </Step>
        <Step n="3" label="Material Tactility" t="Choose Fabric Type">
          <div className="opts">
            {FABRICS.map((f) => (
              <button key={f.id} aria-pressed={f.id === cfg.fabric} className={"opt r2" + (f.id === cfg.fabric ? " on" : "")} onClick={() => set("fabric", f.id)}>
                <i className="radio" />
                <span><b>{f.id}</b><small>{f.note}</small></span>
                <small className="amt">{adj(f.add)}</small>
              </button>
            ))}
          </div>
        </Step>
        <Step n="4" label="Spatial Footprint" t="Choose Seating Configuration">
          <div className="opts three">
            {SEATS.map((s) => (
              <button key={s.id} aria-pressed={s.id === cfg.seats} className={"opt seat" + (s.id === cfg.seats ? " on" : "")} onClick={() => set("seats", s.id)}>
                <b>{s.id}</b><small>{s.note}</small><em>{adj(s.add)}</em>
              </button>
            ))}
          </div>
        </Step>
        <PriceSummary cfg={cfg} onSync={onSync} />
      </div>
    </div>
  );
}