import type { Metadata } from 'next';
import React from 'react';
import ProjectIDE from '@/components/ProjectIDE/ProjectIDE';

export const metadata: Metadata = {
    title: 'Projects | Mohit Lakhara — MERN Stack & React Portfolio',
    description: 'Browse Mohit Lakhara\'s full-stack MERN, React, and Next.js projects. Explore live demos, source code, and the technologies behind each build.',
    alternates: { canonical: '/projects' },
    openGraph: {
        title: 'Projects | Mohit Lakhara — MERN Stack & React Developer',
        description: 'Explore the full-stack MERN, Next.js, and React projects built by Mohit Lakhara. Interactive IDE-style portfolio showcase.',
        url: 'https://mohitlakhara.vercel.app/projects',
        siteName: 'Mohit Lakhara Portfolio',
        images: [
            {
                url: 'https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-projects.webp',
                width: 1200,
                height: 630,
                alt: 'Projects by Mohit Lakhara — MERN Stack Developer',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Mohit Lakhara — MERN Stack Developer',
        description: 'Live demos and source code for Mohit Lakhara\'s full-stack projects built with React, Node.js, MongoDB, and Next.js.',
        images: ['https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-projects.webp'],
    },
};

export default function ProjectsPage() {
    return (
        <main className="relative w-full h-screen bg-[#050505] text-white overflow-hidden">
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10 w-full h-full">
                <ProjectIDE />
            </div>
        </main>
    );
}
