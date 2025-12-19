import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

function App() {
  const { isLoading, error, isFetched, data } = useVisitorData()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>
  }

  if (isFetched) {
    return <div>Welcome {data.visitor_id}!</div>
  }
  return null
}

export default App
