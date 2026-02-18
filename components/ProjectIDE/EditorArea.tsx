'use client';

import React from 'react';
import { X, FileCode, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projectData';

interface EditorAreaProps {
    activeProject: Project | null;
    openProjects: Project[];
    onCloseProject: (id: string) => void;
    onSelectProject: (project: Project) => void;
}

// Simple syntax highlighter for the demo
const SyntaxHighlighter = ({ code }: { code: string }) => {
    const lines = code.split('\n');
    return (
        <div className="font-mono text-sm leading-6">
            {lines.map((line, i) => (
                <div key={i} className="table-row">
                    <span className="table-cell text-right pr-4 select-none text-white/20 w-8">{i + 1}</span>
                    <span className="table-cell whitespace-pre">
                        {line.split(/(\b(?:const|let|var|function|return|async|await|import|from|export|default|class|interface|type)\b|["'`].*?["'`]|\/\/.*)/g).map((part, j) => {
                            if (['const', 'let', 'var', 'function', 'return', 'async', 'await', 'import', 'from', 'export', 'default', 'class', 'interface', 'type'].includes(part)) {
                                return <span key={j} className="text-pink-400">{part}</span>;
                            } else if (part.startsWith('//')) {
                                return <span key={j} className="text-green-400/50 italic">{part}</span>;
                            } else if (part.startsWith('"') || part.startsWith("'") || part.startsWith('`')) {
                                return <span key={j} className="text-yellow-300">{part}</span>;
                            }
                            return <span key={j} className="text-blue-100/80">{part}</span>;
                        })}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default function EditorArea({ activeProject, openProjects, onCloseProject, onSelectProject }: EditorAreaProps) {
    if (!activeProject) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-white/20 bg-[#1e1e1e]">
                <FileCode size={64} strokeWidth={1} />
                <p className="mt-4 font-mono text-sm">Select a file to view code</p>
                <div className="mt-8 flex gap-2">
                    <span className="text-xs border border-white/10 px-2 py-1 rounded">⌘ P</span>
                    <span className="text-xs">to search files</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-[#1e1e1e] h-full overflow-hidden relative">
            {/* Tabs */}
            <div className="flex overflow-x-auto bg-[#0a0a0c] no-scrollbar">
                {openProjects.map(project => (
                    <div
                        key={project.id}
                        onClick={() => onSelectProject(project)}
                        className={`
                            group flex items-center gap-2 px-3 py-2.5 min-w-[120px] max-w-[200px] cursor-pointer border-r border-white/5 select-none
                            ${activeProject.id === project.id ? 'bg-[#1e1e1e] text-white' : 'bg-[#0a0a0c] text-white/50 hover:bg-[#151517]'}
                        `}
                    >
                        <span className="text-blue-400">TS</span>
                        <span className="text-xs truncate flex-1">{project.title}.{project.type === 'web' ? 'tsx' : 'jsx'}</span>
                        <button
                            onClick={(e) => { e.stopPropagation(); onCloseProject(project.id); }}
                            className={`opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded-sm transition-all ${activeProject.id === project.id ? 'opacity-100' : ''}`}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 px-4 py-2 text-xs text-white/40 bg-[#1e1e1e] border-b border-white/5 font-mono">
                <span>src</span>
                <span>/</span>
                <span>components</span>
                <span>/</span>
                <span className="text-white/80">{activeProject.category}</span>
                <span>/</span>
                <span className="text-white">{activeProject.title}.{activeProject.type === 'web' ? 'tsx' : 'jsx'}</span>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeProject.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SyntaxHighlighter code={activeProject.codeSnippet} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Run Button (Decorative or triggers preview refresh) */}
            <button className="absolute bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-900/20 transition-all hover:scale-110 z-10 group">
                <Play fill="currentColor" size={20} className="ml-1" />
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Run Preview
                </span>
            </button>
        </div>
    );
}
