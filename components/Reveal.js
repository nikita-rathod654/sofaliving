"use client";
import { useEffect, useRef } from "react";
export default function Reveal({ children, delay = 0, className = "" }) {
  const r = useRef(null);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); o.disconnect(); }
    }, { threshold: 0.12 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return <div ref={r} className={"rv " + className} style={{ transitionDelay: delay + "ms" }}>{children}</div>;
}
