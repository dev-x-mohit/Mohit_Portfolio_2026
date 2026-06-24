'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-white select-none px-6">

            {/* 404 Number */}
            <h1 className="text-[120px] md:text-[180px] font-black text-white/5 tracking-tight pointer-events-none"
                style={{ fontFamily: 'var(--font-syne)' }}>
                404
            </h1>

            {/* Content — sits over the big number */}
            <div className="flex flex-col items-center -mt-8 md:-mt-12 text-center">
                <div className="w-8 h-px bg-white/20 mb-6" />

                <h2 className="text-lg md:text-xl font-semibold tracking-wide mb-2 text-white/90"
                    style={{ fontFamily: 'var(--font-inter)' }}>
                    Page not found
                </h2>

                <p className="text-sm text-white/40 max-w-xs leading-relaxed mb-8 font-mono">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M6 1L1 7L6 13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to home
                </Link>
            </div>

            {/* Subtle status line at bottom */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <span className="text-xs font-mono text-white/20 tracking-widest">
                    ERROR 404 — NOT FOUND
                </span>
            </div>
        </main>
    );
}
