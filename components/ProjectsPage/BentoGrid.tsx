'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projectData';
import Image from 'next/image';
import { Github, OpenNewWindow, Xmark, Download } from 'iconoir-react';
import Link from 'next/link';

// Helper to determine col/row spans for bento grid variety
const getGridSpan = (index: number) => {
    // Creating an asymmetrical bento pattern
    const pattern = [
        'col-span-12 md:col-span-8 row-span-2', // Large featured
        'col-span-12 md:col-span-4 row-span-1', // Small
        'col-span-12 md:col-span-4 row-span-1', // Small
        'col-span-12 md:col-span-6 row-span-1', // Medium
        'col-span-12 md:col-span-6 row-span-1', // Medium
        'col-span-12 md:col-span-4 row-span-2', // Tall
        'col-span-12 md:col-span-8 row-span-1', // Wide
    ];
    return pattern[index % pattern.length];
};

export default function BentoGrid() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Close modal on escape key
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedProject(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 md:px-8 lg:px-16 relative">
            {/* Background Grain/Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Header */}
            <div className="relative z-10 max-w-7xl mx-auto mb-16">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-4"
                >
                    Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Archive</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl text-white/60 max-w-2xl font-mono"
                >
                    A comprehensive collection of my work, experiments, and open-source contributions.
                </motion.p>
            </div>

            {/* Bento Grid */}
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-4 auto-rows-[250px]">
                {projects.map((project, i) => (
                    <motion.div
                        layoutId={`card-${project.id}`}
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`group relative overflow-hidden rounded-3xl bg-[#111] border border-white/10 cursor-pointer ${getGridSpan(i)}`}
                        whileHover={{ scale: 0.98 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div layoutId={`image-${project.id}`} className="w-full h-full">
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <motion.div layoutId={`content-${project.id}`} className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                            <motion.div layoutId={`category-${project.id}`} className="mb-3">
                                <span 
                                    className="px-3 py-1 text-xs font-mono rounded-full backdrop-blur-md border border-white/20"
                                    style={{ color: project.accentColor, backgroundColor: `${project.accentColor}20` }}
                                >
                                    {project.category}
                                </span>
                            </motion.div>
                            <motion.h3 layoutId={`title-${project.id}`} className="text-2xl md:text-3xl font-bold mb-2">
                                {project.title}
                            </motion.h3>
                            <motion.p layoutId={`summary-${project.id}`} className="text-white/70 text-sm md:text-base line-clamp-2">
                                {project.summary}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                            onClick={() => setSelectedProject(null)}
                        />

                        {/* Modal Container */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
                            <motion.div
                                layoutId={`card-${selectedProject.id}`}
                                className="w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col md:flex-row pointer-events-auto shadow-2xl"
                                style={{ boxShadow: `0 0 100px -20px ${selectedProject.accentColor}40` }}
                            >
                                {/* Left Side: Image & Links */}
                                <div className="w-full md:w-2/5 h-[30vh] md:h-full relative shrink-0">
                                    <motion.div layoutId={`image-${selectedProject.id}`} className="absolute inset-0">
                                        <Image
                                            src={selectedProject.coverImage}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
                                    </motion.div>
                                    
                                    {/* Actions Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 flex gap-3 z-10">
                                        {selectedProject.githubLink && (
                                            <Link href={selectedProject.githubLink} target="_blank" className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white/10 transition-colors text-white">
                                                <Github width={20} height={20} />
                                            </Link>
                                        )}
                                        {selectedProject.liveLink && (
                                            <Link href={selectedProject.liveLink} target="_blank" className="flex-1 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                                Visit Project <OpenNewWindow width={16} height={16} />
                                            </Link>
                                        )}
                                        {selectedProject.apkLink && selectedProject.apkLink !== '#' && (
                                            <Link href={selectedProject.apkLink} target="_blank" className="flex-1 py-3 rounded-full bg-[#3DDC84] text-black font-bold hover:bg-[#3DDC84]/80 transition-colors flex items-center justify-center gap-2">
                                                APK <Download width={16} height={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: Details */}
                                <div className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto relative custom-scrollbar">
                                    <button 
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                                    >
                                        <Xmark width={20} height={20} />
                                    </button>

                                    <motion.div layoutId={`content-${selectedProject.id}`}>
                                        <motion.div layoutId={`category-${selectedProject.id}`} className="mb-4">
                                            <span 
                                                className="px-3 py-1 text-xs font-mono rounded-full border"
                                                style={{ color: selectedProject.accentColor, borderColor: `${selectedProject.accentColor}50`, backgroundColor: `${selectedProject.accentColor}10` }}
                                            >
                                                {selectedProject.category} • {selectedProject.year}
                                            </span>
                                        </motion.div>
                                        
                                        <motion.h2 layoutId={`title-${selectedProject.id}`} className="text-3xl md:text-5xl font-bold mb-4 font-display">
                                            {selectedProject.title}
                                        </motion.h2>

                                        <motion.div layoutId={`summary-${selectedProject.id}`} className="text-xl text-white/80 mb-8 font-mono border-l-2 pl-4" style={{ borderColor: selectedProject.accentColor }}>
                                            {selectedProject.summary}
                                        </motion.div>

                                        <div className="prose prose-invert prose-p:text-white/70 max-w-none mb-10">
                                            {/* We use a simple split/map to render the markdown-like description roughly, or ideally a markdown parser, but for now we'll do simple paragraphs */}
                                            {selectedProject.description.split('\n').map((line, idx) => {
                                                if (line.startsWith('# ')) return <h3 key={idx} className="text-2xl font-bold mt-6 mb-3 text-white">{line.replace('# ', '')}</h3>;
                                                if (line.startsWith('## ')) return <h4 key={idx} className="text-xl font-bold mt-5 mb-2 text-white">{line.replace('## ', '')}</h4>;
                                                if (line.startsWith('### ')) return <h5 key={idx} className="text-lg font-bold mt-4 mb-2 text-white/90">{line.replace('### ', '')}</h5>;
                                                if (line.startsWith('- ')) return <li key={idx} className="text-white/70 ml-4 mb-1">{line.replace('- ', '')}</li>;
                                                if (line.startsWith('> ')) return <blockquote key={idx} className="border-l-4 border-white/20 pl-4 py-1 my-4 italic text-white/60">{line.replace('> ', '')}</blockquote>;
                                                if (line.trim() === '') return <br key={idx} />;
                                                return <p key={idx} className="mb-3">{line}</p>;
                                            })}
                                        </div>

                                        <div className="mb-8">
                                            <h4 className="text-sm font-mono text-white/40 mb-3 uppercase tracking-widest">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map(tech => (
                                                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                                            <div>
                                                <div className="text-2xl font-bold text-white">{selectedProject.stats.commits}+</div>
                                                <div className="text-xs font-mono text-white/40 uppercase">Commits</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-white">{selectedProject.stats.stars}</div>
                                                <div className="text-xs font-mono text-white/40 uppercase">Stars</div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-white mt-1">{selectedProject.stats.topLanguage}</div>
                                                <div className="text-xs font-mono text-white/40 uppercase mt-1">Language</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-white capitalize">{selectedProject.type}</div>
                                                <div className="text-xs font-mono text-white/40 uppercase">Platform</div>
                                            </div>
                                        </div>

                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
