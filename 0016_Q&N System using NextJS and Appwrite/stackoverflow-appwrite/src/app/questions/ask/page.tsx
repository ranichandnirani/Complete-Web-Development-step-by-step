"use client";

import QuestionForm from "@/components/QuestionForm";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function AskQuestionPage() {
    const router = useRouter();
    const { user, hydrated } = useAuthStore();

    React.useEffect(() => {
        if (hydrated && !user) router.replace("/login");
    }, [hydrated, router, user]);

    if (!hydrated || !user) {
        return <div className="container mx-auto px-4 pb-20 pt-36">Loading...</div>;
    }

    return (
        <main className="container mx-auto max-w-4xl px-4 pb-20 pt-36">
            <h1 className="mb-8 text-3xl font-bold">Ask a question</h1>
            <QuestionForm />
        </main>
    );
}
