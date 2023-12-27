"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { createUserInstance, headerForJSON } from "@/lib/axios";

export default function useDeleteAccount() {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  headerForJSON.authorization = data?.user.token || "";
  const userInstance = createUserInstance(headerForJSON);

  const deleteAccount = async (): Promise<boolean> => {
    try {
      setError("");
      setIsLoading(true);
      const res = await userInstance.delete("");
      return true;
    } catch (error) {
      console.log(error);
      setError("something`s wrong here");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteAccount };
}
