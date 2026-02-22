'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { ExternalLink, Terminal as TerminalIcon, Cpu, Layers, Zap, Maximize2, Minimize2, Play, Home, UserCircle } from 'lucide-react';
import { Project } from '@/data/projectData';
import EditorTabs from './EditorTabs';
import Terminal, { TerminalRef } from './Terminal';
import { Theme } from './themes';

interface MainDisplayProps {
    activeProject: Project | null;
    onSelectProject: (project: Project) => void;
    onSelectTheme: (theme: Theme) => void;
}

export default function MainDisplay({ activeProject, onSelectProject, onSelectTheme }: MainDisplayProps) {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const terminalRef = useRef<TerminalRef>(null);

    const handleRunProject = () => {
        if (!activeProject) return;

        setIsTerminalOpen(true);
        const term = terminalRef.current;

        if (term) {
            term.addLog({ type: 'command', content: `npm run dev` });

            setTimeout(() => term.addLog({ type: 'output', content: '> portfolio@0.1.0 dev' }), 300);
            setTimeout(() => term.addLog({ type: 'output', content: '> next dev' }), 600);
            setTimeout(() => term.addLog({ type: 'success', content: 'ready - started server on 0.0.0.0:3000, url: http://localhost:3000' }), 1200);
            setTimeout(() => term.addLog({ type: 'success', content: 'event - compiled client and server successfully in 1241 ms (156 modules)' }), 2000);
            setTimeout(() => term.addLog({ type: 'success', content: 'wait  - compiling / (client and server)...' }), 2200);
            setTimeout(() => term.addLog({ type: 'success', content: 'event - compiled client and server successfully in 300 ms (156 modules)' }), 2600);
            setTimeout(() => {
                term.addLog({ type: 'success', content: 'Opening project in new tab...' });
                window.open(activeProject.liveLink, '_blank');
            }, 3000);
        }
    };

    // Terminal Resize State
    const [terminalHeight, setTerminalHeight] = useState(280);
    const [isResizing, setIsResizing] = useState(false);

    // Resize Handlers
    const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent) => {
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                const newHeight = window.innerHeight - mouseMoveEvent.clientY;
                if (newHeight > 100 && newHeight < window.innerHeight - 100) {
                    setTerminalHeight(newHeight);
                }
            }
        },
        [isResizing]
    );

    React.useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    if (!activeProject) return null;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--ide-bg-workspace)] select-none font-sans">

            {/* Navbar / Top Bar */}
            <div className="h-12 bg-[var(--ide-bg-workspace)] border-b border-[var(--ide-border)] flex items-center justify-between px-4 shrink-0">

                {/* Left: Breadcrumbs / Project Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center text-[10px] md:text-xs font-mono text-[var(--ide-fg-secondary)] truncate">
                        <Home size={14} className="mr-2 opacity-50 shrink-0" />
                        <span className="hidden sm:inline">projects</span>
                        <span className="mx-1.5 md:mx-2 opacity-30 hidden sm:inline">/</span>
                        <span className="truncate opacity-70">{activeProject.category}</span>
                        <span className="mx-1.5 md:mx-2 opacity-30">/</span>
                        <span className="text-[var(--ide-fg-primary)] font-bold truncate">{activeProject.title}</span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${isTerminalOpen ? 'bg-[var(--ide-line-highlight)] text-[var(--ide-fg-primary)] border-[var(--ide-border)]' : 'bg-transparent text-[var(--ide-fg-secondary)] border-transparent hover:bg-[var(--ide-bg-panel)]'}`}
                        title="Toggle Terminal"
                    >
                        <TerminalIcon size={14} />
                    </button>

                    <div className="w-px h-4 bg-[var(--ide-border)] mx-1" />

                    <button
                        onClick={handleRunProject}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--ide-accent)] hover:bg-[var(--ide-accent)]/90 text-white rounded-md text-xs font-semibold transition-all shadow-lg hover:shadow-[var(--ide-accent)]/20 active:scale-95 group"
                    >
                        <Play size={10} className="fill-current group-hover:scale-110 transition-transform" />
                        <span>Run Project</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">

                    {/* Editor Tabs */}
                    <div className="sticky top-0 z-20">
                        <EditorTabs project={activeProject} />
                    </div>

                    {/* Content Scrollable Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 pb-32" data-lenis-prevent>
                        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">

                            {/* Header Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-md border border-[var(--ide-border)] bg-[var(--ide-bg-panel)] text-[10px] md:text-[11px] font-mono text-[var(--ide-fg-secondary)] tracking-wider uppercase font-medium">
                                        {activeProject.year}
                                    </span>
                                    <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-md border border-[var(--ide-accent)]/20 bg-[var(--ide-accent)]/10 text-[10px] md:text-[11px] font-mono text-[var(--ide-accent)] tracking-wider uppercase font-medium">
                                        {activeProject.type}
                                    </span>
                                </div>

                                <div>
                                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--ide-fg-primary)] mb-3 md:mb-4 leading-tight">{activeProject.title}</h1>
                                    <p className="text-base md:text-xl text-[var(--ide-fg-secondary)] leading-relaxed max-w-2xl">{activeProject.description}</p>
                                </div>

                                {(() => {
                                    const isCodePen = activeProject.liveLink.includes('codepen.io');
                                    if (isCodePen) {
                                        // Convert full/pen URL to embed URL
                                        const embedUrl = activeProject.liveLink.replace('/full/', '/embed/').replace('/pen/', '/embed/') + '?default-tab=result&theme-id=dark';

                                        return (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="relative w-full rounded-2xl overflow-hidden border border-[var(--ide-border)] bg-[var(--ide-bg-panel)] shadow-2xl"
                                            >
                                                <iframe
                                                    src={embedUrl}
                                                    title={activeProject.title}
                                                    className="w-full h-[300px] md:h-[450px] border-none"
                                                    loading="lazy"
                                                    allowFullScreen
                                                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                                                />
                                                <div className="absolute top-3 right-3 z-10">
                                                    <div className="text-[9px] md:text-[10px] font-mono backdrop-blur-md bg-black/60 px-2 py-1 rounded border border-white/10 text-white/50">
                                                        Live Interactive Preview
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    }

                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[var(--ide-border)] bg-[var(--ide-bg-panel)] group shadow-2xl"
                                        >
                                            <NextImage
                                                src={activeProject.coverImage}
                                                alt={activeProject.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                                <div className="text-white text-xs font-mono backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                                                    Screenshot: {activeProject.title}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })()}
                            </div>

                            {/* Tech Stack */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ide-fg-secondary)] opacity-70 flex items-center gap-2">
                                    <Layers size={14} /> Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {activeProject.techStack.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 bg-[var(--ide-bg-panel)] border border-[var(--ide-border)] rounded-full text-xs text-[var(--ide-fg-primary)] font-medium hover:border-[var(--ide-accent)]/50 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Features & Snippet Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Features */}
                                <div className="p-6 rounded-xl bg-[var(--ide-bg-panel)]/50 border border-[var(--ide-border)] hover:border-[var(--ide-accent)]/30 transition-colors">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ide-accent)] mb-5 flex items-center gap-2">
                                        <Zap size={14} /> Key Features
                                    </h3>
                                    <ul className="space-y-4">
                                        {activeProject.features?.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-[var(--ide-fg-primary)] opacity-90">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--ide-accent)] shrink-0 shadow-[0_0_8px_var(--ide-accent)]" />
                                                <span className="leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Code Snippet */}
                                <div className="flex flex-col">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ide-fg-secondary)] opacity-70 mb-4 flex items-center gap-2">
                                        <TerminalIcon size={14} /> Core Logic
                                    </h3>
                                    <div className="flex-1 bg-[#09090b] p-5 rounded-xl border border-[var(--ide-border)] overflow-hidden shadow-2xl relative group">
                                        <div className="absolute top-3 right-3 flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                        </div>
                                        <pre className="font-mono text-xs text-[#e4e4e7] leading-relaxed pt-4 overflow-x-auto">
                                            {activeProject.codeSnippet.split('\n').slice(0, 12).join('\n')}
                                        </pre>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-50" />
                                        <div className="absolute bottom-4 left-0 right-0 text-center">
                                            <button
                                                onClick={handleRunProject}
                                                className="text-[10px] text-[#a1a1aa] hover:text-white bg-[#18181b] px-3 py-1 rounded-full border border-[#27272a] hover:border-[#3f3f46] transition-all"
                                            >
                                                Run to see full code
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Panel */}
                    <motion.div
                        initial={false}
                        animate={{ height: isTerminalOpen ? terminalHeight : 44 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`bg-[var(--ide-bg-panel)] border-t border-[var(--ide-border)] flex flex-col shrink-0 relative z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.2)] ${!isTerminalOpen ? 'mb-5' : ''}`}
                    >
                        {/* Resize Handle */}
                        <div
                            onMouseDown={startResizing}
                            className={`absolute top-0 left-0 right-0 h-1 cursor-ns-resize z-50 hover:bg-[var(--ide-accent)] transition-colors ${isResizing ? 'bg-[var(--ide-accent)]' : 'bg-transparent'}`}
                        />

                        {/* Terminal Header / Toggle */}
                        <div
                            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                            className={`h-11 flex items-center justify-between px-4 cursor-pointer hover:bg-[var(--ide-bg-workspace)] transition-colors shrink-0 border-b border-[var(--ide-border)]`}
                        >
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--ide-fg-secondary)]">
                                <TerminalIcon size={12} />
                                <span>Terminal</span>
                                {isTerminalOpen && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-500 text-[9px] font-normal lowercase">node</span>}
                            </div>
                            <div className="text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)]">
                                {isTerminalOpen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                            </div>
                        </div>

                        {/* Terminal Component Instance */}
                        <div className="flex-1 overflow-hidden relative">
                            <div className="absolute inset-0 pt-0"> {/* Wrapper to handle padding/layout if needed */}
                                <Terminal
                                    ref={terminalRef}
                                    isOpen={isTerminalOpen}
                                    onClose={() => setIsTerminalOpen(false)}
                                    onSelectProject={onSelectProject}
                                    onSelectTheme={onSelectTheme}
                                    activeProject={activeProject}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
