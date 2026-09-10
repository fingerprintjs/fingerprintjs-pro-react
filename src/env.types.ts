export enum Env {
  React = 'react',
  Preact = 'preact',
  Next = 'next',
}

export interface EnvDetails {
  name: Env
  version?: string
}
