'use client';

import React, { useRef, useLayoutEffect, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Layers, Cpu, Zap, Shield, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Configuration ---
const DNA_CONFIG = {
    strands: 2,
    totalRungs: 45, // Much higher density for "real" look
    pointsPerStrand: 120, // Smoother curves
    amplitude: 50, // Slightly wider
    frequency: 4, // More twists
    height: 800,
    width: 300
};

const CATEGORIES = [
    {
        id: 'vision',
        title: 'Vision',
        icon: Search,
        philosophy: "Strategic foresight drives impact.",
        details: [
            "Product Strategy",
            "User Experience Mapping",
            "Requirement Analysis",
            "Future Proofing"
        ],
        color: "#6200ea" // Accent Action
    },
    {
        id: 'design',
        title: 'Design',
        icon: Layers,
        philosophy: "Interfaces should feel inevitable.",
        details: [
            "Design Systems",
            "Interaction Design",
            "Visual Hierarchy",
            "Motion Core"
        ],
        color: "#00bcd4" // Accent Highlight
    },
    {
        id: 'engineering',
        title: 'Engineering',
        icon: Cpu,
        philosophy: "Robust systems, elegant code.",
        details: [
            "Full-Stack Architecture",
            "Scalable Patterns",
            "API Design",
            "Database Optimization"
        ],
        color: "#FF00FF" // Magenta
    },
    {
        id: 'optimization',
        title: 'Optimization',
        icon: Zap,
        philosophy: "Speed is a feature.",
        details: [
            "Performance Tuning",
            "Bundle Optimization",
            "Core Web Vitals",
            "Resource Management"
        ],
        color: "#10B981" // Emerald
    },
    {
        id: 'security',
        title: 'Security',
        icon: Shield,
        philosophy: "Trust is built on stability.",
        details: [
            "Auth & Identity",
            "Data Encryption",
            "Penetration Testing",
            "Compliance"
        ],
        color: "#F59E0B" // Amber
    }
];

const ArchitecturalDNA = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const helixRef = useRef<SVGSVGElement>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    // Rotation state for the DNA
    const rotationRef = useRef(0);

    // --- Generator Function for 3D Helix Points ---
    const generateHelix = (rotationOffset: number) => {
        const points = [];
        const allRungs = [];

        // Helix properties
        const strandHeight = DNA_CONFIG.height;
        const rungSpacing = strandHeight / DNA_CONFIG.totalRungs;

        // 1. Generate smooth strands
        for (let s = 0; s < DNA_CONFIG.strands; s++) {
            const strandPoints = [];
            const phase = s * Math.PI; // Phase shift for second strand

            for (let i = 0; i <= DNA_CONFIG.pointsPerStrand; i++) {
                const progress = i / DNA_CONFIG.pointsPerStrand;
                const y = progress * strandHeight;
                // Calculate angle based on y position and total rotation
                // Add extra rotation based on scroll to simulate spinning
                const angle = (progress * Math.PI * DNA_CONFIG.frequency * 2) + rotationOffset + phase;

                // 3D projection to 2D
                // x = sin(angle) * r
                // z = cos(angle) * r (depth)
                const x = Math.sin(angle) * DNA_CONFIG.amplitude;
                const z = Math.cos(angle); // Depth factor for opacity/scale

                strandPoints.push({ x, y, z });
            }
            points.push(strandPoints);
        }

        // 2. Generate ALL Rungs (Base Pairs)
        for (let i = 0; i < DNA_CONFIG.totalRungs; i++) {
            const y = rungSpacing * i + (rungSpacing / 2);
            const progress = i / DNA_CONFIG.totalRungs;

            // Match angle logic from strands
            const angle = (progress * Math.PI * DNA_CONFIG.frequency * 2) + rotationOffset;

            const x1 = Math.sin(angle) * DNA_CONFIG.amplitude;
            const x2 = Math.sin(angle + Math.PI) * DNA_CONFIG.amplitude;
            const depth = Math.cos(angle); // Depth of the front node (-1 to 1)

            // Determine if this rung is a "Category Holder"
            // We have 5 categories, distribute them evenly
            // e.g., if 45 rungs, cats at indices: 7, 14, 21, 28, 35 (approx)
            const segmentSize = DNA_CONFIG.totalRungs / CATEGORIES.length;
            // Use Math.floor to act as an integer index check, ensuring only ONE rung per segment gets it.
            const isCategoryRung = Math.floor(i % segmentSize) === Math.floor(segmentSize / 2);

            allRungs.push({
                id: `rung-${i}`, // Unique ID for React Key
                y,
                x1,
                x2,
                depth,
                isCategory: isCategoryRung,
                category: isCategoryRung ? CATEGORIES[Math.floor(i / segmentSize)] : null
            });
        }

        return { strands: points, rungs: allRungs };
    };

    // Initialize State
    const [helixData, setHelixData] = useState(generateHelix(0));

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Pinning and Rotation
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=300%", // 300vh scroll distance
                pin: true,
                scrub: 0.5, // Slightly softer scrub for "weight"
                onUpdate: (self) => {
                    // Rotate based on scroll progress
                    // Spin consistently
                    const rotation = self.progress * Math.PI * 4; // 2 Full rotations
                    rotationRef.current = rotation;
                    setHelixData(generateHelix(rotation));

                    // Activate categories based on scroll progress
                    // Simple mapping: 0-0.2 = Cat 1, 0.2-0.4 = Cat 2, etc.
                    const catIndex = Math.floor(self.progress * CATEGORIES.length);
                    const safeIndex = Math.min(Math.max(catIndex, 0), CATEGORIES.length - 1);
                    setActiveCategory(CATEGORIES[safeIndex].id);
                }
            });

            // 2. Parallax Background Layers
            gsap.to(".parallax-layer-1", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-[#050505] text-foreground overflow-hidden">

            {/* --- Layer 1: Deep Background --- */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a103c_0%,#050505_100%)] opacity-30" />

            {/* --- Layer 2: Floating Geo Shapes (Parallax) --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden parallax-layer-1">
                <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-accent-action/5 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent-highlight/5 rounded-full blur-3xl mix-blend-screen" />
            </div>

            {/* --- Layer 3: Particles (Simple CSS) --- */}
            <div className="absolute inset-0 opacity-20 pointer-events-none parallax-layer-2">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: Math.random() * 2 + 'px',
                            height: Math.random() * 2 + 'px',
                            animationDuration: `${Math.random() * 5 + 3}s`,
                            opacity: Math.random() * 0.5
                        }}
                    />
                ))}
            </div>

            {/* --- Layer 4: Main Content Container --- */}
            <div ref={containerRef} className="relative w-full h-full flex items-center justify-center z-10">

                {/* Visual Title */}
                <div className="absolute top-10 left-6 md:top-auto md:left-20 md:w-64 z-20 pointer-events-none">
                    <h2 className="text-4xl md:text-7xl font-display font-bold leading-none tracking-tighter opacity-[0.07]">
                        GENETIC<br />CODE
                    </h2>
                </div>


                {/* --- The DNA Helix --- */}
                <div className="relative w-[300px] h-full flex items-center justify-center">
                    <svg
                        ref={helixRef}
                        viewBox={`0 0 ${DNA_CONFIG.width} ${DNA_CONFIG.height}`}
                        className="w-full h-[85%] md:h-[95%] overflow-visible filter drop-shadow-[0_0_15px_rgba(98,0,234,0.15)]"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* 1. Strands (Dual Layer for Glow) */}
                        {helixData.strands.map((strand, sIdx) => (
                            <g key={`strand-${sIdx}`}>
                                {/* Outer Glow Strand */}
                                <path
                                    d={`M ${strand.map(p => `${p.x + DNA_CONFIG.width / 2},${p.y}`).join(' L ')}`}
                                    fill="none"
                                    stroke={`url(#strandGradient-${sIdx})`}
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    className="opacity-20 blur-sm"
                                />
                                {/* Inner Core Strand */}
                                <path
                                    d={`M ${strand.map(p => `${p.x + DNA_CONFIG.width / 2},${p.y}`).join(' L ')}`}
                                    fill="none"
                                    stroke={`url(#strandGradient-${sIdx})`}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    className="opacity-80"
                                />
                            </g>
                        ))}

                        <defs>
                            <linearGradient id="strandGradient-0" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="var(--accent-action)" stopOpacity="0" />
                                <stop offset="20%" stopColor="var(--accent-action)" />
                                <stop offset="80%" stopColor="var(--accent-highlight)" />
                                <stop offset="100%" stopColor="var(--accent-highlight)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="strandGradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="var(--accent-highlight)" stopOpacity="0" />
                                <stop offset="20%" stopColor="var(--accent-highlight)" />
                                <stop offset="80%" stopColor="var(--accent-action)" />
                                <stop offset="100%" stopColor="var(--accent-action)" stopOpacity="0" />
                            </linearGradient>
                            <filter id="glow-node">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* 2. ALL Rungs (Sorted by depth for proper layering simulation?) 
                            Actually simple SVG order is usually enough if we don't have complex overlap.
                            But distinct Z-sorting helps the 3D illusion.
                        */}
                        {helixData.rungs
                            .sort((a, b) => a.depth - b.depth) // Draw back to front
                            .map((rung, i) => {
                                const isActive = rung.isCategory && activeCategory === rung.category?.id;
                                // Z-scale factor
                                const scale = (rung.depth + 1.5) / 2.5; // Range ~0.2 to 1.0
                                const opacity = Math.max(0.1, (rung.depth + 1) / 2);

                                const strokeColor = isActive ? rung.category?.color : (rung.isCategory ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)");
                                // Use thinner lines for non-active rungs for "fine engineering" look
                                const strokeWidth = isActive ? 2 : 0.5;

                                return (
                                    <g key={rung.id} className="transition-colors duration-300">
                                        {/* Connection Line (Split in middle for DNA look) */}
                                        <line
                                            x1={rung.x1 + DNA_CONFIG.width / 2} y1={rung.y}
                                            x2={(rung.x1 + rung.x2) / 2 + DNA_CONFIG.width / 2 - 5} y2={rung.y}
                                            stroke={strokeColor}
                                            strokeWidth={strokeWidth}
                                            strokeOpacity={opacity * (rung.isCategory ? 1 : 0.5)}
                                        />
                                        <line
                                            x1={(rung.x1 + rung.x2) / 2 + DNA_CONFIG.width / 2 + 5} y1={rung.y}
                                            x2={rung.x2 + DNA_CONFIG.width / 2} y2={rung.y}
                                            stroke={strokeColor}
                                            strokeWidth={strokeWidth}
                                            strokeOpacity={opacity * (rung.isCategory ? 1 : 0.5)}
                                        />

                                        {/* Nodes (Only on tips) */}
                                        {rung.isCategory && rung.category && (
                                            <>
                                                {/* Left Node */}
                                                <circle
                                                    cx={rung.x1 + DNA_CONFIG.width / 2} cy={rung.y}
                                                    r={(isActive ? 5 : 2) * scale}
                                                    fill={isActive ? rung.category.color : "white"}
                                                    fillOpacity={opacity}
                                                    filter={isActive ? "url(#glow-node)" : ""}
                                                >
                                                    {isActive && (
                                                        <animate attributeName="r" values={`${5 * scale};${7 * scale};${5 * scale}`} dur="2s" repeatCount="indefinite" />
                                                    )}
                                                </circle>

                                                {/* Right Node */}
                                                <circle
                                                    cx={rung.x2 + DNA_CONFIG.width / 2} cy={rung.y}
                                                    r={(isActive ? 5 : 2) * scale}
                                                    fill={isActive ? rung.category.color : "white"}
                                                    fillOpacity={opacity}
                                                    filter={isActive ? "url(#glow-node)" : ""}
                                                >
                                                    {isActive && (
                                                        <animate attributeName="r" values={`${5 * scale};${7 * scale};${5 * scale}`} dur="2s" repeatCount="indefinite" />
                                                    )}
                                                </circle>
                                            </>
                                        )}
                                    </g>
                                );
                            })}

                    </svg>
                </div>

                {/* --- Layer 5: Detail Panel (Right Side) --- */}
                <AnimatePresence mode='wait'>
                    {activeCategory && (() => {
                        const category = CATEGORIES.find(c => c.id === activeCategory);
                        if (!category) return null;
                        const Icon = category.icon;

                        return (
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className="absolute bottom-0 left-0 right-0 md:top-auto md:bottom-auto md:left-auto md:right-[10%] md:w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-t-3xl md:rounded-2xl shadow-2xl z-50 flex flex-col gap-6"
                                style={{
                                    borderLeft: `4px solid ${category.color}`
                                }}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/5 rounded-lg">
                                            <Icon size={24} color={category.color} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-display font-bold text-white tracking-tight">{category.title}</h3>
                                            <p className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">{category.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Philosophy */}
                                <div className="relative pl-4 border-l-2 border-white/10">
                                    <p className="text-lg italic text-white/80 font-serif leading-relaxed">
                                        "{category.philosophy}"
                                    </p>
                                </div>

                                {/* Detail Points */}
                                <div className="space-y-3 mt-2">
                                    {category.details.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 + 0.2 }}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full ring-2 ring-white/20 group-hover:bg-current transition-colors" style={{ color: category.color }} />
                                            <span className="text-sm text-text-secondary group-hover:text-white transition-colors">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Micro-Interaction / Footer */}
                                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/30 font-mono">
                                    <span>SYS.MOD.{category.id.substring(0, 3).toUpperCase()}</span>
                                    <ChevronRight size={14} className="animate-pulse" />
                                </div>

                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ArchitecturalDNA;
