import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET || "supersecretkey123456789012345678901234",
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [],
};
