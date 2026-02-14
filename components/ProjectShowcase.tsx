'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
}

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl transition-all hover:bg-white/[0.06] hover:border-white/10 ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
                }`}
        >
            {/* Image Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--accent-action)] border border-[var(--accent-action)]/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <motion.div
                        whileHover={{ rotate: 45 }}
                        className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-[var(--accent-action)] group-hover:text-white transition-all cursor-pointer"
                    >
                        <ArrowUpRight size={20} />
                    </motion.div>
                </div>

                <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {project.description}
                    </p>

                    <div className="flex items-center gap-6 pt-6 border-t border-white/5 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                        <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent-action)] hover:text-white transition-colors">
                            <Github size={14} /> Source
                        </a>
                        <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent-action)] hover:text-white transition-colors">
                            <ExternalLink size={14} /> Live Demo
                        </a>
                    </div>
                </div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </motion.div>
    );
};

const ProjectShowcase = ({ projects }: { projects: Project[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px] md:auto-rows-[350px]">
            <AnimatePresence mode="popLayout">
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ProjectShowcase;
