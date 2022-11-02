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

  
# FingerprintJS Pro React

FingerprintJS Pro React is an easy-to-use React library for **[FingerprintJS Pro](https://fingerprint.com/)**. It's also compatible with the Next.js framework. SPA and Next.js examples are located in the [examples](https://github.com/fingerprintjs/fingerprintjs-pro-react/tree/main/examples) folder.  **This package works with FingerprintJS Pro, it is not compatible with [open-source FingerprintJS](https://github.com/fingerprintjs/fingerprintjs).** You can learn more about the difference between FingerprintJS Pro and open-source FingerprintJS in the [official documentation](https://dev.fingerprint.com/docs/pro-vs-open-source).

## Table of contents

- [Installation](#installation)
- [Getting started](#getting-started)
- [Caching strategy](#caching-strategy)
- [Documentation](#documentation)
- [Support and feedback](#support-and-feedback)
- [License](#license)

## Installation

Using [npm](https://npmjs.org):

```sh
npm install @fingerprintjs/fingerprintjs-pro-react
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @fingerprintjs/fingerprintjs-pro-react
```

## Getting started

In order to identify visitors, you'll need a FingerprintJS Pro account (you can [sign up for free](https://dashboard.fingerprint.com/signup/)).
You can learn more about API keys in the [official FingerprintJS Pro documentation](https://dev.fingerprint.com/docs/quick-start-guide).

1. Wrap your application (or component) in `FpjsProvider`. You can specify multiple configuration options. \
   Set a region if you have chosen a non-global region during registration. Please refer to the [Regions page](https://dev.fingerprint.com/docs/regions).
  
```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
  <FpjsProvider
    loadOptions = {{
      apiKey: 'your-fpjs-public-api-key'
    }}
  >
    <App />
  </FpjsProvider>
);
```

2. Use the `useVisitorData` hook in your components to perform visitor identification and get the data. 

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
        Welcome {data.visitorFound ? 'back' : ''}!
      </div>
    );
  } else {
    return null;
  }
}

export default App;
```

The `useVisitorData` hook also returns a `getData` method which can make an API call on your command. 

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

See the full code example in the [examples folder](https://github.com/fingerprintjs/fingerprintjs-pro-react/tree/main/examples/spa).

## Caching strategy

When you use FingerprintJS Pro, you pay for each API call. Our [best practices](https://dev.fingerprint.com/docs/caching-visitor-information) recommend using cache to reduce the API call rate. The Library uses the SessionStorage cache strategy by default.

:warning: **WARNING** If you use data from `extendedResult`, please pay additional attention to caching strategy.

Some fields from the [extendedResult](https://dev.fingerprint.com/docs/js-agent#extendedresult) (e.g `ip` or `lastSeenAt`) might change for the same visitor. If you need to get the current data, it is recommended to pass `ignoreCache=true` inside [getData](#returned-object) function.

## Error handling

`getData` throws errors directly from our Pro Agent without changing them. [Read more about error handling.](https://dev.fingerprint.com/docs/js-agent#error-handling)

### API Reference

You can find API reference [here](https://fingerprintjs.github.io/fingerprintjs-pro-react/).

## Support and feedback
For support or to provide feedback, please [raise an issue on our issue tracker](https://github.com/fingerprintjs/fingerprintjs-pro-react/issues). If you require private support, please email us at oss-support@fingerprint.com. If you'd like to have a similar React wrapper for the [open-source FingerprintJS](https://github.com/fingerprintjs/fingerprintjs), consider [raising an issue in our issue tracker](https://github.com/fingerprintjs/fingerprintjs-pro-react/issues).


## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/fingerprintjs/fingerprintjs-pro-react/blob/main/LICENSE) file for more info.
