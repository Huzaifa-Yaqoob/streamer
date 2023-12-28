"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { createUserInstance, headerForFormData } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error-message";

export default function useChangeAvatar() {
  const { data, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  // loading state for removing avatar
  const [RisLoading, setRIsLoading] = useState(false);
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
      setError(getErrorMessage(error));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeAvatar = async (): Promise<boolean> => {
    try {
      if (data?.user.image === undefined) {
        return true;
      }

      setError("");
      setRIsLoading(true);
      const res = await userInstance.delete("/avatar");

      update({
        image: undefined,
      });
      return true;
    } catch (error: any) {
      console.log(error);
      setError(getErrorMessage(error));
      return false;
    } finally {
      setRIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    RisLoading,
    removeError,
    changeAvatar,
    removeAvatar,
  };
}
