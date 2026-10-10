"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { randomBetween, randomInt } from "@/lib/utils";
import type { HeartParticle } from "@/types";

const HEART_COUNT = 15;

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generated: HeartParticle[] = Array.from({ length: HEART_COUNT }, (_, i) => ({
      id: i,
      x: randomBetween(0, 100),
      size: randomBetween(12, 32),
      duration: randomBetween(8, 20),
      delay: randomBetween(0, 15),
      opacity: randomBetween(0.2, 0.6),
    }));
    setHearts(generated);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[5]"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute select-none"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            rotate: [0, randomInt(-30, 30)],
            opacity: [heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {heart.id % 3 === 0 ? "💗" : "🎈"}
        </motion.div>
      ))}
    </div>
  );
}
