'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, shaderMaterial, Stars } from '@react-three/drei';
import { ArrowRight, Download, MousePointer2 } from 'lucide-react';
import * as THREE from 'three';

// --- Custom Warp Shader Material ---

// --- Custom Warp Shader Material ---

const WarpMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColorMain: { value: new THREE.Color("#00ffff") }, // Default, will be updated
        uColorAccent: { value: new THREE.Color("#a855f7") }, // Default, will be updated
        uIntensity: { value: 0.3 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
    },
    vertexShader: `
    uniform float uTime;
    uniform float uIntensity;
    uniform vec2 uMouse;
    uniform float uScroll;
    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vPosition;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vPosition = position;
      
      // Interaction influences
      // Distort noise field based on mouse
      vec3 noisePos = position * 1.5 + uTime * 0.5;
      noisePos.xy += uMouse * 2.5;
      
      float noiseVal = snoise(noisePos);
      
      // Scroll increases intensity
      float scrollFactor = uScroll * 0.002;
      float finalIntensity = uIntensity + scrollFactor;
      
      vDisplacement = noiseVal;
      
      vec3 newPosition = position + normal * (noiseVal * finalIntensity);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 uColorMain;
    uniform vec3 uColorAccent;
    varying float vDisplacement;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      // Color mixing based on displacement
      float mixFactor = smoothstep(-1.0, 1.0, vDisplacement);
      vec3 color = mix(uColorMain, uColorAccent, mixFactor);
      
      // Fresnel-like rim effect for depth
      float rim = 1.0 - abs(dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)));
      color += rim * 0.5;

      gl_FragColor = vec4(color, 0.8);
    }
  `
};

const WarpSphere = () => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    // Update colors from CSS variables
    useEffect(() => {
        const updateColors = () => {
            if (materialRef.current) {
                const computedStyle = getComputedStyle(document.documentElement);
                const accentAction = computedStyle.getPropertyValue('--accent-action').trim();
                const accentHighlight = computedStyle.getPropertyValue('--accent-highlight').trim();

                // Fallback if variables are missing, but prefers the CSS vars
                materialRef.current.uniforms.uColorMain.value.set(accentHighlight || "#00ffff");
                materialRef.current.uniforms.uColorAccent.value.set(accentAction || "#a855f7");
            }
        };

        // Initial update
        updateColors();

        // Observer for theme changes (class attribute on html/body)
        const observer = new MutationObserver(updateColors);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

        return () => observer.disconnect();
    }, []);

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Time
            materialRef.current.uniforms.uTime.value += delta;

            // Mouse (Lerp for smoothness)
            const targetMouse = new THREE.Vector2(state.pointer.x, state.pointer.y);
            materialRef.current.uniforms.uMouse.value.lerp(targetMouse, 0.1);

            // Scroll
            materialRef.current.uniforms.uScroll.value = window.scrollY;
        }
        if (meshRef.current) {
            // Mouse interaction on rotation
            const rotateX = state.pointer.y * 0.5; // Look up/down
            const rotateY = state.pointer.x * 0.5; // Look left/right

            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotateX, 0.05);
            meshRef.current.rotation.y += delta * 0.1 + (state.pointer.x * delta * 0.5);
        }
    });

    return (
        <mesh ref={meshRef} scale={[2.2, 2.2, 2.2]}>
            <icosahedronGeometry args={[1, 64]} />
            {/* @ts-ignore */}
            <shaderMaterial
                ref={materialRef}
                args={[WarpMaterial]}
                wireframe={true}
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const Scene = () => {
    return (
        <>
            <WarpSphere />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
        </>
    );
};

// --- Main Hero Component ---

const Hero = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="home" className="relative h-screen w-full bg-background text-foreground flex items-center justify-center overflow-hidden px-6 pt-20 transition-colors duration-300">

            {/* 3D Background Layer */}
            <div className="absolute inset-0 z-0">
                {mounted && (
                    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                        <Scene />
                    </Canvas>
                )}
            </div>

            {/* Cinematic Vignette & Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_120%)] z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-background/30 z-0 pointer-events-none backdrop-blur-[1px]" />

            {/* Centered Content */}
            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center gap-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="px-4 py-1.5 rounded-full border border-border/10 bg-foreground/5 backdrop-blur-md text-xs font-mono tracking-[0.3em] text-accent-highlight uppercase">
                        Portfolio v4.0 // System Active
                    </div>

                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-bold tracking-tighter leading-[0.9] text-foreground">
                        ARCHITECTING<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action via-foreground to-accent-highlight animate-gradient-x bg-[length:200%_auto]">
                            REALITY
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex items-center gap-4 text-sm md:text-lg font-light tracking-widest uppercase text-text-secondary"
                >
                    <span className="hidden md:block w-12 h-px bg-border/20" />
                    <span>Crafting Immersive Dimensions</span>
                    <span className="hidden md:block w-12 h-px bg-border/20" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-6 mt-6"
                >
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-8 py-4 bg-foreground text-background font-bold tracking-wider hover:scale-105 transition-transform overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            VIEW WORK <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-accent-action translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>

                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-8 py-4 bg-transparent border border-border/20 text-foreground font-bold tracking-wider hover:bg-foreground/5 transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            GET IN TOUCH
                        </span>
                    </button>
                </motion.div>

                {/* Bottom Tech Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-0 right-0 top-[60vh] md:top-[70vh] flex justify-between px-10 pointer-events-none"
                >
                    <div className="hidden md:flex flex-col items-start gap-1 text-[10px] uppercase tracking-widest text-text-secondary font-mono">
                        <span>Input</span>
                        <span>Mouse / Scroll</span>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-1 text-[10px] uppercase tracking-widest text-text-secondary font-mono">
                        <span>Simulation</span>
                        <span>Active</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
