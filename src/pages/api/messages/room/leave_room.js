import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const leave_room = await prisma.joinedRooms.deleteMany({
      where: {
        id: req.body.joinedRoomId,
        userId: req.body.userId
      }
    })
    res.json(leave_room)
  } else {
    res.send("DELETE METHOD ONLY!")
  }
}