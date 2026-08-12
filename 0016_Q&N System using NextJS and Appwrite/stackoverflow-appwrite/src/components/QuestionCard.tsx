"use client";

import React from "react";
import { BorderBeam } from "./magicui/border-beam";
import Link from "next/link";
import { Models } from "appwrite";
import slugify from "@/utils/slugify";
import { avatars } from "@/models/client/config";
import convertDateToRelativeTime from "@/utils/relativeTime";

type QuestionFields = Models.Document & {
    title?: string;
    tags?: string[];
    totalVotes?: number;
    totalAnswers?: number;
    author?: {
        $id: string;
        name: string;
    };
};

const QuestionCard = ({ ques }: { ques: QuestionFields }) => {
    const author = ques.author ?? { $id: "", name: "Unknown user" };
    const [height, setHeight] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    }, [ref]);

    return (
        <div
            ref={ref}
            className="relative flex flex-col gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 text-slate-800 shadow-sm duration-200 hover:border-orange-200 hover:shadow-md dark:border-white/20 dark:bg-white/5 dark:text-inherit dark:hover:bg-white/10 sm:flex-row"
        >
            <BorderBeam size={height} duration={12} delay={9} />
            <div className="relative shrink-0 text-sm text-slate-600 dark:text-slate-300 sm:text-right">
                <p>{ques.totalVotes ?? 0} votes</p>
                <p>{ques.totalAnswers ?? 0} answers</p>
            </div>
            <div className="relative w-full">
                <Link
                    href={`/questions/${ques.$id}/${slugify(ques.title ?? "question")}`}
                    className="text-orange-500 duration-200 hover:text-orange-600"
                >
                    <h2 className="text-xl">{ques.title ?? "Untitled question"}</h2>
                </Link>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                    {(ques.tags ?? []).map((tag: string) => (
                        <Link
                            key={tag}
                            href={`/questions?tag=${tag}`}
                            className="inline-block rounded-lg bg-slate-100 px-2 py-0.5 text-slate-700 duration-200 hover:bg-orange-50 hover:text-orange-800 dark:bg-white/10 dark:text-inherit dark:hover:bg-white/20"
                        >
                            #{tag}
                        </Link>
                    ))}
                    <div className="ml-auto flex items-center gap-1">
                        <picture>
                            <img
                                src={avatars.getInitials(author.name, 24, 24)}
                                alt={author.name}
                                className="rounded-lg"
                            />
                        </picture>
                        <Link
                            href={`/users/${author.$id}/${slugify(author.name)}`}
                            className="text-orange-500 hover:text-orange-600"
                        >
                            {author.name}
                        </Link>
                    </div>
                    <span>asked {convertDateToRelativeTime(new Date(ques.$createdAt))}</span>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;