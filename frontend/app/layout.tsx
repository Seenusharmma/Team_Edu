import type { Metadata } from "next";
import { Signika_Negative } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/providers/LenisProvider";

const signikaNegative = Signika_Negative({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Siksha - AI Powered Education Platform",
  description: "Master concepts faster with AI-powered learning. Save hours of study time and achieve better results with personalized learning.",
  keywords: ["AI education", "learning platform", "study tool", "AI tutoring"],
  openGraph: {
    title: "Siksha - AI Powered Education Platform",
    description: "Master concepts faster with AI-powered learning",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${signikaNegative.className} min-h-full`}>
        <LenisProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
