'use client';

import React from 'react';
import { Search, Settings, Star, Download, Box } from 'lucide-react';
import {
    FaReact, FaNodeJs, FaDocker, FaPython, FaJava, FaGitAlt, FaGithub, FaNpm
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTailwindcss, SiRedux, SiReactquery, SiReactrouter, SiExpo, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiMongodb, SiPostgresql, SiGraphql, SiApollographql, SiPrisma, SiSupabase, SiFirebase, SiVite, SiWebpack, SiBabel, SiEslint, SiPrettier, SiFramer, SiStorybook, SiCypress, SiJest, SiTestinglibrary
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

const EXTENSIONS = [
    { id: 'react', name: 'React', author: 'facebook', downloads: '2B+', description: 'The library for web and native user interfaces', icon: <FaReact className="text-[#61DAFB]" /> },
    { id: 'react-native', name: 'React Native', author: 'facebook', downloads: '1B+', description: 'Framework for building native apps using React', icon: <TbBrandReactNative className="text-[#61DAFB]" /> },
    { id: 'next', name: 'Next.js', author: 'vercel', downloads: '500M+', description: 'The React Framework for the Web', icon: <SiNextdotjs className="text-white" /> },
    { id: 'typescript', name: 'TypeScript', author: 'microsoft', downloads: '2B+', description: 'JavaScript with syntax for types', icon: <SiTypescript className="text-[#3178C6]" /> },
    { id: 'tailwind', name: 'Tailwind CSS', author: 'tailwindlabs', downloads: '600M+', description: 'A utility-first CSS framework', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { id: 'redux', name: 'Redux Toolkit', author: 'reduxjs', downloads: '800M+', description: 'State management for JavaScript apps', icon: <SiRedux className="text-[#764ABC]" /> },
    { id: 'react-query', name: 'TanStack Query', author: 'tanstack', downloads: '400M+', description: 'Powerful asynchronous state management', icon: <SiReactquery className="text-[#FF4154]" /> },
    { id: 'react-router', name: 'React Router', author: 'remix-run', downloads: '900M+', description: 'Declarative routing for React', icon: <SiReactrouter className="text-[#CA4245]" /> },
    { id: 'prisma', name: 'Prisma', author: 'prisma', downloads: '150M+', description: 'Next-generation Node.js and TypeScript ORM', icon: <SiPrisma className="text-white" /> },
    { id: 'supabase', name: 'Supabase', author: 'supabase', downloads: '50M+', description: 'The Open Source Firebase Alternative', icon: <SiSupabase className="text-[#3ECF8E]" /> },
    { id: 'firebase', name: 'Firebase', author: 'google', downloads: '300M+', description: 'App development platform by Google', icon: <SiFirebase className="text-[#FFCA28]" /> },
    { id: 'graphql', name: 'GraphQL', author: 'graphql', downloads: '400M+', description: 'A query language for your API', icon: <SiGraphql className="text-[#E10098]" /> },
    { id: 'vite', name: 'Vite', author: 'vitejs', downloads: '200M+', description: 'Next Generation Frontend Tooling', icon: <SiVite className="text-[#646CFF]" /> },
    { id: 'framer-motion', name: 'Framer Motion', author: 'framer', downloads: '250M+', description: 'Open source, production-ready motion library', icon: <SiFramer className="text-white" /> },
    { id: 'expo', name: 'Expo', author: 'expo', downloads: '100M+', description: 'Make any app. Run it everywhere', icon: <SiExpo className="text-white" /> },
    { id: 'storybook', name: 'Storybook', author: 'storybookjs', downloads: '100M+', description: 'Frontend workshop for building UI components', icon: <SiStorybook className="text-[#FF4785]" /> },
    { id: 'cypress', name: 'Cypress', author: 'cypress-io', downloads: '80M+', description: 'Fast, easy and reliable testing for anything that runs in a browser', icon: <SiCypress className="text-[#69D3A7]" /> },
    { id: 'jest', name: 'Jest', author: 'facebook', downloads: '2B+', description: 'Delightful JavaScript Testing', icon: <SiJest className="text-[#C21325]" /> },
    { id: 'docker', name: 'Docker', author: 'docker', downloads: '1B+', description: 'Empowering App Development for Developers', icon: <FaDocker className="text-[#2496ED]" /> },
    { id: 'python', name: 'Python', author: 'python', downloads: '500M+', description: 'IntelliSense, linting, debugging for Python', icon: <FaPython className="text-[#3776AB]" /> },
];

export default function ExtensionsSidebar() {
    return (
        <div className="h-full flex flex-col bg-[var(--ide-bg-sidebar)] text-[var(--ide-fg-primary)]">
            {/* Header */}
            <div className="h-9 px-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ide-fg-secondary)] shrink-0">
                <Box size={14} />
                <span>Libraries & Tools</span>
            </div>

            {/* Search Input */}
            <div className="px-4 mb-2">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Libraries..."
                        className="w-full bg-[var(--ide-bg-panel)] border border-[var(--ide-border)] rounded-sm py-1 pl-2 pr-2 text-xs focus:outline-none focus:border-[var(--ide-accent)] placeholder:text-[var(--ide-fg-secondary)]/50"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="px-4 py-2 text-[10px] font-bold uppercase text-[var(--ide-fg-secondary)] opacity-70">
                    Most Popular
                </div>

                <div className="flex flex-col pb-4">
                    {EXTENSIONS.map(ext => (
                        <div key={ext.id} className="px-4 py-2.5 hover:bg-[var(--ide-bg-panel)] cursor-pointer flex gap-3 group border-l-2 border-transparent hover:border-[var(--ide-accent)] transition-colors">
                            <div className="w-9 h-9 bg-[var(--ide-bg-workspace)] border border-[var(--ide-border)] rounded flex items-center justify-center text-xl shadow-sm shrink-0">
                                {ext.icon}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="font-bold text-xs truncate text-[var(--ide-fg-primary)]">{ext.name}</span>
                                    <span className="text-[9px] bg-[var(--ide-bg-workspace)] px-1.5 py-0.5 rounded text-[var(--ide-accent)] font-mono opacity-80">vLatest</span>
                                </div>
                                <div className="text-[10px] text-[var(--ide-fg-secondary)] truncate leading-tight opacity-80">{ext.description}</div>
                                <div className="flex items-center gap-3 mt-1.5 text-[9px] text-[var(--ide-fg-secondary)] opacity-60">
                                    <span className="flex items-center gap-1"><span className="font-semibold text-[var(--ide-fg-primary)]">{ext.author}</span></span>
                                    <span className="flex items-center gap-0.5"><Download size={8} /> {ext.downloads}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
