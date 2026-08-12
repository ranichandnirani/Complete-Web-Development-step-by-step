"use client";

import { IconCloud } from "@/components/magicui/icon-cloud";
import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import React from "react";

const slugs = [
    "typescript",
    "javascript",
    "dart",
    "openjdk",
    "react",
    "flutter",
    "android",
    "html5",
    "css",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "androidstudio",
    "sonar",
    "figma",
];

const HeroSectionHeader = () => {
    const { session } = useAuthStore();

    return (
        <div className="container mx-auto px-4">
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-center">
                    <div className="space-y-4 text-center">
                        <h1 className="pointer-events-none z-10 whitespace-pre-wrap bg-linear-to-b from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent dark:from-[#ffd319] dark:via-[#ff2975] dark:to-[#8c1eff]">
                            River Flow
                        </h1>
                        <p className="text-center text-xl font-bold leading-none tracking-tighter">
                            Ask questions, share knowledge, and collaborate with developers
                            worldwide. Join our community and enhance your coding skills!
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            {session ? (
                                <Link href="/questions/ask">
                                    <ShimmerButton background="var(--hero-cta-background)" className="shadow-2xl">
                                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                            Ask a question
                                        </span>
                                    </ShimmerButton>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <ShimmerButton background="var(--hero-cta-background)" className="shadow-2xl">
                                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                                Sign up
                                            </span>
                                        </ShimmerButton>
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="relative rounded-full border border-neutral-200 px-8 py-3 font-medium text-black dark:border-white/20 dark:text-white"
                                    >
                                        <span>Login</span>
                                        <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="relative max-w-lg overflow-hidden">
                        <IconCloud images={slugs.map(slug => `https://cdn.simpleicons.org/${slug}`)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSectionHeader;