'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    FileCode,
    Smartphone,
    Layout,
    Box,
    ExternalLink,
    Github,
    Info,
    Play,
    Search
} from 'lucide-react';
import { Project, projects } from '@/data/projectData';

interface SidebarProps {
    onSelectProject: (project: Project) => void;
    currentProjectId: string | null;
}

const categoryIcons: Record<string, React.ReactNode> = {
    'Web-Platforms': <Layout size={14} className="text-blue-400" />,
    'Mobile-Apps': <Smartphone size={14} className="text-purple-400" />,
    'Algorithms': <Box size={14} className="text-yellow-400" />,
    'UI-UX': <FileCode size={14} className="text-pink-400" />,
};

export default function Sidebar({ onSelectProject, currentProjectId }: SidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
        'Web-Platforms': true,
        'Mobile-Apps': true,
        'Algorithms': true,
        'UI-UX': true,
    });

    // Filter projects based on search query
    const filteredProjects = useMemo(() => {
        if (!searchQuery) return projects;
        const lowerQuery = searchQuery.toLowerCase();
        return projects.filter(project =>
            project.title.toLowerCase().includes(lowerQuery) ||
            project.techStack.some(tech => tech.toLowerCase().includes(lowerQuery)) ||
            project.description.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery]);

    // Group filtered projects
    const groupedProjects = useMemo(() => {
        return filteredProjects.reduce((acc, project) => {
            if (!acc[project.category]) {
                acc[project.category] = [];
            }
            acc[project.category].push(project);
            return acc;
        }, {} as Record<string, Project[]>);
    }, [filteredProjects]);

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    return (
        <aside className="w-full h-full border-r border-[var(--ide-border)] bg-[var(--ide-bg-sidebar)] flex flex-col font-mono text-xs select-none overflow-y-auto">
            {/* Sidebar Header */}
            <div className="p-3 text-[10px] font-bold text-[var(--ide-fg-secondary)] tracking-widest uppercase border-b border-[var(--ide-border)] flex items-center justify-between">
                <span>Explorer</span>
                <span className="text-[9px] opacity-50">v1.2.0</span>
            </div>

            {/* Search Bar */}
            <div className="px-3 py-2 border-b border-[var(--ide-border)]">
                <div className="relative group">
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--ide-fg-secondary)] group-focus-within:text-[var(--ide-accent)] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--ide-bg-workspace)] border border-[var(--ide-border)] rounded-sm py-1 pl-7 pr-2 text-[var(--ide-fg-primary)] placeholder:text-[var(--ide-fg-secondary)] focus:outline-none focus:border-[var(--ide-accent)] transition-colors text-[10px]"
                    />
                </div>
            </div>

            {/* File Tree */}
            <div className="flex-1 py-1">
                {Object.keys(groupedProjects).length === 0 && (
                    <div className="text-center py-8 text-[var(--ide-fg-secondary)] italic opacity-60">
                        No matches found
                    </div>
                )}

                {Object.entries(groupedProjects).map(([category, items]) => (
                    <div key={category} className="mb-0">
                        {/* Category Folder */}
                        <div
                            onClick={() => toggleCategory(category)}
                            className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:bg-[var(--ide-line-highlight)] text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)] transition-colors group"
                        >
                            {(openCategories[category] || searchQuery) ? (
                                <ChevronDown size={12} className="opacity-70" />
                            ) : (
                                <ChevronRight size={12} className="opacity-70" />
                            )}
                            <div className="text-[var(--ide-fg-secondary)] group-hover:text-[var(--ide-accent)] transition-colors">
                                {(openCategories[category] || searchQuery) ? <FolderOpen size={14} /> : <Folder size={14} />}
                            </div>
                            <span className="font-bold truncate ml-1">{category}</span>
                            {searchQuery && (
                                <span className="ml-auto text-[9px] opacity-40">{items.length}</span>
                            )}
                        </div>

                        {/* Project Files in Category */}
                        <AnimatePresence initial={false}>
                            {(openCategories[category] || searchQuery) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="ml-3 pl-2 border-l border-[var(--ide-border)]">
                                        {items.map(project => {
                                            const isActive = currentProjectId === project.id;
                                            return (
                                                <div key={project.id}>
                                                    {/* Project Line */}
                                                    <div
                                                        onClick={() => onSelectProject(project)}
                                                        className={`
                                                            flex items-center gap-2 px-3 py-1 cursor-pointer
                                                            transition-all duration-200
                                                            ${isActive
                                                                ? 'bg-[var(--ide-selection)] text-[var(--ide-accent)] font-medium'
                                                                : 'text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)] hover:bg-[var(--ide-line-highlight)]'}
                                                        `}
                                                    >
                                                        {isActive ? <ChevronDown size={10} /> : <ChevronRight size={10} className="opacity-50" />}

                                                        {categoryIcons[category] || <FileCode size={12} />}
                                                        <span className="truncate">{project.title}</span>
                                                        <span className="text-[9px] opacity-30 ml-auto">.{project.type === 'web' ? 'tsx' : 'jsx'}</span>
                                                    </div>

                                                    {/* Expanded Project Details (Accordion Body) */}
                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden bg-[var(--ide-bg-workspace)]"
                                                            >
                                                                <div className="pl-9 pr-2 py-1 flex flex-col gap-0.5 border-l border-[var(--ide-border)] ml-5">

                                                                    {/* Action: View Details (Always implied as active view) */}
                                                                    <div className="flex items-center gap-2 text-[10px] text-[var(--ide-accent)] py-1 px-2 rounded bg-[var(--ide-selection)]">
                                                                        <Info size={10} />
                                                                        <span>View Details</span>
                                                                    </div>

                                                                    {/* Action: View Source */}
                                                                    <a
                                                                        href={project.githubLink}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 text-[10px] text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)] py-1 px-2 hover:bg-[var(--ide-line-highlight)] rounded transition-colors"
                                                                    >
                                                                        <Github size={10} />
                                                                        <span>View Code</span>
                                                                    </a>

                                                                    {/* Action: Open Live */}
                                                                    <a
                                                                        href={project.liveLink}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 text-[10px] text-[var(--ide-fg-secondary)] hover:text-[var(--ide-accent)] py-1 px-2 hover:bg-[var(--ide-line-highlight)] rounded transition-colors"
                                                                    >
                                                                        <Play size={10} />
                                                                        <span>Open Live</span>
                                                                    </a>

                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </aside>
    );
}
