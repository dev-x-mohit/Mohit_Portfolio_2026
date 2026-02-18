'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const categories = ['All', 'Full-Stack', 'App Dev', 'Web Dev', 'Backend', 'AI Integration', 'Security'];

const FilterButton = ({ cat, activeFilter, setFilter }: { cat: string, activeFilter: string, setFilter: (c: string) => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((clientX - (rect.left + rect.width / 2)) * 0.2);
        y.set((clientY - (rect.top + rect.height / 2)) * 0.2);
    };

    return (
        <motion.button
            ref={ref}
            onClick={() => setFilter(cat)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x: mouseX, y: mouseY }}
            className={`relative px-8 py-3 text-[10px] font-mono uppercase tracking-[0.3em] transition-colors duration-500 z-10 ${activeFilter === cat ? 'text-black' : 'text-white/40 hover:text-white'
                }`}
        >
            {activeFilter === cat && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-accent-action rounded-full -z-10 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            {cat}
        </motion.button>
    );
};

const ProjectFilters = ({ activeFilter, setFilter }: { activeFilter: string, setFilter: (c: string) => void }) => {
    return (
        <div className="w-full flex md:flex-row flex-col items-start md:items-center justify-between border-b border-white/5 pb-12 gap-8">
            <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                    <FilterButton key={cat} cat={cat} activeFilter={activeFilter} setFilter={setFilter} />
                ))}
            </div>

            {/* HUD Element */}
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end font-mono text-[9px] text-white/20">
                    <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-accent-action animate-ping" />
                        SECTOR_LOADING: {activeFilter.toUpperCase()}
                    </span>
                    <span>ARCHIVE_RETRIEVAL_STABLE</span>
                </div>

                <div className="w-24 h-10 border border-white/5 relative overflow-hidden hidden md:block">
                    <motion.div
                        className="absolute inset-0 bg-accent-action/5"
                        animate={{ opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white/10" />
                    <motion.div
                        className="absolute top-0 left-0 h-full w-[2px] bg-accent-action"
                        animate={{ left: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectFilters;
