import { useContext } from 'react'
import { renderHook } from '@testing-library/react'
import { FpjsContext } from '../src'
import { createWrapper, getDefaultLoadOptions } from './helpers'
import { CacheLocation, FpjsClient, FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa'
import * as packageInfo from '../package.json'

jest.mock('@fingerprintjs/fingerprintjs-pro-spa', () => {
  return {
    ...jest.requireActual<any>('@fingerprintjs/fingerprintjs-pro-spa'),
    FpjsClient: jest.fn(() => ({
      init: jest.fn(),
    })),
  }
})

describe(`FpjsProvider`, () => {
  it('should configure an instance of the FpjsClient', async () => {
    const loadOptions = getDefaultLoadOptions()
    const options: FpjsClientOptions = {
      loadOptions,
      cacheLocation: CacheLocation.LocalStorage,
      cachePrefix: 'TEST_PREFIX',
      cacheTimeInSeconds: 60 * 15,
    }
    const wrapper = createWrapper(options)
    renderHook(() => useContext(FpjsContext), {
      wrapper,
    })
    expect(FpjsClient).toHaveBeenCalledWith(
      expect.objectContaining({
        loadOptions: expect.objectContaining({
          ...loadOptions,
          integrationInfo: [`react-sdk/${packageInfo.version}/react`],
        }),
        cacheLocation: CacheLocation.LocalStorage,
        cachePrefix: 'TEST_PREFIX',
        cacheTimeInSeconds: 60 * 15,
      })
    )
  })
})
