
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Project, projects as projectData } from '@/data/projectData';
import { SkillCategory, skillCategories } from '@/data/skillsData';
import { TimelineItem, timelineData } from '@/data/experienceData';
import { Certification, certifications } from '@/data/certificationsData';
import { FeaturedProject, featuredProjects } from '@/data/featuredProjectsData';

// Define the context interface
interface GlobalContextType {
    projects: Project[];
    skills: SkillCategory[];
    experience: TimelineItem[];
    certifications: Certification[];
    featuredProjects: FeaturedProject[];
}

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider Component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const value = {
        projects: projectData,
        skills: skillCategories,
        experience: timelineData,
        certifications: certifications,
        featuredProjects: featuredProjects
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook
export const useGlobalData = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalData must be used within a GlobalProvider');
    }
    return context;
};
