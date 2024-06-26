# Contributing to FingerprintJS Pro React integration

## Working with code

We prefer using [pnpm](https://pnpm.io/) for installing dependencies and running scripts.

The main branch is locked for the push action. For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first.

### Development playground

There are 4 demo pages for this integration:

1. In `/examples/create-react-app` folder. It is a rich demo with scenarios of using different caching strategies. You can find more info about configuration and starting demo in the [readme](examples/create-react-app/README.md).
2. In `/examples/next` folder. It is a demo built with NextJS that allows testing SSR scenarios. You can find more info about configuration and starting demo in the [readme](examples/next/README.md).
3. In `/examples/next-appDir` folder. It is the same demo built with NextJS, but with new `app` directory approach. You can find more info about configuration and starting demo in the [readme](examples/next-appDir/README.md).
4. In `/examples/preact` folder. It is a demo built with Preact. You can find more info about configuration and starting demo in the [readme](examples/preact/README.md).
5. In `/examples/webpack-based` folder. It is a simple demo built with raw webpack.

If you want to test integration with [fingerprintjs-pro-spa](https://github.com/fingerprintjs/fingerprintjs-pro-spa), just [link the package](https://pnpm.io/cli/link#replace-an-installed-package-with-a-local-version-of-it) with the `pnpm link <spa-directory>`.

❗ Build projects before testing integration. First build `fingerprintjs-pro-spa`, then `fingerprintjs-pro-react`, and then start spa example app.

### How to build

Just run:

```shell
pnpm build
```

### Code style

The code style is controlled by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run to check that the code style is ok:

```shell
pnpm lint
```

You aren't required to run the check manually, the CI will do it. Run the following command to fix style issues (not all issues can be fixed automatically):

```shell
pnpm lint:fix
```

### How to test

Tests are located in `__tests__` folder and run by [jest](https://jestjs.io/) in [jsdom](https://github.com/jsdom/jsdom) environment.

To run tests you can use IDE instruments or just run:

```shell
pnpm test
```

To check the distributive TypeScript declarations, build the project and run:

```shell
pnpm test:dts
```

### How to publish

The library is automatically released and published to NPM on every push to the main branch if there are relevant changes using [semantic-release](https://github.com/semantic-release/semantic-release) with following plugins:

- [@semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer)
- [@semantic-release/release-notes-generator](https://github.com/semantic-release/release-notes-generator)
- [@semantic-release/changelog](https://github.com/semantic-release/changelog)
- [@semantic-release/npm](https://github.com/semantic-release/npm)
- [@semantic-release/github](https://github.com/semantic-release/github)

The workflow must be approved by one of the maintainers, first.
