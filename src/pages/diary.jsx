import Head from 'next/head'
import Layout from '~/layouts/default'
import Dashboard from '~/components/Dashboard'
import DiaryDisplay from '~/components/DiaryDisplay'
import withSession from '~/lib/Session'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Diary({ online_user, count_contacts, count_favorites, count_diaries, diaries }) {
  return (
    <>
      <Head>
        <title>Cozy | Diary</title>
      </Head>
      <Layout online_user={online_user}>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full pb-[60px] md:pb-0 rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <div className="hidden md:block w-full max-w-sm">
            <Dashboard
              online_user={online_user}
              count_contacts={count_contacts}
              count_favorites={count_favorites}
              count_diaries={count_diaries}
            />
          </div>
          <DiaryDisplay
            online_user={online_user}
            diaries={diaries}
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

  //find all diary from the specific user
  const diaries = await prisma.diary.findMany({
    where: {
      userId: user.id
    },
    orderBy: [
      {
        date: 'desc'
      }
    ]
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

  return {
    props: {
      online_user,
      count_contacts,
      count_favorites,
      count_diaries,
      diaries
    }
  }
})