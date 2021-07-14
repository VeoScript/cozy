import Head from 'next/head'
import Layout from '~/layouts/default'
import ContactsMobileView from '~/components/ContactsMobileView'
import withSession from '~/lib/Session'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Contacts({ online_user, contacts }) {
  return (
    <>
      <Head>
        <title>Cozy | Contacts</title>
      </Head>
      <Layout online_user={online_user}>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full pb-[60px] md:pb-0 rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <ContactsMobileView
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

  return {
    props: {
      online_user,
      contacts
    }
  }
})