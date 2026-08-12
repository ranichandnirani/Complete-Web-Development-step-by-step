"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

export default function RegisterPage() {
    const { createAccount, login } = useAuthStore();
    const router = useRouter();
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const firstname = formData.get("firstname")?.toString().trim();
        const lastname = formData.get("lastname")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();

        if (!firstname || !lastname || !email || !password) {
            setError("Please fill out all fields.");
            return;
        }

        setIsLoading(true);
        setError("");

        const response = await createAccount(`${firstname} ${lastname}`.trim(), email, password);

        if (response.error) {
            setError(response.error.message);
            setIsLoading(false);
            return;
        }

        const loginResponse = await login(email, password);

        if (loginResponse.error) {
            setError(loginResponse.error.message);
            setIsLoading(false);
            return;
        }

        router.push("/");
        router.refresh();
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 px-4 py-32">
            <h1 className="text-2xl font-bold">Create an account</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input name="firstname" placeholder="First name" required className="rounded border p-2" />
            <input name="lastname" placeholder="Last name" required className="rounded border p-2" />
            <input name="email" type="email" placeholder="Email" required className="rounded border p-2" />
            <input name="password" type="password" placeholder="Password" minLength={8} required className="rounded border p-2" />
            <button type="submit" disabled={isLoading} className="rounded bg-orange-500 px-4 py-2 font-bold text-white disabled:opacity-50">
                {isLoading ? "Creating account..." : "Register"}
            </button>
        </form>
    );
}
