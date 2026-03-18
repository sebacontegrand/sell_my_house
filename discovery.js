
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const forms = await prisma.form.findMany()
  const prelistings = await prisma.prelisting.findMany()
  const properties = await prisma.property.findMany()
  
  console.log('--- DATA DISCOVERY ---')
  console.log('Forms:', forms.length)
  console.log('Prelistings:', prelistings.length)
  console.log('Properties:', properties.length)
  
  if (forms.length > 0) {
    forms.forEach(f => {
      const parent = prelistings.find(p => p.id === f.prelistingId)
      console.log(`- Form for Prelisting ID: ${f.prelistingId} | Parent exists: ${!!parent}`)
    })
  }

  // Check for ANY property that might belong to the user but has a different ID format
  const allProps = await prisma.property.findMany()
  console.log('\nAll Properties in System:', allProps.length)
  allProps.forEach(p => console.log(`  - Title: ${p.title} | UserID: ${p.userId} | URL: ${p.externalUrl || 'None'}`))
}

main().catch(console.error).finally(() => prisma.$disconnect())
