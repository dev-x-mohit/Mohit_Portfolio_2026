'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NotFound() {
    const glitchRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = glitchRef.current;
        if (!el) return;

        let frame: number;
        const chars = '!<>-_\\/[]{}—=+*^?#@$%&~';

        function scramble() {
            const text = '404';
            let output = '';
            const scrambleChance = 0.2;
            for (let i = 0; i < text.length; i++) {
                if (Math.random() < scrambleChance) {
                    output += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    output += text[i];
                }
            }
            if (el) el.textContent = output;
            frame = requestAnimationFrame(scramble);
        }

        const timeout = setTimeout(() => {
            scramble();
            setTimeout(() => {
                cancelAnimationFrame(frame);
                if (el) el.textContent = '404';
            }, 1000);
        }, 600);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <main
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
            style={{ background: '#0A0A0B' }}
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(112,0,255,0.1) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }} />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }} />
            </div>

            {/* Starfield */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 80 }).map((_, i) => (
                    <div key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() > 0.85 ? '2px' : '1px',
                            height: Math.random() > 0.85 ? '2px' : '1px',
                            background: i % 4 === 0 ? '#00F0FF' : i % 4 === 1 ? '#7000FF' : '#ffffff',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.6 + 0.1,
                            animation: `twinkle-404 ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 4}s`,
                        }} />
                ))}
            </div>

            {/* Horizontal scan line */}
            <div className="absolute inset-x-0 pointer-events-none"
                style={{ animation: 'scan 6s linear infinite' }}>
                <div className="w-full h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">

                {/* 404 glitch number */}
                <div className="relative mb-6">
                    <span
                        ref={glitchRef}
                        className="block font-bold leading-none"
                        style={{
                            fontFamily: 'var(--font-orbitron)',
                            fontSize: 'clamp(120px, 22vw, 240px)',
                            background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 30px rgba(0,240,255,0.3))',
                            animation: 'glitch-shadow 4s ease-in-out infinite',
                        }}>
                        404
                    </span>

                    {/* Glitch duplicate layers */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 block font-bold leading-none pointer-events-none"
                        style={{
                            fontFamily: 'var(--font-orbitron)',
                            fontSize: 'clamp(120px, 22vw, 240px)',
                            color: '#00F0FF',
                            opacity: 0.08,
                            transform: 'translate(-4px, 2px)',
                            animation: 'glitch-left 4s ease-in-out infinite',
                        }}>
                        404
                    </span>
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 block font-bold leading-none pointer-events-none"
                        style={{
                            fontFamily: 'var(--font-orbitron)',
                            fontSize: 'clamp(120px, 22vw, 240px)',
                            color: '#7000FF',
                            opacity: 0.08,
                            transform: 'translate(4px, -2px)',
                            animation: 'glitch-right 4s ease-in-out infinite 0.5s',
                        }}>
                        404
                    </span>
                </div>

                {/* Eyebrow tag */}
                <p className="text-xs tracking-[0.5em] uppercase mb-4"
                    style={{
                        fontFamily: 'var(--font-jetbrains-mono)',
                        color: '#00F0FF',
                        opacity: 0.6,
                    }}>
                    // Error: Signal_Lost
                </p>

                {/* Main heading */}
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
                    style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        color: '#F9F9F9',
                        letterSpacing: '-0.02em',
                    }}>
                    Lost in the Cosmos
                </h1>

                {/* Sub text */}
                <p className="text-base md:text-lg max-w-md mb-12 leading-relaxed"
                    style={{ color: '#888888', fontFamily: 'var(--font-outfit)' }}>
                    The page you're looking for has drifted beyond the event horizon.
                    Let's navigate you back to familiar coordinates.
                </p>

                {/* CTA Button */}
                <Link href="/"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase overflow-hidden transition-all duration-300"
                    style={{
                        fontFamily: 'var(--font-orbitron)',
                        color: '#0A0A0B',
                        background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
                        boxShadow: '0 0 30px rgba(0,240,255,0.3)',
                        letterSpacing: '0.12em',
                    }}>
                    {/* Hover shimmer */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)' }} />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Return to Base
                </Link>

                {/* Coordinates */}
                <p className="mt-8 text-xs"
                    style={{
                        fontFamily: 'var(--font-jetbrains-mono)',
                        color: '#888888',
                        opacity: 0.4,
                    }}>
                    mohitlakhara.vercel.app / 0x404
                </p>
            </div>

            <style>{`
                @keyframes twinkle-404 {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.4); }
                }
                @keyframes scan {
                    0% { top: -5%; }
                    100% { top: 105%; }
                }
                @keyframes glitch-shadow {
                    0%, 90%, 100% { filter: drop-shadow(0 0 30px rgba(0,240,255,0.3)); }
                    92% { filter: drop-shadow(-5px 0 rgba(0,240,255,0.8)) drop-shadow(5px 0 rgba(112,0,255,0.8)); }
                    94% { filter: drop-shadow(0 0 30px rgba(0,240,255,0.3)); }
                }
                @keyframes glitch-left {
                    0%, 90%, 100% { transform: translate(-4px, 2px); opacity: 0.06; }
                    92% { transform: translate(-8px, -2px); opacity: 0.3; }
                    94% { transform: translate(-4px, 2px); opacity: 0.06; }
                }
                @keyframes glitch-right {
                    0%, 90%, 100% { transform: translate(4px, -2px); opacity: 0.06; }
                    92% { transform: translate(8px, 3px); opacity: 0.3; }
                    94% { transform: translate(4px, -2px); opacity: 0.06; }
                }
            `}</style>
        </main>
    );
}
