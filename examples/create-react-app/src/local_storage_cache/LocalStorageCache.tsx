import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../shared/components/Nav'
import { FPJS_API_KEY } from '../shared/utils/env'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { CacheLocation, LoadOptions } from '@fingerprintjs/fingerprintjs-pro-spa'

function LocalStorageCache() {
  const [loadOptions] = useState<LoadOptions>({
    apiKey: FPJS_API_KEY,
  })

  return (
    <FpjsProvider
      loadOptions={loadOptions}
      cacheLocation={CacheLocation.LocalStorage}
      cachePrefix='MY_AWESOME_PREFIX'
      cacheTimeInSeconds={60 * 10}
    >
      <div className='App'>
        <header className='header'>
          <h2>Solution with a local storage cache</h2>
          <div className='subheader'>New API call made after a key expires or is cleared from the local storage</div>
        </header>
        <Nav />
        <Outlet />
      </div>
    </FpjsProvider>
  )
}

export default LocalStorageCache
