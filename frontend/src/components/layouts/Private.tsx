"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "@/lib/zustand/auth-state";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.userData);
  if (!user) {
    redirect("/");
  }

  return <>{children}</>;
}
