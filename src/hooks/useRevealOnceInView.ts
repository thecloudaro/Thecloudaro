"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type RevealOptions = {
  /** 0 = any pixel visible (most reliable). Former `amount` mapped to IntersectionObserver threshold. */
  amount?: number | "some" | "all";
  margin?: string;
};

/**
 * Latches to visible once the element intersects the viewport.
 * Uses react-intersection-observer (callback ref) so we never miss the first intersection
 * when ref + Framer timing would leave `ref.current` null on the first effect (everything stuck at opacity 0).
 */
export function useRevealOnceInView(options?: RevealOptions) {
  const [revealed, setRevealed] = useState(false);

  const threshold =
    typeof options?.amount === "number"
      ? options.amount
      : options?.amount === "all"
        ? 1
        : 0;

  // Do NOT use triggerOnce: true with a non-zero threshold. The library unobserve() runs when
  // entry.isIntersecting is true even if computed inView is false (ratio < threshold), so the
  // observer stops while content stays at opacity: 0. We latch `revealed` in an effect instead.
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false,
    rootMargin: options?.margin ?? "0px 0px 12% 0px",
    fallbackInView: true,
  });

  useEffect(() => {
    if (inView) setRevealed(true);
  }, [inView]);

  return { ref, revealed };
}
