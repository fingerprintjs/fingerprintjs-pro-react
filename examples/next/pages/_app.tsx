import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FpProvider } from '@fingerprintjs/fingerprintjs-pro-react'

const fpjsPublicApiKey = process.env.NEXT_PUBLIC_FPJS_PUBLIC_API_KEY as string

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FpProvider apiKey={fpjsPublicApiKey}>
      <Component {...pageProps} />
    </FpProvider>
  )
}

export default MyApp
