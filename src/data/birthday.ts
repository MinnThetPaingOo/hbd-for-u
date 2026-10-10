import type { BirthdayConfig } from "@/types";

// TODO: set her real date of birth (month is 0-indexed: 0=Jan, 11=Dec)
const BIRTH_DATE = new Date(1998, 10, 12);

export const birthdayConfig: BirthdayConfig = {
  name: "Ngu Wah Lwin", // TODO: replace with her real name
  birthDate: BIRTH_DATE,
  // Next occurrence is computed from month/day of the birth date
  birthday: new Date(new Date().getFullYear(), BIRTH_DATE.getMonth(), BIRTH_DATE.getDate()),
  loveLetterLines: [
    "Dear birthday girl,",
    "",
    "Today the world celebrates the day you arrived in it, and I get to celebrate you. You make every room warmer just by walking into it.",
    "",
    "Over this past year I've watched you grow, laugh, push through the hard days and shine on the good ones. Your smile is the first thing I think about, and your laughter is the soundtrack to my happiest memories.",
    "",
    "I admire how you see the world with such warmth and kindness. I love how passionate you are about the things you care about, and the way you laugh at your own jokes. Even the parts you think are flaws are part of what makes you you.",
    "",
    "My wish for your new year: may it bring you more joy than you can carry, dreams that come true, and people who make you feel as special as you are. You deserve to be celebrated not just today, but every single day.",
    "",
    "Happy Birthday. Today is your day. Make it a wish.",
    "",
    "With all my love,",
    "The one cheering loudest for you 🎂",
  ],
  surpriseMessage: "I have a birthday surprise prepared just for you...",
  surpriseReveal:
    "A day dedicated entirely to YOU — wherever you want to go, whatever you want to do. Today, your every wish is my command. 🎀",
  statsStartDate: new Date(2023, 0, 1), // Customize this to your relationship start date
};

/** Age she turns on (or has most recently turned on) her birthday this year. */
export function getAge(now: Date = new Date()): number {
  const { birthDate } = birthdayConfig;
  let age = now.getFullYear() - birthDate.getFullYear();
  const hadBirthday =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());
  if (!hadBirthday) age -= 1;
  return age;
}
