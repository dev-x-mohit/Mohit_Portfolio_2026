'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { name: 'Core Architecture', value: 95, color: 'bg-blue-500' },
    { name: 'Frontend Excellence', value: 98, color: 'bg-indigo-500' },
    { name: 'Mobile Dynamics', value: 90, color: 'bg-purple-500' },
    { name: 'Backend Logic', value: 92, color: 'bg-pink-500' },
    { name: 'Cloud Integration', value: 85, color: 'bg-cyan-500' },
];

const TechStackStats = () => {
    return (
        <section className="py-24 px-6 relative">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-500 mb-2">Technical Depth</h2>
                    <p className="text-3xl font-bold">The Breakdown</p>
                </div>

                <div className="space-y-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-medium tracking-tight text-gray-300">{stat.name}</span>
                                <span className="text-sm font-mono text-gray-500">{stat.value}% Mastery</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${stat.value}%` }}
                                    transition={{ duration: 1.5, ease: "circOut", delay: index * 0.1 }}
                                    className={`h-full ${stat.color} relative shadow-[0_0_20px_rgba(129,140,248,0.3)]`}
                                >
                                    <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-r from-transparent to-white/20" />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl text-center">
                    <p className="text-gray-400 italic font-light leading-relaxed">
                        "Continuously optimizing the bridge between hardware capabilities and human imagination."
                    </p>
                </div>
            </div>

            {/* Ambient decoration */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 blur-[120px] pointer-events-none" />
        </section>
    );
};

export default TechStackStats;
