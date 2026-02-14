'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Layers, Layout, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// --- Project Data ---
const projects = [
    {
        "id": "feat-1",
        "title": "Ekovym",
        "subtitle": "Developer Productivity Suite",
        "description": "A developer-focused platform designed to streamline workflows with a strong emphasis on modern UI/UX and collaborative modules.",
        "techStack": ["React.js", "TailwindCSS", "Node.js", "MongoDB"],
        "category": "Fullstack",
        "status": "In Progress",
        "accentColor": "#8A2BE2",
        "parallaxStrength": 0.15,
        "githubLink": "https://github.com/mohitlakhara-ind/ekovym",
        "liveLink": "",
        "coverImage": "https://raw.githubusercontent.com/mohitlakhara-ind/ekovym/refs/heads/master/ekovym-test-assets/ss07.png",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-2",
        "title": "NoteNow",
        "subtitle": "Cloud-Synced Markdown Editor",
        "description": "A minimal, intuitive note-taking app featuring real-time synchronization, Firebase integration, and PWA capabilities.",
        "techStack": ["React.js", "Firebase", "Markdown", "PWA"],
        "category": "Productivity",
        "status": "Active",
        "accentColor": "#FF00FF",
        "parallaxStrength": 0.25,
        "githubLink": "https://github.com/mohitlakhara-ind/notes-app",
        "liveLink": "https://notemenow.vercel.app",
        "coverImage": "https://raw.githubusercontent.com/mohitlakhara-ind/notes-app/main/ss1.png",
        "mockupType": "Mobile Focused"
    },
    {
        "id": "feat-3",
        "title": "SnapNews",
        "subtitle": "Real-time Intelligence Feed",
        "description": "Delivering headlines via NewsAPI with advanced filtering, lazy loading, and custom-built responsive UI components.",
        "techStack": ["React.js", "NewsAPI", "CSS3", "JavaScript"],
        "category": "API Integration",
        "status": "Completed",
        "accentColor": "#00FF41",
        "parallaxStrength": 0.1,
        "githubLink": "https://github.com/mohitlakhara-ind/Snap_News",
        "liveLink": "",
        "coverImage": "https://raw.githubusercontent.com/mohitlakhara-ind/Snap_News/refs/heads/main/Screenshots/main_genral.png",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-4",
        "title": "TxtXpert",
        "subtitle": "Comprehensive Text Tool",
        "description": "A versatile text transformation engine for manipulation, extraction, and analysis with a focus on real-time performance.",
        "techStack": ["React.js", "Bootstrap", "JavaScript"],
        "category": "Utility",
        "status": "Active",
        "accentColor": "#007BFF",
        "parallaxStrength": 0.2,
        "githubLink": "https://github.com/mohitlakhara-ind/Txt-Xpert/",
        "liveLink": "https://codepen.io/mohitlakhara-ind/full/mdNjKee",
        "coverImage": "https://raw.githubusercontent.com/mohitlakhara-ind/Txt-Xpert/refs/heads/main/TxtXpert%20(3).png",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-5",
        "title": "CarBook",
        "subtitle": "Premium Car Rental UI",
        "description": "A comprehensive rental experience template with payment gateway simulation and a dynamic booking system.",
        "techStack": ["HTML5", "SCSS", "JavaScript", "UI/UX"],
        "category": "Frontend Template",
        "status": "Active",
        "accentColor": "#FFD700",
        "parallaxStrength": 0.3,
        "githubLink": "https://github.com/mohitlakhara-ind/CarBook",
        "liveLink": "https://mohitlakhara-ind.github.io/CarBook/",
        "coverImage": "https://raw.githubusercontent.com/mohitlakhara-ind/CarBook/refs/heads/main/images/CarSS%20(5).jpeg",
        "mockupType": "Desktop"
    }
];

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0); // Default to 0 so we always have a color

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        if (!section || !container) return;

        const ctx = gsap.context(() => {
            // Setup Horizontal Scroll
            const scrollTween = gsap.to(container, {
                x: () => -(container.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${container.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // --- Card Enhancements (Parallax & Focus) ---
            const cards = gsap.utils.toArray<HTMLElement>('.project-card');

            cards.forEach((card, i) => {
                // 1. Zoom/Desaturate effect based on center position
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: "center right",  // specific breakpoints can be adjusted
                        end: "center left",
                        horizontal: true,       // Important for containerAnimation
                        scrub: true,
                        onUpdate: (self) => {
                            // Calculate distance from center (0 to 1, where 0.5 is center)
                            // We can use self.progress to determine relative position
                            // But cleaner visual is often just tracking proximity to center

                            // Let's rely on a simpler 'toggle' or 'class' switch for the "Active" state visual
                            // or use the progress to drive a blur.

                            // progress 0 = entering from right
                            // progress 0.5 = center
                            // progress 1 = exiting left

                            const p = self.progress;
                            const distFromCenter = Math.abs(p - 0.5);

                            // Make the "sweet spot" wider. 
                            // If within the middle 20% (dist < 0.1), keep it fully active.
                            // Dist ranges from 0 to 0.5.

                            let normalizedDist = 0;
                            if (distFromCenter > 0.1) {
                                normalizedDist = (distFromCenter - 0.1) / 0.4; // 0 to 1 range for the outer edges
                            }

                            // Visibility Fixes:
                            // 1. Scale: mildly reduce size for inactive (keep focus on center)
                            const scale = 1 - (normalizedDist * 0.15);

                            // 2. Opacity: Keep inactive cards much more visible (0.8 instead of lower)
                            const opacity = 1 - (normalizedDist * 0.2);

                            // 3. Grayscale: Reduce intensity so they aren't fully grey
                            const grayscale = normalizedDist * 50;

                            gsap.set(card, {
                                scale: scale,
                                filter: `grayscale(${grayscale}%)`,
                                opacity: opacity,
                                zIndex: distFromCenter < 0.1 ? 10 : 1
                            });

                            // Parallax for inner image
                            const image = card.querySelector('.parallax-image');
                            if (image) {
                                // Move background image slightly based on scroll
                                // "The background image of the project should move at a different speed"
                                // We use xPercent
                                const parallaxX = (p - 0.5) * 50; // Move +/- 25%
                                gsap.set(image, { xPercent: parallaxX });
                            }
                        },
                        onToggle: (self) => {
                            if (self.isActive) {
                                setActiveIndex(i);
                            }
                        }
                    }
                });
            });

            // Finale Card Animation
            const finale = container.querySelector('.finale-card');
            if (finale) {
                gsap.from(finale, {
                    scrollTrigger: {
                        trigger: finale,
                        containerAnimation: scrollTween,
                        start: "left right",
                        end: "center right",
                        scrub: true,
                    },
                    rotation: -10,
                    opacity: 0,
                    scale: 0.8,
                    ease: 'back.out'
                });
            }

            // Floating Shapes Animation
            // Animate blobs continuously
            gsap.to(".floating-shape", {
                y: "random(-50, 50)",
                x: "random(-30, 30)",
                rotation: "random(-45, 45)",
                duration: "random(10, 20)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                stagger: {
                    amount: 5,
                    from: "random"
                }
            });

            // 1. General Floating (Drift) - Faster & Wider
            gsap.to(".anim-float", {
                y: "random(-80, 80)",
                x: "random(-50, 50)",
                duration: "random(4, 7)", // Was 10-20, now much faster
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                stagger: { amount: 2, from: "random" }
            });

            // 2. Continuous Rotation (Spin) - Faster
            gsap.to(".anim-spin", {
                rotation: 360,
                duration: "random(10, 20)", // Was 20-40
                ease: "none",
                repeat: -1,
            });

            // 3. Pulsing Scale - Snappier
            gsap.to(".anim-pulse", {
                scale: 1.3,
                opacity: 0.7,
                duration: "random(2, 4)", // Was 3-6
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                stagger: { amount: 1, from: "random" }
            });

            // 4. Sideways Wave Motion - Broader
            gsap.to(".anim-wave", {
                x: 100, // Was 50
                duration: "random(3, 6)", // Was 5-10
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });

            {/* Floating SVGs Animation */ }
            gsap.to(".floating-svg", {
                y: "random(-40, 40)",
                x: "random(-20, 20)",
                rotation: "random(0, 360)",
                duration: "random(10, 25)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                stagger: {
                    amount: 3,
                    from: "random"
                }
            });

        }, section);

        return () => ctx.revert();
    }, []);

    // Effect to update background color when activeIndex changes
    useEffect(() => {
        // Animate floating shapes color
        const color = projects[activeIndex]?.accentColor || '#8A2BE2';

        gsap.to(".floating-shape", {
            backgroundColor: color,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Animate SVG elements fill/stroke
        gsap.to(".floating-svg", {
            stroke: color,
            duration: 1.5,
            ease: "power2.inOut"
        });

    }, [activeIndex]);

    return (
        <section id="projects" ref={sectionRef} className="h-screen w-full relative overflow-hidden bg-background projects-section">
            <div className="absolute inset-0 z-10 pointer-events-none" />

            {/* Floating Geometric Shapes & SVGs - Positioned in "Empty Space" (Top/Bottom/Corners) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Blobs - Push to far corners */}
                <div className="floating-shape absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
                <div className="floating-shape absolute top-[20%] right-[-20%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-15" />
                <div className="floating-shape absolute bottom-[-20%] left-[20%] w-[600px] h-[400px] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />

                {/* SVG Elements - Variety - Evacuate Center Band (30vh-70vh) */}
                {/* Circles - Float - Top Left Corner */}
                <svg className="floating-svg anim-float absolute top-[5%] left-[5%] w-16 h-16 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                </svg>

                {/* Squares - Spin - Bottom Left */}
                <svg className="floating-svg anim-spin absolute bottom-[10%] left-[5%] w-20 h-20 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                </svg>

                {/* Triangle - Pulse - Bottom Right */}
                <svg className="floating-svg anim-pulse absolute bottom-[15%] right-[10%] w-24 h-24 opacity-15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 22h20L12 2z" />
                </svg>

                {/* Cross/Lines - Wave - Top Right */}
                <svg className="floating-svg anim-wave absolute top-[10%] right-[15%] w-16 h-16 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>

                {/* Hexagon - Spin Reverse - Top Center-ish (Above cards) */}
                <svg className="floating-svg anim-spin absolute top-[8%] left-[45%] w-24 h-24 opacity-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
                </svg>

                {/* Plus Signs - Random scatter - Far edges */}
                <svg className="floating-svg anim-pulse absolute top-[25%] right-[5%] w-10 h-10 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 5v14M5 12h14" />
                </svg>
                <svg className="floating-svg anim-float absolute bottom-[5%] left-[40%] w-8 h-8 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 5v14M5 12h14" />
                </svg>

                {/* Zigzag - Wave - Mid Left (Before cards start) */}
                <svg className="floating-svg anim-wave absolute top-[40%] left-[2%] w-20 h-10 opacity-25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
            </div>

            {/* Static Ambient Highlight (keeping original but reduced) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-accent-highlight/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Horizontal Container */}
            <div ref={containerRef} className="flex h-full items-center pl-10 md:pl-32 pr-20 gap-4 md:gap-12 w-[max-content] py-10">

                {/* Intro Title Block */}
                <div className="w-[80vw] md:w-[30vw] h-[60vh] flex-shrink-0 flex flex-col justify-center items-start z-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-bg border border-border text-xs font-mono mb-6">
                        <span className="w-2 h-2 rounded-full bg-accent-action animate-pulse" />
                        FEATURED WORKS
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-6">
                        Selected <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight">Projects</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-sm leading-relaxed">
                        A journey through my most impactful work. Scroll to explore the universe of code.
                    </p>
                    <div className="mt-12 flex items-center gap-4 text-accent-highlight">
                        <ArrowRight className="animate-bounce-right" size={32} />
                        <span className="text-sm font-mono tracking-widest uppercase">Start Scrolling</span>
                    </div>
                </div>

                {/* Project Cards */}
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`project-card relative w-[85vw] md:w-[60vw] h-[50vh] md:h-[70vh] flex-shrink-0 rounded-3xl overflow-hidden border border-border/50 bg-secondary-bg shadow-2xl transition-shadow duration-500`}
                        style={{
                            boxShadow: activeIndex === index ? `0 0 60px ${project.accentColor}20` : 'none'
                        }}
                    >
                        {/* Image Background with Parallax */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="parallax-image relative w-[120%] h-full left-[-10%]">
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                                {/* Fixed darker overlay for better text visibility */}
                                <div className="absolute inset-0 bg-black/80" />
                            </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20">
                            {/* Floating Tags */}
                            <div className="absolute top-8 right-8 flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                                    {project.category}
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full backdrop-blur-md border border-white/10 text-xs font-medium text-black"
                                    style={{ backgroundColor: project.accentColor }}
                                >
                                    {project.status}
                                </span>
                            </div>

                            <div className="transform transition-transform duration-500 group-hover:translate-y-0">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-xl text-white/80 font-light mb-6">{project.subtitle}</p>

                                <p className="text-base text-gray-300 max-w-lg mb-8 line-clamp-3 md:line-clamp-none">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-8 text-gray-400">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="text-sm font-mono bg-white/5 px-2 py-1 rounded border border-white/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4">
                                    {project.githubLink && (
                                        <Link href={project.githubLink} target="_blank" className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors text-white">
                                            <Github size={20} />
                                        </Link>
                                    )}
                                    {project.liveLink && (
                                        <Link href={project.liveLink} target="_blank" className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                            Visit Site <ExternalLink size={16} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Final "View All" Card */}
                <div className="finale-card w-[85vw] md:w-[40vw] h-[50vh] md:h-[60vh] flex-shrink-0 relative group cursor-pointer overflow-hidden rounded-3xl border border-accent-highlight/30 bg-black flex items-center justify-center">

                    {/* Animated Vortex Background (CSS/SVG) */}
                    <div className="absolute inset-0 opacity-50">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,var(--color-accent-action)_360deg)] animate-[spin_4s_linear_infinite] blur-[100px]" />
                    </div>

                    <div className="relative z-10 text-center p-8 bg-background/30 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-accent-highlight/50 transition-colors duration-300">
                        <Layout className="w-16 h-16 mx-auto mb-6 text-accent-highlight" />
                        <h3 className="text-3xl font-bold text-white mb-2">Explore the Archives</h3>
                        <p className="text-gray-400 mb-6 max-w-xs mx-auto">
                            Dive deeper into 20+ more projects, experiments, and open-source contributions.
                        </p>
                        <button className="px-8 py-3 rounded-full bg-accent-action text-white font-bold hover:bg-accent-action/80 transition-all flex items-center justify-center gap-2 mx-auto">
                            View All Projects <ArrowRight size={18} />
                        </button>
                    </div>

                </div>

                {/* Spacer at the end */}
                <div className="w-[10vw] flex-shrink-0" />

            </div>
        </section>
    );
};

export default Projects;
