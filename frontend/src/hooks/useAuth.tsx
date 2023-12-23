"use client";

import { useState } from "react";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { registerSchema, loginSchema } from "@/lib/zod-schemas/authSchema";

export type UserData = {
  email: string;
  username: string;
  token: string;
  avatarUrl?: string;
};

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signedIn = async (
    data: z.infer<typeof registerSchema | typeof loginSchema>,
    type: "login" | "register"
  ): Promise<boolean | undefined> => {
    setIsLoading(true);
    setErrorMessage("");

    const res = await signIn("credentials", {
      data: JSON.stringify(data),
      type,
      redirect: false,
    });
    console.log(res);
    if (!res?.ok) {
      setErrorMessage(
        res?.error ? res.error : "Something wrong is hapened sorry"
      );
      setIsLoading(false);
      return false;
    }

    setIsLoading(false);
    return true;
  };

  return { isLoading, errorMessage, signedIn };
}
