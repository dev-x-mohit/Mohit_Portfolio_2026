'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const interests = [
    { name: 'React', category: 'Dev' },
    { name: 'TypeScript', category: 'Dev' },
    { name: 'Next.js', category: 'Dev' },
    { name: 'GSAP', category: 'Motion' },
    { name: 'Three.js', category: '3D' },
    { name: 'Framer Motion', category: 'Motion' },
    { name: 'UX Design', category: 'Design' },
    { name: 'Branding', category: 'Design' },
    { name: 'MERN', category: 'Dev' },
    { name: 'Architecture', category: 'Dev' },
];

const MagneticInterest = ({ name, category }: { name: string, category: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const tx = useSpring(mouseX, springConfig);
    const ty = useSpring(mouseY, springConfig);

    const onMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance and pull
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        if (distance < 300) {
            mouseX.set((e.clientX - centerX) * 0.4);
            mouseY.set((e.clientY - centerY) * 0.4);
        } else {
            mouseX.set(0);
            mouseY.set(0);
        }
    };

    const onMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const colors: Record<string, string> = {
        Dev: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        Motion: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        '3D': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        Design: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ x: tx, y: ty }}
            className={`px-6 py-3 rounded-full border shadow-2xl backdrop-blur-md cursor-pointer transition-shadow hover:shadow-indigo-500/20 ${colors[category] || 'bg-white/5 border-white/10'}`}
        >
            <span className="font-medium whitespace-nowrap">{name}</span>
        </motion.div>
    );
};

const InterestCanvas = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-500 mb-4">Interests</h2>
                    <p className="text-4xl font-bold">The Core Elements</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
                    {interests.map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <MagneticInterest {...item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InterestCanvas;
