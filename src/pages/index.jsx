import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-row items-center jusify-center w-full h-screen bg-honey">
        <h1>Cozy Homepage</h1>
      </div>
    </>
  )
}
