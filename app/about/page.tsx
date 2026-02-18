'use client';

import AboutHero from '@/components/AboutHero';
import StoryFlow from '@/components/StoryFlow';
import EthosTunnel from '@/components/EthosTunnel';
import CodePhilosophy from '@/components/CodePhilosophy';
import TheForge from '@/components/TheForge';
import ResumePulse from '@/components/ResumePulse';

export default function AboutPage() {
    return (
        <main className="relative min-h-screen w-full bg-transparent text-foreground overflow-hidden">
            {/* Background Layer */}

            {/* Content Layer */}
            <div className="relative z-10">
                <AboutHero />

                <StoryFlow />

                <CodePhilosophy />

                <TheForge />

                <EthosTunnel />

                <ResumePulse />
            </div>

            {/* Ambient noise or grain effect if desired, but Three.js handles it mostly */}
        </main>
    );
}
