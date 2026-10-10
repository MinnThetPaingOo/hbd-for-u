// ─── Timeline ─────────────────────────────────────────────────
export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

// ─── Memory Gallery ──────────────────────────────────────────
export interface Memory {
  id: number;
  title: string;
  caption: string;
  emoji: string;
  gradient: string;
  imageSrc?: string; // optional real photo path
}

// ─── Reasons ─────────────────────────────────────────────────
export interface Reason {
  id: number;
  number: string;
  title: string;
  description: string;
  emoji: string;
}

// ─── Birthday Config ─────────────────────────────────────────
export interface BirthdayConfig {
  name: string;
  birthday: Date;
  birthDate: Date; // full date of birth, used to compute age and stats
  loveLetterLines: string[];
  surpriseMessage: string;
  surpriseReveal: string;
  statsStartDate: Date;
}

// ─── Heart Particle ──────────────────────────────────────────
export interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// ─── Sparkle ─────────────────────────────────────────────────
export interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}
