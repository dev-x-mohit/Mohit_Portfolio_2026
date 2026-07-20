'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects, Project } from '@/data/projectData';
import Image from 'next/image';
import Link from 'next/link';
import { Github, OpenNewWindow, Download, NavArrowDown, Filter, Code, Package as PackageIcon } from 'iconoir-react';
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

const getThemeAccentColor = (accentColor: string, isDarkMode: boolean) => {
    if (!accentColor) return 'var(--gold-primary)';

    // Normalize black/white
    if (accentColor.toLowerCase() === '#ffffff' || accentColor.toLowerCase() === '#fff') {
        return isDarkMode ? '#ffffff' : 'var(--gold-primary)';
    }
    if (accentColor.toLowerCase() === '#000000' || accentColor.toLowerCase() === '#000') {
        return isDarkMode ? 'var(--gold-primary)' : 'var(--foreground)';
    }

    // If it's a CSS variable, return it
    if (accentColor.startsWith('var(')) return accentColor;

    // Parse hex color
    const hex = accentColor.replace('#', '');
    if (hex.length === 6 || hex.length === 3) {
        const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
        const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
        const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);

        // Calculate YIQ brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        if (isDarkMode) {
            // In dark mode, if the color is too dark, make it lighter/brighter
            if (brightness < 60) {
                return 'var(--gold-primary)';
            }
            return accentColor;
        } else {
            // In light mode, if the color is too bright/light (high brightness), make it darker
            if (brightness > 170) {
                // If it's a neon green/mint, map to readable green/teal
                if (g > r && g > b) {
                    return '#0D9488'; // Clean readable teal
                }
                // If it's a light gray/silver, map to gold primary
                if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
                    return 'var(--gold-primary)';
                }
                // Otherwise fallback to gold primary
                return 'var(--gold-primary)';
            }
            return accentColor;
        }
    }

    return accentColor;
};

const FEATURED_IDS = ['feat-10', 'feat-9', 'feat-6'];

const getProjectStatusBadge = (id: string) => {
    if (id === 'feat-10') return 'PRODUCTION • ACTIVE';
    if (id === 'feat-9') return 'PRODUCTION • ACTIVE';
    if (id === 'feat-6') return 'FEATURED • ACTIVE';
    if (id === 'feat-12') return 'OPEN SOURCE • NPM';
    return 'ARCHIVED • COMPLETED';
};

const getProjectScopeBadge = (id: string) => {
    if (id === 'feat-10') return 'FULL STACK ARCHITECTURE';
    if (id === 'feat-9') return 'CROSS-PLATFORM ARCHITECTURE';
    if (id === 'feat-6') return 'COLLABORATIVE SYSTEMS DESIGN';
    if (id === 'feat-2') return 'LOCAL-FIRST PWA ARCHITECTURE';
    if (id === 'feat-3') return 'SSR FRONTEND DESIGN';
    if (id === 'feat-4') return 'NLP UTILITY & WEB WORKERS';
    if (id === 'feat-5') return 'SASS VEHICLE DESIGN SYSTEM';
    if (id === 'feat-12') return 'OPEN-SOURCE NPM PACKAGE';
    return 'FRONTEND WEB UTILITY';
};

const getCleanCaseStudyText = (project: Project) => {
    const desc = project.description || '';

    // If it doesn't contain headers, just return it
    if (!desc.includes('#') && !desc.includes('---')) {
        return desc.trim() || project.summary;
    }

    // Split by horizontal rule to remove Highlights and Tech Stack lists
    const parts = desc.split('---');
    const firstPart = parts[0];

    // Split into lines
    const lines = firstPart.split('\n');

    // Filter out titles, blockquotes, tables, and dividers
    const cleanedLines = lines.filter(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('#')) return false; // Remove titles
        if (trimmed.startsWith('>')) return false; // Remove blockquote
        if (trimmed.startsWith('|')) return false; // Remove tables
        return true;
    });

    const text = cleanedLines.join('\n').trim();

    // Check if the description contains generic template/boilerplate text
    const isBoilerplate =
        text.toLowerCase().includes('this template provides') ||
        text.toLowerCase().includes('this project was bootstrapped') ||
        text.length < 10;

    if (isBoilerplate) {
        return project.summary;
    }

    return text;
};

export default function ProjectDirectory() {
    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(systemTheme);
        } else {
            setIsDark(theme === 'dark');
        }
    }, [theme]);

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
    const [activeInsightTab, setActiveInsightTab] = useState<Record<string, number>>({});
    const [isArchiveExpanded, setIsArchiveExpanded] = useState(false);

    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

    const getInsightTab = (projectId: string) => activeInsightTab[projectId] ?? 0;
    const setInsightTab = (projectId: string, tab: number) =>
        setActiveInsightTab(prev => ({ ...prev, [projectId]: tab }));

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

    // Separate featured and archived projects
    const featuredProjectsList = filteredProjects.filter(p => FEATURED_IDS.includes(p.id));
    const archiveProjectsList = filteredProjects.filter(p => !FEATURED_IDS.includes(p.id));

    // Show archive if expanded or if user is filtering
    const showArchive = isArchiveExpanded || selectedCategory !== 'All';

    const toggleExpand = (id: string) => {
        setExpandedProjectId(prev => prev === id ? null : id);
    };

    const renderProjectRow = (project: Project) => {
        const isExpanded = expandedProjectId === project.id;
        const isHovered = hoveredProject?.id === project.id;
        const accentColor = getThemeAccentColor(project.accentColor, isDark);

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
                    className={`cursor-pointer transition-all duration-300 ${isExpanded ? 'bg-secondary-bg/85 backdrop-blur-md shadow-inner border-l-[3px]' : 'hover:bg-secondary-bg/50 hover:backdrop-blur-sm border-l-[3px] border-transparent'} px-4 md:px-6 py-6`}
                    style={isExpanded ? { borderLeftColor: accentColor } : (isHovered ? { borderLeftColor: accentColor } : {})}
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
                                style={{ backgroundColor: accentColor, boxShadow: `0 0 12px ${accentColor}` }}
                            />
                            <span className={`text-xl md:text-2xl font-bold font-display group-hover:translate-x-2 transition-transform duration-300 ${isExpanded ? 'text-foreground font-semibold' : 'text-foreground/90'}`}>
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
                        <span style={{ color: accentColor }}>{project.category}</span>
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
                            <div className="p-4 sm:p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative w-full">
                                {/* Inner Glow */}
                                <div
                                    className="absolute inset-0 opacity-5 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 75%)` }}
                                />

                                {/* Details / Tabs Column (col-span-6) */}
                                <div className="lg:col-span-6 relative z-10 flex flex-col justify-between">
                                    <div>
                                        {/* Status & Scope Badges */}
                                        <div className="flex flex-wrap items-center gap-3 mb-4 text-[10px] font-mono tracking-widest font-bold">
                                            <div className="flex items-center gap-2" style={{ color: accentColor }}>
                                                <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
                                                {getProjectStatusBadge(project.id)}
                                            </div>
                                            <span className="text-foreground/20 font-light">•</span>
                                            <span className="text-foreground/50">{getProjectScopeBadge(project.id)}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-foreground mb-4 uppercase">
                                            {project.title}
                                        </h3>

                                        {/* Impact Summary */}
                                        <p className="text-base text-foreground/90 font-mono mb-8 border-l-[3px] pl-4 py-0.5 leading-relaxed" style={{ borderColor: accentColor }}>
                                            {project.summary}
                                        </p>

                                        {/* Tabs */}
                                        <div className="flex flex-nowrap whitespace-nowrap border-b border-foreground/10 mb-6 font-mono text-xs overflow-x-auto gap-2 md:gap-4 pb-1 scrollbar-none">
                                            {['Case Study', 'Engineering Challenges', 'Key Learnings', 'Tech Evolution'].map((tab, idx) => {
                                                const isActive = getInsightTab(project.id) === idx;
                                                return (
                                                    <button
                                                        key={tab}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setInsightTab(project.id, idx);
                                                        }}
                                                        className={`py-2 px-1 transition-all duration-300 font-semibold uppercase tracking-wider relative whitespace-nowrap text-sm md:text-[15px] cursor-pointer ${isActive
                                                                ? 'text-foreground font-bold'
                                                                : 'text-foreground/60 hover:text-foreground/90'
                                                            }`}
                                                        style={isActive ? { borderBottom: `2px solid ${accentColor}`, color: accentColor } : {}}
                                                    >
                                                        {tab}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Tab Content */}
                                        <div className="min-h-[220px] transition-all duration-300">
                                            {getInsightTab(project.id) === 0 && (
                                                <div className="space-y-6">
                                                    <div className="text-foreground/80 text-sm md:text-base leading-relaxed font-sans font-light">
                                                        <ReactMarkdown>
                                                            {getCleanCaseStudyText(project)}
                                                        </ReactMarkdown>
                                                    </div>

                                                    {project.features && project.features.length > 0 && (
                                                        <div className="border-t border-foreground/10 pt-6">
                                                            <h4 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-4 font-semibold">Key Capabilities & Features</h4>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                {project.features.map((feat, idx) => (
                                                                    <div key={idx} className="flex items-start gap-2.5 text-base font-sans text-foreground/80 leading-relaxed">
                                                                        <span className="text-[var(--gold-primary)] font-mono shrink-0 mt-1">✦</span>
                                                                        <span>{feat}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {getInsightTab(project.id) === 1 && (
                                                <ul className="space-y-4 font-sans text-sm text-foreground/80">
                                                    {project.challenges?.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <span className="text-red-500 font-mono shrink-0 mt-0.5 font-bold">✕</span>
                                                            <span className="leading-relaxed">{item}</span>
                                                        </li>
                                                    )) || <li className="text-foreground/40 font-mono text-xs italic">No specific challenges logged for this project.</li>}
                                                </ul>
                                            )}
                                            {getInsightTab(project.id) === 2 && (
                                                <ul className="space-y-4 font-sans text-sm text-foreground/80">
                                                    {project.learned?.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <span className="text-emerald-500 font-mono shrink-0 mt-0.5 font-bold">✓</span>
                                                            <span className="leading-relaxed">{item}</span>
                                                        </li>
                                                    )) || <li className="text-foreground/40 font-mono text-xs italic">No specific learnings logged.</li>}
                                                </ul>
                                            )}
                                            {getInsightTab(project.id) === 3 && (
                                                <ul className="space-y-4 font-sans text-sm text-foreground/80">
                                                    {project.techEvolution?.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <span className="text-amber-500 font-mono shrink-0 mt-0.5 font-bold">→</span>
                                                            <span className="leading-relaxed">{item}</span>
                                                        </li>
                                                    )) || <li className="text-foreground/40 font-mono text-xs italic">No architecture evolutions logged.</li>}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="mt-8 pt-6 border-t border-foreground/5">
                                        <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-3 font-semibold">Technologies Leveraged</div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map(tech => (
                                                <span key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-md text-xs font-mono text-foreground/80 hover:bg-foreground/10 transition-colors">
                                                    {getTechIcon(tech)}
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Visuals / Stats Column (col-span-6) */}
                                <div className="lg:col-span-6 relative z-10 flex flex-col justify-between h-full gap-8">
                                    {/* Cover Image */}
                                    <div className="relative w-full aspect-video rounded-none overflow-hidden border border-foreground/10 shadow-2xl group/img bg-secondary-bg">
                                        <Image
                                            src={project.coverImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-b border-foreground/10 py-6">
                                        <div className="bg-foreground/5 p-2 sm:p-4 rounded-none border border-foreground/5 text-center transition-colors hover:bg-foreground/10">
                                            <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-mono" style={{ color: accentColor }}>{project.stats.commits}+</div>
                                            <div className="text-[9px] sm:text-[10px] text-foreground/50 uppercase tracking-widest mt-1 font-semibold">Commits</div>
                                        </div>
                                        <div className="bg-foreground/5 p-2 sm:p-4 rounded-none border border-foreground/5 text-center transition-colors hover:bg-foreground/10 flex flex-col justify-center">
                                            {project.stats.stars > 0 ? (
                                                <>
                                                    <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-mono" style={{ color: accentColor }}>{project.stats.stars}</div>
                                                    <div className="text-[9px] sm:text-[10px] text-foreground/50 uppercase tracking-widest mt-1 font-semibold">Stars</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-[9px] sm:text-[11px] md:text-xs font-extrabold font-mono uppercase tracking-wider line-clamp-2" style={{ color: accentColor }}>
                                                        {project.type === 'both' ? 'Cross-Platform' : project.type === 'mobile' ? 'Mobile' : 'Web'}
                                                    </div>
                                                    <div className="text-[9px] sm:text-[10px] text-foreground/50 uppercase tracking-widest mt-2 font-semibold">Architecture</div>
                                                </>
                                            )}
                                        </div>
                                        <div className="bg-foreground/5 p-2 sm:p-4 rounded-none border border-foreground/5 text-center transition-colors hover:bg-foreground/10">
                                            <div className="text-sm sm:text-base font-bold font-mono truncate" style={{ color: accentColor }}>{project.stats.topLanguage}</div>
                                            <div className="text-[9px] sm:text-[10px] text-foreground/50 uppercase tracking-widest mt-1 font-semibold">Language</div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-3">
                                        {project.liveLink && (
                                            <Link href={project.liveLink} target="_blank" className="w-full justify-center px-6 py-3.5 btn-metallic flex items-center gap-2 text-sm font-bold text-center font-mono uppercase tracking-wider">
                                                View Live Project <OpenNewWindow width={16} height={16} />
                                            </Link>
                                        )}
                                        {project.githubLink && (
                                            <Link href={project.githubLink} target="_blank" className="btn-secondary w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold font-mono uppercase tracking-wider">
                                                View Source Code <Github width={16} height={16} />
                                            </Link>
                                        )}
                                        {project.apkLink && project.apkLink !== '#' && (
                                            <Link href={project.apkLink} target="_blank" className="btn-android w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold font-mono uppercase tracking-wider">
                                                Download APK <Download width={16} height={16} />
                                            </Link>
                                        )}
                                        {project.npmLink && (
                                            <Link href={project.npmLink} target="_blank" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold font-mono uppercase tracking-wider bg-[#CB3837]/10 border border-[#CB3837]/30 text-[#CB3837] hover:bg-[#CB3837]/20 transition-all duration-300">
                                                View on NPM <PackageIcon width={16} height={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-primary-bg text-foreground pt-32 pb-24 px-4 md:px-8 lg:px-16 relative overflow-hidden transition-colors duration-500">



            {/* Dashboard-Style Header & Filters */}
            <div className="max-w-[1400px] mx-auto mb-10 relative z-10 mt-8 px-4 md:px-0 w-full">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-8 border-b border-foreground/10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground mb-4 drop-shadow-sm uppercase">
                            Engineering <span className="bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] bg-clip-text text-transparent pr-2 pb-1">Archive</span>
                        </h1>
                        <p className="text-foreground/60 font-sans text-base md:text-lg leading-relaxed">
                            A comprehensive catalog of engineering works, experiments, and production applications. Exploring the intersection of design, performance, and scalable architecture.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="grid grid-cols-3 sm:flex sm:flex-nowrap items-center gap-4 md:gap-10 shrink-0 bg-foreground/5 backdrop-blur-md border border-foreground/10 p-4 rounded-xl shadow-lg w-full sm:w-auto"
                    >
                        <div className="flex flex-col text-center sm:text-left">
                            <span className="text-2xl md:text-3xl font-bold font-mono text-[var(--gold-primary)]">3</span>
                            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-foreground/50">Production SaaS</span>
                        </div>
                        <div className="hidden sm:block w-[1px] h-8 bg-foreground/10" />
                        <div className="flex flex-col text-center sm:text-left">
                            <span className="text-2xl md:text-3xl font-bold font-mono text-[var(--gold-primary)]">10+</span>
                            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-foreground/50">Projects Built</span>
                        </div>
                        <div className="hidden sm:block w-[1px] h-8 bg-foreground/10" />
                        <div className="flex flex-col text-center sm:text-left">
                            <span className="text-2xl md:text-3xl font-bold font-mono text-[var(--gold-primary)]">3+ Years</span>
                            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-foreground/50 text-wrap leading-tight">Building & Learning</span>
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
                            className={`px-4 py-2 rounded-none font-mono text-xs whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                                ? 'bg-foreground text-background font-bold shadow-[0_0_15px_rgba(225,193,122,0.3)]'
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
            <div className="max-w-[1400px] mx-auto hidden md:grid grid-cols-12 gap-4 px-6 pb-4 text-xs font-mono text-foreground/40 uppercase tracking-widest border-b border-foreground/10 w-full">
                <div className="col-span-1">Year</div>
                <div className="col-span-4">Project</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-3">Core Tech</div>
                <div className="col-span-1 text-right">Links</div>
            </div>

            {/* Project List */}
            <div className="max-w-[1400px] mx-auto relative z-10 w-full">
                <AnimatePresence mode="popLayout">
                    {featuredProjectsList.map(renderProjectRow)}

                    {showArchive && archiveProjectsList.map(renderProjectRow)}
                </AnimatePresence>

                {!showArchive && archiveProjectsList.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8"
                    >
                        <button
                            onClick={() => setIsArchiveExpanded(true)}
                            className="w-full py-5 border border-dashed border-foreground/20 hover:border-foreground/40 bg-foreground/[0.01] hover:bg-foreground/[0.03] text-foreground/50 hover:text-foreground/80 font-mono text-xs md:text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                            style={{
                                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                            }}
                        >
                            <span>✦</span>
                            <span>Reveal {archiveProjectsList.length} Archived Projects & Experiments</span>
                            <span>✦</span>
                        </button>
                    </motion.div>
                )}

                {filteredProjects.length === 0 && (
                    <div className="py-24 text-center text-foreground/40 font-mono text-sm border border-foreground/10 rounded-xl bg-foreground/5">
                        No projects found in this category.
                    </div>
                )}
            </div>

        </div>
    );
}
