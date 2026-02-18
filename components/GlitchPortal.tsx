'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlitchPortalProps {
    isVisible: boolean;
    children: React.ReactNode;
}

const GlitchPortal = ({ isVisible, children }: GlitchPortalProps) => {
    const strips = 12;

    return (
        <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
            <AnimatePresence>
                {isVisible && (
                    <div className="absolute inset-0 flex flex-col pointer-events-auto">
                        {Array.from({ length: strips }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: i % 2 === 0 ? '-100%' : '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: i % 2 === 0 ? '-100%' : '100%' }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.76, 0, 0.24, 1],
                                    delay: i * 0.05
                                }}
                                className="flex-1 bg-black border-y border-white/5 relative overflow-hidden"
                            >
                                {/* We can add a high-speed motion blur or scanline effect here */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10" />
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.6 }}
                        className="fixed inset-0 z-[210] overflow-y-auto pointer-events-auto"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

import { AnimatePresence } from 'framer-motion';
export default GlitchPortal;
