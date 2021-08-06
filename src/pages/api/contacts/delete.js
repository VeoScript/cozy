import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const deleteContact = await prisma.contacts.deleteMany({
      where: {
        id: req.body.contactId,
        userId: req.body.userId
      }
    })
    res.json(deleteContact)
  } else {
    res.send("DELETE METHOD ONLY!")
  }
}