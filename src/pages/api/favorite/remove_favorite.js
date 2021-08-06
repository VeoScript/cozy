import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const remove_favorite = await prisma.contacts.updateMany({
      where: {
        id: req.body.contactId,
        userId: req.body.userId
      },
      data: {
        favorite: req.body.favorite,
      }
    })
    res.json(remove_favorite)
  } else {
    res.send("PUT METHOD ONLY!")
  }
}