import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const rooms = await prisma.rooms.findMany({
      select: {
        image: true,
        name: true,
        status: true,
        date: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
    res.json(rooms)
  } else {
    res.send("GET METHOD ONLY!")
  }
}