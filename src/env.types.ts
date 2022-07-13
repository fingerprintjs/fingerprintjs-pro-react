export enum Env {
  React = 'react',
  Preact = 'preact',
  Next = 'next',
  Unknown = 'unknown',
}

export interface EnvDetails {
  name: Env
  version?: string
}
