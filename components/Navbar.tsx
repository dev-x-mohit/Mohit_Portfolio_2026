'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Xmark, Home, User, Folder, ChatBubble } from 'iconoir-react';
import { cn } from '@/lib/utils';
const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Projects', href: '/projects', icon: Folder },
    { name: 'Contact', href: '/contact', icon: ChatBubble },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Navbar - Cyber Dock */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50",
                    "hidden md:flex items-center p-2 gap-2",
                    "bg-background/60 backdrop-blur-2xl rounded-full",
                    "border border-white/10 shadow-[0_0_30px_-5px_rgba(225,193,122,0.15)] group"
                )}
            >
                {/* Glowing Animated Border */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none -z-10 [mask-image:linear-gradient(white,white)]">
                    <div className="absolute w-[800px] h-[800px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--gold-primary)_25%,var(--gold-light)_50%,transparent_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute inset-[1px] bg-background/90 rounded-full -z-10 backdrop-blur-2xl" />

                {/* Logo */}
                <Link href="/" className="pl-4 pr-6 py-2 flex items-center border-r border-white/10 group/logo hover:border-white/30 transition-colors">
                    <span className="font-display font-bold tracking-widest uppercase text-sm text-foreground/90 group-hover/logo:text-[var(--gold-primary)] group-hover/logo:bg-clip-text group-hover/logo:bg-gradient-gold-primary transition-all duration-300">
                        Dev
                    </span>
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="w-6 h-6 object-contain group-hover/logo:drop-shadow-[0_0_10px_var(--gold-primary)] transition-all duration-300"
                    />
                    <span className="font-display font-bold tracking-widest uppercase text-sm text-foreground/90 group-hover/logo:text-[var(--gold-primary)] group-hover/logo:bg-clip-text group-hover/logo:bg-gradient-gold-primary transition-all duration-300">
                        Mohit
                    </span>
                </Link>

                {/* Links */}
                <div className="flex items-center px-2 gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group/link",
                                    isActive ? "bg-white/10 text-[var(--gold-primary)]" : "text-muted-foreground hover:bg-white/5 hover:text-[var(--gold-light)]"
                                )}
                            >
                                <Icon className={cn(
                                    "w-4 h-4 transition-colors duration-300",
                                    isActive ? "text-[var(--gold-primary)]" : "group-hover/link:text-[var(--gold-light)]"
                                )} />
                                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                                    {link.name}
                                </span>

                                {/* Active Underglow */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-[1px] left-1/4 right-1/4 h-[2px] bg-[var(--gold-primary)] rounded-full shadow-[0_0_10px_var(--gold-primary)]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>

            {/* Mobile Toggle Button */}
            <motion.button
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed top-6 right-6 z-[60] p-3 md:hidden",
                    "bg-background/80 backdrop-blur-xl border border-white/10 text-foreground",
                    "rounded-full shadow-[0_0_20px_-5px_rgba(225,193,122,0.2)] transition-all duration-300",
                    isOpen && "bg-white/10"
                )}
            >
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none -z-10 [mask-image:linear-gradient(white,white)]">
                    <div className="absolute w-[200px] h-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--gold-primary)_25%,var(--gold-light)_50%,transparent_100%)] opacity-50" />
                </div>
                <div className="absolute inset-[1px] bg-background/90 rounded-full -z-10" />

                <div className="relative z-10">
                    {isOpen ? <Xmark className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </div>
            </motion.button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 bg-background/90 md:hidden flex flex-col items-center justify-center overflow-hidden"
                    >
                        {/* Huge Ambient Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[var(--gold-primary)]/10 blur-[120px] rounded-full pointer-events-none" />

                        <nav className="flex flex-col items-center gap-6 relative z-10 w-full px-8">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="w-12 h-12 mb-8 drop-shadow-[0_0_15px_var(--gold-primary)]"
                            />

                            {navLinks.map((link, i) => {
                                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                                const Icon = link.icon;

                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i, type: "spring", stiffness: 300, damping: 25 }}
                                        className="w-full max-w-sm"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "group flex items-center justify-center gap-4 p-4 rounded-2xl w-full transition-all duration-300 relative overflow-hidden",
                                                isActive ? "bg-white/10 text-[var(--gold-primary)] border border-white/20" : "bg-black/20 text-muted-foreground border border-white/5 hover:bg-white/5 hover:text-[var(--gold-light)]"
                                            )}
                                        >
                                            <Icon className={cn(
                                                "w-6 h-6",
                                                isActive ? "text-[var(--gold-primary)]" : "group-hover:text-[var(--gold-light)]"
                                            )} />
                                            <span className="font-display text-2xl uppercase tracking-widest font-bold">
                                                {link.name}
                                            </span>

                                            {isActive && (
                                                <div className="absolute inset-0 border border-[var(--gold-primary)] rounded-2xl shadow-[inset_0_0_20px_var(--gold-primary)] opacity-20 pointer-events-none" />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
