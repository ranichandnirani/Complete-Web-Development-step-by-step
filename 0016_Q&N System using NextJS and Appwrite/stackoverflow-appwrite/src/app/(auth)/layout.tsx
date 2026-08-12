"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session, user, logout } = useAuthStore();
  const router = useRouter();

  if (session && user) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
        <BackgroundBeams />
        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/30 p-8 text-center shadow-2xl backdrop-blur-sm">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-orange-300">Already signed in</p>
          <h1 className="mb-4 text-3xl font-bold text-white">Welcome back</h1>
          <p className="mb-6 text-slate-200">You are currently signed in as {user.name || user.email}.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded bg-orange-500 px-4 py-2 font-bold text-white transition hover:bg-orange-400"
            >
              Go to home
            </button>
            <button
              type="button"
              onClick={() => {
                void logout();
                router.push("/login");
              }}
              className="rounded border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
      <BackgroundBeams />
      <div className="relative">{children}</div>
    </div>
  );
};

export default Layout