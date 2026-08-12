import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, Models, Query } from "node-appwrite";

type VoteDocument = Models.Document & {
  type: "question" | "answer";
  typeId: string;
  voteStatus: "upvoted" | "downvoted";
  votedById: string;
};

async function getAuthoredDocuments(collection: string, authorId: string) {
  const documents = [];
  let offset = 0;

  while (true) {
    const page = await databases.listDocuments(db, collection, [
      Query.equal("authorId", authorId),
      Query.limit(100),
      Query.offset(offset),
    ]);
    documents.push(...page.documents);
    offset += page.documents.length;

    if (offset >= page.total || page.documents.length === 0) break;
  }

  return documents;
}

async function getVotesForContent(typeIds: string[]) {
  const documents = [];
  let offset = 0;

  while (typeIds.length > 0) {
    const page = await databases.listDocuments(db, voteCollection, [
      Query.equal("typeId", typeIds),
      Query.limit(100),
      Query.offset(offset),
    ]);
    documents.push(...page.documents);
    offset += page.documents.length;

    if (offset >= page.total || page.documents.length === 0) break;
  }

  return documents;
}

export async function POST(request: NextRequest) {
  try {
    const { votedById, voteStatus, type, typeId } = await request.json();

    const userVoteResponse = await databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("typeId", typeId),
      Query.equal("votedById", votedById),
    ]);
    const previousVote = userVoteResponse.documents[0] ?? null;
    const isRemovingVote = previousVote?.voteStatus === voteStatus;
    const questionOrAnswer = await databases.getDocument(
      db,
      type === "question" ? questionCollection : answerCollection,
      typeId,
    );

    let document: Awaited<ReturnType<typeof databases.createDocument>> | null = null;
    let message: string;

    if (isRemovingVote && previousVote) {
      await databases.deleteDocument(
        db,
        voteCollection,
        previousVote.$id,
      );
      message = "Vote Withdrawn";
    } else if (previousVote) {
      document = await databases.updateDocument<VoteDocument>(
        db,
        voteCollection,
        previousVote.$id,
        { voteStatus },
      );
      message = "Vote Status Updated";
    } else {
      document = await databases.createDocument<VoteDocument>(
        db,
        voteCollection,
        ID.unique(),
        { type, typeId, voteStatus, votedById },
      );
      message = "Voted";
    }

    const [questions, answers, upvotes, downvotes] = await Promise.all([
      getAuthoredDocuments(questionCollection, questionOrAnswer.authorId),
      getAuthoredDocuments(answerCollection, questionOrAnswer.authorId),
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "upvoted"),
        Query.limit(1),
      ]),
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "downvoted"),
        Query.limit(1),
      ]),
    ]);

    const authoredContentIds = [...questions, ...answers].map(item => item.$id);
    const authoredVotes = await getVotesForContent(authoredContentIds);
    const reputation = Math.max(
      0,
      answers.length + authoredVotes.reduce(
        (total, vote) => total + (vote.voteStatus === "upvoted" ? 1 : -1),
        0,
      ),
    );
    const author = await users.get<UserPrefs>(questionOrAnswer.authorId);
    await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
      ...author.prefs,
      reputation,
    });

    return NextResponse.json(
      {
        data: {
          document,
          voteScore: Math.max(0, upvotes.total - downvotes.total),
        },
        message,
      },
      {
        status: isRemovingVote ? 200 : 201,
      },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error deleting answer";
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? Number((error as { status?: number }).status ?? 500)
        : 500;

    return NextResponse.json(
      { message },
      { status },
    );
  }
}
