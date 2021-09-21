import React  from 'react'
import '~/styles/tailwind.css'
import NextNProgress from '~/lib/NextProgressbar'
import { DefaultSeo } from 'next-seo'
import SEO from 'next-seo.config'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <DefaultSeo {...SEO} />
      <NextNProgress />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
