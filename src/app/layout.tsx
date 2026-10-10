import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday, My Love 💖",
  description:
    "A heartfelt birthday celebration website crafted with love — just for you, my darling.",
  keywords: ["happy birthday", "love", "celebration", "romantic"],
  openGraph: {
    title: "Happy Birthday, My Love 💖",
    description: "A heartfelt birthday celebration website crafted with love.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
