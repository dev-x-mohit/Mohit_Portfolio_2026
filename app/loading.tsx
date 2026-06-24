'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Simulate uneven loading progress
                return p + Math.floor(Math.random() * 10) + 1;
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden font-sans">
            {/* Ambient Background - matches Hero */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--background)_95%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] z-0 pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 flex flex-col items-center gap-12">
                {/* Minimalist Orb / Spinner */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Outer Ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-[1px] border-t-[var(--gold-light)] border-r-transparent border-b-[var(--gold-primary)] border-l-transparent opacity-70"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner Ring */}
                    <motion.div
                        className="absolute inset-4 rounded-full border-[1px] border-t-transparent border-r-[var(--gold-primary)] border-b-transparent border-l-[var(--gold-light)] opacity-50"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Core Pulse */}
                    <motion.div
                        className="absolute w-1.5 h-1.5 bg-foreground rounded-full"
                        animate={{ 
                            scale: [1, 1.5, 1], 
                            opacity: [0.3, 1, 0.3], 
                            boxShadow: ["0 0 0px var(--foreground)", "0 0 15px var(--foreground)", "0 0 0px var(--foreground)"] 
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Typography & Progress */}
                <div className="flex flex-col items-center gap-5 text-center w-full max-w-xs">
                    <motion.div 
                        className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-foreground/60 font-light"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Initializing Experience
                    </motion.div>
                    
                    {/* Progress Bar Container */}
                    <div className="w-48 h-[1px] bg-foreground/10 overflow-hidden relative">
                        {/* Progress Fill */}
                        <motion.div 
                            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold-dark)]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
