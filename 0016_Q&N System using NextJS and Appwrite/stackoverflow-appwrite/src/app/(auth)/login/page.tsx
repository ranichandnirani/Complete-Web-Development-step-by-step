"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

export default function LoginPage() {
    const { login } = useAuthStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();

        if (!email || !password) {
            setError("Please fill all fields.");
            return;
        }

        setIsLoading(true);
        setError("");
        const response = await login(email, password);

        if (response.error) {
            setError(response.error.message);
            setIsLoading(false);
            return;
        }

        router.push("/");
        router.refresh();
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 px-4 py-32">
            <h1 className="text-2xl font-bold">Log in</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input name="email" type="email" placeholder="Email" required className="rounded border p-2" />
            <input name="password" type="password" placeholder="Password" required className="rounded border p-2" />
            <button type="submit" disabled={isLoading} className="rounded bg-orange-500 px-4 py-2 font-bold text-white disabled:opacity-50">
                {isLoading ? "Logging in..." : "Log in"}
            </button>
        </form>
    );
}
