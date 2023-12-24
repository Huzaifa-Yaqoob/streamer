"use client";

import { useState } from "react";
import * as z from "zod";
import { usernameSchema } from "@/lib/zod-schemas/updateUserInfoSchema";
import { useSession } from "next-auth/react";
import { createUserInstance, headerForJSON } from "@/lib/axios";
import { AxiosError } from "axios";

export default function useUpdateUsername() {
  const { data, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  headerForJSON.authorization = data?.user?.token || "";
  const userInstance = createUserInstance(headerForJSON);

  const updateUsername = async (value: z.infer<typeof usernameSchema>) => {
    try {
      setError("");
      setIsLoading(true);
      const res = await userInstance.patch("/username", value);
      console.log(res);
      update({ name: res.data.username || data?.user.name || "unknown" });
      return true;
    } catch (error: AxiosError | any) {
      console.log(error);
      const err: string =
        error.response.data.message[0] ||
        error.response.data.message ||
        error.message ||
        "Something`s wrong happen";
      setError(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeError = () => {
    setError("");
  };

  return { isLoading, error, updateUsername, removeError };
}
