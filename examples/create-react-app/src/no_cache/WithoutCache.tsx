import { FpProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../shared/components/Nav'
import { FPJS_API_KEY } from '../shared/utils/env'

function WithoutCache() {
  return (
    <FpProvider apiKey={FPJS_API_KEY} cache={false}>
      <div className='App'>
        <header className='header'>
          <h2>Solution without cache</h2>
          <div className='subheader'>New API call made on every component render</div>
        </header>
        <Nav />
        <Outlet />
      </div>
    </FpProvider>
  )
}

export default WithoutCache
