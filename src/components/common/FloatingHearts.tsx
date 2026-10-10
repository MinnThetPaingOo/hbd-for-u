"use client";

import { useEffect, useState } from "react";
import { randomBetween } from "@/lib/utils";
import type { HeartParticle } from "@/types";

const HEART_COUNT = 15;
const HEART_COUNT_MOBILE = 8;

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const count = window.matchMedia("(max-width: 767px)").matches
      ? HEART_COUNT_MOBILE
      : HEART_COUNT;
    setHearts(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: randomBetween(0, 100),
        size: randomBetween(12, 32),
        duration: randomBetween(8, 20),
        delay: randomBetween(0, 15),
        opacity: randomBetween(0.2, 0.6),
      }))
    );
  }, []);

  if (hearts.length === 0) return null;

  // Pure CSS (transform/opacity) animation: runs on the compositor, no JS per frame
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[5]"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart absolute select-none"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
            ["--heart-opacity" as string]: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.id % 3 === 0 ? "💗" : "🎈"}
        </div>
      ))}
    </div>
  );
}
