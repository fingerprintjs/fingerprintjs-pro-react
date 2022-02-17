import FpjsContext, { FpjsContextInterface, QueryResult, VisitorQueryContext } from './fpjs-context'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { VisitorData, GetOptions } from '@fingerprintjs/fingerprintjs-pro-spa'

/**
 * ```js
 *  * const {
 *  *   // Request state
 *  *   data,
 *  *   isLoading,
 *  *   error,
 *  *   // A method to be called manually when the `immediate` flag is set to `false`:
 *  *   getData,
 *  * } = useVisitorData({ extended: true }, false);
 *  * ```
 *  *
 *  * Use the `useVisitorData` hook in your components to perform identification requests with the FingerprintJS API.
 *
 * @param config options for the `fp.get()` request
 * @param immediate determines whether the `getData()` method will be called immediately after the hook mounts or not,
 */
export function useVisitorData<TExtended extends boolean>(
  config: GetOptions<TExtended> = {},
  immediate = true
): VisitorQueryContext<TExtended> {
  const { extendedResult, timeout, tag, linkedId } = config ?? {}
  const getOptions = useMemo(
    () => ({ extendedResult, timeout, tag, linkedId }),
    [extendedResult, timeout, tag, linkedId]
  )
  const { getVisitorData } = useContext<FpjsContextInterface<TExtended>>(FpjsContext)

  const initialState = { isLoading: false }
  const [state, setState] = useState<QueryResult<VisitorData<TExtended>>>(initialState)

  const getData = useCallback(
    async (ignoreCache = false) => {
      try {
        setState((state) => ({ ...state, isLoading: true }))

        const result = await getVisitorData(getOptions, ignoreCache)
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
    [getOptions, getVisitorData]
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
