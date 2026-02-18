'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, User, Mail, Cpu, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
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

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'About', href: '/about', icon: User },
        { name: 'Projects', href: '/projects', icon: Cpu }, // Changed icon to Cpu for a more tech feel
        { name: 'Contact', href: '/contact', icon: Mail },
    ];

    if (pathname === '/studio' || pathname === '/projects') return null;

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={cn(
                    "fixed top-4 left-1/2 -translate-x-1/2 z-50",
                    "hidden md:flex items-center gap-1",
                    "bg-white/5 backdrop-blur-xl border border-white/10",
                    "rounded-full px-2 py-2 shadow-2xl shadow-black/20",
                    "dark:bg-black/20 dark:border-white/5"
                )}
            >
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                "flex items-center gap-2",
                                isActive ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-600/80 rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon className="w-4 h-4" />
                            <span className="hidden lg:block">{link.name}</span>
                        </Link>
                    );
                })}
            </motion.nav>

            {/* Mobile Navigation Toggle */}
            <motion.button
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed top-4 right-4 z-50 p-3 md:hidden",
                    "bg-white/5 backdrop-blur-xl border border-white/10",
                    "rounded-full shadow-2xl text-white",
                    "hover:bg-white/10 transition-colors"
                )}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 text-2xl font-medium text-white/80 hover:text-primary transition-colors"
                                    >
                                        <Icon className="w-8 h-8" />
                                        {link.name}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
