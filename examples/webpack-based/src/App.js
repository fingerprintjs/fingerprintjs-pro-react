import React from 'react'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { Identification } from './identification'

function App() {
  const apiKey = process.env.REACT_APP_FPJS_PUBLIC_API_KEY
  return (
    <FpjsProvider loadOptions={{ apiKey }}>
      <div className='App'>
        <h1>Your visitorId is</h1>
        <Identification />
      </div>
    </FpjsProvider>
  )
}

export default App
