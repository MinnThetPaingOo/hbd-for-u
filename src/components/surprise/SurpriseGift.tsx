"use client";

import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import { useConfetti } from "@/hooks/useConfetti";
import { birthdayConfig } from "@/data/birthday";

// ─── Stages ───────────────────────────────────────────────────
type Stage = "idle" | "shaking" | "opening" | "revealed";

const ROMANTIC_QUOTE =
  "\"You are my today and all of my tomorrows.\" — Leo Christopher";

// ─── Gift box SVG ─────────────────────────────────────────────
function GiftBox({ stage }: { stage: Stage }) {
  const lidControls = useAnimationControls();

  useEffect(() => {
    if (stage === "shaking") {
      lidControls.start({
        rotate: [0, -6, 6, -6, 6, 0],
        transition: { duration: 0.6, repeat: 2 },
      });
    }
    if (stage === "opening") {
      lidControls.start({
        y: -60,
        rotate: -30,
        opacity: 0,
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }
  }, [stage, lidControls]);

  return (
    <div className="relative select-none" style={{ width: 160, height: 180 }} aria-hidden="true">
      {/* Box body */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-b-xl"
        style={{
          height: 110,
          background: "linear-gradient(160deg, rgba(255,107,157,0.22), rgba(192,56,90,0.15))",
          border: "2px solid rgba(255,107,157,0.4)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Ribbon vertical */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full"
          style={{ background: "linear-gradient(to bottom, #ff6b9d, #c0385a)" }}
        />
      </div>

      {/* Lid */}
      <motion.div
        animate={lidControls}
        className="absolute top-0 left-0 right-0 rounded-t-xl flex items-center justify-center"
        style={{
          height: 70,
          background: "linear-gradient(160deg, rgba(255,107,157,0.32), rgba(192,56,90,0.22))",
          border: "2px solid rgba(255,107,157,0.5)",
          backdropFilter: "blur(16px)",
          transformOrigin: "center bottom",
        }}
      >
        {/* Bow */}
        <span className="text-4xl">🎀</span>
        {/* Ribbon horizontal on lid */}
        <div
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: "linear-gradient(to right, #ff6b9d, #c0385a)" }}
        />
      </motion.div>

      {/* Ribbon horizontal on body */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 60,
          height: "5px",
          background: "linear-gradient(to right, #ff6b9d, #c0385a, #ff6b9d)",
        }}
      />

      {/* Glow */}
      {stage === "shaking" && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{ boxShadow: ["0 0 0 0 rgba(255,107,157,0)", "0 0 40px 8px rgba(255,107,157,0.35)", "0 0 0 0 rgba(255,107,157,0)"] }}
          transition={{ duration: 0.8, repeat: 2 }}
        />
      )}
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function SurpriseGift() {
  const [stage, setStage] = useState<Stage>("idle");
  const { isActive, trigger } = useConfetti(9000);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const handleClick = () => {
    if (stage === "idle") {
      setStage("shaking");
      setTimeout(() => setStage("opening"), 1400);
      setTimeout(() => {
        setStage("revealed");
        trigger();
      }, 2000);
    }
  };

  return (
    <section
      id="surprise"
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #0d0007 0%, #1a0820 60%, #0d0007 100%)",
      }}
      aria-label="Surprise gift section"
    >
      {isActive && (
        <ReactConfetti
          width={typeof window !== "undefined" ? window.innerWidth : 1200}
          height={typeof window !== "undefined" ? window.innerHeight : 800}
          colors={["#FF6B9D", "#FFD1DC", "#D4A017", "#F5D788", "#ffffff", "#C0385A"]}
          numberOfPieces={420}
          recycle={false}
          gravity={0.2}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 40, pointerEvents: "none" }}
        />
      )}

      {/* Ambient orb */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,107,157,0.07) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative w-full max-w-3xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "#ff6b9d", fontFamily: "var(--font-body)" }}
          >
            Just For You
          </p>
          <h2
            className="font-black leading-tight mb-5 text-[clamp(2rem,6vw,4rem)]"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #fff5f7 0%, #ff6b9d 45%, #ffd1dc 80%, #d4a017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Surprise 🎁
          </h2>
          <div
            className="w-20 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #ff6b9d, #c0385a)" }}
          />
        </motion.div>

        {/* Center content */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {stage !== "revealed" ? (
              /* Gift box button */
              <motion.div
                key="gift"
                className="flex flex-col items-center gap-8"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.5, y: -40 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.button
                  id="surprise-gift-btn"
                  onClick={handleClick}
                  disabled={stage !== "idle"}
                  className="relative cursor-pointer bg-transparent border-0 outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-xl"
                  animate={
                    stage === "idle"
                      ? { y: [0, -14, 0] }
                      : {}
                  }
                  transition={
                    stage === "idle"
                      ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                      : {}
                  }
                  aria-label="Open your surprise gift"
                >
                  <GiftBox stage={stage} />
                </motion.button>

                <AnimatePresence mode="wait">
                  {stage === "idle" && (
                    <motion.div
                      key="cta"
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p
                        className="text-sm mb-1"
                        style={{ color: "rgba(255,245,247,0.55)", fontFamily: "var(--font-body)" }}
                      >
                        {birthdayConfig.surpriseMessage}
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: "var(--font-body)",
                          background: "linear-gradient(135deg, #ff6b9d, #c0385a)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        Tap the gift box to unwrap 🎁
                      </p>
                    </motion.div>
                  )}
                  {stage === "shaking" && (
                    <motion.p
                      key="shaking"
                      className="text-sm"
                      style={{ color: "rgba(255,245,247,0.6)", fontFamily: "var(--font-body)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Something special is inside... ✨
                    </motion.p>
                  )}
                  {stage === "opening" && (
                    <motion.p
                      key="opening"
                      className="text-sm"
                      style={{ color: "rgba(255,245,247,0.6)", fontFamily: "var(--font-body)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Opening... 🎀
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Revealed message */
              <motion.div
                key="revealed"
                className="w-full max-w-xl"
                initial={{ opacity: 0, scale: 0.6, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <div
                  className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,107,157,0.14), rgba(212,160,23,0.09))",
                    border: "1px solid rgba(255,107,157,0.28)",
                    backdropFilter: "blur(28px)",
                    boxShadow: "0 0 80px rgba(255,107,157,0.2)",
                  }}
                >
                  {/* Floating emojis */}
                  {["🎉", "✨", "💖", "🌟", "🎊", "💫"].map((e, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-2xl pointer-events-none select-none"
                      style={{
                        top: `${[8, 18, 12, 78, 70, 80][i]}%`,
                        left: `${[4, 88, 50, 4, 88, 50][i]}%`,
                      }}
                      animate={{ y: [0, -18, 0], rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 2.5 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      aria-hidden="true"
                    >
                      {e}
                    </motion.span>
                  ))}

                  <motion.div
                    className="text-7xl mb-5"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
                  >
                    🎁
                  </motion.div>

                  <motion.h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{
                      fontFamily: "var(--font-heading)",
                      background: "linear-gradient(135deg, #ff6b9d, #c0385a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Your Gift, My Love! 🎀
                  </motion.h3>

                  <motion.p
                    className="text-base md:text-lg leading-relaxed mb-6"
                    style={{ color: "rgba(255,245,247,0.8)", fontFamily: "var(--font-body)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {birthdayConfig.surpriseReveal}
                  </motion.p>

                  <motion.p
                    className="text-sm italic"
                    style={{ color: "rgba(212,160,23,0.8)", fontFamily: "var(--font-heading)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    {ROMANTIC_QUOTE}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
