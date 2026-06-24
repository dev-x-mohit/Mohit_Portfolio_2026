'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'iconoir-react';

const About = () => {
    return (
        <section
            id="about"
            className="relative w-full min-h-screen bg-background text-foreground overflow-hidden flex items-center justify-center py-20 px-4 md:px-8"
        >
            {/* Subtle Ambient Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[30vw] h-[50vh] bg-accent-action/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="w-full max-w-7xl z-10 relative">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* Left: Animated Image Display */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-1/2 flex justify-center relative order-1 lg:order-1"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />
                        
                        <div className="relative flex items-center justify-center group w-full">
                            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] xl:max-w-[650px] aspect-square -scale-x-100 mx-auto">
                                <Image
                                    src="/mohitlakhara-side-outline.png"
                                    alt="Mohit Lakhara"
                                    fill
                                    className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Intro Summary */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-1/2 flex flex-col items-start text-left order-2 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-accent-highlight animate-pulse shadow-[0_0_8px_var(--accent-highlight)]" />
                            <span className="text-[10px] font-mono tracking-widest uppercase text-text-secondary">System Online</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tighter mb-4 md:mb-6">
                            Bridging the gap between <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight italic">
                                design & engineering.
                            </span>
                        </h2>
                        
                        <p className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl font-sans">
                            I am a BCA graduate currently pursuing an MCA in Cloud Computing at JECRC University, Jaipur. 
                            After 4 impactful months at Fudode, I am now engineering high-performance SaaS solutions and cinematic user interfaces as a Freelance Developer.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                            {['MERN Stack', 'Next.js', 'React Native', 'TypeScript', 'Tailwind'].map((tech) => (
                                <span key={tech} className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-black/30 border border-white/10 text-[10px] sm:text-xs font-mono text-text-primary hover:border-white/30 hover:bg-white/5 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <Link
                            href="/about"
                            className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 px-6 py-3 sm:px-8 sm:py-4 rounded-sm bg-foreground text-background font-bold tracking-widest uppercase text-[10px] sm:text-xs overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-highlight to-accent-action opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                                READ MY FULL STORY 
                                <div className="w-5 h-5 flex items-center justify-center bg-background/10 rounded-full group-hover:bg-white/20 transition-colors">
                                    <ArrowRight width={14} height={14} />
                                </div>
                            </span>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
