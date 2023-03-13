import React from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

function App() {
  const { isLoading, error, data } = useVisitorData()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>
  }

  if (data) {
    // perform some logic based on the visitor data
    return <div>Welcome {data.visitorFound ? `back ${data.visitorId}` : ''}!</div>
  } else {
    return null
  }
}

export default App
