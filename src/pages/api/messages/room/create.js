import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const create = await prisma.rooms.create({
      data: {
        image: req.body.image,
        name: req.body.name,
        status: req.body.status,
        date: new Date(),
        authorId: req.body.authorId,
        passcode: req.body.passcode
      }
    })
    res.json(create)
  } else {
    res.send("POST METHOD ONLY!")
  }
}