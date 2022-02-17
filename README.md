# @fingerprintjs/fingerprintjs-pro-react
FingerprintJS SDK for React Single Page Applications (SPA)

[![npm](https://img.shields.io/npm/v/@fingerprintjs/fingerprintjs-pro-react.svg?style=flat)](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-react)
[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Documentation](#documentation)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Support + Feedback](#support--feedback)
- [What is FingerprintJS](#what-is-fingerprintjs)
- [License](#license)

## Documentation

- [Documentation](https://dev.fingerprintjs.com/docs)

## Installation

Using [npm](https://npmjs.org):

```sh
npm install @fingerprintjs/fingerprintjs-pro-react
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @fingerprintjs/fingerprintjs-pro-react
```

## Getting Started

### FingerprintJS public API key

In order to identify visitors you'll need a FingerprintJS Pro account (you can [sign up for free](https://dashboard.fingerprintjs.com/signup/)).

- Go to [FingerprintJS Dashboard](https://dashboard.fingerprintjs.com/)
- Open the _API keys_ page from the sidebar
- Find your _Public_ API key

Configure the SDK by wrapping your application in `FpjsProvider`:

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import App from './App';

ReactDOM.render(
  <FpjsProvider
    loadOptions = {{
      token: 'your-fpjs-public-api-key'
    }}
  >
    <App />
  </FpjsProvider>,
  document.getElementById('app')
);
```

Use the `useVisitorData` hook in your components to perform visitor identification and get the data. 

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
import React from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

function App() {
  const {
    isLoading,
    error,
    getData,
  } = useVisitorData({tag: 'subscription-form'}, false);
  const [email, setEmail] = useState('')

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          getData().then((data) => {
            if (data) {
              // do something with the visitor data
              // for example, append visitor data to the form data to send to your server
              console.log(data)
            }
          })
        }}
      >
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          type='email'
          name='email'
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button type='submit'>Subscribe</button>
      </form>
    </div>
  );
}

export default App;
```

## Support + Feedback

For support or to provide feedback, please [raise an issue on our issue tracker](https://github.com/fingerprintjs/fingerprintjs-pro-react/issues).

## What is FingerprintJS?

### FingerprintJS Pro is the fraud detection API for your business

FingerprintJS Pro is a combination of a JavaScript agent that runs in the browser and a server-side storage and API system
that securely identifies visitors and stores all the information you need to detect fraud.

### JavaScript agent
FingerprintJS Pro does not calculate fingerprints in the browser. Instead, it uses a lightweight JavaScript agent that collects multiple device signals and sends them to our servers.
This helps prevent reverse engineering and spoofing of an identifier by advanced bots. The agent is hosted at edge locations around the world. It is only 12 KB in size and 20 ms away from your users.

### Server-side identification system
Server-side identification system provides a platform that processes and stores page views and events to identify your website visitors.
It also provides many helpful features that are explained in more detail on dedicated documentation pages.

Learn more on our [official documentation page](https://dev.fingerprintjs.com/docs/introduction)

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/fingerprintjs/fingerprintjs-pro-react/blob/master/LICENSE) file for more info.
