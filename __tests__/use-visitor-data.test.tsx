import { useVisitorData } from '../src'
import { renderHook } from '@testing-library/react-hooks'
import { createWrapper } from './helpers'

const testData = {
  visitorId: 'abcdef123456',
}
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
  beforeEach(() => {
    getVisitorData.mockReset()
  })

  it('should provide the Fpjs context', async () => {
    const wrapper = createWrapper()
    const {
      result: { current },
      waitForNextUpdate,
    } = renderHook(() => useVisitorData(), { wrapper })
    await waitForNextUpdate()
    expect(current).toBeDefined()
  })

  it('should call getData on mount by default', async () => {
    getVisitorData.mockImplementation(() => testData)

    const wrapper = createWrapper()
    const { waitForNextUpdate, result } = renderHook(() => useVisitorData(), { wrapper })
    expect(result.current).toMatchObject(
      expect.objectContaining({
        isLoading: true,
        data: undefined,
      })
    )
    await waitForNextUpdate()
    expect(init).toHaveBeenCalled()
    expect(getVisitorData).toHaveBeenCalled()
    expect(result.current).toMatchObject(
      expect.objectContaining({
        isLoading: false,
        data: testData,
      })
    )
  })

  it("shouldn't call getData on mount if 'immediate' option is set to false", async () => {
    const wrapper = createWrapper()
    const { waitForNextUpdate } = renderHook(() => useVisitorData({}, { immediate: false }), { wrapper })
    expect(() => waitForNextUpdate()).rejects.toThrow()
    expect(getVisitorData).not.toHaveBeenCalled()
  })
})
