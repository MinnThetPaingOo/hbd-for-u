"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
}

interface LoadingScreenProps {
  onComplete: () => void;
}

// ─── Constants ───────────────────────────────────────────────
const EMOJIS = ["💗", "💕", "✨", "🌸", "💖", "⭐", "💫", "🌹"];
const PARTICLE_COUNT = 18;
const LOAD_DURATION_MS = 3200;

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    emoji: EMOJIS[i % EMOJIS.length],
    size: 14 + Math.random() * 22,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
  }));
}

// ─── Component ───────────────────────────────────────────────
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [particles] = useState<Particle[]>(generateParticles);
  const [messageIdx, setMessageIdx] = useState(0);

  const messages = [
    "Loading Our Memories...",
    "Filling the air with love...",
    "Almost ready, my darling...",
  ];

  const handleComplete = useCallback(() => {
    setPhase("done");
    const t = setTimeout(onComplete, 700);
    return () => clearTimeout(t);
  }, [onComplete]);

  // Progress ticker
  useEffect(() => {
    const step = 100 / (LOAD_DURATION_MS / 30);
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + step;
        if (next >= 100) {
          clearInterval(id);
          handleComplete();
          return 100;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(id);
  }, [handleComplete]);

  // Rotating messages
  useEffect(() => {
    const id = setInterval(
      () => setMessageIdx((i) => (i + 1) % messages.length),
      1100
    );
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, #3d0020 0%, #1a0010 45%, #0a0005 100%)",
          }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] }}
          aria-label="Loading screen"
          role="status"
          aria-live="polite"
        >
          {/* ── Ambient rings ── */}
          {[280, 420, 560].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: size,
                height: size,
                borderColor: `rgba(255,107,157,${0.08 - i * 0.02})`,
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 3.5,
                delay: i * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ── Floating particles ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  fontSize: p.size,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.15, 0.7, 0.15],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {p.emoji}
              </motion.span>
            ))}
          </div>

          {/* ── Main heart ── */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
          >
            {/* Glow behind heart */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: "rgba(255,107,157,0.35)" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="relative text-[88px] md:text-[108px] leading-none"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              💖
            </motion.span>
          </motion.div>

          {/* ── Title ── */}
          <motion.h1
            className="text-3xl md:text-5xl font-black text-center px-6 mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #fff5f7 20%, #ff6b9d 60%, #ffd1dc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Happy Birthday
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl font-semibold italic mb-10 px-6"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #d4a017, #f5d788)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            My Love 💕
          </motion.p>

          {/* ── Progress bar ── */}
          <div className="w-56 sm:w-72 space-y-3 px-4">
            <div
              className="h-[3px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #ff6b9d, #c0385a, #d4a017)",
                  width: `${progress}%`,
                }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Rotating message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIdx}
                className="text-center text-xs tracking-wide"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,245,247,0.45)",
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {messages[messageIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Screen reader text */}
          <span className="sr-only">
            Loading, {Math.round(progress)}% complete
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
