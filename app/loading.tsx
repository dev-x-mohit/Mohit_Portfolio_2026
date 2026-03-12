'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 12;
            });
        }, 120);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: '#0A0A0B' }}>

            {/* Ambient glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    animation: 'pulse-glow 4s ease-in-out infinite',
                }} />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(112,0,255,0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'pulse-glow 4s ease-in-out infinite 2s',
                }} />

            {/* Starfield */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() > 0.8 ? '2px' : '1px',
                            height: Math.random() > 0.8 ? '2px' : '1px',
                            background: i % 3 === 0 ? '#00F0FF' : i % 3 === 1 ? '#7000FF' : '#ffffff',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.7 + 0.1,
                            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Central spinner + emblem */}
            <div className="relative flex items-center justify-center mb-10">
                {/* Outer orbit ring */}
                <svg
                    width="160" height="160"
                    className="absolute"
                    style={{ animation: 'spin-slow 4s linear infinite' }}>
                    <circle
                        cx="80" cy="80" r="70"
                        fill="none"
                        stroke="url(#orbitGrad)"
                        strokeWidth="1"
                        strokeDasharray="12 8"
                    />
                    <defs>
                        <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#7000FF" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Inner orbit ring */}
                <svg
                    width="110" height="110"
                    className="absolute"
                    style={{ animation: 'spin-slow 3s linear infinite reverse' }}>
                    <circle
                        cx="55" cy="55" r="48"
                        fill="none"
                        stroke="#7000FF"
                        strokeWidth="1"
                        strokeDasharray="6 10"
                        strokeOpacity="0.5"
                    />
                </svg>

                {/* Orbiting dot — outer */}
                <div className="absolute"
                    style={{
                        width: '160px', height: '160px',
                        animation: 'spin-slow 4s linear infinite',
                    }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-[0_0_10px_2px_rgba(0,240,255,0.8)]"
                        style={{ background: '#00F0FF' }} />
                </div>

                {/* ML monogram */}
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(112,0,255,0.08))',
                        border: '1px solid rgba(0,240,255,0.2)',
                        boxShadow: '0 0 30px rgba(0,240,255,0.1), inset 0 0 20px rgba(112,0,255,0.05)',
                    }}>
                    <span
                        className="text-2xl font-bold tracking-wider select-none"
                        style={{
                            fontFamily: 'var(--font-orbitron)',
                            background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                        ML
                    </span>
                </div>
            </div>

            {/* Loading label */}
            <p className="text-xs tracking-[0.4em] uppercase mb-6 select-none"
                style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    color: '#00F0FF',
                    opacity: 0.7,
                    animation: 'fade-pulse 2s ease-in-out infinite',
                }}>
                Initializing...
            </p>

            {/* Progress bar */}
            <div className="relative w-64 h-[2px] rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div
                    className="absolute left-0 top-0 h-full rounded-full transition-all duration-150"
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                        background: 'linear-gradient(90deg, #7000FF, #00F0FF)',
                        boxShadow: '0 0 8px rgba(0,240,255,0.6)',
                    }}
                />
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.9; transform: scale(1.5); }
                }
                @keyframes fade-pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.9; }
                }
            `}</style>
        </div>
    );
}
