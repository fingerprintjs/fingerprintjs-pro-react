import { render as preactRender } from '@testing-library/preact'
import { h } from 'preact'

describe('WithEnvironment', () => {
  describe('when running within Preact', () => {
    beforeEach(() => {
      jest.doMock('react-dom', () => require('preact/compat'))
      jest.doMock('react', () => require('preact/compat'))
    })

    afterEach(() => {
      jest.resetModules()
    })

    it('should detect env as "preact"', () => {
      const { WithEnvironment } = require('../src/components/with-environment')
      const PrintEnv = (props: any) => h('div', null, props?.env?.name)

      const { container } = preactRender(h(WithEnvironment, null, h(PrintEnv, null)))

      expect(container.innerHTML).toContain('preact')
    })
  })
})
