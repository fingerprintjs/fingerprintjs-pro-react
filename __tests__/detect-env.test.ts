import { detectEnvironment } from '../src/detect-env'
import { Env } from '../src/env.types'

describe('Detect user env', () => {
  describe('Preact', () => {
    it('should detect preact if synthetic event was not detected', () => {
      const env = detectEnvironment({
        context: {
          syntheticEventDetected: false,
        },
      })

      expect(env).toEqual({
        name: Env.Preact,
      })
    })

    it('should detect preact if class components receive any arguments in render', () => {
      const env = detectEnvironment({
        context: {
          classRenderReceivesAnyArguments: true,
        },
      })

      expect(env).toEqual({
        name: Env.Preact,
      })
    })
  })

  describe('React', () => {
    it('should detect react if synthetic event was detected', () => {
      const env = detectEnvironment({
        context: {
          syntheticEventDetected: true,
        },
      })

      expect(env).toEqual({
        name: Env.React,
      })
    })
  })

  describe('Next.js', () => {
    it('should detect env using next script', () => {
      const script = document.createElement('script')
      script.id = '__NEXT_DATA__'

      document.head.appendChild(script)

      const env = detectEnvironment({
        context: {
          syntheticEventDetected: true,
        },
      })

      expect(env).toEqual({
        name: Env.Next,
      })
    })

    it('should detect next using global variable', () => {
      const version = '12.0.1'

      Object.assign(window, {
        next: {
          version,
        },
      })

      const env = detectEnvironment({
        context: {
          syntheticEventDetected: true,
        },
      })

      expect(env).toEqual({
        name: Env.Next,
        version,
      })
    })
  })
})
