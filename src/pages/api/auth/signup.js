import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const { avatar, name, email, username, password: rawPassword } = JSON.parse(req.body)

  const salt = await bcrypt.genSalt()
  const password = await bcrypt.hash(rawPassword, salt)

  const signup = await prisma.user.create({
    data: {
      avatar,
      name,
      email,
      username,
      password
    }
  })
  res.json(signup) 
}