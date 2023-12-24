import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      token: string;
    };
  }
  interface User {
    token: string;
    avatarUrl: string;
    username: string;
  }
}
