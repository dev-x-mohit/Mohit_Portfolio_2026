'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Footer = () => {
    const pathname = usePathname();

    // Do not render the footer on the projects page
    if (pathname === '/projects') {
        return null;
    }

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 border-t border-border/10 bg-background text-text-secondary">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 md:mb-0"
                >
                    <p className="text-sm font-medium">
                        &copy; {currentYear} Mohit. All rights reserved.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center space-x-6 text-sm"
                >
                    <span className="flex items-center gap-2">
                        Built with Next.js & Tailwind
                    </span>
                    <a href="https://github.com/mohitlakhara-ind" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                    <a href="https://linkedin.com/in/mohitlakhara-ind" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                    <a href="https://x.com/dev_x_mohit" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter / X</a>
                    <a href="https://instagram.com/dev_x_mohit" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
                    <a href="https://codepen.io/mohitlakhara" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">CodePen</a>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
