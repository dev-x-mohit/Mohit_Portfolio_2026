import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, Fira_Code, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Mohit Lakhara | Full Stack Developer & UI/UX Engineer",
  description: "Portfolio of Mohit Lakhara — Full Stack Developer specializing in React, Next.js, Node.js, and React Native. Building production-grade SaaS, mobile apps, and cinematic web experiences.",
  authors: [{ name: "Mohit Lakhara" }],
  creator: "Mohit Lakhara",
  metadataBase: new URL('https://mohitlakhara.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mohit Lakhara | Full Stack Developer Portfolio",
    description: "Explore Mohit Lakhara's portfolio — production-grade web & mobile apps built with React, Next.js, Node.js, PostgreSQL, and React Native.",
    url: 'https://mohitlakhara.vercel.app/',
    siteName: 'Mohit Lakhara Portfolio',
    images: [
      {
        url: 'https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-home.webp',
        width: 1200,
        height: 630,
        alt: 'Mohit Lakhara — Full Stack Developer Portfolio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohit Lakhara | Full Stack Developer Portfolio',
    description: "Explore Mohit Lakhara's full-stack development work — SaaS apps, mobile apps, and cinematic UI/UX built with React, Next.js, and Node.js.",
    images: ['https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-home.webp'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

// Removed hardcoded viewport themeColor to allow theme switching

import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohit Lakhara",
    "url": "https://mohitlakhara.vercel.app/",
    "sameAs": [
      "https://github.com/mohitlakhara-ind",
      "https://linkedin.com/in/mohitlakhara-ind"
    ],
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance & Personal Projects"
    },
    "description": "Mohit Lakhara is a Full Stack Developer building production-grade web and mobile applications with React, Next.js, Node.js, and React Native."
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${firaCode.variable} ${orbitron.variable} antialiased transition-colors duration-300 overflow-x-hidden`}
      >
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-D9MHVXCNQ2`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D9MHVXCNQ2', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Navbar />
          <GlobalProvider>
            {children}
            <Footer />
          </GlobalProvider>
        </SmoothScroll>

        <ThemeToggle />
      </body>
    </html>
  );
}
