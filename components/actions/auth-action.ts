
import prisma from '@/lib/prisma'


const bcrypt = require('bcrypt');

export const signInEmailPassword=async (email:string,password:string)=>{
    
    if(!email || !password) return null

    const user=await prisma.user.findUnique({where:{email}})
    
    if (!user) {
const dbUser=await createUser(email,password)
console.log("%c Line:11 🍆 dbUser", "color:#f5ce50", dbUser);
return dbUser
    }
    if(!bcrypt.compareSync(password,user.password??'')){
        return null
    }
    return user
}


const createUser = async(email:string,password:string)=>{
    const user= await prisma.user.create({
        data:{
            email:email,
            password:bcrypt.hashSync(password),
            name:email.split('@')[0],
        }
    });
    return user
}