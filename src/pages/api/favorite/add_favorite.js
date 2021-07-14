import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const add_favorite = await prisma.contacts.updateMany({
      where: {
        id: req.body.contactId,
        userId: req.body.userId
      },
      data: {
        favorite: req.body.favorite,
      }
    })
    res.json(add_favorite)
  } else {
    res.send("PUT METHOD ONLY!")
  }
}