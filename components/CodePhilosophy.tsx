'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const philosophyTerms = [
    "Clean Code", "Pixel Perfect", "User Centric", "Scalable",
    "Secure", "Optimized", "Modern", "Accessible"
];

const CodePhilosophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 3D Rotation based on scroll
    const rotateX = useTransform(scrollYProgress, [0, 1], [45, -45]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Mouse Spotlight - Optimized with useMotionValue to prevent re-renders
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const maskImage = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[150vh] bg-background text-foreground overflow-hidden flex items-center justify-center perspective-[1000px] transition-colors duration-300"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Effect - Using mask instead of changing background directly for better perf */}
            <motion.div
                className="absolute inset-0 z-10 bg-accent-action/5 pointer-events-none"
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage
                }}
            />

            {/* Background Grid - Optimized with CSS Patterns */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, var(--accent-highlight) 1px, transparent 1px),
                        linear-gradient(to bottom, var(--accent-highlight) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
                }}
            />

            {/* 3D Cylindrical Text Container */}
            <motion.div
                style={{ rotateX, opacity }}
                className="relative z-0 flex flex-col items-center justify-center gap-2 md:gap-4 transform-style-3d will-change-transform"
            >
                {/* Render multiple rows for the cylinder effect */}
                {[...Array(7)].map((_, i) => (
                    <TextRow key={i} index={i} scrollYProgress={scrollYProgress} />
                ))}
            </motion.div>

            {/* Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-20" />

        </section>
    );
};

// Optimized row component
const TextRow = ({ index, scrollYProgress }: { index: number, scrollYProgress: any }) => {
    // Parallax speed varies by row index to create depth/cylinder feel
    const direction = index % 2 === 0 ? 1 : -1;

    // Simplified scaling logic
    const scale = index === 3 ? 1.5 : index === 2 || index === 4 ? 1.2 : 1;
    const blur = index === 3 ? 0 : index === 2 || index === 4 ? 2 : 4;
    const rowOpacity = index === 3 ? 1 : index === 2 || index === 4 ? 0.6 : 0.3;
    const color = index === 3 ? 'var(--foreground)' : 'var(--text-secondary)';

    // Using will-change transform
    const x = useTransform(scrollYProgress, [0, 1], [`${-50 * direction}%`, `${50 * direction}%`]);

    return (
        <motion.div
            style={{ x }}
            className="flex gap-12 whitespace-nowrap will-change-transform"
        >
            <motion.div
                className="flex gap-12"
                style={{
                    scale,
                    filter: `blur(${blur}px)`,
                    opacity: rowOpacity,
                    color
                }}
            >
                {[...philosophyTerms, ...philosophyTerms].map((term, tIndex) => (
                    <span
                        key={tIndex}
                        className="text-4xl md:text-8xl font-black uppercase tracking-tighter cursor-default hover:text-accent-action transition-colors duration-200"
                    >
                        {term}
                    </span>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default CodePhilosophy;
