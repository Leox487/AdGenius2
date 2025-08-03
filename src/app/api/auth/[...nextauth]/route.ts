import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For demo purposes, we'll use a simple check
        // In production, you'd validate against the database
        if (credentials?.email === "demo@example.com" && credentials?.password === "demo123") {
          // Check if user exists in database, if not create them
          let user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          
          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: "Demo User",
              }
            });
          }
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }
        return null;
      }
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 