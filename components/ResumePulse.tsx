'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useGlobalData } from '@/context/GlobalContext';



// Icon mapping for each experience
const iconMap: Record<string, React.ReactNode> = {
    // @ts-ignore
    'Software Engineer': <lord-icon src="https://cdn.lordicon.com/qhgmpzcx.json" trigger="hover" colors="primary:#ffffff" style={{ width: '20px', height: '20px' }} />,
    // @ts-ignore
    'Frontend Developer': <lord-icon src="https://cdn.lordicon.com/wzwygmng.json" trigger="hover" colors="primary:#ffffff" style={{ width: '20px', height: '20px' }} />,
    // @ts-ignore
    'Full Stack': <lord-icon src="https://cdn.lordicon.com/puvaffet.json" trigger="hover" colors="primary:#ffffff" style={{ width: '20px', height: '20px' }} />,
    // @ts-ignore
    'Product': <lord-icon src="https://cdn.lordicon.com/sbiheqsi.json" trigger="hover" colors="primary:#ffffff" style={{ width: '20px', height: '20px' }} />,
    // @ts-ignore
    'Design': <lord-icon src="https://cdn.lordicon.com/xpgofwru.json" trigger="hover" colors="primary:#ffffff" style={{ width: '20px', height: '20px' }} />,
    // @ts-ignore
    'Lead': <lord-icon src="https://cdn.lordicon.com/vduvxizq.json" trigger="hover" colors="primary:#ffffff" style={{ width: '20px', height: '20px' }} />,
    // @ts-ignore
    'default': <lord-icon src="https://cdn.lordicon.com/sbiheqsi.json" trigger="hover" colors="primary:#ffffff" style={{ width: '20px', height: '20px' }} />,
};

const ResumePulse = () => {
    const { experience: timelineData } = useGlobalData();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section
            id="experience"
            ref={containerRef}
            className="relative w-full py-32 px-6 bg-background text-foreground overflow-hidden transition-colors duration-500"
        >
            {/* Background ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60%] h-[60%] bg-accent-action/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/3 right-0 w-1/3 h-1/3 bg-accent-highlight/5 blur-[100px] rounded-full" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-accent-highlight bg-accent-highlight/10 px-4 py-1.5 rounded-full border border-accent-highlight/20 mb-4">
                        My Journey
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight">
                        <span className="text-foreground">Resume </span>
                        <span className="bg-gradient-to-r from-accent-action to-accent-highlight bg-clip-text text-transparent">
                            Pulse
                        </span>
                    </h2>
                    <p className="text-text-secondary text-sm mt-3 max-w-md mx-auto">
                        Scroll through the milestones that shaped my career.
                    </p>
                </motion.div>

                {/* Timeline container */}
                <div className="relative w-full max-w-3xl flex justify-center">
                    {/* The Rail (static line) */}
                    <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[2px] bg-border/60 -translate-x-1/2" />

                    {/* The Spark (Scroll-driven line) */}
                    <motion.div
                        className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[2px] bg-gradient-to-b from-accent-action via-accent-highlight to-accent-action -translate-x-1/2 origin-top"
                        style={{ scaleY }}
                    >
                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_30px_8px_rgba(96,165,250,0.6)] z-20"
                            style={{ opacity: glowOpacity }}
                        >
                            <div className="absolute inset-0 bg-white blur-sm rounded-full animate-pulse" />
                        </motion.div>
                    </motion.div>

                    {/* Timeline nodes */}
                    <div className="w-full flex flex-col gap-10 md:gap-14 py-10">
                        {timelineData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            const iconKey = Object.keys(iconMap).find((key) =>
                                item.title.toLowerCase().includes(key.toLowerCase())
                            ) || 'default';
                            const Icon = iconMap[iconKey] || iconMap.default;

                            // If there is no specific color mapping from icon, use accent variables based on index
                            const nodeColor = `var(--accent-${index % 2 === 0 ? 'action' : 'highlight'})`;

                            return (
                                <div
                                    key={item.id}
                                    className={`relative flex items-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} pl-14 md:pl-0`}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Node point on the line */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-30">
                                        <motion.div
                                            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 shadow-sm`}
                                            style={{
                                                borderColor: nodeColor,
                                                backgroundColor:
                                                    hoveredId === item.id ? nodeColor : 'var(--background)',
                                            }}
                                            animate={{
                                                scale: hoveredId === item.id ? 1.6 : 1,
                                                boxShadow:
                                                    hoveredId === item.id
                                                        ? `0 0 20px 4px ${nodeColor}40`
                                                        : 'none',
                                            }}
                                        >
                                            {hoveredId === item.id && (
                                                <motion.div
                                                    layoutId="pulse-ring"
                                                    className="absolute inset-0 -m-2 rounded-full border-2 opacity-60"
                                                    style={{ borderColor: nodeColor }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        className={`w-full md:w-[calc(50%-40px)] ${isEven ? 'text-left md:text-right' : 'text-left'}`}
                                    >
                                        <div
                                            className={`relative overflow-hidden group p-6 rounded-3xl bg-secondary-bg/20 backdrop-blur-xl border border-border/10 transition-all duration-300 hover:border-border/30 hover:bg-secondary-bg/40 ${isEven ? 'md:mr-0' : 'md:ml-0'}`}
                                            style={{
                                                boxShadow: hoveredId === item.id ? `0 8px 40px -8px ${nodeColor}20` : '0 4px 20px -10px rgba(0,0,0,0.1)',
                                                transform: hoveredId === item.id ? 'translateY(-2px)' : 'none'
                                            }}
                                        >
                                            {/* Decorative accent line */}
                                            <div
                                                className={`absolute top-0 ${isEven ? 'right-0 rounded-bl-full rounded-tl-full' : 'left-0 rounded-br-full rounded-tr-full'} h-1 transition-all duration-300`}
                                                style={{
                                                    background: `linear-gradient(to ${isEven ? 'left' : 'right'}, ${nodeColor}, transparent)`,
                                                    opacity: hoveredId === item.id ? 0.8 : 0.3,
                                                    width: hoveredId === item.id ? '64px' : '32px',
                                                }}
                                            />

                                            {/* Icon and date */}
                                            <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                                                <span
                                                    className="p-1.5 rounded-lg bg-background/50 border border-border/20 shadow-sm"
                                                    style={{ color: nodeColor }}
                                                >
                                                    {Icon}
                                                </span>
                                                <span
                                                    className="text-xs font-mono font-bold tracking-wider px-2 py-1 bg-background/30 rounded-md border border-border/10"
                                                    style={{ color: nodeColor }}
                                                >
                                                    {item.date}
                                                </span>
                                            </div>

                                            <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-1.5">
                                                {item.title}
                                            </h4>
                                            
                                            {/* Adding Subtitle for Institution/Company if present in timelineData */}
                                            {item.subtitle && (
                                                <h5 className="text-sm font-semibold text-text-secondary/80 mb-3">
                                                    {item.subtitle}
                                                </h5>
                                            )}

                                            <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                                {item.description}
                                            </p>

                                            {/* Tags */}
                                            <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                                                {item.details.map((detail, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] rounded-full border border-border/30 bg-background/50 text-text-secondary/80 shadow-sm transition-colors group-hover:text-foreground/80 group-hover:border-border/60"
                                                    >
                                                        {detail.label}: {detail.value}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Empty spacer for opposite side */}
                                    <div className="hidden md:block w-[calc(50%-40px)]" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress indicator (percentage) */}
                    <motion.div
                        className="absolute bottom-4 right-4 text-xs font-mono text-text-secondary/40 tracking-widest bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md border border-border/10"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
                    >
                        {useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ResumePulse;