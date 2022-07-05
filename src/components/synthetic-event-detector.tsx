import { MouseEventHandler, useCallback } from 'react'
import { isSSR } from '../ssr'

export interface SyntheticEventDetectorProps {
  onResult: (isSyntheticEvent: boolean) => void
}

export function SyntheticEventDetector({ onResult }: SyntheticEventDetectorProps) {
  const handleClick = useCallback<MouseEventHandler>(
    (event) => {
      const isSyntheticEvent =
        Boolean((event as Record<string, any>)['_reactName']) || event?.constructor?.name === 'SyntheticBaseEvent'

      onResult(isSyntheticEvent)
    },
    [onResult]
  )

  return (
    <span
      style={{ display: 'none' }}
      onClick={handleClick}
      ref={(element) => {
        if (element && !isSSR()) {
          element.click()
        }
      }}
    />
  )
}
