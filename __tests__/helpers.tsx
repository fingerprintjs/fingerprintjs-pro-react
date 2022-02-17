import { PropsWithChildren } from 'react'
import { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa'
import { FpjsProvider } from '../src'

export const getDefaultLoadOptions = () => ({
  token: 'test_token',
})

export const createWrapper =
  ({ loadOptions = getDefaultLoadOptions(), ...options }: Partial<FpjsClientOptions> = {}) =>
  ({ children }: PropsWithChildren<{}>): JSX.Element =>
    (
      <FpjsProvider loadOptions={loadOptions} {...options}>
        {children}
      </FpjsProvider>
    )
