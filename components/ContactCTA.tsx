import React from 'react';
import { ArrowUpRight } from 'iconoir-react';

export default function ContactCTA() {
    return (
        <section id="contact" className="w-full py-24 md:py-32 bg-background border-t border-border/10">
            <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
                
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] font-display font-bold leading-none tracking-tighter uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">
                    Let's Talk.
                </h2>
                
                <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
                    Have an idea, a project, or a role in mind? I'm always open to discussing new opportunities and bringing creative visions to life.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 font-mono text-sm uppercase tracking-widest text-foreground/80">
                    <a href="mailto:mohitlakhara78500@gmail.com" className="group flex items-center justify-center gap-2 hover:text-accent-action transition-colors">
                        <span>mohitlakhara78500@gmail.com</span>
                        <ArrowUpRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                    <a href="https://github.com/mohitlakhara-ind" target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-2 hover:text-accent-action transition-colors">
                        <span>GitHub</span>
                        <ArrowUpRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                    <a href="https://linkedin.com/in/mohitlakhara-ind" target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-2 hover:text-accent-action transition-colors">
                        <span>LinkedIn</span>
                        <ArrowUpRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                </div>

            </div>
        </section>
    );
}
