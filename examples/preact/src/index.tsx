import { FunctionalComponent } from 'preact'
import './style/index.css'
import App from './components/app'
import { FpProvider } from '@fingerprintjs/fingerprintjs-pro-react'

const WrappedApp: FunctionalComponent = () => {
  const apiKey = 'uxA8kJe9InOmy1MQz12y'
  return (
    <FpProvider apiKey={apiKey}>
      <App />
    </FpProvider>
  )
}

export default WrappedApp
