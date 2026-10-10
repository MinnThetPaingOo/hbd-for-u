"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────
interface Reason {
  id: number;
  front: { emoji: string; label: string };
  back: { title: string; message: string };
  color: string;
}

// ─── Data ────────────────────────────────────────────────────
const reasons: Reason[] = [
  {
    id: 1,
    front: { emoji: "😊", label: "Your Smile" },
    back: {
      title: "Your Smile",
      message:
        "Every time you smile, the entire world gets a little brighter. It's the first thing I look for every morning.",
    },
    color: "#FF6B9D",
  },
  {
    id: 2,
    front: { emoji: "💝", label: "Your Kindness" },
    back: {
      title: "Your Kindness",
      message:
        "You have the biggest heart of anyone I know. The way you care for others — effortlessly and genuinely.",
    },
    color: "#C0385A",
  },
  {
    id: 3,
    front: { emoji: "😂", label: "Your Laugh" },
    back: {
      title: "Your Laugh",
      message:
        "Your laugh is contagious and pure joy. It fills every room and wraps around my heart completely.",
    },
    color: "#D4A017",
  },
  {
    id: 4,
    front: { emoji: "💪", label: "Your Support" },
    back: {
      title: "Your Support",
      message:
        "You are my biggest cheerleader. In every challenge, every doubt — you've always been there lifting me up.",
    },
    color: "#FF6B9D",
  },
  {
    id: 5,
    front: { emoji: "⚡", label: "Your Strength" },
    back: {
      title: "Your Strength",
      message:
        "You face every challenge with grace and determination. You inspire me to be stronger every single day.",
    },
    color: "#C0385A",
  },
  {
    id: 6,
    front: { emoji: "🧠", label: "Your Mind" },
    back: {
      title: "Your Intelligence",
      message:
        "The way your mind works — curious, thoughtful, creative — never stops amazing me. Our conversations are my favorite.",
    },
    color: "#D4A017",
  },
  {
    id: 7,
    front: { emoji: "🔥", label: "Your Passion" },
    back: {
      title: "Your Passion",
      message:
        "Whatever you care about, you throw yourself into completely. Your dedication is one of the most attractive things about you.",
    },
    color: "#FF6B9D",
  },
  {
    id: 8,
    front: { emoji: "🌟", label: "Everything" },
    back: {
      title: "Simply Being You",
      message:
        "No list could ever capture every reason. You are the reason. Every quirk, every flaw, every wonderful thing — all of it.",
    },
    color: "#C0385A",
  },
];

// ─── Heart burst particles ────────────────────────────────────
interface Burst {
  id: number;
  x: number;
  y: number;
}

// ─── Flip card ───────────────────────────────────────────────
function FlipCard({ reason }: { reason: Reason }) {
  const [flipped, setFlipped] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setFlipped((f) => !f);

      // Heart burst
      const newBursts: Burst[] = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x,
        y,
      }));
      setBursts((prev) => [...prev, ...newBursts]);
      setTimeout(
        () =>
          setBursts((prev) =>
            prev.filter((b) => !newBursts.find((nb) => nb.id === b.id))
          ),
        1200
      );
    },
    []
  );

  return (
    <div
      className="relative"
      style={{ perspective: "1000px", height: "200px" }}
      role="button"
      tabIndex={0}
      aria-label={`Flip card: ${reason.front.label}`}
      onKeyDown={(e) => e.key === "Enter" && handleClick(e as unknown as React.MouseEvent<HTMLDivElement>)}
    >
      <motion.div
        className="w-full h-full relative cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        onClick={handleClick}
        whileHover={{ scale: 1.04 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-4"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `linear-gradient(135deg, ${reason.color}22, ${reason.color}0d)`,
            border: `1px solid ${reason.color}35`,
            backdropFilter: "blur(20px)",
          }}
        >
          <span className="text-5xl" aria-hidden="true">{reason.front.emoji}</span>
          <p
            className="text-base font-bold text-center"
            style={{ fontFamily: "var(--font-heading)", color: reason.color }}
          >
            {reason.front.label}
          </p>
          <p
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
          >
            Tap to reveal
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-5 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${reason.color}30, ${reason.color}18)`,
            border: `1px solid ${reason.color}50`,
            backdropFilter: "blur(20px)",
            boxShadow: `0 0 30px ${reason.color}22`,
          }}
        >
          <p
            className="text-sm font-bold mb-1"
            style={{ fontFamily: "var(--font-heading)", color: reason.color }}
          >
            {reason.back.title}
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgba(255,245,247,0.72)", fontFamily: "var(--font-body)" }}
          >
            {reason.back.message}
          </p>
          <span className="text-xl mt-1" aria-hidden="true">💖</span>
        </div>
      </motion.div>

      {/* Heart bursts */}
      <AnimatePresence>
        {bursts.map((burst, i) => (
          <motion.span
            key={burst.id + i}
            className="absolute pointer-events-none select-none text-lg z-20"
            style={{ left: burst.x, top: burst.y }}
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.4,
              x: (Math.random() - 0.5) * 60,
              y: -50 - Math.random() * 40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            aria-hidden="true"
          >
            💗
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function ReasonsILoveYou() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="reasons"
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #0d0007 0%, #1a0010 50%, #0d0007 100%)",
      }}
      aria-label="Reasons I love you"
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(8rem,30vw,22rem)] font-black select-none"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#FF6B9D",
            opacity: 0.025,
          }}
        >
          YOU
        </span>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "#ff6b9d", fontFamily: "var(--font-body)" }}
          >
            Endless Reasons
          </p>
          <h2
            className="font-black leading-tight mb-3 text-[clamp(2rem,6vw,4rem)]"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #fff5f7 0%, #ff6b9d 45%, #ffd1dc 80%, #d4a017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Why I Love You
          </h2>
          <p
            className="text-sm mb-5 max-w-md mx-auto"
            style={{ color: "rgba(255,245,247,0.5)", fontFamily: "var(--font-body)" }}
          >
            Flip each card to discover a reason. There are a million — here are just a few.
          </p>
          <div
            className="w-20 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #ff6b9d, #c0385a)" }}
          />
        </motion.div>

        {/* Grid of flip cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
            >
              <FlipCard reason={reason} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
