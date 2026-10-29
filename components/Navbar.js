"use client";
import { useState, useEffect } from "react";

const L = [
  ["Featured", "Featured"],
  ["Customiser", "customiser"],
  ["Craftsmanship", "Craftsmanship"],
  ["Enquiry", "enquiry"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  const [active, setActive] = useState("Featured");

  useEffect(() => {
    const f = () => {
      setSc(window.scrollY > 20);
      let cur = "Featured";
      for (const [, id] of L) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      setActive(cur);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={"hdr" + (sc ? " sc" : "")}>
      <a href="#top" className="hdr-logo">
        <span className="hdr-name">SOFALIVING</span>
        <span className="hdr-tag">EST. 1998 · BESPOKE CRAFT</span>
      </a>

      <nav className={"hdr-links" + (open ? " open" : "")}>
        {L.map(([t, id]) => (
          <a key={id} href={"#" + id} className={active === id ? "act" : ""} onClick={() => setOpen(false)}>{t}</a>
        ))}
        <div className="hdr-mob">
          <a href="tel:+919876543210" className="hdr-phone">+91 98765 43210</a>
          <a href="#enquiry" className="hdr-cta" onClick={() => setOpen(false)}>Design Yours</a>
        </div>
      </nav>

      <div className="hdr-right">
        <a href="tel:+919876543210" className="hdr-phone">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.19a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92z" />
          </svg>
          +91 98765 43210
        </a>
        <a href="#enquiry" className="hdr-cta">Design Yours</a>
      </div>

      <button className="hdr-burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>
    </header>
  );
}
