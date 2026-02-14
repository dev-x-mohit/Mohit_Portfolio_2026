'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Code2, Globe, Layers, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center overflow-hidden px-6 py-20 transition-colors duration-300">

            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vh] bg-accent-highlight/5 opacity-[0.4] dark:opacity-[0.05] blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vh] bg-accent-action/5 opacity-[0.4] dark:opacity-[0.05] blur-[120px] rounded-full" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
            </div>

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-6 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-secondary-bg border border-border text-text-secondary text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-accent-action animate-pulse" />
                        Available for projects
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] font-display">
                        Building Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight">Universes</span>.
                    </h1>

                    <p className="text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                        I craft high-performance web applications and immersive mobile experiences. Bridging the gap between design and functional code.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
                        <button className="px-8 py-3.5 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
                            View Projects <ArrowRight size={18} />
                        </button>
                        <button className="px-8 py-3.5 rounded-xl bg-secondary-bg text-foreground border border-border font-semibold hover:border-text-secondary/50 transition-all active:scale-95 cursor-pointer">
                            Contact Me
                        </button>
                    </div>

                    <div className="flex items-center gap-8 mt-8 justify-center lg:justify-start text-text-secondary">
                        {/* Tech Stack Icons (Lucide) */}
                        <div className="flex gap-4">
                            {/* Just abstract icons representing stack */}
                            <Code2 size={24} className="hover:text-accent-action transition-colors" />
                            <Layers size={24} className="hover:text-accent-highlight transition-colors" />
                            <Globe size={24} className="hover:text-accent-action transition-colors" />
                        </div>
                        <div className="h-px w-12 bg-border" />
                        <span className="text-sm font-mono">Web & Mobile</span>
                    </div>
                </motion.div>


                {/* Visual Content (Dual Device Mockup) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[500px] w-full flex items-center justify-center"
                >
                    {/* Floating Elements Background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[300px] h-[300px] bg-gradient-to-tr from-accent-action/20 to-accent-highlight/20 rounded-full blur-[80px] animate-pulse" />
                    </div>

                    {/* Laptop Mockup (Abstract CSS representation) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[60%] w-[360px] md:w-[480px] aspect-[16/10] bg-secondary-bg rounded-xl border border-border shadow-2xl z-10 transform rotate-[-6deg] hover:rotate-0 transition-transform duration-700 ease-out p-1">
                        <div className="w-full h-full bg-background rounded-lg overflow-hidden relative">
                            {/* Header Bar */}
                            <div className="h-6 bg-secondary-bg w-full flex items-center px-3 gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            </div>
                            {/* Screen Content - Code Mockup */}
                            <div className="p-4 font-mono text-xs text-text-secondary">
                                <p className="text-accent-highlight">import <span className="text-accent-action">React</span> from 'react';</p>
                                <p className="mt-2"><span className="text-accent-highlight">const</span> <span className="text-foreground">App</span> = () =&gt; (</p>
                                <p className="pl-4 text-foreground">&lt;div className="future"&gt;</p>
                                <p className="pl-8 text-accent-action">Building.NextGen();</p>
                                <p className="pl-4 text-foreground">&lt;/div&gt;</p>
                                <p>);</p>
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute bottom-4 right-4 bg-accent-highlight/10 text-accent-highlight px-2 py-1 rounded text-[10px] font-bold border border-accent-highlight/20">
                                WEB DEV
                            </div>
                        </div>
                    </div>

                    {/* Phone Mockup (Abstract CSS representation) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-[20%] -translate-y-[40%] w-[140px] md:w-[160px] aspect-[9/19] bg-secondary-bg rounded-[2rem] border-4 border-border shadow-2xl z-20 transform rotate-[12deg] hover:rotate-0 transition-transform duration-700 ease-out overflow-hidden">
                        <div className="w-full h-full bg-background rounded-[1.5rem] relative">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-secondary-bg rounded-b-lg z-30" />

                            {/* Screen Content - App UI */}
                            <div className="p-3 pt-8 flex flex-col gap-3 h-full">
                                <div className="w-full h-24 bg-accent-action/10 rounded-lg animate-pulse" />
                                <div className="flex gap-2">
                                    <div className="w-10 h-10 bg-accent-highlight/10 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="w-3/4 h-2 bg-secondary-bg rounded" />
                                        <div className="w-1/2 h-2 bg-secondary-bg rounded" />
                                    </div>
                                </div>
                                <div className="mt-auto mb-4 bg-background p-2 rounded-lg border border-border text-[8px] text-text-secondary font-mono text-center">
                                    React Native
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-accent-action/10 text-accent-action px-2 py-1 rounded text-[10px] font-bold border border-accent-action/20 whitespace-nowrap">
                                APP DEV
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
