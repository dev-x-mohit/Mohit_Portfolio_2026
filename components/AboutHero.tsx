'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const greetings = [
    { text: "Hello", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "নমস্কার", lang: "Bengali" },
    { text: "నమస్కారం", lang: "Telugu" },
    { text: "नमस्कार", lang: "Marathi" },
    { text: "வணக்கம்", lang: "Tamil" },
    { text: "آداب", lang: "Urdu" },
    { text: "નમસ્તે", lang: "Gujarati" },
    { text: "ನಮಸ್ಕಾರ", lang: "Kannada" },
    { text: "ନମସ୍କାର", lang: "Odia" },
    { text: "നമസ്കാരം", lang: "Malayalam" },
    { text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", lang: "Punjabi" },
    { text: "নমস্কাৰ", lang: "Assamese" },
    { text: "प्रणाम", lang: "Maithili" },
    { text: "ᱡᱚᱦᱟᱨ", lang: "Santali" },
    { text: "سلام", lang: "Kashmiri" },
    { text: "नमस्ते", lang: "Nepali" },
    { text: "سلام", lang: "Sindhi" },
    { text: "नमस्कार", lang: "Konkani" },
    { text: "नमस्ते", lang: "Dogri" },
    { text: "खुलुमबाय", lang: "Bodo" },
    { text: "ꯈꯨꯔꯨꯝꯖꯔꯤ", lang: "Manipuri" },
    { text: "नमो नमः", lang: "Sanskrit" }
];

const AboutHero = () => {
    const [index, setIndex] = useState(0);

    // --- Interactive Mouse Tracking Setup ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement using springs for a fluid, physics-based feel
    const springConfig = { damping: 50, stiffness: 400 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Create opposite movements for different layers to create depth (Parallax)
    const bgTextX = useTransform(smoothX, [-1, 1], [-40, 40]);
    const bgTextY = useTransform(smoothY, [-1, 1], [-40, 40]);

    const orb1X = useTransform(smoothX, [-1, 1], [30, -30]);
    const orb1Y = useTransform(smoothY, [-1, 1], [30, -30]);

    const orb2X = useTransform(smoothX, [-1, 1], [-50, 50]);
    const orb2Y = useTransform(smoothY, [-1, 1], [-50, 50]);

    useEffect(() => {
        // Auto-play the greetings
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % greetings.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Handle mouse movement to update MotionValues
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize mouse coordinates from -1 to 1
        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    // Allow users to click to skip to the next language manually
    const handleGreetingClick = () => {
        setIndex((prev) => (prev + 1) % greetings.length);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-[100svh] w-full flex items-center justify-center bg-background overflow-hidden select-none"
        >

            {/* Ambient Background with Parallax Orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                {/* Subtle Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem'
                    }}
                />

                {/* Glowing Orbs Wrapped in Parallax Containers */}
                <motion.div style={{ x: orb1X, y: orb1Y }} className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.18, 0.12] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[70vw] h-[70vw] bg-[var(--gold-primary)] rounded-full blur-[120px] mix-blend-screen"
                    />
                </motion.div>

                <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute inset-0 flex items-center justify-center translate-x-[20%] -translate-y-[20%]">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="w-[40vw] h-[40vw] bg-[var(--gold-light)] rounded-full blur-[100px] mix-blend-screen"
                    />
                </motion.div>

                {/* Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6">

                {/* Interactive Dynamic Greeting */}
                <motion.button
                    onClick={handleGreetingClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mb-8 md:mb-12 flex flex-col items-center min-h-[120px] justify-end group cursor-pointer"
                    aria-live="polite"
                    aria-label="Click to change language"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center gap-3"
                        >
                            <span className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground drop-shadow-md group-hover:text-[var(--gold-light)] transition-colors duration-300">
                                {greetings[index].text}
                            </span>

                            <div className="flex flex-col items-center gap-2">
                                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[var(--gold-primary)]/50 to-transparent group-hover:w-20 transition-all duration-300" />
                                <span className="text-[10px] md:text-xs font-mono text-text-secondary tracking-[0.2em] uppercase bg-foreground/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-foreground/10 group-hover:border-[var(--gold-primary)]/30 transition-colors duration-300">
                                    {greetings[index].lang}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.button>

                {/* Main Name Display */}
                <div className="relative w-full flex flex-col items-center justify-center py-2 h-[200px] md:h-[300px]">

                    {/* Parallax Outline Background Text */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 0.04, scale: 1 }}
                        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                        aria-hidden="true"
                        style={{
                            WebkitTextStroke: '2px currentColor',
                            color: 'transparent',
                            x: bgTextX,
                            y: bgTextY
                        }}
                        className="absolute whitespace-nowrap text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter pointer-events-none"
                    >
                        MOHIT
                    </motion.div>

                    {/* Solid Foreground Text with Hover Scale */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative text-[3rem] sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-tight flex flex-col items-center z-10 cursor-default"
                    >
                        <span className="text-foreground drop-shadow-[0_4px_24px_rgba(255,255,255,0.05)]">I'M MOHIT</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold-primary)] to-[var(--gold-light)] pb-2 pr-2 hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-500">
                            LAKHARA
                        </span>
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-text-secondary max-w-2xl font-light tracking-wide px-4 leading-relaxed z-10 pointer-events-none"
                >
                    Crafting <span className="text-foreground font-medium italic">immersive digital experiences</span> through bleeding-edge technology and refined design.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                aria-hidden="true"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-text-secondary/20 to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 bg-gradient-to-b from-transparent via-text-secondary/80 to-transparent absolute top-0"
                    />
                </div>
            </motion.div>

        </section>
    );
};

export default AboutHero;