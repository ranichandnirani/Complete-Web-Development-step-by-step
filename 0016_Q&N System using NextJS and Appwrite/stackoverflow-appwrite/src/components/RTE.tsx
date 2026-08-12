"use client";

import dynamic from "next/dynamic";
import Editor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";

const RTE = dynamic(
    () =>
        import("@uiw/react-md-editor").then(mod => {
            return mod.default;
        }),
    {
        ssr: false
    }
);

export function MarkdownPreview(props: ComponentProps<typeof Editor.Markdown>) {
    const { resolvedTheme } = useTheme();

    return (
        <div data-color-mode={resolvedTheme === "dark" ? "dark" : "light"}>
            <Editor.Markdown {...props} />
        </div>
    );
}

export default function ThemedRTE(props: ComponentProps<typeof Editor>) {
    const { resolvedTheme } = useTheme();

    return (
        <div
            data-color-mode={resolvedTheme === "dark" ? "dark" : "light"}
            className="overflow-hidden rounded-lg border border-slate-300 bg-white dark:border-white/15 dark:bg-[#0d1117]"
        >
            <RTE {...props} />
        </div>
    );
}
