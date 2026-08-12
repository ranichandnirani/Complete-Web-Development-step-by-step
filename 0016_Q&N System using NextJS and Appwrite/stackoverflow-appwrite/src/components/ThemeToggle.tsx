"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = React.useSyncExternalStore(
        () => () => undefined,
        () => true,
        () => false
    );

    if (!mounted) {
        return <div className="h-10 w-10" aria-hidden="true" />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 shadow-lg backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-black/70 dark:text-yellow-300 dark:hover:bg-black"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}
