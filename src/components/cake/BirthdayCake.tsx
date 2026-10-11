"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useConfetti } from "@/hooks/useConfetti";

const MAX_CANDLES = 5;

export default function BirthdayCake() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });
  const { isActive, trigger } = useConfetti(8000);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);
  const [lit, setLit] = useState<boolean[]>(Array(MAX_CANDLES).fill(true));

  useEffect(() => {
    setMounted(true);
    const update = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Relight the candles when "Celebrate Again!" is pressed
  useEffect(() => {
    const relightAll = () => setLit(Array(MAX_CANDLES).fill(true));
    window.addEventListener("celebrate-again", relightAll);
    return () => window.removeEventListener("celebrate-again", relightAll);
  }, []);

  const allOut = lit.every((l) => !l);

  const blow = (index: number) => {
    if (!lit[index]) return;
    const next = lit.map((l, i) => (i === index ? false : l));
    setLit(next);
    if (next.every((l) => !l)) trigger();
  };

  const relight = () => setLit(Array(MAX_CANDLES).fill(true));

  return (
    <section
      id="cake"
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #0d0007 0%, #1c0512 50%, #0d0007 100%)",
      }}
      aria-label="Make a wish and blow out the candles"
    >
      {isActive && mounted && (
        <ReactConfetti
          width={windowSize.w}
          height={windowSize.h}
          colors={["#FF6B9D", "#FFD1DC", "#D4A017", "#F5D788", "#ffffff", "#C0385A", "#7dd3fc"]}
          numberOfPieces={400}
          recycle={false}
          gravity={0.2}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 40, pointerEvents: "none" }}
        />
      )}

      <div ref={ref} className="relative w-full max-w-2xl mx-auto px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "#d4a017", fontFamily: "var(--font-body)" }}
          >
            Make a Wish
          </p>
          <h2
            className="font-black leading-tight mb-4 text-[clamp(2rem,6vw,4rem)]"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #d4a017 0%, #f5d788 50%, #d4a017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Happy Birthday!
          </h2>
          <p
            className="text-base md:text-lg mb-12 max-w-md mx-auto leading-[2.1]"
            style={{ color: "rgba(255,245,247,0.75)", fontFamily: "var(--font-body)" }}
          >
            မျက်လုံးမှိတ်ပြီး ဆုတောင်းလိုက်ပါ၊ ပြီးရင် ဖယောင်းတိုင်တွေကို နှိပ်ပြီး မှုတ်လိုက်ပါ။
          </p>
        </motion.div>

        {/* Cake */}
        <motion.div
          className="relative mx-auto flex flex-col items-center"
          style={{ width: "clamp(220px, 60vw, 320px)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          {/* Candles */}
          <div className="flex items-end justify-center gap-1 sm:gap-3 mb-[-2px] z-10">
            {lit.map((isLit, i) => (
              <button
                key={i}
                onClick={() => blow(i)}
                aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
                className="relative flex flex-col items-center bg-transparent border-0 px-2 py-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
              >
                <div className="h-7 flex items-end justify-center">
                  <AnimatePresence>
                    {isLit && (
                      <motion.span
                        key="flame"
                        className="text-2xl leading-none block"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.15, 0.95, 1.1, 1], rotate: [-4, 4, -3, 3, -4] }}
                        exit={{ scale: 0, opacity: 0, y: -10, transition: { duration: 0.3 } }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        aria-hidden="true"
                      >
                        🔥
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!isLit && (
                    <motion.span
                      className="text-sm leading-none block opacity-60"
                      initial={{ opacity: 0.8, y: 0 }}
                      animate={{ opacity: 0, y: -22 }}
                      transition={{ duration: 1.4 }}
                      aria-hidden="true"
                    >
                      💨
                    </motion.span>
                  )}
                </div>
                <div
                  className="w-2.5 h-9 rounded-sm"
                  style={{
                    background:
                      i % 2 === 0
                        ? "repeating-linear-gradient(45deg,#ff6b9d 0 6px,#ffd1dc 6px 12px)"
                        : "repeating-linear-gradient(45deg,#7dd3fc 0 6px,#e0f2fe 6px 12px)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Frosting + tiers */}
          <div
            className="w-[70%] h-6 rounded-t-2xl"
            style={{ background: "linear-gradient(180deg,#fff5f7,#ffd1dc)" }}
          />
          <div
            className="w-[85%] h-14"
            style={{ background: "linear-gradient(180deg,#ff6b9d,#c0385a)" }}
          />
          <div
            className="w-full h-16 rounded-b-3xl"
            style={{
              background: "linear-gradient(180deg,#f5d788,#d4a017)",
              boxShadow: "0 0 50px rgba(212,160,23,0.3)",
            }}
          />
          <div
            className="w-[115%] h-2 rounded-full mt-1"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
        </motion.div>

        {/* Result / actions */}
        <div className="mt-12 min-h-[96px]">
          <AnimatePresence mode="wait">
            {allOut ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p
                  className="text-lg sm:text-xl md:text-2xl font-bold mb-4 px-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#f5d788",
                  }}
                >
                  🎉 ဆုတောင်းတိုင်း ပြည့်ပါစေ! 🎉
                </p>
                <button
                  onClick={relight}
                  className="px-6 py-3 rounded-full text-sm cursor-pointer border"
                  style={{
                    background: "transparent",
                    borderColor: "rgba(255,107,157,0.4)",
                    color: "#ff6b9d",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ဖယောင်းတိုင်တွေကို မီးထပ်ညှိမယ်
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
