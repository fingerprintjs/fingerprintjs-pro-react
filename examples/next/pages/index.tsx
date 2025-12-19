import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

const Home: NextPage = () => {
  const { isLoading, error, data } = useVisitorData({ immediate: true })

  const reloadData = () => {
    //getData({ ignoreCache: true })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>FingerprintJS Pro NextJS Demo</title>
        <meta name='description' content='Check if fingerprintjs-pro-react integration works with NextJS SSR' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>FingerprintJS Pro NextJS Demo</h1>
      <div className={styles.testArea}>
        <div className={styles.description}>
          Lets load FingerprintJS Pro Agent using react integration and check next things:
        </div>
        <ol className={styles.actionPoints}>
          <li>There is no errors on server</li>
          <li>There is no errors on client</li>
          <li>In the field below visitor data was loaded</li>
          <li>Try controls to test additional params</li>
        </ol>
        <div className={styles.controls}>
          <button onClick={reloadData} type='button'>
            Reload data
          </button>
        </div>
        <h4>
          VisitorId: <span className={styles.visitorId}>{isLoading ? 'Loading...' : data?.visitor_id}</span>
        </h4>
        <h4>Full visitor data:</h4>
        <pre className={styles.data}>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Home
