import type { Metadata } from "next";
import NavBar from "@/components/common/navbar/NavBar";
import Footer from "@/components/common/footer/Footer";

export const metadata: Metadata = {
  title: "Streamer | user",
  description: "Watch movies together.",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
