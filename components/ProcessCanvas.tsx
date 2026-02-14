import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, Lightbulb, Search, PenTool, Code2, Rocket } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stage {
    id: string;
    title: string;
    icon: LucideIcon;
    description: string;
    color: string;
}

const stages: Stage[] = [
    {
        id: 'ideate',
        title: 'Ideate',
        icon: Lightbulb,
        description: 'Transforming abstract concepts into concrete digital possibilities.',
        color: 'from-[var(--accent-action)]/20 to-transparent'
    },
    {
        id: 'research',
        title: 'Research',
        icon: Search,
        description: 'Analyzing patterns and architectures to find the optimal path.',
        color: 'from-[var(--accent-action)]/30 to-[var(--accent-highlight)]/10'
    },
    {
        id: 'design',
        title: 'Design',
        icon: PenTool,
        description: 'Sculpting invisible interfaces that feel like second nature.',
        color: 'from-[var(--accent-highlight)]/20 to-transparent'
    },
    {
        id: 'build',
        title: 'Build',
        icon: Code2,
        description: 'Writing high-performance, scalable code with surgical precision.',
        color: 'from-[var(--accent-action)] to-[var(--accent-highlight)]'
    },
    {
        id: 'launch',
        title: 'Launch',
        icon: Rocket,
        description: 'Deploying robust systems into the global digital ecosystem.',
        color: 'from-[var(--accent-highlight)] to-[var(--accent-action)]'
    }
];

const ProcessCanvas = () => {
    const [activeStage, setActiveStage] = useState(stages[0]);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "top top",
                end: `+=${stages.length * 100}%`,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const index = Math.min(
                        Math.floor(progress * stages.length),
                        stages.length - 1
                    );
                    setActiveStage(stages[index]);
                }
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="bg-black/50 backdrop-blur-sm relative overflow-hidden h-screen">
            <div className="container mx-auto h-full flex flex-col justify-center px-6">
                <div className="mb-12">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs font-bold uppercase tracking-[0.5em] text-[var(--accent-action)] block mb-4"
                    >
                        Methodology
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold"
                    >
                        The <span className="text-white">Process</span> Canvas
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Legend / Controls */}
                    <div className="space-y-4">
                        {stages.map((stage) => (
                            <motion.button
                                key={stage.id}
                                onClick={() => setActiveStage(stage)}
                                className={`w-full group relative flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 border overflow-hidden ${activeStage.id === stage.id
                                    ? 'bg-white/10 border-white/20'
                                    : 'bg-transparent border-white/5 hover:bg-white/[0.05]'
                                    }`}
                            >
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stage.color} group-hover:scale-110 transition-transform`}>
                                    <stage.icon size={24} className="text-white" />
                                </div>
                                <div className="text-left">
                                    <h3 className={`text-xl font-bold transition-colors ${activeStage.id === stage.id ? 'text-white' : 'text-gray-500'}`}>
                                        {stage.title}
                                    </h3>
                                    <p className={`text-sm transition-opacity duration-500 ${activeStage.id === stage.id ? 'opacity-100' : 'opacity-0'}`}>
                                        Active Protocol
                                    </p>
                                </div>

                                {activeStage.id === stage.id && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute right-6 w-2 h-2 rounded-full bg-white shadow-[0_0_15px_white]"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Interactive display */}
                    <div className="relative aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStage.id}
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative z-10 w-full max-w-lg p-12 rounded-[4rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl overflow-hidden group"
                            >
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeStage.color} opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity`} />

                                <activeStage.icon size={64} className="text-[var(--accent-action)] mb-8" />
                                <h4 className="text-4xl font-bold mb-6">{activeStage.title}</h4>
                                <p className="text-xl text-gray-400 font-light leading-relaxed">
                                    {activeStage.description}
                                </p>

                                <div className="mt-12 flex gap-4">
                                    <div className="h-1 w-24 bg-[var(--accent-action)]/10 rounded-full relative overflow-hidden">
                                        <motion.div
                                            initial={{ left: '-100%' }}
                                            animate={{ left: '0%' }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className={`absolute inset-0 bg-gradient-to-r ${activeStage.color}`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Background SVG Flow */}
                        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100">
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                d="M 10,50 Q 50,10 90,50 Q 50,90 10,50"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.2"
                                strokeDasharray="1 2"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-action)]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--accent-highlight)]/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default ProcessCanvas;
