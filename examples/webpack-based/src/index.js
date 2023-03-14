import React from 'react'
import { createRoot } from 'react-dom/client'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import App from './App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
const apiKey = process.env.REACT_APP_FPJS_PUBLIC_API_KEY

root.render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey,
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
)
