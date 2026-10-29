"use client";
import { useEffect, useState } from "react";
// Scroll progress bar, hero parallax variable, and back-to-top button.
export default function ScrollUI() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const f = () => {
      raf = 0;
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      const s = document.documentElement.style;
      s.setProperty("--p", h > 0 ? (y / h).toFixed(4) : "0");
      s.setProperty("--sy", String(Math.min(y, 900)));
      setShow(y > 600);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(f); };
    f();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <button className={"totop" + (show ? " show" : "")} aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
    </>
  );
}
