import { useEffect, useState } from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

function UnmountedComponent() {
  const [showButton, updateShowButton] = useState<boolean>(true)
  useEffect(() => {
    console.log(`[${new Date().getTime()}] Component ${showButton ? 'mounted' : 'unmounted'}`)
  }, [showButton])
  return (
    <div>
      {showButton ? (
        <IdentificationButton onDestroy={() => updateShowButton(false)} />
      ) : (
        <button type='submit' onClick={() => updateShowButton(true)}>
          Return component back
        </button>
      )}
    </div>
  )
}

function IdentificationButton({ onDestroy }: { onDestroy: () => void }) {
  const { getData } = useVisitorData({ ignoreCache: false })
  const runIdentification = () => {
    console.log(`[${new Date().getTime()}] Identification run`)
    getData().then(() => console.log(`[${new Date().getTime()}] Identification completed`))
    onDestroy()
  }
  return (
    <button type='submit' onClick={runIdentification}>
      Initiate identification and unmount component
    </button>
  )
}

export default UnmountedComponent
