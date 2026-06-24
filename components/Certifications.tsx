'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { NavArrowRight, NavArrowLeft, OpenNewWindow, CheckCircle, Trophy } from 'iconoir-react';
import { useGlobalData } from '@/context/GlobalContext';

// A single credential card with a spotlight hover effect
const CredentialCard = ({ cert, index }: { cert: any, index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="group relative flex flex-col h-full rounded-[2rem] border border-border/10 bg-secondary-bg/20 p-8 overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-accent-action/40 hover:bg-secondary-bg/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(96,165,250,0.15)]"
        >
            {/* Interactive Spotlight Hover Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            var(--accent-action) 0%,
                            transparent 20%
                        )
                    `,
                    opacity: 0.15
                }}
            />

            <div className="relative z-10 flex flex-col h-full gap-6">
                {/* Header: Logo & Badge */}
                <div className="flex items-start justify-between">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-background/50 p-3 shadow-inner border border-border/10 transition-transform duration-500 group-hover:scale-110 group-hover:border-accent-action/30 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]">
                        <img
                            src={cert.logo}
                            alt={cert.issuer}
                            className="h-full w-full object-contain drop-shadow-md transition-all duration-500 group-hover:brightness-125"
                        />
                    </div>
                    
                    <div className="flex items-center gap-1.5 rounded-full border border-border/10 bg-background/30 px-3 py-1.5 backdrop-blur-md transition-all duration-500 group-hover:bg-accent-action/10 group-hover:border-accent-action/30">
                        <CheckCircle className="text-accent-highlight w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary group-hover:text-foreground">Verified</span>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                        {cert.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm font-medium">
                        <span className="text-accent-action font-semibold">{cert.issuer}</span>
                        {cert.date && <span className="h-1 w-1 rounded-full bg-border/40" />}
                        {cert.date && <span className="text-text-secondary/80 font-mono text-xs">{cert.date}</span>}
                    </div>
                </div>

                {/* Skills Pills */}
                {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {cert.skills.slice(0, 3).map((skill: string, sIdx: number) => (
                            <span 
                                key={sIdx} 
                                className="rounded-lg border border-border/10 bg-background/50 px-3 py-1.5 text-[11px] font-bold tracking-wide text-text-secondary/80 transition-all duration-300 group-hover:border-accent-action/30 group-hover:bg-accent-action/5 group-hover:text-foreground"
                            >
                                {skill}
                            </span>
                        ))}
                        {cert.skills.length > 3 && (
                            <span className="rounded-lg border border-border/10 bg-background/30 px-3 py-1.5 text-[11px] font-bold text-text-secondary/50">
                                +{cert.skills.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Bottom Footer - Credential ID & Link Icon */}
                <div className="mt-4 pt-4 border-t border-border/10 flex items-center justify-between transition-colors duration-500 group-hover:border-accent-action/20">
                    <div className="flex-1 overflow-hidden pr-4">
                        {cert.credential && (
                            <p className="font-mono text-[10px] text-text-secondary/40 truncate transition-colors duration-500 group-hover:text-text-secondary/80">
                                ID: {cert.credential}
                            </p>
                        )}
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/50 text-text-secondary/40 transition-all duration-500 group-hover:bg-accent-action group-hover:text-white group-hover:-translate-y-1">
                        <OpenNewWindow width={14} height={14} strokeWidth={2.5} />
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

const Certifications = () => {
    const { certifications } = useGlobalData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalPages = Math.ceil(certifications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCertificates = certifications.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && currentPage < totalPages) {
                setCurrentPage((prev) => prev + 1);
            } else if (e.key === 'ArrowLeft' && currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, totalPages]);

    if (!mounted) return null;

    return (
        <section
            className="relative w-full overflow-hidden bg-background py-32 transition-colors duration-500"
            id="certifications"
        >
            {/* Ambient background orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-10 h-[500px] w-[500px] rounded-full bg-accent-highlight/5 blur-[150px]" />
                <div className="absolute bottom-1/4 right-10 h-[500px] w-[500px] rounded-full bg-accent-action/5 blur-[150px]" />
            </div>

            <div className="container relative mx-auto max-w-7xl px-6">
                {/* Header Section */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/20 pb-8">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-4 flex items-center gap-3"
                        >
                            <Trophy className="text-accent-highlight w-5 h-5" />
                            <span className="font-mono text-sm font-bold tracking-[0.3em] text-accent-highlight uppercase">
                                Verified Mastery
                            </span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-display text-foreground"
                        >
                            Certifications <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-secondary/50 to-text-secondary/20">& Training</span>
                        </motion.h2>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-2 rounded-full border border-border/20 bg-secondary-bg/30 p-1.5 backdrop-blur-xl shadow-sm"
                        >
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent text-foreground/50 transition-all hover:bg-background hover:text-foreground disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                aria-label="Previous page"
                            >
                                <NavArrowLeft width={24} height={24} strokeWidth={2.5} />
                            </button>

                            <div className="flex px-4 items-center gap-2 font-mono text-sm font-bold tracking-widest">
                                <span className="text-accent-action">{String(currentPage).padStart(2, '0')}</span>
                                <span className="text-text-secondary/30">/</span>
                                <span className="text-text-secondary/60">{String(totalPages).padStart(2, '0')}</span>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent text-foreground/50 transition-all hover:bg-background hover:text-foreground disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                aria-label="Next page"
                            >
                                <NavArrowRight width={24} height={24} strokeWidth={2.5} />
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Grid */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                        >
                            {currentCertificates.map((cert, index) => (
                                <CredentialCard key={`${cert.title}-${index}`} cert={cert} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Empty state (if no certifications) */}
                {certifications.length === 0 && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="h-24 w-24 rounded-full bg-secondary-bg/30 flex items-center justify-center mb-6 border border-border/10">
                            <Trophy className="text-text-secondary/30 w-10 h-10" />
                        </div>
                        <p className="text-text-secondary/50 font-mono text-lg">
                            System.out.println("No certifications to display");
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certifications;