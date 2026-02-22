'use client';
import { Laptop, SunLight, HalfMoon } from 'iconoir-react';



import * as React from "react"

import { useTheme } from "@/hooks/use-theme"
import { usePathname } from "next/navigation"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    const pathname = usePathname()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    // Hide on /projects route where ProjectIDE is active
    if (pathname?.startsWith('/projects')) {
        return null;
    }

    return (
        <div className="fixed bottom-8 right-8 z-50 flex gap-2 p-1 rounded-full bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-gray-800 shadow-lg backdrop-blur-sm">
            <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-full transition-all ${theme === "light" ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                aria-label="Light Mode"
            >
                <SunLight className="w-5 h-5 text-amber-500" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-full transition-all ${theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                aria-label="Dark Mode"
            >
                <HalfMoon className="w-5 h-5 text-purple-500" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-2 rounded-full transition-all ${theme === "system" ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                aria-label="System Mode"
            >
                <Laptop className="w-5 h-5 text-gray-500" />
            </button>
        </div>
    )
}
