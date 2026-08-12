import { Permission } from 'node-appwrite';
import { db, commentCollection } from '../name';
import { databases } from './config';

export default async function createCommentCollection() {
    // create collection
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Comment collection is created successfully");

    // create attributes
    await Promise.all([
        databases.createStringAttribute(
            db, 
            commentCollection,
            "content",
            10000,
            true
        ),
        databases.createEnumAttribute(
            db,
            commentCollection,
            "type", ["answer", "question"],
            true
        ),
        databases.createStringAttribute(
            db,
            commentCollection,
            "authorId",
            50,
            true
        ),
        databases.createStringAttribute(
            db,
            commentCollection,
            "typeId",
            50,
            true
        ),
    ])
    console.log("Comment collection attributes are created successfully");
}

export async function ensureCommentAuthorIdAttribute() {
    const collection = await databases.getCollection(db, commentCollection);
    if (collection.attributes.some(attribute => attribute.key === "authorId")) return;

    await databases.createStringAttribute(db, commentCollection, "authorId", 50, true);
}