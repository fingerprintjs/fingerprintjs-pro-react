# Contributing to FingerprintJS Pro SPA integration

## Working with code

We prefer using [yarn](https://yarnpkg.com/) for installing dependencies and running scripts.

The main branch is locked for the push action. For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first.

### Development playground

There are 2 demo pages for this integration:
1. In `/examples/spa` folder. It is a rich demo with scenarios of using different caching strategies. You can find more info about configuration and starting demo in the [readme](examples/spa/README.md).
2. In `/examples/next` folder. It is a demo built with NextJS that allows testing SSR scenarios. You can find more info about configuration and starting demo in the [readme](examples/next/README.md).

If you want to test integration with [fingerprintjs-pro-spa](https://github.com/fingerprintjs/fingerprintjs-pro-spa), just [link the package](https://yarnpkg.com/cli/link) with the `yarn link`.

❗ Build projects before testing integration. First build `fingerprintjs-pro-spa`, then `fingerprintjs-pro-react`, and then start spa example app.

### How to build
Just run:
```shell
yarn build
```

### Code style

The code style is controlled by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run to check that the code style is ok:
```shell
yarn lint
```

You aren't required to run the check manually, the CI will do it. Run the following command to fix style issues (not all issues can be fixed automatically):
```shell
yarn lint:fix
```

### How to test
Tests are located in `__tests__` folder and run by [jest](https://jestjs.io/) in [jsdom](https://github.com/jsdom/jsdom) environment.

To run tests you can use IDE instruments or just run:
```shell
yarn test
```

To check the distributive TypeScript declarations, build the project and run:
```shell
yarn test:dts
```

### How to publish
- Create a new branch
- Run `yarn release:(major|minor|patch)` depending on the version you need
- Make a pull request
- After merging the pull request into the main branch and after successful tests, GitHub Action will publish a new version to the npm