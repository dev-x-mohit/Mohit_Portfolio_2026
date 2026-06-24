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
        date: '2023 - 2026',
        title: 'BCA Graduate',
        subtitle: 'Lachoo Memorial College',
        description: 'Built a strong foundation in software engineering, algorithms, and system design. My academic journey fueled a deep passion for solving complex problems with code.',
        icon: <Code width={16} height={16} />,
        color: 'text-[var(--gold-primary)]',
        borderColor: 'border-[var(--border)]',
        bgColor: 'bg-[var(--gold-primary)]',
        details: [
            { label: 'Degree', value: 'BCA' },
            { label: 'Focus', value: 'Software Engineering' }
        ]
    },
    {
        id: 2,
        date: 'Jan 2026 - May 2026',
        title: 'Full Stack Developer',
        subtitle: 'Fudode',
        description: 'Architected scalable full-stack applications over an impactful 4-month period. Responsible for the entire development lifecycle, from database design to frontend implementation and deployment.',
        icon: <Zap width={16} height={16} />,
        color: 'text-[var(--gold-light)]',
        borderColor: 'border-[var(--border)]',
        bgColor: 'bg-[var(--gold-light)]',
        details: [
            { label: 'Role', value: 'Full Stack Dev' },
            { label: 'Duration', value: '4 Months' }
        ]
    },
    {
        id: 3,
        date: '2026 - Ongoing',
        title: 'Freelance Developer & MCA',
        subtitle: 'JECRC University & Various Clients',
        description: 'Currently pursuing an MCA in Cloud Computing at JECRC University, Jaipur. After an impactful stint at Fudode, I am now engineering high-performance SaaS solutions and cinematic UIs as a Freelance Developer.',
        icon: <Briefcase width={16} height={16} />,
        color: 'text-[var(--gold-primary)]',
        borderColor: 'border-[var(--border)]',
        bgColor: 'bg-[var(--gold-primary)]',
        details: [
            { label: 'Education', value: 'MCA Cloud Computing' },
            { label: 'Role', value: 'Freelance Developer' }
        ]
    }
];
