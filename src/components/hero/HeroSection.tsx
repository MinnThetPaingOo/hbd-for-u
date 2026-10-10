"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useRef, useState, useCallback } from "react";
import ReactConfetti from "react-confetti";
import { useConfetti } from "@/hooks/useConfetti";

// ─── Types ───────────────────────────────────────────────────
interface FloatingElement {
  id: number;
  emoji: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// ─── Constants ───────────────────────────────────────────────
const BG_EMOJIS = ["💗", "🌸", "✨", "💕", "⭐", "💫", "🌹", "💖", "🌺", "⭐", "🌸", "💓"];

function generateElements(): FloatingElement[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: BG_EMOJIS[i % BG_EMOJIS.length],
    x: Math.random() * 100,
    size: 16 + Math.random() * 28,
    duration: 10 + Math.random() * 14,
    delay: Math.random() * 12,
    opacity: 0.12 + Math.random() * 0.28,
  }));
}

// ─── Stagger variants ────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Component ───────────────────────────────────────────────
export default function HeroSection() {
  const [elements] = useState<FloatingElement[]>(generateElements);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { isActive, trigger } = useConfetti(7000);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const update = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    // Auto-fire confetti after a brief pause
    const t = setTimeout(trigger, 1800);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, [trigger]);

  const scrollDown = useCallback(() => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Birthday hero section"
    >
      {/* ── Confetti ── */}
      {isActive && mounted && (
        <ReactConfetti
          width={windowSize.w}
          height={windowSize.h}
          colors={["#FF6B9D", "#FFD1DC", "#D4A017", "#F5D788", "#ffffff", "#C0385A", "#ffb6c1"]}
          numberOfPieces={320}
          recycle={false}
          gravity={0.22}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 40, pointerEvents: "none" }}
        />
      )}

      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        {/* Deep radial base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, #4a0025 0%, #220012 35%, #0d0007 100%)",
          }}
        />
        {/* Pink orb top-left */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "clamp(300px, 50vw, 700px)",
            height: "clamp(300px, 50vw, 700px)",
            top: "-10%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(255,107,157,0.18) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Rose orb bottom-right */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "clamp(250px, 45vw, 600px)",
            height: "clamp(250px, 45vw, 600px)",
            bottom: "-5%",
            right: "-10%",
            background: "radial-gradient(circle, rgba(192,56,90,0.22) 0%, transparent 70%)",
          }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Gold center glow */}
        <motion.div
          className="absolute rounded-full blur-2xl"
          style={{
            width: "clamp(200px, 35vw, 450px)",
            height: "clamp(200px, 35vw, 450px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── Floating background hearts / sparkles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {mounted && elements.map((el) => (
          <motion.span
            key={el.id}
            className="absolute"
            style={{
              left: `${el.x}%`,
              bottom: "-60px",
              fontSize: el.size,
              opacity: el.opacity,
            }}
            animate={{ y: [0, -(windowSize.h + 120)], rotate: [0, el.id % 2 === 0 ? 25 : -25] }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {el.emoji}
          </motion.span>
        ))}
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-5 py-24 max-w-3xl mx-auto"
        style={{ y: contentY, opacity }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(255,107,157,0.12)",
            border: "1px solid rgba(255,107,157,0.3)",
            color: "#ff6b9d",
            fontFamily: "var(--font-body)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span aria-hidden="true">✨</span>
          A Special Day
          <span aria-hidden="true">✨</span>
        </motion.div>

        {/* Pulsing heart — clickable for confetti */}
        <motion.button
          variants={item}
          onClick={trigger}
          className="text-[80px] md:text-[100px] leading-none mb-6 cursor-pointer bg-transparent border-0 outline-none focus-visible:outline-2 focus-visible:outline-pink-400 focus-visible:outline-offset-4 rounded-full"
          aria-label="Tap to celebrate!"
          whileHover={{ scale: 1.12, rotate: 5 }}
          whileTap={{ scale: 0.88 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            scale: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          💖
        </motion.button>

        {/* Main title */}
        <motion.h1
          variants={item}
          className="font-black leading-[1.1] mb-4 text-[clamp(2.4rem,8vw,5.5rem)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #fff5f7 0%, #ff6b9d 45%, #ffd1dc 80%, #d4a017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 32px rgba(255,107,157,0.35))",
            }}
          >
            Happy Birthday
          </span>
        </motion.h1>

        {/* Type animation sub-title */}
        <motion.div
          variants={item}
          className="text-[clamp(1.3rem,4vw,2.4rem)] font-semibold italic mb-6 min-h-[2.5em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #d4a017, #f5d788)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <TypeAnimation
              sequence={[
                "My Love ❤️", 2400,
                "My Everything 💕", 2400,
                "My Universe ✨", 2400,
                "My Whole Heart 💖", 2400,
              ]}
              speed={42}
              repeat={Infinity}
            />
          </span>
        </motion.div>

        {/* Subtitle copy */}
        <motion.p
          variants={item}
          className="text-[clamp(0.9rem,2.5vw,1.15rem)] leading-[1.9] max-w-[520px] mb-12"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,245,247,0.65)" }}
        >
          Every moment with you is my favorite memory.
          <br />
          Today I celebrate the most beautiful person in my world.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={item}
          id="hero-begin-btn"
          onClick={scrollDown}
          className="relative px-10 py-4 rounded-full font-semibold text-base md:text-lg text-white overflow-hidden cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          style={{
            background: "linear-gradient(135deg, #ff6b9d 0%, #c0385a 100%)",
            fontFamily: "var(--font-body)",
            boxShadow: "0 0 36px rgba(255,107,157,0.42), 0 4px 20px rgba(0,0,0,0.3)",
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 0 56px rgba(255,107,157,0.65), 0 8px 28px rgba(0,0,0,0.3)",
          }}
          whileTap={{ scale: 0.94 }}
          aria-label="Begin our journey — scroll to timeline"
        >
          {/* Shimmer overlay */}
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-200% center", "200% center"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">Begin Our Journey ↓</span>
        </motion.button>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, #ff6b9d, transparent)" }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Decorative corner sparkles */}
      {["✨", "🌟", "💫", "⭐"].map((s, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none text-xl md:text-2xl"
          style={{
            top: ["12%", "75%", "18%", "72%"][i],
            left: ["6%", "8%", "88%", "90%"][i],
          }}
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.9, 0.3], rotate: [0, 20, 0] }}
          transition={{ duration: 3 + i, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {s}
        </motion.span>
      ))}
    </section>
  );
}
