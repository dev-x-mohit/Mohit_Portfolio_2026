
import React from 'react';
import { Calendar, Star as Award, Code, Globe, Flash as Zap, Suitcase as Briefcase } from 'iconoir-react';

export interface TimelineItem {
    id: number;
    date: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    bgColor: string;
    details: { label: string; value: string }[];
}

export const timelineData: TimelineItem[] = [
    {
        id: 1,
        date: 'Jan 2023',
        title: 'BCA - Computer Science',
        subtitle: 'Lachoo Memorial College',
        description: 'Building a strong foundation in software engineering, algorithms, and system design. My academic journey is fueled by a passion for solving complex problems with code.',
        icon: <Code width={16} height={16} />,
        color: 'text-accent-action',
        borderColor: 'border-accent-action',
        bgColor: 'bg-accent-action',
        details: [
            { label: 'Degree', value: 'BCA' },
            { label: 'Focus', value: 'Software Engineering' }
        ]
    },
    {
        id: 2,
        date: 'Oct 2024',
        title: 'Frontend Developer Intern',
        subtitle: 'TheWebsite Makers',
        description: 'Gained hands-on experience in building responsive, user-centric web interfaces. Collaborated with senior developers to implement pixel-perfect designs using React and Tailwind CSS.',
        icon: <Globe width={16} height={16} />,
        color: 'text-accent-highlight',
        borderColor: 'border-accent-highlight',
        bgColor: 'bg-accent-highlight',
        details: [
            { label: 'Key Tech', value: 'React, Tailwind' },
            { label: 'Role', value: 'Frontend Intern' }
        ]
    },
    {
        id: 3,
        date: '2025',
        title: 'Freelance Developer',
        subtitle: 'Various Clients',
        description: 'Delivered 4-5 high-impact projects across web and mobile platforms. Specialized in creating custom solutions tailored to client needs, ensuring scalable and performant architecture.',
        icon: <Briefcase width={16} height={16} />,
        color: 'text-accent-action',
        borderColor: 'border-accent-action',
        bgColor: 'bg-accent-action',
        details: [
            { label: 'Projects', value: '4-5 Delivered' },
            { label: 'Stack', value: 'Web & App' }
        ]
    },
    {
        id: 4,
        date: 'Jan 2026',
        title: 'Full Stack Developer',
        subtitle: 'Fudode',
        description: 'Currently architecting scalable full-stack applications. Responsible for the entire development lifecycle, from database design to frontend implementation and deployment.',
        icon: <Zap width={16} height={16} />,
        color: 'text-accent-highlight',
        borderColor: 'border-accent-highlight',
        bgColor: 'bg-accent-highlight',
        details: [
            { label: 'Role', value: 'Full Stack Dev' },
            { label: 'Stack', value: 'MERN, Next.js, React Native' }
        ]
    }
];
