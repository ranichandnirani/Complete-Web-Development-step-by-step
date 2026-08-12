import { databases } from "@/models/server/config";
import React from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { Query } from "node-appwrite";

async function getAuthoredContent(collection: string, authorId: string) {
    const ids: string[] = [];
    let offset = 0;
    let total = 0;

    while (true) {
        const page = await databases.listDocuments(db, collection, [
            Query.equal("authorId", authorId),
            Query.limit(100),
            Query.offset(offset),
        ]);
        ids.push(...page.documents.map(document => document.$id));
        total = page.total;
        offset += page.documents.length;

        if (offset >= total || page.documents.length === 0) break;
    }

    return { ids, total };
}

async function getAuthoredVoteScore(contentIds: string[]) {
    let offset = 0;
    let total = 0;
    let score = 0;

    while (contentIds.length > 0) {
        const page = await databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", contentIds),
            Query.limit(100),
            Query.offset(offset),
        ]);
        score += page.documents.reduce(
            (sum, vote) => sum + (vote.voteStatus === "upvoted" ? 1 : -1),
            0,
        );
        total = page.total;
        offset += page.documents.length;

        if (offset >= total || page.documents.length === 0) break;
    }

    return score;
}

const Page = async ({ params }: { params: Promise<{ userId: string; userSlug: string }> }) => {
    const { userId } = await params;
    const [questions, answers] = await Promise.all([
        getAuthoredContent(questionCollection, userId),
        getAuthoredContent(answerCollection, userId),
    ]);
    const voteScore = await getAuthoredVoteScore([...questions.ids, ...answers.ids]);
    const reputation = Math.max(0, answers.total + voteScore);

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MagicCard className="relative flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center shadow-2xl sm:min-h-44 sm:p-8">
                <h2 className="text-xl font-medium">Reputation</h2>
                <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                    <NumberTicker value={reputation} />
                </p>
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            </MagicCard>
            <MagicCard className="relative flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center shadow-2xl sm:min-h-44 sm:p-8">
                <h2 className="text-xl font-medium">Questions asked</h2>
                <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                    <NumberTicker value={questions.total} />
                </p>
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            </MagicCard>
            <MagicCard className="relative flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center shadow-2xl sm:min-h-44 sm:p-8">
                <h2 className="text-xl font-medium">Answers given</h2>
                <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                    <NumberTicker value={answers.total} />
                </p>
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            </MagicCard>
        </div>
    );
};

export default Page;