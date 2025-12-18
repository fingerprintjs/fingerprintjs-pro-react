import { PropsWithChildren } from 'react'
import { FpProvider, FpProviderOptions } from '../src'
import { act } from 'react-dom/test-utils'

export const getDefaultLoadOptions = () => ({
  apiKey: 'test_api_key',
})

export const createWrapper =
  (providerProps: Partial<FpProviderOptions> = {}) =>
  ({ children }: PropsWithChildren<{}>) => (
    <FpProvider {...getDefaultLoadOptions()} {...providerProps}>
      {children}
    </FpProvider>
  )

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const actWait = async (ms: number) => {
  await act(async () => {
    await wait(ms)
  })
}
