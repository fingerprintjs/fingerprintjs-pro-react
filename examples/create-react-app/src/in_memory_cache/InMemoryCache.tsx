import { FpProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { Outlet } from 'react-router-dom'
import { FPJS_API_KEY } from '../shared/utils/env'
import { Nav } from '../shared/components/Nav'

function InMemoryCache() {
  return (
    <FpProvider apiKey={FPJS_API_KEY} cache={{ storage: 'agent', duration: 'optimize-cost' }}>
      <div className='App'>
        <header className='header'>
          <h2>Solution with an in-memory cache</h2>
          <div className='subheader'>
            New API call made after a key expires, a page is reloaded or the provider is unmounted
          </div>
        </header>
        <Nav />
        <Outlet />
      </div>
    </FpProvider>
  )
}

export default InMemoryCache
