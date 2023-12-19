"use client";

import { useState } from "react";
import * as z from "zod";
import { AxiosError } from "axios";
import { useAuthStore } from "@/lib/zustand/auth-state";
import { createUserInstance } from "@/lib/axios";
import { registerSchema, loginSchema } from "@/lib/zod-schemas/authSchema";

export type UserData = {
  email: string;
  username: string;
  token: string;
  avatarUrl?: string;
};

export default function useAuth() {
  const signIn = useAuthStore((state) => state.signIn);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userInstance = createUserInstance();

  const register = async (
    data: z.infer<typeof registerSchema>
  ): Promise<boolean | undefined> => {
    setIsLoading(true);
    try {
      const res = await userInstance.post("/register", data);
      const userData = res.data as UserData;
      console.log(res);
      signIn(userData);
      return true;
    } catch (error: AxiosError | any) {
      console.log(error, "At useAuth register function");
      setErrorMessage(
        error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Something wrong is hapened sorry"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    data: z.infer<typeof loginSchema>
  ): Promise<boolean | undefined> => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await userInstance.post("/login", data);
      const userData = res.data as UserData;
      console.log(res);
      signIn(userData);
      return true;
    } catch (error: AxiosError | any) {
      console.log(error, "At useAuth login function");
      setErrorMessage(
        error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Something wrong is hapened sorry"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, register, login };
}
