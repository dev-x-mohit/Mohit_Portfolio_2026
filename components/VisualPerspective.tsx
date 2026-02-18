'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VisualPerspective = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center bg-transparent my-20">
            {/* 
                TODO: USER - Add your image here.
                Replace the background color/gradient with an <img /> or next/image component.
                Example:
                <Image src="/your-image.jpg" fill className="object-cover" />
             */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <div className="w-full h-[120%] bg-gradient-to-b from-transparent via-accent-action/20 to-transparent opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" />
                {/* Placeholder visual - a grid or abstract shape if no image is present */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay" />
            </motion.div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    style={{ opacity }}
                    className="backdrop-blur-sm bg-background/30 p-8 rounded-2xl border border-white/10"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase font-display">
                        Visionary <span className="text-accent-highlight">Perspective</span>
                    </h2>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto font-light">
                        Seeing beyond the code. Designing experiences that resonate.
                    </p>
                </motion.div>
            </div>

            {/* Cinematic Borders */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-20" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20" />
        </section>
    );
};

export default VisualPerspective;
