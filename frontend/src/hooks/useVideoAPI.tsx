import { useState } from "react";

export default function useVideoAPI() {
  const [iseLoading, seIsLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadVideo = async () => {};

  return { iseLoading, error, uploadVideo };
}
