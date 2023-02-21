import '../styles/globals.css'
// @ts-ignore use direct path because of nextjs bug
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react/dist/fp-pro-react.cjs'
import { PropsWithChildren } from 'react'

const fpjsPublicApiKey = process.env.NEXT_PUBLIC_FPJS_PUBLIC_API_KEY as string

function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body>
        <FpjsProvider
          loadOptions={{
            apiKey: fpjsPublicApiKey,
          }}
        >
          {children}
        </FpjsProvider>
      </body>
    </html>
  )
}

export default RootLayout
