'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface Interest {
    title: string;
    description: string;
    emoji: string;
    accent: string;
    size: 'lg' | 'md' | 'sm';
}

const interests: Interest[] = [
    {
        title: 'Morning Ritual',
        description: 'My mornings start with normal tea or black coffee — no green tea. It\'s a ritual that sets the tone for deep work and clear thinking.',
        emoji: '☕',
        accent: '#FBBF24',
        size: 'lg',
    },
    {
        title: 'Lo-fi & Focus',
        description: 'Coding sessions powered by lo-fi hip-hop and ambient sound. The right soundtrack unlocks flow state.',
        emoji: '🎧',
        accent: '#A78BFA',
        size: 'md',
    },
    {
        title: 'Open Source',
        description: 'Believe the best code is shared. Contributing to OS projects keeps me sharp and gives back to the community.',
        emoji: '🌐',
        accent: '#60A5FA',
        size: 'md',
    },
    {
        title: 'Reading',
        description: '"The Pragmatic Programmer", "Clean Code", and anything that makes me a better thinker — not just a better coder.',
        emoji: '📚',
        accent: '#F59E0B',
        size: 'sm',
    },
    {
        title: 'UI Obsession',
        description: 'I screenshot beautiful interfaces. My camera roll is half sunsets, half Dribbble-worthy UIs.',
        emoji: '🎨',
        accent: '#F472B6',
        size: 'sm',
    },
    {
        title: 'Gaming',
        description: 'Strategy & sandbox games. Minecraft and chess both scratch the same itch — systems thinking.',
        emoji: '🎮',
        accent: '#34D399',
        size: 'sm',
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    show: (i: number) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
    }),
};

const BeyondTheCode = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="relative w-full bg-background py-24 px-6 sm:px-12 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="block text-xs font-bold uppercase tracking-[0.5em] text-accent-action mb-3"
                >
                    Human Side
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black font-display tracking-tighter mb-4"
                >
                    Beyond <span className="text-accent-action italic">the Code</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.18 }}
                    className="text-text-secondary text-lg max-w-xl mb-14"
                >
                    The stuff that shapes how I think, create, and build.
                </motion.p>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
                    {interests.map((item, i) => (
                        <BentoCard key={item.title} item={item} index={i} inView={inView} />
                    ))}
                </div>
            </div>

            {/* Ambient */}
            <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-accent-action/5 blur-3xl" />
        </section>
    );
};

const BentoCard = ({ item, index, inView }: { item: Interest; index: number; inView: boolean }) => {
    const [hovered, setHovered] = React.useState(false);

    const sizeClasses = {
        lg: 'lg:col-span-2 lg:row-span-2',
        md: 'lg:col-span-1 lg:row-span-2',
        sm: 'lg:col-span-1',
    };

    const emojiSize = {
        lg: 'text-7xl',
        md: 'text-5xl',
        sm: 'text-4xl',
    };

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative rounded-3xl border border-border/10 bg-secondary-bg/40 backdrop-blur-md p-7 overflow-hidden cursor-default transition-all duration-300 hover:border-border/30 flex flex-col ${sizeClasses[item.size]}`}
            style={{
                boxShadow: hovered ? `0 0 40px 0 ${item.accent}18` : 'none',
                minHeight: item.size === 'lg' ? '280px' : item.size === 'md' ? '200px' : '160px',
            }}
        >
            {/* Corner glow */}
            <motion.div
                className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl"
                style={{ background: item.accent }}
                animate={{ opacity: hovered ? 0.12 : 0.04 }}
                transition={{ duration: 0.4 }}
            />

            {/* Emoji */}
            <motion.div
                className={`${emojiSize[item.size]} mb-4 leading-none`}
                animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {item.emoji}
            </motion.div>

            {/* Title */}
            <h3
                className="text-xl md:text-2xl font-bold font-display tracking-tight mb-2"
                style={{ color: hovered ? item.accent : 'var(--foreground)' }}
            >
                {item.title}
            </h3>

            {/* Description */}
            <p className="text-text-secondary text-sm md:text-base leading-relaxed flex-1">{item.description}</p>

            {/* Bottom tag */}
            <div
                className="mt-4 self-start text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ color: item.accent, background: `${item.accent}15`, border: `1px solid ${item.accent}25` }}
            >
                #{item.title.toLowerCase().replace(/\s/g, '-')}
            </div>
        </motion.div>
    );
};

export default BeyondTheCode;
