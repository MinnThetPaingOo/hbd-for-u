"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { birthdayConfig, getAge } from "@/data/birthday";

// ─── Helpers ─────────────────────────────────────────────────
function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1000),
  };
}

function getNextBirthday(bd: Date): Date {
  const now = new Date();
  const next = new Date(now.getFullYear(), bd.getMonth(), bd.getDate());
  if (next <= now) next.setFullYear(now.getFullYear() + 1);
  return next;
}

function isTodayBirthday(bd: Date): boolean {
  const now = new Date();
  return now.getDate() === bd.getDate() && now.getMonth() === bd.getMonth();
}

function daysBetween(a: Date, b: Date) {
  return Math.max(0, Math.floor((b.getTime() - a.getTime()) / 864e5));
}

// ─── Flip number digit ───────────────────────────────────────
function FlipDigit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative overflow-hidden rounded-xl flex items-center justify-center"
        style={{
          width: "clamp(58px, 18vw, 96px)",
          height: "clamp(66px, 20vw, 108px)",
          background: "linear-gradient(160deg, rgba(255,107,157,0.16), rgba(192,56,90,0.10))",
          border: "1px solid rgba(255,107,157,0.28)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 28px rgba(255,107,157,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={str}
            className="font-black leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.9rem, 6vw, 3rem)",
              background: "linear-gradient(135deg, #fff5f7, #ff6b9d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ y: -28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {str}
          </motion.span>
        </AnimatePresence>
        {/* Center fold line */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: "50%",
            height: "1px",
            background: "rgba(0,0,0,0.3)",
          }}
          aria-hidden="true"
        />
      </div>
      <span
        className="text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold"
        style={{ color: "rgba(255,255,255,0.42)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Love stats ───────────────────────────────────────────────
function StatCard({
  emoji,
  value,
  label,
  inView,
}: {
  emoji: string;
  value: number;
  label: string;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-5 rounded-2xl h-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
      }}
      whileHover={{ scale: 1.06, borderColor: "rgba(255,107,157,0.3)" }}
      transition={{ duration: 0.25 }}
    >
      <span className="text-3xl" aria-hidden="true">{emoji}</span>
      <span
        className="text-xl sm:text-2xl md:text-3xl font-black break-all text-center"
        style={{
          fontFamily: "var(--font-heading)",
          background: "linear-gradient(135deg, #ff6b9d, #c0385a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        aria-label={`${value} ${label}`}
      >
        {inView ? (
          <CountUp
            end={value}
            duration={2.2}
            separator=","
            suffix="+"
            enableScrollSpy
            scrollSpyDelay={150}
          />
        ) : (
          "0+"
        )}
      </span>
      <span
        className="text-xs tracking-wide text-center leading-snug"
        style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function BirthdayCountdown() {
  const { birthday, birthDate } = birthdayConfig;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isToday, setIsToday] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const daysAlive = daysBetween(birthDate, new Date());
  const stats = [
    { emoji: "🎂", value: getAge(), label: "Years of You" },
    { emoji: "🌍", value: daysAlive, label: "Days of Being Awesome" },
    { emoji: "⏰", value: daysAlive * 24, label: "Hours of Shining" },
    { emoji: "🎈", value: getAge(), label: "Birthdays Worth Celebrating" },
  ];

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      setIsToday(isTodayBirthday(birthday));
      setTimeLeft(getTimeLeft(getNextBirthday(birthday)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [birthday]);

  if (!mounted) return null;

  return (
    <section
      id="countdown"
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #0d0007 0%, #200515 50%, #0d0007 100%)",
      }}
      aria-label="Birthday countdown and age statistics"
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative w-full max-w-4xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "#d4a017", fontFamily: "var(--font-body)" }}
          >
            Celebrating You
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
            {isToday ? "🎂 Today Is Your Day!" : "Birthday Countdown"}
          </h2>
          <div
            className="w-20 h-0.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #d4a017, #c0385a)" }}
          />
        </motion.div>

        {/* Countdown or Birthday message */}
        <motion.div
          className="flex justify-center mb-14"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {isToday ? (
            <div
              className="text-center p-6 sm:p-8 md:p-12 rounded-3xl max-w-md w-full"
              style={{
                background: "rgba(255,107,157,0.1)",
                border: "1px solid rgba(255,107,157,0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.div
                className="text-7xl mb-4"
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                aria-label="Birthday cake"
              >
                🎂
              </motion.div>
              <h3
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "linear-gradient(135deg, #ff6b9d, #c0385a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🎉 Happy Birthday 🎉
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(255,245,247,0.6)", fontFamily: "var(--font-body)" }}
              >
                The most magical day of the year is finally here!
              </p>
            </div>
          ) : (
            <div
              className="flex justify-center gap-2 sm:gap-3 md:gap-5"
              role="timer"
              aria-label="Time until next birthday"
            >
              {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                <FlipDigit
                  key={unit}
                  value={timeLeft[unit]}
                  label={unit}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Love stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
            >
              <StatCard {...s} inView={inView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
