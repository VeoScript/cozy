import { withIronSession } from 'next-iron-session'
import prisma from '~/lib/prisma'

async function handler(req, res) {

  // get user from prisma
  const findUser = await prisma.user.findMany({
    where: {
      username: req.body.username
    },
    select: {
      id: true,
      username: true
    }
  })

  const getId = findUser[0].id
  const getUsername = findUser[0].username

  // get user from database then:
  req.session.set("user", {
    id: getId,
    username: getUsername,
    admin: true
  });
  await req.session.save()
  res.send("Logged in")
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "cozy_cookie",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  }
})