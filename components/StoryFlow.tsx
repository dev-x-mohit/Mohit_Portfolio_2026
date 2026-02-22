'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const storyChapters = [
    {
        title: "The Discovery",
        subtitle: "How it all began",
        description: "My fascination with technology wasn't just about curiosity—it was about creation. It started with simple lines of code that turned into worlds of possibility.",
        year: "2020"
    },
    {
        title: "The Foundation",
        subtitle: "Lachoo Memorial College",
        description: "Pursuing my BCA, I delved deep into the fundamentals. This is where I built my logical core and embraced the rigor of computer science.",
        year: "2021-24"
    },
    {
        title: "The Real World",
        subtitle: "Impact at Fudode",
        description: "Stepping into professional development at Fudode, I bridged the gap between theory and industry-grade solutions. Transforming complex requirements into fluid user experiences.",
        year: "Current"
    },
    {
        title: "The Evolution",
        subtitle: "Beyond the Screen",
        description: "Now, I focus on the intersection of AI, immersive interfaces, and scalable architectures. I don't just write code; I design digital legacies.",
        year: "Future"
    }
];

const StoryFlow = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const chapters = gsap.utils.toArray('.story-chapter');

            gsap.to(chapters, {
                xPercent: -100 * (chapters.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (chapters.length - 1),
                    end: () => "+=" + containerRef.current?.offsetWidth
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-background py-20 px-6 sm:px-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-action to-transparent opacity-20" />

            <div className="flex flex-col items-center justify-center mb-20 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold uppercase tracking-[0.4em] text-accent-action mb-4"
                >
                    The Narrative
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold font-display"
                >
                    Developer <span className="text-accent-action italic">Arc</span>
                </motion.h2>
            </div>

            <div className="relative w-full h-[60vh] flex items-center">
                <div ref={storyRef} className="flex flex-nowrap h-full">
                    {storyChapters.map((chapter, index) => (
                        <div key={index} className="story-chapter flex-shrink-0 w-full flex items-center justify-center px-4">
                            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="inline-block px-4 py-1 rounded-full border border-accent-action/30 bg-accent-action/10 text-accent-action text-sm font-bold">
                                        {chapter.year}
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-tighter">
                                        {chapter.title}
                                    </h3>
                                    <p className="text-xl text-text-secondary font-light italic">
                                        {chapter.subtitle}
                                    </p>
                                </div>
                                <div className="p-8 rounded-3xl border border-border/10 bg-secondary-bg/50 backdrop-blur-xl">
                                    <p className="text-lg md:text-xl text-text-primary leading-relaxed font-sans">
                                        {chapter.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <div className="flex gap-4">
                    {storyChapters.map((_, i) => (
                        <div key={i} className="w-12 h-1 rounded-full bg-border/20 overflow-hidden">
                            <div className="h-full bg-accent-action w-0" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/10 to-transparent" />
        </section>
    );
};

export default StoryFlow;
