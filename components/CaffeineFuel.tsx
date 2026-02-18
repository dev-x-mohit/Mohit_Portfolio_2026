'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Coffee, CupSoda, Droplets } from 'lucide-react';

const CaffeineFuel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative w-full py-32 px-6 overflow-hidden flex flex-col items-center justify-center bg-background text-foreground">

            {/* Elegant Background - Deep Dark */}
            <div className="absolute inset-0 bg-background/80 pointer-events-none" />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 w-full max-w-5xl"
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tighter">
                        Liquid <span className="text-accent-action">Inventory</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        A curated selection of bio-fuel sources. Prioritizing taste, warmth, and cognitive sustainability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    {/* TEA (CHAI) - Primary */}
                    <div className="group relative rounded-3xl overflow-hidden h-96 transition-all duration-500 hover:scale-[1.02] border border-border/10">
                        {/* Background: Rich Spiced Gold/Amber Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-orange-900/40 to-yellow-900/20 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Liquid Effect Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                                <div className="bg-background/20 backdrop-blur-md p-3 rounded-2xl text-amber-500 border border-border/10">
                                    <CupSoda size={32} />
                                </div>
                                <span className="px-3 py-1 bg-amber-950/30 backdrop-blur text-amber-500 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-500/30">
                                    Primary Source
                                </span>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-foreground mb-2">Masala Chai</h3>
                                <p className="text-text-secondary font-medium leading-relaxed">
                                    The perfect balance of spice, warmth, and caffeine. A steady, comforting rhythm for long coding sessions.
                                </p>
                            </div>
                        </div>

                        {/* Animated Wave visual at bottom (simulated) */}
                        <div className="absolute bottom-[-50px] left-[-20%] w-[140%] h-40 bg-accent-highlight/5 blur-3xl rounded-[100%] animate-wave-slow pointer-events-none" />
                    </div>


                    {/* COFFEE - Secondary */}
                    <div className="group relative rounded-3xl overflow-hidden h-96 transition-all duration-500 hover:scale-[1.02] border border-border/10">
                        {/* Background: Deep Dark Roast Black/Brown */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 via-neutral-900/50 to-black/50 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                                <div className="bg-background/20 backdrop-blur-md p-3 rounded-2xl text-foreground border border-border/10">
                                    <Coffee size={32} />
                                </div>
                                <span className="px-3 py-1 bg-black/20 backdrop-blur text-text-secondary text-xs font-bold uppercase tracking-widest rounded-full border border-border/20">
                                    Reserve
                                </span>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-foreground mb-2">Dark Roast</h3>
                                <p className="text-text-secondary font-medium leading-relaxed">
                                    Intense, bold, and utilitarian. Deployed when the deadline looms and subtlety is no longer an option.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </motion.div>
        </section>
    );
};

export default CaffeineFuel;
