import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    
    const delete_room = await prisma.rooms.deleteMany({
      where: {
        id: req.body.room_id,
        authorId: req.body.room_author_id
      },
    })

    const delete_joined_room = await prisma.joinedRooms.deleteMany({
      where: {
        id: req.body.joined_room_id
      }
    })

    const transaction = await prisma.$transaction([delete_room, delete_joined_room])

    res.json(transaction)
  } else {
    res.send("DELETE METHOD ONLY!")
  }
}