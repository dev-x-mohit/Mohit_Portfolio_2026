'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { useGlobalData } from '@/context/GlobalContext';

const Certifications = () => {
    const { certifications } = useGlobalData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 6 items for a clean 2x3 or 3x2 grid depending on screen
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Pagination Logic
    const totalPages = Math.ceil(certifications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCertificates = certifications.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(curr => curr + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(curr => curr - 1);
    };

    if (!mounted) return null;

    return (
        <section className="py-32 bg-background relative overflow-hidden" id="certifications">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-500 tracking-widest uppercase mb-4"
                    >
                        <Award size={12} />
                        Professional Credentials
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
                        The Verification <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Vault</span>
                    </h2>
                    <p className="text-muted-foreground/60 max-w-2xl mx-auto text-sm md:text-base">
                        A curated archive of technical validations and industry recognitions.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {currentCertificates.map((cert, index) => (
                                <motion.a
                                    key={cert.title + index}
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full"
                                >
                                    {/* Holographic Border Effect */}
                                    <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-blue-500/30 transition-colors" />

                                    {/* Top Section: Logo & Badge */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-background/50 border border-white/10 p-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <img
                                                src={cert.logo}
                                                alt={cert.issuer}
                                                className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                                            />
                                        </div>
                                        {cert.date && (
                                            <span className="text-[10px] font-mono text-muted-foreground/50 border border-white/5 px-2 py-1 rounded-full">
                                                {cert.date}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="mb-4 flex-grow">
                                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {cert.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                                    </div>

                                    {/* Verification Status */}
                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground/60 group-hover:text-blue-400/80 transition-colors">
                                            <ShieldCheck size={14} />
                                            <span>Verified Credential</span>
                                        </div>
                                        <ExternalLink size={14} className="text-muted-foreground/40 group-hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6 mt-16">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-2 h-2 rounded-full transition-all duration-500 ${currentPage === i + 1
                                        ? 'bg-blue-500 w-8'
                                        : 'bg-white/20 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certifications;
