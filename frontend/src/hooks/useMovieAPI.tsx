"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { createUserMoviesInstance, headerForFormData } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error-message";

export default function useMovieAPI() {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState("");

  const removeError = () => {
    setError("");
  };

  headerForFormData.authorization = data?.user.token;
  const userMoviesInstance = createUserMoviesInstance(headerForFormData);

  const uploadMovie = async (value: any) => {
    try {
      setIsLoading(true);
      setError("");
      const res = await userMoviesInstance.post("/", value, {
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent?.total || 1)
          );
          setProgressPercent(percentCompleted);
        },
      });
      console.log(res);
      return true;
    } catch (error: any | AxiosError) {
      console.log(error);
      setError(getErrorMessage(error));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, progressPercent, uploadMovie, removeError };
}
