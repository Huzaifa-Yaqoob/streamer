import type { Metadata } from "next";
import NavBar from "@/components/common/navbar/NavBar";
import Footer from "@/components/common/footer/Footer";

export const metadata: Metadata = {
  title: "Streamer",
  description: "Watch movies together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
