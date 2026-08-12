import { db } from "../name";
import 'server-only';
import createCommentCollection, { ensureCommentAuthorIdAttribute } from "./comment.collection";
import createVoteCollection from "./vote.collection";
import createQuestionCollection, { ensureQuestionPermissions } from "./question.collection";
import createAnswerCollection from "./answer.collection";
import { databases } from "./config";

let commentAuthorIdSetup: Promise<void> | undefined;

export default async function getOrCreateDB() {
    let databaseExists = true;
    try {
        await databases.get(db)
    } catch {
        databaseExists = false;
    }

    if (databaseExists) {
        try {
            commentAuthorIdSetup ??= ensureCommentAuthorIdAttribute().catch(error => {
                commentAuthorIdSetup = undefined;
                throw error;
            });
            await commentAuthorIdSetup;
            await ensureQuestionPermissions();
            console.log("Database connected successfully");
        } catch (error) {
            console.error("Error ensuring comment collection schema:", error);
        }
        return databases;
    }

    try {
        await databases.create(db, db);
        console.log("Database created successfully");

        // create collections
        await Promise.all([
            createQuestionCollection(),
            createAnswerCollection(),
            createCommentCollection(),
            createVoteCollection(),
        ])

        console.log("Collections created successfully");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error creating database or collections:", error);
    }
    return databases;
}