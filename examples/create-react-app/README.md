## Setting up

### Fingerprint Public API key

In order to try out these examples: 
1. Create a `.env` (or `.env.local`) file in this directory.
2. Set the `REACT_APP_FPJS_PUBLIC_API_KEY` environment variable to the value of your Fingerprint Public API key. 

To get the API key:

- Go to Fingerprint Dashboard > [API Keys](https://dashboard.fingerprint.com/api-keys) and find it there.
- If you don't have a Fingerprint Pro account, [sign up for free](https://dashboard.fingerprint.com/signup/).

### Installing dependencies

1. Go to the root of the project, install dependencies and build it (`cd ../../ && pnpm install && pnpm build`)
2. Come back to the example folder (`cd examples/create-react-app`) and run `pnpm install`.

After you've completed all the steps and inserted the API key, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
