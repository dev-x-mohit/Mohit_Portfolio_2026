'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

const philosophyTerms = [
    "Clean Code", "Pixel Perfect", "User Centric", "Scalable",
    "Secure", "Optimized", "Modern", "Accessible"
];

const CodePhilosophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 3D Rotation based on scroll
    const rotateX = useTransform(scrollYProgress, [0, 1], [45, -45]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Mouse Spotlight
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[150vh] bg-background text-foreground overflow-hidden flex items-center justify-center perspective-[1000px] transition-colors duration-300"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Spotlight Effect */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--accent-action-rgb), 0.15), transparent 40%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.5s ease'
                }}
            />

            {/* Background Grid */}
            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.05] pointer-events-none">
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-accent-highlight/30" />
                ))}
            </div>

            {/* 3D Cylindrical Text Container */}
            <motion.div
                style={{ rotateX, opacity }}
                className="relative z-0 flex flex-col items-center justify-center gap-2 md:gap-4 transform-style-3d will-change-transform"
            >
                {/* Render multiple rows for the cylinder effect */}
                {[...Array(7)].map((_, i) => (
                    <TextRow key={i} index={i} scrollYProgress={scrollYProgress} mousePosition={mousePosition} />
                ))}
            </motion.div>

            {/* Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-20" />

        </section>
    );
};

const TextRow = ({ index, scrollYProgress, mousePosition }: { index: number, scrollYProgress: any, mousePosition: { x: number, y: number } }) => {
    // Parallax speed varies by row index to create depth/cylinder feel
    const direction = index % 2 === 0 ? 1 : -1;
    const xRange = [-100 * direction, 100 * direction];
    const x = useTransform(scrollYProgress, [0, 1], [`${-50 * direction}%`, `${50 * direction}%`]);

    // Scale varies to simulate curvature
    const scale = index === 3 ? 1.5 : index === 2 || index === 4 ? 1.2 : 1;
    const blur = index === 3 ? 0 : index === 2 || index === 4 ? 2 : 4;
    const rowOpacity = index === 3 ? 1 : index === 2 || index === 4 ? 0.6 : 0.3;
    const color = index === 3 ? 'var(--foreground)' : 'var(--text-secondary)';

    return (
        <motion.div
            style={{ x }}
            className="flex gap-12 whitespace-nowrap"
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
                    <InteractiveWord key={tIndex} term={term} />
                ))}
            </motion.div>
        </motion.div>
    );
};

const InteractiveWord = ({ term }: { term: string }) => {
    // Simplified interaction: only color change on hover, no scramble or scale
    return (
        <motion.span
            className="text-4xl md:text-8xl font-black uppercase tracking-tighter cursor-pointer transition-colors duration-300 hover:text-accent-action"
        >
            {term}
        </motion.span>
    );
};

export default CodePhilosophy;
