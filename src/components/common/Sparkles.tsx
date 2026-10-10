"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { randomBetween } from "@/lib/utils";
import type { SparkleParticle } from "@/types";

const COLORS = ["#FF6B9D", "#FFD1DC", "#D4A017", "#F5D788", "#ffffff"];
const SPARKLE_COUNT = 20;

const StarShape = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.09 6.26L20 9.27l-4.91 4.79 1.18 6.88L12 17.77l-4.27 3.17 1.18-6.88L4 9.27l5.91-1.01z" />
  </svg>
);

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generated: SparkleParticle[] = Array.from(
      { length: SPARKLE_COUNT },
      (_, i) => ({
        id: i,
        x: randomBetween(2, 98),
        y: randomBetween(2, 98),
        size: randomBetween(6, 18),
        duration: randomBetween(2, 5),
        delay: randomBetween(0, 5),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    );
    setSparkles(generated);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[5]"
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            color: s.color,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <StarShape size={s.size} />
        </motion.div>
      ))}
    </div>
  );
}
