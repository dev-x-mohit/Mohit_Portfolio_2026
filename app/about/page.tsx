'use client';

import React from 'react';
import NeuralCanvas from '@/components/NeuralCanvas';
import AboutHero from '@/components/AboutHero';
import StoryFlow from '@/components/StoryFlow';
import CognitionGrid from '@/components/CognitionGrid';
import InterestCanvas from '@/components/InterestCanvas';
import TechStackStats from '@/components/TechStackStats';
import CreativeArsenal from '@/components/CreativeArsenal';
import EthosTunnel from '@/components/EthosTunnel';
import ProcessCanvas from '@/components/ProcessCanvas';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="relative min-h-screen w-full bg-transparent text-white overflow-hidden">
            {/* Background Layer */}
            <NeuralCanvas />

            {/* Content Layer */}
            <div className="relative z-10">
                <AboutHero />

                <StoryFlow />

                <EthosTunnel />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <CognitionGrid />
                </motion.div>

                <CreativeArsenal />

                <TechStackStats />

                <ProcessCanvas />

                <InterestCanvas />

                {/* Closing Quote / Footer Section */}
                <section className="py-24 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto p-12 rounded-[3rem] border border-white/5 bg-white/2 backdrop-blur-3xl"
                    >
                        <h2 className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed mb-8">
                            &quot;I don&apos;t just build websites; I build <span className="text-white font-medium">digital realities</span> that respond to the human touch.&quot;
                        </h2>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                        >
                            Let's Build Something
                        </a>
                    </motion.div>
                </section>
            </div>

            {/* Ambient noise or grain effect if desired, but Three.js handles it mostly */}
        </main>
    );
}
