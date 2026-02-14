'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Award, Code, Globe, Zap, Briefcase } from 'lucide-react';

const timelineData = [
    {
        id: 1,
        date: 'Jan 2023',
        title: 'BCA - Computer Science',
        subtitle: 'Lachoo Memorial College',
        description: 'Building a strong foundation in software engineering, algorithms, and system design. My academic journey is fueled by a passion for solving complex problems with code.',
        icon: <Code size={16} />,
        color: 'text-accent-action',
        borderColor: 'border-accent-action',
        bgColor: 'bg-accent-action',
        details: [
            { label: 'Degree', value: 'BCA' },
            { label: 'Focus', value: 'Software Engineering' }
        ]
    },
    {
        id: 2,
        date: 'Oct 2024',
        title: 'Frontend Developer Intern',
        subtitle: 'TheWebsite Makers',
        description: 'Gained hands-on experience in building responsive, user-centric web interfaces. Collaborated with senior developers to implement pixel-perfect designs using React and Tailwind CSS.',
        icon: <Globe size={16} />,
        color: 'text-accent-highlight',
        borderColor: 'border-accent-highlight',
        bgColor: 'bg-accent-highlight',
        details: [
            { label: 'Key Tech', value: 'React, Tailwind' },
            { label: 'Role', value: 'Frontend Intern' }
        ]
    },
    {
        id: 3,
        date: '2025',
        title: 'Freelance Developer',
        subtitle: 'Various Clients',
        description: 'Delivered 4-5 high-impact projects across web and mobile platforms. Specialized in creating custom solutions tailored to client needs, ensuring scalable and performant architecture.',
        icon: <Briefcase size={16} />,
        color: 'text-accent-action',
        borderColor: 'border-accent-action',
        bgColor: 'bg-accent-action',
        details: [
            { label: 'Projects', value: '4-5 Delivered' },
            { label: 'Stack', value: 'Web & App' }
        ]
    },
    {
        id: 4,
        date: 'Jan 2026',
        title: 'Full Stack Developer',
        subtitle: 'Fudode',
        description: 'Currently architecting scalable full-stack applications. Responsible for the entire development lifecycle, from database design to frontend implementation and deployment.',
        icon: <Zap size={16} />,
        color: 'text-accent-highlight',
        borderColor: 'border-accent-highlight',
        bgColor: 'bg-accent-highlight',
        details: [
            { label: 'Role', value: 'Full Stack Dev' },
            { label: 'Stack', value: 'MERN, Next.js, React Native' }
        ]
    }
];

const ResumePulse = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" ref={containerRef} className="relative w-full py-32 px-6 bg-background text-foreground overflow-hidden transition-colors duration-300">
            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-sm font-medium text-accent-highlight tracking-wider uppercase mb-2">My Journey</h2>
                    <h3 className="text-3xl md:text-5xl font-bold font-display">Resume Pulse</h3>
                </motion.div>

                <div className="relative w-full max-w-2xl min-h-[800px] flex justify-center">

                    {/* The Rail */}
                    <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 w-0.5 bg-border -translate-x-1/2" />

                    {/* The Spark (Scroll-driven Line) */}
                    <motion.div
                        className="absolute top-0 bottom-0 left-[24px] md:left-1/2 w-0.5 bg-gradient-to-b from-accent-action via-accent-highlight to-accent-action -translate-x-1/2 origin-top"
                        style={{ scaleY: scaleY }}
                    >
                        {/* The Spark Head */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_4px_rgba(0,240,255,0.8)] z-20">
                            <div className="absolute inset-0 bg-white blur-sm rounded-full animate-pulse" />
                        </div>
                    </motion.div>

                    {/* Timeline Nodes */}
                    <div className="w-full flex flex-col justify-between py-10 gap-32">
                        {timelineData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={item.id}
                                    className={`relative flex items-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} pl-16 md:pl-0`}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >

                                    {/* The Node Point on the Line */}
                                    <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-30">
                                        <motion.div
                                            className={`w-4 h-4 rounded-full border-2 ${item.borderColor} bg-background transition-colors duration-300`}
                                            animate={{
                                                backgroundColor: hoveredId === item.id ? 'var(--color-accent-action)' : 'var(--color-background)',
                                                scale: hoveredId === item.id ? 1.5 : 1
                                            }}
                                        >
                                            {hoveredId === item.id && (
                                                <motion.div
                                                    layoutId="pulse-ring"
                                                    className={`absolute inset-0 -m-2 rounded-full border ${item.borderColor} opacity-50`}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`w-full md:w-[calc(50%-40px)] ${isEven ? 'text-left md:text-right' : 'text-left'}`}
                                    >
                                        <div className={`text-sm font-mono mb-1 ${item.color}`}>{item.date}</div>
                                        <h4 className="text-2xl font-bold text-foreground mb-2">{item.title}</h4>
                                        <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-sm ml-0 md:ml-auto">
                                            {item.description}
                                        </p>

                                        {/* Tags / Details */}
                                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                                            {item.details.map((detail, i) => (
                                                <span key={i} className="px-3 py-1 text-[10px] rounded-full border border-border bg-secondary-bg text-text-secondary">
                                                    {detail.value}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Empty/Spacer for opposite side */}
                                    <div className="hidden md:block w-[calc(50%-40px)]" />

                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-action/5 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
};

export default ResumePulse;
