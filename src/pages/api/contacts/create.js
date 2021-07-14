import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const create = await prisma.contacts.create({
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
    res.json(create)
  } else {
    res.send("POST METHOD ONLY!")
  }
}