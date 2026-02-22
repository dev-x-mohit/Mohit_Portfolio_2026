'use client';
import { Send, Refresh } from 'iconoir-react';



import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
                // Auto revert status on error
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const inputClasses = "w-full bg-secondary-bg/50 border border-border/10 rounded-xl px-4 py-3 outline-none focus:border-accent-action/50 focus:bg-secondary-bg/80 transition-all duration-300 placeholder:text-text-secondary/60 text-foreground font-light";

    return (
        <div className="relative">
            {status === 'success' && <SuccessOverlay onClose={() => setStatus('idle')} />}

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 bg-secondary-bg/20 backdrop-blur-xl p-8 rounded-3xl border border-border/10 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-action/5 via-transparent to-accent-highlight/5 pointer-events-none" />

                <div className="space-y-2 relative z-10">
                    <label className="text-sm font-medium text-text-secondary ml-1">Name</label>
                    <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className={inputClasses}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="space-y-2 relative z-10">
                    <label className="text-sm font-medium text-text-secondary ml-1">Email</label>
                    <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className={inputClasses}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2 relative z-10">
                    <label className="text-sm font-medium text-text-secondary ml-1">Message</label>
                    <textarea
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        className={`${inputClasses} resize-none`}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 mt-4 bg-accent-action text-background font-bold rounded-xl hover:bg-accent-highlight transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {status === 'loading' ? (
                            <Refresh className="animate-spin" width={20} height={20} />
                        ) : (
                            <>
                                Send Message <Send width={18} height={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
            </motion.form>
        </div>
    );
};

export default ContactForm;
