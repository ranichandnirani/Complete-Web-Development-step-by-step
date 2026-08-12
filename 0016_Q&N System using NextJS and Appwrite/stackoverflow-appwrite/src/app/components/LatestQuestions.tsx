import QuestionCard from "@/components/QuestionCard";
import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { AppwriteException, Query } from "node-appwrite";
import React from "react";

const LatestQuestions = async () => {
    const questions = await databases.listDocuments(db, questionCollection, [
        Query.limit(5),
        Query.orderDesc("$createdAt"),
    ]);
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
        <div className="space-y-6">
            {questions.documents.map(question => (
                <QuestionCard key={question.$id} ques={question} />
            ))}
        </div>
    );
};

export default LatestQuestions;