import { useContext } from 'react'
import { renderHook } from '@testing-library/react'
import { FpContext } from '../src'
import { createWrapper, getDefaultLoadOptions } from './helpers'
import { version } from '../package.json'

jest.mock('@fingerprint/agent', () => {
  return {
    ...jest.requireActual<any>('@fingerprint/agent'),
    start: jest.fn(),
  }
})

const mockStart = jest.requireMock('@fingerprint/agent').start as jest.Mock

describe('FpProvider', () => {
  it('should configure an instance of the Fp Agent', async () => {
    const loadOptions = getDefaultLoadOptions()
    const wrapper = createWrapper({
      cache: {
        cachePrefix: 'cache',
        storage: 'sessionStorage',
        duration: 100,
      },
    })
    renderHook(() => useContext(FpContext), {
      wrapper,
    })
    expect(mockStart).toHaveBeenCalledWith({
      ...loadOptions,
      integrationInfo: [`react-sdk/${version}/react`],
      cache: {
        cachePrefix: 'cache',
        storage: 'sessionStorage',
        duration: 100,
      },
    })
  })
})
