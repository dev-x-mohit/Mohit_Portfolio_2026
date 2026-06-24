'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useGlobalData } from '@/context/GlobalContext';

const TechScroll = () => {
    const { skills: skillCategories } = useGlobalData();
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    React.useEffect(() => {
        const updateScreenSize = () => {
            const width = window.innerWidth;
            if (width < 768) setScreenSize('mobile');
            else if (width < 1024) setScreenSize('tablet');
            else setScreenSize('desktop');
        };
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 40%", "end 150%"]
    });

    const drawProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 35,
        restDelta: 0.001
    });

    const isMobile = screenSize === 'mobile';

    // Layout config for the 4 categories spreading from center (Radial Tree)
    const getCategoryLayout = (index: number) => {
        // Angles: 0=Right, 90=Down, 180=Left, 270=Up
        switch (index) {
            case 0: return { angle: 225, startAngle: 160, angleRange: 130 }; // Frontend (Top Left)
            case 1: return { angle: 315, startAngle: 250, angleRange: 130 }; // Backend (Top Right)
            case 2: return { angle: 135, startAngle: 70, angleRange: 130 };  // Tools (Bottom Left)
            case 3: return { angle: 45, startAngle: -20, angleRange: 130 };  // Programming (Bottom Right)
            default: return { angle: 0, startAngle: 0, angleRange: 90 };
        }
    };

    return (
        <section id="tech" ref={containerRef} className="relative bg-background py-16 md:py-24 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-display mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-accent-action to-accent-highlight">
                        The Tech Tree
                    </h2>
                    <p className="text-muted-foreground font-sans text-sm md:text-lg max-w-2xl mx-auto font-medium">
                        A singular ecosystem of interconnected skills branching out from a core engineering foundation.
                    </p>
                </motion.div>

                {isMobile ? (
                    <div className="space-y-8 pb-10">
                        {skillCategories.map((category) => (
                            <div key={category.name} className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-sm">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: category.color }}>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                                    {category.name}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name} className="flex items-center gap-3 bg-background/50 p-3 rounded-xl border border-border/30">
                                            <div className="text-2xl">{skill.icon}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[10px] font-bold truncate">{skill.name}</div>
                                                <div className="h-1 bg-border/20 rounded-full mt-1 overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: category.color }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative w-full max-w-[1000px] mx-auto aspect-square flex justify-center">
                        {/* SVG Tree Layer */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 1000 1000"
                            preserveAspectRatio="xMidYMid meet"
                            style={{ zIndex: 1 }}
                        >
                            {/* Central Root Connections */}
                            {skillCategories.map((category, catIndex) => {
                                const layout = getCategoryLayout(catIndex);
                                const rootX = 500;
                                const rootY = 500;
                                const catRad = (layout.angle * Math.PI) / 180;
                                const catDist = 220; // Distance from root to category node

                                const cx = (rootX + Math.cos(catRad) * catDist).toFixed(4);
                                const cy = (rootY + Math.sin(catRad) * catDist).toFixed(4);

                                // Smooth curve from center to category
                                const cp1x = (rootX + (parseFloat(cx) - rootX) * 0.5).toFixed(4);
                                const cp1y = rootY.toFixed(4);
                                const cp2x = cx;
                                const cp2y = (rootY + (parseFloat(cy) - rootY) * 0.5).toFixed(4);
                                const rootPathD = `M ${rootX} ${rootY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cx} ${cy}`;

                                return (
                                    <React.Fragment key={`root-conn-${category.name}`}>
                                        <motion.path
                                            d={rootPathD}
                                            stroke={category.color}
                                            strokeWidth="5"
                                            fill="none"
                                            strokeLinecap="round"
                                            opacity={0.8}
                                            style={{ pathLength: drawProgress }}
                                        />

                                        {/* Skill Branches */}
                                        {category.skills.map((skill, skillIndex) => {
                                            const total = category.skills.length;
                                            const angle = layout.startAngle + (skillIndex / (total - 1 || 1)) * layout.angleRange;
                                            const angleRad = (angle * Math.PI) / 180;

                                            // Stagger the distance of skills from category node
                                            const radius = 130 + (skillIndex % 2) * 80;

                                            const x = (parseFloat(cx) + Math.cos(angleRad) * radius).toFixed(4);
                                            const y = (parseFloat(cy) + Math.sin(angleRad) * radius).toFixed(4);

                                            // Smooth curve from category to skill
                                            const scp1x = (parseFloat(cx) + (parseFloat(x) - parseFloat(cx)) * 0.5).toFixed(4);
                                            const scp1y = cy;
                                            const scp2x = x;
                                            const scp2y = (parseFloat(cy) + (parseFloat(y) - parseFloat(cy)) * 0.5).toFixed(4);
                                            const skillPathD = `M ${cx} ${cy} C ${scp1x} ${scp1y}, ${scp2x} ${scp2y}, ${x} ${y}`;

                                            return (
                                                <motion.path
                                                    key={`${category.name}-${skill.name}`}
                                                    d={skillPathD}
                                                    stroke={category.color}
                                                    strokeWidth="2"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    opacity={hoveredSkill === skill.name ? 1 : 0.3}
                                                    style={{ pathLength: drawProgress }}
                                                />
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </svg>

                        {/* HTML Nodes Layer */}
                        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                            {/* Root Node */}
                            <div
                                className="absolute top-[50%] left-[50%]"
                                style={{ transform: 'translate(-50%, -50%)', zIndex: 60 }}
                            >
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[6px] border-emerald-500/50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                                    <span className="text-sm md:text-base font-black text-center leading-tight px-2 bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 to-teal-600">Core Stack</span>
                                </div>
                            </div>

                            {/* Categories and Skills */}
                            {skillCategories.map((category, catIndex) => {
                                const layout = getCategoryLayout(catIndex);
                                const rootX = 500;
                                const rootY = 500;
                                const catRad = (layout.angle * Math.PI) / 180;
                                const catDist = 220;

                                const cx = rootX + Math.cos(catRad) * catDist;
                                const cy = rootY + Math.sin(catRad) * catDist;

                                const catTopPct = ((cy / 1000) * 100).toFixed(4);
                                const catLeftPct = ((cx / 1000) * 100).toFixed(4);

                                return (
                                    <React.Fragment key={category.name}>
                                        {/* Category Node */}
                                        <div
                                            className="absolute"
                                            style={{
                                                top: `${catTopPct}%`,
                                                left: `${catLeftPct}%`,
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 30
                                            }}
                                        >
                                            <div 
                                                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-[3px] flex flex-col items-center justify-center bg-background/90 backdrop-blur-md shadow-lg" 
                                                style={{ borderColor: category.color, boxShadow: `0 0 30px ${category.color}40` }}
                                            >
                                                <span className="text-[9px] md:text-[10px] lg:text-xs font-bold text-center leading-tight px-1">{category.name}</span>
                                            </div>
                                        </div>

                                        {/* Skill Nodes (Leaves) */}
                                        {category.skills.map((skill, skillIndex) => {
                                            const total = category.skills.length;
                                            const angle = layout.startAngle + (skillIndex / (total - 1 || 1)) * layout.angleRange;
                                            const angleRad = (angle * Math.PI) / 180;

                                            const radius = 130 + (skillIndex % 2) * 80;

                                            const x = cx + Math.cos(angleRad) * radius;
                                            const y = cy + Math.sin(angleRad) * radius;

                                            const sTopPct = ((y / 1000) * 100).toFixed(4);
                                            const sLeftPct = ((x / 1000) * 100).toFixed(4);

                                            return (
                                                <SkillNode
                                                    key={skill.name}
                                                    skill={skill}
                                                    top={`${sTopPct}%`}
                                                    left={`${sLeftPct}%`}
                                                    categoryColor={category.color}
                                                    onHover={setHoveredSkill}
                                                    isHovered={hoveredSkill === skill.name}
                                                />
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const SkillNode = ({ skill, top, left, categoryColor, onHover, isHovered }: any) => {
    return (
        <div
            className="absolute cursor-pointer group"
            style={{
                top,
                left,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered ? 50 : 10,
            }}
            onMouseEnter={() => onHover(skill.name)}
            onMouseLeave={() => onHover(null)}
        >
            <div className="relative">
                {/* Leaf Node */}
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center bg-card/80 backdrop-blur-xl border border-white/10 transition-all duration-300"
                    style={{
                        borderColor: isHovered ? categoryColor : undefined,
                        boxShadow: isHovered ? `0 0 20px ${categoryColor}80` : undefined,
                    }}
                >
                    <div className="text-lg md:text-2xl lg:text-3xl text-foreground">
                        {skill.icon}
                    </div>
                </motion.div>

                {/* Tooltip */}
                <div
                    className={`absolute top-[calc(100%+8px)] md:top-[calc(100%+12px)] left-1/2 -translate-x-1/2 whitespace-nowrap bg-card/95 backdrop-blur-xl border rounded-lg px-2 py-1 md:px-3 md:py-2 pointer-events-none transition-all duration-300
                        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                    style={{ borderColor: `${categoryColor}50` }}
                >
                    <p className="text-[9px] md:text-[10px] lg:text-xs font-bold text-foreground mb-0.5 md:mb-1">{skill.name}</p>
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="h-0.5 md:h-1 w-10 md:w-12 lg:w-16 bg-border/30 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500 ease-out"
                                style={{
                                    background: categoryColor,
                                    width: isHovered ? `${skill.level}%` : '0%',
                                }}
                            />
                        </div>
                        <span className="text-[8px] md:text-[9px] lg:text-[10px] font-mono text-muted-foreground">{skill.level}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechScroll;
