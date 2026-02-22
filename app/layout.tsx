import type { Metadata, Viewport } from "next";
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
  title: "Mohit Lakhara | MERN Stack Developer & UI/UX Engineer",
  description: "Explore the MERN stack portfolio of Mohit Lakhara – skilled in React.js, Node.js, MongoDB, Express, and UI/UX design. Building clean, performant web apps.",
  authors: [{ name: "Mohit Lakhara" }],
  creator: "Mohit Lakhara",
  metadataBase: new URL('https://mohitlakhara.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mohit Lakhara | MERN Stack Developer Portfolio",
    description: "Discover Mohit's React and Node.js projects, MongoDB integrations, and UI/UX design expertise.",
    url: 'https://mohitlakhara.vercel.app/',
    siteName: 'Mohit Lakhara Portfolio',
    images: [
      {
        url: 'https://mohitlakhara.vercel.app/src/assets/screenshots/home.webp', // Can update this later
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
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

export const viewport: Viewport = {
  themeColor: '#0d1117',
};


import LiquidCanvas from "@/components/LiquidCanvas";
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
        className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable} antialiased transition-colors duration-300`}
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
          <LiquidCanvas />
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
