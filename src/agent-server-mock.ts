import { Agent } from '@fingerprintjs/fingerprintjs-pro-spa'

export const agentServerMock: Agent = {
  get: () => {
    throw new Error("Don't use FingerprintJS Pro on server side")
  },
}
