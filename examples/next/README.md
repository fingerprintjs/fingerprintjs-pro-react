## Setting up
To try out these examples, you need to set your public API key as the value of the NEXT_PUBLIC_FPJS_PUBLIC_API_KEY variable\
in the `.local.env`. You can just copy `.env` file located in this directory.

### FingerprintJS public API key
- Go to [FingerprintJS Dashboard](https://dashboard.fingerprintjs.com/)*
- Open the _API keys_ page from the sidebar
- Find your _Public_ API key

*If you don't have a FingerprintJS Pro account, [sign up for free](https://dashboard.fingerprintjs.com/signup/)).

### Installing dependencies
1. Go to the root of the project, install dependencies and build it (`cd ../../ && yarn install && yarn build`)
2. Come back to the example folder (`cd examples/next`) and run `yarn install`.

After you've completed all the steps and inserted the API key, you can run:
```shell
yarn dev
```

Runs the app in the development mode.\
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
