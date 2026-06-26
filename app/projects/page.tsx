import type { Metadata } from 'next';
import React from 'react';
import ProjectDirectory from '@/components/ProjectsPage/ProjectDirectory';

export const metadata: Metadata = {
    title: 'Projects | Mohit Lakhara — Full Stack Developer Portfolio',
    description: 'Browse Mohit Lakhara\'s full-stack web and mobile projects built with React, Next.js, Node.js, and React Native. Explore live demos and source code.',
    alternates: { canonical: '/projects' },
    openGraph: {
        title: 'Projects | Mohit Lakhara — Full Stack Developer',
        description: 'Explore full-stack web and mobile projects built by Mohit Lakhara with React, Next.js, Node.js, and React Native.',
        url: 'https://mohitlakhara.vercel.app/projects',
        siteName: 'Mohit Lakhara Portfolio',
        images: [
            {
                url: 'https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-projects.webp',
                width: 1200,
                height: 630,
                alt: 'Projects by Mohit Lakhara — Full Stack Developer',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Mohit Lakhara — Full Stack Developer',
        description: 'Live demos and source code for Mohit Lakhara\'s full-stack projects built with React, Next.js, Node.js, and React Native.',
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
