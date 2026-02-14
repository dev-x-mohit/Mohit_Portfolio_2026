'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import NeuralCanvas from '@/components/NeuralCanvas';

export default function ContactPage() {
    return (
        <main className="relative min-h-screen w-full bg-[#030712] text-white overflow-hidden">
            {/* Background */}
            <NeuralCanvas />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32 flex flex-col items-center">
                <header className="mb-20 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.5em] text-[var(--accent-action)] block mb-6">
                            Connect with the Source
                        </span>
                        <h1 className="text-6xl md:text-9xl font-bold font-display tracking-tighter mb-8 italic">
                            INITIATE <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--accent-action)' }}>TRANSMISSION.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Ready to collaborate on the next digital frontier? Send a secure message and let&apos;s build something extraordinary.
                        </p>
                    </motion.div>
                </header>

                <div className="w-full max-w-3xl">
                    <ContactForm />
                </div>
            </div>

            {/* Background ambient glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--accent-action)]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--accent-highlight)]/10 blur-[120px] rounded-full pointer-events-none" />
        </main>
    );
}
