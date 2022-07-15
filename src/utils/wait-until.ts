export interface WaitUntilParams {
  checkCondition: () => boolean
  timeoutMs?: number
  intervalMs?: number
}

export function waitUntil({ checkCondition, intervalMs = 250, timeoutMs = 2000 }: WaitUntilParams) {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearInterval(interval)

      reject(new Error('Timeout'))
    }, timeoutMs)

    const interval = setInterval(() => {
      if (checkCondition()) {
        clearTimeout(timeoutId)
        clearInterval(interval)
        resolve()
      }
    }, intervalMs)
  })
}
