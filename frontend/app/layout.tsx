import type { Metadata } from "next";
import "./globals.css";
import BarbaProvider from "@/components/common/BarbaProvider";

export const metadata: Metadata = {
  title: "Siksha-Ai powerd education platform",
  description: "Siksha-Ai powerd education platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <BarbaProvider>{children}</BarbaProvider>
      </body>
    </html>
  );
}
