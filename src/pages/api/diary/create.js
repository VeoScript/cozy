import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const create = await prisma.diary.create({
      data: {
        photo: req.body.photo,
        title: req.body.title,
        content: req.body.create_story,
        date: new Date(),
        userId: req.body.userId
      }
    })
    res.json(create)
  } else {
    res.send("POST METHOD ONLY!")
  }
}