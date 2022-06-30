type EnvCheckStrategy = () => unknown

export enum Env {
  React = 'react',
  Preact = 'preact',
  Next = 'next',
}

export interface EnvDetails {
  name: Env
  version?: string
}

function runEnvChecks(...strategies: EnvCheckStrategy[]) {
  if (typeof window === 'undefined') {
    return false
  }

  for (const strategy of strategies) {
    const result = strategy()

    if (result) {
      return true
    }
  }

  return false
}

/**
 * Runs checks that determine if user is using preact.
 * So far they are not ideal, as there is no consistent way to detect preact.
 * */
function isPreact() {
  return runEnvChecks(
    () => document.querySelector('#preact_root'),
    () => 'preact' in window && Boolean((window as { preact?: unknown }).preact),
    () => document.querySelector('script[type="__PREACT_CLI_DATA__"]')
  )
}

/**
 * Runs checks that determine if user is using next.
 * Those checks should have almost 100% accuracy.
 * */
function isNext() {
  return runEnvChecks(
    () => 'next' in window && Boolean((window as { next?: unknown }).next),
    () => document.querySelector('script[id=__NEXT_DATA__]')
  )
}

function getNextVersion() {
  return (window as { next?: { version?: string } })?.next?.version
}

/**
 * Attempts to determine user environment.
 * */
export function detectEnvironment(): EnvDetails {
  if (isNext()) {
    return {
      name: Env.Next,
      version: getNextVersion(),
    }
  }

  if (isPreact()) {
    return {
      name: Env.Preact,
    }
  }

  // Fallback to React as env
  return {
    name: Env.React,
  }
}
