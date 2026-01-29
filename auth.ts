
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import prisma from "@/lib/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      roles: string[]
      isActive: boolean
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })
      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.roles = token.roles as string[]
        session.user.id = token.id as string
      }
      return session
    },
  },
  ...authConfig,
})

