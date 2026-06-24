'use client';
import { Laptop, SunLight, HalfMoon } from 'iconoir-react';
import * as React from "react"
import { useTheme } from "@/hooks/use-theme"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

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



    return (
        <div className="fixed bottom-8 right-8 z-50 flex gap-2 p-1 rounded-full bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-gray-800 shadow-lg backdrop-blur-sm">
            <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${theme === "light" ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                aria-label="Light Mode"
            >
                <motion.div
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                    <SunLight className="w-5 h-5 text-amber-500" />
                </motion.div>
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                aria-label="Dark Mode"
            >
                <motion.div
                    whileHover={{ rotate: -15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                    <HalfMoon className="w-5 h-5 text-purple-500" />
                </motion.div>
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${theme === "system" ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                aria-label="System Mode"
            >
                <motion.div
                    whileHover={{ scale: 1.2, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                    <Laptop className="w-5 h-5 text-gray-500" />
                </motion.div>
            </button>
        </div>
    )
}
