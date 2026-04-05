import type { Metadata } from "next";
import { Signika_Negative, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/providers/LenisProvider";

const signikaNegative = Signika_Negative({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-source-serif",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Siksha",
  applicationCategory: "EducationApplication",
  operatingSystem: "Web",
  description: "AI-powered education platform for personalized learning",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "Siksha",
    url: "https://siksha.ai",
  },
};

export const metadata: Metadata = {
  title: "Siksha - AI Powered Education Platform",
  description: "Master concepts faster with AI-powered learning. Save hours of study time and achieve better results with personalized learning.",
  keywords: ["AI education", "learning platform", "study tool", "AI tutoring"],
  authors: [{ name: "Siksha" }],
  openGraph: {
    title: "Siksha - AI Powered Education Platform",
    description: "Master concepts faster with AI-powered learning",
    type: "website",
    locale: "en_US",
    url: "https://siksha.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siksha - AI Powered Education Platform",
    description: "Master concepts faster with AI-powered learning",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${signikaNegative.className} ${sourceSerif.variable} min-h-full`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-black/80 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
