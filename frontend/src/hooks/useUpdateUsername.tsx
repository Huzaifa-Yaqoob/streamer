"use client";

import { useState } from "react";
import * as z from "zod";
import { usernameSchema } from "@/lib/zod-schemas/updateUserInfoSchema";
import { useSession } from "next-auth/react";
import { createUserInstance, headerForJSON } from "@/lib/axios";
import { AxiosError } from "axios";
import { getErrorMessage } from "@/lib/error-message";

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
      console.log("sadasda");
      update({ name: res.data.username || data?.user.name || "unknown" });
      return true;
    } catch (error: AxiosError | any) {
      console.log("sadasda");
      console.log(error);
      setError(getErrorMessage(error));
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
