'use client';
import { Search, LayoutLeft, SmartphoneDevice, Box, Code as FileCode, ArrowDownLeft } from 'iconoir-react';



import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Project, projects } from '@/data/projectData';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProject: (project: Project) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
    'Web-Platforms': <LayoutLeft width={14} height={14} className="text-blue-400" />,
    'Mobile-Apps': <SmartphoneDevice width={14} height={14} className="text-purple-400" />,
    'Algorithms': <Box width={14} height={14} className="text-yellow-400" />,
    'UI-UX': <FileCode width={14} height={14} className="text-pink-400" />,
};

export default function SearchOverlay({ isOpen, onClose, onSelectProject }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Reset state when opened
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Filter results
    const results = useMemo(() => {
        if (!query) return projects.slice(0, 5); // Show recent/all by default
        const lowerQuery = query.toLowerCase();
        return projects.filter(p =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.techStack.some(t => t.toLowerCase().includes(lowerQuery))
        );
    }, [query]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % results.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (results[selectedIndex]) {
                    onSelectProject(results[selectedIndex]);
                    onClose();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex, onSelectProject, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.1 }}
                        className="w-full max-w-xl bg-[var(--ide-bg-panel)] border border-[var(--ide-border)] rounded-xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[60vh]"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--ide-border)]">
                            <Search className="text-[var(--ide-fg-secondary)]" width={18} height={18} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search projects by name, tech, or description..."
                                value={query}
                                onChange={e => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                className="flex-1 bg-transparent border-none outline-none text-[var(--ide-fg-primary)] placeholder:text-[var(--ide-fg-secondary)] font-mono text-sm"
                            />
                            <div className="px-1.5 py-0.5 rounded border border-[var(--ide-border)] bg-[var(--ide-bg-workspace)] text-[10px] text-[var(--ide-fg-secondary)] font-mono">
                                ESC
                            </div>
                        </div>

                        {/* Results List */}
                        <div className="overflow-y-auto p-2" data-lenis-prevent>
                            {results.length === 0 ? (
                                <div className="text-center py-8 text-[var(--ide-fg-secondary)] text-sm font-mono opacity-60">
                                    No matching projects found.
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {results.map((project, index) => (
                                        <div
                                            key={project.id}
                                            onClick={() => {
                                                onSelectProject(project);
                                                onClose();
                                            }}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={`
                                                flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
                                                ${index === selectedIndex ? 'bg-[var(--ide-selection)]' : 'hover:bg-[var(--ide-line-highlight)]'}
                                            `}
                                        >
                                            <div className="opacity-60">
                                                {categoryIcons[project.category] || <FileCode width={16} height={16} className="text-[var(--ide-fg-secondary)]" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-medium ${index === selectedIndex ? 'text-[var(--ide-accent)]' : 'text-[var(--ide-fg-primary)]'}`}>
                                                        {project.title}
                                                    </span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--ide-bg-workspace)] text-[var(--ide-fg-secondary)] border border-[var(--ide-border)]">
                                                        {project.category}
                                                    </span>
                                                </div>
                                                <div className="text-[10px] text-[var(--ide-fg-secondary)] truncate mt-0.5">
                                                    {project.description}
                                                </div>
                                            </div>
                                            {index === selectedIndex && (
                                                <ArrowDownLeft width={14} height={14} className="text-[var(--ide-fg-secondary)]" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer Hints */}
                        <div className="px-4 py-2 bg-[var(--ide-bg-workspace)] border-t border-[var(--ide-border)] flex items-center justify-between text-[10px] text-[var(--ide-fg-secondary)] font-mono">
                            <div className="flex gap-4">
                                <span>↑↓ Navigate</span>
                                <span>↵ Open</span>
                            </div>
                            <div>
                                {results.length} Projects
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
