'use client';

import React from 'react';
import {
    Files,
    Search,
    Settings,
    GitBranch,
    Monitor,
    LayoutGrid,
    Command
} from 'lucide-react';

interface ActivityBarProps {
    activeView: 'explorer' | 'search' | 'settings' | 'extensions' | null;
    onViewChange: (view: 'explorer' | 'search' | 'settings' | 'extensions' | null) => void;
    onToggleTheme: () => void;
}

const ActivityItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                w-12 h-12 flex items-center justify-center cursor-pointer relative group
                ${active ? 'text-[var(--ide-accent)]' : 'text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)]'}
            `}
        >
            {active && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--ide-accent)]" />
            )}
            <Icon size={24} strokeWidth={1.5} />

            {/* Custom Tooltip */}
            {isHovered && (
                <div className="absolute left-14 bg-[var(--ide-bg-panel)] text-[var(--ide-fg-primary)] text-xs px-2 py-1 rounded border border-[var(--ide-border)] shadow-xl whitespace-nowrap z-50 animate-in fade-in slide-in-from-left-1 duration-150">
                    {label}
                </div>
            )}
        </div>
    );
};

export default function ActivityBar({ activeView, onViewChange, onToggleTheme }: ActivityBarProps) {
    return (
        <div className="w-12 flex flex-col items-center bg-[var(--ide-bg-activity-bar)] border-r border-[var(--ide-border)] h-full shrink-0 z-20">

            {/* Top Actions */}
            <div className="flex flex-col gap-0 mt-2">
                <ActivityItem
                    icon={Files}
                    label="Explorer (Ctrl+Shift+E)"
                    active={activeView === 'explorer'}
                    onClick={() => onViewChange(activeView === 'explorer' ? null : 'explorer')}
                />
                <ActivityItem
                    icon={Search}
                    label="Search (Ctrl+Shift+F)"
                    active={activeView === 'search'}
                    onClick={() => onViewChange(activeView === 'search' ? null : 'search')}
                />
                <ActivityItem
                    icon={GitBranch}
                    label="Source Control (GitHub)"
                    active={false}
                    onClick={() => window.open('https://github.com/mohitlakhara-ind', '_blank')}
                />
                <ActivityItem
                    icon={LayoutGrid}
                    label="Libraries"
                    active={activeView === 'extensions'}
                    onClick={() => onViewChange(activeView === 'extensions' ? null : 'extensions')}
                />
            </div>

            <div className="flex-1" />

            {/* Bottom Actions */}
            <div className="flex flex-col gap-0 mb-6">
                <ActivityItem
                    icon={Settings}
                    label="Settings / Themes"
                    active={activeView === 'settings'}
                    onClick={onToggleTheme}
                />
            </div>
        </div>
    );
}
