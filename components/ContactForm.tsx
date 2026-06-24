'use client';
import { Send, Refresh, Check } from 'iconoir-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SuccessOverlay from './SuccessOverlay';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch("https://formspree.io/f/mzzeddwd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `New Contact Request from ${formData.name}`
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const inputClasses = "w-full bg-transparent border-b border-border/20 py-4 outline-none focus:border-accent-action transition-all duration-300 placeholder:text-text-secondary/40 text-2xl font-light text-foreground focus:ring-0";

    return (
        <div className="relative z-10 w-full">
            <AnimatePresence>
                {status === 'success' && <SuccessOverlay onClose={() => setStatus('idle')} />}
            </AnimatePresence>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-12"
            >
                <div className="space-y-2 group relative">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary block group-focus-within:text-accent-action transition-colors">
                        01 / What's your name?
                    </label>
                    <div className="relative">
                        <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className={inputClasses}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <div className="absolute bottom-0 left-0 h-[2px] bg-accent-action w-0 group-focus-within:w-full transition-all duration-500 ease-out" />
                    </div>
                </div>

                <div className="space-y-2 group relative">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary block group-focus-within:text-accent-action transition-colors">
                        02 / What's your email address?
                    </label>
                    <div className="relative">
                        <input
                            required
                            type="email"
                            placeholder="john@example.com"
                            className={inputClasses}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <div className="absolute bottom-0 left-0 h-[2px] bg-accent-action w-0 group-focus-within:w-full transition-all duration-500 ease-out" />
                    </div>
                </div>

                <div className="space-y-2 group relative">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary block group-focus-within:text-accent-action transition-colors">
                        03 / Tell me about your project
                    </label>
                    <div className="relative">
                        <textarea
                            required
                            rows={3}
                            placeholder="I need help with..."
                            className={`${inputClasses} resize-none`}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                        <div className="absolute bottom-1 left-0 h-[2px] bg-accent-action w-0 group-focus-within:w-full transition-all duration-500 ease-out" />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto px-10 py-5 mt-4 bg-foreground text-background font-bold text-lg rounded-full hover:bg-accent-action transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    <span className="flex items-center gap-2">
                        {status === 'loading' ? (
                            <Refresh className="animate-spin" width={24} height={24} />
                        ) : status === 'success' ? (
                            <>
                                Sent <Check width={24} height={24} />
                            </>
                        ) : status === 'error' ? (
                            'Error! Try Again'
                        ) : (
                            <>
                                Send Message <Send width={22} height={22} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </span>
                </motion.button>
            </motion.form>
        </div>
    );
};

export default ContactForm;
