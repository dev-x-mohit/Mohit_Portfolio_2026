'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LiquidBlobProps {
    image: string;
    alt: string;
    isHovered: boolean;
    mousePosition: { x: number; y: number };
}

const LiquidBlob = ({ image, alt, isHovered, mousePosition }: LiquidBlobProps) => {
    // Unique ID for the filter to avoid collisions if multiple blobs are used
    const filterId = useMemo(() => `liquid-filter-${Math.random().toString(36).substr(2, 9)}`, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id={filterId}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="liquid"
                        />
                        <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <motion.div
                className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden"
                style={{ filter: `url(#${filterId})` }}
                animate={{
                    borderRadius: isHovered ? "40px" : "60% 40% 30% 70% / 60% 30% 70% 40%",
                    scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                    borderRadius: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
                    scale: { type: "spring", stiffness: 300, damping: 20 }
                }}
            >
                <motion.div
                    className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]"
                    animate={{
                        x: (mousePosition.x - 0.5) * 40,
                        y: (mousePosition.y - 0.5) * 40,
                    }}
                >
                    <img
                        src={image}
                        alt={alt}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Mercury Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
            </motion.div>
        </div>
    );
};

export default LiquidBlob;
