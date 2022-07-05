import { render } from '@testing-library/react'
import { SyntheticEventDetector } from '../src/components/synthetic-event-detector'

jest.mock('react', () => {
  const actual = jest.requireActual('react')
  const mockUseCallback = jest.fn().mockImplementation((callback: any) => {
    return callback
  })

  return {
    ...actual,
    useCallback: mockUseCallback,
  }
})

describe('SyntheticEventDetector', () => {
  it('should detect synthetic event on react', () => {
    const onResult = jest.fn()
    render(<SyntheticEventDetector onResult={onResult} />)

    expect(onResult).toHaveBeenCalledTimes(1)
    expect(onResult).toHaveBeenCalledWith(true)
  })

  it('should do not detect synthetic event on preact', async () => {
    const mockUseCallback = jest.requireMock('react').useCallback as jest.Mock
    mockUseCallback.mockImplementation((callback: any) => {
      const event = document.createEvent('MouseEvent')

      return () => callback(event)
    })

    const onResult = jest.fn()
    render(<SyntheticEventDetector onResult={onResult} />)

    expect(onResult).toHaveBeenCalledTimes(1)
    expect(onResult).toHaveBeenCalledWith(false)
  })
})
