import { Outlet } from 'react-router-dom'
import { Nav } from '../shared/components/Nav'
import { FPJS_API_KEY } from '../shared/utils/env'
import { FpProvider } from '@fingerprintjs/fingerprintjs-pro-react'

function LocalStorageCache() {
  return (
    <FpProvider
      apiKey={FPJS_API_KEY}
      cache={{
        storage: 'localStorage',
        duration: 60 * 10,
        cachePrefix: 'MY_AWESOME_PREFIX',
      }}
    >
      <div className='App'>
        <header className='header'>
          <h2>Solution with a local storage cache</h2>
          <div className='subheader'>New API call made after a key expires or is cleared from the local storage</div>
        </header>
        <Nav />
        <Outlet />
      </div>
    </FpProvider>
  )
}

export default LocalStorageCache
