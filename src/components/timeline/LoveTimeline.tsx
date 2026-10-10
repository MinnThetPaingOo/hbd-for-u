"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

// ─── Types ───────────────────────────────────────────────────
interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

// ─── Data ────────────────────────────────────────────────────
const events: TimelineEvent[] = [
  {
    id: 1,
    date: "The Day You Arrived",
    title: "A Star Was Born",
    description:
      "On this day, the world gained someone extraordinary. Everything good that came after started with you arriving in it.",
    emoji: "👶",
    color: "#FF6B9D",
  },
  {
    id: 2,
    date: "Growing Up",
    title: "Becoming You",
    description:
      "Every year shaped your kindness, your humor and your strength. The person you are today is something to be proud of.",
    emoji: "🌱",
    color: "#C0385A",
  },
  {
    id: 3,
    date: "This Past Year",
    title: "Your Best Moments",
    description:
      "The laughs, the wins, the adventures and even the tough days you got through. You handled all of it with grace.",
    emoji: "🌟",
    color: "#D4A017",
  },
  {
    id: 4,
    date: "Right Now",
    title: "Exactly Who You Are",
    description:
      "Warm, brave, funny and wonderfully yourself. Not one thing about you needs to change.",
    emoji: "🎈",
    color: "#FFD1DC",
  },
  {
    id: 5,
    date: "Today",
    title: "Happy Birthday! 🎂",
    description:
      "Today is all about you: your laughter, your heart and your spirit. Here's to a new year full of everything you wish for.",
    emoji: "🎂",
    color: "#F5D788",
  },
];

// ─── Timeline growing line ────────────────────────────────────
function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
      style={{ background: "rgba(255,107,157,0.12)" }}
      aria-hidden="true"
    >
      <motion.div
        className="w-full h-full origin-top rounded-full"
        style={{
          scaleY,
          background: "linear-gradient(to bottom, #ff6b9d, #c0385a, #d4a017)",
        }}
      />
    </div>
  );
}

// ─── Single timeline card ────────────────────────────────────
function TimelineCard({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 mb-16 md:mb-20 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Card */}
      <div className={`w-full md:w-[46%] ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
        <motion.div
          className="p-5 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden group cursor-default"
          style={{
            background: "rgba(255,255,255,0.055)",
            border: `1px solid ${event.color}30`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: `0 8px 32px rgba(0,0,0,0.25)`,
          }}
          whileHover={{
            scale: 1.025,
            boxShadow: `0 0 40px ${event.color}28, 0 8px 32px rgba(0,0,0,0.3)`,
            borderColor: `${event.color}55`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Top row */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-3xl" aria-hidden="true">{event.emoji}</span>
            <span
              className="text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{
                background: `${event.color}18`,
                color: event.color,
                border: `1px solid ${event.color}35`,
                fontFamily: "var(--font-body)",
              }}
            >
              {event.date}
            </span>
          </div>

          <h3
            className="text-xl md:text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading)", color: event.color }}
          >
            {event.title}
          </h3>

          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,245,247,0.65)" }}
          >
            {event.description}
          </p>

          {/* Hover shine */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
            }}
          />
        </motion.div>
      </div>

      {/* Center node */}
      <div className="hidden md:flex w-[8%] justify-center relative z-10">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
          style={{
            background: `linear-gradient(135deg, ${event.color}40, ${event.color}20)`,
            border: `2px solid ${event.color}55`,
            backdropFilter: "blur(12px)",
          }}
          animate={{
            boxShadow: [
              `0 0 0 0 ${event.color}40`,
              `0 0 0 14px ${event.color}00`,
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity }}
          aria-hidden="true"
        >
          {event.emoji}
        </motion.div>
      </div>

      {/* Spacer (opposite side) */}
      <div className="hidden md:block w-[46%]" />
    </motion.div>
  );
}

// ─── Section header ──────────────────────────────────────────
function SectionHeader() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className="text-center mb-16 md:mb-20"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <p
        className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
        style={{ color: "#ff6b9d", fontFamily: "var(--font-body)" }}
      >
        Your Story
      </p>
      <h2
        className="font-black leading-tight mb-5 text-[clamp(2rem,6vw,4rem)]"
        style={{
          fontFamily: "var(--font-heading)",
          background:
            "linear-gradient(135deg, #fff5f7 0%, #ff6b9d 45%, #ffd1dc 80%, #d4a017 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Another Year of You
      </h2>
      <div
        className="w-20 h-0.5 mx-auto rounded-full"
        style={{ background: "linear-gradient(90deg, #ff6b9d, #c0385a)" }}
      />
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function LoveTimeline() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #0d0007 0%, #1a0010 50%, #0d0007 100%)",
      }}
      aria-label="Our love story timeline"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,107,157,0.04) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-5xl mx-auto px-5 md:px-8"
      >
        <SectionHeader />

        {/* Timeline wrapper */}
        <div className="relative">
          <TimelineLine />
          {events.map((event, i) => (
            <TimelineCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
