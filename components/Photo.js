"use client";
import { useEffect, useRef, useState } from "react";
import Sofa from "./Sofa";

// Tries each src in order; if none load, falls back to the SVG sofa.
export default function Photo({ srcs, alt, model, seats, colour, priority = false }) {
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const next = () => setI((n) => (n === i ? n + 1 : n));

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.complete) return;
    if (el.naturalWidth === 0) next();
    else setLoaded(true);
  });

  if (i >= srcs.length) return <Sofa model={model} seats={seats} colour={colour} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      className={"ph" + (loaded ? " ld" : "")}
      src={srcs[i]}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      onLoad={() => setLoaded(true)}
      onError={next}
    />
  );
}