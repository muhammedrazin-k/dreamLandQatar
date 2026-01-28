"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="h-10 w-10 md:h-14 md:w-14 rounded-full border border-zinc-200 bg-white shadow-sm" />
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all hover:border-brand-red hover:scale-110 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-brand-red"
            title="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4 md:h-5 md:w-5 text-zinc-900 dark:text-zinc-100" />
            ) : (
                <Moon className="h-4 w-4 md:h-5 md:w-5 text-zinc-900" />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
