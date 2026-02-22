'use client';

import AboutHero from '@/components/AboutHero';
import StoryFlow from '@/components/StoryFlow';
import CodePhilosophy from '@/components/CodePhilosophy';
import EthosTunnel from '@/components/EthosTunnel';
import ResumePulse from '@/components/ResumePulse';

// ── New Sections ──────────────────────────────────────────────────────────────
import SkillsShowcase from '@/components/SkillsShowcase';
import BuildProcess from '@/components/BuildProcess';
import ToolChest from '@/components/ToolChest';
import BeyondTheCode from '@/components/BeyondTheCode';

export default function AboutPage() {
    return (
        <main className="relative min-h-screen w-full bg-transparent text-foreground overflow-hidden">
            <div className="relative z-10">
                {/* ── Existing ── */}
                <AboutHero />
                <StoryFlow />
                <SkillsShowcase />
                <CodePhilosophy />

                {/* ── New: SDLC scroll experience ── */}
                <BuildProcess />

                <EthosTunnel />

                <ResumePulse />
                {/* ── New: personal + gear ── */}
                <BeyondTheCode />
                <ToolChest />
            </div>
        </main>
    );
}
