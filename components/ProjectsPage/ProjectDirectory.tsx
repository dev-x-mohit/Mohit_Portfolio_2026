'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
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

    // Use framer-motion values to track mouse position WITHOUT triggering React re-renders on every pixel move
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Add spring physics for smooth, buttery following
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const containerRef = useRef<HTMLDivElement>(null);

    // Track mouse for the floating image preview with boundary checks
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const tooltipWidth = 320;
            const tooltipHeight = 200;
            const offset = 20;
            
            let x = e.clientX + offset;
            let y = e.clientY + offset;

            // Prevent clipping on the right edge
            if (x + tooltipWidth > window.innerWidth) {
                x = e.clientX - tooltipWidth - offset;
            }
            
            // Prevent clipping on the bottom edge
            if (y + tooltipHeight > window.innerHeight) {
                y = e.clientY - tooltipHeight - offset;
            }

            // Update motion values directly (no React re-render)
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

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
        <div ref={containerRef} className="min-h-screen bg-primary-bg text-foreground pt-32 pb-24 px-4 md:px-12 lg:px-24 relative overflow-hidden transition-colors duration-500">



            {/* Dashboard-Style Header & Filters */}
            <div className="max-w-7xl mx-auto mb-10 relative z-10 mt-8 px-4 md:px-0">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-8 border-b border-foreground/10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground mb-4 drop-shadow-sm">
                            Project <span className="bg-gradient-to-r from-accent-action to-accent-highlight bg-clip-text text-transparent">Directory</span>
                        </h1>
                        <p className="text-foreground/60 font-sans text-base md:text-lg leading-relaxed">
                            A comprehensive catalog of engineering works, experiments, and production applications. Exploring the intersection of design, performance, and scalable architecture.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="flex flex-wrap lg:flex-nowrap items-center gap-6 md:gap-10 shrink-0 bg-foreground/5 backdrop-blur-md border border-foreground/10 p-4 rounded-xl shadow-lg"
                    >
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-semibold text-foreground">{projects.length}</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">Shipped</span>
                        </div>
                        <div className="w-[1px] h-8 bg-foreground/10" />
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-semibold text-foreground">{categories.length - 1}</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">Disciplines</span>
                        </div>
                        <div className="w-[1px] h-8 bg-foreground/10" />
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-semibold text-foreground">
                                {Array.from(new Set(projects.flatMap(p => p.techStack))).length}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">Tech Stacks</span>
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
                    <div className="flex items-center gap-2 mr-4 hidden sm:flex text-foreground/40">
                        <Filter width={16} height={16} />
                        <span className="text-[10px] font-mono uppercase tracking-widest">Filter By</span>
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg font-mono text-xs whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                                ? 'bg-foreground text-background font-bold shadow-[0_0_15px_rgba(var(--accent-action-rgb),0.3)]'
                                : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground border border-foreground/10 hover:border-foreground/20'
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
                        className="fixed z-50 pointer-events-none hidden lg:block rounded-xl overflow-hidden shadow-2xl border border-foreground/10 bg-secondary-bg"
                        style={{
                            x: springX,
                            y: springY,
                            width: 320,
                            height: 200,
                            boxShadow: `0 20px 50px -10px ${hoveredProject.accentColor}80`,
                            top: 0,
                            left: 0,
                        }}
                    >
                        <Image
                            src={hoveredProject.coverImage}
                            alt={hoveredProject.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white font-mono text-xs font-semibold drop-shadow-md">
                            {hoveredProject.stats.topLanguage}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List Header */}
            <div className="max-w-7xl mx-auto hidden md:grid grid-cols-12 gap-4 px-6 pb-4 text-xs font-mono text-foreground/40 uppercase tracking-widest border-b border-foreground/10">
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
                        const isHovered = hoveredProject?.id === project.id;

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group border-b border-foreground/10 last:border-none"
                            >
                                {/* Row Header (Clickable) */}
                                <div
                                    className={`cursor-pointer transition-all duration-300 ${isExpanded ? 'bg-secondary-bg/80 backdrop-blur-md shadow-inner border-l-[3px]' : 'hover:bg-secondary-bg/50 hover:backdrop-blur-sm border-l-[3px] border-transparent'} px-4 md:px-6 py-6`}
                                    style={isExpanded ? { borderLeftColor: project.accentColor } : (isHovered ? { borderLeftColor: project.accentColor } : {})}
                                    onClick={() => toggleExpand(project.id)}
                                    onMouseEnter={() => setHoveredProject(project)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className="flex justify-between items-center md:grid md:grid-cols-12 md:gap-4 w-full">
                                        <div className={`md:col-span-1 text-sm font-mono transition-colors duration-300 hidden md:block ${isExpanded || isHovered ? 'text-foreground/80' : 'text-foreground/40'}`}>
                                            {project.year}
                                        </div>
                                        <div className="md:col-span-4 flex items-center gap-4">
                                            <div
                                                className="w-2.5 h-2.5 rounded-full hidden md:block transition-all duration-300 group-hover:scale-150 shrink-0"
                                                style={{ backgroundColor: project.accentColor, boxShadow: `0 0 12px ${project.accentColor}` }}
                                            />
                                            <span className={`text-xl md:text-2xl font-bold font-display group-hover:translate-x-2 transition-transform duration-300 ${isExpanded ? 'text-foreground' : 'text-foreground/90'}`}>
                                                {project.title}
                                            </span>
                                        </div>
                                        <div className={`md:col-span-3 text-sm transition-colors duration-300 hidden md:block ${isExpanded || isHovered ? 'text-foreground/80' : 'text-foreground/50'}`}>
                                            {project.category}
                                        </div>
                                        <div className="md:col-span-3 hidden md:flex flex-wrap gap-2">
                                            {project.techStack.slice(0, 3).map(tech => (
                                                <span key={tech} className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded border transition-colors duration-300 ${isExpanded || isHovered ? 'bg-foreground/10 border-foreground/20 text-foreground' : 'bg-foreground/5 border-foreground/10 text-foreground/60'}`}>
                                                    {getTechIcon(tech)}
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && <span className="text-xs font-mono text-foreground/40 self-center">+{project.techStack.length - 3}</span>}
                                        </div>
                                        <div className="md:col-span-1 flex items-center justify-end gap-3 text-foreground/40 shrink-0">
                                            {project.githubLink && (
                                                <Link href={project.githubLink} onClick={(e) => e.stopPropagation()} target="_blank" className="hidden sm:block hover:text-foreground transition-colors group-hover:text-foreground/80">
                                                    <Github width={18} height={18} />
                                                </Link>
                                            )}
                                            {project.liveLink && (
                                                <Link href={project.liveLink} onClick={(e) => e.stopPropagation()} target="_blank" className="hidden sm:block hover:text-foreground transition-colors group-hover:text-foreground/80">
                                                    <OpenNewWindow width={18} height={18} />
                                                </Link>
                                            )}
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className={`p-1 rounded-full ${isExpanded ? 'bg-foreground/10 text-foreground' : 'text-foreground/50 group-hover:text-foreground'}`}
                                            >
                                                <NavArrowDown width={20} height={20} className="transition-colors" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Mobile Only Info */}
                                    <div className="md:hidden mt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-foreground/50">
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
                                            className="overflow-hidden bg-secondary-bg/30 backdrop-blur-md border-t border-foreground/5"
                                        >
                                            <div className="p-6 md:p-12 md:pl-[8.33%] grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
                                                {/* Inner Glow */}
                                                <div 
                                                    className="absolute inset-0 opacity-10 pointer-events-none" 
                                                    style={{ background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 70%)` }}
                                                />

                                                {/* Details */}
                                                <div className="relative z-10">
                                                    <p className="text-lg text-foreground/90 mb-6 font-mono leading-relaxed border-l-[3px] pl-4" style={{ borderColor: project.accentColor }}>
                                                        {project.summary}
                                                    </p>

                                                    <div className="prose prose-sm prose-invert prose-p:text-foreground/70 prose-headings:text-foreground prose-a:text-accent-highlight prose-strong:text-foreground max-w-none mb-4 transition-all duration-300">
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
                                                            className="text-accent-action hover:text-accent-highlight font-mono text-xs uppercase tracking-wider mb-8 transition-colors flex items-center gap-1 font-semibold"
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
                                                            <span key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-md text-xs font-mono text-foreground/80 hover:bg-foreground/10 transition-colors">
                                                                {getTechIcon(tech)}
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4">
                                                        {project.liveLink && (
                                                            <Link href={project.liveLink} target="_blank" className="w-full sm:w-auto justify-center px-6 py-3.5 bg-foreground text-background text-sm font-bold hover:bg-foreground/90 transition-all hover:scale-105 shadow-lg flex items-center gap-2 rounded-full">
                                                                Visit Site <OpenNewWindow width={16} height={16} />
                                                            </Link>
                                                        )}
                                                        {project.githubLink && (
                                                            <Link href={project.githubLink} target="_blank" className="w-full sm:w-auto justify-center px-6 py-3.5 bg-foreground/5 text-foreground text-sm font-bold hover:bg-foreground/10 border border-foreground/10 transition-all hover:scale-105 flex items-center gap-2 rounded-full">
                                                                Source Code <Github width={16} height={16} />
                                                            </Link>
                                                        )}
                                                        {project.apkLink && project.apkLink !== '#' && (
                                                            <Link href={project.apkLink} target="_blank" className="w-full sm:w-auto justify-center px-6 py-3.5 bg-emerald-500/10 text-emerald-500 text-sm font-bold hover:bg-emerald-500/20 border border-emerald-500/30 transition-all hover:scale-105 flex items-center gap-2 rounded-full">
                                                                Download APK <Download width={16} height={16} />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Visuals / Stats inside accordion */}
                                                <div className="flex flex-col justify-between relative z-10">
                                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-foreground/10 shadow-2xl mb-8 group/img">
                                                        <Image
                                                            src={project.coverImage}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-4 border-t border-foreground/10 pt-6">
                                                        <div className="bg-foreground/5 p-4 rounded-lg border border-foreground/5 text-center transition-colors hover:bg-foreground/10">
                                                            <div className="text-2xl font-bold font-mono" style={{ color: project.accentColor }}>{project.stats.commits}+</div>
                                                            <div className="text-[10px] text-foreground/50 uppercase tracking-widest mt-1 font-semibold">Commits</div>
                                                        </div>
                                                        <div className="bg-foreground/5 p-4 rounded-lg border border-foreground/5 text-center transition-colors hover:bg-foreground/10">
                                                            <div className="text-2xl font-bold font-mono" style={{ color: project.accentColor }}>{project.stats.stars}</div>
                                                            <div className="text-[10px] text-foreground/50 uppercase tracking-widest mt-1 font-semibold">Stars</div>
                                                        </div>
                                                        <div className="bg-foreground/5 p-4 rounded-lg border border-foreground/5 text-center transition-colors hover:bg-foreground/10">
                                                            <div className="text-lg md:text-xl font-bold font-mono mt-1" style={{ color: project.accentColor }}>{project.stats.topLanguage}</div>
                                                            <div className="text-[10px] text-foreground/50 uppercase tracking-widest mt-2 font-semibold">Language</div>
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
                    <div className="py-24 text-center text-foreground/40 font-mono text-sm border border-foreground/10 rounded-xl bg-foreground/5">
                        No projects found in this category.
                    </div>
                )}
            </div>

        </div>
    );
}
