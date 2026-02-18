'use client';

import React, { useRef } from 'react';
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform
} from 'framer-motion';
import {
    Cpu,
    Zap,
    Globe,
    Layers,
    Activity,
    ArrowUpRight,
    Terminal
} from 'lucide-react';

// --- Tilt Card Component ---
const TiltCard = ({
    children,
    className,
    classNameContent
}: {
    children: React.ReactNode,
    className?: string,
    classNameContent?: string
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`relative rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md group/card ${className}`}
        >
            {/* Spotlight Effect */}
            <motion.div
                style={{
                    transformStyle: "preserve-3d",
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseXSpring.get() * 100 + 50}% ${mouseYSpring.get() * 100 + 50}%,
                            rgba(var(--accent-action-rgb), 0.1),
                            transparent 80%
                        )
                    `,
                }}
                className="absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover/card:opacity-100 pointer-events-none"
            />

            {/* Inner Content with Z-Index for 3D feel */}
            <div
                style={{ transform: "translateZ(30px)" }}
                className={`relative h-full p-8 ${classNameContent}`}
            >
                {children}
            </div>
        </motion.div>
    );
};

// --- Helper Components ---
const CardHeader = ({ title, icon: Icon, action }: { title: string, icon?: any, action?: boolean }) => (
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover/card:border-accent-action/20 group-hover/card:bg-accent-action/10 transition-colors">
                {Icon && <Icon size={16} className="text-zinc-400 group-hover/card:text-accent-action transition-colors" />}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover/card:text-white transition-colors">
                {title}
            </span>
        </div>
        {action && (
            <ArrowUpRight size={16} className="text-zinc-600 group-hover/card:text-white transition-colors" />
        )}
    </div>
);

const CognitionGrid = () => {
    return (
        <section className="py-32 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* 1. Philosophy - Main Feature */}
                    <div className="md:col-span-4 lg:col-span-2 lg:row-span-2 perspective-1000">
                        <TiltCard className="h-full" classNameContent="flex flex-col justify-between">
                            <CardHeader title="Philosophy" icon={Terminal} />
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-5xl font-display font-medium leading-[1.1] text-white">
                                    Simplicity is the <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight">
                                        Ultimate Sophistication
                                    </span>
                                </h2>
                                <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                                    I craft digital experiences where every interaction feels inevitable. Merging clean code with fluid design.
                                </p>
                            </div>
                            <div className="mt-8 flex gap-3">
                                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-gradient-to-r from-accent-action to-accent-highlight rounded-full" />
                                </div>
                            </div>
                        </TiltCard>
                    </div>

                    {/* 2. Availability */}
                    <div className="md:col-span-2 lg:col-span-1 perspective-1000">
                        <TiltCard className="h-full" classNameContent="flex flex-col">
                            <CardHeader title="Status" icon={Activity} />
                            <div className="flex-1 flex flex-col justify-center items-center">
                                <div className="relative">
                                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-pulse" />
                                    <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-20" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-white">Available</h3>
                                <p className="text-sm text-zinc-500 mt-1">for new projects</p>
                            </div>
                        </TiltCard>
                    </div>

                    {/* 3. Global Reach */}
                    <div className="md:col-span-2 lg:col-span-1 perspective-1000">
                        <TiltCard className="h-full overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 pointer-events-none">
                                <Globe strokeWidth={0.5} className="w-full h-full text-white animate-[spin_60s_linear_infinite]" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <CardHeader title="Reach" icon={Globe} />
                                <div>
                                    <h3 className="text-3xl font-bold text-white">Global</h3>
                                    <p className="text-sm text-zinc-400 mt-1">Remote Capable</p>
                                </div>
                            </div>
                        </TiltCard>
                    </div>

                    {/* 4. Tech Stack */}
                    <div className="md:col-span-2 lg:col-span-1 perspective-1000">
                        <TiltCard className="h-full">
                            <CardHeader title="Stack" icon={Layers} />
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Next.js', 'Node', 'AWS', 'TS', 'Tailwind'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </TiltCard>
                    </div>

                    {/* 5. Metrics */}
                    <div className="md:col-span-2 lg:col-span-1 perspective-1000">
                        <TiltCard className="h-full">
                            <CardHeader title="Impact" icon={Zap} />
                            <div className="flex flex-col justify-end h-full pb-2">
                                <span className="text-6xl font-display font-bold text-white tracking-tighter">
                                    15<span className="text-accent-action text-4xl align-top">+</span>
                                </span>
                                <span className="text-sm text-zinc-500 font-medium">Projects Shipped</span>
                            </div>
                        </TiltCard>
                    </div>

                    {/* 6. System Architecture */}
                    <div className="md:col-span-2 lg:col-span-2 perspective-1000">
                        <TiltCard className="h-full bg-gradient-to-br from-zinc-900 to-black">
                            <div className="h-full flex flex-col justify-between">
                                <CardHeader title="Architecture" icon={Cpu} action />
                                <div className="space-y-4">
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        "Scalability is built, not added."
                                    </p>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="h-12 flex-1 bg-white/5 rounded-lg border border-white/5 overflow-hidden group/bar"
                                            >
                                                <div className="h-full w-full bg-accent-action/20 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500" style={{ transitionDelay: `${i * 100}ms` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CognitionGrid;
