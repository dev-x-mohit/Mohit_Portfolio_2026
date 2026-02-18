'use client';

import React from 'react';
import { X, FileCode, FileJson, FileText } from 'lucide-react';
import { Project } from '@/data/projectData';

interface EditorTabsProps {
    project: Project | null;
    onClose?: () => void;
}

export default function EditorTabs({ project, onClose }: EditorTabsProps) {
    if (!project) return null;

    // Simulate other tabs for specific projects or random
    const tabs = [
        { name: `${project.title.replace(/\s+/g, '')}.tsx`, icon: FileCode, active: true },
        { name: 'README.md', icon: FileText, active: false },
        { name: 'package.json', icon: FileJson, active: false },
    ];

    return (
        <div className="flex items-center h-9 bg-[var(--ide-bg-sidebar)] border-b border-[var(--ide-border)] overflow-x-auto custom-scrollbar select-none">
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={`
                        flex items-center gap-2 px-3 h-full min-w-[120px] max-w-[200px] text-xs border-r border-[var(--ide-border)] cursor-pointer group relative
                        ${tab.active
                            ? 'bg-[var(--ide-bg-workspace)] text-[var(--ide-fg-primary)] border-t-2 border-t-[var(--ide-accent)]'
                            : 'bg-transparent text-[var(--ide-fg-secondary)] hover:bg-[var(--ide-bg-workspace)]/50'
                        }
                    `}
                >
                    <tab.icon size={14} className={tab.active ? 'text-[var(--ide-accent)]' : 'opacity-70'} />
                    <span className="truncate flex-1">{tab.name}</span>
                    <div className={`opacity-0 group-hover:opacity-100 p-0.5 rounded-md hover:bg-[var(--ide-bg-panel)] transition-opacity ${tab.active ? 'text-[var(--ide-fg-primary)]' : ''}`}>
                        <X size={12} />
                    </div>
                </div>
            ))}
        </div>
    );
}
