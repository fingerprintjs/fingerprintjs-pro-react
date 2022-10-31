export function toError(error: unknown) {
  if (error instanceof Error) {
    return error
  }

  return new Error(String(error))
}
