'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue as motionValue } from 'framer-motion';
import { LucideIcon, Code, Palette, Zap, Star } from 'lucide-react';

const BentoCard = ({ children, className, title, icon: Icon }: { children: React.ReactNode, className?: string, title?: string, icon?: LucideIcon }) => {
    const mouseX = motionValue(0);
    const mouseY = motionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            onMouseMove={onMouseMove}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(var(--accent-action-rgb), 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />
            {title && (
                <div className="mb-4 flex items-center gap-3">
                    {Icon && <Icon className="text-gray-400 group-hover:text-[var(--accent-action)] transition-colors" size={20} />}
                    <h3 className="text-sm font-medium uppercase tracking-widest text-gray-400 group-hover:text-gray-200 transition-colors">{title}</h3>
                </div>
            )}
            <div className="relative z-10">
                {children}
            </div>
            {/* Decorative gradient */}
            <div className="absolute -right-20 -top-20 h-64 w-64 bg-[var(--accent-action)]/5 blur-[100px] pointer-events-none group-hover:bg-[var(--accent-action)]/10 transition-colors" />
        </motion.div>
    );
};

const CognitionGrid = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="container mx-auto px-6 py-24">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]"
            >
                {/* Bio Card */}
                <motion.div variants={cardVariants} className="md:col-span-2 md:row-span-2">
                    <BentoCard className="h-full flex flex-col justify-end" title="Philosophy" icon={Star}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Crafting the <span className="text-[var(--accent-action)]">Untraceable</span>.</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            I believe that the best code is invisible—it creates an experience so seamless that you forget the technology behind it. My work focuses on the intersection of technical excellence and artistic expression.
                        </p>
                    </BentoCard>
                </motion.div>

                {/* Experience Card */}
                <motion.div variants={cardVariants} className="md:row-span-1">
                    <BentoCard className="h-full" title="Stacks" icon={Code}>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {['MERN', 'Next.js', 'React Native', 'AWS', 'Postgres'].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-xs text-[var(--accent-action)] border border-[var(--accent-action)]/20">{tech}</span>
                            ))}
                        </div>
                    </BentoCard>
                </motion.div>

                {/* Stats Card */}
                <motion.div variants={cardVariants}>
                    <BentoCard className="h-full flex flex-col items-center justify-center text-center" title="Impact">
                        <span className="text-5xl font-black text-white">12+</span>
                        <span className="text-xs text-gray-500 uppercase mt-1">Projects Delivered</span>
                    </BentoCard>
                </motion.div>

                {/* Vision Card */}
                <motion.div variants={cardVariants} className="md:col-span-1 md:row-span-2">
                    <BentoCard className="h-full bg-gradient-to-br from-[var(--accent-action)]/20 to-transparent" title="Vision" icon={Zap}>
                        <p className="text-gray-300 italic">
                            &quot;To build systems that not only solve problems but inspire wonder.&quot;
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-action)] shadow-[0_0_10px_var(--accent-action)] group-hover:shadow-[var(--accent-action)]/50 transition-all" /> Scalable Architectures
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-action)] shadow-[0_0_10px_var(--accent-action)] group-hover:shadow-[var(--accent-action)]/50 transition-all" /> Immersive UX
                            </div>
                        </div>
                    </BentoCard>
                </motion.div>

                {/* Visualizer Card */}
                <motion.div variants={cardVariants} className="md:col-span-2 lg:col-span-1">
                    <BentoCard className="h-full flex flex-col" title="Design" icon={Palette}>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex gap-1 items-end h-8">
                                {[0.6, 0.4, 0.8, 0.5, 0.9, 0.3].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scaleY: [1, 1.5, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1.5 bg-[var(--accent-action)] rounded-full origin-bottom"
                                        style={{ height: `${h * 100}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </BentoCard>
                </motion.div>

                {/* Status Card */}
                <motion.div variants={cardVariants}>
                    <BentoCard className="h-full flex items-center gap-4" title="Availability">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <span className="text-sm font-medium text-gray-200">Open for Work</span>
                    </BentoCard>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CognitionGrid;
