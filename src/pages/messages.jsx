import Head from 'next/head'
import Layout from '~/layouts/default'
import MessagesDashboard from '~/components/MessagesDashboard'
import withSession from '~/lib/Session'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Messages({ online_user, rooms, user_joined_rooms }) {
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
            user_joined_rooms={user_joined_rooms}
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
      passcode: true,
      author: {
        select: {
          name: true
        }
      },
      joined_rooms: {
        select: {
          indicator: true,
          userId: true,
          roomName: true
        }
      }
    }
  })

  //get all joined rooms of the user
  const user_joined_rooms = await prisma.joinedRooms.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ],
    where: {
      userId: user.id
    },
    select: {
      id: true,
      userId: true, 
      user: true,
      roomName:true,
      room: {
        select: {
          image: true,
          joined_rooms: {
            select: {
              id: true,
              date: true,
              indicator: true,
              messages: true,
              roomName: true,
              userId: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              }
            }
          },
          author: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  return {
    props: {
      online_user,
      rooms,
      user_joined_rooms
    }
  }
})