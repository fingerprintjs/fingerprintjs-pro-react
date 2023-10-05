<p align="center">
  <a href="https://fingerprint.com">
    <picture>
     <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fingerprintjs/fingerprintjs-pro-react/main/resources/logo_light.svg" />
     <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/fingerprintjs/fingerprintjs-pro-react/main/resources/logo_dark.svg" />
     <img src="https://raw.githubusercontent.com/fingerprintjs/fingerprintjs-pro-react/main/resources/logo_dark.svg" alt="Fingerprint logo" width="312px" />
   </picture>
  </a>
<p align="center">
<a href="https://github.com/fingerprintjs/fingerprintjs-pro-react/actions/workflows/release.yml">
  <img src="https://github.com/fingerprintjs/fingerprintjs-pro-react/actions/workflows/release.yml/badge.svg" alt="CI badge" />
</a>
<a href="https://fingerprintjs.github.io/fingerprintjs-pro-react/coverage/">
 <img src="https://fingerprintjs.github.io/fingerprintjs-pro-react/coverage/badges.svg" alt="coverage">
</a>
<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-react">
  <img src="https://img.shields.io/npm/v/@fingerprintjs/fingerprintjs-pro-react.svg" alt="Current NPM version">
</a>
<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-react">
  <img src="https://img.shields.io/npm/dm/@fingerprintjs/fingerprintjs-pro-react.svg" alt="Monthly downloads from NPM">
</a>
<a href="https://opensource.org/licenses/MIT">
  <img src="https://img.shields.io/:license-mit-blue.svg" alt="MIT license">
</a>
<a href="https://discord.gg/39EpE2neBg">
  <img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server">
</a>
<a href="https://fingerprintjs.github.io/fingerprintjs-pro-react/">
  <img src="https://img.shields.io/badge/-Documentation-green" alt="Discord server">
</a>

  
# Fingerprint Pro React
Fingerprint is a device intelligence platform offering 99.5% accurate visitor identification. Fingerprint Pro React SDK is an easy way to integrate **[Fingerprint Pro](https://fingerprint.com/)** into your React application. It's also compatible with Next.js and Preact. See application demos in the [examples](https://github.com/fingerprintjs/fingerprintjs-pro-react/tree/main/examples) folder.  **This package works with Fingerprint Pro, it is not compatible with [open-source FingerprintJS](https://github.com/fingerprintjs/fingerprintjs).** You can learn more about the difference between Fingerprint Pro and open-source FingerprintJS in the [official documentation](https://dev.fingerprint.com/docs/pro-vs-open-source).

## Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Getting started](#getting-started)
- [Caching strategy](#caching-strategy)
- [Error handling](#error-handling)
- [API Reference](#api-reference)
- [Support and feedback](#support-and-feedback)
- [License](#license)

## Requirements

- React 18 or higher
- For Preact users: Preact 10.3 or higher
- For Next.js users: Next.js 13.1 or higher
- For Typescript users: Typescript 4.8 or higher

## Installation

Using [npm](https://npmjs.org):

```sh
npm install @fingerprintjs/fingerprintjs-pro-react
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @fingerprintjs/fingerprintjs-pro-react
```

Using [pnpm](https://pnpm.js.org):

```sh
pnpm add @fingerprintjs/fingerprintjs-pro-react
```


## Getting started

In order to identify visitors, you'll need a Fingerprint Pro account (you can [sign up for free](https://dashboard.fingerprint.com/signup/)).
To get your API key and get started, see the [official Fingerprint Pro documentation](https://dev.fingerprint.com/docs/quick-start-guide).

1. Wrap your application (or component) in `FpjsProvider`. You can specify multiple configuration options. Set a region if you have chosen a non-global region during registration. See [Regions](https://dev.fingerprint.com/docs/regions) in our documentation. Set `endpoint` and `scriptUrlPattern` if you are using [one of our proxy integrations to increase accuracy](https://dev.fingerprint.com/docs/protecting-the-javascript-agent-from-adblockers) and effectiveness of visitor identification.
  
```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FpjsProvider, /* defaultEndpoint, defaultScriptUrlPattern */ } from '@fingerprintjs/fingerprintjs-pro-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
  <FpjsProvider
    loadOptions={{
      apiKey: 'your-fpjs-public-api-key',
      // region: 'eu',
      // endpoint: ['metrics.yourwebsite.com', defaultEndpoint],
      // scriptUrlPattern: ['metrics.yourwebsite.com/agent-path', defaultScriptUrlPattern],
    }}
  >
    <App />
  </FpjsProvider>
);
```

2. Use the `useVisitorData` hook in your components to identify visitors and get the result data. 

```jsx
// src/App.js
import React from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

function App() {
  const {
    isLoading,
    error,
    data,
  } = useVisitorData();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  if (data) {
    // perform some logic based on the visitor data
    return (
      <div>
        Welcome {data.visitorFound ? 'back' : ''}, {data.visitorId}!
      </div>
    );
  } else {
    return null;
  }
}

export default App;
```

The `useVisitorData` hook also returns a `getData` method you can use to make an API call on command.

```jsx
// src/App.js
import React, { useState } from "react";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

function App() {
  const {
    isLoading,
    error,
    getData
  } = useVisitorData({tag: "subscription-form"}, { immediate: false });
  const [email, setEmail] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
           getData()
             .then((data) => {
                // do something with the visitor data
                // for example, append visitor data to the form data to send to your server
                console.log(data)
             })
             .catch((error) => {
                // Handle error
             })

        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default App;
```

See the full code example in the [examples folder](https://github.com/fingerprintjs/fingerprintjs-pro-react/tree/main/examples/create-react-app).

## Caching strategy

Fingerprint Pro usage is billed per API call. To reduce API calls, it is a good practice to [cache identification results](https://dev.fingerprint.com/docs/caching-visitor-information). The SDK uses SessionStorage to cache results by default.

> :warning: **WARNING** If you use data from `extendedResult`, pay additional attention to caching strategy. 
>
> Some fields from the [extendedResult](https://dev.fingerprint.com/docs/js-agent#extendedresult) (e.g., `ip` or `lastSeenAt`) might change over time for the same visitor. If you need to get the latest results, pass `{ignoreCache: true}` to the `getData()` function.

## Error handling

The `getData` function throws errors directly from the JS Agent without changing them. See [JS Agent error handling](https://dev.fingerprint.com/docs/js-agent#error-handling) for more details.

## API Reference

See the full [generated API reference](https://fingerprintjs.github.io/fingerprintjs-pro-react/).

## Support and feedback
To ask questions or provide feedback, use [Issues](https://github.com/fingerprintjs/fingerprintjs-pro-react/issues). If you need private support, please email us at `oss-support@fingerprint.com`. If you'd like to have a similar React wrapper for the [open-source FingerprintJS](https://github.com/fingerprintjs/fingerprintjs), consider creating an issue in the main [FingerprintJS repository](https://github.com/fingerprintjs/fingerprintjs/issues).


## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/fingerprintjs/fingerprintjs-pro-react/blob/main/LICENSE) file for more info.
