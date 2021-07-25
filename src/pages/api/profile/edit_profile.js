import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const edit_profile = await prisma.user.updateMany({
      where: {
        id: req.body.id,
        username: req.body.username
      },
      data: {
        avatar: req.body.avatar,
        name: req.body.name,
        email: req.body.email
      }
    })
    res.json(edit_profile)
  } else {
    res.send("PUT METHOD ONLY!")
  }
}