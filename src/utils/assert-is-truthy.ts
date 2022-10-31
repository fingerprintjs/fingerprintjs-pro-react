export function assertIsTruthy<T>(value: T, name: string): asserts value is NonNullable<T> {
  if (!value) {
    throw new TypeError(`${name} must not be null or undefined`)
  }
}
