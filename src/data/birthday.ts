import type { BirthdayConfig } from "@/types";

// TODO: set her real date of birth (month is 0-indexed: 0=Jan, 11=Dec)
const BIRTH_DATE = new Date(1998, 10, 12);

export const birthdayConfig: BirthdayConfig = {
  name: "Ngu Wah Lwin", // TODO: replace with her real name
  birthDate: BIRTH_DATE,
  // Next occurrence is computed from month/day of the birth date
  birthday: new Date(new Date().getFullYear(), BIRTH_DATE.getMonth(), BIRTH_DATE.getDate()),
  loveLetterLines: [
    "ချစ်ရတဲ့ မွေးနေ့ပိုင်ရှင်လေးရေ၊",
    "",
    "ဒီနေ့ဟာ မင်း ဒီကမ္ဘာကြီးထဲ ရောက်လာတဲ့နေ့ကို ကမ္ဘာကြီးက ကျင်းပတဲ့နေ့ပါ။ မင်းကို ကျွန်တော် ဂုဏ်ပြုခွင့်ရတာ ကျွန်တော့်အတွက် ကံကောင်းမှုပါပဲ။ မင်းဝင်လာရုံနဲ့ အခန်းတိုင်း နွေးထွေးသွားတတ်တယ်။",
    "",
    "ပြီးခဲ့တဲ့ တစ်နှစ်တာအတွင်း မင်း ရင့်ကျက်လာတာ၊ ရယ်မောတာ၊ ခက်ခဲတဲ့ရက်တွေကို ကျော်ဖြတ်တာနဲ့ ကောင်းတဲ့ရက်တွေမှာ ထွန်းလင်းတောက်ပတာတွေကို ကျွန်တော် ကြည့်နေခဲ့တယ်။ မင်းရဲ့ အပြုံးက ကျွန်တော် ပထမဆုံး သတိရတဲ့အရာပါ၊ မင်းရဲ့ ရယ်သံက ကျွန်တော့်အပျော်ဆုံး မှတ်ဉာဏ်တွေရဲ့ နောက်ခံတေးသံပါပဲ။",
    "",
    "ကမ္ဘာကြီးကို နွေးထွေးမှုနဲ့ ကြင်နာမှုနဲ့ ကြည့်တတ်တဲ့ မင်းကို ကျွန်တော် လေးစားတယ်။ မင်းဂရုစိုက်တဲ့အရာတွေအတွက် စိတ်အားထက်သန်တာနဲ့ ကိုယ့်ဟာသကို ကိုယ်တိုင်ရယ်တတ်တာတွေကိုလည်း ချစ်တယ်။ မင်းက အားနည်းချက်လို့ ထင်တဲ့အပိုင်းတွေတောင် မင်းကို မင်းဖြစ်စေတဲ့ အစိတ်အပိုင်းတွေပါပဲ။",
    "",
    "မင်းရဲ့ နှစ်သစ်အတွက် ကျွန်တော့်ဆုတောင်းက - ဆောင်ယူလို့မကုန်နိုင်လောက်အောင် ပျော်ရွှင်မှုတွေ၊ ပြည့်ဝလာမယ့် အိပ်မက်တွေ၊ မင်းကို မင်းရှိသလောက် အထူးအဆန်းကောင်းတယ်လို့ ခံစားစေမယ့် လူတွေ ရရှိပါစေ။ မင်းဟာ ဒီနေ့တစ်ရက်တည်းမဟုတ်ဘဲ နေ့တိုင်း ဂုဏ်ပြုခံထိုက်တဲ့သူပါ။",
    "",
    "မွေးနေ့မင်္ဂလာပါ။ ဒီနေ့က မင်းရဲ့နေ့ပါ။ ဆုတောင်းလိုက်ပါ။",
    "",
    "ချစ်စိတ်အပြည့်နဲ့၊",
    "မင်းကို အကျယ်ဆုံး အားပေးနေသူ 🎂",
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
