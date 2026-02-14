'use client';

import React from 'react';
import { motion } from 'framer-motion';

const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Cloud'];

const ProjectFilters = ({ activeFilter, setFilter }: { activeFilter: string, setFilter: (c: string) => void }) => {
    return (
        <div className="flex flex-wrap items-center gap-4 border-b border-white/5 pb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`relative px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors duration-500 ${activeFilter === cat ? 'text-white' : 'text-gray-500 hover:text-white'
                        }`}
                >
                    {cat}
                    {activeFilter === cat && (
                        <motion.div
                            layoutId="filter-pill"
                            className="absolute inset-0 bg-[var(--accent-action)]/10 rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    {activeFilter === cat && (
                        <motion.div
                            layoutId="filter-dot"
                            className="absolute -bottom-1 left-1.2 right-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--accent-action)] rounded-full"
                        />
                    )}
                </button>
            ))}

            <div className="ml-auto hidden md:block">
                <div className="flex items-center gap-3 text-[10px] font-black tracking-widest text-gray-700">
                    <div className="w-10 h-[1px] bg-gray-800" />
                    FILTER_SYSTEM_ACTIVE
                </div>
            </div>
        </div>
    );
};

export default ProjectFilters;
