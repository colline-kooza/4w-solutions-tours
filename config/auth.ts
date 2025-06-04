import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/prisma/db";
import { UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true, // This helps with the OAuthAccountNotLinked error
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const existingUser = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            throw new Error("No user found with this email");
          }

          if (!existingUser.isVerified) {
            throw new Error("Please verify your email before signing in");
          }

          let passwordMatch: boolean = false;
          if (existingUser && existingUser.password) {
            passwordMatch = await compare(
              credentials.password,
              existingUser.password
            );
          }

          if (!passwordMatch) {
            throw new Error("Invalid password");
          }

          // Return user object that matches your simplified User interface
          return {
            id: existingUser.id,
            name: existingUser.name,
            firstName: existingUser.firstName || "",
            lastName: existingUser.lastName || "",
            phone: existingUser.phone || "",
            image: existingUser.image,
            email: existingUser.email,
            role: existingUser.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle OAuth providers (Google)
      if (account && account.provider === "google") {
        try {
          const existingUser = await db.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Check if this should be an admin
            let userRole: UserRole = UserRole.USER;

            // Example: Make specific emails admin
            const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
            if (adminEmails.includes(user.email!)) {
              userRole = UserRole.ADMIN;
            }

            // Create new user with appropriate role
            await db.user.create({
              data: {
                email: user.email!,
                name: user.name || "",
                firstName: profile?.name || "",
                lastName: profile?.name || "",
                image: user.image,
                role: userRole,
                isVerified: true,
              },
            });
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // For initial sign in, get fresh user data from database
        const userData = await db.user.findUnique({
          where: { id: user.id },
        });

        if (userData) {
          token.id = userData.id;
          token.firstName = userData.firstName || "";
          token.lastName = userData.lastName || "";
          token.phone = userData.phone || "";
          token.role = userData.role;
        }
      } else {
        // For subsequent requests, refresh user data from database
        try {
          const userData = await db.user.findUnique({
            where: { id: token.id as string },
          });

          if (userData) {
            token.firstName = userData.firstName || "";
            token.lastName = userData.lastName || "";
            token.phone = userData.phone || "";
            token.role = userData.role;
          }
        } catch (error) {
          console.error("Error refreshing user data in JWT callback:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.phone = token.phone as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async signIn(message) {
      console.log("Sign in event:", message);
    },
    async signOut(message) {
      console.log("Sign out event:", message);
    },
  },
};
