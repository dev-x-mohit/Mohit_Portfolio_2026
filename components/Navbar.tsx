'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, User, Mail, Cpu, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Magnetic effect for that premium interactive feel
const MagneticItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Projects', href: '/projects', icon: Cpu },
    { name: 'Contact', href: '/contact', icon: Mail },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    if (pathname === '/studio') return null;

    return (
        <>
            {/* "Medium Cool" Desktop Navbar */}
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1, scale: 1 },
                    hidden: { y: -100, opacity: 0, scale: 0.95 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50",
                    "hidden md:flex items-center gap-1 p-1.5",
                    "bg-black/50 backdrop-blur-2xl",
                    "rounded-full shadow-2xl shadow-purple-500/10",
                    "border border-white/10 group"
                )}
            >
                {/* Subtle Ambient Glow Behind Navbar */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Slow rotating edge highlight (Cool detail, not distracting) */}
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none -z-10 [mask-image:linear-gradient(white,white)]">
                    <div className="absolute -inset-[100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(168,85,247,0.3)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Left side cosmetic icon / Logo */}
                <div className="px-3 pl-4 flex items-center justify-center border-r border-white/10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Link href="/">
                        <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                    </Link>
                </div>

                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                        <MagneticItem key={link.name}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    "flex items-center gap-2 group/link",
                                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                                )}
                            >
                                {/* Active State Background */}
                                {isActive && (
                                    <>
                                        <motion.div
                                            layoutId="nav-bg"
                                            className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                        {/* Bottom indicator glow */}
                                        <motion.div
                                            layoutId="nav-glow"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-500/50 blur-sm rounded-full -z-10"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    </>
                                )}

                                {/* Hover State Background */}
                                {!isActive && (
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/link:opacity-100 rounded-full transition-opacity duration-300 -z-10" />
                                )}

                                <div className="relative">
                                    <Icon className={cn(
                                        "w-4 h-4 transition-all duration-300 relative z-10",
                                        isActive ? "text-purple-300" : "group-hover/link:text-purple-300 group-hover/link:-translate-y-0.5"
                                    )} />
                                </div>

                                <span className={cn(
                                    "hidden lg:block tracking-wide transition-colors duration-300",
                                    isActive ? "text-white text-shadow-sm" : ""
                                )}>
                                    {link.name}
                                </span>
                            </Link>
                        </MagneticItem>
                    );
                })}
            </motion.nav>

            {/* Mobile Toggle Button */}
            <motion.button
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden && !isOpen ? "hidden" : "visible"}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed top-6 right-6 z-[60] p-3 md:hidden",
                    "bg-black/50 backdrop-blur-xl border border-white/10 text-white",
                    "rounded-full shadow-2xl transition-all duration-300 overflow-hidden",
                    isOpen && "bg-white/10 border-white/20"
                )}
            >
                {/* Subtle border glow on mobile toggle too */}
                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(168,85,247,0.2)_50%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
                <div className="relative z-10">
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </div>
            </motion.button>

            {/* "Medium Cool" Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden"
                            onClick={() => setIsOpen(false)}
                        >
                            {/* Cosmic backdrop details */}
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-x-4 top-24 z-50 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:hidden flex flex-col gap-4 shadow-[0_0_40px_-10px_rgba(168,85,247,0.2)] overflow-hidden"
                        >
                            {/* Inner subtle glow */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                            <div className="flex items-center gap-2 mb-2 px-2 opacity-90">
                                <img src="/images/logo.png" alt="Logo" className="w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                                <span className="text-xs font-mono font-medium tracking-widest text-white uppercase">Navigation</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                {navLinks.map((link, index) => {
                                    const isActive = pathname === link.href;
                                    const Icon = link.icon;

                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + (index * 0.05), type: "spring", stiffness: 300, damping: 25 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative overflow-hidden",
                                                    isActive
                                                        ? "bg-white/10 text-white border border-white/10"
                                                        : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                                                )}
                                            >
                                                {/* Hover sweep on mobile */}
                                                {!isActive && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                )}

                                                <div className={cn(
                                                    "p-2 rounded-xl transition-colors duration-300",
                                                    isActive ? "bg-purple-500/20 text-purple-300" : "bg-white/5 group-hover:bg-purple-500/10 group-hover:text-purple-300"
                                                )}>
                                                    <Icon className="w-5 h-5" />
                                                </div>

                                                <span className="text-lg font-medium tracking-wider">
                                                    {link.name}
                                                </span>

                                                {isActive && (
                                                    <motion.div
                                                        layoutId="mobile-indicator"
                                                        className="absolute right-6 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]"
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
