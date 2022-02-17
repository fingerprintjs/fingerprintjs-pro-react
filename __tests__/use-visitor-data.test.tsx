import { useVisitorData } from '../src'
import { renderHook } from '@testing-library/react-hooks'
import { createWrapper } from './helpers'

const init = jest.fn()
const getVisitorData = jest.fn()

jest.mock('@fingerprintjs/fingerprintjs-pro-spa', () => {
  return {
    ...(jest.requireActual('@fingerprintjs/fingerprintjs-pro-spa') as any),
    FpjsClient: jest.fn(() => {
      return {
        init,
        getVisitorData,
        clearCache: jest.fn(),
      }
    }),
  }
})

describe('useVisitorData', () => {
  it('should provide the Fpjs context', async () => {
    const wrapper = createWrapper()
    const {
      result: { current },
      waitForNextUpdate,
    } = renderHook(() => useVisitorData(), { wrapper })
    await waitForNextUpdate()
    expect(current).toBeDefined()
    expect(init).toHaveBeenCalled()
    expect(getVisitorData).toHaveBeenCalled()
  })
})
