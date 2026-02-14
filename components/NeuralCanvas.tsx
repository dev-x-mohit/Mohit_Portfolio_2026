'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

const ParticleField = () => {
    const points = useRef<THREE.Points>(null!);
    const { scrollYProgress } = useScroll();
    const { camera } = useThree();
    const count = 3000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, []);

    const [color, setColor] = React.useState('#818cf8');

    React.useEffect(() => {
        const updateColor = () => {
            const themeColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--accent-action').trim();
            if (themeColor) setColor(themeColor);
        };

        updateColor();
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const scroll = scrollYProgress.get();

        points.current.rotation.y = time * 0.05 + scroll * 2;
        points.current.rotation.x = Math.sin(time * 0.1) * 0.1 + scroll * 0.5;

        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = 75 + scroll * 20;
            camera.updateProjectionMatrix();
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color={color}
                transparent
                opacity={0.3}
                sizeAttenuation
            />
        </points>
    );
};

const NeuralCanvas = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-[var(--background)] pointer-events-none transition-colors duration-700">
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <ParticleField />
                <fog attach="fog" args={['#030712', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default NeuralCanvas;
