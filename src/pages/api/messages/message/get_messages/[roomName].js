import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { roomName } = req.query
  const get_messages = await prisma.messages.findMany({
    orderBy: [
      {
        id: 'asc'
      }
    ],
    where: {
      roomName: roomName
    },
    select: {
      id: true,
      message: true,
      userId: true,
      date: true,
      user: {
        select: {
          avatar: true
        }
      }
    }
  })
  res.json(get_messages)
}