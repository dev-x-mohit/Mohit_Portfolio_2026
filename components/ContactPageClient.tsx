'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, ArrowUpRight } from 'iconoir-react';

export default function ContactPageClient() {
    return (
        <main className="relative min-h-screen w-full bg-background text-foreground overflow-hidden flex flex-col lg:flex-row selection:bg-[var(--gold-primary)]/30">
            {/* Left Column: 40% Width - Dark / Abstract Sidebar */}
            <div className="w-full lg:w-[40%] bg-secondary-bg/50 relative flex flex-col justify-between p-8 md:p-16 lg:p-20 lg:min-h-screen border-b lg:border-b-0 lg:border-r border-border/10 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--gold-dark)]/20 via-transparent to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[var(--gold-light)]/20 via-transparent to-transparent opacity-50" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />

                {/* Top Section: Header & Status */}
                <div className="relative z-10 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-border/20 text-xs font-bold uppercase tracking-widest self-start"
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)] animate-pulse" />
                        Accepting New Projects
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-bold font-display tracking-tighter leading-[0.9]"
                    >
                        Hello. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--gold-dark)] to-[var(--gold-light)]">
                            Let's talk.
                        </span>
                    </motion.h1>
                </div>

                {/* Bottom Section: Contact Details & Socials */}
                <div className="relative z-10 mt-16 lg:mt-0 flex flex-col gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6"
                    >
                        <div className="group cursor-pointer">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2 flex items-center gap-2">
                                <Mail width={16} height={16} /> Email
                            </h3>
                            <a href="mailto:mohitlakhara78500@gmail.com" className="text-xl md:text-2xl font-medium text-foreground group-hover:text-[var(--gold-primary)] transition-colors">
                                mohitlakhara78500@gmail.com
                            </a>
                        </div>
                        
                        <div className="group">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2 flex items-center gap-2">
                                <MapPin width={16} height={16} /> Base
                            </h3>
                            <p className="text-xl md:text-2xl font-medium text-foreground">
                                Remote / Worldwide
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap gap-4 pt-8 border-t border-border/10"
                    >
                        {[
                            { label: 'GitHub', href: 'https://github.com/dev-x-mohit' },
                            { label: 'LinkedIn', href: 'https://linkedin.com/in/dev-x-mohit' },
                            { label: 'Twitter / X', href: 'https://x.com/dev_x_mohit' },
                            { label: 'Instagram', href: 'https://instagram.com/dev_x_mohit' },
                            { label: 'CodePen', href: 'https://codepen.io/mohitlakhara' }
                        ].map((social, i) => (
                            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-[var(--gold-primary)] transition-colors group">
                                {social.label}
                                <ArrowUpRight width={14} height={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right Column: 60% Width - Clean Form Area */}
            <div className="w-full lg:w-[60%] bg-background relative flex items-center justify-center p-8 md:p-16 lg:p-24 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-2xl"
                >
                    <p className="text-xl md:text-2xl text-text-secondary font-light mb-12 leading-relaxed">
                        Got a vision that needs executing? Fill out the form below, and I'll get back to you within 24 hours.
                    </p>
                    <ContactForm />
                </motion.div>
            </div>
        </main>
    );
}

