"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { MODELS, FABRICS, SEATS, COLOURS, COLOUR_LABELS, DEFAULT_CFG, inr, price } from "../lib/data";
import Navbar from "../components/Navbar";
import Photo from "../components/Photo";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import ScrollUI from "../components/ScrollUI";
import SofaCard from "../components/SofaCard";
import SofaCustomiser from "../components/SofaCustomiser";
import EnquiryForm from "../components/EnquiryForm";
import { Shield, Swatch, Truck, SofaIcon, ArrowRight, Wrench, Tree, Layers, Droplet, Factory } from "../components/Icons";

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const BEN = [
  [Tree, "Kiln-Dried Hardwood", "0% moisture seasoned teak and sal wood with reinforced mortise-and-tenon joints. Termite-proofed for lasting structural peace of mind.", "Grade A Solid Timber"],
  [Layers, "38-Density Cold Foam", "Multi-layer cold-cure memory foam cores supported by S-spring suspension bands. Rebound resilience and anatomical contour for 15+ years.", "High Rebound Rating"],
  [Droplet, "50k Martindale Rubs", "Pet-friendly weaves tested against heavy abrasion and accidental spills. Oleophobic treatments resist coffee, wine and daily wear.", "Hydrophobic Nanocoat"],
  [Factory, "Direct from Factory", "Direct atelier-to-residence model skips middleman markups. You invest purely in authentic timber, foam grade and generational craftsmanship.", "Zero Distributor Margin"],
];
const STATS = [
  [26, 0, "", "Years of Precision Craft"],
  [42, 0, "k+", "Homes Furnished Across India"],
  [10, 0, "-Yr", "Frame Warranty Guarantee"],
  [4.9, 1, "★", "Architect & Client Satisfaction"],
];
const NAV = [["Featured", "Featured"], ["Customiser", "customiser"], ["Craftsmanship", "Craftsmanship"], ["Enquiry", "enquiry"]];

const valid = (s) =>
  s && MODELS.some((m) => m.id === s.model) && COLOURS[s.colour] &&
  FABRICS.some((f) => f.id === s.fabric) && SEATS.some((x) => x.id === s.seats);

export default function Home() {
  const [cfg, setCfg] = useState(DEFAULT_CFG);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  const tt = useRef();

  const notify = useCallback((m) => {
    setToast(m);
    clearTimeout(tt.current);
    tt.current = setTimeout(() => setToast(""), 2400);
  }, []);

  // restore / persist the visitor's configuration
  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem("sl-cfg")); if (valid(s)) setCfg(s); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) try { localStorage.setItem("sl-cfg", JSON.stringify(cfg)); } catch {}
  }, [cfg, ready]);

  const set = (k, v) =>
    setCfg((c) => {
      const n = { ...c, [k]: v };
      if (k === "model") {
        const m = MODELS.find((x) => x.id === v);
        if (!m.colours.includes(n.colour)) n.colour = m.colours[0];
      }
      return n;
    });

  const reset = () => { setCfg(DEFAULT_CFG); notify("Selection reset to the Luna default"); };
  const share = async () => {
    const text = `SOFALIVING · ${cfg.model} · ${COLOUR_LABELS[cfg.colour]} · ${cfg.fabric} · ${cfg.seats} — ${inr(price(cfg))}`;
    try { await navigator.clipboard.writeText(text); notify("Summary copied to clipboard"); }
    catch { notify("Couldn't copy. Select the summary and copy it manually"); }
  };
  const sync = () => { go("enquiry"); notify("Selection synced to the enquiry form"); };

  return (
    <>
      <ScrollUI />
      <Navbar />
      <main>
        <section id="top" className="hero">
          <div className="wrap">
            <p className="eyebrow soft rise">Architectural Living · Handcrafted in Bangalore &amp; Mumbai</p>
            <h1 className="rise" style={{ animationDelay: ".1s" }}>Bespoke Sofas, Sculpted for Modern Indian Homes.</h1>
            <p className="lead rise" style={{ animationDelay: ".2s" }}>
              Explore precision-tailored seating crafted with kiln-dried teak frames, high-density feather core foams, and over 120 artisan fabrics. Customise dimensions, fabrics, and contours in real-time.
            </p>
            <div className="cta rise" style={{ animationDelay: ".3s" }}>
              <button className="btn" onClick={() => go("customiser")}>Start Customising <ArrowRight size={14} /></button>
              <button className="btn ghost" onClick={() => go("Featured")}>Explore Signature Models</button>
            </div>
            <div className="stage hs rise" style={{ animationDelay: ".4s" }}>
              <div className="para">
                <Photo srcs={["/sofas/hero.png"]} alt="Living room with a beige linen sofa under an arched window" model="Luna" seats="3 Seater" colour={COLOURS.Beige} priority />
              </div>
              <span className="chip"><SofaIcon size={18} /><span><small>Living room showcase</small><b>The Nordic Minimalist 3-Seater in Oat Linen</b></span></span>
            </div>
            <div className="trust">
              <span><Shield size={16} />10-Year Frame &amp; Suspension Warranty</span>
              <span><Swatch size={16} />100+ Premium Swatches to your Doorstep</span>
              <span><Truck size={16} />Zero-Cost Pan-India Delivery &amp; Assembly</span>
            </div>
          </div>
        </section>

        <section id="Featured" className="alt">
          <div className="wrap">
            <Reveal className="sec-h">
              <div><p className="eyebrow">Foundational Designs</p><h2>Signature Collections</h2></div>
              <p>Explore our foundational silhouettes, engineered for ergonomic posture and architectural presence.</p>
            </Reveal>
            <div className="grid3">
              {MODELS.map((m, i) => (
  <SofaCard key={m.id} m={m} delay={i * 120}
    onCustomise={() => { set("model", m.id); set("colour", m.colours[0]); go("customiser"); notify(`${m.id} loaded into the customiser`); }} />
))}
            </div>
          </div>
        </section>

        <section id="customiser">
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow chipy"><Wrench size={12} />Live Specification Studio</p>
              <h2>Tailor Your Living Centerpiece</h2>
              <p>Select your architecture, tone, upholstery, and seating scale. Observe instant recalculation and seamless synchronization with our craftsmen.</p>
            </Reveal>
            <SofaCustomiser cfg={cfg} set={set} reset={reset} share={share} onSync={sync} />
          </div>
        </section>

        <section id="Craftsmanship" className="sand">
          <div className="wrap">
            <Reveal className="craft-h">
              <p className="eyebrow">Uncompromising Quality</p>
              <h2>Built by Indian Artisans, Engineered to Last Generations.</h2>
              <p>Unlike mass-manufactured flatpack imports, SOFALIVING constructs seating with architectural joinery, seasoned timber, and tailored upholstery executed by third-generation woodworkers and upholsterers in Bangalore and Mumbai.</p>
            </Reveal>
            <div className="g4">
              {BEN.map(([Icon, t, d, foot], k) => (
                <Reveal key={t} delay={k * 100} className="ben">
                  <span className="ico"><Icon size={18} /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <small>{foot}</small>
                </Reveal>
              ))}
            </div>
            <Reveal className="stats">
              {STATS.map(([n, dec, suf, l]) => (
                <div key={l}><Counter to={n} decimals={dec} suffix={suf} /><span>{l}</span></div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="enquiry">
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow">Personalized Consultation</p>
              <h2>Request a Consultation &amp; Swatch Kit</h2>
              <p>Our design consultants will prepare a complimentary fabric sample box (up to 4 swatches) and connect within 4 business days.</p>
            </Reveal>
            <EnquiryForm cfg={cfg} set={set} />
          </div>
        </section>
      </main>

    <footer className="ft">
  <div className="wrap">
    <div className="ft-top">
      <div className="ft-brand">
        <b className="logo">SOFALIVING</b>
        <p>Architectural seating systems crafted with kiln-seasoned hardwoods, cold-cure ergonomics, and artisan European and Indian weaves. Designed for longevity and restorative residential calm.</p>
        <p className="ft-contact">
          Direct Workshop: +91 98765 43210 (10:00 AM – 7:30 PM IST)<br />
          Trade Desk: trade@sofaliving.in
        </p>
      </div>

      <div>
        <h5>Atelier Experience Studios</h5>
        <p><b>Bangalore:</b> 100ft Road, Indiranagar, 560038</p>
        <p><b>Mumbai:</b> Mathuradas Mill Compound, Lower Parel, 400013</p>
        <p><b>Delhi NCR:</b> The Gallery on MG, Sultanpur, New Delhi 110030</p>
      </div>

      <div>
        <h5>Architect &amp; Trade Desk</h5>
        <p>Specialized 3D asset packs (Revit / Rhino / 3ds Max) and volume project rates available for registered architects and interior studios.</p>
        <a href="mailto:trade@sofaliving.in" className="ft-cta">Apply for Trade Account →</a>
      </div>
    </div>

    <div className="ft-links">
      <nav>
        {["Craftsmanship Standards", "Material Warranty", "Showroom Directory", "Custom Fabric Samples", "Privacy Policy", "Terms of Craft"].map((t) => (
          <a key={t} href="#top">{t}</a>
        ))}
      </nav>
      <span>Pan-India White-Glove Logistics</span>
    </div>

    <div className="ft-copy">
      <p>© 2025 SOFALIVING Bespoke Furniture Pvt. Ltd. All rights reserved. Handcrafted with architectural precision.</p>
      <span>EST. 1998 · Atelier Bangalore &amp; Mumbai</span>
    </div>
  </div>
</footer>

      <div className={"toast" + (toast ? " show" : "")} role="status" aria-live="polite">{toast}</div>
    </>
  );
}