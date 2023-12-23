import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LandingLayout from "@/components/layouts/LandingLayout";

export default async function About(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/user");
  }
  return <LandingLayout>This is About page</LandingLayout>;
}
