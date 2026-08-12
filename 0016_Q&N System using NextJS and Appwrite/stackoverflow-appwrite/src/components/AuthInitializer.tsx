"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/Auth";

export function AuthInitializer() {
  const verifySession = useAuthStore((state) => state.verifySession);

  useEffect(() => {
    void verifySession();
  }, [verifySession]);

  return null;
}
