import Head from 'next/head'
import SideBar from '~/components/SideBar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-row items-center justify-center w-full max-w-full h-screen overflow-hidden bg-modern-dim">
        <div className="flex flex-row justify-center w-full max-w-screen-2xl h-full bg-honey">
          <SideBar />
          <div className="flex flex-col w-full h-full rounded-l-2xl bg-modern-black">

          </div>
        </div>
      </div>
    </>
  )
}
