"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/lib/zustand/auth-state";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, signIn] = useAuthStore((state) => [
    state.userData,
    state.signIn,
  ]);

  if (user) {
    redirect("/user");
  }

  useEffect(() => {
    const streamer = localStorage.getItem("streamer");
    const JStreamer = streamer ? JSON.parse(streamer) : null;
    console.log(JStreamer);
    if (!user) {
      signIn(JStreamer);
    }
  }, []);

  return <>{children}</>;
}
