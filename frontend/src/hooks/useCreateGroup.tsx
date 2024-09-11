import { z } from "zod";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createGroupSchema } from "@/lib/zod-schemas/createGroupSchema";
import { getErrorMessage } from "@/lib/error-message";
import { headerForJSON } from "@/lib/axios";

export default function useCreateGroup() {
  const { data, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  headerForJSON.authorization = data?.user.token || "";

  const createGroup = (data: z.infer<typeof createGroupSchema>) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return { isLoading, error, createGroup };
}
