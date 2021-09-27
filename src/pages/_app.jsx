import React  from 'react'
import '~/styles/tailwind.css'
import NextNProgress from '~/lib/NextProgressbar'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <NextNProgress />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
