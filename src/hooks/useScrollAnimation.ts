"use client";

import { useInView } from "react-intersection-observer";
import type { Variants } from "framer-motion";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.15, triggerOnce = true } = options;

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return { ref, inView };
}

export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};
