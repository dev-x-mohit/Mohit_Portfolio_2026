"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundSystem() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Layer 1: Hero Gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Layer 2: Subtle Geometric Line Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(225, 193, 122, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225, 193, 122, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Layer 3: Tiny Animated Particles */}
      <div className="absolute inset-0 opacity-[0.04]">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[var(--gold-primary)]"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
            }}
          />
        ))}
      </div>

      {/* Glowing orbs removed per request for a simple linear gradient bg */}
    </div>
  );
}
