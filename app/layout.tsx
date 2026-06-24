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
  title: "Mohit Lakhara | 🚀 MERN Developer & UI/UX Engineer",
  description: "v4 Cosmic Cyber Portfolio of Mohit Lakhara. Exploring high-end React, Node.js, and MongoDB architectures through cinematic web experiences.",
  authors: [{ name: "Mohit Lakhara" }],
  creator: "Mohit Lakhara",
  metadataBase: new URL('https://mohitlakhara.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mohit Lakhara | MERN Stack Developer Portfolio v4",
    description: "Discover Mohit's premium React/Node.js architecture and UI/UX design expertise in this cinematic cyber experience.",
    url: 'https://mohitlakhara.vercel.app/',
    siteName: 'Mohit Lakhara Portfolio',
    images: [
      {
        url: 'https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-home.webp',
        width: 1200,
        height: 630,
        alt: 'Mohit Lakhara Portfolio v4 - Cosmic Cyber Edition',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohit Lakhara | MERN Stack Developer Portfolio',
    description: "Explore Mohit Lakhara's full-stack development work with React, Node, MongoDB and Cinematic UI/UX design.",
    images: ['https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-home.webp'],
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
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
    "jobTitle": "MERN Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance & Personal Projects"
    },
    "description": "Mohit Lakhara is a MERN Stack Developer focused on building performant full-stack applications with clean UI/UX and modern web practices."
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
