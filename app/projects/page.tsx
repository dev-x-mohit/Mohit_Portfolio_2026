import type { Metadata } from 'next';
import React from 'react';
import ProjectDirectory from '@/components/ProjectsPage/ProjectDirectory';

export const metadata: Metadata = {
    title: 'Projects | Mohit Lakhara — MERN Stack & React Portfolio',
    description: 'Browse Mohit Lakhara\'s full-stack MERN, React, and Next.js projects. Explore live demos, source code, and the technologies behind each build.',
    alternates: { canonical: '/projects' },
    openGraph: {
        title: 'Projects | Mohit Lakhara — MERN Stack & React Developer',
        description: 'Explore the full-stack MERN, Next.js, and React projects built by Mohit Lakhara. Interactive portfolio showcase.',
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
        <main className="w-full bg-primary-bg text-foreground min-h-[100svh]">
            <ProjectDirectory />
        </main>
    );
}
