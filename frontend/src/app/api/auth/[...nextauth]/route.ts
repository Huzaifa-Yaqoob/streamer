import NextAuth, { NextAuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export interface ExtendedUser {
  email?: string;
  username?: string;
  avatarUrl?: string;
  token?: string;
}

export interface ExtendedSession extends DefaultSession {
  user?: ExtendedUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        if (req.body?.type !== "login" && req.body?.type !== "register") {
          throw new Error("Type of request is invalid");
        }

        const res = await fetch(
          `http://localhost:3300/user/${req.body?.type}`,
          {
            method: "POST",
            body: req.body?.data,
            headers: { "Content-Type": "application/json" },
          }
        );

        const returnedData = await res.json();

        if (!res.ok) {
          throw new Error(returnedData.message);
        }

        if (res.ok && returnedData) {
          return returnedData;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/",
    signOut: "/",
  },
  callbacks: {
    async jwt(params: any) {
      if (params.user) {
        params.token.token = params.user.token;
        params.token.image = params.user.avatarUrl;
        params.token.name = params.user.username;
      }

      return params.token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = token.image as string;
        session.user.name = token.name as string;
        (session.user as { token: string }).token = token.token as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
