'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// ── SDLC Phase data ───────────────────────────────────────────────────────────
const phases = [
    {
        id: '01',
        label: 'Discovery',
        title: 'Understand the Vision',
        description:
            'Before a single line of code, I map the problem space. User research, competitor analysis, and constraint scoping. Great software starts with crystal-clear requirements.',
        icon: '🔭',
        color: '#60A5FA',
        tech: ['Notion', 'Figma', 'User Interviews', 'MoSCoW Prioritisation'],
        output: 'Product Brief + Feature Scope',
    },
    {
        id: '02',
        label: 'Design',
        title: 'Blueprint the Architecture',
        description:
            'System design, database schemas, API contracts, and UI wireframes — all resolved before coding. Architecture debt is 10× harder to fix later.',
        icon: '📐',
        color: '#A78BFA',
        tech: ['Figma', 'Excalidraw', 'ERD Design', 'REST / GraphQL contracts'],
        output: 'Hi-Fi Designs + System Diagram',
    },
    {
        id: '03',
        label: 'Engineering',
        title: 'Build with Precision',
        description:
            'Feature-branch workflow, atomic commits, and trunk-based CI. I write component-first front-ends and domain-driven back-ends that are readable by the next engineer.',
        icon: '⚙️',
        color: '#34D399',
        tech: ['React / Next.js', 'Node.js', 'Cursor', 'Lovable', 'Antigravity', 'Docker'],
        output: 'Functional Application',
    },
    {
        id: '04',
        label: 'Testing',
        title: 'Verify & Harden',
        description:
            'Unit tests, integration tests, and manual edge-case hunting. Accessibility audits and cross-browser checks. Bugs found here cost nothing; bugs found in prod cost everything.',
        icon: '🧪',
        color: '#FBBF24',
        tech: ['Jest', 'Playwright', 'Postman', 'Lighthouse / Axe'],
        output: 'Test Report + Bug-Free Build',
    },
    {
        id: '05',
        label: 'Deployment',
        title: 'Ship with Confidence',
        description:
            'CI/CD pipelines push every merge to staging automatically. Zero-downtime deploys, environment secrets locked in vaults, and rollback strategies ready before go-live.',
        icon: '🚀',
        color: '#F472B6',
        tech: ['Vercel / AWS', 'GitHub Actions', 'Docker Compose', 'PM2'],
        output: 'Live Production System',
    },
    {
        id: '06',
        label: 'Iterate',
        title: 'Observe, Learn, Evolve',
        description:
            'Post-launch isn\'t the end — it\'s the beginning of the feedback loop. Analytics, user sessions, and error tracking inform the next sprint. Software is never "done".',
        icon: '🔄',
        color: '#FB923C',
        tech: ['Sentry', 'PostHog / GA4', 'Hotjar', 'Agile Sprint Reviews'],
        output: 'Continuous Improvement',
    },
];

// ── Component ─────────────────────────────────────────────────────────────────
const BuildProcess = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const headerInViewRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerInViewRef, { once: true });

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            // How far the track needs to scroll horizontally
            const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 200); // Added padding so the last item is fully visible

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight * 0.5}`,
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (progressRef.current) {
                            progressRef.current.style.width = `${self.progress * 100}%`;
                        }
                    },
                },
            });

            tl.to(track, {
                x: getScrollAmount,
                ease: 'none',
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={wrapperRef}
            className="relative h-screen w-full overflow-hidden bg-background flex flex-col"
        >
            {/* ── Header ── */}
            <div ref={headerInViewRef} className="flex-shrink-0 px-8 sm:px-16 pt-16 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 14 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="block text-xs font-bold uppercase tracking-[0.5em] text-accent-action mb-2"
                    >
                        How I Build
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black font-display tracking-tighter"
                    >
                        The Build <span className="text-accent-action italic">Process</span>
                    </motion.h2>
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-text-secondary text-base md:text-lg max-w-sm md:text-right"
                >
                    From raw idea to live product — every phase, every discipline.
                </motion.p>
            </div>

            {/* ── Progress bar ── */}
            <div className="flex-shrink-0 px-8 sm:px-16 mb-6">
                <div className="w-full h-px bg-border/15 rounded-full overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full rounded-full bg-gradient-to-r from-accent-action to-indigo-400 transition-none"
                        style={{ width: '0%' }}
                    />
                </div>
                <div className="flex justify-between mt-1">
                    {phases.map((p) => (
                        <span key={p.id} className="text-[10px] font-bold uppercase text-text-secondary/40 tracking-widest">
                            {p.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Horizontal scroll track ── */}
            <div className="flex-1 flex items-center px-8 sm:px-16 py-4">
                <div ref={trackRef} className="flex gap-6 will-change-transform">
                    {phases.map((phase, i) => (
                        <PhaseCard key={phase.id} phase={phase} index={i} />
                    ))}

                    {/* End cap */}
                    <div className="flex-shrink-0 w-64 flex flex-col items-center justify-center text-center px-8">
                        <div className="text-6xl mb-4">✨</div>
                        <p className="text-2xl font-black font-display tracking-tight text-foreground mb-2">
                            That's the loop.
                        </p>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Repeat, refine, ship better software — every single time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex-shrink-0 flex items-center justify-end gap-2 px-8 sm:px-16 pb-6 text-xs font-bold text-text-secondary/40 uppercase tracking-widest"
            >
                Scroll to explore
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M1 6h18M13 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>

            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        </section>
    );
};

// ── Individual phase card ─────────────────────────────────────────────────────
// Uses pure CSS group-hover — React synthetic events are unreliable
// on elements inside GSAP-transformed containers.
const PhaseCard = ({
    phase,
    index,
}: {
    phase: (typeof phases)[0];
    index: number;
}) => {
    return (
        <div
            className="bp-card group flex-shrink-0 w-[85vw] sm:w-[460px] md:w-[520px] h-full flex flex-col"
        >
            <div
                className="relative flex flex-col h-full rounded-2xl border border-border/10 bg-secondary-bg/40 backdrop-blur-md p-5 overflow-visible transition-all duration-300 group-hover:border-border/30 cursor-default"
                style={{
                    boxShadow: `0 0 0px 0 ${phase.color}00`,
                    transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px 0 ${phase.color}28`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0px 0 ${phase.color}00`)}
            >
                {/* Top-right ambient glow */}
                <div
                    className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-[0.05] group-hover:opacity-[0.18] transition-opacity duration-500"
                    style={{ background: phase.color }}
                />

                {/* Phase ID */}
                <div
                    className="text-[10px] font-black uppercase tracking-[0.5em] mb-2"
                    style={{ color: phase.color }}
                >
                    Phase {phase.id}
                </div>

                {/* Icon + Title row */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl leading-none transition-transform duration-300 group-hover:scale-110 origin-left flex-shrink-0">
                        {phase.icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-black font-display tracking-tight text-foreground leading-tight">
                            {phase.label}
                        </h3>
                        <p className="text-xs font-bold italic text-text-secondary leading-tight">
                            {phase.title}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-xs leading-relaxed flex-1 mb-3">
                    {phase.description}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {phase.tech.map((t) => (
                        <span
                            key={t}
                            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                                color: phase.color,
                                background: `${phase.color}14`,
                                border: `1px solid ${phase.color}28`,
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Output tag */}
                <div className="pt-3 border-t border-border/10 flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/50">Output</span>
                    <span className="text-[10px] font-bold" style={{ color: phase.color }}>{phase.output}</span>
                </div>

                {/* Connector arrow */}
                {index < phases.length - 1 && (
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-6 h-px"
                        style={{ background: `linear-gradient(to right, ${phase.color}50, transparent)` }}
                    />
                )}
            </div>
        </div>
    );
};

export default BuildProcess;
