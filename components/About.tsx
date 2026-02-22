'use client';
import { Mail, MapPin, Cpu, OpenNewWindow, Code, ArrowRight } from 'iconoir-react';


import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


const About = () => {
    return (
        <section
            id="about"
            className="relative w-full h-[95vh] min-h-[600px] max-h-[900px] bg-background text-foreground overflow-hidden flex items-center justify-center p-4 md:p-8"
        >
            {/* Background Decor */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-accent-action/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-accent-highlight/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Main Container - Compact Grid */}
            <div className="w-full max-w-7xl h-full max-h-[800px] border border-white/10 rounded-3xl bg-secondary-bg/20 backdrop-blur-xl relative z-10 p-6 md:p-10 flex flex-col md:flex-row gap-8 overflow-y-auto custom-scrollbar shadow-2xl">

                {/* Left Focus Area: Profile Identity */}
                <motion.div
                    className="flex-1 flex flex-col justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 bg-accent-highlight rounded-full animate-pulse shadow-[0_0_8px_rgba(0,188,212,0.8)]"></span>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-text-secondary">Sys.Profile_Active</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tighter leading-[1.1] mb-6">
                            Full-Stack <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight">Architect.</span>
                        </h2>

                        <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans max-w-md border-l-2 border-white/10 pl-4 py-1 mb-8">
                            BCA student at Lachoo Memorial College and Full-stack App & Web Developer at <strong className="text-foreground font-medium">Fudode</strong>. Engineering high-performance digital ecosystems.
                        </p>

                        {/* Compact Tool Stack */}
                        <div className="flex flex-wrap gap-2 max-w-sm mb-8">
                            {['MERN', 'Next.js', 'React Native', 'TypeScript', 'Tailwind'].map(tech => (
                                <span key={tech} className="px-2.5 py-1 rounded bg-black/20 border border-white/5 text-[11px] font-mono text-text-primary hover:border-accent-action/30 transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact Bar & CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-auto border-t border-white/10 w-full">
                        <div className="flex items-center gap-4">
                            <a href="mailto:mohitlakhara78500@gmail.com" className="group flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-highlight/20 transition-colors">
                                    <Mail width={14} height={14} className="text-text-secondary group-hover:text-accent-highlight" />
                                </div>
                                <span className="text-xs font-medium tracking-wide">Email</span>
                            </a>
                            <a href="https://linkedin.com/in/mohitlakhara-ind" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://cdn.simpleicons.org/linkedin/0A66C2" alt="LinkedIn" width={14} height={14} style={{ width: 14, height: 14, objectFit: 'contain' }} />
                                </div>
                                <span className="text-xs font-medium tracking-wide">LinkedIn</span>
                            </a>
                        </div>

                        <Link
                            href="/about"
                            className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-action/50 overflow-hidden transition-all duration-300"
                        >
                            <span className="relative z-10 text-sm font-semibold text-foreground">Know More</span>
                            <ArrowRight width={16} height={16} className="relative z-10 text-foreground group-hover:translate-x-1 group-hover:text-accent-action transition-all" />
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-action/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </div>
                </motion.div>


                {/* Right Focus Area: Visual Modules */}
                <motion.div
                    className="flex-1 grid grid-rows-2 gap-4 h-full min-h-[300px]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Module 1 */}
                    <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/5 p-6 relative overflow-hidden group flex flex-col justify-end">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent-action/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Cpu className="absolute top-6 right-6 text-foreground/20 w-24 h-24 group-hover:text-accent-action/40 group-hover:scale-110 transition-all duration-700" />
                        <h3 className="text-lg font-bold font-display mb-1 text-foreground relative z-10 flex items-center gap-2">
                            System Engineering <OpenNewWindow width={14} height={14} className="text-accent-action opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-xs text-text-secondary max-w-[80%] relative z-10">Optimizing logic flows and robust backend architectures to sustain complex front-end demands.</p>
                    </div>

                    {/* Module 2 */}
                    <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/5 p-6 relative overflow-hidden group flex flex-col justify-end">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-accent-highlight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Code className="absolute top-6 right-6 text-foreground/20 w-24 h-24 group-hover:text-accent-highlight/40 group-hover:scale-110 transition-all duration-700" />
                        <h3 className="text-lg font-bold font-display mb-1 text-foreground relative z-10 flex items-center gap-2">
                            Interface Architect <OpenNewWindow width={14} height={14} className="text-accent-highlight opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-xs text-text-secondary max-w-[80%] relative z-10">Crafting immersive, high-performance UI/UX that feels cinematic, tactile, and instantly responsive.</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
