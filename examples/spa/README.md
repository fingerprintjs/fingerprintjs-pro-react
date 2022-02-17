## Setting up

In order to try out these examples, you set your public token as the value of the REACT_APP_FPJS_CLIENT_TOKEN variable\
in the `.env` file. You can find your public token in the [dashboard](https://dashboard.fingerprintjs.com/)
if you open the Tokens tab in the sidebar.

If you don't have a FingerprintJS PRO subscription, you can [sign up](https://dashboard.fingerprintjs.com/signup) for free.

### Installing dependencies
1. Go to the root of the project, install dependencies and build it (`cd ../../ && yarn install && yarn build`)
2. Link the package to be able to use it locally for the examples `yarn link`
3. Also link React and React-DOM for the React Hooks to work properly (they won't work with 2 instances of React: https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react). Go to each folder in the `node_modules` and execute `yarn link` as well.
4. Come back to the example folder (`cd examples/spa`) and run `yarn install`.

After you've done all of the above and inserted the token, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
