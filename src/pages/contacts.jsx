import Head from 'next/head'
import Layout from '~/layouts/default'
import ContactsMobileView from '~/components/ContactsMobileView'

export default function Contacts() {
  return (
    <>
      <Head>
        <title>Cozy | Contacts</title>
      </Head>
      <Layout>
        <div className="font-poppins flex flex-col md:flex-row w-full h-full pb-[60px] md:pb-0 rounded-none md:rounded-l-2xl bg-modern-black text-modern-white">
          <ContactsMobileView />
        </div>
      </Layout>
    </>
  )
}
