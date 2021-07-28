import Head from 'next/head'
import Layout from '~/layouts/default'
import Rooms from '~/components/Rooms'
import withSession from '~/lib/Session'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Messages({ online_user, rooms, user_joined_rooms }) {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Cozy | Messages</title>
      </Head>
      <Layout online_user={online_user}>
        <div className="font-poppins flex flex-row w-full h-full rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <Rooms
            online_user={online_user}
            rooms={rooms}
            user_joined_rooms={user_joined_rooms}
          />
          <div className={`${router.pathname === '/messages' ? 'hidden md:flex' : 'flex'} flex-col items-center justify-center w-full h-screen space-y-5`}>
            <div className="flex flex-col items-center w-full space-y-1">
              <h1 className="font-black font-raleway text-xl text-honey">COZY</h1>
              <span className="font-light text-xs text-center text-gray-400">Welcome to Messenger. Discover the world of cozy.</span>
            </div>
          </div>
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
          userId: true
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
      roomName: true,
      room: {
        select: {
          image: true,
          name: true,
          status: true,
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