'use client';
import { ArrowRight } from 'iconoir-react';
import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Environment, TorusKnot, Text, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

// ──────────────────────────────────────────────────────────────
// 1.  3D SCENE – NO SPHERE
// ──────────────────────────────────────────────────────────────

const BackgroundScene = () => {
    const ringRef = useRef<THREE.Mesh>(null);
    const shapesRef = useRef<THREE.Group>(null);

    // Animation loop
    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        // ── Orbiting ring ──
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.sin(t * 0.2) * 0.4;
            ringRef.current.rotation.y += delta * 0.3;
            ringRef.current.rotation.z = Math.cos(t * 0.15) * 0.2;
        }


        // ── Floating shapes ──
        if (shapesRef.current) {
            shapesRef.current.children.forEach((child, i) => {
                const offset = i * 0.9;
                child.position.x = Math.sin(t * 0.4 + offset) * 3.5;
                child.position.y = Math.cos(t * 0.35 + offset * 0.6) * 2.8;
                child.position.z = Math.sin(t * 0.25 + offset * 0.7) * 2.5;
                child.rotation.x += delta * (0.2 + i * 0.05);
                child.rotation.y += delta * (0.3 + i * 0.04);
            });
        }
    });

    return (
        <>

            {/* ─── Glowing Ring ─── */}
            <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
                <mesh ref={ringRef} scale={[3.0, 3.0, 3.0]}>
                    <torusGeometry args={[1, 0.04, 32, 64]} />
                    <meshStandardMaterial
                        color="var(--accent-highlight, #00ffff)"
                        emissive="var(--accent-action, #a855f7)"
                        emissiveIntensity={0.4}
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            </Float>

            {/* ─── Floating Low‑Poly Shapes ─── */}
            <group ref={shapesRef}>
                {Array.from({ length: 12 }).map((_, i) => {
                    const isOcta = i % 2 === 0;
                    const color = i % 3 === 0 ? 'var(--accent-highlight, #00F0FF)' : 'var(--accent-action, #B026FF)';
                    return (
                        <Float key={i} speed={0.8 + i * 0.1} rotationIntensity={0.6} floatIntensity={0.5}>
                            <mesh scale={[0.12, 0.12, 0.12]}>
                                {isOcta ? <octahedronGeometry args={[1, 0]} /> : <tetrahedronGeometry args={[1, 0]} />}
                                <meshStandardMaterial
                                    color={color}
                                    emissive={color}
                                    emissiveIntensity={0.2}
                                    roughness={0.2}
                                    metalness={0.7}
                                />
                            </mesh>
                        </Float>
                    );
                })}
            </group>

            {/* ─── Stars ─── */}
            <Stars radius={80} depth={50} count={2500} factor={6} saturation={0} fade speed={0.5} />
        </>
    );
};

// ──────────────────────────────────────────────────────────────
// 2.  3D TITLE COMPONENT
// ──────────────────────────────────────────────────────────────

const Title3D = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    useFrame((state) => {
        if (groupRef.current) {
            // Parallax effect based on mouse pointer
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.pointer.y * 0.15, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.15, 0.1);
        }
    });

    // Make 3D text responsive based on viewport width
    const scale = viewport.width < 5 ? 0.55 : viewport.width < 8 ? 0.75 : 1;

    return (
        <group ref={groupRef} position={[0, 0.1, 0]} scale={[scale, scale, scale]}>
            <Text
                position={[0, 0.65, 0]}
                fontSize={1.6}
                letterSpacing={-0.05}
                outlineWidth={0.03}
                outlineColor="#000000"
            >
                CREATIVE
                <meshBasicMaterial>
                    <GradientTexture stops={[0, 0.5, 1]} colors={['#00F0FF', '#ffffff', '#B026FF']} />
                </meshBasicMaterial>
            </Text>
            <Text
                position={[0, -0.65, 0]}
                fontSize={1.6}
                letterSpacing={-0.05}
                outlineWidth={0.03}
                outlineColor="#000000"
            >
                DEVELOPER
                <meshBasicMaterial>
                    <GradientTexture stops={[0, 0.5, 1]} colors={['#B026FF', '#ffffff', '#00F0FF']} />
                </meshBasicMaterial>
            </Text>
        </group>
    );
};

// ──────────────────────────────────────────────────────────────
// 3.  CORE SKILLS DATA
// ──────────────────────────────────────────────────────────────

const coreSkills = [
    'Cinematic User Interfaces', 'Cloud-Native Architecture', 'High-Performance SaaS',
    'Mobile App Development', 'Next.js & MERN Stack'
];

// ──────────────────────────────────────────────────────────────
// 3.  MAIN HERO COMPONENT
// ──────────────────────────────────────────────────────────────

const Hero = () => {
    const [mounted, setMounted] = useState(false);
    const [skillIndex, setSkillIndex] = useState(0);

    // Mouse tracking for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(springY, [-1, 1], [5, -5]);
    const rotateY = useTransform(springX, [-1, 1], [-5, 5]);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setSkillIndex((prev) => (prev + 1) % coreSkills.length);
        }, 2500); // cycle speed
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
    };

    return (
        <section
            id="home"
            className="relative min-h-[100svh] w-full bg-background flex flex-col items-center justify-center overflow-hidden pt-24"
        >
            {/* ─── 3D Canvas ─── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {mounted && (
                    <Canvas camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                        <Suspense fallback={null}>
                            <BackgroundScene />
                            <Title3D />
                            <Environment preset="city" />
                        </Suspense>
                    </Canvas>
                )}
            </div>

            {/* ─── Overlay Gradients & Grid ─── */}
            <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-accent-highlight/30 blur-[120px] rounded-full pointer-events-none opacity-50 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-accent-action/30 blur-[120px] rounded-full pointer-events-none opacity-50 animate-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-0 pointer-events-none mix-blend-overlay" />

            {/* ─── UI Overlay ─── */}
            <div className="relative z-10 w-full h-full max-w-5xl mx-auto flex flex-col items-center justify-center py-16 px-6 pointer-events-none">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center text-center gap-5 w-full"
                    style={{ perspective: 800 }}
                >
                    {/* ─── Top Badge ─── */}
                    <motion.div
                        variants={itemVariants}
                        className="px-5 py-2 rounded-full border border-white/10 bg-background/60 backdrop-blur-md shadow-2xl flex items-center gap-3 pointer-events-auto"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-action opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
                        </span>
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-foreground font-mono font-bold drop-shadow-md">
                            Mohit Lakhara // Software Developer
                        </span>
                    </motion.div>

                    {/* ─── Parallax Title ─── */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center gap-0 w-full"
                        style={{
                            rotateX: rotateX,
                            rotateY: rotateY,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <div className="h-7 md:h-10 overflow-hidden flex justify-center items-center mb-1">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={skillIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="text-lg sm:text-xl md:text-2xl font-semibold tracking-[0.3em] text-foreground uppercase drop-shadow-lg"
                                >
                                    {coreSkills[skillIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        
                        {/* ─── Gap for 3D Text ─── */}
                        <div className="h-[32vh] sm:h-[45vh] min-h-[220px] w-full pointer-events-none" />
                    </motion.div>

                    {/* ─── Subtitle ─── */}
                    <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base md:text-lg font-medium tracking-wide text-foreground max-w-xl bg-background/50 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg"
                    >
                        Engineering high-performance SaaS solutions and cinematic user interfaces that blend aesthetic design with robust, scalable architecture.
                    </motion.p>

                    {/* ─── Actions ─── */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 mt-3 pointer-events-auto"
                    >
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-foreground text-background font-bold tracking-widest uppercase text-xs rounded-sm overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-shadow duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                VIEW PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-highlight)] to-[var(--accent-action)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        </button>

                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-transparent border border-foreground/20 text-foreground font-bold tracking-widest uppercase text-xs rounded-sm hover:bg-foreground/5 transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
                        >
                            GET IN TOUCH
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-action group-hover:scale-150 transition-transform" />
                        </button>
                    </motion.div>

                    {/* ─── Scroll Down Indicator ─── */}
                    <motion.div
                        variants={itemVariants}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/25 pointer-events-auto"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-[1px] h-10 bg-gradient-to-b from-[var(--accent-highlight)] to-transparent"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* ─── Overlay Gradients ─── */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--background)_95%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] z-0 pointer-events-none mix-blend-overlay" />
        </section>
    );
};

export default Hero;