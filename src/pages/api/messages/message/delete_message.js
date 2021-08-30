import prisma from '~/lib/Prisma'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    
    const delete_message = await prisma.messages.delete({
      where: {
        id: req.body.message_id,
      }
    })

    res.json(delete_message)
  } else {
    res.send("DELETE METHOD ONLY!")
  }
}