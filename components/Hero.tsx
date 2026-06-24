'use client';
import { ArrowRight } from 'iconoir-react';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// ──────────────────────────────────────────────────────────────
// MAIN HERO COMPONENT
// ──────────────────────────────────────────────────────────────

const Hero = () => {
    const [mounted, setMounted] = useState(false);

    // Mouse tracking for subtle text parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(springY, [-1, 1], [3, -3]);
    const rotateY = useTransform(springX, [-1, 1], [-3, 3]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
    };

    return (
        <section
            id="home"
            className="relative min-h-[100svh] w-full bg-transparent flex flex-col items-center justify-center overflow-hidden"
        >

            {/* ─── Overlay Grid ─── */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-0 pointer-events-none mix-blend-overlay" />

            {/* ─── UI Overlay (Centered Layout) ─── */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center py-24 px-6 sm:px-12 pointer-events-none text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center text-center gap-6 w-full max-w-4xl"
                    style={{
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformStyle: 'preserve-3d',
                        perspective: 1000
                    }}
                >


                    {/* ─── Small Top Label ─── */}
                    <motion.div variants={itemVariants} className="flex items-center flex-wrap justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-foreground/70 uppercase mt-4 mb-2">
                        <span>FULL STACK DEVELOPER</span>
                        <span className="text-[var(--gold-primary)]">•</span>
                        <span>NEXT.JS</span>
                        <span className="text-[var(--gold-primary)]">•</span>
                        <span>REACT</span>
                        <span className="text-[var(--gold-primary)]">•</span>
                        <span>NODE.JS</span>
                    </motion.div>

                    {/* ─── Main HTML Title ─── */}
                    <motion.h1
                        variants={itemVariants}
                        className="relative flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 font-black leading-[0.85] tracking-tighter uppercase drop-shadow-2xl z-10 w-full"
                    >
                        {/* Massive background ampersand */}
                        <span
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[3rem] sm:text-[6rem] md:text-[7rem] font-serif italic text-[var(--text-secondary)] opacity-80 select-none pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                            style={{ WebkitTextStroke: '3px black' }}
                        >
                            &
                        </span>

                        <span
                            className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-foreground mix-blend-difference whitespace-nowrap opacity-80"
                            style={{ transform: 'translateX(calc(-50% - 0.4em))' }}
                        >
                            DESIGNING
                        </span>
                        <span
                            className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold-primary)] to-[var(--gold-dark)] whitespace-nowrap opacity-80 pr-2 pb-2"
                            style={{ transform: 'translateX(calc(50% + 0.4em))' }}
                        >
                            DEVELOPING
                        </span>
                    </motion.h1>

                    {/* ─── Subtitles & Credibility ─── */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-5 mt-1 z-10">
                        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide text-foreground text-center " >
                            Building modern SaaS products, AI-powered tools,<br className="hidden sm:block" /> and high-performance web experiences.
                        </h2>

                        {/* Credibility Row */}
                        <div className="flex items-center flex-wrap justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-foreground/80 uppercase px-6 py-3 card-metallic">
                            <span>Freelance Developer</span>
                            <span className="text-[var(--gold-primary)]">•</span>
                            <span>MCA Student @ JECRC</span>
                            <span className="text-[var(--gold-primary)]">•</span>
                            <span>Ex-Fudode</span>
                        </div>
                    </motion.div>

                    {/* Availability Tag */}
                    <motion.div variants={itemVariants} className="flex items-center justify-center mt-0 z-10">
                        <div className="flex items-center gap-2 px-4 py-2 card-metallic border-[var(--gold-primary)]/50">
                            <span className="w-2 h-2 bg-[var(--gold-primary)] animate-pulse" style={{ boxShadow: '0 0 10px var(--gold-primary)' }} />
                            <span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest text-[var(--gold-primary)] uppercase">
                                Available for Internships & Freelance Projects
                            </span>
                        </div>
                    </motion.div>



                    {/* ─── Actions ─── */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-0 pointer-events-auto"
                    >
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group btn-metallic px-8 py-4 flex items-center justify-center gap-3 text-xs"
                        >
                            <span className="relative z-10 flex items-center gap-2 font-bold tracking-widest">
                                EXPLORE PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group btn-secondary flex items-center justify-center gap-3 px-8 py-4 text-xs"
                        >
                            GET IN TOUCH
                            <span className="w-1.5 h-1.5 bg-[var(--gold-primary)] group-hover:scale-150 transition-transform" />
                        </button>
                    </motion.div>
                </motion.div>

                {/* ─── Scroll Down Indicator ─── */}
                <motion.div
                    variants={itemVariants}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40 pointer-events-auto"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-[1px] h-10 bg-gradient-to-b from-[var(--gold-light)] to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;