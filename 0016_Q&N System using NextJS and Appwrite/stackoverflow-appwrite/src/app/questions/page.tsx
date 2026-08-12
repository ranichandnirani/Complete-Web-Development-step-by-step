import { databases, users } from "@/models/server/config";
import { answerCollection, db, voteCollection, questionCollection } from "@/models/name";
import { AppwriteException, Query } from "node-appwrite";
import React from "react";
import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import QuestionCard from "@/components/QuestionCard";
import { UserPrefs } from "@/store/Auth";
import Pagination from "@/components/Pagination";
import Search from "./Search";

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; tag?: string; search?: string }>;
}) => {
    const { page = "1", tag, search } = await searchParams;

    const queries = [
        Query.orderDesc("$createdAt"),
        Query.offset((+page - 1) * 25),
        Query.limit(25),
    ];

    if (tag) queries.push(Query.equal("tags", tag));
    if (search)
        queries.push(
            Query.or([
                Query.search("title", search),
                Query.search("content", search),
            ])
        );

    const questions = await databases.listDocuments(db, questionCollection, queries);
    questions.documents = await Promise.all(
        questions.documents.map(async ques => {
            const [author, answers, upvotes, downvotes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId).catch(error => {
                    if (error instanceof AppwriteException && error.code === 404) {
                        return null;
                    }
                    throw error;
                }),
                databases.listDocuments(db, answerCollection, [
                    Query.equal("questionId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", "question"),
                    Query.equal("typeId", ques.$id),
                    Query.equal("voteStatus", "upvoted"),
                    Query.limit(1), // for optimization
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", "question"),
                    Query.equal("typeId", ques.$id),
                    Query.equal("voteStatus", "downvoted"),
                    Query.limit(1), // for optimization
                ]),
            ]);

            return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: Math.max(0, upvotes.total - downvotes.total),
                author: author
                    ? {
                          $id: author.$id,
                          name: author.name,
                      }
                    : undefined,
            };
        })
    );

    return (
        <div className="container mx-auto px-4 pb-20 pt-36">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Questions</h1>
                <Link href="/questions/ask">
                    <ShimmerButton className="shadow-2xl">
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Ask a question
                        </span>
                    </ShimmerButton>
                </Link>
            </div>
            <div className="mb-4">
                <Search initialSearch={search} />
            </div>
            <div className="mb-4 mx-auto w-full max-w-7xl space-y-6">
                <p>{questions.total} Questions</p>
            </div>
            <div className="mx-auto mb-4 w-full max-w-3xl space-y-6">
                {questions.documents.map(ques => (
                    <QuestionCard key={ques.$id} ques={ques} />
                ))}
            </div>
            <Pagination total={questions.total} limit={25} page={page} />
        </div>
    );
};

export default Page;