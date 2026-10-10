import type { BirthdayConfig } from "@/types";

export const birthdayConfig: BirthdayConfig = {
  name: "My Love",
  // Set your girlfriend's birthday here (month is 0-indexed: 0=Jan, 11=Dec)
  birthday: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
  loveLetterLines: [
    "My darling,",
    "",
    "On this beautiful day, I want you to know how incredibly special you are to me. You have changed my life in the most wonderful ways — ways I never even knew were possible.",
    "",
    "Every morning I wake up grateful that you are in my life. Your smile is the first thing I think about, and your laughter is the soundtrack to my happiest memories. You make even the most ordinary days feel extraordinary.",
    "",
    "I love how you see the world with such warmth and kindness. I love how passionate you are about the things you care about. I love the way you laugh at your own jokes. I love every single thing about you — even the parts you think are flaws, because to me they are just more reasons to love you.",
    "",
    "You deserve every happiness in the world. You deserve to be celebrated not just today, but every single day. And I promise to spend every day showing you just how much you mean to me.",
    "",
    "Happy Birthday, my love. Today is your day. You are my greatest adventure, my safest place, my favorite person.",
    "",
    "Forever yours,",
    "The one who loves you most 💖",
  ],
  surpriseMessage: "I have a special surprise prepared just for you...",
  surpriseReveal:
    "A day dedicated entirely to YOU — wherever you want to go, whatever you want to do. Today, your every wish is my command. 🎀",
  statsStartDate: new Date(2023, 0, 1), // Customize this to your relationship start date
};
