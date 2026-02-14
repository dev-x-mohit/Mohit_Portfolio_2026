'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaKey, FaWifi, FaNetworkWired, FaGitAlt, FaGithub, FaNpm, FaDocker, FaLinux, FaCode, FaPython, FaJava, FaCogs, FaFireAlt, FaServer
} from 'react-icons/fa';
import { SiBootstrap, SiVite, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase, SiPostman, SiFigma, SiOpenai, SiTensorflow } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const skillCategories = [
    {
        name: "Frontend",
        color: "#3B82F6",
        positions: {
            mobile: { centerX: 28, centerY: 20 },
            tablet: { centerX: 25, centerY: 25 },
            desktop: { centerX: 25, centerY: 20 }
        },
        skills: [
            { name: "React", icon: <FaReact className="text-[#61DAFB]" />, level: 95, angle: 0, radius: { mobile: 17, tablet: 19, desktop: 15 } },
            { name: "Next.js", icon: <SiNextdotjs className="text-foreground" />, level: 90, angle: 45, radius: { mobile: 15, tablet: 16, desktop: 17 } },
            { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" />, level: 95, angle: 90, radius: { mobile: 19, tablet: 21, desktop: 23 } },
            { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" />, level: 90, angle: 135, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" />, level: 95, angle: 180, radius: { mobile: 18, tablet: 20, desktop: 21 } },
            { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" />, level: 90, angle: 225, radius: { mobile: 15, tablet: 17, desktop: 18 } },
            { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" />, level: 85, angle: 270, radius: { mobile: 14, tablet: 15, desktop: 16 } },
            { name: "Vite", icon: <SiVite className="text-[#646CFF]" />, level: 80, angle: 315, radius: { mobile: 13, tablet: 14, desktop: 15 } },
        ]
    },
    {
        name: "Backend",
        color: "#10B981",
        positions: {
            mobile: { centerX: 75, centerY: 20 },
            tablet: { centerX: 75, centerY: 25 },
            desktop: { centerX: 65, centerY: 20 }
        },
        skills: [
            { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" />, level: 90, angle: 0, radius: { mobile: 18, tablet: 20, desktop: 21 } },
            { name: "Express", icon: <FaServer className="text-foreground" />, level: 85, angle: 60, radius: { mobile: 15, tablet: 17, desktop: 18 } },
            { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, level: 85, angle: 120, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" />, level: 80, angle: 180, radius: { mobile: 15, tablet: 16, desktop: 17 } },
            { name: "MySQL", icon: <FaDatabase className="text-[#4479A1]" />, level: 80, angle: 240, radius: { mobile: 14, tablet: 15, desktop: 16 } },
            { name: "REST APIs", icon: <FaNetworkWired className="text-foreground" />, level: 90, angle: 300, radius: { mobile: 17, tablet: 19, desktop: 20 } },
        ]
    },
    {
        name: "Tools",
        color: "#A855F7",
        positions: {
            mobile: { centerX: 25, centerY: 80 },
            tablet: { centerX: 25, centerY: 75 },
            desktop: { centerX: 30, centerY: 70 }
        },
        skills: [
            { name: "Git", icon: <FaGitAlt className="text-[#F05032]" />, level: 90, angle: 0, radius: { mobile: 17, tablet: 19, desktop: 20 } },
            { name: "GitHub", icon: <FaGithub className="text-foreground" />, level: 90, angle: 60, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "VS Code", icon: <VscVscode className="text-[#007ACC]" />, level: 95, angle: 120, radius: { mobile: 18, tablet: 20, desktop: 21 } },
            { name: "Docker", icon: <FaDocker className="text-[#2496ED]" />, level: 75, angle: 180, radius: { mobile: 14, tablet: 15, desktop: 16 } },
            { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" />, level: 80, angle: 240, radius: { mobile: 15, tablet: 16, desktop: 17 } },
            { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" />, level: 80, angle: 300, radius: { mobile: 15, tablet: 17, desktop: 18 } },
        ]
    },
    {
        name: "Programming",
        color: "#F97316",
        positions: {
            mobile: { centerX: 75, centerY: 80 },
            tablet: { centerX: 75, centerY: 75 },
            desktop: { centerX: 75, centerY: 70 }
        },
        skills: [
            { name: "Python", icon: <FaPython className="text-[#3776AB]" />, level: 85, angle: 0, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "Java", icon: <FaJava className="text-[#007396]" />, level: 80, angle: 72, radius: { mobile: 15, tablet: 16, desktop: 17 } },
            { name: "C/C++", icon: <FaCode className="text-foreground" />, level: 75, angle: 144, radius: { mobile: 14, tablet: 15, desktop: 16 } },
            { name: "DSA", icon: <FaCogs className="text-foreground" />, level: 85, angle: 216, radius: { mobile: 15, tablet: 17, desktop: 18 } },
            { name: "AI/ML", icon: <SiTensorflow className="text-[#FF6F00]" />, level: 75, angle: 288, radius: { mobile: 13, tablet: 14, desktop: 15 } },
        ]
    }
];

const TechScroll = () => {
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
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section id="tech" ref={containerRef} className="relative bg-background py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Background elements omitted for brevity */}

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">
                        Neural Tech Network
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto font-medium">
                        Explore the interconnected nodes of my technical expertise, where creativity meets advanced engineering.
                    </p>
                </motion.div>

                {screenSize === 'mobile' ? (
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
                    <motion.div
                        style={{ y }}
                        className="relative w-full h-[500px] md:h-[650px] lg:h-[700px]"
                    >
                        <svg
                            key={screenSize}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ zIndex: 1 }}
                            preserveAspectRatio="none"
                        >
                            {skillCategories.map((category, catIndex) => {
                                const centerPos = category.positions[screenSize];
                                return category.skills.map((skill, skillIndex) => {
                                    const angleRad = (skill.angle * Math.PI) / 180;
                                    const radius = skill.radius[screenSize];

                                    // Unified math for both line and node
                                    const x1 = centerPos.centerX;
                                    const y1 = centerPos.centerY;
                                    const x2 = x1 + Math.cos(angleRad) * radius;
                                    const y2 = y1 + Math.sin(angleRad) * radius;

                                    return (
                                        <motion.line
                                            key={`${catIndex}-${skillIndex}`}
                                            x1={`${x1}%`}
                                            y1={`${y1}%`}
                                            x2={`${x2}%`}
                                            y2={`${y2}%`}
                                            stroke={category.color}
                                            strokeWidth="3"
                                            opacity={hoveredSkill === skill.name ? 0.8 : 0.2}
                                            strokeDasharray="4 4"
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            viewport={{ once: true }}
                                            animate={{ strokeDashoffset: [0, -20] }}
                                            transition={{
                                                pathLength: { duration: 1 },
                                                strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" }
                                            }}
                                        />
                                    );
                                });
                            })}
                        </svg>
                        {/* FIX 1: Keyed SVG
                        Adding screenSize as a key ensures the SVG internal coordinate 
                        system resets immediately when the layout state changes.
                    */}
                        {skillCategories.map((category, catIndex) => {
                            const centerPos = category.positions[screenSize];
                            return (
                                <React.Fragment key={category.name}>
                                    {/* Center Node */}
                                    <motion.div
                                        className="absolute"
                                        style={{
                                            left: `${centerPos.centerX}%`,
                                            top: `${centerPos.centerY}%`,
                                            // FIX 2: Using transform instead of translate for smoother calc
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 2,
                                        }}
                                    >
                                        {/* Category Circle Content */}
                                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center bg-background/50 backdrop-blur-md" style={{ borderColor: category.color }}>
                                            <span className="text-[10px] md:text-xs font-bold text-center">{category.name}</span>
                                        </div>
                                    </motion.div>

                                    {category.skills.map((skill, skillIndex) => {
                                        const angleRad = (skill.angle * Math.PI) / 180;
                                        const radius = skill.radius[screenSize];

                                        // Use EXACT same math as the SVG x2/y2
                                        const x = centerPos.centerX + Math.cos(angleRad) * radius - 2.2;
                                        const y = centerPos.centerY + Math.sin(angleRad) * radius - 5;

                                        return (
                                            <SkillNode
                                                key={skill.name}
                                                skill={skill}
                                                x={x}
                                                y={y}
                                                categoryColor={category.color}
                                                delay={catIndex * 0.1}
                                                onHover={setHoveredSkill}
                                                isHovered={hoveredSkill === skill.name}
                                                screenSize={screenSize as 'tablet' | 'desktop'}
                                            />
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

const SkillNode = ({ skill, x, y, categoryColor, delay, onHover, isHovered, screenSize }: any) => {
    const nodeSize = screenSize === 'mobile' ? 'w-10 h-10' : screenSize === 'tablet' ? 'w-12 h-12' : 'w-14 h-14';
    const iconSize = screenSize === 'mobile' ? 'text-xl' : screenSize === 'tablet' ? 'text-2xl' : 'text-3xl';

    return (
        <motion.div
            className="absolute cursor-pointer group"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered ? 10 : 3,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            whileHover={{ scale: screenSize === 'mobile' ? 1.2 : 1.3 }}
            onHoverStart={() => onHover(skill.name)}
            onHoverEnd={() => onHover(null)}
        >
            <div className="relative">
                {/* Skill Icon */}
                <div
                    className={`${nodeSize} rounded-full flex items-center justify-center bg-card/60 backdrop-blur-xl border border-border/50 shadow-lg transition-all duration-300 group-hover:border-accent-action group-hover:shadow-2xl`}
                    style={{
                        boxShadow: isHovered ? `0 0 ${screenSize === 'mobile' ? '20px' : '30px'} ${categoryColor}80` : undefined,
                    }}
                >
                    <div className={iconSize}>
                        {skill.icon}
                    </div>
                </div>

                {/* Glow Effect */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: `radial-gradient(circle, ${categoryColor}40, transparent)` }}
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: 2, opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                )}

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-2 py-1.5 md:px-3 md:py-2 pointer-events-none"
                >
                    <p className="text-[10px] md:text-xs font-bold text-foreground">{skill.name}</p>
                    <div className="flex items-center gap-1.5 md:gap-2 mt-0.5 md:mt-1">
                        <div className="h-0.5 md:h-1 w-12 md:w-16 bg-border/30 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${skill.level}%`,
                                    background: categoryColor,
                                }}
                            />
                        </div>
                        <span className="text-[9px] md:text-[10px] text-muted-foreground">{skill.level}%</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TechScroll;
