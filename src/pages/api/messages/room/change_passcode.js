import prisma from '~/lib/Prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const change_passcode = await prisma.rooms.updateMany({
      where: {
        id: req.body.room_id,
        authorId: req.body.room_author_id
      },
      data: {
        passcode: req.body.passcode
      }
    })
    res.json(change_passcode)
  } else {
    res.send("PUT METHOD ONLY!")
  }
}