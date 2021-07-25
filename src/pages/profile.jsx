import Head from 'next/head'
import withSession from '~/lib/Session'
import Layout from '~/layouts/default'
import ProfileDisplay from '~/components/ProfileDisplay'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Profile({ online_user, count_contacts, count_favorites, count_diaries, count_rooms }) {
  return (
    <>
      <Head>
        <title>Cozy | { online_user.name }</title>
      </Head>
      <Layout online_user={online_user}>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <ProfileDisplay
            online_user={online_user}
            count_contacts={count_contacts}
            count_favorites={count_favorites}
            count_diaries={count_diaries}
            count_rooms={count_rooms}
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

  //count all contacts from the specific user
  const count_contacts = await prisma.contacts.count({
    where: {
      userId: user.id
    },
    select: {
      _all: true
    }
  })

  //count all favorites from the specific user
  const count_favorites = await prisma.contacts.count({
    where: {
      userId: user.id,
      favorite: true
    },
    select: {
      _all: true
    }
  })

  //count all diaries from the specific user
  const count_diaries = await prisma.diary.count({
    where: {
      userId: user.id
    },
    select: {
      _all: true
    }
  })

  //count all rooms from the specific user
  const count_rooms = await prisma.rooms.count({
    where: {
      authorId: user.id
    },
    select: {
      _all: true
    }
  })

  return {
    props: {
      online_user,
      count_contacts,
      count_favorites,
      count_diaries,
      count_rooms
    }
  }
})