
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"






declare module "next-auth"{
  interface Session{
    user:{
      roles:string[]
      isActive:boolean
    }& DefaultSession["user"]
  }
}
const prisma = new PrismaClient()
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [google,github],
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


