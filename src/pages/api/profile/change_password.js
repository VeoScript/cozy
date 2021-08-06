import bcrypt from 'bcryptjs'
import prisma from '~/lib/Prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    
    const rawPassword = req.body.newpassword

    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(rawPassword, salt)

    const change_password = await prisma.user.updateMany({
      where: {
        id: req.body.id,
        username: req.body.username
      },
      data: {
        password: password
      }
    })
    res.json(change_password)
  } else {
    res.send("PUT METHOD ONLY!")
  }
}