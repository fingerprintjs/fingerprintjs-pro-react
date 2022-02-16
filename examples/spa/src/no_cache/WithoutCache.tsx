import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../shared/components/Nav'
import { FPJS_TOKEN } from '../shared/utils/env'
import { CacheLocation } from '@fingerprintjs/fingerprintjs-pro-spa'
import { LoadOptions } from '@fingerprintjs/fingerprintjs-pro'

function WithoutCache() {
  const [loadOptions] = useState<LoadOptions>({
    token: FPJS_TOKEN,
  })

  return (
    <FpjsProvider loadOptions={loadOptions} cacheLocation={CacheLocation.NoCache}>
      <div className='App'>
        <header className='header'>
          <h2>Solution without cache</h2>
          <div className='subheader'>New API call made on every component render</div>
        </header>
        <Nav />
        <Outlet />
      </div>
    </FpjsProvider>
  )
}

export default WithoutCache
