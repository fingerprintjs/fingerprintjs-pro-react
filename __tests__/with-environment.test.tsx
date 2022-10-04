import React, { FunctionComponent } from 'react'
import { render } from '@testing-library/react'

import { WithEnvironment } from '../src/components/with-environment'

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
})
