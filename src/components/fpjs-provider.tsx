import { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react'
import { FpjsContext } from '../fpjs-context'
import { FpjsClient, FpjsClientOptions, FingerprintJSPro } from '@fingerprintjs/fingerprintjs-pro-spa'
import * as packageInfo from '../../package.json'
import { isSSR } from '../ssr'
import { waitUntil } from '../utils/wait-until'
import { WithEnvironment } from './with-environment'
import type { EnvDetails } from '../env.types'

const pkgName = packageInfo.name.split('/')[1]

export interface CustomAgent {
  load: (options: FingerprintJSPro.LoadOptions) => Promise<FingerprintJSPro.Agent>
}
export interface FpjsProviderOptions extends FpjsClientOptions {
  /**
   * If set to `true`, will force FpjsClient to be rebuilt with the new options. Should be used with caution
   * since it can be triggered too often (e.g. on every render) and negatively affect performance of the JS agent.
   */
  forceRebuild?: boolean
  customAgent?: CustomAgent
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
 *
 * @privateRemarks
 * This is just a wrapper around the actual provider.
 * For the implementation, see `ProviderWithEnv` component.
 */
export function FpjsProvider<T extends boolean>(props: PropsWithChildren<FpjsProviderOptions>) {
  const propsWithEnv = props as PropsWithChildren<ProviderWithEnvProps>

  return (
    <WithEnvironment>
      <ProviderWithEnv<T> {...propsWithEnv} />
    </WithEnvironment>
  )
}

interface ProviderWithEnvProps extends FpjsProviderOptions {
  /**
   * Contains details about the env we're currently running in (e.g. framework, version)
   */
  env: EnvDetails
}

function ProviderWithEnv<TExtended extends boolean>({
  children,
  forceRebuild,
  cache,
  cacheTimeInSeconds,
  cachePrefix,
  cacheLocation,
  customAgent,
  loadOptions,
  env,
}: PropsWithChildren<ProviderWithEnvProps>) {
  const clientRef = useRef<FpjsClient>()
  const clientInitPromiseRef = useRef<Promise<unknown>>()

  const clientOptions = useMemo(() => {
    return {
      cache,
      cacheTimeInSeconds,
      cachePrefix,
      cacheLocation,
      customAgent,
      loadOptions,
    }
  }, [loadOptions, cache, cacheTimeInSeconds, cachePrefix, cacheLocation, customAgent])

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

    return createdClient
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
    async (options?: FingerprintJSPro.GetOptions<TExtended>, ignoreCache?: boolean) => {
      const client = await getClient()

      await clientInitPromiseRef.current

      return client.getVisitorData<TExtended>(options, ignoreCache)
    },
    [getClient]
  )

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
    // By default, the client is always initialized once during the first render and won't be updated
    // if the configuration changes. Use `forceRebuilt` flag to disable this behaviour.
    if (!clientRef.current || forceRebuild) {
      clientRef.current = createClient()
    }
  }, [forceRebuild, clientOptions, createClient])

  return <FpjsContext.Provider value={contextValue}>{children}</FpjsContext.Provider>
}
