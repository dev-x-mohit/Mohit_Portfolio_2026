'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skillCategories } from '@/data/skillsData';

// Flatten all skills with their category colour
const allSkills = skillCategories.flatMap(cat =>
    cat.skills.map(s => ({ ...s, category: cat.name, color: cat.color }))
);

const tabs = skillCategories.map(c => ({ name: c.name, color: c.color }));

const SkillsShowcase = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [activeTab, setActiveTab] = useState(tabs[0].name);

    const displayed = allSkills.filter(s => s.category === activeTab);
    const catColor = tabs.find(t => t.name === activeTab)?.color ?? '#6366f1';

    return (
        <section ref={ref} className="relative w-full bg-background py-24 px-6 sm:px-12 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
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
                    Skills <span className="text-accent-action italic">Showcase</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-text-secondary text-lg max-w-xl mb-12"
                >
                    Every tool, language, and platform I use to build production-grade software.
                </motion.p>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex flex-wrap gap-3 mb-10"
                >
                    {tabs.map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className="relative px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300"
                            style={{
                                color: activeTab === tab.name ? tab.color : 'var(--text-secondary)',
                                background: activeTab === tab.name ? `${tab.color}18` : 'transparent',
                                border: `1px solid ${activeTab === tab.name ? tab.color + '50' : 'var(--border)'}`,
                            }}
                        >
                            {tab.name}
                            {activeTab === tab.name && (
                                <motion.span
                                    layoutId="tab-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{ boxShadow: `0 0 14px 0 ${tab.color}30` }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Skill bars */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >
                        {displayed.map((skill, i) => (
                            <SkillBar key={skill.name} skill={skill} index={i} color={catColor} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-5"
                style={{ background: catColor }}
            />
        </section>
    );
};

const SkillBar = ({
    skill,
    index,
    color,
}: {
    skill: { name: string; level: number; icon: React.ReactNode };
    index: number;
    color: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false });
    const [hovered, setHovered] = React.useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group p-4 rounded-2xl border border-border/10 bg-secondary-bg/30 backdrop-blur-sm hover:border-border/30 transition-all duration-300"
            style={{ boxShadow: hovered ? `0 0 20px 0 ${color}20` : 'none' }}
        >
            <div className="flex items-center gap-3 mb-3">
                {/* Icon */}
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    {skill.icon}
                </span>
                <span className="font-bold text-base text-foreground flex-1">{skill.name}</span>
                <span
                    className="text-xs font-black tabular-nums"
                    style={{ color }}
                >
                    {skill.level}%
                </span>
            </div>

            {/* Bar track */}
            <div className="w-full h-1.5 rounded-full bg-border/20 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 0.9, delay: index * 0.06 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </motion.div>
    );
};

export default SkillsShowcase;
