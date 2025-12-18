import { createContext } from 'react'
import { GetOptions, GetResult } from '@fingerprint/agent'
import { QueryResult } from './query'

export type VisitorQueryResult = QueryResult<GetResult>

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <FpjsProvider>.')
}

const initialContext = {
  getVisitorData: stub,
}

/**
 * The Fingerprint Context
 */
export interface FpContextInterface {
  getVisitorData: (config?: GetOptions) => Promise<GetResult>
}

export const FpContext = createContext<FpContextInterface>(initialContext)
