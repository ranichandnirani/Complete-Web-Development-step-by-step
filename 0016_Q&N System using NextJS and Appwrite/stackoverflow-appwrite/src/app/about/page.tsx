import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpDown, ArrowUpRight, CircleHelp, MessagesSquare } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
    title: "About River Flow",
    description:
        "River Flow is a developer Q&A community for asking programming questions, sharing answers, and learning together.",
};

const steps = [
    {
        number: "01",
        title: "Ask with context",
        description:
            "Describe the problem, format the details, add useful tags, and attach an image when it helps explain what you see.",
        icon: CircleHelp,
    },
    {
        number: "02",
        title: "Share what you know",
        description:
            "Turn experience into practical answers, then use comments to clarify the details that matter.",
        icon: MessagesSquare,
    },
    {
        number: "03",
        title: "Surface useful ideas",
        description:
            "Vote on questions and answers to help readers spot the contributions the community finds helpful.",
        icon: ArrowUpDown,
    },
];

const features = [
    "Search questions by title or content",
    "Explore topics through tags",
    "Write formatted questions and answers",
    "Comment on questions and answers",
    "Attach screenshots to explain a problem",
];

export default function AboutPage() {
    return (
        <div className="flex min-h-full flex-col">
            <Header />
            <main className="flex-1">
                <section className="container mx-auto px-4 pb-12 pt-32 sm:pb-16 sm:pt-40">
                    <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase text-orange-500">
                        <span className="h-px w-8 bg-orange-500" />
                        A developer Q&amp;A community
                    </p>
                    <div className="max-w-4xl">
                        <h1 className="text-5xl font-bold leading-tight sm:text-7xl">River Flow</h1>
                        <p className="mt-5 max-w-3xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
                            A place for the questions that move your work forward, and the answers that help the next developer, too.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/questions"
                                className="inline-flex h-11 items-center gap-2 rounded-md bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                            >
                                Browse questions
                                <ArrowUpRight aria-hidden="true" className="size-4" />
                            </Link>
                            <Link
                                href="/questions/ask"
                                className="inline-flex h-11 items-center gap-2 rounded-md border border-white/20 px-5 text-sm font-semibold transition-colors hover:border-orange-500/60 hover:bg-orange-500/10"
                            >
                                Ask a question
                                <ArrowUpRight aria-hidden="true" className="size-4" />
                            </Link>
                        </div>
                    </div>

                    <figure className="mt-12 overflow-hidden rounded-lg border border-border bg-secondary/30 sm:mt-16">
                        <Image
                            src="/screenshots/Questions-latest.png"
                            alt="River Flow question feed with searchable, tagged programming questions"
                            width={1250}
                            height={813}
                            priority
                            className="h-auto w-full"
                        />
                        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground sm:px-6">
                            The question feed: searchable topics, tags, and community activity in one place.
                        </figcaption>
                    </figure>
                </section>

                <section className="border-y border-border bg-secondary/35">
                    <div className="container mx-auto grid gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                        <div>
                            <p className="text-sm font-semibold uppercase text-orange-500">How it works</p>
                            <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight sm:text-4xl">
                                From stuck to unstuck, together.
                            </h2>
                            <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                                Good technical answers start with enough detail and get better through thoughtful collaboration.
                            </p>
                        </div>
                        <ol className="divide-y divide-border border-y border-border">
                            {steps.map(({ number, title, description, icon: Icon }) => (
                                <li key={number} className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                                    <span className="font-mono text-sm text-orange-500">{number}</span>
                                    <div className="flex gap-4">
                                        <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-orange-500" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{title}</h3>
                                            <p className="mt-2 max-w-xl leading-7 text-muted-foreground">{description}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="container mx-auto grid gap-12 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="text-sm font-semibold uppercase text-orange-500">Made for real problems</p>
                        <h2 className="mt-3 max-w-lg text-3xl font-bold leading-tight sm:text-4xl">
                            Useful details make useful answers.
                        </h2>
                        <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                            River Flow keeps the core of a developer discussion close at hand: a clear question, the right context, and room for the community to work through it.
                        </p>
                    </div>
                    <ul className="divide-y divide-border border-y border-border">
                        {features.map(feature => (
                            <li key={feature} className="flex items-center gap-3 py-4">
                                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-orange-500" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="border-t border-border bg-secondary/35">
                    <div className="container mx-auto flex flex-col gap-8 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase text-orange-500">A project built by learning</p>
                            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Built to explore the whole stack.</h2>
                            <p className="mt-3 leading-7 text-muted-foreground">
                                Created by Chandni Rani as a full-stack learning project, River Flow brings together Next.js, TypeScript, and Appwrite across authentication, data, and file storage.
                            </p>
                        </div>
                        <Link
                            href="/register"
                            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                        >
                            Join the conversation
                            <ArrowUpRight aria-hidden="true" className="size-4" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}