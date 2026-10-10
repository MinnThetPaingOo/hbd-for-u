"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// ─── Lazy-loaded components ───────────────────────────────────
const LoadingScreen = dynamic(
  () => import("@/components/loading/LoadingScreen"),
  { ssr: false }
);
const FloatingHearts = dynamic(
  () => import("@/components/common/FloatingHearts"),
  { ssr: false }
);
const Sparkles = dynamic(() => import("@/components/common/Sparkles"), {
  ssr: false,
});

// ─── Section imports (client) ─────────────────────────────────
import HeroSection from "@/components/hero/HeroSection";
import LoveTimeline from "@/components/timeline/LoveTimeline";
import MemoryGallery from "@/components/gallery/MemoryGallery";
import LoveLetter from "@/components/letter/LoveLetter";
import ReasonsILoveYou from "@/components/reasons/ReasonsILoveYou";
import BirthdayCountdown from "@/components/countdown/BirthdayCountdown";
import MusicPlayer from "@/components/music/MusicPlayer";
import SurpriseGift from "@/components/surprise/SurpriseGift";
import FinalMessage from "@/components/ending/FinalMessage";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {/* ── Loading screen ────────────────────────────────── */}
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      {/* ── Ambient background particles (always present) ─ */}
      {!loading && (
        <>
          <FloatingHearts />
          <Sparkles />
        </>
      )}

      {/* ── Main content ──────────────────────────────────── */}
      <main
        className={loading ? "opacity-0 pointer-events-none" : "opacity-100"}
        style={{ transition: "opacity 0.5s ease" }}
        id="main-content"
      >
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Love Timeline */}
        <LoveTimeline />

        {/* 3. Memory Gallery */}
        <MemoryGallery />

        {/* 4. Love Letter */}
        <LoveLetter />

        {/* 5. Reasons I Love You */}
        <ReasonsILoveYou />

        {/* 6. Birthday Countdown */}
        <BirthdayCountdown />

        {/* 7. Music Player */}
        <MusicPlayer />

        {/* 8. Surprise Gift */}
        <SurpriseGift />

        {/* 9. Final Message */}
        <FinalMessage />
      </main>
    </>
  );
}
