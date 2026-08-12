import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import {UserPrefs} from "@/store/Auth"

export async function POST(request: NextRequest){
  try {
    const {questionId, answer, authorId} = await request.json();

    const response = await databases.createDocument(db, answerCollection, ID.unique(), {
      content: answer,
      authorId: authorId,
      questionId: questionId
    })

    // Increase author reputation
    const prefs = await users.getPrefs<UserPrefs>(authorId)
    const authorReputation = Number(prefs.reputation ?? 0) + 1
    await users.updatePrefs(authorId, {
      reputation: authorReputation
    })

    return NextResponse.json({ ...response, authorReputation }, {
      status: 201
    })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error creating answer";
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? Number((error as { status?: number }).status ?? 500)
        : 500;

    return NextResponse.json(
      {
        error: message,
      },
      {
        status,
      },
    );
  }
}

export async function DELETE(request: NextRequest){
  try {
    const {answerId} = await request.json()

    const answer = await databases.getDocument(db, answerCollection, answerId)

    const response = await databases.deleteDocument(db, answerCollection, answerId)

    //decrese the reputation
    const prefs = await users.getPrefs<UserPrefs>(answer.authorId)
    await users.updatePrefs(answer.authorId, {
      reputation: Math.max(0, Number(prefs.reputation ?? 0) - 1)
    })

    return NextResponse.json(
      {data: response},
      {status: 200}
  )



  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error deleting the answer";
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? Number((error as { status?: number }).status ?? 500)
        : 500;

    return NextResponse.json(
      {
        message,
      },
      {
        status,
      },
    );
  }
}