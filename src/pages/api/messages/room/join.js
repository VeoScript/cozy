import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const joinRoom = await prisma.joinedRooms.create({
      data: {
        date: new Date(),
        roomId: req.body.roomId,
        userId: req.body.userId
      }
    })
    res.json(joinRoom)
  } else {
    res.send("POST METHOD ONLY!")
  }
}