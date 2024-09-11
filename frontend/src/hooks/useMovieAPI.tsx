"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import * as z from "zod";
import {
  createUserMoviesInstance,
  headerForFormData,
  headerForJSON,
} from "@/lib/axios";
import { getErrorMessage } from "@/lib/error-message";
import { renameMovieSchema } from "@/lib/zod-schemas/movieApiSchema";

export default function useMovieAPI() {
  const { data } = useSession();
  // loading state for uploading movie
  const [isLoading, setIsLoading] = useState(false);
  // progressPercent state for uploading movie
  const [progressPercent, setProgressPercent] = useState(0);
  // error state for uploading movie
  const [error, setError] = useState("");
  // loading state for renaming movie
  const [RisLoading, setRisLoading] = useState(false);
  // error state for renaming movie
  const [RError, setRError] = useState("");
  // loading state for removing movie
  const [RMisLoading, setRMisLoading] = useState(false);
  // error state for removing movie
  const [RMError, setRMError] = useState("");

  const removeError = () => {
    setRError("");
    setError("");
    setRError("");
  };

  // adding token in the header
  headerForFormData.authorization = data?.user.token;
  headerForJSON.authorization = data?.user.token;
  // instance to send form data
  const userMoviesInstance = createUserMoviesInstance(headerForFormData);
  // instance to send json data
  const userMoviesInstanceJ = createUserMoviesInstance(headerForJSON);

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
      console.log(res, "responded");
      return true;
    } catch (error: any | AxiosError) {
      console.log(error);
      setError(getErrorMessage(error));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const renameMovie = async (
    id: string,
    data: z.infer<typeof renameMovieSchema>
  ): Promise<boolean> => {
    try {
      setRisLoading(true);
      setRError("");
      const res = await userMoviesInstanceJ.patch(`/${id}`, data);
      return true;
    } catch (error) {
      console.log(error);
      setRError(getErrorMessage(error));
      return false;
    } finally {
      setRisLoading(false);
    }
  };

  const removeMovie = async (id: string) => {
    try {
      setRMisLoading(true);
      setRMError("");
      const res = await userMoviesInstanceJ.delete(`/${id}`);
      console.log(res);
      return true;
    } catch (error) {
      console.log(error);
      setRMError(getErrorMessage(error));
      return false;
    } finally {
      setRMisLoading(false);
    }
  };

  return {
    isLoading,
    error,
    progressPercent,
    RError,
    RisLoading,
    RMError,
    RMisLoading,
    uploadMovie,
    removeError,
    renameMovie,
    removeMovie,
  };
}
