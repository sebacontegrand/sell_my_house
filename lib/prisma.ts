import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// Skip Prisma initialization during build
const prisma = process.env.NEXT_PHASE === 'phase-production-build'
  ? ({} as any)
  : (globalThis.prismaGlobal ?? prismaClientSingleton());

export default prisma

if (process.env.NODE_ENV !== "production" && process.env.NEXT_PHASE !== 'phase-production-build') {
  globalThis.prismaGlobal = prisma
}
