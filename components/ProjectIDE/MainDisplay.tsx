'use client';
import { OpenNewWindow, Cpu, MultiplePages, Flash, Play, Home, UserCircle, Terminal as TerminalIcon, Collapse, Expand, Github, Download } from 'iconoir-react';



import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import ReactMarkdown from 'react-markdown';

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
    const contentAreaRef = useRef<HTMLDivElement>(null);

    // Scroll to top on project change
    useEffect(() => {
        if (contentAreaRef.current) {
            contentAreaRef.current.scrollTop = 0;
        }
    }, [activeProject?.id]);

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
                        <Home width={14} height={14} className="mr-2 opacity-50 shrink-0" />
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
                        <TerminalIcon width={14} height={14} />
                    </button>

                    <div className="w-px h-4 bg-[var(--ide-border)] mx-1" />

                    <button
                        onClick={handleRunProject}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--ide-accent)] hover:bg-[var(--ide-accent)]/90 text-white rounded-md text-xs font-semibold transition-all shadow-lg hover:shadow-[var(--ide-accent)]/20 active:scale-95 group"
                    >
                        <Play width={10} height={10} className="fill-current group-hover:scale-110 transition-transform" />
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
                    <div
                        ref={contentAreaRef}
                        className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 pb-32"
                        data-lenis-prevent
                    >
                        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">

                            {/* Header Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-md border border-[var(--ide-border)] bg-[var(--ide-bg-panel)] text-[10px] md:text-[11px] font-mono text-[var(--ide-fg-secondary)] tracking-wider uppercase font-medium">
                                        {activeProject.year}
                                    </span>
                                    <span className="px-3 py-1 rounded-md border border-[var(--ide-accent)]/20 bg-[var(--ide-accent)]/10 text-[10px] md:text-[11px] font-mono text-[var(--ide-accent)] tracking-wider uppercase font-bold">
                                        {activeProject.type}
                                    </span>
                                </div>

                                <div>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--ide-fg-primary)] mb-4 leading-[1.1]">{activeProject.title}</h1>
                                    <p className="text-lg md:text-xl text-[var(--ide-fg-primary)] opacity-90 max-w-3xl leading-relaxed font-medium">
                                        {activeProject.summary}
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        {activeProject.githubLink && (
                                            <Link href={activeProject.githubLink} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--ide-border)] bg-[var(--ide-bg-panel)] hover:bg-[var(--ide-selection)] transition-colors text-[var(--ide-fg-primary)] text-sm font-semibold">
                                                <Github width={16} height={16} /> Source Code
                                            </Link>
                                        )}
                                        {activeProject.liveLink && (
                                            <Link href={activeProject.liveLink} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--ide-accent)] text-white hover:bg-[var(--ide-accent)]/90 transition-colors text-sm font-semibold shadow-md">
                                                <OpenNewWindow width={16} height={16} /> Live Demo
                                            </Link>
                                        )}
                                        {activeProject.apkLink && (
                                            <Link href={activeProject.apkLink} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3DDC84] text-black hover:bg-[#3DDC84]/90 transition-colors text-sm font-semibold shadow-md">
                                                <Download width={16} height={16} /> Download APK
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Live Preview / Screenshot */}
                            <div className="space-y-4">
                                {(() => {
                                    const isCodePen = activeProject.liveLink.includes('codepen.io');
                                    if (isCodePen) {
                                        // Convert full/pen URL to embed URL
                                        const embedUrl = activeProject.liveLink.replace('/full/', '/embed/').replace('/pen/', '/embed/') + '?default-tab=result&theme-id=dark';

                                        return (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className="relative w-full rounded-3xl overflow-hidden border border-[var(--ide-border)] bg-[var(--ide-bg-panel)] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                                            >
                                                <iframe
                                                    src={embedUrl}
                                                    title={activeProject.title}
                                                    className="w-full h-[350px] md:h-[500px] border-none"
                                                    loading="lazy"
                                                    allowFullScreen
                                                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                                                />
                                                <div className="absolute top-4 right-4 z-10">
                                                    <div className="text-[10px] font-mono backdrop-blur-xl bg-black/40 px-3 py-1.5 rounded-full border border-white/10 text-white shadow-xl">
                                                        Live Interactive Preview
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    }

                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="relative aspect-video w-full rounded-3xl overflow-hidden border border-[var(--ide-border)] bg-[var(--ide-bg-panel)] group shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                                        >
                                            <NextImage
                                                src={activeProject.coverImage}
                                                alt={activeProject.title}
                                                fill
                                                className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.02]"
                                                priority
                                                onError={() => console.warn(`[IDE Display Image 404] "${activeProject.title}" → ${activeProject.coverImage}`)}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                        </motion.div>
                                    );
                                })()}
                            </div>

                            {/* Tech Stack */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-[var(--ide-border)] opacity-30"></div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ide-fg-secondary)] opacity-50 flex items-center gap-2 px-4 whitespace-nowrap">
                                        <Cpu width={14} height={14} className="text-[var(--ide-accent)]" /> 
                                        Tech Stack & Tools
                                    </h3>
                                    <div className="h-px flex-1 bg-[var(--ide-border)] opacity-30"></div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {activeProject.techStack.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-[var(--ide-bg-panel)] border border-[var(--ide-border)] rounded-xl text-xs text-[var(--ide-fg-primary)] font-semibold hover:border-[var(--ide-accent)] hover:text-[var(--ide-accent)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--ide-accent-rgb),0.1)] cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Markdown Content Section */}
                            <div className="pt-8 md:pt-12">
                                <div className="markdown-content prose prose-invert max-w-none prose-p:text-[var(--ide-fg-secondary)] prose-p:leading-relaxed prose-headings:text-[var(--ide-fg-primary)] prose-li:text-[var(--ide-fg-secondary)]">
                                    <ReactMarkdown 
                                        components={{
                                            h1: ({node, ...props}) => <h2 className="text-3xl md:text-4xl font-black text-[var(--ide-fg-primary)] mb-8 mt-12 flex items-center gap-4" {...props} />,
                                            h2: ({node, ...props}) => <h3 className="text-2xl font-bold text-[var(--ide-fg-primary)] mb-6 mt-10 border-l-4 border-[var(--ide-accent)] pl-4" {...props} />,
                                            h3: ({node, ...props}) => <h4 className="text-xl font-bold text-[var(--ide-fg-primary)] mb-4 mt-8 opacity-90" {...props} />,
                                            p: ({node, ...props}) => <p className="text-md md:text-lg text-[var(--ide-fg-secondary)] leading-relaxed mb-8 font-normal" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-none space-y-4 mb-10" {...props} />,
                                            li: ({node, ...props}) => (
                                                <li className="flex items-start gap-3">
                                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--ide-accent)] shrink-0 shadow-[0_0_10px_var(--ide-accent)]" />
                                                    <span className="text-[var(--ide-fg-secondary)] leading-relaxed" {...props} />
                                                </li>
                                            ),
                                            code: ({node, ...props}) => <code className="bg-[var(--ide-bg-panel)] text-[var(--ide-accent)] px-2 py-0.5 rounded-lg font-mono text-sm border border-[var(--ide-border)]" {...props} />,
                                            strong: ({node, ...props}) => <strong className="text-[var(--ide-fg-primary)] font-bold decoration-[var(--ide-accent)] underline decoration-2 underline-offset-4" {...props} />,
                                            hr: () => <hr className="my-16 border-t border-[var(--ide-border)] opacity-30" />,
                                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[var(--ide-accent)] italic pl-6 my-8 text-xl text-[var(--ide-fg-primary)] opacity-80" {...props} />,
                                        }}
                                    >
                                        {activeProject?.description || ''}
                                    </ReactMarkdown>
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
                                <TerminalIcon width={12} height={12} />
                                <span>Terminal</span>
                                {isTerminalOpen && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-500 text-[9px] font-normal lowercase">node</span>}
                            </div>
                            <div className="text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)]">
                                {isTerminalOpen ? <Collapse width={14} height={14} /> : <Expand width={14} height={14} />}
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
