'use client';
import { SmartphoneDevice, Computer } from 'iconoir-react';



import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Project } from '@/data/projectData';

interface DevicePreviewProps {
    project: Project | null;
}

export default function DevicePreview({ project }: DevicePreviewProps) {
    const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');
    const [isLoading, setIsLoading] = useState(true);
    const [scale, setScale] = useState(1);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Calculate scale for desktop view
    React.useEffect(() => {
        if (viewMode !== 'web') {
            setScale(1);
            return;
        }

        const calculateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;
                const padding = 48; // 24px padding on each side
                const availableWidth = containerWidth - padding;
                const availableHeight = containerHeight - padding;

                // Target: 1280px width, aspect ratio 16:9 approx
                const targetWidth = 1200;
                // We scale based on width primarily to fit
                const newScale = Math.min(availableWidth / targetWidth, 1);
                setScale(newScale);
            }
        };

        calculateScale();
        window.addEventListener('resize', calculateScale);
        // Also need to observe container resize if using Split Pane
        const observer = new ResizeObserver(calculateScale);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            window.removeEventListener('resize', calculateScale);
            observer.disconnect();
        };
    }, [viewMode]);

    if (!project) return <div className="hidden md:block w-[400px] border-l border-white/10 bg-[#0a0a0c]" />;

    return (
        <div className="hidden md:flex flex-col w-full h-full bg-[#0a0a0c]">
            {/* Toolbar */}
            <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-[#0a0a0c] shrink-0">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Live Preview</span>
                <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/5">
                    <button
                        onClick={() => setViewMode('web')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'web' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}
                        title="Desktop View"
                    >
                        <Computer width={14} height={14} />
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}
                        title="Mobile View"
                    >
                        <SmartphoneDevice width={14} height={14} />
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div ref={containerRef} className="flex-1 flex items-center justify-center p-6 overflow-hidden relative bg-[url('/grid.svg')] bg-center bg-opacity-5">
                <motion.div
                    layoutId="preview-frame"
                    style={viewMode === 'web' ? {
                        width: 1200,
                        height: 750, // 16:10 aspect roughly
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center'
                    } : {}}
                    className={`
                        bg-white rounded-lg border border-white/10 shadow-2xl overflow-hidden flex flex-col relative transition-all duration-300
                        ${viewMode === 'web' ? 'shadow-2xl' : 'w-[300px] h-[600px] rounded-[2.5rem] border-[6px] border-[#2d2d2d]'}
                    `}
                >
                    {/* Browser/Device Bar */}
                    {viewMode === 'web' ? (
                        <div className="h-8 bg-[#2d2d2d] flex items-center gap-1.5 px-3 border-b border-white/5 shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <div className="flex-1 mx-3 h-5 bg-[#1a1a1a] rounded text-[10px] flex items-center px-3 text-white/50 truncate font-mono">
                                {project.liveLink}
                            </div>
                        </div>
                    ) : (
                        <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex justify-center pointer-events-none">
                            <div className="w-20 h-5 bg-[#1a1a1a] rounded-b-xl" />
                        </div>
                    )}

                    {/* Iframe Content */}
                    <div className="flex-1 relative bg-white w-full h-full">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-10">
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            </div>
                        )}
                        <iframe
                            src={project.liveLink}
                            title={project.title}
                            className="w-full h-full border-none"
                            onLoad={() => setIsLoading(false)}
                            sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0c] shrink-0">
                <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center w-full py-2 bg-accent-primary hover:bg-accent-primary/80 text-white rounded-md text-xs font-bold uppercase transition-colors"
                >
                    Open in New Tab
                </a>
            </div>
        </div>
    );
}
