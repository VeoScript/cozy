import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const deleteDiary = await prisma.diary.deleteMany({
      where: {
        id: req.body.diaryId,
        userId: req.body.userId
      }
    })
    res.json(deleteDiary)
  } else {
    res.send("DELETE METHOD ONLY!")
  }
}