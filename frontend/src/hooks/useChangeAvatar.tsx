"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";
import { createUserInstance, headerForFormData } from "@/lib/axios";

export default function useChangeAvatar() {
  const { data, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const removeError = () => {
    setError("");
  };

  headerForFormData.authorization = data?.user.token || "";
  const userInstance = createUserInstance(headerForFormData);

  const changeAvatar = async (value: any): Promise<boolean> => {
    try {
      setError("");
      setIsLoading(true);
      const res = await userInstance.patch("/avatar", value);

      update({
        image: res.data.avatarUrl,
      });
      return true;
    } catch (error: any) {
      console.log(error);
      const err: string =
        error.response.data.message ||
        error.message ||
        "Something`s wrong happen";
      setError(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeAvatar = async (): Promise<boolean> => {
    try {
      setError("");
      setIsLoading(true);
      const res = await userInstance.delete("/avatar");
      update({
        image: undefined,
      });
      return true;
    } catch (error: any) {
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

  return { isLoading, error, removeError, changeAvatar, removeAvatar };
}
