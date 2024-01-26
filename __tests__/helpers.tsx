import { PropsWithChildren } from 'react'
import { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa'
import { FpjsProvider } from '../src'
import { act } from 'react-dom/test-utils'

export const getDefaultLoadOptions = () => ({
  apiKey: 'test_api_key',
})

export const createWrapper =
  ({ loadOptions = getDefaultLoadOptions(), ...options }: Partial<FpjsClientOptions> = {}) =>
  ({ children }: PropsWithChildren<{}>): JSX.Element => (
    <FpjsProvider loadOptions={loadOptions} {...options}>
      {children}
    </FpjsProvider>
  )

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const actWait = async (ms: number) => {
  await act(async () => {
    await wait(ms)
  })
}
