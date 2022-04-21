import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'

const fpjsPublicApiKey = process.env.NEXT_PUBLIC_FPJS_PUBLIC_API_KEY as string

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: fpjsPublicApiKey,
      }}
    >
      <Component {...pageProps} />
    </FpjsProvider>
  )
}

export default MyApp
