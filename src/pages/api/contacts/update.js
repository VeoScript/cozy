import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const update = await prisma.contacts.updateMany({
      where: {
        id: req.body.contactId,
        userId: req.body.userId
      },
      data: {
        profile: req.body.profile,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        tiktok: req.body.tiktok,
        youtube: req.body.youtube,
        userId: req.body.userId
      }
    })
    res.json(update)
  } else {
    res.send("PUT METHOD ONLY!")
  }
}