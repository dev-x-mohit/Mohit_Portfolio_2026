'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiLayout, FiSettings, FiCheckCircle, FiSend, FiRefreshCw } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// ── SDLC Phase data ───────────────────────────────────────────────────────────
const phases = [
    {
        id: '01',
        label: 'Discovery',
        title: 'Understand the Vision',
        description:
            'Before a single line of code, I map the problem space. User research, competitor analysis, and understanding project limits. Great software starts with crystal-clear requirements.',
        icon: <FiSearch />,
        color: '#60A5FA',
        tech: ['Notion', 'Figma', 'User Interviews', 'Prioritization'],
        output: 'Product Brief + Feature Scope',
    },
    {
        id: '02',
        label: 'Design',
        title: 'Blueprint the Architecture',
        description:
            'System design, database structures, interface planning, and visual layouts — all resolved before coding. Bad structural choices are 10× harder to fix later.',
        icon: <FiLayout />,
        color: '#A78BFA',
        tech: ['Figma', 'Excalidraw', 'Database Planning', 'API Design'],
        output: 'Hi-Fi Designs + System Diagram',
    },
    {
        id: '03',
        label: 'Engineering',
        title: 'Build with Precision',
        description:
            'Organized coding, small reliable updates, and continuous testing. I write reusable front-end pieces and logic built around business needs that are readable by the next engineer.',
        icon: <FiSettings />,
        color: '#34D399',
        tech: ['React / Next.js', 'Node.js', 'Cursor', 'Lovable', 'Docker'],
        output: 'Functional Application',
    },
    {
        id: '04',
        label: 'Testing',
        title: 'Verify & Harden',
        description:
            'Automated tests, manual testing, and finding rare issues. Accessibility checks and testing on different browsers. Bugs found here cost nothing; bugs found in production cost everything.',
        icon: <FiCheckCircle />,
        color: '#FBBF24',
        tech: ['Jest', 'Playwright', 'Postman', 'Lighthouse'],
        output: 'Test Report + Bug-Free Build',
    },
    {
        id: '05',
        label: 'Deployment',
        title: 'Ship with Confidence',
        description:
            'Automated systems publish every update instantly. Updates without going offline, secure handling of passwords, and safety nets ready before launch.',
        icon: <FiSend />,
        color: '#F472B6',
        tech: ['Vercel / AWS', 'GitHub Actions', 'Docker', 'PM2'],
        output: 'Live Production System',
    },
    {
        id: '06',
        label: 'Iterate',
        title: 'Observe, Learn, Evolve',
        description:
            'Post-launch isn\'t the end — it\'s the beginning of the feedback loop. Analytics, user sessions, and error tracking inform the next sprint. Software is never "done".',
        icon: <FiRefreshCw />,
        color: '#FB923C',
        tech: ['Sentry', 'PostHog', 'Hotjar', 'Agile Sprints'],
        output: 'Continuous Improvement',
    },
];

// ── Main Component ────────────────────────────────────────────────────────────
const BuildProcess = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const getScrollAmount = () =>
                -(track.scrollWidth - window.innerWidth + 200);

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
                        const pct = self.progress * 100;
                        if (progressRef.current) {
                            progressRef.current.style.width = `${pct}%`;
                        }
                        // Update active index based on progress
                        const idx = Math.min(
                            Math.floor((self.progress * phases.length)),
                            phases.length - 1
                        );
                        setActiveIndex(idx);
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
            className="relative h-screen w-full overflow-hidden bg-background flex flex-col transition-colors duration-500"
        >
            {/* ── Subtle background texture ── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--gold-primary),transparent_70%)] opacity-10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,var(--gold-light),transparent_50%)] opacity-5" />
            </div>

            {/* ── Header ── */}
            <div ref={headerRef} className="relative z-10 flex-shrink-0 px-6 sm:px-12 lg:px-20 pt-12 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--gold-primary)] mb-2 bg-[var(--gold-primary)]/10 px-3 py-1 rounded-full border border-[var(--border)]/20"
                    >
                        ⚡ The Method
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.08 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display tracking-tight leading-[1.05]"
                    >
                        <span className="text-foreground">Build </span>
                        <span className="bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] bg-clip-text text-transparent italic inline-block pr-4 pb-2">
                            Process
                        </span>
                    </motion.h2>
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-text-secondary text-sm sm:text-base max-w-xs md:text-right font-light leading-relaxed"
                >
                    From raw idea to live product — <br className="hidden sm:block" />
                    every phase, every discipline.
                </motion.p>
            </div>

            {/* ── Progress bar ── */}
            <div className="relative z-10 flex-shrink-0 px-6 sm:px-12 lg:px-20 mb-4">
                <div className="w-full h-[3px] bg-border/20 rounded-full overflow-hidden relative">
                    <div
                        ref={progressRef}
                        className="h-full rounded-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] transition-none"
                        style={{ width: '0%' }}
                    />
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] blur-[8px] opacity-30 transition-opacity" style={{ width: '0%' }} />
                </div>
                <div className="flex justify-between mt-1.5 px-0.5">
                    {phases.map((p, i) => (
                        <span
                            key={p.id}
                            className={`text-[9px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${i <= activeIndex ? 'text-foreground' : 'text-text-secondary/40'
                                }`}
                        >
                            {p.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Horizontal scroll track ── */}
            <div className="relative z-10 flex-1 flex items-center px-6 sm:px-12 lg:px-20 py-2 overflow-visible">
                <div ref={trackRef} className="flex gap-5 md:gap-6 will-change-transform">
                    {phases.map((phase, i) => (
                        <PhaseCard
                            key={phase.id}
                            phase={phase}
                            index={i}
                            isActive={i === activeIndex}
                        />
                    ))}

                    {/* End cap — refined */}
                    <div className="flex-shrink-0 w-56 sm:w-72 flex flex-col items-center justify-center text-center px-4">
                        <div className="text-5xl sm:text-6xl mb-4 text-[var(--gold-light)] opacity-50">✦</div>
                        <p className="text-xl sm:text-2xl font-bold font-display tracking-tight text-foreground mb-2">
                            That's the loop.
                        </p>
                        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed max-w-xs">
                            Repeat, refine, ship better software —<br />every single time.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Scroll hint ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="relative z-10 flex-shrink-0 flex items-center justify-end gap-3 px-6 sm:px-12 lg:px-20 pb-5 text-[10px] font-medium text-text-secondary/60 uppercase tracking-[0.2em]"
            >
                <span className="flex items-center gap-2">
                    Scroll to explore
                    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="stroke-accent-action animate-pulse">
                        <path d="M1 5h14M11 1l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </motion.div>

            {/* ── Edge fades ── */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />

            {/* ── Subtle bottom glow ── */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)]/20 to-transparent" />
        </section>
    );
};

// ── Individual Phase Card ────────────────────────────────────────────────────
const PhaseCard = ({
    phase,
    index,
    isActive,
}: {
    phase: (typeof phases)[0];
    index: number;
    isActive: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bp-card group flex-shrink-0 w-[80vw] sm:w-[400px] md:w-[460px] lg:w-[500px] h-full flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="card-metallic !overflow-visible flex flex-col h-full p-6 sm:p-7 cursor-default"
                style={{
                    boxShadow: isActive
                        ? `0 0 40px -10px ${phase.color}20, inset 0 1px 0 ${phase.color}20`
                        : '0 4px 24px -12px rgba(0,0,0,0.1)',
                    borderColor: isActive ? `${phase.color}40` : 'var(--border)',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}
            >
                {/* ── Ambient glow ── */}
                <div
                    className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] transition-opacity duration-700"
                    style={{
                        background: phase.color,
                        opacity: isHovered || isActive ? 0.15 : 0.02,
                    }}
                />

                {/* ── Top-left accent line ── */}
                <div
                    className="absolute top-0 left-6 h-[2px] w-12 rounded-full transition-all duration-500"
                    style={{
                        background: phase.color,
                        opacity: isHovered || isActive ? 1 : 0.3,
                        width: isHovered || isActive ? '48px' : '24px',
                    }}
                />

                {/* ── Phase number ── */}
                <div className="flex items-center gap-3 mb-3">
                    <span
                        className="text-[9px] font-black uppercase tracking-[0.3em] transition-colors duration-300"
                        style={{ color: phase.color }}
                    >
                        Phase {phase.id}
                    </span>
                    <span className="flex-1 h-px bg-border/20" />
                </div>

                {/* ── Icon + Title ── */}
                <div className="flex items-start gap-4 mb-3">
                    <div
                        className="text-3xl sm:text-4xl transition-all duration-500 flex-shrink-0"
                        style={{
                            color: isHovered || isActive ? phase.color : 'var(--text-secondary)',
                            transform: isHovered || isActive ? 'scale(1.12) rotate(-4deg)' : 'scale(1) rotate(0deg)',
                        }}
                    >
                        {phase.icon}
                    </div>
                    <div>
                        <h3
                            className="text-xl sm:text-2xl font-bold font-display tracking-tight text-foreground transition-colors duration-300"
                        >
                            {phase.label}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-text-secondary leading-tight mt-0.5">
                            {phase.title}
                        </p>
                    </div>
                </div>

                {/* ── Description ── */}
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed flex-1 mb-4">
                    {phase.description}
                </p>

                {/* ── Tech pills ── */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {phase.tech.map((t) => (
                        <span
                            key={t}
                            className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full transition-all duration-300"
                            style={{
                                color: phase.color,
                                background: `${phase.color}15`,
                                border: `1px solid ${phase.color}30`,
                                boxShadow: isHovered || isActive ? `0 0 16px -4px ${phase.color}20` : 'none',
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* ── Output ── */}
                <div className="pt-3.5 border-t border-border/20 flex items-center gap-3">
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-text-secondary/60">
                        Output
                    </span>
                    <span
                        className="text-[9px] sm:text-[10px] font-bold transition-colors duration-300"
                        style={{ color: phase.color }}
                    >
                        {phase.output}
                    </span>
                </div>

                {/* ── Active indicator dot ── */}
                {isActive && (
                    <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: phase.color }}
                    />
                )}

                {/* ── Connector ── */}
                {index < phases.length - 1 && (
                    <div
                        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px hidden sm:block"
                        style={{
                            background: `linear-gradient(to right, ${phase.color}40, transparent)`,
                            opacity: isHovered || isActive ? 0.6 : 0.2,
                            transition: 'opacity 0.4s ease',
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default BuildProcess;