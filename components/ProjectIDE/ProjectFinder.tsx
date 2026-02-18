'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Folder,
    FileCode,
    Layout,
    Smartphone,
    Box,
    Search,
    Grid,
    List,
    Clock,
    Star,
    Cloud,
    HardDrive
} from 'lucide-react';
import { Project, projects } from '@/data/projectData';

interface ProjectFinderProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProject: (project: Project) => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs cursor-pointer select-none transition-all duration-200 ${active ? 'bg-[var(--ide-accent)] text-white font-medium shadow-md shadow-[var(--ide-accent)]/20' : 'text-[var(--ide-fg-secondary)] hover:bg-[var(--ide-bg-workspace)] hover:text-[var(--ide-fg-primary)]'}`}
    >
        <Icon size={14} className={active ? 'text-white' : 'opacity-70'} />
        <span>{label}</span>
    </div>
);

export default function ProjectFinder({ isOpen, onClose, onSelectProject }: ProjectFinderProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'All') return projects;
        if (selectedCategory === 'Recents') return projects.slice(0, 4);
        return projects.filter(p => p.category === selectedCategory);
    }, [selectedCategory]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Finder Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="w-full max-w-5xl h-[80vh] bg-[var(--ide-bg-panel)] rounded-xl shadow-2xl overflow-hidden relative z-10 flex flex-col font-sans text-[var(--ide-fg-primary)] border border-[var(--ide-border)] outline outline-1 outline-white/5"
                    >
                        {/* Toolbar */}
                        <div className="h-14 bg-[var(--ide-bg-panel)] border-b border-[var(--ide-border)] flex items-center px-6 justify-between shrink-0">
                            <div className="flex gap-6 items-center">
                                {/* Traffic Lights */}
                                <div className="flex gap-2 group">
                                    <div onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:bg-[#ff5f57]/80 cursor-pointer flex items-center justify-center text-[8px] opacity-100" />
                                    <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
                                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                                </div>
                                <div className="hidden md:flex gap-2">
                                    <div className="flex bg-[var(--ide-bg-workspace)] rounded-lg p-1 border border-[var(--ide-border)] shadow-inner">
                                        <div
                                            onClick={() => setViewMode('grid')}
                                            className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-[var(--ide-bg-panel)] shadow-sm text-[var(--ide-accent)]' : 'hover:bg-[var(--ide-bg-panel)]/50 text-[var(--ide-fg-secondary)]'} cursor-pointer transition-all`}
                                        >
                                            <Grid size={14} />
                                        </div>
                                        <div
                                            onClick={() => setViewMode('list')}
                                            className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-[var(--ide-bg-panel)] shadow-sm text-[var(--ide-accent)]' : 'hover:bg-[var(--ide-bg-panel)]/50 text-[var(--ide-fg-secondary)]'} cursor-pointer transition-all`}
                                        >
                                            <List size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-80">
                                <span className="text-xs font-semibold tracking-wide">Project Finder</span>
                            </div>

                            <div className="w-32 md:w-64 relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ide-fg-secondary)]" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    className="w-full bg-[var(--ide-bg-workspace)] border border-[var(--ide-border)] rounded-lg py-1.5 pl-9 pr-3 text-xs text-[var(--ide-fg-primary)] placeholder:text-[var(--ide-fg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--ide-accent)]/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex overflow-hidden">
                            {/* Sidebar - Hidden on mobile */}
                            <div className="hidden md:flex w-56 bg-[var(--ide-bg-panel)]/30 border-r border-[var(--ide-border)] p-4 flex-col gap-8 overflow-y-auto backdrop-blur-xl">
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-[var(--ide-fg-secondary)] mb-3 px-3 tracking-widest opacity-70">Favorites</div>
                                    <div className="flex flex-col gap-1">
                                        <SidebarItem icon={Star} label="All Projects" active={selectedCategory === 'All'} onClick={() => setSelectedCategory('All')} />
                                        <SidebarItem icon={Clock} label="Recent" active={selectedCategory === 'Recents'} onClick={() => setSelectedCategory('Recents')} />
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[10px] uppercase font-bold text-[var(--ide-fg-secondary)] mb-3 px-3 tracking-widest opacity-70">Categories</div>
                                    <div className="flex flex-col gap-1">
                                        <SidebarItem icon={Layout} label="Web Platforms" active={selectedCategory === 'Web-Platforms'} onClick={() => setSelectedCategory('Web-Platforms')} />
                                        <SidebarItem icon={Smartphone} label="Mobile Apps" active={selectedCategory === 'Mobile-Apps'} onClick={() => setSelectedCategory('Mobile-Apps')} />
                                        <SidebarItem icon={Box} label="Algorithms" active={selectedCategory === 'Algorithms'} onClick={() => setSelectedCategory('Algorithms')} />
                                        <SidebarItem icon={FileCode} label="UI / UX" active={selectedCategory === 'UI-UX'} onClick={() => setSelectedCategory('UI-UX')} />
                                    </div>
                                </div>
                            </div>

                            {/* Main View */}
                            <div className="flex-1 bg-[var(--ide-bg-workspace)] overflow-y-auto p-4 md:p-8">
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                        {filteredProjects.map(project => (
                                            <motion.div
                                                layoutId={`project-${project.id}`}
                                                key={project.id}
                                                onClick={() => {
                                                    onSelectProject(project);
                                                    onClose();
                                                }}
                                                className="group relative flex flex-col items-center gap-4 cursor-pointer p-6 rounded-2xl bg-[var(--ide-bg-panel)] border border-[var(--ide-border)] hover:border-[var(--ide-accent)]/50 hover:bg-[var(--ide-bg-panel)]/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--ide-accent)]/5"
                                            >
                                                <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--ide-accent)]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    <div className="relative w-full h-full bg-[var(--ide-bg-workspace)] rounded-2xl border border-[var(--ide-border)] flex items-center justify-center text-[var(--ide-accent)] shadow-sm group-hover:scale-105 transition-transform duration-300">
                                                        {project.type === 'web' ? <Layout size={32} strokeWidth={1.5} /> : <Smartphone size={32} strokeWidth={1.5} />}
                                                    </div>
                                                </div>

                                                <div className="text-center w-full">
                                                    <h3 className="text-sm font-semibold text-[var(--ide-fg-primary)] truncate w-full mb-1 group-hover:text-[var(--ide-accent)] transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--ide-fg-secondary)] font-mono opacity-70">
                                                        <span>{project.year}</span>
                                                        <span>•</span>
                                                        <span>{project.category}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col min-w-[600px]">
                                        <div className="grid grid-cols-12 text-[10px] text-[var(--ide-fg-secondary)] border-b border-[var(--ide-border)] pb-2 mb-2 px-4 uppercase font-bold tracking-wider opacity-60">
                                            <div className="col-span-5">Name</div>
                                            <div className="col-span-3">Date Modified</div>
                                            <div className="col-span-4">Category</div>
                                        </div>
                                        {filteredProjects.map((project, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                key={project.id}
                                                onClick={() => {
                                                    onSelectProject(project);
                                                    onClose();
                                                }}
                                                className={`grid grid-cols-12 items-center px-4 py-3 rounded-lg cursor-pointer text-xs border border-transparent hover:border-[var(--ide-border)] ${i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--ide-bg-panel)]/30'} hover:bg-[var(--ide-selection)] group transition-all`}
                                            >
                                                <div className="col-span-5 flex items-center gap-3 font-medium text-[var(--ide-fg-primary)]">
                                                    {project.type === 'web' ? <Layout size={16} className="text-[var(--ide-accent)]" /> : <Smartphone size={16} className="text-[var(--ide-fg-secondary)] group-hover:text-[var(--ide-accent)] transition-colors" />}
                                                    <span className="group-hover:translate-x-1 transition-transform">{project.title}</span>
                                                </div>
                                                <div className="col-span-3 text-[var(--ide-fg-secondary)] font-mono text-[10px]">
                                                    Oct {project.year}, 2024
                                                </div>
                                                <div className="col-span-4 flex items-center gap-2">
                                                    <span className="px-2 py-0.5 rounded-full bg-[var(--ide-bg-panel)] border border-[var(--ide-border)] text-[10px] text-[var(--ide-fg-secondary)] group-hover:border-[var(--ide-accent)]/30 transition-colors">
                                                        {project.category}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="h-8 bg-[var(--ide-bg-panel)] border-t border-[var(--ide-border)] flex items-center px-6 justify-between text-[10px] text-[var(--ide-fg-secondary)] select-none">
                            <span>{filteredProjects.length} items</span>
                            <span className="opacity-50">Press ESC to close</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
