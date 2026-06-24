'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, OpenNewWindow, ArrowRight, Download, LayoutLeft } from 'iconoir-react';
import { featuredProjects, FeaturedProject } from '@/data/featuredProjectsData';

const Projects = () => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const displayProjects = featuredProjects.slice(0, 5);
    const totalCards = displayProjects.length + 1;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Calculate which card is currently sticky at the top
        // Each element takes 1/totalCards of the scroll distance.
        const index = Math.floor(latest * totalCards);
        const visibleCardIndex = Math.max(0, index - 1);
        setActiveIndex(Math.min(visibleCardIndex, displayProjects.length));
    });

    const activeColor = activeIndex < displayProjects.length
        ? displayProjects[activeIndex].accentColor
        : '#8A2BE2'; // Finale color

    const glowColor = activeColor === '#000000' ? '#555555' : activeColor;

    return (
        <section ref={container} id="projects" className="relative w-full bg-primary-bg transition-colors duration-500">

            {/* Dynamic Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000 ease-in-out" style={{ backgroundColor: `${glowColor}08` }}>
                <div
                    className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-30 transition-all duration-1000 ease-in-out"
                    style={{ backgroundColor: glowColor }}
                />
                <div
                    className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-20 transition-all duration-1000 ease-in-out"
                    style={{ backgroundColor: glowColor }}
                />
            </div>

            {/* Header */}
            <div className="h-screen w-full flex flex-col items-center justify-center sticky top-0 z-0 pointer-events-none">
                <HeaderContent progress={scrollYProgress} totalCards={totalCards} />
            </div>

            {/* Cards Deck */}
            <div className="relative z-10 w-full">
                {displayProjects.map((project, i) => {
                    const targetScale = 1 - ((totalCards - i) * 0.03);
                    return (
                        <Card
                            key={project.id}
                            i={i}
                            project={project}
                            progress={scrollYProgress}
                            range={[(i + 1) / totalCards, 1]}
                            targetScale={targetScale}
                        />
                    )
                })}

                <FinaleCard
                    i={displayProjects.length}
                    progress={scrollYProgress}
                    range={[1, 1]}
                />
            </div>

        </section>
    );
};

const HeaderContent = ({ progress, totalCards }: { progress: MotionValue<number>, totalCards: number }) => {
    // Header fades out and scales down as the first card scrolls up over it.
    const opacity = useTransform(progress, [0, 0.8 / totalCards], [1, 0]);
    const y = useTransform(progress, [0, 0.8 / totalCards], [0, -100]);
    const scale = useTransform(progress, [0, 0.8 / totalCards], [1, 0.9]);

    return (
        <motion.div style={{ opacity, y, scale }} className="w-full flex flex-col items-center justify-center px-4 relative z-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground/70 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Featured Works
            </div>

            <h2 className="mb-6 font-display text-5xl font-bold md:text-7xl text-foreground">
                Selected <br />
                <span className="bg-gradient-to-r from-accent-action to-accent-highlight bg-clip-text text-transparent">
                    Projects
                </span>
            </h2>

            <p className="max-w-md mx-auto text-lg leading-relaxed text-foreground/60">
                A curated collection of my most impactful work. Scroll to explore the deck.
            </p>

            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="mt-16 flex flex-col items-center gap-3 text-accent-highlight"
            >
                <span className="font-mono text-sm uppercase tracking-widest">
                    Scroll
                </span>
                <div className="rotate-90">
                    <ArrowRight width={28} height={28} />
                </div>
            </motion.div>
        </motion.div>
    );
}

const Card = ({
    i,
    project,
    progress,
    range,
    targetScale,
}: {
    i: number,
    project: FeaturedProject,
    progress: MotionValue<number>,
    range: number[],
    targetScale: number,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    // Dim the card slightly as it gets pushed back
    const overlayOpacity = useTransform(progress, range, [0, 0.6]);

    // Parallax image
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);

    const accent = project.accentColor === '#000000' ? 'var(--accent-action)' : project.accentColor;
    const formattedIndex = (i + 1).toString().padStart(2, '0');

    return (
        <div ref={cardRef} className="h-screen w-full flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(10vh + ${i * 25}px)`
                }}
                className="absolute w-[92vw] h-[80vh] md:w-[75vw] md:h-[75vh] flex flex-col-reverse md:flex-row bg-secondary-bg backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl origin-top border border-foreground/10 group transition-colors duration-500"
            >
                {/* Overlay for when it stacks behind */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-background z-50 pointer-events-none"
                />

                {/* Left/Foreground Content - 45% */}
                <div className="w-full h-1/2 md:h-full md:w-[45%] p-6 md:p-12 flex flex-col justify-end md:justify-center relative z-10 bg-transparent">

                    {/* Background Watermark Index */}
                    <div className="absolute top-4 left-4 md:-top-10 md:-left-10 text-[8rem] md:text-[14rem] lg:text-[18rem] font-black text-foreground/[0.03] select-none pointer-events-none leading-none z-0 transition-colors">
                        {formattedIndex}
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-center">
                        {/* Header Area */}
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span
                                className="w-8 h-[2px] rounded-full"
                                style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}80` }}
                            />
                            <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-mono font-medium text-foreground/80 border border-foreground/10 backdrop-blur-md">
                                {project.category}
                            </span>
                        </div>

                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-3 tracking-tight drop-shadow-sm">
                            {project.title}
                        </h3>
                        <p className="text-sm md:text-base font-mono text-foreground/50 mb-6 uppercase tracking-widest">
                            {project.subtitle}
                        </p>

                        <p className="text-foreground/70 text-base md:text-lg mb-8 line-clamp-3 md:line-clamp-none leading-relaxed">
                            {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-8 flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                                <span key={tech} className="rounded-full bg-foreground/5 border border-foreground/10 px-3 py-1.5 text-xs font-mono text-foreground/80 transition-all hover:bg-foreground/10 cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4 mt-auto md:mt-0">
                            {project.liveLink && (
                                <Link href={project.liveLink} target="_blank" className="group/btn flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 font-bold text-background transition-all hover:scale-105 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/30 pointer-events-auto">
                                    <span>Visit Live</span>
                                    <OpenNewWindow className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" width={18} height={18} />
                                </Link>
                            )}
                            {project.githubLink && (
                                <Link href={project.githubLink} target="_blank" className="flex items-center justify-center p-3.5 rounded-full bg-foreground/5 text-foreground border border-foreground/10 transition-all hover:bg-foreground/10 hover:scale-105 pointer-events-auto">
                                    <Github width={22} height={22} />
                                </Link>
                            )}
                            {project.apkLink && project.apkLink !== '#' && (
                                <Link href={project.apkLink} target="_blank" className="flex items-center justify-center p-3.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 transition-all hover:bg-emerald-500/20 hover:scale-105 pointer-events-auto">
                                    <Download width={22} height={22} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right/Background Image - 55% Inset */}
                <div className="relative w-full h-1/2 md:h-full md:w-[55%] p-4 md:p-6 lg:p-8 z-0 flex items-center justify-center">
                    {/* Glowing shadow behind the image frame */}
                    <div
                        className="absolute inset-12 md:inset-20 rounded-full blur-[80px] opacity-20 transition-opacity duration-700 group-hover:opacity-40"
                        style={{ backgroundColor: accent }}
                    />

                    <motion.div
                        style={{ scale: imageScale, y: imageY }}
                        className="w-full h-full relative flex items-center justify-center pointer-events-none"
                    >
                        {/* Desktop Mockup (Background Layer) */}
                        <div 
                            className={`absolute ${project.mobileImage ? 'top-[8%] md:top-[12%] -right-[15%] md:-right-[5%] w-[110%] h-[75%] md:w-[100%] md:h-[70%]' : 'w-full h-[85%] max-h-[600px]'} rounded-xl border border-foreground/20 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] origin-center z-10 overflow-hidden group-hover:scale-[1.02]`}
                            style={project.mobileImage ? { transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)' } : {}}
                        >
                            {/* Browser Chrome */}
                            <div className="h-8 md:h-10 w-full bg-foreground/5 border-b border-foreground/10 flex items-center px-4 gap-2 shrink-0 backdrop-blur-md relative z-20">
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80 shadow-sm" />
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80 shadow-sm" />
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80 shadow-sm" />
                                <div className="mx-auto h-4 w-1/3 rounded bg-foreground/10 hidden md:block" />
                            </div>
                            
                            <div className="relative flex-1 bg-primary-bg overflow-hidden group/desktop">
                                <Image 
                                    src={project.coverImage} 
                                    alt={`${project.title} Desktop Interface`} 
                                    fill 
                                    className="object-cover object-top transition-transform duration-[1.5s] group-hover/desktop:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 55vw"
                                />
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Mobile Mockup (Foreground Layer) */}
                        {project.mobileImage && (
                            <div 
                                className="absolute bottom-[2%] md:bottom-[5%] left-[2%] md:left-[5%] w-[32%] md:w-[30%] lg:w-[26%] h-[60%] md:h-[65%] max-h-[500px] pointer-events-auto transition-all duration-700 group-hover:scale-[1.08] group-hover:-translate-y-4 origin-bottom-left z-20"
                                style={{ transform: 'perspective(1000px) rotateY(6deg) rotateX(2deg) rotateZ(-1deg)' }}
                            >
                                {/* Hardware Buttons (Placed outside the frame) */}
                                <div className="absolute top-12 md:top-16 -left-[2px] md:-left-[3px] w-[2px] md:w-[3px] h-6 md:h-8 bg-foreground/20 rounded-l-md z-10" />
                                <div className="absolute top-20 md:top-28 -left-[2px] md:-left-[3px] w-[2px] md:w-[3px] h-6 md:h-8 bg-foreground/20 rounded-l-md z-10" />
                                <div className="absolute top-16 md:top-24 -right-[2px] md:-right-[3px] w-[2px] md:w-[3px] h-10 md:h-12 bg-foreground/20 rounded-r-md z-10" />

                                {/* Actual Phone Frame (With Overflow Hidden) */}
                                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-foreground/20 bg-background shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
                                    <div className="relative w-full h-full bg-primary-bg overflow-hidden group/mobile">
                                        <Image 
                                            src={project.mobileImage} 
                                            alt={`${project.title} Mobile Interface`} 
                                            fill 
                                            className="object-cover transition-transform duration-[1.5s] group-hover/mobile:scale-[1.05]"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

const FinaleCard = ({
    i,
    progress,
    range
}: {
    i: number,
    progress: MotionValue<number>,
    range: number[]
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Minor scale effect to follow the deck structure, though it's the last card
    const scale = useTransform(progress, range, [1, 1]); // stays 1

    return (
        <div ref={cardRef} className="h-screen w-full flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(10vh + ${i * 25}px)`
                }}
                className="absolute w-[92vw] h-[80vh] md:w-[75vw] md:h-[75vh] flex flex-col items-center justify-center bg-secondary-bg backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl origin-top border border-foreground/10 text-center p-6 md:p-12 group transition-colors duration-500"
            >
                {/* Internal Inset Frame */}
                <div className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl md:rounded-[2rem] overflow-hidden border border-foreground/5 bg-primary-bg/50 px-4">

                    {/* Animated glow background inside the frame */}
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,var(--accent-action)_360deg)] blur-[100px]" />
                    </div>

                    <LayoutLeft className="mb-8 h-20 w-20 md:h-24 md:w-24 text-accent-action relative z-10 opacity-80 transition-transform duration-700 group-hover:scale-110" />

                    <h3 className="mb-4 text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground relative z-10 tracking-tight">
                        Explore the <span className="text-accent-action italic">Archives</span>
                    </h3>

                    <p className="mb-10 md:mb-12 max-w-lg text-base md:text-lg text-foreground/60 relative z-10 font-light leading-relaxed">
                        Dive deeper into 20+ more full-stack projects, experimental UI designs, and open‑source contributions.
                    </p>

                    <Link href="/projects" className="relative z-10 group/btn flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-bold text-background transition-all hover:scale-105 hover:shadow-xl hover:shadow-foreground/30 pointer-events-auto">
                        <span>View All Projects</span>
                        <ArrowRight className="transition-transform group-hover/btn:translate-x-1" width={20} height={20} />
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default Projects;