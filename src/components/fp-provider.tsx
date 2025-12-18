import { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react'
import { FpContext } from '../fp-context'
import { Agent, GetOptions, StartOptions, start } from '@fingerprint/agent'
import * as packageInfo from '../../package.json'
import { isSSR } from '../ssr'
import { WithEnvironment } from './with-environment'
import type { EnvDetails } from '../env.types'

export interface FpProviderOptions extends StartOptions {
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
 *   apiKey="<your-fpjs-public-api-key>"
 * >
 *   <MyApp />
 * </FpjsProvider>
 * ```
 *
 * Provides the FpContext to its child components.
 *
 * @privateRemarks
 * This is just a wrapper around the actual provider.
 * For the implementation, see `ProviderWithEnv` component.
 */
export function FpProvider(props: PropsWithChildren<FpProviderOptions>) {
  const propsWithEnv = props as PropsWithChildren<ProviderWithEnvProps>

  return (
    <WithEnvironment>
      <ProviderWithEnv {...propsWithEnv} />
    </WithEnvironment>
  )
}

interface ProviderWithEnvProps extends FpProviderOptions {
  /**
   * Contains details about the env we're currently running in (e.g. framework, version)
   */
  env: EnvDetails
  getOptions?: GetOptions
}

function ProviderWithEnv({
  children,
  forceRebuild,
  env,
  getOptions,
  ...agentOptions
}: PropsWithChildren<ProviderWithEnvProps>) {
  const createClient = useCallback(() => {
    let integrationInfo = `react-sdk/${packageInfo.version}`

    if (env) {
      const envInfo = env.version ? `${env.name}/${env.version}` : env.name

      integrationInfo += `/${envInfo}`
    }

    const mergedIntegrationInfo = [...(agentOptions.integrationInfo || []), integrationInfo]

    return start({
      ...agentOptions,
      integrationInfo: mergedIntegrationInfo,
    })
  }, [agentOptions, env])

  const clientRef = useRef<Agent>(createClient())

  const getClient = useCallback(() => {
    if (isSSR()) {
      throw new Error('FpProvider client cannot be used in SSR')
    }

    return clientRef.current
  }, [])

  const getVisitorData = useCallback(
    (options?: GetOptions) => {
      const client = getClient()

      return client.get({
        ...getOptions,
        ...options,
      })
    },
    [getClient, getOptions]
  )

  const contextValue = useMemo(() => {
    return {
      getVisitorData,
    }
  }, [getVisitorData])

  useEffect(() => {
    // By default, the client is always initialized once during the first render and won't be updated
    // if the configuration changes. Use `forceRebuilt` flag to disable this behaviour.
    if (!clientRef.current || forceRebuild) {
      clientRef.current = createClient()
    }
  }, [forceRebuild, agentOptions, getOptions, createClient])

  return <FpContext.Provider value={contextValue}>{children}</FpContext.Provider>
}
