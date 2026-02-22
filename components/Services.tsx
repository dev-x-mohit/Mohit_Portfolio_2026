
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { serviceQualities } from "@/data/servicesData";

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section ref={ref} className="py-32 bg-background relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-background to-background opacity-80" />
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-2 mb-2 text-accent-action/60 font-mono text-sm tracking-wider"
                        >
                            <span className="w-2 h-2 bg-accent-action rounded-full animate-pulse" />
                            SYS.MODULES.V3
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold font-orbitron tracking-tighter text-primary-text"
                        >
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight">DATA VAULT</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-border/30 to-transparent mx-12"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-secondary-text font-exo text-sm max-w-xs text-right hidden md:block"
                    >
                        // SCROLL TO INSPECT <br />
                        // PROTOCOLS ACTIVE
                    </motion.p>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="flex overflow-x-auto pb-12 gap-6 snap-x snap-mandatory scrollbar-hide mask-fade-sides -mx-6 px-6 md:mx-0 md:px-0">
                    {serviceQualities.map((service, index) => (
                        <div key={index} className="min-w-[320px] md:min-w-[400px] snap-center">
                            <MonolithCard service={service} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MonolithCard({ service, index }: { service: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full bg-secondary-bg/5 border border-white/5 p-8 overflow-hidden hover:bg-secondary-bg/10 transition-colors duration-500"
        >
            {/* Active Border Overlay */}
            <div className="absolute inset-0 border border-accent-action/0 group-hover:border-accent-action/50 transition-colors duration-500 z-20 pointer-events-none" />

            {/* Vertical Scanline */}
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-action/0 group-hover:bg-accent-action transition-colors duration-300" />

            {/* Corner Brackets */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-accent-action transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-accent-action transition-colors duration-500" />

            {/* Background Scanlines (Active State) */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,_#000_2px)] bg-[length:100%_4px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-white/5 rounded-sm text-accent-highlight group-hover:text-accent-action group-hover:bg-accent-action/10 transition-all duration-300">
                        <service.icon size={28} />
                    </div>
                    <span className="font-mono text-xs text-secondary-text/50 group-hover:text-accent-action transition-colors duration-300">
                        MNLTH-{index.toString().padStart(2, '0')}
                    </span>
                </div>

                <h3 className="text-2xl font-bold font-orbitron mb-4 text-primary-text group-hover:text-accent-action transition-colors duration-300 tracking-wide">
                    {service.title.toUpperCase()}
                </h3>

                <p className="text-secondary-text font-exo text-sm leading-relaxed group-hover:text-primary-text/90 transition-colors duration-300 border-l border-white/10 pl-4">
                    {service.description}
                </p>

                <div className="mt-auto pt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="w-1.5 h-1.5 bg-accent-action rounded-full animate-ping" />
                    <span className="font-mono text-[10px] text-accent-action uppercase tracking-widest">System Online</span>
                </div>
            </div>
        </motion.div>
    );
}
