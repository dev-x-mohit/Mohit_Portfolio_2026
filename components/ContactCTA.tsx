'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Copy, Check, Globe, Sparkles, Orbit } from 'lucide-react';

const StarField = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            {Array.from({ length: 120 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 2000 - 1000,
                        y: Math.random() * 2000 - 1000,
                        scale: Math.random() * 1.5,
                        opacity: Math.random()
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute w-0.5 h-0.5 bg-foreground rounded-full opacity-20"
                    style={{
                        left: '50%',
                        top: '50%',
                    }}
                />
            ))}
        </div>
    );
};

const SocialDockItem = ({ icon: Icon, href, label, index }: { icon: any, href: string, label: string, index: number }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{
                scale: 1.2,
                y: -10,
                backgroundColor: 'var(--accent-action)',
                color: 'var(--background)'
            }}
            className="relative p-5 bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-2xl transition-all group shadow-lg"
        >
            <Icon size={24} className="group-hover:scale-110 transition-transform" />

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-[10px] font-black rounded uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {label}
            </div>
        </motion.a>
    );
};

const SingularityCore = ({ springX, springY }: { springX: any, springY: any }) => {
    return (
        <motion.div
            style={{
                x: useTransform(springX, (v: any) => (v as number) * 0.03),
                y: useTransform(springY, (v: any) => (v as number) * 0.03)
            }}
            className="relative w-96 h-96 flex items-center justify-center"
        >
            {/* Photon Sphere (Enhanced Glow) */}
            <div className="absolute inset-0 bg-accent-highlight/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute inset-10 bg-accent-action/10 rounded-full blur-[60px]" />

            {/* Accretion Disk (Rotating rings) */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20%] border border-accent-action/20 rounded-[45%] opacity-20"
                    style={{
                        borderTopColor: 'var(--accent-action)',
                        borderBottomColor: 'var(--accent-highlight)',
                        filter: `blur(${i}px)`,
                        transform: `rotateX(60deg) rotateY(${i * 10}deg)`
                    }}
                />
            ))}

            {/* Event Horizon (The Void) */}
            <div className="absolute inset-20 bg-background rounded-full border border-foreground/5 shadow-[inset_0_0_80px_rgba(255,255,255,0.05)] overflow-hidden">
                {/* Lensing / Distortion layer */}
                <div className="absolute inset-0 backdrop-blur-md opacity-50" />
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_85%)]" />
            </div>

            {/* Particle Stream (Spinning data) */}
            <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-accent-action rounded-full opacity-40"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${i * 30}deg) translateY(-180px)`
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const ContactCTA = () => {
    const [copied, setCopied] = useState(false);
    const [isInside, setIsInside] = useState(false);
    const email = "mohit.dev.contact@gmail.com";
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left - width / 2);
        mouseY.set(e.clientY - top - height / 2);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { icon: Github, label: 'SYS_SOURCE', href: 'https://github.com/mohitlakhara-ind' },
        { icon: Linkedin, label: 'NEURAL_NET', href: 'https://linkedin.com/in/mohitlakhara' },
        { icon: Globe, label: 'CENTRAL_HUB', href: 'https://linktr.ee/mohitlakhara' },
        { icon: Mail, label: 'DIRECT_LINK', href: `mailto:${email}` },
    ];

    return (
        <section
            id="contact"
            className={`py-40 relative bg-background overflow-hidden select-none border-t border-foreground/5 transition-all ${isInside ? 'cursor-none' : ''}`}
            onMouseEnter={() => setIsInside(true)}
            onMouseLeave={() => setIsInside(false)}
        >
            <StarField />

            {/* The Singularity Center */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <SingularityCore springX={springX} springY={springY} />
            </div>

            <div className="container mx-auto px-6 relative z-10 min-h-[800px] flex flex-col items-center justify-between" ref={containerRef} onMouseMove={handleMouseMove}>

                {/* Custom Prismatic Cursor */}
                <motion.div
                    style={{
                        x: springX,
                        y: springY,
                        display: isInside ? 'flex' : 'none'
                    }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none z-50 items-center justify-center"
                >
                    <div className="absolute inset-0 border border-accent-action rounded-full animate-ping opacity-30" />
                    <div className="w-1.5 h-1.5 bg-accent-action rounded-full shadow-[0_0_10px_var(--accent-action)]" />
                </motion.div>

                <div className="flex flex-col items-center justify-center pt-20 text-center relative flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            x: useTransform(springX, (v: any) => (v as number) * -0.015),
                            y: useTransform(springY, (v: any) => (v as number) * -0.015),
                        }}
                        className="mb-20"
                    >
                        <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter text-foreground leading-[0.8] uppercase font-display italic">
                            READY FOR<br />
                            <span className="text-transparent px-4" style={{ WebkitTextStroke: '2px var(--foreground)' }}>COLLISION?</span>
                        </h2>
                        <div className="flex items-center justify-center gap-4 mt-12 mb-20">
                            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-accent-action/40 to-transparent" />
                            <p className="font-mono text-[11px] text-text-secondary uppercase tracking-[1em] font-black">STABLE_INIT_PROTOCOL</p>
                            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-accent-highlight/40 to-transparent" />
                        </div>

                        <button
                            onClick={() => window.location.href = `mailto:${email}`}
                            className="px-20 py-8 bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-[2.5rem] text-foreground font-black text-3xl uppercase tracking-[0.2em] transition-all duration-700 hover:tracking-[0.4em] hover:bg-foreground/10 hover:border-accent-action/50 relative overflow-hidden active:scale-95"
                        >
                            <span className="relative z-10">INITIALIZE</span>
                            <div className="absolute inset-0 bg-accent-action/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-accent-action scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                        </button>
                    </motion.div>

                    {/* Email Node */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        onClick={copyToClipboard}
                        className="group relative cursor-pointer px-12 py-6 bg-foreground/[0.03] border border-foreground/5 rounded-[2.5rem] flex items-center gap-8 hover:bg-foreground/[0.05] hover:border-accent-action/40 transition-all backdrop-blur-2xl shadow-xl mb-32"
                    >
                        <span className="text-xl font-mono text-text-secondary group-hover:text-foreground transition-colors font-bold lowercase">{email}</span>
                        <div className="w-12 h-12 rounded-2xl bg-foreground/10 flex items-center justify-center text-foreground group-hover:text-accent-action group-hover:scale-110 transition-all border border-foreground/10">
                            {copied ? <Check size={28} className="text-green-400" /> : <Copy size={28} />}
                        </div>
                        <AnimatePresence>
                            {copied && (
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-green-400 uppercase tracking-[0.4em] font-black"
                                >
                                    TRANSMISSION_LOCKED
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Simplified Bottom Dock */}
                <div className="w-full flex justify-center gap-6 pb-12 relative">
                    {socials.map((social, i) => (
                        <SocialDockItem key={i} {...social} index={i} />
                    ))}
                </div>
            </div>

            {/* Terminal Decoration */}
            <div className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-center opacity-30 font-mono text-[9px] uppercase tracking-[0.5em] text-text-secondary pointer-events-none">
                <div className="flex items-center gap-6">
                    <Orbit size={14} className="animate-spin-slow text-accent-action" />
                    <span>Horizon: [SYNCED]</span>
                </div>
                <div className="hidden lg:flex gap-12 font-black">
                    <span>STATUS: STABLE</span>
                    <span>GRAVITY: 1G</span>
                </div>
                <div className="flex items-center gap-4">
                    <Sparkles size={12} className="text-accent-highlight" />
                    <span>M_L_PORT_2026</span>
                </div>
            </div>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default ContactCTA;
