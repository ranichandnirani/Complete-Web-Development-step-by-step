import { Permission } from 'node-appwrite';
import { DatabasesIndexType, OrderBy } from "node-appwrite";
import { db, questionCollection } from '../name';
import { databases } from './config'

export default async function createQuestionCollection() {
    // create collection
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Question collection is created successfully");

    // create attributes
    await Promise.all([
        databases.createStringAttribute(db, questionCollection, 'title', 100, true),
        databases.createStringAttribute(db, questionCollection, 'content', 10000, true),
        databases.createStringAttribute(db, questionCollection, 'authorId', 50, true),
        databases.createStringAttribute(db, questionCollection, 'tags', 50, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, 'attachmentId', 50, false),
    ]);
    console.log("Question collection attributes are created successfully");

    // create indexes
    await Promise.all([
        databases.createIndex(
            db,
            questionCollection,
            "title",
            DatabasesIndexType.Fulltext,
            ["title"],
            [OrderBy.Asc]
        ),
        databases.createIndex(
            db,
            questionCollection,
            "content",
            DatabasesIndexType.Fulltext,
            ["content"],
            [OrderBy.Asc]
        ),
    ]);
}

export async function ensureQuestionPermissions() {
    await databases.updateCollection(
        db,
        questionCollection,
        questionCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    );
    console.log("Question collection permissions ensured");
}