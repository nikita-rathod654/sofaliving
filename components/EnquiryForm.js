"use client";
import { useRef, useState } from "react";
import { MODELS, FABRICS, SEATS, COLOUR_LABELS, inr, price } from "../lib/data";
import { Send } from "./Icons";

const rules = {
  name: (v) => (v.trim().length < 2 ? "Enter your full name" : ""),
  phone: (v) => (/^\d{10}$/.test(v) ? "" : "Enter a valid 10-digit phone number"),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? "" : "Enter a valid email address"),
  city: (v) => (/\b\d{6}\b/.test(v) && v.replace(/[\d\s,.-]/g, "").length >= 2 ? "" : "Enter city and 6-digit pincode, e.g. Bangalore, 560038"),
};
const empty = { name: "", phone: "", email: "", city: "", message: "", swatches: true };

export default function EnquiryForm({ cfg, set }) {
  const [f, setF] = useState(empty);
  const [touched, setTouched] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const formRef = useRef(null);
  const m = MODELS.find((x) => x.id === cfg.model);
  const sum = `${cfg.model} · ${COLOUR_LABELS[cfg.colour]} · ${cfg.fabric} · ${cfg.seats} — ${inr(price(cfg))}`;
  const err = (k) => (touched[k] ? rules[k](f[k]) : "");

  const ch = (k) => (e) => {
    let v = e.target.value;
    if (k === "phone") v = v.replace(/\D/g, "").slice(0, 10);
    setF((p) => ({ ...p, [k]: v }));
  };
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = (e) => {
    e.preventDefault();
    const all = { name: 1, phone: 1, email: 1, city: 1 };
    setTouched(all);
    if (Object.keys(rules).some((k) => rules[k](f[k]))) {
      requestAnimationFrame(() => formRef.current?.querySelector(".bad")?.focus());
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setDone({ ref: "SL-" + Date.now().toString().slice(-6), name: f.name.trim().split(" ")[0], sum });
    }, 900);
  };

  const input = (k, label, props = {}) => (
    <label>
      {label}
      <input name={k} value={f[k]} onChange={ch(k)} onBlur={blur(k)} className={err(k) ? "bad" : ""} aria-invalid={!!err(k)} {...props} />
      {err(k) && <em>{err(k)}</em>}
    </label>
  );

  if (done)
    return (
      <div className="form ok">
        <div className="tick"><span>✓</span></div>
        <h3>Thank you, {done.name}!</h3>
        <p>We received your enquiry for <b>{done.sum}</b>. A design consultant will contact you within 4 business days.</p>
        <small className="refno">Reference {done.ref}</small>
        <button className="btn" onClick={() => { setDone(null); setF(empty); setTouched({}); }}>Send another enquiry</button>
      </div>
    );

  return (
    <form className="form" ref={formRef} onSubmit={submit} noValidate>
      <div className="two">
        {input("name", "Full Name *", { type: "text", placeholder: "e.g. Ananya Sen", autoComplete: "name" })}
        {input("phone", "Phone Number (+91) *", { type: "tel", inputMode: "numeric", placeholder: "9876543210 (10 digits)", autoComplete: "tel-national" })}
      </div>
      {input("email", "Email Address *", { type: "email", placeholder: "ananya@architecturestudio.in", autoComplete: "email" })}

      <div className="sync">
        <div className="sync-h"><small>Synchronized customiser data</small><small>Auto-populated from Step 1-4</small></div>
        <div className="three3">
          <label><small>Model Selection</small>
            <select value={cfg.model} onChange={(e) => set("model", e.target.value)}>
              {MODELS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </label>
          <label><small>Fabric &amp; Colour</small>
            <select value={cfg.fabric + "|" + cfg.colour} onChange={(e) => { const [fb, cl] = e.target.value.split("|"); set("fabric", fb); set("colour", cl); }}>
              {FABRICS.flatMap((fb) => m.colours.map((c) => (
                <option key={fb.id + c} value={fb.id + "|" + c}>{fb.id.replace("Matte Vegan Leatherette", "Vegan Leatherette")} · {COLOUR_LABELS[c]}</option>
              )))}
            </select>
          </label>
          <label><small>Seating Size</small>
            <select value={cfg.seats} onChange={(e) => set("seats", e.target.value)}>
              {SEATS.map((s) => <option key={s.id} value={s.id}>{s.id} ({s.note === "Signature" ? "Standard" : s.note})</option>)}
            </select>
          </label>
        </div>
        <p className="sync-total">Estimated total <b>{inr(price(cfg))}</b></p>
      </div>

      <div className="two">
        {input("city", "Delivery City & Pincode *", { type: "text", placeholder: "e.g. Bangalore, 560038", autoComplete: "postal-code" })}
        <label>Special Dimensions or Room Requirements (Optional)
          <textarea rows="1" maxLength={300} placeholder="e.g. Max length 96 inches, left-facing chai" value={f.message} onChange={ch("message")} />
          <small className="count">{f.message.length}/300</small>
        </label>
      </div>

      <label className="check">
        <input type="checkbox" checked={f.swatches} onChange={(e) => setF((p) => ({ ...p, swatches: e.target.checked }))} />
        <i><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg></i>
        <span>Send a complimentary physical fabric swatch box (including the chosen fabric and 3 curated alternatives) to my delivery address at zero cost.</span>
      </label>

      <button className={"btn full" + (busy ? " busy" : "")} disabled={busy}>
        {busy ? "Sending your enquiry…" : <>Submit Bespoke Enquiry <Send size={14} /></>}
      </button>
      <p className="fine">Protected by end-to-end craft confidentiality. No marketing spam.</p>
    </form>
  );
}
