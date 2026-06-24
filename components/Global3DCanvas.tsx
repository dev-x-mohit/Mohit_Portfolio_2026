'use client';
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Sparkles, MeshTransmissionMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

const BackgroundScene = () => {
    const sceneGroupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Group>(null);
    const innerCoreRef = useRef<THREE.Mesh>(null);

    const ringRef = useRef<THREE.Mesh>(null);
    const shapesRef = useRef<THREE.Group>(null);
    const spreadRef = useRef(3.5);
    const ringRotXRef = useRef(0);
    const { viewport } = useThree();

    const activeSectionRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'tech', 'projects', 'contact'];
            const wh = window.innerHeight;
            
            let minDistance = Infinity;
            let closestIndex = 0;

            sections.forEach((id, index) => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Calculate distance from screen center to element center
                    const elCenter = rect.top + rect.height / 2;
                    const screenCenter = wh / 2;
                    const dist = Math.abs(elCenter - screenCenter);
                    
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestIndex = index;
                    }
                }
            });
            activeSectionRef.current = closestIndex;
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation loop
    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        // Aggressive Mouse Parallax
        const mouseRotX = (state.pointer.y * Math.PI) / 6;
        const mouseRotY = (state.pointer.x * Math.PI) / 6;
        const mousePosX = state.pointer.x * 0.8;
        const mousePosY = state.pointer.y * 0.8;

        // Determine Target Positions Based on Active Section
        let targetX = 0;
        let targetY = 0;
        let targetGroupScale = 1;
        let targetCoreScale = 1.2;
        let targetRingScale = 3.0;
        let targetSpread = 3.5;
        let targetRingRotX = 0;

        const isDesktop = viewport.width > 5;
        const rightOffset = isDesktop ? viewport.width * 0.25 : 0;
        const leftOffset = isDesktop ? -viewport.width * 0.25 : 0;

        const activeIndex = activeSectionRef.current;

        if (activeIndex === 0) {
            // Hero Section (Centered Halo)
            targetX = 0;
            targetY = 0;
            targetGroupScale = 1;
            targetCoreScale = 1.3;
            targetRingScale = 3.8;
            targetSpread = 4.5;
            targetRingRotX = 0;
        } else if (activeIndex === 1) {
            // About Section (Behind Image on the Left)
            targetX = leftOffset;
            targetY = 0; 
            targetGroupScale = 1;
            targetCoreScale = 1.4; 
            targetRingScale = 3.2;
            targetSpread = 4.0; 
            targetRingRotX = 0.2; 
        } else if (activeIndex === 2) {
            // Tech Scroll Section (Behind Core Stack)
            targetX = 0;
            targetY = viewport.height * -0.15; // Moved further down to align with the SVG core
            targetGroupScale = 0.5; // Make the entire group smaller
            targetCoreScale = 1.0; 
            targetRingScale = 2.5; 
            targetSpread = 3.0; 
            targetRingRotX = 0;
        } else if (activeIndex === 3) {
            // Projects Section
            targetX = rightOffset;
            targetY = viewport.height * 0.1;
            targetGroupScale = 0.8;
            targetCoreScale = 1.0;
            targetRingScale = 2.5;
            targetSpread = 4.0;
            targetRingRotX = Math.PI / 2.2; // Flatten to 90 deg disk
        } else if (activeIndex === 4) {
            // Contact Section
            targetX = 0;
            targetY = 0;
            targetGroupScale = 1;
            targetCoreScale = 3.5; // Massive core
            targetRingScale = 1.0; // Shrink ring to a tight belt
            targetSpread = 2.0; // Orbit tight
            targetRingRotX = 0;
        }

        if (sceneGroupRef.current) {
            sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.x, mouseRotX, 0.08);
            sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.y, mouseRotY, 0.08);

            // Smooth Interpolation for Section Transitions + Mouse Parallax
            sceneGroupRef.current.position.x = THREE.MathUtils.lerp(sceneGroupRef.current.position.x, targetX + mousePosX, 0.08);
            sceneGroupRef.current.position.y = THREE.MathUtils.lerp(sceneGroupRef.current.position.y, targetY + mousePosY, 0.08);
            sceneGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(sceneGroupRef.current.scale.x, targetGroupScale, 0.05));
            
            // Continuous scroll rotation effect
            sceneGroupRef.current.rotation.z = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.z, window.scrollY * 0.001, 0.1);
        }

        if (coreRef.current) {
            coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, targetCoreScale ?? 1.2, 0.03));
            coreRef.current.rotation.x += delta * 0.15;

        }



        // Custom refs for continuous math
        spreadRef.current = THREE.MathUtils.lerp(spreadRef.current, targetSpread ?? 3.5, 0.03);
        ringRotXRef.current = THREE.MathUtils.lerp(ringRotXRef.current, targetRingRotX ?? 0, 0.03);

        // ── Orbiting ring ──
        if (ringRef.current) {
            ringRef.current.scale.setScalar(THREE.MathUtils.lerp(ringRef.current.scale.x, targetRingScale ?? 3.0, 0.03));
            ringRef.current.rotation.x = ringRotXRef.current + Math.sin(t * 0.2) * 0.4;
            ringRef.current.rotation.y += delta * 0.3;
            ringRef.current.rotation.z = Math.cos(t * 0.15) * 0.2;
        }

        // ── Floating shapes ──
        if (shapesRef.current) {
            shapesRef.current.children.forEach((child, i) => {
                const offset = i * 0.9;
                const r = spreadRef.current;
                child.position.x = Math.sin(t * 0.4 + offset) * r * 1.0;
                child.position.y = Math.cos(t * 0.35 + offset * 0.6) * r * 0.8;
                child.position.z = Math.sin(t * 0.25 + offset * 0.7) * r * 0.7;
                child.rotation.x += delta * (0.2 + i * 0.05);
                child.rotation.y += delta * (0.3 + i * 0.04);
            });
        }
    });

    return (
        <>
            <spotLight position={[5, 5, 5]} intensity={2} penumbra={1} color="#F2D89A" />
            <spotLight position={[-5, -5, -5]} intensity={1} penumbra={1} color="#A8791D" />

            <group ref={sceneGroupRef}>
                {/* ─── Glass Core Engine ─── */}
                <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.4}>
                    <group ref={coreRef} scale={[1.2, 1.2, 1.2]}>
                        

                        {/* Layer 2: The Glass Shell */}
                        <mesh>
                            <icosahedronGeometry args={[1.2, 0]} />
                            <MeshTransmissionMaterial
                                backside
                                samples={4}
                                thickness={3}
                                chromaticAberration={0.15}
                                anisotropy={0.3}
                                distortion={0.2}
                                distortionScale={0.5}
                                temporalDistortion={0.2}
                                ior={1.7}
                                color="#FBCFE8"
                                transparent
                                opacity={0.9}
                            />
                        </mesh>



                    </group>
                </Float>

                {/* ─── Glowing Ring ─── */}
                <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
                    <mesh ref={ringRef} scale={[3.0, 3.0, 3.0]}>
                        <torusGeometry args={[1, 0.05, 4, 32]} />
                        <meshStandardMaterial
                            color="var(--gold-light, #F2D89A)"
                            emissive="var(--gold-dark, #A8791D)"
                            emissiveIntensity={0.4}
                            roughness={0.1}
                            metalness={1.0}
                            transparent
                            opacity={0.7}
                        />
                    </mesh>
                </Float>

                {/* ─── Floating Low‑Poly Shapes ─── */}
                <group ref={shapesRef}>
                    {Array.from({ length: 12 }).map((_, i) => {
                        const isOcta = i % 2 === 0;
                        const color = i % 3 === 0 ? 'var(--gold-light, #F2D89A)' : 'var(--gold-dark, #A8791D)';
                        return (
                            <Float key={i} speed={0.8 + i * 0.1} rotationIntensity={0.6} floatIntensity={0.5}>
                                <mesh scale={[0.12, 0.12, 0.12]}>
                                    {isOcta ? <octahedronGeometry args={[1, 0]} /> : <tetrahedronGeometry args={[1, 0]} />}
                                    <meshStandardMaterial
                                        color={color}
                                        emissive={color}
                                        emissiveIntensity={0.2}
                                        roughness={0.1}
                                        metalness={1.0}
                                    />
                                </mesh>
                            </Float>
                        );
                    })}
                </group>
            </group>

            {/* ─── Cinematic Gold Dust ─── */}
            <Sparkles count={150} scale={15} size={2} speed={0.4} color="#F2D89A" opacity={0.6} noise={1} />
            <Sparkles count={50} scale={20} size={4} speed={0.2} color="#A8791D" opacity={0.4} noise={2} />
        </>
    );
};

export default function Global3DCanvas() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={null}>
                    <BackgroundScene />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
