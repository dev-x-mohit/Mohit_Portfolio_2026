'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useGlobalData } from '@/context/GlobalContext';

const SkillsShowcase = () => {
    const { skills: skillCategories } = useGlobalData();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    // Radii for the 4 orbits
    const orbits = [
        { radius: 130, duration: 35, direction: 1 },  // Inner
        { radius: 210, duration: 45, direction: -1 },
        { radius: 290, duration: 55, direction: 1 },
        { radius: 370, duration: 65, direction: -1 }, // Outer
    ];

    return (
        <section ref={ref} className="relative w-full bg-background py-24 px-4 overflow-hidden min-h-[700px] md:min-h-[900px] flex flex-col items-center justify-center">
            <style>{`
                @keyframes spin-forward {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-backward {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
            `}</style>
            {/* Header */}
            <div className="absolute top-12 md:top-24 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4">
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="block text-xs font-bold uppercase tracking-[0.5em] text-accent-action mb-3"
                >
                    Full Stack
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black font-display tracking-tighter mb-4"
                >
                    Cosmic <span className="text-accent-action italic">Core</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-text-secondary text-sm md:text-base max-w-xl mx-auto"
                >
                    Hover over nodes to inspect system telemetry.
                </motion.p>
            </div>

            {/* Orbital System Container (scaled for responsiveness) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="relative flex items-center justify-center w-[800px] h-[800px] mt-32 md:mt-10 origin-center scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100"
            >
                {/* Central Core */}
                <div className="absolute w-32 h-32 rounded-full bg-accent-action/10 border border-accent-action/30 shadow-[0_0_80px_var(--accent-action)] flex items-center justify-center z-10 backdrop-blur-sm">
                    <div className="w-20 h-20 rounded-full bg-accent-action/20 border border-accent-action/50 flex items-center justify-center animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-accent-action shadow-[0_0_30px_var(--accent-action)]" />
                    </div>
                </div>

                {/* Orbits */}
                {skillCategories.map((category, catIndex) => {
                    const orbitConf = orbits[catIndex % orbits.length];
                    const numSkills = category.skills.length;
                    const isOrbitHovered = category.skills.some(s => s.name === hoveredSkill);

                    return (
                        <div
                            key={category.name}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            {/* Orbit Ring */}
                            <div
                                className="absolute rounded-full border border-white/10"
                                style={{
                                    width: orbitConf.radius * 2,
                                    height: orbitConf.radius * 2,
                                    borderColor: `${category.color}20`
                                }}
                            />

                            {/* Orbiting Container */}
                            <div
                                className="absolute w-full h-full flex items-center justify-center"
                                style={{
                                    animationName: orbitConf.direction === 1 ? 'spin-forward' : 'spin-backward',
                                    animationDuration: `${orbitConf.duration}s`,
                                    animationTimingFunction: 'linear',
                                    animationIterationCount: 'infinite',
                                    animationPlayState: isOrbitHovered ? 'paused' : 'running'
                                }}
                            >
                                {category.skills.map((skill, skillIndex) => {
                                    const angle = (skillIndex / numSkills) * 360;
                                    const angleRad = (angle * Math.PI) / 180;
                                    const x = (Math.cos(angleRad) * orbitConf.radius).toFixed(4);
                                    const y = (Math.sin(angleRad) * orbitConf.radius).toFixed(4);

                                    return (
                                        <div
                                            key={skill.name}
                                            className="absolute pointer-events-auto"
                                            style={{
                                                transform: `translate(${x}px, ${y}px)`,
                                            }}
                                            onMouseEnter={() => setHoveredSkill(skill.name)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                        >
                                            {/* Counter-rotate to keep nodes upright */}
                                            <div
                                                style={{
                                                    animationName: orbitConf.direction === 1 ? 'spin-backward' : 'spin-forward',
                                                    animationDuration: `${orbitConf.duration}s`,
                                                    animationTimingFunction: 'linear',
                                                    animationIterationCount: 'infinite',
                                                    animationPlayState: isOrbitHovered ? 'paused' : 'running'
                                                }}
                                                className="relative group cursor-pointer"
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-full flex items-center justify-center bg-background/80 backdrop-blur-md border transition-all duration-300"
                                                    style={{
                                                        borderColor: hoveredSkill === skill.name ? category.color : `${category.color}40`,
                                                        boxShadow: hoveredSkill === skill.name ? `0 0 20px ${category.color}80` : 'none',
                                                        transform: hoveredSkill === skill.name ? 'scale(1.2)' : 'scale(1)',
                                                        zIndex: hoveredSkill === skill.name ? 50 : 10
                                                    }}
                                                >
                                                    <span className="text-2xl">{skill.icon}</span>
                                                </div>

                                                {/* Tooltip */}
                                                <div
                                                    className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 whitespace-nowrap bg-card/95 backdrop-blur-xl border rounded-lg px-3 py-2 pointer-events-none transition-all duration-300
                                                        ${hoveredSkill === skill.name ? 'opacity-100 translate-y-0 z-50' : 'opacity-0 -translate-y-2 -z-10'}`}
                                                    style={{ borderColor: `${category.color}50` }}
                                                >
                                                    <p className="text-sm font-bold text-foreground mb-1">{skill.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-1.5 w-20 bg-border/30 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full transition-all duration-500 ease-out"
                                                                style={{
                                                                    background: category.color,
                                                                    width: hoveredSkill === skill.name ? `${skill.level}%` : '0%'
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Ambient background glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] bg-accent-action/5 mix-blend-screen" />
        </section>
    );
};

export default SkillsShowcase;
