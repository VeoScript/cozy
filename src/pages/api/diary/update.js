import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const update = await prisma.diary.updateMany({
      where: {
        id: req.body.diaryId,
        userId: req.body.userId
      },
      data: {
        photo: req.body.photo,
        title: req.body.title,
        content: req.body.create_story
      }
    })
    res.json(update)
  } else {
    res.send("PUT METHOD ONLY!")
  }
}