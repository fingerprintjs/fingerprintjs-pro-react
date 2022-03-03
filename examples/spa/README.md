## Setting up
In order to try out these examples, you set your public API key as the value of the REACT_APP_FPJS_PUBLIC_API_KEY variable\
in the `.env` file, located in this directory.

### FingerprintJS public API key
- Go to [FingerprintJS Dashboard](https://dashboard.fingerprintjs.com/)*
- Open the _API keys_ page from the sidebar
- Find your _Public_ API key

*If you don't have a FingerprintJS Pro account, [sign up for free](https://dashboard.fingerprintjs.com/signup/)).

### Installing dependencies
1. Go to the root of the project, install dependencies and build it (`cd ../../ && yarn install && yarn build`)
2. Link the package to be able to use it locally for the examples `yarn link`
3. Also link React and React-DOM for the React Hooks to work properly (they won't work with 2 instances of React: https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react). Go to each folder in the `node_modules` and execute `yarn link` as well.
4. Come back to the example folder (`cd examples/spa`) and run `yarn install`.

After you've completed all the steps and inserted the API key, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
