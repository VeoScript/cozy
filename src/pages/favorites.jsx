import Head from 'next/head'
import Layout from '~/layouts/default'
import FavoriteDisplay from '~/components/FavoriteDisplay'
import withSession from '~/lib/Session'
import prisma from '~/lib/Prisma'

export default function Favorites({ online_user, favorite_contacts }) {
  return (
    <>
      <Head>
        <title>Cozy | Favorites</title>
      </Head>
      <Layout online_user={online_user}>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full pb-[60px] md:pb-0 rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <FavoriteDisplay
            online_user={online_user}
            favorite_contacts={favorite_contacts}
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

  const favorite_contacts = await prisma.contacts.findMany({
    where: {
      userId: user.id,
      favorite: true
    },
    orderBy: [
      {
        name: 'asc'
      }
    ]
  })

  return {
    props: {
      online_user,
      favorite_contacts
    }
  }
})