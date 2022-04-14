import { createContext } from 'react'
import { VisitorData, GetOptions } from '@fingerprintjs/fingerprintjs-pro-spa'

export interface QueryResult<TData, TError = Error> {
  data?: TData
  isLoading?: boolean
  error?: TError
}

export interface VisitorQueryResult<TExtended extends boolean> extends QueryResult<VisitorData<TExtended>> {
  data?: VisitorData<TExtended>
}

export interface GetDataOptions {
  ignoreCache?: boolean
}

export interface VisitorQueryContext<TExtended extends boolean> extends VisitorQueryResult<TExtended> {
  getData: (getDataOptions?: GetDataOptions) => Promise<VisitorData<TExtended> | void>
}

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <FpjsProvider>.')
}

const initialContext = {
  getVisitorData: stub,
  clearCache: stub,
}

/**
 * The FingerprintJS Context
 */
export interface FpjsContextInterface<TExtended extends boolean> {
  getVisitorData: (config?: GetOptions<TExtended>, ignoreCache?: boolean) => Promise<VisitorData<TExtended> | undefined>
  clearCache: () => void
}

const FpjsContext = createContext<FpjsContextInterface<any>>(initialContext)

export default FpjsContext
