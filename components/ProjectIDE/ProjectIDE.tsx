'use client';
import { Search, Minus, Menu, Settings, HelpCircle, Xmark, Expand, Terminal as TerminalIcon } from 'iconoir-react';



import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, projects } from '@/data/projectData';
import Sidebar from './Sidebar';
import MainDisplay from './MainDisplay';

import { useRouter } from 'next/navigation';
import SearchOverlay from './SearchOverlay';
import ProjectFinder from './ProjectFinder';
import ActivityBar from './ActivityBar';
import ThemeSelector from './ThemeSelector';
import StatusBar from './StatusBar';
import ExtensionsSidebar from './ExtensionsSidebar';
import HelpOverlay from './HelpOverlay';
import { themes, Theme } from './themes';


export default function ProjectIDE() {
    const router = useRouter();
    // State
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null); // Initial Idle State
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFinderOpen, setIsFinderOpen] = useState(false);

    // Theme & Layout State
    const [activeTheme, setActiveTheme] = useState<Theme>(themes[0]); // Default to Midnight
    const [activeView, setActiveView] = useState<'explorer' | 'search' | 'settings' | 'extensions' | null>('explorer');
    const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Responsive Sidebar Logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Derived State
    const activeProject = projects.find(p => p.id === activeProjectId) || null;

    // Handlers
    const handleSelectProject = (project: Project) => {
        setActiveProjectId(project.id);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    const handleHome = () => {
        router.push('/');
    };

    // Generate CSS Variables for the current theme
    const themeStyles = useMemo(() => ({
        '--ide-bg-activity-bar': activeTheme.colors.bgActivityBar,
        '--ide-bg-sidebar': activeTheme.colors.bgSidebar,
        '--ide-bg-workspace': activeTheme.colors.bgWorkspace,
        '--ide-bg-panel': activeTheme.colors.bgPanel,
        '--ide-fg-primary': activeTheme.colors.fgPrimary,
        '--ide-fg-secondary': activeTheme.colors.fgSecondary,
        '--ide-border': activeTheme.colors.border,
        '--ide-accent': activeTheme.colors.accent,
        '--ide-selection': activeTheme.colors.selection,
        '--ide-line-highlight': activeTheme.colors.lineHighlight,
    } as React.CSSProperties), [activeTheme]);

    return (
        <div
            style={themeStyles}
            className={`
                mx-auto bg-[var(--ide-bg-workspace)] text-[var(--ide-fg-primary)] flex flex-row relative group/ide transition-all duration-500
                ${isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen' : 'w-full h-full border-x border-[var(--ide-border)]'}
            `}
        >
            {/* Activity Bar (Far Left) */}
            <ActivityBar
                activeView={activeView}
                onViewChange={(view) => {
                    setActiveView(view);
                    if (view === 'search') setIsSearchOpen(true);
                }}
                onToggleTheme={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)}
            />

            {/* Main Flex Column (Sidebar + Content) */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Window Controls / Title Bar */}
                <div className="h-9 bg-[var(--ide-bg-panel)] flex items-center px-4 border-b border-[var(--ide-border)] select-none relative shrink-0">
                    <div className="flex gap-2 mr-4 group/controls shrink-0">
                        {/* Mobile Sidebar Toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-1 text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)] hover:bg-[var(--ide-bg-workspace)] rounded transition-colors mr-1"
                        >
                            <Menu width={16} height={16} />
                        </button>

                        <div
                            onClick={handleHome}
                            className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center border border-red-500/10"
                            title="Close (Go Home)"
                        >
                            <Xmark width={8} height={8} className="opacity-0 group-hover/controls:opacity-100 text-red-900 font-bold" />
                        </div>
                        <div
                            onClick={handleHome}
                            className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center border border-yellow-500/10"
                            title="Minimize (Go Home)"
                        >
                            <Minus width={8} height={8} className="opacity-0 group-hover/controls:opacity-100 text-yellow-900 font-bold" />
                        </div>
                        <div
                            onClick={toggleFullscreen}
                            className="hidden sm:flex w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors cursor-pointer items-center justify-center border border-green-500/10"
                            title="Maximize (Toggle Fullscreen)"
                        >
                            <Expand width={6} height={6} className="opacity-0 group-hover/controls:opacity-100 text-green-900 font-bold" />
                        </div>
                    </div>

                    {/* Breadcrumbs / Title */}
                    <div className="flex-1 flex justify-center items-center gap-2 opacity-60">
                        {/* Centered Title */}
                        <span className="text-[11px] font-mono flex items-center gap-2">
                            <span className="opacity-50">mohit-lakhara</span>
                            <span className="opacity-30">/</span>
                            <span className="font-bold">{activeProject ? activeProject.title : 'portfolio-v2'}</span>
                        </span>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center justify-end gap-1">
                        <button
                            onClick={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)}
                            className="lg:hidden p-1.5 text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)] hover:bg-[var(--ide-bg-workspace)] rounded-md transition-colors"
                            title="Themes"
                        >
                            <Settings width={14} height={14} />
                        </button>
                        <button
                            onClick={() => setIsHelpOpen(true)}
                            className="p-1.5 text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)] hover:bg-[var(--ide-bg-workspace)] rounded-md transition-colors"
                            title="Help & Guide"
                        >
                            <HelpCircle width={14} height={14} />
                        </button>
                    </div>
                </div>

                {/* Main Workspace (Sidebar + Editor) */}
                <div className="flex-1 flex overflow-hidden">

                    {/* Sidebar Container */}
                    <AnimatePresence initial={false} mode="popLayout">
                        {isSidebarOpen && (activeView === 'explorer' || activeView === 'extensions') && (
                            <>
                                {/* Mobile Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[35]"
                                />
                                <motion.div
                                    initial={{ width: 0, x: -260, opacity: 0 }}
                                    animate={{
                                        width: 260,
                                        x: 0,
                                        opacity: 1
                                    }}
                                    exit={{ width: 0, x: -260, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="h-full border-r border-[var(--ide-border)] bg-[var(--ide-bg-sidebar)] flex-shrink-0 overflow-hidden absolute lg:relative z-40"
                                >
                                    <div className="w-[260px] h-full"> {/* Inner width fixed to prevent squishing */}
                                        {activeView === 'extensions' ? (
                                            <ExtensionsSidebar />
                                        ) : (
                                            <Sidebar
                                                onSelectProject={handleSelectProject}
                                                currentProjectId={activeProjectId}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Editor / Idle Area */}
                    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--ide-bg-workspace)] relative transition-colors duration-300">
                        {activeProject ? (
                            <MainDisplay
                                activeProject={activeProject}
                                onSelectProject={handleSelectProject}
                                onSelectTheme={setActiveTheme}
                            />
                        ) : (
                            // Idle State Hero & Preview
                            <div className="flex-1 flex overflow-hidden">
                                {/* Left Side: Welcome */}
                                <div className="flex-1 flex flex-col items-center justify-center select-none p-8 text-center bg-[url('/grid.svg')] bg-center bg-opacity-[0.02] border-r border-[var(--ide-border)]">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="max-w-md"
                                    >
                                        <div className="mb-6 inline-flex items-center justify-center p-3 rounded-2xl bg-[var(--ide-bg-panel)] border border-[var(--ide-border)] shadow-xl animate-float">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--ide-accent)] to-purple-600 flex items-center justify-center text-white shadow-lg">
                                                <TerminalIcon width={24} height={24} />
                                            </div>
                                        </div>

                                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[var(--ide-fg-primary)]">
                                            Project <span style={{ color: 'var(--ide-accent)' }}>Workspace</span>
                                        </h1>
                                        <p className="text-[var(--ide-fg-secondary)] text-sm leading-relaxed mb-8">
                                            Select a project from the explorer to view code & details.
                                        </p>

                                        <div className="flex items-center justify-center gap-4">
                                            <button
                                                onClick={() => setIsFinderOpen(true)}
                                                className="group flex flex-col items-center gap-1.5 focus:outline-none"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[var(--ide-bg-panel)] flex items-center justify-center border border-[var(--ide-border)] shadow-sm group-hover:border-[var(--ide-accent)] group-hover:text-[var(--ide-accent)] transition-all">
                                                    <Search width={18} height={18} className="opacity-70 group-hover:opacity-100" />
                                                </div>
                                                <span className="text-[9px] uppercase tracking-widest text-[var(--ide-fg-secondary)] group-hover:text-[var(--ide-fg-primary)]">Finder</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveView('explorer')} // activeView
                                                className="group flex flex-col items-center gap-1.5 focus:outline-none"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[var(--ide-bg-panel)] flex items-center justify-center border border-[var(--ide-border)] shadow-sm group-hover:border-[var(--ide-accent)] group-hover:text-[var(--ide-accent)] transition-all">
                                                    <TerminalIcon width={18} height={18} className="opacity-70 group-hover:opacity-100" />
                                                </div>
                                                <span className="text-[9px] uppercase tracking-widest text-[var(--ide-fg-secondary)] group-hover:text-[var(--ide-fg-primary)]">Explorer</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>


                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Overlays */}
            <ThemeSelector
                isOpen={isThemeSelectorOpen}
                onClose={() => setIsThemeSelectorOpen(false)}
                currentThemeId={activeTheme.id}
                onSelectTheme={(theme) => {
                    setActiveTheme(theme);
                    // Optionally close selector, or keep open to browse
                    // setIsThemeSelectorOpen(false); 
                }}
            />

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onSelectProject={handleSelectProject}
            />

            <ProjectFinder
                isOpen={isFinderOpen}
                onClose={() => setIsFinderOpen(false)}
                onSelectProject={handleSelectProject}
            />

            <HelpOverlay
                isOpen={isHelpOpen}
                onClose={() => setIsHelpOpen(false)}
            />

            {/* Status Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-30">
                <StatusBar
                    project={activeProject}
                    isFocusMode={isFullscreen}
                    onToggleFocus={toggleFullscreen}
                />
            </div>
        </div>
    );
}
