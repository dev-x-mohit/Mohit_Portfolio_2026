'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themes, Theme } from './themes';
import { Check, Moon, Sun } from 'lucide-react';

interface ThemeSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    currentThemeId: string;
    onSelectTheme: (theme: Theme) => void;
}

export default function ThemeSelector({ isOpen, onClose, currentThemeId, onSelectTheme }: ThemeSelectorProps) {

    // Group themes
    const darkThemes = themes.filter(t => t.type === 'dark');
    const lightThemes = themes.filter(t => t.type === 'light');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Invisible Overlay for click-outside */}
                    <div
                        className="fixed inset-0 z-[150]"
                        onClick={onClose}
                    />

                    {/* Popover */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                        transition={{ duration: 0.1 }}
                        className="absolute left-14 bottom-14 z-[160] w-64 bg-[var(--ide-bg-panel)] border border-[var(--ide-border)] shadow-xl rounded-lg overflow-hidden flex flex-col max-h-[70vh] text-[var(--ide-fg-primary)]"
                    >
                        <div className="p-3 border-b border-[var(--ide-border)] font-mono text-xs font-bold uppercase tracking-wider opacity-60">
                            Select Color Theme
                        </div>

                        <div className="overflow-y-auto py-1">
                            {/* Dark Themes */}
                            <div className="px-3 py-1.5 text-[10px] font-mono opacity-50 flex items-center gap-2">
                                <Moon size={10} /> DARK THEMES
                            </div>
                            {darkThemes.map(theme => (
                                <div
                                    key={theme.id}
                                    onClick={() => onSelectTheme(theme)}
                                    className={`
                                        px-3 py-2 cursor-pointer flex items-center justify-between text-xs
                                        ${currentThemeId === theme.id ? 'bg-[var(--ide-accent)] text-white' : 'hover:bg-[var(--ide-overlay-hover)]'}
                                    `}
                                    style={currentThemeId !== theme.id ? {
                                        // Specific hover logic could be tricky with dynamic vars, using simple opacity
                                    } : {}}
                                >
                                    <span>{theme.name}</span>
                                    {currentThemeId === theme.id && <Check size={14} />}
                                </div>
                            ))}

                            <div className="my-1 h-px bg-[var(--ide-border)]" />

                            {/* Light Themes */}
                            <div className="px-3 py-1.5 text-[10px] font-mono opacity-50 flex items-center gap-2">
                                <Sun size={10} /> LIGHT THEMES
                            </div>
                            {lightThemes.map(theme => (
                                <div
                                    key={theme.id}
                                    onClick={() => onSelectTheme(theme)}
                                    className={`
                                        px-3 py-2 cursor-pointer flex items-center justify-between text-xs
                                        ${currentThemeId === theme.id ? 'bg-[var(--ide-accent)] text-white' : 'hover:bg-[var(--ide-overlay-hover)]'}
                                    `}
                                >
                                    <span>{theme.name}</span>
                                    {currentThemeId === theme.id && <Check size={14} />}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
