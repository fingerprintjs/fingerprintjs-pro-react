export type QueryIdle = {
  data: undefined
  isLoading: false
  isFetched: false
  error: undefined
}

export type QueryLoading = {
  data: undefined
  isLoading: true
  isFetched: false
  error: undefined
}

export type QueryFetched<TData> = {
  data: TData
  isLoading: false
  isFetched: true
  error: undefined
}

export type QueryError<TError = Error> = {
  data: undefined
  isLoading: false
  isFetched: false
  error: TError
}

export type QueryResult<TData, TError = Error> = QueryIdle | QueryLoading | QueryFetched<TData> | QueryError<TError>
