"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { createUserMoviesInstance, headerForJSON } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error-message";

export default function useStreamingVideo() {
  const { data } = useSession();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState<any>();

  function removeError() {
    setError("");
  }

  headerForJSON.authorization = data?.user.token;
  const instance = createUserMoviesInstance(headerForJSON);

  async function loadVideo(url: string) {
    try {
      setIsLoading(false);
      setError("");
      const res = await instance.get(url);
      console.log(res);
      setStream(res.data.fileUrl);
      return true;
    } catch (error) {
      setError(getErrorMessage(error));
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { error, isLoading, stream, loadVideo, removeError };
}
