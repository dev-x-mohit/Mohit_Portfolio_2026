'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FutureHorizons = () => {
    return (
        <section className="relative w-full py-40 px-6 overflow-hidden flex flex-col items-center justify-center bg-transparent">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-highlight/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl text-center space-y-12"
            >
                <div className="overflow-hidden">
                    <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent-action to-foreground tracking-tighter font-display leading-[1.1]">
                        FUTURE <br /> HORIZONS
                    </h2>
                </div>

                <p className="text-xl md:text-2xl text-text-secondary font-light max-w-2xl mx-auto leading-relaxed">
                    The digital landscape is ever-evolving. <br />
                    I am ready to build what comes next.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                >
                    <a
                        href="/contact"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-foreground text-background rounded-full font-bold text-lg tracking-wide overflow-hidden"
                    >
                        <span className="relative z-10">Initiate Collaboration</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-accent-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                    </a>
                </motion.div>
            </motion.div>

            <div className="mt-32 flex flex-col items-center opacity-30">
                <div className="w-px h-24 bg-gradient-to-b from-foreground to-transparent" />
                <div className="text-[10px] tracking-[0.5em] uppercase mt-4">End of Line</div>
            </div>

        </section>
    );
};

export default FutureHorizons;
