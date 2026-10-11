"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

// ─── Letter content ───────────────────────────────────────────
const letterLines = [
  { text: "Happy Birthday ပါ ကလေး‌လေးရေ..", type: "salutation" },
  { text: "", type: "space" },
  {
    text: "သဲနဲ့ ဆုံခွင့်ရပြီး ချစ်ခွင့်ရနေတာက ကိုယ့်ရဲ့ ကံအကောင်းဆုံး လက်ဆောင်တစ်ခုပါပဲ။ ပင်ပန်းတဲ့နေ့တွေမှာ သဲရဲ့ စကားသံလေးပဲဖြစ်ဖြစ်၊ အပြုံးလေးပဲဖြစ်ဖြစ် မြင်လိုက်ရုံနဲ့ အရာအားလုံး အဆင်ပြေသွားသလို ခံစားရတယ်။ ကိုယ့်ကို အမြဲ နားလည်ပေးပြီး အခုအချိန်အထိ ဘေးနားမှာ ရှိပေးလို ကျေးဇူးတင်တယ်နော်။",
    type: "body",
  },
  { text: "", type: "space" },
  {
    text: "ဒီနေ့ကစပြီး နောင်နှစ်ပေါင်းများစွာအထိ သဲဖြစ်ချင်တဲ့ ဆန္ဒတွေ အကုန်ပြည့်ပါစေ။ ရယ်မောသံတွေနဲ့ပဲ နေ့ရက်တိုင်းကို ဖြတ်သန်းခွင့်ရပါစေ။ သဲ ပျော်နေတဲ့အချိန်မှာရော၊ ပင်ပန်းဝမ်းနည်း‌နေတဲ့ အချိန်မှာပါ သဲလက်ကို တင်းတင်းဆုပ်ပြီး အမြဲဘေးမှာ ရှိနေပေးမယ့်သူက ကိုယ်ပဲ ဖြစ်ပါစေနော်။",
    type: "body",
  },
  { text: "", type: "space" },
  { text: "ချစ်တယ် ကလေးရေ... မွေးနေ့မှာ အရမ်းပျော်ပါစေ။", type: "body" },
];

// ─── Envelope ─────────────────────────────────────────────────
function Envelope({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-[min(18rem,82vw)] md:w-96 h-52 md:h-64 cursor-pointer border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      aria-label="Open the love letter"
    >
      {/* Envelope body */}
      <div
        className="absolute inset-0 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(212,160,23,0.14) 0%, rgba(245,215,136,0.07) 100%)",
          border: "1px solid rgba(212,160,23,0.32)",
          backdropFilter: "blur(10px)",
          boxShadow: hovered
            ? "0 0 60px rgba(212,160,23,0.28), 0 12px 40px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(0,0,0,0.35)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Envelope flap */}
        <div
          className="absolute top-0 left-0 right-0 rounded-t-2xl"
          style={{
            height: "48%",
            background: "linear-gradient(160deg, rgba(212,160,23,0.2), rgba(245,215,136,0.1))",
            borderBottom: "1px solid rgba(212,160,23,0.18)",
          }}
          aria-hidden="true"
        />
        {/* Wax seal */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-3"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: "linear-gradient(135deg, #c0385a, #ff6b9d)",
              boxShadow: hovered
                ? "0 0 30px rgba(255,107,157,0.55)"
                : "0 0 16px rgba(255,107,157,0.3)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            💌
          </div>
          <p
            className="text-xs font-medium tracking-wide"
            style={{
              color: "rgba(245,215,136,0.75)",
              fontFamily: "var(--font-body)",
            }}
          >
            Tap to open
          </p>
        </motion.div>
      </div>
    </motion.button>
  );
}

// ─── Letter body ─────────────────────────────────────────────
function LetterBody() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        className="rounded-3xl p-5 sm:p-7 md:p-12"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(212,160,23,0.22)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 12px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Decorative top divider */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-px flex-1 rounded-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(212,160,23,0.4))" }}
          />
          <span className="text-xl" aria-hidden="true">💌</span>
          <div
            className="h-px flex-1 rounded-full"
            style={{ background: "linear-gradient(to left, transparent, rgba(212,160,23,0.4))" }}
          />
        </div>

        {/* Letter lines */}
        <div className="space-y-3">
          {letterLines.map((line, i) => {
            if (line.type === "space") return <div key={i} className="h-2" />;

            return (
              <motion.p
                key={i}
                className={
                  line.type === "salutation"
                    ? "text-xl font-bold"
                    : line.type === "signature"
                    ? "text-base font-semibold"
                    : line.type === "closing"
                    ? "text-base text-white/70 italic"
                    : "text-[15px] md:text-base leading-[1.85] md:leading-[1.95] text-white/75"
                }
                style={{
                  fontFamily: "var(--font-myanmar), var(--font-body)",
                  color:
                    line.type === "salutation"
                      ? "#d4a017"
                      : line.type === "signature"
                      ? "#ff6b9d"
                      : undefined,
                }}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
              >
                {line.text}
              </motion.p>
            );
          })}
        </div>

        {/* Bottom divider */}
        <div className="flex items-center gap-3 mt-8">
          <div
            className="h-px flex-1 rounded-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,107,157,0.35))" }}
          />
          <span className="text-lg" aria-hidden="true">💖</span>
          <div
            className="h-px flex-1 rounded-full"
            style={{ background: "linear-gradient(to left, transparent, rgba(255,107,157,0.35))" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function LoveLetter() {
  const [opened, setOpened] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  // Close the letter when "Celebrate Again!" is pressed
  useEffect(() => {
    const close = () => setOpened(false);
    window.addEventListener("celebrate-again", close);
    return () => window.removeEventListener("celebrate-again", close);
  }, []);

  return (
    <section
      id="letter"
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #0d0007 0%, #1a0510 60%, #0d0007 100%)",
      }}
      aria-label="Love letter section"
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.05) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl mx-auto px-5 md:px-8">
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
            style={{ color: "#d4a017", fontFamily: "var(--font-body)" }}
          >
            Just For You
          </p>
          <h2
            className="font-black leading-tight mb-5 text-[clamp(2rem,6vw,4rem)]"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #d4a017 0%, #f5d788 50%, #d4a017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            A Birthday Letter
          </h2>
          {!opened && (
            <p
              className="text-sm"
              style={{ color: "rgba(255,245,247,0.5)", fontFamily: "var(--font-body)" }}
            >
              I wrote this just for you. Tap the envelope to read it.
            </p>
          )}
          <div
            className="w-20 h-0.5 mx-auto rounded-full mt-5"
            style={{ background: "linear-gradient(90deg, #d4a017, #c0385a)" }}
          />
        </motion.div>

        {/* Envelope / Letter */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div key="env" exit={{ opacity: 0, scale: 0.85, y: -30 }}>
                <Envelope onClick={() => setOpened(true)} />
              </motion.div>
            ) : (
              <motion.div key="letter" className="w-full">
                <LetterBody />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
