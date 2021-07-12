import Head from 'next/head'
import Layout from '~/layouts/default'
import FavoriteDisplay from '~/components/FavoriteDisplay'

export default function Favorites() {
  return (
    <>
      <Head>
        <title>Cozy | Favorites</title>
      </Head>
      <Layout>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full pb-[60px] md:pb-0 rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <FavoriteDisplay />
        </div>
      </Layout>
    </>
  )
}
