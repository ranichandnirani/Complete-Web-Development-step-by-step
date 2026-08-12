import Pagination from "@/components/Pagination";
import QuestionCard from "@/components/QuestionCard";
import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { Query } from "node-appwrite";
import React from "react";

const Page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ userId: string; userSlug: string }>;
    searchParams: Promise<{ page?: string }>;
}) => {
    const { userId } = await params;
    const { page = "1" } = await searchParams;

    const queries = [
        Query.equal("authorId", userId),
        Query.orderDesc("$createdAt"),
        Query.offset((+page - 1) * 25),
        Query.limit(25),
    ];

    const questions = await databases.listDocuments(db, questionCollection, queries);

    const questionDocuments = await Promise.all(
        questions.documents.map(async ques => {
            const [author, answers, upvotes, downvotes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
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
                author: {
                    $id: author.$id,
                    name: author.name,
                },
            };
        })
    );

    return (
        <div className="px-4">
            <div className="mb-4">
                <p>{questions.total} questions</p>
            </div>
            <div className="mb-4 max-w-3xl space-y-6">
                {questionDocuments.map(ques => (
                    <QuestionCard key={ques.$id} ques={ques} />
                ))}
            </div>
            <Pagination total={questions.total} limit={25} page={page} />
        </div>
    );
};

export default Page;