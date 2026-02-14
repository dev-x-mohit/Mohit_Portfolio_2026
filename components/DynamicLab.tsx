'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon, Box, Code, Globe, Infinity, Layers, Terminal } from 'lucide-react';

const LabItem = ({ icon: Icon, title, x, y, color }: { icon: LucideIcon, title: string, x: number, y: number, color: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
    const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

    const springX = useSpring(rotateX);
    const springY = useSpring(rotateY);

    function handleMouseMove(e: React.MouseEvent) {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x, y,
                rotateX: springX,
                rotateY: springY,
                perspective: 1000
            }}
            className={`absolute flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl cursor-grab active:cursor-grabbing group transition-colors hover:bg-white/10 ${color}`}
        >
            <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                <Icon size={24} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{title}</span>
            <div className="absolute -inset-2 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};

const DynamicLab = () => {
    return (
        <section className="relative py-32 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center mb-24 relative z-10">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-xs font-bold uppercase tracking-[0.5em] text-indigo-500 block mb-4"
                >
                    Experimental
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-5xl md:text-7xl font-bold font-display"
                >
                    The <span className="text-indigo-400">Dynamic</span> Lab
                </motion.h2>
                <p className="text-gray-400 mt-6 max-w-lg mx-auto italic font-light">
                    Interact with the building blocks of my digital workshop. Draggable, reactive, and physically simulated.
                </p>
            </div>

            <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center select-none">
                {/* Visual Connector Lines (Background) */}
                <div className="absolute inset-0 border border-white/5 rounded-full scale-110 border-dashed animate-[spin_20s_linear_infinite] pointer-events-none" />
                <div className="absolute inset-0 border border-white/5 rounded-full scale-75 border-dashed animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />

                <LabItem icon={Code} title="Logic" x={-150} y={-100} color="shadow-blue-500/10" />
                <LabItem icon={Layers} title="Architecture" x={150} y={-80} color="shadow-purple-500/10" />
                <LabItem icon={Globe} title="Web" x={-120} y={120} color="shadow-emerald-500/10" />
                <LabItem icon={Box} title="3D" x={180} y={150} color="shadow-indigo-500/10" />
                <LabItem icon={Terminal} title="Shell" x={0} y={0} color="shadow-pink-500/10" />
                <LabItem icon={Infinity} title="Persistence" x={10} y={-180} color="shadow-cyan-500/10" />
            </div>

            {/* Background elements */}
            <div className="absolute -left-20 bottom-0 w-96 h-96 bg-indigo-500/5 blur-[150px] pointer-events-none" />
            <div className="absolute -right-20 top-0 w-96 h-96 bg-purple-500/5 blur-[150px] pointer-events-none" />
        </section>
    );
};

export default DynamicLab;
