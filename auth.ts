
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import prisma from "@/lib/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      roles: string[]
      isActive: boolean
    } & DefaultSession["user"]
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: authConfig.providers,
  secret: authConfig.secret,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.roles = (user as any).roles
        token.isActive = (user as any).isActive
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.roles = (token.roles as string[]) || ["user"]
        session.user.isActive = (token.isActive as boolean) ?? true
      }
      return session
    },
    authorized: authConfig.callbacks?.authorized,
  },
})

