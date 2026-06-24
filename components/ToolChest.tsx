'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Cpu, Dashboard, Code, Wrench, CoffeeCup } from 'iconoir-react';

interface GearItem {
    name: string;
    detail: string;
}

interface CategoryGroup {
    title: string;
    icon: React.ReactNode;
    items: GearItem[];
}

const gearGroups: CategoryGroup[] = [
    {
        title: "Development Environment",
        icon: <Code className="w-5 h-5 text-[var(--gold-light)]" />,
        items: [
            { name: 'Cursor', detail: 'AI-first code editor, primary daily driver' },
            { name: 'VS Code', detail: 'Secondary editor with Vim motions' },
            { name: 'Windows Terminal', detail: 'Zsh + Starship prompt configuration' },
        ]
    },
    {
        title: "AI & Automation",
        icon: <Cpu className="w-5 h-5 text-[var(--gold-light)]" />,
        items: [
            { name: 'Lovable', detail: 'Full-stack natural language development' },
            { name: 'Antigravity', detail: 'Autonomous agentic coding assistant' },
            { name: 'GitHub Copilot', detail: 'Inline code generation and autocomplete' },
        ]
    },
    {
        title: "Design & UI",
        icon: <Dashboard className="w-5 h-5 text-[var(--gold-light)]" />,
        items: [
            { name: 'Figma', detail: 'Wireframes, prototyping, and UI design' },
            { name: 'Canva', detail: 'Quick graphics and presentation assets' },
            { name: 'Tailwind CSS', detail: 'Utility-first styling framework' },
        ]
    },
    {
        title: "System & Infrastructure",
        icon: <Terminal className="w-5 h-5 text-[var(--gold-light)]" />,
        items: [
            { name: 'macOS', detail: 'Primary development operating system' },
            { name: 'Ubuntu Linux', detail: 'Server deployment and DevOps' },
            { name: 'Next.js', detail: 'React framework for production applications' },
        ]
    },
    {
        title: "Workflow & Utilities",
        icon: <Wrench className="w-5 h-5 text-[var(--gold-light)]" />,
        items: [
            { name: 'Arc Browser', detail: 'Development browser with split views' },
            { name: 'Postman', detail: 'API testing and endpoint documentation' },
            { name: 'Notion', detail: 'Architecture documentation and planning' },
        ]
    },
    {
        title: "Fuel",
        icon: <CoffeeCup className="w-5 h-5 text-[var(--gold-light)]" />,
        items: [
            { name: 'Black Coffee', detail: 'Dark roast, mandatory for deep work' },
            { name: 'Spotify', detail: 'Lo-fi beats and synthwave playlists' },
        ]
    }
];

const ToolChest = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="relative w-full bg-background py-32 px-4 sm:px-8 overflow-hidden transition-colors duration-500">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-[100%] bg-[var(--gold-light)]/5 blur-[150px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-[800px] h-[800px] rounded-[100%] bg-[var(--gold-primary)]/5 blur-[150px]" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border/20 pb-10">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--gold-light)] bg-[var(--gold-light)]/10 px-4 py-1.5 rounded-full border border-[var(--border)]/20 mb-4"
                        >
                            System Configuration
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-foreground"
                        >
                            Tool <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] italic pr-2">Chest</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.18 }}
                        className="text-text-secondary text-base sm:text-lg max-w-sm"
                    >
                        The elite stack of software and hardware I rely on daily to craft high-performance digital experiences.
                    </motion.p>
                </div>

                {/* List Layout */}
                <div className="space-y-12">
                    {gearGroups.map((group, groupIdx) => (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + (groupIdx * 0.1) }}
                            className="relative group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-secondary-bg border border-border/20 shadow-inner group-hover:border-[var(--border)]/50 transition-colors duration-500">
                                    {group.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-foreground font-display tracking-tight">{group.title}</h3>
                                <div className="flex-1 h-px bg-gradient-to-r from-border/40 to-transparent ml-4" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {group.items.map((item, itemIdx) => (
                                    <div
                                        key={item.name}
                                        className="card-metallic p-5 group/card"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--gold-primary)]/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <h4 className="text-lg font-bold text-foreground mb-1 font-mono tracking-tight">{item.name}</h4>
                                        <p className="text-sm text-text-secondary">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolChest;
