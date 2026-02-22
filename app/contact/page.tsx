'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="relative min-h-screen w-full bg-background text-foreground overflow-hidden flex items-center justify-center">

            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-accent-action/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent-highlight/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-action/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Info & Context */}
                    <div className="flex flex-col justify-center h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter mb-8 leading-[0.9]">
                                Let's <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight">Collaborate.</span>
                            </h1>
                            <p className="text-xl text-text-secondary font-light max-w-md mb-12 leading-relaxed">
                                Creating unique digital experiences is my passion. Whether you have a project in mind or just want to say hello, I'm always open to new ideas.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6 group cursor-pointer">
                                    <div className="p-4 rounded-2xl bg-secondary-bg/30 border border-border/10 text-foreground group-hover:text-accent-action group-hover:bg-accent-action/10 transition-all duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-1">Email</h3>
                                        <p className="text-lg font-medium text-foreground group-hover:text-accent-action transition-colors">mohit.dev.contact@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group cursor-pointer">
                                    <div className="p-4 rounded-2xl bg-secondary-bg/30 border border-border/10 text-foreground group-hover:text-accent-action group-hover:bg-accent-action/10 transition-all duration-300">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-1">Location</h3>
                                        <p className="text-lg font-medium text-foreground group-hover:text-accent-action transition-colors">Remote / Worldwide</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 flex gap-6">
                                {[
                                    { label: 'GitHub', href: 'https://github.com/mohitlakhara-ind' },
                                    { label: 'LinkedIn', href: 'https://linkedin.com/in/mohitlakhara-ind' },
                                    { label: 'Instagram', href: 'https://instagram.com/webdev_mohit' },
                                    { label: 'CodePen', href: 'https://codepen.io/mohitlakhara' }
                                ].map((social, i) => (
                                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-accent-action transition-colors group">
                                        {social.label}
                                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full"
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
