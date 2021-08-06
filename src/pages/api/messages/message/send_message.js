import prisma from '~/lib/Prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const send_message = await prisma.messages.create({
      data: {
        message: req.body.message_box,
        date: new Date(),
        roomName: req.body.roomName,
        userId: req.body.userId
      }
    })
    res.json(send_message)
  } else {
    res.send("POST METHOD ONLY!")
  }
}