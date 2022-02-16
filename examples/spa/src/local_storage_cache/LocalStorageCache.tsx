import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../shared/components/Nav'
import { FPJS_TOKEN } from '../shared/utils/env'
import { CacheLocation } from '@fingerprintjs/fingerprintjs-pro-spa'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { LoadOptions } from '@fingerprintjs/fingerprintjs-pro'

function LocalStorageCache() {
  const [loadOptions] = useState<LoadOptions>({
    token: FPJS_TOKEN,
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
          <div className='subheader'>New PI call made after a key expires or is cleared from the local storage</div>
        </header>
        <Nav />
        <Outlet />
      </div>
    </FpjsProvider>
  )
}

export default LocalStorageCache
