'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects, Project } from '@/data/projectData';
import Image from 'next/image';
import Link from 'next/link';
import { Github, OpenNewWindow, ArrowDown, Download } from 'iconoir-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({ project, index }: { project: Project; index: number }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        const content = contentRef.current;

        if (!section || !image || !content) return;

        // Image Parallax
        gsap.fromTo(image, 
            { y: '-20%' }, 
            { 
                y: '20%', 
                ease: 'none', 
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            }
        );

        // Content Fade & Slide
        gsap.fromTo(content,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    end: 'top 20%',
                    scrub: false,
                    toggleActions: 'play reverse play reverse'
                }
            }
        );

    }, []);

    const isEven = index % 2 === 0;

    return (
        <section 
            ref={sectionRef} 
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24"
        >
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="absolute inset-0 scale-125 origin-center">
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover opacity-30 blur-sm"
                        sizes="100vw"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
                <div ref={contentRef} className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Visual Mockup/Image */}
                    <div className="w-full lg:w-1/2 relative group perspective-1000">
                        <motion.div 
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:rotate-y-2 group-hover:rotate-x-2"
                            style={{ boxShadow: `0 30px 60px -10px ${project.accentColor}30` }}
                        >
                            <Image
                                src={project.coverImage}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-3xl font-display font-bold text-white drop-shadow-lg">{project.title}</h3>
                                <p className="text-white/80 font-mono text-sm">[{project.type}] {project.category}</p>
                            </div>
                        </motion.div>

                        {/* Floating elements for visual flair */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full mix-blend-screen filter blur-[50px] opacity-40 animate-pulse" style={{ backgroundColor: project.accentColor }} />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full mix-blend-screen filter blur-[60px] opacity-30 animate-pulse delay-1000" style={{ backgroundColor: project.accentColor }} />
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 uppercase tracking-widest">
                                {project.year}
                            </span>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>
                        
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 font-display leading-[1.1]">
                            {project.title}
                        </h2>
                        
                        <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
                            {project.summary}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-10">
                            {project.techStack.map((tech) => (
                                <span 
                                    key={tech} 
                                    className="px-3 py-1 bg-black/40 backdrop-blur-sm border text-sm text-white/90"
                                    style={{ borderColor: `${project.accentColor}50` }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-4">
                            {project.liveLink && (
                                <Link 
                                    href={project.liveLink} 
                                    target="_blank"
                                    className="group relative px-8 py-4 bg-white text-black font-bold overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-full h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" style={{ backgroundColor: project.accentColor }} />
                                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                                        Explore Live <OpenNewWindow width={18} height={18} />
                                    </span>
                                </Link>
                            )}
                            {project.githubLink && (
                                <Link 
                                    href={project.githubLink} 
                                    target="_blank"
                                    className="p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white hover:scale-105"
                                    title="View Source"
                                >
                                    <Github width={24} height={24} />
                                </Link>
                            )}
                            {project.apkLink && project.apkLink !== '#' && (
                                <Link 
                                    href={project.apkLink} 
                                    target="_blank"
                                    className="px-8 py-4 bg-[#3DDC84]/20 border border-[#3DDC84]/50 text-[#3DDC84] font-bold hover:bg-[#3DDC84] hover:text-black transition-all flex items-center gap-2"
                                >
                                    APK <Download width={18} height={18} />
                                </Link>
                            )}
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
                            <div>
                                <div className="text-3xl font-bold font-mono" style={{ color: project.accentColor }}>{project.stats.commits}+</div>
                                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Commits</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold font-mono" style={{ color: project.accentColor }}>{project.stats.stars}</div>
                                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Stars</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold font-mono mt-1" style={{ color: project.accentColor }}>{project.stats.topLanguage}</div>
                                <div className="text-xs text-white/40 uppercase tracking-wider mt-2">Core Tech</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default function CinematicScroll() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative bg-[#050505] text-white selection:bg-white/20">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-mono tracking-widest text-white/80 uppercase">Selected Works</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-6 leading-none">
                        THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                            ARCHIVE
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl text-white/50 font-mono max-w-2xl mx-auto mb-16">
                        A curated collection of digital experiences, platforms, and open-source software.
                    </p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2 text-white/40 animate-bounce"
                >
                    <span className="text-xs font-mono uppercase tracking-widest">Scroll to Explore</span>
                    <ArrowDown width={20} height={20} />
                </motion.div>
            </section>

            {/* Projects */}
            <div className="relative z-10 pb-24">
                {projects.map((project, index) => (
                    <ProjectSection key={project.id} project={project} index={index} />
                ))}
            </div>
            
            {/* Final Spacer */}
            <div className="h-[20vh]" />
        </div>
    );
}
