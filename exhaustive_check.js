
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const allProps = await prisma.property.findMany()
  const allPres = await prisma.prelisting.findMany()
  const allUsers = await prisma.user.findMany()
  
  console.log('--- EXHAUSTIVE DB DUMP ---')
  console.log('Users:', allUsers.length)
  allUsers.forEach(u => console.log(`- User: ${u.email} (ID: ${u.id})`))

  console.log('\nProperties:', allProps.length)
  allProps.forEach(p => {
    console.log(`- [PROP] ${p.title} | UserID: ${p.userId} | ExtURL: ${p.externalUrl ? 'YES' : 'NO'}`)
  })

  console.log('\nPrelistings:', allPres.length)
  allPres.forEach(p => {
    console.log(`- [PRE] ${p.title} | UserID: ${p.userId}`)
  })
}

main().catch(console.error).finally(() => prisma.$disconnect())
