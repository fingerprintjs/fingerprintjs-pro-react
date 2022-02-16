import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FPJS_TOKEN } from '../shared/utils/env'
import { Nav } from '../shared/components/Nav'
import { LoadOptions } from '@fingerprintjs/fingerprintjs-pro'
import { CacheLocation } from '@fingerprintjs/fingerprintjs-pro-spa'

function InMemoryCache() {
  const [loadOptions] = useState<LoadOptions>({
    token: FPJS_TOKEN,
  })

  return (
    <FpjsProvider loadOptions={loadOptions} cacheLocation={CacheLocation.Memory}>
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
    </FpjsProvider>
  )
}

export default InMemoryCache
