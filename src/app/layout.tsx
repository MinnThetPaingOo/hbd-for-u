import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0007",
};

export const metadata: Metadata = {
  title: "Happy Birthday! 🎂",
  description: "A birthday celebration website made just for you.",
  keywords: ["happy birthday", "celebration", "surprise"],
  openGraph: {
    title: "Happy Birthday! 🎂",
    description: "A birthday celebration website made just for you.",
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
