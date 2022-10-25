import React, { FunctionComponent } from 'react'
import { act, render } from '@testing-library/react'
import { WithEnvironment } from '../src/components/with-environment'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { actWait } from './helpers'

describe('WithEnvironment', () => {
  it('enhances provided element with `env` prop', () => {
    const Mock = jest.fn(() => <div>foo</div>) as FunctionComponent

    render(
      <WithEnvironment>
        <Mock />
      </WithEnvironment>
    )

    expect(Mock).toHaveBeenCalledWith(expect.objectContaining({ env: expect.any(Object) }), expect.anything())
  })

  it('keeps the original props of the element', () => {
    const Echo = ({ message }: { message: string }) => <span>{message}</span>

    const { container } = render(
      <WithEnvironment>
        <Echo message='hello' />
      </WithEnvironment>
    )

    expect(container.innerHTML).toContain('hello')
  })

  it('should not break navigation', async () => {
    const Home = () => (
      <Link to='/test' id='test'>
        Go to test
      </Link>
    )

    const App = () => {
      return (
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test' element={<div>Test page</div>} />
          </Routes>
        </MemoryRouter>
      )
    }

    const { container } = render(
      <WithEnvironment>
        <App />
      </WithEnvironment>
    )

    act(() => {
      userEvent.click(container.querySelector('#test')!)
    })

    await actWait(250)

    expect(container.innerHTML).toContain('Test page')
  })
})
