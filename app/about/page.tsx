import type { Metadata } from 'next';
import AboutHero from '@/components/AboutHero';
import StoryFlow from '@/components/StoryFlow';
import CodePhilosophy from '@/components/CodePhilosophy';
import EthosTunnel from '@/components/EthosTunnel';
import ResumePulse from '@/components/ResumePulse';
import SkillsShowcase from '@/components/SkillsShowcase';
import BuildProcess from '@/components/BuildProcess';
import ToolChest from '@/components/ToolChest';
import BeyondTheCode from '@/components/BeyondTheCode';

export const metadata: Metadata = {
    title: 'About Mohit Lakhara | Full-Stack Developer Story & Skills',
    description: 'Learn about Mohit Lakhara — a MERN Stack Developer with a passion for crafting cinematic digital experiences. Explore his skills, philosophy, toolset, and development process.',
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'About Mohit Lakhara | Full-Stack Developer Story & Skills',
        description: 'Discover the story, skills, tools, and SDLC philosophy driving Mohit Lakhara\'s full-stack development work.',
        url: 'https://mohitlakhara.vercel.app/about',
        siteName: 'Mohit Lakhara Portfolio',
        images: [
            {
                url: 'https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-about.webp',
                width: 1200,
                height: 630,
                alt: 'About Mohit Lakhara — MERN Stack Developer',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Mohit Lakhara | Full-Stack Developer',
        description: 'Explore the background, skillset, and engineering philosophy of Mohit Lakhara — MERN Stack & UI/UX Developer.',
        images: ['https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-about.webp'],
    },
};

export default function AboutPage() {
    return (
        <main className="relative min-h-screen w-full bg-transparent text-foreground overflow-hidden">
            <div className="relative z-10">
                <AboutHero />
                <StoryFlow />
                <SkillsShowcase />
                <CodePhilosophy />
                <BuildProcess />
                <EthosTunnel />
                <ResumePulse />
                <BeyondTheCode />
                <ToolChest />
            </div>
        </main>
    );
}
