import Head from 'next/head'
import Layout from '~/layouts/default'
import MessagesDashboard from '~/components/MessagesDashboard'
import MessagesDisplay from '~/components/MessagesDisplay'
import withSession from '~/lib/Session'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Messages({ online_user, rooms }) {
  return (
    <>
      <Head>
        <title>Cozy | Messages</title>
      </Head>
      <Layout online_user={online_user}>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <MessagesDashboard
            online_user={online_user}
            rooms={rooms}
          />
          <MessagesDisplay
            online_user={online_user}
            rooms={rooms}
          />
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = withSession(async function ({ req }) {
  //check the user session
  const user = req.session.get('user')

  if(!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  //find the logged in user from the database
  const online_user = await prisma.user.findFirst({
    where: {
      username: user.username
    }
  })

  //get all rooms from the database
  const rooms = await prisma.rooms.findMany({
    orderBy: [
      {
        date: 'desc'
      }
    ],
    select: {
      id: true,
      image: true,
      name: true,
      status: true,
      date: true,
      author: {
        select: {
          name: true
        }
      },
      joined_rooms: {
        select: {
          indicator: true,
          userId: true
        }
      }
    }
  })

  return {
    props: {
      online_user,
      rooms
    }
  }
})