'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Send, Loader2, Zap, Radio, Shield, Fingerprint } from 'lucide-react';
import SuccessOverlay from './SuccessOverlay';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Mouse tracking for scanner effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const scanX = useSpring(mouseX, springConfig);
    const scanY = useSpring(mouseY, springConfig);

    const formRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!formRef.current) return;
        const rect = formRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const completion = useMemo(() => {
        const fields = Object.values(formData);
        const filled = fields.filter(f => f.trim().length > 0).length;
        return (filled / fields.length) * 100;
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        setTimeout(() => {
            setStatus('success');
        }, 2000);
    };

    const inputClasses = "w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[var(--accent-action)]/50 focus:bg-white/[0.05] transition-all duration-500 placeholder:text-gray-700 text-white font-light group/input";

    return (
        <div className="relative" ref={formRef} onMouseMove={handleMouseMove}>
            <AnimatePresence>
                {status === 'success' && (
                    <SuccessOverlay onClose={() => setStatus('idle')} />
                )}
            </AnimatePresence>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative space-y-8 bg-black/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden group/form"
            >
                {/* Holographic Scanner Overlay */}
                <motion.div
                    style={{ x: scanX, y: scanY }}
                    className="absolute -inset-20 w-40 h-40 bg-[var(--accent-action)]/10 blur-[80px] rounded-full pointer-events-none z-0 mix-blend-screen opacity-0 group-hover/form:opacity-100 transition-opacity duration-500"
                />

                {/* Signal Strength Meter */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[var(--accent-action)]/10 text-[var(--accent-action)]">
                            <Radio size={16} className={completion > 0 ? "animate-pulse" : ""} />
                        </div>
                        <div>
                            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Transmission Integrity</span>
                            <div className="h-1 w-32 bg-white/5 rounded-full mt-1 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${completion}%` }}
                                    className="h-full bg-gradient-to-r from-[var(--accent-action)] to-[var(--accent-highlight)] shadow-[0_0_10px_var(--accent-action)]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-[10px] font-black text-[var(--accent-action)]/50 flex items-center gap-2">
                        <Zap size={12} /> {Math.round(completion)}% OPTIMIZED
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-3 group/field">
                        <motion.label
                            initial={false}
                            animate={{ x: formData.name ? 5 : 0, color: formData.name ? 'var(--accent-action)' : '#6b7280' }}
                            className="block text-[10px] font-black uppercase tracking-[0.2em] ml-2"
                        >
                            01_IDENTITY_MARKER
                        </motion.label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Alan Turing"
                            className={inputClasses}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3 group/field">
                        <motion.label
                            initial={false}
                            animate={{ x: formData.email ? 5 : 0, color: formData.email ? 'var(--accent-action)' : '#6b7280' }}
                            className="block text-[10px] font-black uppercase tracking-[0.2em] ml-2"
                        >
                            02_COMM_CHANNEL
                        </motion.label>
                        <input
                            required
                            type="email"
                            placeholder="alan@enigma.com"
                            className={inputClasses}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-3 relative z-10 group/field">
                    <motion.label
                        initial={false}
                        animate={{ x: formData.subject ? 5 : 0, color: formData.subject ? 'var(--accent-action)' : '#6b7280' }}
                        className="block text-[10px] font-black uppercase tracking-[0.2em] ml-2"
                    >
                        03_CORE_PROTOCOL
                    </motion.label>
                    <input
                        required
                        type="text"
                        placeholder="Collaboration / Feedback / Inquiry"
                        className={inputClasses}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                </div>

                <div className="space-y-3 relative z-10 group/field">
                    <motion.label
                        initial={false}
                        animate={{ x: formData.message ? 5 : 0, color: formData.message ? 'var(--accent-action)' : '#6b7280' }}
                        className="block text-[10px] font-black uppercase tracking-[0.2em] ml-2"
                    >
                        04_DATA_PAYLOAD
                    </motion.label>
                    <textarea
                        required
                        rows={6}
                        placeholder="Define your transmission parameters..."
                        className={`${inputClasses} resize-none`}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <div className="pt-4 relative z-10">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={status === 'loading'}
                        className="w-full relative group h-20 bg-[var(--accent-action)] text-black font-black uppercase tracking-[0.5em] rounded-2xl overflow-hidden disabled:bg-gray-800 disabled:text-gray-500 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] border border-white/10"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-4">
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <span>ENCRYPT & BROADCAST</span>
                                    <Send className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" size={20} />
                                </>
                            )}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-action)] via-[var(--accent-highlight)] to-[var(--accent-action)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <motion.div
                            className="absolute top-0 left-0 w-24 h-full bg-white/20 skew-x-[45deg] -translate-x-32 group-hover:animate-shimmer"
                            initial={false}
                        />
                    </motion.button>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-gray-600">
                            <Fingerprint size={12} className="text-gray-700" /> AUTH_V_OK
                        </div>
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-gray-600">
                            <Shield size={12} className="text-gray-700" /> PGP_2048
                        </div>
                    </div>
                    <div className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--accent-action)]/50 animate-pulse">
                        Listening for input...
                    </div>
                </div>
            </motion.form>
        </div>
    );
};

export default ContactForm;
