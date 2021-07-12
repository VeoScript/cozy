import Head from 'next/head'
import Layout from '~/layouts/default'
import Dashboard from '~/components/Dashboard'
import ContactDisplay from '~/components/ContactDisplay'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cozy</title>
      </Head>
      <Layout>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <Dashboard />
          <ContactDisplay />
        </div>
      </Layout>
    </>
  )
}
