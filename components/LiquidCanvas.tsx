'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// --- Domain Warping & Colorful Fragment Shader ---
const fragmentShader = `
    uniform float time;
    uniform vec2 mouse;
    uniform float scrollY;
    uniform vec3 uColorBg;
    uniform vec3 uColorAccent;
    varying vec2 vUv;

    // --- Noise & FBM Functions ---
    float random (in vec2 _st) {
        return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Gradient Noise
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    #define NUM_OCTAVES 5

    float fbm ( in vec2 _st) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5),
                        -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(_st);
            _st = rot * _st * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec2 uv = vUv * 3.0; // Scale up the coordinate space
        
        // --- Interaction: Mouse Warp ---
        // Push the coordinate space away from mouse
        float mouseDist = distance(vUv, mouse);
        float interaction = smoothstep(0.4, 0.0, mouseDist);
        uv += (vUv - mouse) * interaction * 0.5; // Distort uv based on mouse direction

        // --- Interaction: Scroll Speed ---
        // Accelerate time based on scroll position
        float t = time * 0.2 + scrollY * 0.001; 

        // --- Domain Warping ---
        // q = fbm( p + t )
        vec2 q = vec2(0.0);
        q.x = fbm( uv + 0.00 * t );
        q.y = fbm( uv + vec2(1.0));

        // r = fbm( p + 4*q + t )
        vec2 r = vec2(0.0);
        r.x = fbm( uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t );
        r.y = fbm( uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t );

        // f = fbm( p + 4*r )
        float f = fbm(uv + r);

        // --- Color Mixing ---
        // Base color mixes with highlighting
        // We use the 'f' value to mix between bg and accent
        // We also introduce a 3rd color by shifting the accent hue
        
        // Make the colors evolve
        vec3 color = mix(uColorBg, uColorAccent, clamp((f*f)*4.0, 0.0, 1.0));
        
        // 3rd Color: A complementary or shifted version of accent
        // Simple trick: swap channels or invert slightly
        vec3 tertiary = vec3(uColorAccent.g, uColorAccent.b, uColorAccent.r); 
        // Or make it more vibrant/rainbow-y based on 'q' vector length
        vec3 rainbow = 0.5 + 0.5 * cos(t + vec3(0,2,4) + length(q));
        
        // Mix the tertiary/rainbow element in the "swirls"
        color = mix(color, mix(tertiary, rainbow, 0.2), clamp(length(q), 0.0, 1.0));

        // Integrate time-based hue shift for "more color"
        // Only apply subtley to avoids clown-vomit look, unless user wants full RGB
        // f*3.0 makes the color bands tighter
        vec3 colorShift = 0.5 + 0.5 * cos(t + uv.xyx + vec3(0,2,4)); 
        color = mix(color, colorShift, 0.15); // subtle 15% mix of full spectrum

        // Darken the deeps for contrast
        color = mix(color, uColorBg, f * f * f + 0.6 * length(q));

        // --- Vignette ---
        float vignette = 1.0 - smoothstep(0.5, 1.5, length(vUv - 0.5));
        color *= vignette;
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

const FluidMesh = () => {
    const mesh = useRef<THREE.Mesh>(null!);
    const { viewport } = useThree();
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const scrollRef = useRef(0);

    const uniforms = useMemo(() => ({
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
        scrollY: { value: 0 },
        uColorBg: { value: new THREE.Color('#000000') },
        uColorAccent: { value: new THREE.Color('#6366f1') },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }), []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX / window.innerWidth;
            mouseRef.current.y = 1.0 - (e.clientY / window.innerHeight);
        };

        const handleScroll = () => {
            scrollRef.current = window.scrollY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Dynamic Color Update
    useEffect(() => {
        const updateColors = () => {
            const computedStyle = getComputedStyle(document.documentElement);
            const bg = computedStyle.getPropertyValue('--background').trim();
            const accent = computedStyle.getPropertyValue('--accent-action').trim();

            uniforms.uColorBg.value.set(bg || '#000000');
            uniforms.uColorAccent.value.set(accent || '#6366f1');
        };

        updateColors();
        const observer = new MutationObserver(updateColors);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

        return () => observer.disconnect();
    }, [uniforms]);

    useFrame((state) => {
        const { clock } = state;
        // @ts-ignore
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.time.value = clock.getElapsedTime();
            material.uniforms.scrollY.value = scrollRef.current;

            // Smooth mouse interpolation
            material.uniforms.mouse.value.x += (mouseRef.current.x - material.uniforms.mouse.value.x) * 0.05;
            material.uniforms.mouse.value.y += (mouseRef.current.y - material.uniforms.mouse.value.y) * 0.05;
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

const LiquidCanvas = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <FluidMesh />
            </Canvas>
        </div>
    );
};

export default LiquidCanvas;
