import prisma from '~/lib/Prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const joinRoom = await prisma.joinedRooms.create({
      data: {
        date: new Date(),
        roomName: req.body.roomName,
        userId: req.body.userId
      }
    })
    res.json(joinRoom)
  } else {
    res.send("POST METHOD ONLY!")
  }
}