'use client';

import React from 'react';
import { GitBranch, AlertCircle, Maximize2, Minimize2, Check } from 'lucide-react';
import { Project } from '@/data/projectData';

interface StatusBarProps {
    project: Project | null;
    isFocusMode: boolean;
    onToggleFocus: () => void;
}

export default function StatusBar({ project, isFocusMode, onToggleFocus }: StatusBarProps) {
    return (
        <div className="h-[25px] bg-[var(--ide-bg-panel)] flex items-center justify-between px-3 text-[10px] text-[var(--ide-fg-secondary)] font-sans select-none z-50 border-t border-[var(--ide-border)]">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
                    <GitBranch size={10} />
                    <span className="font-bold">main*</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors opacity-80">
                    <AlertCircle size={10} />
                    <span>0 Errors</span>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {project ? (
                    <div className="hidden sm:flex items-center gap-3 opacity-80">
                        <span>{project.techStack.length} Modules</span>
                        <span>UTF-8</span>
                        <span>{project.stats.topLanguage}</span>
                    </div>
                ) : (
                    <span className="opacity-50 italic">System Idle</span>
                )}

                {/* Focus Mode Toggle */}
                <button
                    onClick={onToggleFocus}
                    className={`
                        flex items-center gap-1.5 px-2 py-0.5 rounded cursor-pointer transition-colors
                        ${isFocusMode ? 'bg-white text-accent-primary font-bold' : 'hover:bg-white/10'}
                    `}
                    title="Toggle Focus Mode"
                >
                    {isFocusMode ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
                    <span className="hidden sm:inline">Focus Mode</span>
                </button>
            </div>
        </div>
    );
}
