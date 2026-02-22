'use client';
import { ArrowRight, Github, Linkedin, Instagram, Mail, Copy, Check, Globe, Codepen } from 'iconoir-react';


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ContactForm from './ContactForm';

const ContactCTA = () => {
    const [showForm, setShowForm] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [copied, setCopied] = useState(false);
    const email = "mohit.dev.contact@gmail.com";

    // Canvas & Particle System
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<any[]>([]);
    const animationRef = useRef<number>(0);
    const textCoordinatesRef = useRef<{ x: number, y: number }[]>([]);

    // Theme colors
    const particleColorRef = useRef('rgba(255, 255, 255, 1)');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { icon: Github, label: 'GitHub', href: 'https://github.com/mohitlakhara-ind' },
        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mohitlakhara-ind' },
        { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/webdev_mohit' },
        { icon: Codepen, label: 'CodePen', href: 'https://codepen.io/mohitlakhara' },
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Use container dimensions, NOT window dimensions
        let width = container.offsetWidth;
        let height = container.offsetHeight;

        // Configuration
        const particleCount = width < 768 ? 600 : 1200;
        const textToForm = "CONNECT";
        // Reduced mouse radius as requested (150 -> 40)
        const mouseObj = { x: -1000, y: -1000, radius: 40 };

        // Fetch theme color
        const updateThemeColors = () => {
            const style = getComputedStyle(document.documentElement);
            // Switch to Accent Action (Primary Brand Color)
            let color = style.getPropertyValue('--accent-action').trim();
            // Fallback if empty
            if (!color) color = '#6200ea';
            particleColorRef.current = color;
        };
        updateThemeColors();

        // PARTICLE CLASS
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;
            color: string;

            targetX: number | null = null;
            targetY: number | null = null;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                // Increased speed for "faster and continue" feel
                this.vx = (Math.random() - 0.5) * 2.5;
                this.vy = (Math.random() - 0.5) * 2.5;
                this.size = Math.random() * 2 + 1;
                this.density = (Math.random() * 30) + 1;
                this.color = particleColorRef.current;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update(mouseX: number, mouseY: number, isHoveringButton: boolean, textCoords: { x: number, y: number }[], index: number) {

                // 1. Mouse Interaction
                let dx = mouseX - this.x;
                let dy = mouseY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseObj.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouseObj.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                }

                // 2. Behavior Logic
                if (isHoveringButton && index < textCoords.length) {
                    // MODE: FORM TEXT
                    const target = textCoords[index];
                    let tdx = target.x - this.x;
                    let tdy = target.y - this.y;

                    this.x += tdx * 0.08;
                    this.y += tdy * 0.08;

                } else {
                    // MODE: FLOAT
                    if (!isHoveringButton) {
                        this.x += this.vx;
                        this.y += this.vy;

                        if (this.x > width || this.x < 0) this.vx *= -1;
                        if (this.y > height || this.y < 0) this.vy *= -1;
                    }
                }
            }

            explode() {
                const angle = Math.random() * Math.PI * 2;
                const force = Math.random() * 50 + 20;
                this.vx = Math.cos(angle) * force;
                this.vy = Math.sin(angle) * force;
            }
        }

        // TEXT SAMPLING
        const sampleTextCoordinates = () => {
            const tempCanvas = document.createElement('canvas');
            const tCtx = tempCanvas.getContext('2d');
            if (!tCtx) return [];

            tempCanvas.width = width;
            tempCanvas.height = height;

            // Responsive Font Size
            const fontSize = Math.min(width * 0.12, 120);

            tCtx.fillStyle = 'white';
            tCtx.font = `900 ${fontSize}px "Outfit", sans-serif`;
            tCtx.textAlign = 'center';
            tCtx.textBaseline = 'middle';
            // Align text to TOP QUARTER of screen (25% down)
            tCtx.fillText(textToForm, width / 2, height * 0.25);

            const imageData = tCtx.getImageData(0, 0, width, height);
            const data = imageData.data;
            const coords = [];

            const gap = width < 768 ? 6 : 5;
            for (let y = 0; y < height; y += gap) {
                for (let x = 0; x < width; x += gap) {
                    const alpha = data[(y * 4 * width) + (x * 4) + 3];
                    if (alpha > 128) {
                        coords.push({ x, y });
                    }
                }
            }
            return coords;
        };

        // INIT
        const init = () => {
            particlesRef.current = [];
            textCoordinatesRef.current = sampleTextCoordinates();

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                particlesRef.current.push(new Particle(x, y));
            }
        };



        // Resize Logic
        const handleResize = () => {
            if (!containerRef.current || !canvasRef.current) return;
            width = containerRef.current.offsetWidth;
            height = containerRef.current.offsetHeight;
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            updateThemeColors();
            init();
        };

        // Initialize dimensions immediately
        handleResize();

        // Animation Loop with Visibility Check
        let isVisible = false;
        const animate = () => {
            if (!isVisible) return; // Stop if not visible

            if (!canvasRef.current || !ctx) return;

            ctx.clearRect(0, 0, width, height);

            particlesRef.current.forEach((particle, i) => {
                particle.update(
                    mouseObj.x,
                    mouseObj.y,
                    isHoveringRef.current,
                    textCoordinatesRef.current,
                    i
                );
                particle.draw(ctx);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        // Intersection Observer
        const observerIntersection = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                isVisible = true;
                animate();
            } else {
                isVisible = false;
                cancelAnimationFrame(animationRef.current);
            }
        }, { threshold: 0.1 });

        if (container) {
            observerIntersection.observe(container);
        }

        // Use ResizeObserver for container-aware resizing
        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(container);

        const handleMouseMove = (e: MouseEvent) => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                mouseObj.x = e.clientX - rect.left;
                mouseObj.y = e.clientY - rect.top;
            }
        };

        // MutationObserver for Theme
        const observerHelper = new MutationObserver(() => {
            updateThemeColors();
            init();
        });
        observerHelper.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            observerHelper.disconnect();
            observerIntersection.disconnect();
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const isHoveringRef = useRef(false);
    useEffect(() => {
        isHoveringRef.current = isHovering;
    }, [isHovering]);


    const handleCTAClick = () => {
        particlesRef.current.forEach(p => p.explode());
        setTimeout(() => {
            setShowForm(true);
        }, 800);
    };

    return (
        <section
            id="contact"
            ref={containerRef}
            className="h-screen max-h-[100vh] relative bg-background overflow-hidden flex flex-col items-center justify-center py-0"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                width={1000}
                height={1000}
            />

            <AnimatePresence mode="wait">

                {!showForm && (
                    <motion.div
                        key="cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)" }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-32"
                    >
                        {/* 
                            Layout Strategy:
                            - Text is rendered on Canvas at 25% height.
                            - Button & Socials are placed here at the bottom of the flex container (justify-end).
                            - This creates the requested "Void" in the middle.
                        */}

                        <motion.button
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onClick={() => {
                                particlesRef.current.forEach(p => p.explode());
                                setTimeout(() => {
                                    window.location.href = '/contact';
                                }, 500);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-12 py-6 bg-foreground text-background font-bold text-xl rounded-full shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(var(--foreground-rgb),0.5)] transition-all duration-500 overflow-hidden mb-12"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Initialize Connection <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-background/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center gap-6"
                        >
                            <motion.div
                                whileHover={{ y: -2 }}
                                onClick={copyToClipboard}
                                className="cursor-pointer flex items-center gap-3 px-5 py-2.5 rounded-xl bg-secondary-bg/50 backdrop-blur-md border border-border/10 hover:border-foreground/50 transition-colors group shadow-lg"
                            >
                                <Mail width={16} height={16} className="text-text-secondary group-hover:text-foreground transition-colors" />
                                <span className="font-mono text-sm text-text-secondary group-hover:text-foreground transition-colors">{email}</span>
                                <div className="ml-2 p-1 rounded-md bg-white/5">
                                    {copied ? <Check width={12} height={12} className="text-green-400" /> : <Copy width={12} height={12} className="text-text-secondary" />}
                                </div>
                            </motion.div>

                            <div className="hidden md:block w-px h-8 bg-foreground/10"></div>

                            <div className="flex items-center gap-4">
                                {socials.map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="p-2.5 rounded-lg bg-secondary-bg/30 text-text-secondary hover:text-foreground hover:bg-secondary-bg/60 transition-all border border-transparent hover:border-foreground/20"
                                        title={social.label}
                                    >
                                        <social.icon width={20} height={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {showForm && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative z-20 w-full h-full flex items-center justify-center px-4"
                    >
                        <div className="w-full max-w-md relative">
                            <ContactForm />

                            <motion.button
                                onClick={() => setShowForm(false)}
                                className="absolute -top-12 left-1/2 -translate-x-1/2 text-text-secondary hover:text-foreground text-sm font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap"
                            >
                                [ Return to Void ]
                            </motion.button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            <div className="absolute bottom-4 w-full text-center z-10 pointer-events-none">
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/20 font-mono">
                    System Neural Interface v2.0
                </p>
            </div>

        </section>
    );
};

export default ContactCTA;
