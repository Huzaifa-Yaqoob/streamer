import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";

const fontMySans = Montserrat({
  subsets: ["latin"],
  variable: "--montserrat",
});

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
    <html lang="en" suppressHydrationWarning>
      <NextAuthProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-mySans antialiased",
            fontMySans.variable
          )}
        >
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
