'use client';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });

const ParticleNetwork = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Increased amount to 0.6 to delay animation until more of the section is visible
    const isInView = useInView(containerRef, { amount: 0.55, once: false });

    // Ref to track view state without re-triggering the main effect
    const isViewRef = useRef(false);
    useEffect(() => {
        isViewRef.current = isInView;
    }, [isInView]);

    // specific settings
    const config = {
        particleCount: 50,
        text: '< Mohit />', // As per user request/code
        fontSize: 160,
        fontFamily: orbitron.style.fontFamily,
        particleSize: 1,
        ease: 0.04, // Slower assembly
        friction: 0.9,
        repulsion: 5,
        colors: ['#00ffffff'] // Single color: Electric Cyan
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let textPixels: { x: number; y: number }[] = [];
        let animationFrameId: number;
        let mouse = { x: null as number | null, y: null as number | null, radius: 100 };

        // Theme colors
        let particleColor = '#ffffff';
        let glowColor = 'rgba(0, 240, 255, 0.15)';

        // Handle Resize & Theme Update
        const updateDimensionsAndTheme = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Fetch theme colors
            const computedStyle = getComputedStyle(document.documentElement);
            particleColor = computedStyle.getPropertyValue('--accent-highlight').trim() || '#00bcd4';

            const accent = computedStyle.getPropertyValue('--accent-action-rgb').trim() || '0, 240, 255';
            glowColor = `rgba(${accent}, 0.15)`;

            prepareText();
        };

        const prepareText = () => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return;

            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;

            tempCtx.fillStyle = 'white';
            tempCtx.strokeStyle = 'white';
            tempCtx.lineWidth = 3;
            const size = canvas.width < 600 ? config.fontSize * 0.5 : config.fontSize;
            tempCtx.font = `bold ${size}px ${config.fontFamily}`;
            tempCtx.textAlign = 'center';
            tempCtx.textBaseline = 'middle';

            // Use strokeText for outline effect
            tempCtx.strokeText(config.text, tempCanvas.width / 2, tempCanvas.height / 2);

            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            textPixels = [];

            const step = 3;
            for (let y = 0; y < tempCanvas.height; y += step) {
                for (let x = 0; x < tempCanvas.width; x += step) {
                    const index = (y * tempCanvas.width + x) * 4;
                    if (imageData.data[index + 3] > 128) {
                        textPixels.push({ x, y });
                    }
                }
            }
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseX: number;
            baseY: number;
            size: number;
            // color removed from instance
            alpha: number;
            targetPoint: { x: number; y: number } | null;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * config.particleSize + 1;
                // this.color removed, using dynamic global particleColor
                this.alpha = Math.random() * 0.5 + 0.3;
                this.targetPoint = null;
            }

            update() {
                // Check current view state from ref
                const assembling = isViewRef.current;

                if (assembling && this.targetPoint) {
                    let dx = this.targetPoint.x - this.x;
                    let dy = this.targetPoint.y - this.y;
                    this.vx += dx * config.ease;
                    this.vy += dy * config.ease;
                    this.vx *= config.friction;
                    this.vy *= config.friction;
                } else {
                    // Fast Disassembly / Wander
                    this.vx += (Math.random() - 0.5) * 15; // Increased from 0.1 for faster scatter
                    this.vy += (Math.random() - 0.5) * 15;
                    this.vx *= 0.95;
                    this.vy *= 0.95;

                    // Screen Wrap
                    if (this.x < 0) this.x = canvas!.width;
                    if (this.x > canvas!.width) this.x = 0;
                    if (this.y < 0) this.y = canvas!.height;
                    if (this.y > canvas!.height) this.y = 0;
                }

                // Mouse Repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let forceDirectionX = dx / distance;
                        let forceDirectionY = dy / distance;
                        let maxDistance = mouse.radius;
                        let force = (maxDistance - distance) / maxDistance;
                        let directionX = forceDirectionX * force * config.repulsion;
                        let directionY = forceDirectionY * force * config.repulsion;
                        this.vx -= directionX;
                        this.vy -= directionY;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = particleColor; // Dynamic
                ctx.globalAlpha = this.alpha;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.max(config.particleCount, textPixels.length);
            for (let i = 0; i < count; i++) {
                const p = new Particle();
                if (i < textPixels.length) {
                    p.targetPoint = textPixels[i];
                }
                particles.push(p);
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw subtle cursor glow
            if (mouse.x !== null && mouse.y !== null) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.5);
                gradient.addColorStop(0, glowColor); // Dynamic
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        // Listeners
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        // Observer to detect theme changes
        const observer = new MutationObserver(() => {
            updateDimensionsAndTheme();
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

        window.addEventListener('resize', updateDimensionsAndTheme);
        if (containerRef.current) {
            containerRef.current.addEventListener('mousemove', handleMouseMove);
            containerRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        // Init
        updateDimensionsAndTheme();
        animate();

        return () => {
            window.removeEventListener('resize', updateDimensionsAndTheme);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove);
                containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []); // Run once on mount

    return (
        <div ref={containerRef} className="relative w-full h-[100vh] bg-background overflow-hidden flex flex-col items-center justify-center transition-colors duration-300">
            {/* Background Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-secondary-bg)_0%,var(--color-background)_100%)]" />

            <canvas
                ref={canvasRef}
                className="block absolute inset-0 z-10"
            />

            <div className="absolute bottom-10 z-20 text-center pointer-events-none">
                <h2 className="text-text-secondary text-sm tracking-[0.2em] font-medium uppercase">Interactive Canvas</h2>
                <p className="mt-2 text-accent-action/60 text-xs">Scroll to Assemble • Hover to Repel</p>
            </div>
        </div>
    );
};

export default ParticleNetwork;
