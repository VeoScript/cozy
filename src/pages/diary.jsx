import Head from 'next/head'
import Layout from '~/layouts/default'
import Dashboard from '~/components/Dashboard'
import DiaryDisplay from '~/components/DiaryDisplay'

export default function Diary() {
  return (
    <>
      <Head>
        <title>Cozy | Diary</title>
      </Head>
      <Layout>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full pb-[60px] md:pb-0 rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <div className="hidden md:block w-full max-w-sm">
            <Dashboard />
          </div>
          <DiaryDisplay />
        </div>
      </Layout>
    </>
  )
}
