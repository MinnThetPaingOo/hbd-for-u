"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import { useConfetti } from "@/hooks/useConfetti";
import ReactConfetti from "react-confetti";
import { Heart } from "lucide-react";
import { birthdayConfig } from "@/data/birthday";

// ─── Floating star ────────────────────────────────────────────
interface Star {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function generateStars(): Star[] {
  const emojis = ["🎈", "🌟", "🎉", "✨", "🎊", "🎁", "🎂", "🎈"];
  return Array.from({ length: 24 }, (_, i) => ({
    id: i,
    emoji: emojis[i % emojis.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 14 + Math.random() * 24,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }));
}

// ─── Cinematic ending lines ───────────────────────────────────
const endingLines = [
  { text: "Here's to you,", delay: 0.2 },
  { text: "to another year,", delay: 0.55 },
  { text: "and all your wishes.", delay: 0.9 },
];

// ─── Main export ─────────────────────────────────────────────
export default function FinalMessage() {
  const [stars] = useState<Star[]>(generateStars);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);
  const { isActive, trigger } = useConfetti(10000);
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  useEffect(() => {
    setMounted(true);
    const update = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      id="final"
      ref={sectionRef}
      className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Final birthday message"
    >
      {/* Confetti */}
      {isActive && mounted && (
        <ReactConfetti
          width={windowSize.w}
          height={windowSize.h}
          colors={["#FF6B9D", "#FFD1DC", "#D4A017", "#F5D788", "#ffffff", "#C0385A", "#ffb6c1"]}
          numberOfPieces={500}
          recycle={false}
          gravity={0.18}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 40, pointerEvents: "none" }}
        />
      )}

      {/* Parallax bg */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: bgScale }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, #4a0025 0%, #220012 40%, #0a0005 100%)",
          }}
        />
        {/* Pink orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "clamp(350px, 60vw, 800px)",
            height: "clamp(350px, 60vw, 800px)",
            top: "-15%",
            left: "-15%",
            background: "radial-gradient(circle, rgba(255,107,157,0.14) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "clamp(300px, 50vw, 650px)",
            height: "clamp(300px, 50vw, 650px)",
            bottom: "-10%",
            right: "-15%",
            background: "radial-gradient(circle, rgba(192,56,90,0.18) 0%, transparent 70%)",
          }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {mounted && stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute"
            style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {s.emoji}
          </motion.span>
        ))}
      </div>

      {/* Pulsing rings */}
      {[180, 320, 460, 600].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border pointer-events-none"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(255,107,157,${0.08 - i * 0.015})`,
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 4, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ))}

      {/* Main content */}
      <div
        ref={ref}
        className="relative z-10 text-center px-5 py-20 max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Pulsing heart — tap for confetti */}
        <motion.button
          onClick={trigger}
          className="text-[64px] sm:text-[80px] md:text-[100px] leading-none mb-6 sm:mb-8 cursor-pointer bg-transparent border-0 outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-full"
          aria-label="Tap to celebrate!"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.18, rotate: 8 }}
          whileTap={{ scale: 0.88 }}
        >
          🎂
        </motion.button>

        {/* Cinematic title — three lines */}
        <div className="mb-6 space-y-1 overflow-hidden">
          {endingLines.map((line, i) => (
            <motion.p
              key={i}
              className="font-black leading-tight text-[clamp(1.75rem,8vw,5rem)]"
              style={{
                fontFamily: "var(--font-heading)",
                background: "linear-gradient(135deg, #fff5f7 0%, #ff6b9d 50%, #ffd1dc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 24px rgba(255,107,157,0.3))",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: line.delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        {/* Sub-heading */}
        <motion.h2
          className="text-[clamp(1.35rem,5.5vw,3rem)] font-bold italic mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            background: "linear-gradient(135deg, #d4a017, #f5d788)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          🎂 Happy Birthday 🎂
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="w-20 h-0.5 rounded-full mb-8"
          style={{ background: "linear-gradient(90deg, #ff6b9d, #c0385a)" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        />

        {/* Message */}
        <motion.p
          className="text-base md:text-lg leading-[1.95] max-w-xl mb-12"
          style={{ color: "rgba(255,245,247,0.65)", fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          {birthdayConfig.name}, I hope this little world I built for you shows
          even a fraction of how special you are. May this new year bring you
          laughter, adventure and everything you wish for. Thank you for being
          you. 🎉
        </motion.p>

        {/* Celebrate button */}
        <motion.button
          id="final-celebrate-btn"
          onClick={trigger}
          className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-base md:text-lg text-white cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          style={{
            background: "linear-gradient(135deg, #ff6b9d 0%, #c0385a 100%)",
            fontFamily: "var(--font-body)",
            boxShadow: "0 0 40px rgba(255,107,157,0.4), 0 4px 20px rgba(0,0,0,0.35)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.9, duration: 0.6 }}
          whileHover={{ scale: 1.07, boxShadow: "0 0 60px rgba(255,107,157,0.6)" }}
          whileTap={{ scale: 0.93 }}
          aria-label="Celebrate again with confetti"
        >
          <Heart size={18} fill="currentColor" aria-hidden="true" />
          Celebrate Again! 🎉
          <Heart size={18} fill="currentColor" aria-hidden="true" />
        </motion.button>

        {/* Footer tagline */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.4 }}
        >
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}
          >
            <span>Made with</span>
            <Heart size={12} fill="#ff6b9d" className="text-pink-400" aria-hidden="true" />
            <span>just for you</span>
          </div>
          <p
            className="text-[11px]"
            style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-body)" }}
          >
            Happy Birthday, {birthdayConfig.name} 🎈
          </p>
        </motion.div>
      </div>
    </section>
  );
}
