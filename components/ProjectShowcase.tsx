'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Terminal, Cpu, Globe, Hash, Activity } from 'lucide-react';
import Image from 'next/image';

interface Project {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    status: 'Live' | 'Concept' | 'In Development';
    link?: string;
    github?: string;
}

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    // Featured Logic: Every 3rd project or specific IDs span 2 cols
    const isFeatured = project.id === 1 || project.id === 3 || index % 5 === 0;

    return (
        <motion.div
            layout
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative group cursor-pointer ${isFeatured ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}`}
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative h-full w-full bg-[#050505]/40 backdrop-blur-2xl border border-white/5 group-hover:border-accent-action/40 transition-colors duration-700 overflow-hidden flex flex-col rounded-3xl"
            >
                {/* Circuitry Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id={`pattern-${project.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 20 L20 20 L20 0 M20 40 L20 20 L40 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="20" cy="20" r="1" fill="currentColor" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#pattern-${project.id})`} />
                    </svg>
                </div>

                {/* Refractive Light Sweep */}
                <motion.div
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-action/50 to-transparent z-10"
                    animate={{ x: isHovered ? ['-100%', '100%'] : '-100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Project Image */}
                <div className={`relative z-0 ${isFeatured ? 'h-3/4' : 'h-1/2'} overflow-hidden`}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]" />

                    {/* Status Scan Animation */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ top: '0%' }}
                                animate={{ top: '100%' }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-accent-action/30 blur-sm z-10"
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Content */}
                <div className="relative z-20 flex-1 p-8 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent-action flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Live' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-yellow-500'}`} />
                                {project.category}
                            </span>
                            <span className="text-[10px] font-mono text-white/20">0{index + 1}</span>
                        </div>
                        <h3 className={`font-black text-white tracking-tighter leading-none uppercase ${isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                            {project.title}
                        </h3>
                        <p className="text-xs text-white/40 font-mono mt-2 tracking-widest">{project.subtitle}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <p className={`text-white/40 leading-relaxed font-light ${isFeatured ? 'text-sm' : 'text-xs line-clamp-2'}`}>
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-white/[0.03] border border-white/5 text-white/40 transition-colors group-hover:text-white group-hover:border-white/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Links / Meta Footer */}
                <div className="relative z-20 h-14 w-full border-t border-white/5 bg-black/20 flex items-center justify-between px-8">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
                        <Activity size={10} className="text-accent-action" />
                        <span>LOAD_STABLE</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {project.github && (
                            <a href={project.github} className="text-white/40 hover:text-white transition-colors"><Github size={16} /></a>
                        )}
                        {project.link && (
                            <a href={project.link} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"><ExternalLink size={14} /></a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ProjectShowcase = ({ projects }: { projects: Project[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-6 md:gap-8 pb-32">
            <AnimatePresence mode="popLayout">
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ProjectShowcase;
