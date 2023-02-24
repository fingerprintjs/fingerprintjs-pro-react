This example demonstrates the usage of Fingerprint Pro inside Next 13's new `app` directory approach.\
Note how you can use Fingerprint Pro inside a React Server Component without issues as it is correctly executed in the browser only.

## Setting up
To try out this example, you need to get your public API key first.
You can find more information about the API key [in our documentation](https://dev.fingerprint.com/docs/js-agent#agent-initialization).

1. In the example folder copy `.env` file to the new one `.env.local`.
2. Set up your public API key in the `NEXT_PUBLIC_FPJS_PUBLIC_API_KEY` variable.
3. In the root folder install dependencies with `yarn install` and build it with `yarn build`.
4. In the example folder run `yarn install`.

After you've completed all the steps and inserted the API key, you can run:
```shell
yarn dev
```

Runs the app in the development mode.\
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation for app directory](https://beta.nextjs.org/docs/getting-started) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
