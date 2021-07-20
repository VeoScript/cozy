import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import Layout from '~/layouts/default'
import Rooms from '~/components/Rooms'
import ChatRoom from '~/components/ChatRoom'
import Participants from '~/components/Participants'
import withSession from '~/lib/Session'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function JoinedRoomMessages({ online_user, rooms, user_joined_rooms, roominfo, messages, participants }) {

  if (!roominfo) {
    return <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  }

  return (
    <>
      <Head>
        <title>Cozy | Messages</title>
      </Head>
      <Layout online_user={online_user}>
        <div className="font-poppins flex flex-row w-full h-full rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <Rooms
            online_user={online_user}
            user_joined_rooms={user_joined_rooms}
            rooms={rooms}
          />
          <ChatRoom  
            online_user={online_user}
            messages={messages}
            roominfo={roominfo}
          />
          <Participants
            participants={participants}
          />
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = withSession(async function ({ req, query }) {

  const { roomName } = query

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
          author: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  //get the room information of joined room
  const roominfo = await prisma.joinedRooms.findFirst({
    where: {
      roomName: roomName,
      userId: user.id
    },
    select: {
      roomName: true,
      room: {
        select: {
          image: true,
          author: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  // get messages from the joined room
  const messages = await prisma.messages.findMany({
    orderBy: [
      {
        id: 'asc'
      }
    ],
    where: {
      roomName: roomName
    },
    select: {
      id: true,
      message: true,
      userId: true,
      user: {
        select: {
          avatar: true
        }
      }
    }
  })

  // get participants from the joined room
  const participants = await prisma.joinedRooms.findFirst({
    where: {
      roomName: roomName
    },
    select: {
      room: {
        select: {
          joined_rooms: {
            select: {
              user: {
                select: {
                  avatar: true,
                  name: true,
                  email: true
                }
              }
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
      user_joined_rooms,
      roominfo,
      messages,
      participants
    }
  }
})