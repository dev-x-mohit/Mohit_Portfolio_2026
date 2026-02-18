'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
    "Performance",
    "Elegance",
    "Scalability",
    "Intuition",
    "Design",
    "Integrity"
];

const EthosTunnel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>('.ethos-item');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "bottom+=3000 bottom",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            items.forEach((item, i) => {
                tl.fromTo(item as HTMLElement,
                    {
                        z: -5000,
                        opacity: 0,
                        scale: 0.5
                    },
                    {
                        z: 2000,
                        opacity: 1,
                        scale: 2,
                        duration: 1,
                        ease: "none"
                    },
                    i * 0.2 // Stagger the start of each word in the tunnel
                );
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={triggerRef} className="relative h-screen overflow-hidden bg-background select-none">
            <div className="absolute inset-0 flex items-center justify-center perspective-[1000px] transform-style-3d">
                {values.map((val, i) => (
                    <div
                        key={i}
                        className="ethos-item absolute text-7xl md:text-[12rem] font-black tracking-tighter text-foreground/10 uppercase font-display italic whitespace-nowrap"
                        style={{
                            WebkitTextStroke: '2px var(--color-text-primary)',
                            opacity: 0.2
                        }}
                    >
                        {val}
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <div className="text-xs font-bold uppercase tracking-[0.8em] text-accent-action mb-8 animate-pulse">
                    Transmission Detected
                </div>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent-action to-transparent opacity-50" />
            </div>

            {/* Radial overlay to darken the edges - using background variable */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_80%)] pointer-events-none" />
        </div>
    );
};

export default EthosTunnel;
