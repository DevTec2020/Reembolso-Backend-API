//Isso é para eu acompanhar um log das query
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
  log: ["query"],
})
