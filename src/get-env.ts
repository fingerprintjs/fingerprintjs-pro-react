import { env } from './env'
import { EnvDetails } from './env.types'
import { detectEnvironment, type DetectEnvParams } from './detect-env'

export function getEnvironment(params: DetectEnvParams) {
  try {
    const parsedEnv = JSON.parse(env)

    if (typeof parsedEnv === 'object') {
      return parsedEnv as EnvDetails
    }
  } catch {
    // Nothing here...
  }

  return detectEnvironment(params)
}
