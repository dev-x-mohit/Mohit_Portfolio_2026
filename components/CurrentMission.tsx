'use client';

import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Cloud, Brain, WebWindow } from 'iconoir-react';

interface MissionFocus {
    title: string;
    description: string;
    icon: React.ReactNode;
    tech: string[];
}

const missionFocuses: MissionFocus[] = [
    {
        title: "Production SaaS",
        description: "Architecting multi-tenant, secure software-as-a-service applications with robust database structures and optimized performance.",
        icon: <Cloud className="w-6 h-6 text-[var(--gold-light)]" />,
        tech: ["Next.js", "PostgreSQL", "Prisma", "NextAuth"]
    },
    {
        title: "AI-Powered Tools",
        description: "Building intelligent applications integrated with Large Language Models, AI agents, semantic search, and prompt architectures.",
        icon: <Brain className="w-6 h-6 text-[var(--gold-light)]" />,
        tech: ["LangChain", "OpenAI / Gemini APIs", "VectorDBs", "MCP"]
    },
    {
        title: "Scalable Web",
        description: "Crafting beautiful, highly interactive frontend user interfaces with modern rendering patterns, fast page load speeds, and premium SEO setups.",
        icon: <WebWindow className="w-6 h-6 text-[var(--gold-light)]" />,
        tech: ["Framer Motion", "Tailwind CSS", "Three.js", "SEO Opt"]
    }
];

const FocusCard = ({ focus, index }: { focus: MissionFocus; index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group card-metallic flex flex-col justify-between p-8 relative overflow-hidden transition-all duration-500 hover:border-[var(--gold-primary)] hover:-translate-y-1"
        >
            {/* Interactive Spotlight Hover Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            250px circle at ${mouseX}px ${mouseY}px,
                            var(--border) 0%,
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-secondary-bg border border-border/10 group-hover:border-[var(--border)]/40 transition-colors duration-300">
                        {focus.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-display text-foreground group-hover:text-[var(--gold-primary)] transition-colors duration-300">
                        {focus.title}
                    </h4>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {focus.description}
                </p>
            </div>

            {/* Tech Tags */}
            <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-border/10">
                {focus.tech.map((tag, tIdx) => (
                    <span
                        key={tIdx}
                        className="px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider rounded bg-secondary-bg/50 border border-border/10 text-text-secondary/80 group-hover:text-foreground group-hover:border-border/30 transition-all duration-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const CurrentMission = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={containerRef}
            className="relative w-full py-16 md:py-32 px-6 bg-background text-foreground overflow-hidden border-t border-border/10"
            id="current-mission"
        >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[var(--gold-primary)]/5 blur-[130px] rounded-full" />
                <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-[var(--gold-light)]/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[var(--gold-dark)]/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
                {/* Header Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold-light)] bg-[var(--gold-light)]/10 px-4 py-1.5 rounded-full border border-[var(--border)]/20 mb-4">
                        🎯 Next Chapter
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground">
                        Current <span className="bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold-primary)] to-[var(--gold-light)] bg-clip-text text-transparent italic pr-2">Mission</span>
                    </h2>
                </motion.div>

                {/* Big Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-center max-w-3xl mb-16 px-4"
                >
                    <p className="text-lg sm:text-xl md:text-2xl font-light font-sans text-text-secondary leading-relaxed tracking-wide">
                        Currently focused on building{" "}
                        <span className="text-foreground font-semibold border-b border-[var(--gold-primary)]/30">
                            production-grade SaaS products
                        </span>
                        ,{" "}
                        <span className="text-foreground font-semibold border-b border-[var(--gold-primary)]/30">
                            open-source developer tools
                        </span>
                        , and{" "}
                        <span className="text-foreground font-semibold border-b border-[var(--gold-primary)]/30">
                            scalable web experiences
                        </span>
                        .
                    </p>
                </motion.div>

                {/* Interactive Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
                    {missionFocuses.map((focus, index) => (
                        <FocusCard key={focus.title} focus={focus} index={index} />
                    ))}
                </div>

                {/* Bridge to Projects - Cyber-Plate Metallic Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="flex flex-col items-center gap-4 text-center"
                >
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-text-secondary/60">
                        See how this vision is translated into code
                    </p>
                    <Link href="/projects" className="btn-metallic px-8 py-4 flex items-center gap-3 group text-[9px] sm:text-[10px] md:text-xs">
                        <span>Explore Projects</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CurrentMission;
