import Head from 'next/head'
import Layout from '~/layouts/default'
import SideBar from '~/components/SideBar'
import FavoriteDisplay from '~/components/FavoriteDisplay'

export default function Favorites() {
  return (
    <>
      <Head>
        <title>Cozy | Favorites</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-center w-full max-w-screen-2xl h-full bg-honey">
          <SideBar />
          <div className="font-poppins flex flex-col md:flex-row w-full h-full pb-[60px] md:pb-0 rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
            <FavoriteDisplay />
          </div>
        </div>
      </Layout>
    </>
  )
}
