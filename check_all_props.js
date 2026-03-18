
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const allProps = await prisma.property.findMany()
  const allUsers = await prisma.user.findMany()
  
  console.log('--- DB DUMP ---')
  console.log('Properties:', allProps.length)
  allProps.forEach(p => {
    const user = allUsers.find(u => u.id === p.userId)
    console.log(`- [${p.id}] ${p.title} | User: ${user ? user.email : 'MISSING (' + p.userId + ')'}`)
  })
}

main().catch(console.error).finally(() => prisma.$disconnect())
