'use client';
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Highly optimized physics configuration
        const lenis = new Lenis({
            lerp: 0.08, // Lerp is vastly superior for R3F 3D sync than duration/easing
            wheelMultiplier: 1,
            touchMultiplier: 2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
