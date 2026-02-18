'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { name: 'Core Architecture', value: 95 },
    { name: 'Frontend Excellence', value: 98 },
    { name: 'Mobile Dynamics', value: 90 },
    { name: 'Backend Logic', value: 92 },
    { name: 'Cloud Integration', value: 85 },
];

const TechStackStats = () => {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent-highlight mb-3">
                            Technical Proficiency
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold font-display text-foreground relative inline-block">
                            The <span className="text-accent-action">Breakdown</span>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-action to-transparent opacity-50" />
                        </h3>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 relative z-10">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            {/* Label & Percentage */}
                            <div className="flex justify-between items-end mb-3">
                                <h4 className="text-lg font-medium tracking-wide text-text-primary group-hover:text-accent-action transition-colors duration-300">
                                    {stat.name}
                                </h4>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold font-mono text-foreground">
                                        <Counter from={0} to={stat.value} />
                                    </span>
                                    <span className="text-sm text-accent-highlight">%</span>
                                </div>
                            </div>

                            {/* Progress Bar Container */}
                            <div className="h-2 w-full bg-secondary-bg/80 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5">
                                {/* Grid Pattern in Background */}
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] w-full h-full" />

                                {/* Animated Bar */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${stat.value}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                                    className="h-full bg-gradient-to-r from-accent-highlight to-accent-action relative"
                                >
                                    {/* Glare Effect */}
                                    <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white/40 to-transparent skew-x-12" />
                                    {/* Glowing Tip */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white blur-[1px] rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-24 p-8 rounded-2xl border border-accent-highlight/10 bg-secondary-bg/30 backdrop-blur-md text-center relative max-w-3xl mx-auto"
                >
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-accent-action/20 to-transparent opacity-50 blur-sm -z-10" />
                    <p className="text-lg text-text-secondary italic font-light leading-relaxed">
                        &quot;Continuously optimizing the bridge between hardware capabilities and human imagination.&quot;
                    </p>
                </motion.div>
            </div>

            {/* Ambient Background Decorations */}
            <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-accent-highlight/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-accent-action/5 blur-[150px] rounded-full pointer-events-none" />
        </section>
    );
};

// Simple Counter Component for Animation
function Counter({ from, to }: { from: number; to: number }) {
    const nodeRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = {
            value: from,
            stop: false
        };

        // Use Framer Motion's animate function if needed, or simple JS animation for numbers
        // Here we use a simple interval for lightweight effect
        const duration = 1500;
        const start = performance.now();

        const animate = (time: number) => {
            if (controls.stop) return;
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(from + (to - from) * ease);
            node.textContent = current.toString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        return () => { controls.stop = true; };
    }, [from, to]);

    return <span ref={nodeRef} />;
}

export default TechStackStats;
