'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

const socialLinks = [
    {
        name: "GitHub",
        icon: <Github size={24} />,
        url: "https://github.com/mohitlakhara", // Replace with actual
        color: "#ffffff"
    },
    {
        name: "LinkedIn",
        icon: <Linkedin size={24} />,
        url: "https://www.linkedin.com/in/mohitlakharaind",
        color: "#0077b5"
    },
    {
        name: "Twitter",
        icon: <Twitter size={24} />,
        url: "https://twitter.com/your_handle", // Replace if exists
        color: "#1da1f2"
    },
    {
        name: "Email",
        icon: <Mail size={24} />,
        url: "mailto:mohitlakhara78500@gmail.com",
        color: "#ea4335"
    }
];

const DigitalPresence = () => {
    return (
        <section className="relative w-full py-20 px-6 flex flex-col items-center justify-center bg-transparent">

            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black mb-12 text-center font-display uppercase tracking-widest text-foreground"
            >
                Digital <span className="text-accent-action">Nexus</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
                {socialLinks.map((link, index) => (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group relative flex items-center justify-between p-6 rounded-2xl bg-secondary-bg/30 border border-border/30 backdrop-blur-md overflow-hidden hover:border-accent-action/50 transition-colors"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-action/0 via-accent-action/5 to-accent-action/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 rounded-full bg-background/50 text-foreground group-hover:text-accent-action transition-colors">
                                {link.icon}
                            </div>
                            <span className="text-lg font-bold text-text-secondary group-hover:text-foreground transition-colors">
                                {link.name}
                            </span>
                        </div>

                        <ExternalLink size={16} className="text-text-secondary/50 group-hover:text-accent-action transition-colors" />
                    </motion.a>
                ))}
            </div>

            <div className="mt-16 text-center text-sm text-text-secondary/60">
                <p>Establishing secure connection...</p>
                <div className="flex justify-center gap-1 mt-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-75" />
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150" />
                </div>
            </div>

        </section>
    );
};

export default DigitalPresence;
