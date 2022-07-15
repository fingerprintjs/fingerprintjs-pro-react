import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import FpjsContext from '../fpjs-context'
import { FpjsClient, FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa'
import * as packageInfo from '../../package.json'
import { isSSR } from '../ssr'
import { getEnvironment } from '../get-env'
import { type DetectEnvContext } from '../detect-env'
import type { EnvDetails } from '../env.types'
import { SyntheticEventDetector } from './synthetic-event-detector'
import { waitUntil } from '../utils/wait-until'

const pkgName = packageInfo.name.split('/')[1]

interface FpjsProviderOptions extends FpjsClientOptions {
  /**
   * If set to `true`, will force FpjsClient to be rebuilt with the new options. Should be used with caution
   * since it can be triggered too often (e.g. on every render) and negatively affect performance of the JS agent.
   */
  forceRebuild?: boolean
}

/**
 * @example
 * ```jsx
 * <FpjsProvider
 *   loadOptions = {{
 *     apiKey: "<your-fpjs-public-api-key>"
 *   }}
 *   cacheTime={60 * 10}
 *   cacheLocation={CacheLocation.LocalStorage}
 * >
 *   <MyApp />
 * </FpjsProvider>
 * ```
 *
 * Provides the FpjsContext to its child components.
 */
export function FpjsProvider<TExtended extends boolean>({
  children,
  forceRebuild,
  cache,
  cacheTimeInSeconds,
  cachePrefix,
  cacheLocation,
  loadOptions,
}: PropsWithChildren<FpjsProviderOptions>) {
  const [env, setEnv] = useState<EnvDetails | undefined>()
  const [envContext, setEnvContext] = useState<DetectEnvContext | undefined>()

  const clientInitPromiseRef = useRef<Promise<unknown>>()
  const clientRef = useRef<FpjsClient>()

  const clientOptions = useMemo(() => {
    return {
      cache,
      cacheTimeInSeconds,
      cachePrefix,
      cacheLocation,
      loadOptions,
    }
  }, [loadOptions, cache, cacheTimeInSeconds, cachePrefix, cacheLocation])

  const createClient = useCallback(() => {
    let integrationInfo = `${pkgName}/${packageInfo.version}`

    if (env) {
      const envInfo = env.version ? `${env.name}/${env.version}` : env.name

      integrationInfo += `/${envInfo}`
    }

    const parsedClientOptions = {
      ...clientOptions,
      loadOptions: {
        ...loadOptions,
        integrationInfo: [...(loadOptions.integrationInfo || []), integrationInfo],
      },
    }

    const createdClient = new FpjsClient(parsedClientOptions)

    clientInitPromiseRef.current = createdClient.init()

    clientRef.current = createdClient
  }, [clientOptions, env, loadOptions])

  const getClient = useCallback(async () => {
    if (isSSR()) {
      throw new Error('FpjsProvider client cannot be used in SSR')
    }

    if (!clientRef.current) {
      await waitUntil({
        checkCondition: () => Boolean(clientRef.current),
      }).catch(async () => {
        /**
         * We did timeout waiting for ideal condition to create client (eg: env detection)
         * Attempt to create client now, potentially without some additional information that might be useful but are not required.
         * */
        createClient()
      })
    }

    return clientRef.current!
  }, [createClient])

  const getVisitorData = useCallback(
    async (options, ignoreCache) => {
      const client = await getClient()

      await clientInitPromiseRef.current

      return client.getVisitorData<TExtended>(options, ignoreCache)
    },
    [getClient]
  )

  const handleSyntheticEventResult = useCallback((isSyntheticEvent: boolean) => {
    const context: DetectEnvContext = {
      syntheticEventDetected: isSyntheticEvent,
    }

    setEnvContext(context)

    setEnv(getEnvironment({ context }))
  }, [])

  const clearCache = useCallback(async () => {
    const client = await getClient()

    await client.clearCache()
  }, [getClient])

  const contextValue = useMemo(() => {
    return {
      clearCache,
      getVisitorData,
    }
  }, [clearCache, getVisitorData])

  useEffect(() => {
    if (env) {
      createClient()
    }
  }, [env, createClient])

  useEffect(() => {
    if (forceRebuild) {
      createClient()
    }
  }, [forceRebuild, clientOptions, createClient])

  return (
    <FpjsContext.Provider value={contextValue}>
      {!envContext && <SyntheticEventDetector onResult={handleSyntheticEventResult} />}
      {children}
    </FpjsContext.Provider>
  )
}
