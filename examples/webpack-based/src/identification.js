import React from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

export function Identification() {
  const { isLoading, data } = useVisitorData({ extendedResult: false }, { immediate: true })
  if (isLoading) {
    return <div>Loading...</div>
  }
  return <div>{data?.visitorId}</div>
}
