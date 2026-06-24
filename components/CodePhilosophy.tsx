'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const philosophyTerms = [
    "Clean Architecture", "Type Safe", "Event-Driven", "Zero Trust Security",
    "SOLID Principles", "Test-Driven", "Micro-Frontends", "Performance First",
    "CI/CD Native", "Serverless", "Edge Computing", "A11y First"
];

const CodePhilosophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Keep the same transform logic, but with smaller magnitude?
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
    const maskImage = useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, rgba(255,255,255,0.15) 0%, transparent 70%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            ref={containerRef}
            className="relative h-[80vh] w-full overflow-hidden bg-transparent"
            onMouseMove={handleMouseMove}
        >
            {/* Same subtle grid, but maybe smaller pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            />

            <motion.div
                style={{ rotateX, opacity }}
                className="relative z-10 flex h-full flex-col items-center justify-center gap-2 md:gap-3"
            >
                {[...Array(5)].map((_, i) => (
                    <TextRow key={i} index={i} scrollYProgress={scrollYProgress} />
                ))}
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/20 pointer-events-none">
                Philosophy
            </div>
        </section>
    );
};

const TextRow = ({ index, scrollYProgress }: { index: number; scrollYProgress: any }) => {
    const direction = index % 2 === 0 ? 1 : -1;

    const center = index === 2;
    const nearCenter = index === 1 || index === 3;
    const scale = center ? 1.2 : nearCenter ? 1.05 : 0.85;
    const blur = center ? 0 : nearCenter ? 1 : 2.5;
    const rowOpacity = center ? 1 : nearCenter ? 0.7 : 0.35;
    const textColor = center ? 'text-foreground' : 'text-foreground/40';

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [`${-20 * direction}%`, `${20 * direction}%`]
    );

    return (
        <motion.div
            style={{ x }}
            className="flex w-full justify-center will-change-transform"
        >
            <motion.div
                className="flex gap-4 whitespace-nowrap md:gap-8"
                style={{
                    scale,
                    filter: `blur(${blur}px)`,
                    opacity: rowOpacity,
                }}
            >
                {[...philosophyTerms, ...philosophyTerms, ...philosophyTerms, ...philosophyTerms].map((term, i) => {
                    const hoverColors = ["hover:text-accent-action", "hover:text-accent-highlight", "hover:text-foreground"];
                    const hoverColor = hoverColors[i % hoverColors.length];
                    return (
                        <span
                            key={i}
                            className={`text-2xl font-bold uppercase tracking-tighter md:text-4xl lg:text-5xl ${textColor} transition-colors duration-300 ${hoverColor}`}
                        >
                            {term}
                        </span>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default CodePhilosophy;