'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin } from 'lucide-react';


const About = () => {
    return (
        <section id="about" className="relative w-full py-20 px-6 bg-background text-foreground overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header / Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 max-w-3xl"
                >
                    <h2 className="text-sm font-medium text-accent-action tracking-wider uppercase">About Me</h2>
                    <h3 className="text-4xl md:text-5xl font-bold leading-tight font-display">
                        Bridging the gap between <span className="text-accent-highlight">design</span> and <span className="text-accent-action">functionality</span>.
                    </h3>
                    <p className="text-text-secondary text-lg leading-relaxed font-sans">
                        I am a Full-Stack Developer and BCA student at Lachoo Memorial College, dedicated to building high-performance, user-centric web and mobile experiences. Currently, I am actively working as a Full-stack App and Web Developer at <span className="text-foreground font-medium">Fudode</span>, where I leverage the MERN stack, Next.js, and React Native (Expo) to create scalable digital solutions.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-text-secondary pt-2">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-accent-action" />
                            Jodhpur, Rajasthan, India
                        </div>
                        <a href="mailto:mohitlakhara78500@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                            <Mail size={16} className="text-accent-highlight" />
                            mohitlakhara78500@gmail.com
                        </a>
                        <a href="https://www.linkedin.com/in/mohitlakharaind" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                            <Linkedin size={16} className="text-accent-highlight" />
                            LinkedIn
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-accent-action/2 opacity-[0.4] dark:opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-accent-highlight/2 opacity-[0.4] dark:opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

        </section>
    );
};

export default About;
