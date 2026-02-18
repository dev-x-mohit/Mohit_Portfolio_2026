'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- Forge Data ---
const PHASES = [
    {
        id: 'vision',
        title: 'VISION',
        subtitle: 'The Clarity',
        philosophy: "Clarity before creation.",
        details: ["Requirement Analysis", "User Journey Mapping", "Product Blueprint"],
        color: "#6200ea" // Purple
    },
    {
        id: 'design',
        title: 'DESIGN',
        subtitle: 'The Blueprint',
        philosophy: "Structure meets intention.",
        details: ["Wireframes", "System Design", "Motion Logic", "Visual Polish"],
        color: "#00bcd4" // Cyan
    },
    {
        id: 'engineering',
        title: 'ENGINEERING',
        subtitle: 'The Core',
        philosophy: "Logic must scale quietly.",
        details: ["Architecture Planning", "API Systems", "State Control"],
        color: "#FF00FF" // Magenta
    },
    {
        id: 'optimization',
        title: 'OPTIMIZATION',
        subtitle: 'The Polish',
        philosophy: "Speed is invisible discipline.",
        details: ["Code Splitting", "Performance Audits", "Lighthouse Tuning"],
        color: "#10B981" // Emerald
    },
    {
        id: 'security',
        title: 'SECURITY',
        subtitle: 'The Shield',
        philosophy: "Systems must endure.",
        details: ["Authentication", "Data Validation", "Deployment Hardening"],
        color: "#F59E0B" // Amber
    }
];

const TOOLS = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Node.js", "Figma", "Git", "MongoDB", "AWS", "Three.js", "Framer Motion"
];

const TheForge = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const objectRef = useRef<HTMLDivElement>(null);
    const [activePhase, setActivePhase] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=350%", // Long scroll for storytelling
                    pin: true,
                    scrub: 1, // Smooth interaction
                    onUpdate: (self) => {
                        // Determine phase based on scroll progress
                        const progress = self.progress;
                        const phaseIndex = Math.min(
                            Math.floor(progress * PHASES.length),
                            PHASES.length - 1
                        );
                        setActivePhase(phaseIndex);
                    }
                }
            });

            // --- Morphing Timeline ---

            // 1. Vision (0-20%): Raw Core
            // Initial state is set in CSS/SVG

            // 2. Vision -> Design (20%): Wireframe Expansion
            tl.to(".morph-path", {
                attr: { d: "M50,10 L90,90 L10,90 Z" }, // Triangle/Pyramid wireframe
                stroke: PHASES[1].color,
                strokeWidth: 1,
                fill: "transparent",
                duration: 1,
                strokeDasharray: "5 5" // Dashed line for wireframe look
            });
            tl.to(".core-glow", {
                boxShadow: `0 0 50px ${PHASES[1].color}`,
                duration: 1
            }, "<");


            // 3. Design -> Engineering (40%): Solid Block
            tl.to(".morph-path", {
                attr: { d: "M10,10 H90 V90 H10 Z" }, // Square/Cube
                stroke: PHASES[2].color,
                strokeWidth: 2,
                fill: `rgba(255, 0, 255, 0.1)`, // Semi-transparent fill
                strokeDasharray: "0 0", // Solid line
                duration: 1
            });
            tl.to(".core-glow", {
                boxShadow: `0 0 50px ${PHASES[2].color}`,
                duration: 1
            }, "<");


            // 4. Engineering -> Optimization (60%): Streamlined Sphere
            tl.to(".morph-path", {
                attr: { d: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10" }, // Circle
                stroke: PHASES[3].color,
                fill: `rgba(16, 185, 129, 0.2)`,
                strokeWidth: 3,
                duration: 1
            });
            tl.to(".core-glow", {
                boxShadow: `0 0 80px ${PHASES[3].color}`,
                duration: 1
            }, "<");


            // 5. Optimization -> Security (80%): Hexagon Shield
            tl.to(".morph-path", {
                attr: { d: "M50,5 L90,25 L90,75 L50,95 L10,75 L10,25 Z" }, // Hexagon
                stroke: PHASES[4].color,
                fill: `rgba(245, 158, 11, 0.3)`,
                strokeWidth: 4,
                duration: 1
            });
            tl.to(".core-glow", {
                boxShadow: `0 0 100px ${PHASES[4].color}`,
                duration: 1
            }, "<");


            // --- Background/Parallax Effects ---
            gsap.to(".bg-particles", {
                y: -100,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: true
                }
            });


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const currentPhase = PHASES[activePhase];

    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-[#060608] text-foreground overflow-hidden flex items-center justify-center">

            {/* Background Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111116_0%,#000000_100%)] z-0" />
            <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] z-0 mix-blend-overlay" />

            {/* Ambient Particles */}
            <div className="bg-particles absolute inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white opacity-10"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: Math.random() * 2 + 'px',
                            height: Math.random() * 2 + 'px',
                        }}
                    />
                ))}
            </div>


            {/* --- The Morphing Object --- */}
            <div className="relative z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">

                {/* Core Glow Container used by GSAP */}
                <div className="core-glow absolute w-32 h-32 rounded-full opacity-50 blur-[50px] transition-colors duration-500"
                    style={{ backgroundColor: currentPhase.color }}
                />

                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-2xl">
                    {/* Base Path that morphs */}
                    <path
                        className="morph-path transition-all duration-300 ease-out"
                        d="M50,45 A5,5 0 1,1 50,55 A5,5 0 1,1 50,45" // Start small (Vision spark)
                        fill="white"
                        stroke="transparent"
                        strokeWidth="0"
                    />
                </svg>

                {/* Object Label (Glitch Text effect placeholder) */}
                <div className="absolute -bottom-12 md:-bottom-20 text-center">
                    <p className="text-xs font-mono tracking-[0.5em] opacity-40 uppercase">System State</p>
                    <h3 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-widest mt-2"
                        style={{ color: currentPhase.color, textShadow: `0 0 20px ${currentPhase.color}40` }}>
                        {currentPhase.title}
                    </h3>
                </div>
            </div>


            {/* --- Detail Panel (Glassmorphism) --- */}
            <div className="absolute bottom-0 w-full md:w-auto md:right-10 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-20 p-6 md:p-0">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentPhase.id}
                        initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="w-full md:w-[400px] bg-[#0c0c0e]/80 backdrop-blur-2xl border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Accent Line */}
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: currentPhase.color }} />

                        <h4 className="text-xs font-mono text-white/50 mb-2 uppercase tracking-widest">
                            Phase 0{activePhase + 1}
                        </h4>
                        <h2 className="text-3xl font-display font-bold text-white mb-1">
                            {currentPhase.subtitle}
                        </h2>

                        <p className="text-lg italic text-white/70 font-serif border-l-2 border-white/10 pl-4 py-2 my-6">
                            "{currentPhase.philosophy}"
                        </p>

                        <div className="space-y-3">
                            {currentPhase.details.map((detail, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentPhase.color }} />
                                    <span className="text-sm font-sans text-white/80">{detail}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Background subtle number */}
                        <div className="absolute -right-4 -bottom-10 text-[150px] font-display font-bold opacity-[0.03] select-none pointer-events-none">
                            {activePhase + 1}
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-20">
                {PHASES.map((phase, i) => (
                    <div key={phase.id} className="group flex items-center gap-4 cursor-pointer"
                        onClick={() => {
                            // Optional: Scroll to that part of the page
                            // (Requires complex calculation or scrollTo plugin, omitting for now to keep simple)
                        }}>
                        <div className={`w-1 h-8 rounded-full transition-all duration-300 ${i === activePhase ? 'bg-white h-12' : 'bg-white/10'}`}
                            style={{ backgroundColor: i === activePhase ? phase.color : undefined }}
                        />
                        {/* Tooltip on hover */}
                        <span className="absolute left-6 px-2 py-1 bg-black/50 backdrop-blur text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity ml-2 whitespace-nowrap">
                            {phase.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* --- Tools Horizontal Slider (Bottom) --- */}
            <div className="absolute bottom-6 left-0 w-full overflow-hidden z-20 py-4 pointer-events-none">
                <style jsx>{`
                    @keyframes slide-left {
                        from { transform: translateX(0); }
                        to { transform: translateX(-25%); }
                    }
                    .tools-slider {
                        display: flex;
                        width: max-content;
                        animation: slide-left 20s linear infinite;
                    }
                `}</style>
                <div className="tools-slider hover:pause">
                    {/* Duplicate list 4 times for seamless infinite loop on large screens */}
                    {[...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS].map((tool, i) => (
                        <div key={i} className="px-4 py-2 mx-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs font-mono tracking-wider text-white/70 whitespace-nowrap">
                            {tool}
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default TheForge;
