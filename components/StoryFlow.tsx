'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const storyChapters = [
    {
        title: "The Foundation",
        subtitle: "BCA Graduate",
        description: "During my BCA at Lachoo Memorial College, I delved deep into the fundamentals. This is where I built my logical core and embraced the rigor of computer science.",
        year: "2023-26",
        color: "#E1C17A" // gold-primary
    },
    {
        title: "The Real World",
        subtitle: "4 Months at Fudode",
        description: "Stepping into professional development as a Full-stack Developer at Fudode, I bridged the gap between theory and industry-grade solutions, architecting full-stack applications.",
        year: "Jan '26 - May '26",
        color: "#B8C1CC" // silver
    },
    {
        title: "The Evolution",
        subtitle: "Freelance & MCA",
        description: "Currently pursuing an MCA in Cloud Computing at JECRC University, Jaipur. I am now engineering high-performance SaaS solutions and cinematic user interfaces as a Freelance Developer.",
        year: "2026 - Ongoing",
        color: "#A8791D" // gold-dark
    }
];

const StoryFlow = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const chapters = gsap.utils.toArray('.story-chapter') as HTMLElement[];
            const total = chapters.length;

            // Horizontal scroll tween
            const scrollTween = gsap.to(chapters, {
                xPercent: -100 * (total - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1.2,
                    snap: 1 / (total - 1),
                    end: () => "+=" + containerRef.current?.offsetWidth,
                    onUpdate: (self) => {
                        // Update progress dots
                        const progress = self.progress * (total - 1);
                        const index = Math.round(progress);
                        const dots = document.querySelectorAll('.progress-dot');
                        dots.forEach((dot, i) => {
                            const bar = dot.querySelector('.progress-bar');
                            if (i < index) {
                                gsap.to(bar, { width: '100%', duration: 0.3 });
                            } else if (i === index) {
                                const fraction = progress - Math.floor(progress);
                                gsap.to(bar, { width: fraction * 100 + '%', duration: 0.3 });
                            } else {
                                gsap.to(bar, { width: '0%', duration: 0.3 });
                            }
                        });
                    }
                }
            });

            // Parallax for each chapter content
            chapters.forEach((chapter, i) => {
                const textBlock = chapter.querySelector('.text-block');
                const cardBlock = chapter.querySelector('.card-block');
                gsap.fromTo(textBlock,
                    { x: -50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: chapter,
                            containerAnimation: scrollTween,
                            start: "left center",
                            end: "center center",
                            scrub: 0.5
                        }
                    }
                );
                gsap.fromTo(cardBlock,
                    { x: 50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: chapter,
                            containerAnimation: scrollTween,
                            start: "left center",
                            end: "center center",
                            scrub: 0.5
                        }
                    }
                );
            });

            // Floating shapes animation
            gsap.to('.float-shape', {
                y: 'random(-20, 20)',
                x: 'random(-20, 20)',
                rotation: 'random(-10, 10)',
                duration: 'random(6, 12)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: { amount: 2, from: 'random' }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-background py-20 px-6 sm:px-12"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)]/30 to-transparent" />
                <div className="float-shape absolute top-[10%] left-[5%] w-20 h-20 border border-[var(--gold-primary)]/20 rotate-12" />
                <div className="float-shape absolute bottom-[15%] right-[5%] w-32 h-32 border border-[var(--gold-light)]/10 rotate-45" />
                <div className="float-shape absolute top-[30%] right-[10%] w-12 h-12 rotate-45 border-2 border-[var(--gold-dark)]/20" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center justify-center mb-16 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--gold-primary)] mb-4"
                >
                    The Narrative
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold font-display"
                >
                    Developer <span className="text-[var(--gold-primary)] italic">Arc</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-foreground/40 max-w-md"
                >
                    A timeline of growth, from student to creator.
                </motion.p>
            </div>

            {/* Scrollable story container */}
            <div className="relative w-full h-[70vh] flex items-center">
                <div ref={storyRef} className="flex flex-nowrap h-full">
                    {storyChapters.map((chapter, index) => (
                        <div
                            key={index}
                            className="story-chapter flex-shrink-0 w-full flex items-center justify-center px-4"
                        >
                            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                {/* Left: Title & year */}
                                <div className="text-block space-y-6">
                                    <div
                                        className="inline-block px-4 py-1.5 border text-sm font-bold tracking-widest uppercase"
                                        style={{
                                            borderColor: chapter.color + '40',
                                            backgroundColor: chapter.color + '10',
                                            color: chapter.color
                                        }}
                                    >
                                        {chapter.year}
                                    </div>
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter">
                                        {chapter.title}
                                    </h3>
                                    <p className="text-xl text-text-secondary font-light italic">
                                        {chapter.subtitle}
                                    </p>
                                    {/* Timeline connector line */}
                                    <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-[var(--gold-dark)] to-transparent" />
                                </div>

                                {/* Right: Description card with metallic effect */}
                                <div
                                    className="card-block card-metallic p-8 md:p-10"
                                    style={{
                                        borderTopColor: chapter.color
                                    }}
                                >
                                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-sans">
                                        {chapter.description}
                                    </p>
                                    {/* Decorative accent line */}
                                    <div
                                        className="mt-6 h-1 w-12"
                                        style={{ backgroundColor: chapter.color }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress bars */}
            <div className="flex justify-center mt-8 gap-3">
                {storyChapters.map((chapter, i) => (
                    <div key={i} className="progress-dot w-16 h-1 bg-foreground/10 overflow-hidden">
                        <div
                            className="progress-bar h-full w-0 transition-all"
                            style={{ backgroundColor: chapter.color }}
                        />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/10 to-transparent" />
        </section>
    );
};

export default StoryFlow;