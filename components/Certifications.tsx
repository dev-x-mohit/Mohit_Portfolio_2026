'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';

const Certifications = () => {
    const certifications = useMemo(() => [
        {
            title: "Front End Dev Libraries",
            issuer: "freeCodeCamp",
            logo: "https://imgs.search.brave.com/KBgDvaVn5oYChY3-996daRis3-8_KBaUxFfKobgnWFg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzM0/bWZ4L3N0eWxlcy9j/b21tdW5pdHlJY29u/X29kYnhvOGxjM3R2/NDEucG5n",
            link: "https://www.freecodecamp.org/certification/fcc7a897077-772b-4e3a-a044-8a180f0554c9/front-end-development-libraries",
        },
        {
            title: "JS Algorithms & DS",
            issuer: "freeCodeCamp",
            logo: "https://imgs.search.brave.com/KBgDvaVn5oYChY3-996daRis3-8_KBaUxFfKobgnWFg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzM0/bWZ4L3N0eWxlcy9j/b21tdW5pdHlJY29u/X29kYnhvOGxjM3R2/NDEucG5n",
            link: "https://freecodecamp.org/certification/fcc7a897077-772b-4e3a-a044-8a180f0554c9/javascript-algorithms-and-data-structures-v8",
        },
        {
            title: "Problem Solving (Inter.)",
            issuer: "HackerRank",
            logo: "https://imgs.search.brave.com/VXExHDWdtjADNTnAYEBPN_Vco1FU5d_7cANerXpyvu0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Z2V0cm8uY29tL2Nv/bXBhbmllcy8xNWRk/MWY3OS03YjRmLTU2/NzctYjA1Yy0yNjg5/MzgzZDdhM2I.jpeg",
            link: "https://www.hackerrank.com/certificates/d1dc583752ff",
        },
        {
            title: "CODEMATHON 2024",
            issuer: "NIT Kurukshetra",
            logo: "https://imgs.search.brave.com/zrrgkQVQL5ZuPaBs86xktrntcM3Yta73AcymMirYDHc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YW5hbnRuaXRra3Iu/Y29tL19uZXh0L2lt/YWdlP3VybD0vYW5h/bnRfbG9nby5wbmcm/dz0zODQmcT03NQ",
            link: "https://media.licdn.com/dms/image/v2/D4D2DAQETbIWIGtQCuw/profile-treasury-document-cover-images_800/profile-treasury-document-cover-images_800/0/1728309736192?e=1738764000&v=beta&t=zlci709UqDySJK4E26e_4WT5WayLURgbyxtgd5gS9Vw",
        },
        {
            title: "Responsive Web Design",
            issuer: "freeCodeCamp",
            logo: "https://imgs.search.brave.com/KBgDvaVn5oYChY3-996daRis3-8_KBaUxFfKobgnWFg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzM0/bWZ4L3N0eWxlcy9j/b21tdW5pdHlJY29u/X29kYnhvOGxjM3R2/NDEucG5n",
            link: "https://freecodecamp.org/certification/fcc7a897077-772b-4e3a-a044-8a180f0554c9/responsive-web-design",
        },
        {
            title: "Intro to LLMs",
            issuer: "Google",
            logo: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776",
            link: "https://www.cloudskillsboost.google/public_profiles/443bb05a-22d3-4c22-bf89-630a40e0a5a9/badges/8056666",
        },
        {
            title: "Responsive AI",
            issuer: "Google",
            logo: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776",
            link: "https://www.cloudskillsboost.google/public_profiles/443bb05a-22d3-4c22-bf89-630a40e0a5a9/badges/8789534",
        }
    ], []);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-background overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* Minimal Centered Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-500 tracking-widest uppercase mb-4"
                    >
                        <Award size={12} />
                        Professional Credentials
                    </motion.div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground">
                        The Verification <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Vault</span>
                    </h2>
                </div>

                {/* Unique 3D Card Fan Container */}
                <div className="relative h-[400px] w-full max-w-4xl flex items-center justify-center">
                    <div className="relative w-72 h-96 group">
                        {certifications.map((cert, index) => {
                            const isHovered = hoveredIndex === index;
                            const isAnyHovered = hoveredIndex !== null;

                            // Calculate Fan Position
                            const total = certifications.length;
                            const middle = (total - 1) / 2;
                            const offset = index - middle;

                            // Fan Parameters
                            const angle = isAnyHovered ? offset * 25 : offset * 2.5; // Fan out vs tight stack
                            const xOffset = isAnyHovered ? offset * 110 : offset * 10;
                            const yOffset = isAnyHovered ? Math.abs(offset) * 20 : 0;
                            const zIndex = isHovered ? 50 : 10 + index;
                            const scale = isHovered ? 1.15 : isAnyHovered ? 0.85 : 1 - (Math.abs(offset) * 0.05);
                            const opacity = isAnyHovered && !isHovered ? 0.4 : 1;

                            return (
                                <motion.a
                                    key={cert.title}
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    animate={{
                                        rotate: angle,
                                        x: xOffset,
                                        y: yOffset,
                                        zIndex: zIndex,
                                        scale: scale,
                                        opacity: opacity,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    className="absolute inset-0 bg-card/60 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] p-8 flex flex-col shadow-2xl cursor-pointer group/card"
                                    style={{
                                        boxShadow: isHovered ? `0 25px 50px -12px rgba(59, 130, 246, 0.5)` : '0 10px 30px -10px rgba(0,0,0,0.3)',
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {/* Holographic Glint */}
                                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />

                                    {/* Card Content */}
                                    <div className="mb-6 flex justify-between items-start">
                                        <div className="w-16 h-16 bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center justify-center group-hover/card:border-blue-500/30 transition-colors">
                                            <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain" />
                                        </div>
                                        <ShieldCheck className={`transition-colors duration-300 ${isHovered ? 'text-blue-500' : 'text-muted-foreground/20'}`} size={32} />
                                    </div>

                                    <div className="mt-auto" style={{ transform: "translateZ(30px)" }}>
                                        <p className="text-[10px] font-bold text-blue-500 tracking-widest uppercase mb-2">Verified Achievement</p>
                                        <h3 className="text-xl font-bold leading-tight text-foreground group-hover/card:text-blue-400 transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-2">{cert.issuer}</p>
                                    </div>

                                    {/* Expand Indicator */}
                                    {!isAnyHovered && index === total - 1 && (
                                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 animate-bounce-horizontal hidden md:block">
                                            <ChevronRight className="text-blue-500" size={32} />
                                        </div>
                                    )}
                                </motion.a>
                            );
                        })}
                    </div>
                </div>

                <p className="mt-20 text-muted-foreground text-[11px] font-mono tracking-[0.2em] uppercase opacity-40">
                    Hover to expand the collection
                </p>
            </div>
        </section>
    );
};

export default Certifications;
