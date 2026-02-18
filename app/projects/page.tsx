'use client';

import React from 'react';
import ProjectIDE from '@/components/ProjectIDE/ProjectIDE';

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

            {/* Cyber Footer - Keeping it as it might be desired, but user said 'remove bottom bar'. 
                Wait, 'remove bottom bar' might refer to the IDE status bar. 
                I will keep this page footer for now unless 'bottom bar' meant this one. 
                Actually, usually 'bottom bar' in IDE context is the status bar I added.
                I will comment out this footer just in case the user meant this one too, or if it overlaps. 
                The IDE is now full screen, so this footer would overlay or be hidden. 
                I'll remove it to be safe and clean.
             */}
        </main>
    );
}
