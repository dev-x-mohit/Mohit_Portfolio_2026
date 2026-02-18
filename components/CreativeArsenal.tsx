'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, MotionValue } from 'framer-motion';
import {
    LucideIcon,
    Code2,
    Cpu,
    Database,
    Globe2,
    Layers,
    Layout,
    Smartphone,
    Zap,
    Settings,
    Box,
    Circle,
    Hexagon,
    Triangle
} from 'lucide-react';

const tools = [
    { icon: Code2, label: 'React' },
    { icon: Smartphone, label: 'React Native' },
    { icon: Layout, label: 'Next.js' },
    { icon: Database, label: 'Postgres' },
    { icon: Globe2, label: 'Web' },
    { icon: Layers, label: 'Fullstack' },
    { icon: Cpu, label: 'Performance' },
    { icon: Zap, label: 'Speed' },
    { icon: Settings, label: 'DevOps' },
    { icon: Box, label: 'Architecture' },
    { icon: Circle, label: 'Minimalism' },
    { icon: Hexagon, label: 'Structure' },
    { icon: Triangle, label: 'Scale' },
];

const MagneticIcon = ({ icon: Icon, label, mouseX, mouseY }: { icon: LucideIcon, label: string, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    React.useEffect(() => {
        const updatePosition = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = mouseX.get() - centerX;
            const distanceY = mouseY.get() - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            const radius = 250;
            if (distance < radius) {
                const power = (radius - distance) / radius;
                x.set(distanceX * power * 0.4);
                y.set(distanceY * power * 0.4);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        const unsubscribeX = mouseX.on("change", updatePosition);
        const unsubscribeY = mouseY.on("change", updatePosition);

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [mouseX, mouseY, x, y]);

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            className="group relative p-6 rounded-3xl bg-secondary-bg/30 border border-border/10 flex flex-col items-center justify-center gap-4 hover:bg-secondary-bg/50 hover:border-accent-action/50 transition-colors"
        >
            <Icon size={32} className="text-text-secondary group-hover:text-accent-action transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary group-hover:text-foreground transition-colors">{label}</span>
            <div className="absolute inset-0 bg-accent-action/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

const CreativeArsenal = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    return (
        <section className="py-32 px-6 relative overflow-hidden" onMouseMove={handleMouseMove}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs font-bold uppercase tracking-[0.5em] text-accent-action block mb-4"
                    >
                        Modern Tech Stack
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-black italic tracking-tighter"
                    >
                        Creative <span className="text-accent-action">Arsenal</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {tools.map((item, i) => (
                        <MagneticIcon
                            key={i}
                            icon={item.icon}
                            label={item.label}
                            mouseX={mouseX}
                            mouseY={mouseY}
                        />
                    ))}

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="col-span-2 md:col-span-2 lg:col-span-3 p-8 rounded-[2.5rem] bg-gradient-to-br from-accent-action/10 to-transparent border border-accent-action/20 flex flex-col justify-center"
                    >
                        <h3 className="text-xs font-black uppercase tracking-[0.5em] text-accent-action mb-4">The Philosophy</h3>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-text-secondary italic">
                            &quot;The intersection of logic and aesthetics is where true innovation happens. My arsenal is built for speed, scalability, and impact.&quot;
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CreativeArsenal;
