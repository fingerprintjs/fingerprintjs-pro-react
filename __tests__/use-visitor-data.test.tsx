import { useVisitorData } from '../src'
import { renderHook } from '@testing-library/react'
import { actWait, createWrapper } from './helpers'
import { act } from 'react-dom/test-utils'

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
      rerender,
    } = renderHook(() => useVisitorData(), { wrapper })

    rerender()

    expect(current).toBeDefined()
  })

  it('should call getData on mount by default', async () => {
    getVisitorData.mockImplementation(() => testData)

    const wrapper = createWrapper()
    const { result } = renderHook(() => useVisitorData({}, { immediate: true }), { wrapper })
    expect(result.current).toMatchObject(
      expect.objectContaining({
        isLoading: true,
        data: undefined,
      })
    )

    await actWait(500)

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
    getVisitorData.mockImplementation(() => testData)

    const wrapper = createWrapper()
    const { rerender } = renderHook(() => useVisitorData({}, { immediate: false }), { wrapper })

    expect(getVisitorData).not.toHaveBeenCalled()

    await rerender()

    expect(getVisitorData).not.toHaveBeenCalled()
  })

  it('should support immediate fetch with cache disabled', async () => {
    const wrapper = createWrapper()
    renderHook(() => useVisitorData({ ignoreCache: true }, { immediate: true }), { wrapper })

    await actWait(500)

    expect(getVisitorData).toHaveBeenCalledWith({}, true)
  })

  it('should support overwriting default cache option in getData call', async () => {
    const wrapper = createWrapper()
    const hook = renderHook(() => useVisitorData({ ignoreCache: true }, { immediate: false }), { wrapper })

    await act(async () => {
      await hook.result.current.getData({
        ignoreCache: false,
      })
    })

    expect(getVisitorData).toHaveBeenCalledWith({}, false)
  })
})
