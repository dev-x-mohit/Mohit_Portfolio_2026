'use client';
import { Check, ServerConnection, Globe, Lock } from 'iconoir-react';


import React, { useState } from 'react';
import { motion } from 'framer-motion';


const SuccessOverlay = ({ onClose }: { onClose: () => void }) => {
    const [nodes] = useState<{ x: number, y: number, id: number }[]>(() =>
        Array.from({ length: 15 }).map((_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            id: i
        }))
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712]/95 backdrop-blur-2xl px-6"
        >
            {/* Neural Link Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <svg className="w-full h-full">
                    {nodes.map((node, i) => (
                        <React.Fragment key={node.id}>
                            <motion.circle
                                cx={`${node.x}%`}
                                cy={`${node.y}%`}
                                r="2"
                                fill="var(--accent-action)"
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                            />
                            {nodes.slice(i + 1, i + 3).map((target, j) => (
                                <motion.line
                                    key={`${node.id}-${target.id}`}
                                    x1={`${node.x}%`}
                                    y1={`${node.y}%`}
                                    x2={`${target.x}%`}
                                    y2={`${target.y}%`}
                                    stroke="var(--accent-action)"
                                    strokeWidth="0.5"
                                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 4, repeat: Infinity, delay: (i + j) * 0.3 }}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </svg>
            </div>

            <motion.div
                initial={{ scale: 0.9, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="max-w-lg w-full text-center space-y-10 relative z-10"
            >
                <div className="relative inline-block">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                        className="w-32 h-32 bg-gradient-to-tr from-[var(--accent-action)] to-[var(--accent-highlight)] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(var(--accent-action-rgb),0.4)] border-4 border-white/20"
                    >
                        <Check width={64} height={64} className="text-white drop-shadow-lg" />
                    </motion.div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-8 border-2 border-dashed border-[var(--accent-action)]/20 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-12 border border-[var(--accent-action)]/10 rounded-full"
                    />
                </div>

                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-5xl font-black italic tracking-tighter mb-2">TRANSMISSION <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--accent-action)' }}>SECURED.</span></h2>
                        <div className="h-0.5 w-24 bg-[var(--accent-action)] mx-auto rounded-full" />
                    </motion.div>

                    <p className="text-gray-400 font-light text-xl leading-relaxed max-w-md mx-auto">
                        Packet successfully routed through secure nodes. Connection strength optimal.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[
                        { icon: ServerConnection, label: "ENCRYPTED" },
                        { icon: Globe, label: "BROADCAST" },
                        { icon: Lock, label: "VERIFIED" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + (i * 0.1) }}
                            className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <item.icon width={20} height={20} className="text-[var(--accent-action)]" />
                            <span className="text-[9px] font-black tracking-[0.2em] text-gray-400">{item.label}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,1)', color: 'rgba(0,0,0,1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="w-full py-5 text-sm font-black uppercase tracking-[0.6em] text-white border border-[var(--accent-action)]/30 rounded-2xl transition-all shadow-[0_0_20px_var(--accent-action)]"
                >
                    RETURN TO INTERFACE
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default SuccessOverlay;
