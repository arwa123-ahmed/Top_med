import { useEffect, useState } from "react";

/**
 * Animates a number from 0 to `target` (ease-out).
 * Used for the "Hidden Operational Cost" counter.
 */
export default function useCountUp(target, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf); // cleanup on unmount
  }, [target, duration]);

  return value;
}