import Header from "../pages/common/Header";
import { redirect } from "next/navigation";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <main className="h-[100dvh] flex flex-col justify-stretch">
      <Header />
      {children}
    </main>
  );
}
