
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";
declare module "next-auth"{
  interface Session{
    user:{
      roles:string[]
      isActive:boolean
    }& DefaultSession["user"]
  }
}
dotenv.config();
const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret:process.env.AUTH_SECRET,
  providers: [GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  }),github],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { 
        token.id = user.id
        
      }
      const dbUser= await prisma.user.findUnique({where:{email:token.email?? 'mo-email'}})
      token.roles=dbUser?.roles??['no-roles']
      token.id =dbUser?.id??'no=uuid'
      
      
      
      return token
    },
    async session({ session,token }) {
     
      return session
    },
  },
  
})




