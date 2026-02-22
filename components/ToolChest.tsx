'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// Simple Icons CDN helper: https://cdn.simpleicons.org/[slug]/[color]
const SI = ({ slug, color, size = 32 }: { slug: string; color: string; size?: number }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
        src={`https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`}
        alt={slug}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain' }}
    />
);

// Inline SVGs for icons not reliably on Simple Icons CDN
const VSCodeIcon = ({ size = 32 }: { size?: number }) => (
    <Image src="/images/vscode.svg" alt="VS Code" width={size} height={size} style={{ width: size, height: size, objectFit: 'contain' }} />
);

const WinTerminalIcon = ({ size = 32 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="#A855F7">
        <path d="M 0 4 L 0 20 L 24 20 L 24 4 Z M 1 5 L 23 5 L 23 19 L 1 19 Z" />
        <path d="M 2 7 L 2 8.5 L 8 11.5 L 2 14.5 L 2 16 L 10 12 L 10 11 Z" />
        <rect x="11" y="14" width="9" height="1.5" rx="0.75" />
    </svg>
);

const Win11Icon = ({ size = 32 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="#0078D4">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
);

const CanvaIcon = ({ size = 32 }: { size?: number }) => (
    <Image src="/images/canva.svg" alt="Canva" width={size} height={size} style={{ width: size, height: size, objectFit: 'contain' }} />
);

interface GearItem {
    category: string;
    name: string;
    detail: string;
    icon: React.ReactNode;
    accent: string;
}

const gear: GearItem[] = [
    { category: 'AI IDE', name: 'Cursor', detail: 'AI-first code editor', icon: <Image src="/images/cursor.svg" alt="Cursor" width={32} height={32} className="dark:invert object-contain" />, accent: '#ffffff' },
    { category: 'AI Builder', name: 'Lovable', detail: 'full-stack natural language dev', icon: <Image src="/images/lovable.svg" alt="Lovable" width={32} height={32} className="object-contain" />, accent: '#F59E0B' },
    { category: 'AI Agent', name: 'Antigravity', detail: 'autonomous coding assistant', icon: <Image src="/images/Google_Antigravity.svg" alt="Antigravity" width={32} height={32} className="object-contain" />, accent: '#60A5FA' },
    { category: 'Editor', name: 'VS Code', detail: 'with Vim motions + custom theme', icon: <VSCodeIcon size={32} />, accent: '#007ACC' },
    { category: 'Terminal', name: 'Windows Terminal', detail: 'Oh My Zsh + Starship prompt', icon: <WinTerminalIcon size={32} />, accent: '#A855F7' },
    { category: 'OS', name: 'macOS', detail: 'daily driver for development', icon: <SI slug="apple" color="#A2AAAD" />, accent: '#A2AAAD' },
    { category: 'OS', name: 'Linux', detail: 'Ubuntu for server & DevOps', icon: <SI slug="linux" color="#FCC624" />, accent: '#FCC624' },
    { category: 'OS', name: 'Windows 11', detail: 'WSL2 testing & gaming', icon: <Win11Icon size={32} />, accent: '#0078D4' },
    { category: 'Browser', name: 'Arc', detail: 'Dev tools always open 😅', icon: <SI slug="arc" color="#FCBFBD" />, accent: '#FCBFBD' },
    { category: 'Design', name: 'Figma', detail: 'wireframes → hi-fi in one place', icon: <SI slug="figma" color="#F24E1E" />, accent: '#F24E1E' },
    { category: 'Design', name: 'Canva', detail: 'quick graphics & presentations', icon: <CanvaIcon size={32} />, accent: '#00C4CC' },
    { category: 'Frontend', name: 'Next.js', detail: 'for building dynamic interfaces', icon: <SI slug="nextdotjs" color="ffffff" />, accent: '#FFFFFF' },
    { category: 'API Testing', name: 'Postman', detail: '+ Thunder Client for quick tests', icon: <SI slug="postman" color="#FF6C37" />, accent: '#FF6C37' },
    { category: 'Notes', name: 'Notion', detail: 'architecture docs & ideas dump', icon: <SI slug="notion" color="ffffff" />, accent: '#FFFFFF' },
    { category: 'Music', name: 'Spotify', detail: 'lo-fi beats while deep in code', icon: <SI slug="spotify" color="#1DB954" />, accent: '#1DB954' },
    { category: 'Beverage', name: 'Black Coffee', detail: 'dark roast fueled coding sessions ☕', icon: <span style={{ fontSize: 28 }}>☕</span>, accent: '#FBBF24' },
];

const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const ToolChest = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="relative w-full bg-background py-24 px-6 sm:px-12 overflow-hidden">
            {/* Section header */}
            <div className="max-w-6xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="block text-xs font-bold uppercase tracking-[0.5em] text-accent-action mb-3"
                >
                    My Arsenal
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black font-display tracking-tighter mb-4"
                >
                    Tool <span className="text-accent-action italic">Chest</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.18 }}
                    className="text-text-secondary text-lg max-w-xl mb-16"
                >
                    The stack of tools I reach for every day — editor to beverage.
                </motion.p>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    {gear.map((item) => (
                        <GearCard key={item.name} item={item} />
                    ))}
                </motion.div>
            </div>

            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent-action/5 blur-3xl" />
        </section>
    );
};

const GearCard = ({ item }: { item: GearItem }) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative group rounded-2xl border border-border/10 bg-secondary-bg/40 backdrop-blur-md p-5 overflow-hidden cursor-default transition-all duration-300 hover:border-border/30"
            style={{ boxShadow: hovered ? `0 0 28px 0 ${item.accent}22` : 'none' }}
        >
            {/* Spotlight */}
            {hovered && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${item.accent}18 0%, transparent 70%)` }}
                />
            )}

            {/* Category badge */}
            <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 inline-block"
                style={{ color: item.accent, background: `${item.accent}18`, border: `1px solid ${item.accent}30` }}
            >
                {item.category}
            </span>

            {/* Icon */}
            <div className="mb-4 transition-transform duration-300 group-hover:scale-110 origin-left flex items-center justify-start h-8 w-8">
                {item.icon}
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold font-display tracking-tight text-foreground mb-1">
                {item.name}
            </h3>

            {/* Detail */}
            <p className="text-sm text-text-secondary leading-relaxed">{item.detail}</p>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl"
                style={{ background: `linear-gradient(to right, transparent, ${item.accent}, transparent)` }}
            />
        </motion.div>
    );
};

export default ToolChest;
