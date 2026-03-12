'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import TechScroll from '@/components/TechScroll';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import ContactCTA from '@/components/ContactCTA';
import Services from '@/components/Services';

export default function HomeClient() {
    return (
        <main className="w-full bg-background min-h-screen relative font-sans text-foreground transition-colors duration-300">
            <div className="scroll-container">
                <section className="snap-section"><Hero /></section>
                <section className="snap-section"><About /></section>
                <section className="snap-section"><Services /></section>
                <section className="snap-section"><TechScroll /></section>
                <section className="snap-section"><Projects /></section>
                <section className="snap-section"><Certifications /></section>
                <section className="snap-section"><ContactCTA /></section>
            </div>
        </main>
    );
}
