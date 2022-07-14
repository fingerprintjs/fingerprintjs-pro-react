import { FunctionalComponent, h } from 'preact'
import './style/index.css'
import App from './components/app'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'

const WrappedApp: FunctionalComponent = () => {
  const apiKey = process.env.PREACT_APP_FPJS_PUBLIC_API_KEY as string
  return (
    <FpjsProvider loadOptions={{ apiKey }}>
      <App />
    </FpjsProvider>
  )
}

export default WrappedApp
