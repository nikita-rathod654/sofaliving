"use client";
import { useEffect, useRef, useState } from "react";
export default function Counter({ to, decimals = 0, suffix = "", dur = 1500 }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf;
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      const t0 = performance.now();
      const tick = (n) => {
        const p = Math.min(1, (n - t0) / dur);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    o.observe(el);
    return () => { o.disconnect(); cancelAnimationFrame(raf); };
  }, [to, dur]);
  return <b ref={ref}>{v.toFixed(decimals)}{suffix}</b>;
}
