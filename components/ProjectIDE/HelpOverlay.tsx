'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Terminal, Search, Layout, HelpCircle, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HelpOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HelpOverlay({ isOpen, onClose }: HelpOverlayProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-2xl bg-[var(--ide-bg-panel)] rounded-xl shadow-2xl overflow-hidden relative z-10 flex flex-col font-sans text-[var(--ide-fg-primary)] border border-[var(--ide-border)]"
                >
                    {/* Header */}
                    <div className="h-14 border-b border-[var(--ide-border)] flex items-center justify-between px-6 bg-[var(--ide-bg-workspace)]">
                        <div className="flex items-center gap-2">
                            <HelpCircle className="text-[var(--ide-accent)]" />
                            <h2 className="text-lg font-bold tracking-tight">System Guide</h2>
                        </div>
                        <button onClick={onClose} className="p-1 rounded-md hover:bg-[var(--ide-bg-panel)] transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]" data-lenis-prevent>
                        {/* Intro */}
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Welcome to Project Workspace v2.0</h3>
                            <p className="text-[var(--ide-fg-secondary)]">
                                An interactive development environment showcase. Here is how to navigate:
                            </p>
                        </div>

                        {/* Grid of features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 rounded-lg bg-[var(--ide-bg-workspace)] border border-[var(--ide-border)] flex flex-col gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <Command size={20} />
                                </div>
                                <h4 className="font-bold">Project Explorer</h4>
                                <p className="text-sm text-[var(--ide-fg-secondary)]">
                                    Use the sidebar or <strong>Finder</strong> (CMD+P equivalent) to browse my portfolio projects.
                                </p>
                            </div>

                            <div className="p-4 rounded-lg bg-[var(--ide-bg-workspace)] border border-[var(--ide-border)] flex flex-col gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                    <Terminal size={20} />
                                </div>
                                <h4 className="font-bold">Interactive Terminal</h4>
                                <p className="text-sm text-[var(--ide-fg-secondary)]">
                                    Open the terminal panel to run commands like <code>open</code>, <code>theme</code>, and <code>whoami</code>.
                                </p>
                            </div>

                            <div className="p-4 rounded-lg bg-[var(--ide-bg-workspace)] border border-[var(--ide-border)] flex flex-col gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <Layout size={20} />
                                </div>
                                <h4 className="font-bold">Live Preview</h4>
                                <p className="text-sm text-[var(--ide-fg-secondary)]">
                                    Real-time interactive previews of web projects. Drag the split pane to resize.
                                </p>
                            </div>

                            <div className="p-4 rounded-lg bg-[var(--ide-bg-workspace)] border border-[var(--ide-border)] flex flex-col gap-3">
                                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                    <Search size={20} />
                                </div>
                                <h4 className="font-bold">Quick Navigation</h4>
                                <p className="text-sm text-[var(--ide-fg-secondary)]">
                                    Click the Search icon to quickly find projects by name, category, or tech stack.
                                </p>
                            </div>
                        </div>

                        {/* Back to Home CTA */}
                        <div className="pt-4 border-t border-[var(--ide-border)] flex flex-col items-center gap-4">
                            <p className="text-sm text-[var(--ide-fg-secondary)]">Looking for the main landing page?</p>
                            <button
                                onClick={() => router.push('/')}
                                className="flex items-center gap-2 px-6 py-2 bg-[var(--ide-accent)] text-white rounded-full font-bold hover:opacity-90 transition-opacity"
                            >
                                <Home size={16} />
                                Return to Homepage
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
