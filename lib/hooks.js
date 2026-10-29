import { useEffect, useRef, useState } from "react";

// Smoothly animates a number towards `target` whenever it changes.
export function useCountUp(target, dur = 550) {
  const [v, setV] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    const start = cur.current, t0 = performance.now();
    let raf;
    const tick = (n) => {
      const p = Math.min(1, (n - t0) / dur);
      cur.current = Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      setV(cur.current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, dur]);
  return v;
}
