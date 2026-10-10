"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2 } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────
interface Track {
  id: number;
  title: string;
  artist: string;
  emoji: string;
  color: string;
  src?: string; // put real file path here, e.g. "/music/our-song.mp3"
}

// ─── Playlist ─────────────────────────────────────────────────
const tracks: Track[] = [
  {
    id: 1,
    title: "Our Song",
    artist: "Add your MP3 → /public/music/",
    emoji: "🎵",
    color: "#FF6B9D",
  },
  {
    id: 2,
    title: "Perfect",
    artist: "Drop files in public/music/",
    emoji: "🎶",
    color: "#D4A017",
  },
  {
    id: 3,
    title: "Forever & Always",
    artist: "Update tracks array above",
    emoji: "🎸",
    color: "#C0385A",
  },
];

// ─── Wave bar ─────────────────────────────────────────────────
function WaveBar({ color, playing, i }: { color: string; playing: boolean; i: number }) {
  return (
    <motion.div
      className="w-1 rounded-full"
      style={{ background: color, minHeight: "4px" }}
      animate={
        playing
          ? { height: ["4px", `${12 + (i % 3) * 8}px`, "4px"] }
          : { height: "4px" }
      }
      transition={
        playing
          ? { duration: 0.55, delay: i * 0.07, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
    />
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function MusicPlayer() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const track = tracks[current];

  // Simulated progress (replace with audioRef event listeners when real audio)
  const startFakeProgress = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setCurrent((c) => (c + 1) % tracks.length);
          return 0;
        }
        return p + 0.25;
      });
    }, 150);
  }, []);

  const stopFakeProgress = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  }, []);

  useEffect(() => {
    if (playing) startFakeProgress();
    else stopFakeProgress();
    return stopFakeProgress;
  }, [playing, startFakeProgress, stopFakeProgress]);

  const togglePlay = () => setPlaying((p) => !p);
  const prev = () => { setCurrent((c) => (c - 1 + tracks.length) % tracks.length); setProgress(0); };
  const next = () => { setCurrent((c) => (c + 1) % tracks.length); setProgress(0); };

  const progressPercent = `${progress}%`;

  return (
    <section
      id="music"
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #0d0007 0%, #150a00 60%, #0d0007 100%)",
      }}
      aria-label="Music player"
    >
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
            style={{ color: "#ff6b9d", fontFamily: "var(--font-body)" }}
          >
            Our Soundtrack
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
            Our Playlist
          </h2>
          <p
            className="text-xs max-w-xs mx-auto"
            style={{ color: "rgba(255,245,247,0.45)", fontFamily: "var(--font-body)" }}
          >
            Add .mp3 files to{" "}
            <code className="text-pink-400">/public/music/</code> and update
            the <code className="text-pink-400">tracks</code> array.
          </p>
          <div
            className="w-20 h-0.5 mx-auto rounded-full mt-5"
            style={{ background: "linear-gradient(90deg, #ff6b9d, #c0385a)" }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-[1fr_auto] gap-6 items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.75 }}
        >
          {/* ── Player card ── */}
          <div
            className="rounded-3xl p-5 sm:p-6 md:p-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,107,157,0.1), rgba(192,56,90,0.07))",
              border: "1px solid rgba(255,107,157,0.2)",
              backdropFilter: "blur(10px)",
              boxShadow: playing
                ? `0 0 60px ${track.color}28, 0 12px 40px rgba(0,0,0,0.35)`
                : "0 8px 32px rgba(0,0,0,0.35)",
              transition: "box-shadow 0.5s ease",
            }}
          >
            {/* Vinyl */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="relative rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  width: "clamp(140px, 35vw, 180px)",
                  height: "clamp(140px, 35vw, 180px)",
                  background: `conic-gradient(from 0deg, ${track.color}50, ${track.color}18, ${track.color}50)`,
                  border: `3px solid ${track.color}40`,
                }}
                animate={playing ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  playing
                    ? { duration: 7, repeat: Infinity, ease: "linear" }
                    : { duration: 0.6 }
                }
              >
                {/* Vinyl grooves */}
                {[0.7, 0.5, 0.35].map((s, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-white/10"
                    style={{
                      width: `${s * 100}%`,
                      height: `${s * 100}%`,
                    }}
                    aria-hidden="true"
                  />
                ))}
                {/* Center label */}
                <div
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                  style={{ background: "rgba(10,0,5,0.7)" }}
                >
                  {track.emoji}
                </div>
              </motion.div>
            </div>

            {/* Track info + wave */}
            <div className="text-center mb-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="text-lg md:text-xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {track.title}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}
                  >
                    {track.artist}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Wave visualizer */}
              <div className="flex items-end justify-center gap-0.5 mt-3 h-6">
                {Array.from({ length: 16 }, (_, i) => (
                  <WaveBar key={i} color={track.color} playing={playing} i={i} />
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-5">
              <div
                className="h-2 sm:h-1 rounded-full overflow-hidden cursor-pointer"
                style={{ background: "rgba(255,255,255,0.1)" }}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setProgress(((e.clientX - r.left) / r.width) * 100);
                }}
                role="slider"
                aria-label="Playback progress"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${track.color}, #ffd1dc)`,
                    width: progressPercent,
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              {/* Volume */}
              <button
                id="music-mute-btn"
                onClick={() => setMuted((m) => !m)}
                className="text-white/40 hover:text-white/80 transition-colors p-2.5 -m-1.5 focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              {/* Playback controls */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  id="music-prev-btn"
                  onClick={prev}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-pink-400"
                  aria-label="Previous track"
                >
                  <SkipBack size={18} />
                </button>

                <motion.button
                  id="music-play-btn"
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white border-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  style={{
                    background: `linear-gradient(135deg, ${track.color}, #c0385a)`,
                    boxShadow: playing
                      ? `0 0 30px ${track.color}55`
                      : "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 2 }} />}
                </motion.button>

                <button
                  id="music-next-btn"
                  onClick={next}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-pink-400"
                  aria-label="Next track"
                >
                  <SkipForward size={18} />
                </button>
              </div>

              <Music2 size={18} className="text-white/25" aria-hidden="true" />
            </div>
          </div>

          {/* ── Playlist sidebar ── */}
          <div
            className="md:w-64 rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <p
                className="text-xs tracking-widest uppercase font-semibold"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
              >
                Playlist
              </p>
            </div>

            <div className="p-2">
              {tracks.map((t, i) => (
                <motion.button
                  key={t.id}
                  id={`track-${t.id}`}
                  onClick={() => { setCurrent(i); setProgress(0); setPlaying(true); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-250 border-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-pink-400"
                  style={{
                    background: i === current ? `${t.color}18` : "transparent",
                    borderColor: i === current ? `${t.color}35` : "transparent",
                  }}
                  whileHover={{ x: 3 }}
                  aria-label={`Play ${t.title}`}
                  aria-pressed={i === current}
                >
                  <span className="text-xl flex-shrink-0" aria-hidden="true">{t.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: i === current ? t.color : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {t.title}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
                    >
                      {t.artist}
                    </p>
                  </div>
                  {/* Playing bars */}
                  {i === current && playing && (
                    <div className="flex items-end gap-0.5 h-4 flex-shrink-0">
                      {[0, 1, 2].map((b) => (
                        <motion.div
                          key={b}
                          className="w-0.5 rounded-full"
                          style={{ background: t.color }}
                          animate={{ height: ["3px", "14px", "3px"] }}
                          transition={{
                            duration: 0.5,
                            delay: b * 0.13,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hidden audio element (wired up when you add real src) */}
      {track.src && (
        <audio
          ref={audioRef}
          src={track.src}
          muted={muted}
          loop={false}
          aria-hidden="true"
        />
      )}
    </section>
  );
}
