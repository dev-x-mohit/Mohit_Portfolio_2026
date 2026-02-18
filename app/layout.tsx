import type { Metadata } from "next";
import { Outfit, Space_Grotesk, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Mohit's Portfolio",
  description: "A modern, professional portfolio showcasing my work.",
};


import LiquidCanvas from "@/components/LiquidCanvas";
import Navbar from "@/components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable} antialiased transition-colors duration-300`}
      >
        <LiquidCanvas />
        <Navbar />
        {children}

        <ThemeToggle />
      </body>
    </html>
  );
}
