import Head from 'next/head'
import Layout from '~/layouts/default'
import Dashboard from '~/components/Dashboard'
import ContactDisplay from '~/components/ContactDisplay'
import withSession from '~/lib/Session'
import prisma from '~/lib/prisma'

export default function Home({ online_user, count_contacts, count_favorites, count_diaries, contacts }) {
  return (
    <>
      <Head>
        <title>Cozy</title>
      </Head>
      <Layout online_user={online_user}>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <Dashboard
            online_user={online_user}
            count_contacts={count_contacts}
            count_favorites={count_favorites}
            count_diaries={count_diaries}
          />
          <ContactDisplay
            online_user={online_user}
            contacts={contacts}
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

  //get all contacts from the specific user
  const contacts = await prisma.contacts.findMany({
    where: {
      userId: user.id
    },
    orderBy: [
      {
        name: 'asc'
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
      contacts,
      count_contacts,
      count_favorites,
      count_diaries
    }
  }
})