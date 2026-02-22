'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

import { SiFigma, SiPostman, SiNotion, SiSpotify, SiNextdotjs, SiCanva } from 'react-icons/si';
import { FaWindows, FaTerminal, FaApple, FaLinux } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { Coffee, Globe } from 'lucide-react';
import Image from 'next/image';

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
    { category: 'Editor', name: 'VS Code', detail: 'with Vim motions + custom theme', icon: <VscVscode size={32} className="text-[#007ACC]" />, accent: '#007ACC' },
    { category: 'Terminal', name: 'Windows Terminal', detail: 'Oh My Zsh + Starship prompt', icon: <FaTerminal size={32} className="text-[#A855F7]" />, accent: '#A855F7' },
    { category: 'OS', name: 'macOS', detail: 'daily driver for development', icon: <FaApple size={32} className="text-foreground" />, accent: '#A2AAAD' },
    { category: 'OS', name: 'Linux', detail: 'Ubuntu for server & DevOps', icon: <FaLinux size={32} className="text-[#FCC624]" />, accent: '#FCC624' },
    { category: 'OS', name: 'Windows 11', detail: 'WSL2 testing & gaming', icon: <FaWindows size={32} className="text-[#0078D4]" />, accent: '#0078D4' },
    { category: 'Browser', name: 'Arc', detail: 'Dev tools always open 😅', icon: <Globe size={32} className="text-[#FF6C37]" />, accent: '#FF6C37' },
    { category: 'Design', name: 'Figma', detail: 'wireframes → hi-fi in one place', icon: <SiFigma size={32} className="text-[#F24E1E]" />, accent: '#F24E1E' },
    { category: 'Design', name: 'Canva', detail: 'quick graphics & presentations', icon: <SiCanva size={32} className="text-[#00C4CC]" />, accent: '#00C4CC' },
    { category: 'Frontend', name: 'Next.js', detail: 'for building dynamic interfaces', icon: <SiNextdotjs size={32} className="text-foreground" />, accent: '#FFFFFF' },
    { category: 'API Testing', name: 'Postman', detail: '+ Thunder Client for quick tests', icon: <SiPostman size={32} className="text-[#FF6C37]" />, accent: '#FF6C37' },
    { category: 'Notes', name: 'Notion', detail: 'architecture docs & ideas dump', icon: <SiNotion size={32} className="text-foreground" />, accent: '#FFFFFF' },
    { category: 'Music', name: 'Spotify', detail: 'lo-fi beats while deep in code', icon: <SiSpotify size={32} className="text-[#1DB954]" />, accent: '#1DB954' },
    { category: 'Beverage', name: 'Black Coffee', detail: 'dark roast fueled coding sessions ☕', icon: <Coffee size={32} className="text-[#FBBF24]" />, accent: '#FBBF24' },
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
