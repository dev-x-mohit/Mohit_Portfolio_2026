'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2, Minimize2, Terminal as TerminalIcon } from 'lucide-react';
import { Project, projects } from '@/data/projectData';
import { Theme, themes } from './themes';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProject: (project: Project) => void;
    onSelectTheme: (theme: Theme) => void;
    activeProject: Project | null;
}

interface LogEntry {
    type: 'command' | 'output' | 'error' | 'success';
    content: string;
}

export interface TerminalRef {
    addLog: (entry: LogEntry) => void;
}

const Terminal = React.forwardRef<TerminalRef, TerminalProps>(({ isOpen, onClose, onSelectProject, onSelectTheme, activeProject }, ref) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<LogEntry[]>([
        { type: 'output', content: 'Mohit Portfolio Terminal [Version 1.0.0]' },
        { type: 'output', content: '(c) 2026 Mohit Lakhara. All rights reserved.' },
        { type: 'success', content: 'Type "help" to see available commands.' },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // File System State
    const [cwd, setCwd] = useState<string>('~/portfolio');

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Expose addLog to parent
    React.useImperativeHandle(ref, () => ({
        addLog: (entry: LogEntry) => {
            setHistory(prev => [...prev, entry]);
        }
    }));

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        // Add to log
        const newHistory = [...history, { type: 'command', content: trimmedCmd } as LogEntry];

        // Add to command history for up/down navigation
        const newCmdHistory = [...commandHistory, trimmedCmd];
        setCommandHistory(newCmdHistory);
        setHistoryIndex(-1);

        // Parse command
        const parts = trimmedCmd.split(' ');
        const mainCommand = parts[0].toLowerCase();
        const args = parts.slice(1);

        let response: LogEntry | LogEntry[] | null = null;

        // --- COMMAND HANDLERS ---
        switch (mainCommand) {
            case 'help':
                response = [
                    { type: 'output', content: 'Available commands:' },
                    { type: 'output', content: '  ls, list              List directory contents' },
                    { type: 'output', content: '  cd <dir>              Change directory' },
                    { type: 'output', content: '  pwd                   Print working directory' },
                    { type: 'output', content: '  open <project_name>   Open a project by name (fuzzy match)' },
                    { type: 'output', content: '  clear                 Clear the terminal history' },
                    { type: 'output', content: '  theme <name>          Change the IDE theme' },
                    { type: 'output', content: '  whoami                Display current user info' },
                    { type: 'output', content: '  home                  Return to main homepage' },
                ];
                break;

            case 'clear':
                setHistory([]);
                return; // Special case

            case 'pwd':
                response = { type: 'success', content: cwd };
                break;

            case 'ls':
            case 'list':
            case 'dir':
                if (cwd === '~/portfolio') {
                    // Root
                    response = [
                        { type: 'output', content: 'projects/  about/  contact.md  resume.pdf  package.json' }
                    ];
                } else if (cwd === '~/portfolio/projects') {
                    // Projects folder
                    const projectList = projects.map(p => p.title.replace(/\s+/g, '-').toLowerCase() + '/').join('  ');
                    response = { type: 'success', content: projectList };
                } else if (cwd.startsWith('~/portfolio/projects/')) {
                    // Inside a project
                    response = { type: 'output', content: 'src/  public/  node_modules/  package.json  README.md  tsconfig.json' };
                } else if (cwd === '~/portfolio/about') {
                    response = { type: 'output', content: 'bio.txt  skills.json  experience.md' };
                } else {
                    response = { type: 'output', content: '' };
                }
                break;

            case 'cd':
                if (args.length === 0 || args[0] === '~') {
                    setCwd('~/portfolio');
                } else if (args[0] === '..') {
                    // Go up one level
                    if (cwd === '~/portfolio') {
                        response = { type: 'error', content: 'Already at root.' };
                    } else {
                        const newPath = cwd.substring(0, cwd.lastIndexOf('/'));
                        setCwd(newPath);
                    }
                } else if (cwd === '~/portfolio' && args[0] === 'projects') {
                    setCwd('~/portfolio/projects');
                } else if (cwd === '~/portfolio' && args[0] === 'about') {
                    setCwd('~/portfolio/about');
                } else if (cwd === '~/portfolio/projects') {
                    // Check if project exists
                    const targetProject = projects.find(p => p.title.replace(/\s+/g, '-').toLowerCase() === args[0].toLowerCase());
                    if (targetProject) {
                        setCwd(`~/portfolio/projects/${args[0].toLowerCase()}`);
                    } else {
                        response = { type: 'error', content: `cd: no such file or directory: ${args[0]}` };
                    }
                } else {
                    response = { type: 'error', content: `cd: no such file or directory: ${args[0]}` };
                }
                break;

            case 'open':
                if (args.length === 0) {
                    response = { type: 'error', content: 'Usage: open <project_name>' };
                } else {
                    const query = args.join(' ').toLowerCase();
                    const foundProject = projects.find(p => p.title.toLowerCase().includes(query));
                    if (foundProject) {
                        onSelectProject(foundProject);
                        response = { type: 'success', content: `Opening project: ${foundProject.title}...` };
                    } else {
                        response = { type: 'error', content: `Project not found: "${query}". Type "ls" inside projects/ to see list.` };
                    }
                }
                break;

            case 'mkdir':
                response = { type: 'output', content: `mkdir: cannot create directory '${args[0] || ''}': Permission denied` };
                break;

            case 'touch':
            case 'rm':
                response = { type: 'output', content: `${mainCommand}: Permission denied` };
                break;

            case 'theme':
                if (args.length === 0) {
                    response = { type: 'error', content: 'Usage: theme <theme_name>' };
                } else {
                    const query = args.join(' ').toLowerCase();
                    const foundTheme = themes.find(t => t.id.toLowerCase().includes(query) || t.name.toLowerCase().includes(query));
                    if (foundTheme) {
                        onSelectTheme(foundTheme);
                        response = { type: 'success', content: `Theme changed to: ${foundTheme.name}` };
                    } else {
                        response = { type: 'error', content: `Theme not found: "${query}". Type "themes" to list available themes.` };
                    }
                }
                break;

            case 'themes':
                response = [
                    { type: 'output', content: 'Available themes:' },
                    ...themes.map(t => ({ type: 'output', content: `  ${t.name} (id: ${t.id})` } as LogEntry))
                ];
                break;

            case 'home':
            case 'exit':
                window.location.href = '/';
                response = { type: 'success', content: 'Redirecting to homepage...' };
                break;

            case 'whoami':
                response = { type: 'success', content: 'guest@mohit-portfolio' };
                break;

            default:
                response = { type: 'error', content: `Command not found: "${mainCommand}". Type "help" for a list of commands.` };
                break;
        }

        if (response) {
            if (Array.isArray(response)) {
                setHistory([...newHistory, ...response]);
            } else {
                setHistory([...newHistory, response]);
            }
        } else {
            setHistory(newHistory);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="flex flex-col h-full bg-[var(--ide-bg-panel)] border-t border-[var(--ide-border)] font-mono text-sm shadow-2xl relative">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--ide-bg-activity-bar)] border-b border-[var(--ide-border)] shrink-0 select-none">
                <div className="flex items-center gap-2 text-[var(--ide-fg-secondary)] flex-1">
                    <TerminalIcon size={14} />
                    <span className="text-xs uppercase tracking-wider font-semibold">Terminal</span>
                    {/* CWD Display in Header */}
                    <span className="text-xs opacity-50 ml-2 normal-case font-normal">— {cwd}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="text-[var(--ide-fg-secondary)] hover:text-[var(--ide-fg-primary)] p-1 rounded-sm hover:bg-[var(--ide-bg-workspace)] transition-colors">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-1 text-[var(--ide-fg-secondary)] selection:bg-[var(--ide-selection)]"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((entry, index) => (
                    <div key={index} className={`
                        ${entry.type === 'command' ? 'text-[var(--ide-fg-primary)] font-bold mt-2' : ''}
                        ${entry.type === 'error' ? 'text-red-400' : ''}
                        ${entry.type === 'success' ? 'text-[var(--ide-accent)]' : ''}
                        ${entry.type === 'output' ? 'text-[var(--ide-fg-secondary)]' : ''}
                        break-words
                    `}>
                        {entry.type === 'command' && (
                            <span className="mr-2">
                                <span className="text-[var(--ide-accent)] font-bold">➜</span>
                                <span className="text-cyan-400 ml-1">{cwd.split('/').pop()}</span>
                            </span>
                        )}
                        {entry.content}
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center text-[var(--ide-fg-primary)] mt-2">
                    <span className="text-[var(--ide-accent)] font-bold mr-1">➜</span>
                    <span className="text-cyan-400 mr-2">{cwd.split('/').pop()}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-[var(--ide-fg-primary)] font-mono placeholder:text-[var(--ide-fg-secondary)]/30"
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
});

export default Terminal;
