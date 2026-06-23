'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projectData';
import Image from 'next/image';
import Link from 'next/link';
import { Github, OpenNewWindow, Download, NavArrowDown, Filter, Code } from 'iconoir-react';
import ReactMarkdown from 'react-markdown';
import { SiNextdotjs, SiPrisma, SiPostgresql, SiRazorpay, SiOpenai, SiReact, SiTailwindcss, SiVite, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiHtml5, SiCss3, SiJavascript, SiSocketdotio, SiTypescript } from 'react-icons/si';

const getTechIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('next')) return <SiNextdotjs className="w-3 h-3" />;
    if (t.includes('prisma')) return <SiPrisma className="w-3 h-3" />;
    if (t.includes('postgres')) return <SiPostgresql className="w-3 h-3" />;
    if (t.includes('razorpay')) return <SiRazorpay className="w-3 h-3" />;
    if (t.includes('openai') || t.includes('gemini')) return <SiOpenai className="w-3 h-3" />;
    if (t.includes('react')) return <SiReact className="w-3 h-3" />;
    if (t.includes('tailwind')) return <SiTailwindcss className="w-3 h-3" />;
    if (t.includes('vite')) return <SiVite className="w-3 h-3" />;
    if (t.includes('node')) return <SiNodedotjs className="w-3 h-3" />;
    if (t.includes('express')) return <SiExpress className="w-3 h-3" />;
    if (t.includes('mongo')) return <SiMongodb className="w-3 h-3" />;
    if (t.includes('firebase')) return <SiFirebase className="w-3 h-3" />;
    if (t.includes('html')) return <SiHtml5 className="w-3 h-3" />;
    if (t.includes('css') || t.includes('sass')) return <SiCss3 className="w-3 h-3" />;
    if (t.includes('javascript')) return <SiJavascript className="w-3 h-3" />;
    if (t.includes('typescript')) return <SiTypescript className="w-3 h-3" />;
    if (t.includes('socket')) return <SiSocketdotio className="w-3 h-3" />;
    return <Code className="w-3 h-3" />;
};

export default function ProjectDirectory() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
    const [expandedDescId, setExpandedDescId] = useState<string | null>(null);
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef<HTMLDivElement>(null);

    // Track mouse for the floating image preview
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Adjust position slightly so the image isn't directly under the cursor
            setMousePosition({ x: e.clientX + 20, y: e.clientY + 20 });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

    // Filter projects
    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    const toggleExpand = (id: string) => {
        setExpandedProjectId(prev => prev === id ? null : id);
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">

            {/* Dashboard-Style Header & Filters */}
            <div className="max-w-7xl mx-auto mb-10 relative z-10 mt-8 px-4 md:px-0">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-8 border-b border-white/10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white mb-4">
                            Projects
                        </h1>
                        <p className="text-white/50 font-sans text-base md:text-lg leading-relaxed">
                            A comprehensive catalog of engineering works, experiments, and production applications. Exploring the intersection of design, performance, and scalable architecture.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="flex flex-wrap lg:flex-nowrap items-center gap-6 md:gap-10 shrink-0 bg-white/[0.02] border border-white/5 p-4 rounded-xl"
                    >
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-semibold text-white">{projects.length}</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Shipped</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-semibold text-white">{categories.length - 1}</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Disciplines</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-semibold text-white">
                                {Array.from(new Set(projects.flatMap(p => p.techStack))).length}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Tech Stacks</span>
                        </div>
                    </motion.div>
                </div>

                {/* Filters */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-2 pt-6"
                >
                    <div className="flex items-center gap-2 mr-4 hidden sm:flex text-white/30">
                        <Filter width={16} height={16} />
                        <span className="text-[10px] font-mono uppercase tracking-widest">Filter By</span>
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-md font-mono text-xs whitespace-nowrap transition-all duration-200 ${selectedCategory === cat
                                ? 'bg-white text-black font-semibold shadow-sm'
                                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Floating Image Preview (Visible only on desktop hover) */}
            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed z-50 pointer-events-none hidden lg:block rounded-xl overflow-hidden shadow-2xl border border-white/10"
                        style={{
                            left: mousePosition.x,
                            top: mousePosition.y,
                            width: 320,
                            height: 200,
                            boxShadow: `0 20px 50px -10px ${hoveredProject.accentColor}50`
                        }}
                    >
                        <Image
                            src={hoveredProject.coverImage}
                            alt={hoveredProject.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white font-mono text-xs opacity-80">
                            {hoveredProject.stats.topLanguage}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List Header */}
            <div className="max-w-7xl mx-auto hidden md:grid grid-cols-12 gap-4 px-6 pb-4 text-xs font-mono text-white/30 uppercase tracking-widest border-b border-white/5">
                <div className="col-span-1">Year</div>
                <div className="col-span-4">Project</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-3">Core Tech</div>
                <div className="col-span-1 text-right">Links</div>
            </div>

            {/* Project List */}
            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => {
                        const isExpanded = expandedProjectId === project.id;

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group border-b border-white/5 last:border-none"
                            >
                                {/* Row Header (Clickable) */}
                                <div
                                    className={`cursor-pointer transition-colors duration-300 ${isExpanded ? 'bg-white/5' : 'hover:bg-white/[0.02]'} px-4 md:px-6 py-6`}
                                    onClick={() => toggleExpand(project.id)}
                                    onMouseEnter={() => setHoveredProject(project)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className="flex justify-between items-center md:grid md:grid-cols-12 md:gap-4 w-full">
                                        <div className="md:col-span-1 text-sm font-mono text-white/40 hidden md:block">
                                            {project.year}
                                        </div>
                                        <div className="md:col-span-4 flex items-center gap-4">
                                            <div
                                                className="w-2 h-2 rounded-full hidden md:block transition-all duration-300 group-hover:scale-150 shrink-0"
                                                style={{ backgroundColor: project.accentColor, boxShadow: `0 0 10px ${project.accentColor}` }}
                                            />
                                            <span className="text-xl md:text-2xl font-bold font-display group-hover:translate-x-2 transition-transform duration-300">
                                                {project.title}
                                            </span>
                                        </div>
                                        <div className="md:col-span-3 text-sm text-white/50 hidden md:block">
                                            {project.category}
                                        </div>
                                        <div className="md:col-span-3 hidden md:flex flex-wrap gap-2">
                                            {project.techStack.slice(0, 3).map(tech => (
                                                <span key={tech} className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 bg-white/5 rounded border border-white/10 text-white/60">
                                                    {getTechIcon(tech)}
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && <span className="text-xs font-mono text-white/30">+{project.techStack.length - 3}</span>}
                                        </div>
                                        <div className="md:col-span-1 flex items-center justify-end gap-3 text-white/30 shrink-0">
                                            {project.githubLink && (
                                                <Link href={project.githubLink} onClick={(e) => e.stopPropagation()} target="_blank" className="hidden sm:block hover:text-white transition-colors group-hover:text-white/70">
                                                    <Github width={16} height={16} />
                                                </Link>
                                            )}
                                            {project.liveLink && (
                                                <Link href={project.liveLink} onClick={(e) => e.stopPropagation()} target="_blank" className="hidden sm:block hover:text-white transition-colors group-hover:text-white/70">
                                                    <OpenNewWindow width={16} height={16} />
                                                </Link>
                                            )}
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <NavArrowDown width={20} height={20} className="text-white/50 group-hover:text-white transition-colors" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Mobile Only Info */}
                                    <div className="md:hidden mt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-white/40">
                                        <span>{project.year}</span>
                                        <span>•</span>
                                        <span style={{ color: project.accentColor }}>{project.category}</span>
                                    </div>
                                </div>

                                {/* Expanded Details Accordion */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="overflow-hidden bg-black/20"
                                        >
                                            <div className="p-6 md:p-12 md:pl-[8.33%] grid grid-cols-1 lg:grid-cols-2 gap-12">

                                                {/* Details */}
                                                <div>
                                                    <p className="text-lg text-white/80 mb-6 font-mono leading-relaxed border-l-2 pl-4" style={{ borderColor: project.accentColor }}>
                                                        {project.summary}
                                                    </p>

                                                    <div className="prose prose-sm prose-invert prose-p:text-white/60 prose-headings:text-white prose-a:text-purple-400 prose-strong:text-white max-w-none mb-4 transition-all duration-300">
                                                        <ReactMarkdown>
                                                            {project.description.length > 1000 && expandedDescId !== project.id
                                                                ? project.description.slice(0, 600) + '...'
                                                                : project.description}
                                                        </ReactMarkdown>
                                                    </div>

                                                    {project.description.length > 1000 && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExpandedDescId(expandedDescId === project.id ? null : project.id);
                                                            }}
                                                            className="text-purple-400 hover:text-purple-300 font-mono text-xs uppercase tracking-wider mb-8 transition-colors flex items-center gap-1"
                                                        >
                                                            {expandedDescId === project.id ? "Show Less" : "Learn More"}
                                                            <NavArrowDown
                                                                width={14} height={14}
                                                                className={`transform transition-transform ${expandedDescId === project.id ? 'rotate-180' : ''}`}
                                                            />
                                                        </button>
                                                    )}

                                                    <div className={`flex flex-wrap gap-2 mb-8 ${project.description.length <= 1000 ? 'mt-4' : ''}`}>
                                                        {project.techStack.map(tech => (
                                                            <span key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/80">
                                                                {getTechIcon(tech)}
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4">
                                                        {project.liveLink && (
                                                            <Link href={project.liveLink} target="_blank" className="w-full sm:w-auto justify-center px-6 py-3 bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 rounded-full">
                                                                Visit Site <OpenNewWindow width={16} height={16} />
                                                            </Link>
                                                        )}
                                                        {project.githubLink && (
                                                            <Link href={project.githubLink} target="_blank" className="w-full sm:w-auto justify-center px-6 py-3 bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors flex items-center gap-2 rounded-full">
                                                                Source Code <Github width={16} height={16} />
                                                            </Link>
                                                        )}
                                                        {project.apkLink && project.apkLink !== '#' && (
                                                            <Link href={project.apkLink} target="_blank" className="w-full sm:w-auto justify-center px-6 py-3 bg-[#3DDC84]/20 text-[#3DDC84] text-sm font-bold hover:bg-[#3DDC84]/30 border border-[#3DDC84]/50 transition-colors flex items-center gap-2 rounded-full">
                                                                Download APK <Download width={16} height={16} />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Visuals / Stats inside accordion */}
                                                <div className="flex flex-col justify-between">
                                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-8">
                                                        <Image
                                                            src={project.coverImage}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                                        <div>
                                                            <div className="text-2xl font-bold font-mono" style={{ color: project.accentColor }}>{project.stats.commits}+</div>
                                                            <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Commits</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-2xl font-bold font-mono" style={{ color: project.accentColor }}>{project.stats.stars}</div>
                                                            <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Stars</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xl font-bold font-mono mt-1" style={{ color: project.accentColor }}>{project.stats.topLanguage}</div>
                                                            <div className="text-[10px] text-white/40 uppercase tracking-widest mt-2">Language</div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <div className="py-24 text-center text-white/40 font-mono">
                        No projects found in this category.
                    </div>
                )}
            </div>

        </div>
    );
}
