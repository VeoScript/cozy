import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const update = await prisma.rooms.updateMany({
      where: {
        id: req.body.room_id,
        authorId: req.body.room_author_id
      },
      data: {
        image: req.body.room_image,
        name: req.body.room_name
      }
    })
    res.json(update)
  } else {
    res.send("PUT METHOD ONLY!")
  }
}