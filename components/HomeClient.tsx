'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import TechScroll from '@/components/TechScroll';
import Projects from '@/components/Projects';
import ContactCTA from '@/components/ContactCTA';
import Global3DCanvas from '@/components/Global3DCanvas';

export default function HomeClient() {
    return (
        <main className="w-full bg-background min-h-screen relative font-sans text-foreground transition-colors duration-300">
            <Global3DCanvas />
            <div className="scroll-container relative z-10">
                <section><Hero /></section>
                <section><About /></section>
                <section><TechScroll /></section>
                <section><Projects /></section>
                <section><ContactCTA /></section>
            </div>
        </main>
    );
}
