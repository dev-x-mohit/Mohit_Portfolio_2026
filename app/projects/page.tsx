'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectFilters from '@/components/ProjectFilters';
import ProjectShowcase from '@/components/ProjectShowcase';
import NeuralCanvas from '@/components/NeuralCanvas';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
}

const projectsData: Project[] = [
    {
        id: 1,
        title: "NeuroSync API",
        category: "Backend",
        description: "High-performance distributed systems with 99.9% uptime and real-time synchronization.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        tags: ["Go", "Kafka", "Postgres"]
    },
    {
        id: 2,
        title: "Prism UI Kit",
        category: "Frontend",
        description: "A futuristic design system focused on refractive materials and fluid motion.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        tags: ["React", "TailwindCSS", "Framer Motion"]
    },
    {
        id: 3,
        title: "Aura Mobile",
        category: "Mobile",
        description: "Immersive wellbeing application with bioscanning integrations and calming visuals.",
        image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop",
        tags: ["React Native", "Expo", "Reanimated"]
    },
    {
        id: 4,
        title: "Echo Cloud",
        category: "Cloud",
        description: "Scalable serverless infrastructure optimized for global edge computing.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
        tags: ["AWS", "Terraform", "Serverless"]
    },
    {
        id: 5,
        title: "Vortex Engine",
        category: "Backend",
        description: "Custom physics and rendering engine for decentralized gaming experiences.",
        image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop",
        tags: ["Rust", "Wasm", "WebGL"]
    },
    {
        id: 6,
        title: "Nexus Dashboard",
        category: "Frontend",
        description: "Complex data visualization platform with real-time analytics and predictive modeling.",
        image: "https://images.unsplash.com/photo-1551288049-bbdac8626ad1?q=80&w=2070&auto=format&fit=crop",
        tags: ["TypeScript", "D3.js", "Redux"]
    }
];

export default function ProjectsPage() {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    return (
        <main className="relative min-h-screen w-full bg-[#030712] text-white overflow-hidden">
            {/* Background */}
            <NeuralCanvas />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32">
                <header className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.5em] text-[var(--accent-action)] block mb-6">
                            Gallery of Creation
                        </span>
                        <h1 className="text-7xl md:text-9xl font-bold font-display tracking-tighter mb-8 italic">
                            SELECTED <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--accent-action)' }}>WORKS.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
                            A curated showcase of technical challenges converted into digital masterpieces. Exploring the limits of code and design.
                        </p>
                    </motion.div>
                </header>

                <ProjectFilters activeFilter={filter} setFilter={setFilter} />

                <div className="mt-20">
                    <ProjectShowcase projects={filteredProjects} />
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-600">
                <div className="h-px w-12 bg-gray-800" />
                EST 2026_COLLECTION
                <div className="h-px w-12 bg-gray-800" />
            </div>
        </main>
    );
}
