import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues, { type Question } from "./EditQues";

const Page = async ({ params }: { params: Promise<{ quesId: string; quesName: string }> }) => {
    const { quesId } = await params;

    const question = await databases.getDocument(db, questionCollection, quesId);

    const plainQuestion = JSON.parse(JSON.stringify(question));

    return <EditQues question={plainQuestion as unknown as Question} />;
};

export default Page;