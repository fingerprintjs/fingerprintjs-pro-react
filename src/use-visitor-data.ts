import FpjsContext, { FpjsContextInterface, QueryResult, VisitorQueryContext } from './fpjs-context'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { GetOptions, VisitorData } from '@fingerprintjs/fingerprintjs-pro-spa'

/**
 *  @example
 * ```js
 *  const {
 *    // Request state
 *    data,
 *    isLoading,
 *    error,
 *    // A method to be called manually when the `immediate` field in the config is set to `false`:
 *    getData,
 *  } = useVisitorData({ extended: true }, { immediate: false });
 * ```
 *  * Use the `useVisitorData` hook in your components to perform identification requests with the FingerprintJS API.
 *
 * @param getOptions options for the `fp.get()` request
 * @param config config for the hook
 */
export function useVisitorData<TExtended extends boolean>(
  getOptions: GetOptions<TExtended> = {},
  config: UseVisitorDataConfig = defaultUseVisitorDataConfig
): VisitorQueryContext<TExtended> {
  const { extendedResult, timeout, tag, linkedId } = getOptions ?? {}
  const memoizedOptions = useMemo(
    () => ({ extendedResult, timeout, tag, linkedId }),
    [extendedResult, timeout, tag, linkedId]
  )
  const { immediate } = config
  const { getVisitorData } = useContext<FpjsContextInterface<TExtended>>(FpjsContext)

  const initialState = { isLoading: false }
  const [state, setState] = useState<QueryResult<VisitorData<TExtended>>>(initialState)

  const getData = useCallback<VisitorQueryContext<TExtended>['getData']>(
    async ({ ignoreCache = false } = {}) => {
      try {
        setState((state) => ({ ...state, isLoading: true }))

        const result = await getVisitorData(memoizedOptions, ignoreCache)
        setState((state) => ({ ...state, data: result, isLoading: false, error: undefined }))
        return result
      } catch (error) {
        if (error instanceof Error) {
          error.message = `${error.name}: ${error.message}`
          error.name = 'FPJSAgentError'
          setState((state) => ({ ...state, data: undefined, error: error as Error }))
        }
      } finally {
        setState((state) => (state.isLoading ? { ...state, isLoading: false } : state))
      }
    },
    [memoizedOptions, getVisitorData]
  )

  useEffect(() => {
    if (immediate) {
      getData()
    }
  }, [getData, immediate])

  const { isLoading, data, error } = state

  return {
    getData,
    isLoading,
    data,
    error,
  }
}

export interface UseVisitorDataConfig {
  /**
   * Determines whether the `getData()` method will be called immediately after the hook mounts or not
   */
  immediate: boolean
}

const defaultUseVisitorDataConfig = { immediate: true }
