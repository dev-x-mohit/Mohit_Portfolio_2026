'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AboutHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                textRef.current,
                { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 50 },
                { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', y: 0, duration: 1.2, ease: 'power4.out' }
            )
                .fromTo(
                    subtextRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                    '-=0.6'
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center px-6 text-center select-none">
            <h1
                ref={textRef}
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-foreground via-accent-action to-accent-highlight"
            >
                I AM <br /> MOHIT LAKHARA
            </h1>
            <p
                ref={subtextRef}
                className="text-xl md:text-2xl text-text-secondary max-w-2xl font-light italic"
            >
                &quot;Defining the future of digital expression through code and creativity.&quot;
            </p>

            <div className="absolute bottom-10 animate-bounce">
                <div className="w-px h-16 bg-gradient-to-b from-foreground/50 to-transparent" />
            </div>
        </section>
    );
};

export default AboutHero;
