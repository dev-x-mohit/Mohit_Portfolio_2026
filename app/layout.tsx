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
  title: "Mohit Lakhara | Full Stack Developer & Open Source Contributor",
  description: "Portfolio of Mohit Lakhara — Full Stack Developer & Open Source Contributor specializing in React, Next.js, Node.js, and TypeScript. Building production-grade SaaS, open-source tools like OptiKit, and cinematic web experiences.",
  authors: [{ name: "Mohit Lakhara" }],
  creator: "Mohit Lakhara",
  metadataBase: new URL('https://mohitlakhara.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mohit Lakhara | Full Stack Developer & Open Source Contributor",
    description: "Explore Mohit Lakhara's portfolio — production-grade web apps & open-source tools built with React, Next.js, Node.js, PostgreSQL, and TypeScript.",
    url: 'https://mohitlakhara.vercel.app/',
    siteName: 'Mohit Lakhara Portfolio',
    images: [
      {
        url: 'https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782579876/portfolio/og-home.webp',
        width: 1200,
        height: 630,
        alt: 'Mohit Lakhara — Full Stack Developer & Open Source Contributor',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohit Lakhara | Full Stack Developer & Open Source Contributor',
    description: "Explore Mohit Lakhara's full-stack development work — SaaS apps, open-source tools, and cinematic UI/UX built with React, Next.js, and TypeScript.",
    images: ['https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782579876/portfolio/og-home.webp'],
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
      "https://github.com/dev-x-mohit",
      "https://linkedin.com/in/dev-x-mohit"
    ],
    "jobTitle": "Full Stack Developer & Open Source Contributor",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance & Open Source"
    },
    "description": "Mohit Lakhara is a Full Stack Developer & Open Source Contributor building production-grade web applications and open-source tools with React, Next.js, Node.js, and TypeScript. Creator of OptiKit, an open-source utility library on NPM."
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
