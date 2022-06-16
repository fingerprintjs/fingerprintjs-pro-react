import { FunctionalComponent, h } from 'preact'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { useState } from 'preact/hooks'
import { TargetedEvent } from 'preact/compat'

const App: FunctionalComponent = () => {
  const [extendedResult, updateExtendedResult] = useState(false)
  const { isLoading, error, data, getData } = useVisitorData({ extendedResult }, { immediate: true })

  const reloadData = () => {
    getData({ ignoreCache: true })
  }

  const onChangeExtendedResult = (e: TargetedEvent<HTMLInputElement, Event>) => {
    updateExtendedResult((e.target as HTMLInputElement).checked)
  }

  return (
    <div id='preact_root' className='container'>
      <h1>FingerprintJS Pro Preact Demo</h1>
      <div className='testArea'>
        <div className='description'>
          Lets load FingerprintJS Pro Agent using react integration and check next things:
        </div>
        <ol className='actionPoints'>
          <li>There is no errors on server</li>
          <li>There is no errors on client</li>
          <li>In the field below visitor data was loaded</li>
          <li>Try controls to test additional params</li>
        </ol>
        <div className='controls'>
          <button onClick={reloadData} type='button'>
            Reload data
          </button>
          <label>
            <input type='checkbox' onInput={onChangeExtendedResult} checked={extendedResult} />
            Extended result
          </label>
        </div>
        <h4>
          VisitorId: <span className='visitorId'>{isLoading ? 'Loading...' : data?.visitorId}</span>
        </h4>
        <h4>Full visitor data:</h4>
        <pre className='data'>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
