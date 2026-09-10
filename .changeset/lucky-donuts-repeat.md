---
'@fingerprint/react': minor
---

Remove the `postinstall` script and detect the framework at runtime instead.

pnpm 10+ blocks install scripts by default, so pnpm users hit `[ERR_PNPM_IGNORED_BUILDS]` and got no framework info in `integrationInfo` at all.

React apps now report an exact version they previously lacked, so `integrationInfo` goes from `react-sdk/<sdk>/react` to `react-sdk/<sdk>/react/<react>`. Next.js is unchanged. Preact reports no version, since preact exposes none at runtime.
