import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../shared/components/Nav'
import { FPJS_API_KEY } from '../shared/utils/env'
import { CacheLocation, FingerprintJSPro } from '@fingerprintjs/fingerprintjs-pro-spa'

function SessionStorageCache() {
  const [loadOptions] = useState<FingerprintJSPro.LoadOptions>({
    apiKey: FPJS_API_KEY,
  })

  return (
    <FpjsProvider loadOptions={loadOptions} cacheLocation={CacheLocation.SessionStorage} cacheTimeInSeconds={60 * 5}>
      <div className='App'>
        <header className='header'>
          <h2>Solution with a custom implementation of a session storage cache</h2>
          <div className='subheader'>New API call made after a key expires or is cleared from the local storage</div>
        </header>
        <Nav />
        <Outlet />
      </div>
    </FpjsProvider>
  )
}

export default SessionStorageCache
