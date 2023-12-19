"use client";

import { create } from "zustand";
import { UserData } from "@/hooks/useAuth";

export type AuthStoreState = { userData: UserData | null };

export type AuthStoreAction = {
  signIn: (UserData: UserData) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthStoreState & AuthStoreAction>((set) => ({
  userData: null,
  signIn: (newUserData) => {
    const jsonData = JSON.stringify(newUserData);
    localStorage.setItem("streamer", jsonData);
    set(() => ({ userData: newUserData }));
  },
  signOut: () => {
    localStorage.removeItem("streamer");
    set(() => ({ userData: null }));
  },
}));
