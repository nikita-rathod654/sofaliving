"use client";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Icons";
import { COLOURS, inr } from "../lib/data";

export default function SofaCard({ m, delay, onCustomise }) {
  return (
    <Reveal delay={delay} className="card">
      <div className="cimg">
        <span className="pill">{m.tag}</span>
        <Photo
          srcs={[`/sofas/${m.id.toLowerCase()}.png`]}
          alt={m.name}
          model={m.id}
          seats="3 Seater"
          colour={COLOURS[m.colours[0]]}
        />
      </div>
      <div className="cbody">
        <div className="row"><h3>{m.name}</h3><span>{inr(m.price)}</span></div>
        <p>{m.desc}</p>
        <div className="tags">{m.feats.map((f) => <i key={f}>{f}</i>)}</div>
        <button className="btn outline" onClick={onCustomise}>Customise {m.id} <ArrowUpRight size={14} /></button>
      </div>
    </Reveal>
  );
}