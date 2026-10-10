"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useCallback, useEffect, useRef } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────
interface Photo {
  id: number;
  /** Birthday year this card celebrates */
  year: number;
  title: string;
  caption: string;
  emoji: string;
  gradient: string;
  rotation: number;
  /** Up to 3 photos for this year; the first one is the card cover */
  images?: string[];
}

// ─── Data ────────────────────────────────────────────────────
const photos: Photo[] = [
  // TODO: set the real years/captions, and add images (up to 3 per year, e.g.
  // "/photos/2025-1.jpg", files placed in public/photos) to show real photos
  // instead of the emoji.
  {
    id: 1,
    year: 2024,
    title: "Birthday 2024",
    caption: "The first birthday we celebrated 🎂",
    emoji: "🎂",
    gradient: "linear-gradient(135deg, #ff6b9d, #c0385a)",
    rotation: -2.5,
    images: ["/photos/2024-1.jpg", "/photos/2024-2.jpg", "/photos/2024-3.jpg"],
  },
  {
    id: 2,
    year: 2025,
    title: "Birthday 2025",
    caption: "Another year, another wish 🎈",
    emoji: "🎈",
    gradient: "linear-gradient(135deg, #d4a017, #f5d788, #c0385a)",
    rotation: 1.8,
    images: ["/photos/2025-1.jpg", "/photos/2025-2.jpg", "/photos/2025-3.jpg"],
  },
  {
    id: 3,
    year: 2026,
    title: "Birthday 2026",
    caption: "Brighter than ever ✨",
    emoji: "🎉",
    gradient: "linear-gradient(135deg, #2d0054, #7b1fa2, #8b0000)",
    rotation: -1.2,
  },
  // ── Temporarily hidden (uncomment to show more photos) ──
  // {
  //   id: 4,
  //   title: "Your Laughter",
  //   caption: "My favorite sound in the world 😂",
  //   emoji: "😂",
  //   gradient: "linear-gradient(135deg, #ff6b9d, #ffd1dc, #ff6b9d)",
  //   rotation: 2.8,
  // },
  // {
  //   id: 5,
  //   title: "Adventures Together",
  //   caption: "Every new place is better with you 🌍",
  //   emoji: "🗺️",
  //   gradient: "linear-gradient(135deg, #1a6b3d, #2d9b60, #1a4b2d)",
  //   rotation: -3.1,
  // },
  // {
  //   id: 6,
  //   title: "Cozy Moments",
  //   caption: "Home is wherever you are ☕",
  //   emoji: "☕",
  //   gradient: "linear-gradient(135deg, #6b3a1f, #c0725a, #8b4513)",
  //   rotation: 1.4,
  // },
  // {
  //   id: 7,
  //   title: "Dancing in the Rain",
  //   caption: "We never needed sunshine ☔",
  //   emoji: "💃",
  //   gradient: "linear-gradient(135deg, #1a3a7b, #2d6bbf, #0d2255)",
  //   rotation: -2.0,
  // },
  // {
  //   id: 8,
  //   title: "Celebrating You",
  //   caption: "Every day should be your day 🎉",
  //   emoji: "🎊",
  //   gradient: "linear-gradient(135deg, #c0385a, #ff6b9d, #d4a017)",
  //   rotation: 2.2,
  // },
];

// ─── Polaroid card ───────────────────────────────────────────
function PolaroidCard({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: (p: Photo) => void;
}) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer group"
      initial={{ opacity: 0, y: 60, rotate: photo.rotation }}
      animate={inView ? { opacity: 1, y: 0, rotate: photo.rotation } : {}}
      transition={{
        duration: 0.65,
        delay: (index % 4) * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.07,
        rotate: 0,
        zIndex: 20,
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onOpen(photo)}
      aria-label={`View memory: ${photo.title}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(photo)}
    >
      {/* Polaroid wrapper */}
      <div
        className="rounded-sm overflow-hidden"
        style={{
          background: "#fff5f7",
          padding: "10px 10px 36px 10px",
          boxShadow:
            "0 6px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        {/* Photo area */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            paddingBottom: "100%",
            background: photo.gradient,
          }}
        >
          {photo.images?.[0] ? (
            <PhotoImage src={photo.images[0]} alt={photo.title} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl" aria-hidden="true">
                {photo.emoji}
              </span>
            </div>
          )}

          {/* Year badge */}
          <span
            className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{
              background: "rgba(13,0,7,0.7)",
              color: "#f5d788",
              fontFamily: "var(--font-heading)",
              backdropFilter: "blur(6px)",
            }}
          >
            {photo.year}
          </span>

          {/* Always-visible zoom hint */}
          <span
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(13,0,7,0.7)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
            }}
            aria-hidden="true"
          >
            <ZoomIn size={16} className="text-white" />
          </span>

          {/* Zoom icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
            <ZoomIn
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
              size={28}
            />
          </div>
        </div>

        {/* Caption */}
        <p
          className="text-center text-xs mt-2 px-1 truncate"
          style={{
            fontFamily: "var(--font-body)",
            color: "#3d1020",
            fontWeight: 500,
          }}
        >
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Image with shimmer skeleton ──────────────────────────────
// Sources already fetched/decoded this session. Starting from "loaded" for these
// avoids flashing the (bright) skeleton for a frame before a cached photo appears.
const loadedSrcs = new Set<string>();

function PhotoImage({ src, alt }: { src: string; alt: string }) {
  const [wasCached] = useState(() => loadedSrcs.has(src));
  const [loaded, setLoaded] = useState(wasCached);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can finish loading before React attaches onLoad
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      loadedSrcs.add(src);
      setLoaded(true);
    }
  }, [src]);

  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0 skeleton-shimmer flex items-center justify-center"
          aria-hidden="true"
        >
          <Heart size={28} className="text-pink-200/60 animate-pulse" fill="currentColor" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        decoding="async"
        onLoad={() => {
          loadedSrcs.add(src);
          setLoaded(true);
        }}
        className={`absolute inset-0 w-full h-full object-cover ${
          wasCached ? "" : "transition-opacity duration-500"
        }`}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────
function Lightbox({
  photo,
  onClose,
}: {
  photo: Photo;
  onClose: () => void;
}) {
  const images = photo.images ?? [];
  const [index, setIndex] = useState(0);
  const multi = images.length > 1;
  const onPrev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const onNext = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (!multi) return;
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [multi, onPrev, onNext, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,0,5,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing memory: ${photo.title}`}
    >
      <motion.div
        className="relative w-full"
        style={{ maxWidth: "min(24rem, calc(100svh - 11rem))" }}
        initial={{ scale: 0.75, rotate: photo.rotation, y: 40 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        exit={{ scale: 0.75, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Polaroid enlarged */}
        <div
          className="rounded-sm overflow-hidden"
          style={{
            background: "#fff5f7",
            padding: "12px 12px 52px 12px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: "100%",
              paddingBottom: "100%",
              background: photo.gradient,
            }}
          >
            {images[index] ? (
              <PhotoImage
                key={images[index]}
                src={images[index]}
                alt={photo.title}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="text-7xl" aria-hidden="true">{photo.emoji}</span>
              </div>
            )}

            {/* Prev / next */}
            {multi && (["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                onClick={dir === "prev" ? onPrev : onNext}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  dir === "prev" ? "left-2" : "right-2"
                } w-10 h-10 rounded-full flex items-center justify-center border-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-pink-400`}
                style={{
                  background: "rgba(13,0,7,0.55)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
                }}
                aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
              >
                {dir === "prev" ? (
                  <ChevronLeft size={20} className="text-white" />
                ) : (
                  <ChevronRight size={20} className="text-white" />
                )}
              </button>
            ))}

            {/* Position dots */}
            {multi && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                {images.map((src, i) => (
                  <span
                    key={src}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: i === index ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="text-center px-2 mt-3">
            <p
              className="text-base font-bold mb-1"
              style={{ fontFamily: "var(--font-heading)", color: "#3d1020" }}
            >
              {photo.title}
            </p>
            <p
              className="text-xs"
              style={{ fontFamily: "var(--font-body)", color: "#8b3050" }}
            >
              {photo.caption}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-11 h-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-pink-400"
          style={{
            background: "linear-gradient(135deg, #ff6b9d, #c0385a)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
          aria-label="Close lightbox"
        >
          <X size={16} className="text-white" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function MemoryGallery() {
  const [selected, setSelected] = useState<Photo | null>(null);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const handleOpen = useCallback((p: Photo) => setSelected(p), []);
  const handleClose = useCallback(() => setSelected(null), []);

  // Warm the browser cache so switching photos in the lightbox is instant
  useEffect(() => {
    photos.forEach((p) =>
      p.images?.forEach((src) => {
        const img = new window.Image();
        img.decoding = "async";
        img.onload = () => {
          // decode() so the first paint in the lightbox doesn't stall
          img.decode().catch(() => {}).finally(() => loadedSrcs.add(src));
        };
        img.src = src;
      })
    );
  }, []);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #0d0007 0%, #200010 50%, #0d0007 100%)",
      }}
      aria-label="Memory gallery"
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,107,157,0.05) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 44 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "#ff6b9d", fontFamily: "var(--font-body)" }}
          >
            Year by Year
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
            Moments to Celebrate
          </h2>
          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: "rgba(255,245,247,0.55)", fontFamily: "var(--font-body)" }}
          >
            Every birthday we&apos;ve celebrated, and the one still to come.
            Tap any photo to enlarge it.
          </p>
          <div
            className="w-20 h-0.5 mx-auto rounded-full mt-5"
            style={{ background: "linear-gradient(90deg, #ff6b9d, #c0385a)" }}
          />
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5 md:gap-8 max-w-[17rem] sm:max-w-3xl mx-auto">
          {photos.map((photo, i) => (
            <div key={photo.id}>
              <PolaroidCard photo={photo} index={i} onOpen={handleOpen} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox photo={selected} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
