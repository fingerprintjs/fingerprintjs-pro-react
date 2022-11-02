## [2.0.0](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.5.0...v2.0.0) (2022-11-02)


### ⚠ BREAKING CHANGES

* Previously "getData" was returning "undefined" when error occurred

### Features

* throw on error when calling "getData" manually ([3df14fc](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/3df14fc7dc1ca4f77b2759b396c1a8e7e67f0197))

## [1.5.0](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.4.1...v1.5.0) (2022-10-31)


### Features

* throw error if params passed to "useVisitorData" or "getData" are null ([41e2068](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/41e20686c4a55aa0eeb7c46fd25b80d7a5a11c6b))


### Bug Fixes

* ensure that "products" parameter is correctly passed into the client ([5c0dbd4](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/5c0dbd421e1c0a93574eb33b4ff82576148d6ab9))
* use correct errors messages from pro agent ([b2e1a7f](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/b2e1a7fd6c778a510ba458b162b98db23d60e98c))

## [1.4.1](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.4.0...v1.4.1) (2022-10-25)


### Bug Fixes

* fix broken navigation when using <FpjsProvider /> ([e518cbc](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/e518cbc410a3ad00f0113bd23a53fce1d86aaf86))

## [1.4.0](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.3.1...v1.4.0) (2022-10-04)


### Features

* introduce synchronous env detection ([6ba1fd0](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/6ba1fd0f823cccb3295ccab8896b80501b189842))
* support ignoring cache with "immediate" set to true ([d55bc4c](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/d55bc4c6502c51e47a79fed6aef5ad1ebc98aef9))


### Build System

* **deps:** bump terser from 4.8.0 to 4.8.1 in /examples/preact ([6947ad5](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/6947ad553a39107736affb43ad1e0bbfce5c09a9))
* **deps:** bump terser from 5.13.1 to 5.14.2 in /examples/spa ([e94c1ce](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/e94c1ce1106795f88390545f1a76a979e77c2f20))
* **deps:** update FingerprintJS Pro SPA to 0.5.0 ([e4f4039](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/e4f4039ef0e023003ee03f5dbe67b3e593f50a42))


### Documentation

* **README:** add documentation badge ([e4a8365](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/e4a83651aaf06dd58a19d01915314f852f035347))
* **README:** remove manually written API reference from readme in favor of generated one ([f534021](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/f534021203f1dd0c491f99a44f8d47fd37c743ff))
* **README:** update examples to use ReactDOM.createRoot ([ed69e26](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/ed69e26f94e40641cc6be00724f623d198636ada))

## [1.3.1](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.3.0...v1.3.1) (2022-07-15)


### Bug Fixes

* correctly provide contextual information when provider is mounted ([5d8f195](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/5d8f195cca2ed637f332a0e093f731bdacdd42fe))

# [1.3.0](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.2.0...v1.3.0) (2022-07-14)


### Bug Fixes

* use correct cwd in post-install script ([7b8e96c](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/7b8e96ca0581f3b8ae9a30f2080e23c15885e2d2))


### Features

* add contextual information for the JS agent about the library ([d55e164](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/d55e16409b8987c57904962a538fce0d4f142414))

# [1.3.0-test.2](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.3.0-test.1...v1.3.0-test.2) (2022-07-13)


### Bug Fixes

* use correct cwd in post-install script ([7b8e96c](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/7b8e96ca0581f3b8ae9a30f2080e23c15885e2d2))

# [1.3.0-test.1](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.2.0...v1.3.0-test.1) (2022-07-13)


### Features

* add contextual information for the JS agent about the library ([d55e164](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/d55e16409b8987c57904962a538fce0d4f142414))

# [1.2.0](https://github.com/fingerprintjs/fingerprintjs-pro-react/compare/v1.1.0...v1.2.0) (2022-07-11)


### Features

* use latest @fingerprintjs/fingerprintjs-pro-spa version ([3576871](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/3576871b9f897f4b0091b2c9cec1735de1e52f22))

### 1.1.0 (2022-06-20)

##### Chores

*  add eslint-config-preact as main package devDependency ([4e8dc72e](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/4e8dc72e7606cd5e202e513801b9ccecc7a80ed4))
*  update packages ([887d4d9f](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/887d4d9ffa344fc29067bd7805308f7383b38c6b))

##### Documentation Changes

*  add preact example description to the contributing instruction ([92f96c94](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/92f96c94ca66be26755de6b457e296a4d4038a58))
*  fix typos ([009a418a](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/009a418ae33817fea52d278e4e24a6111b48716b))

##### New Features

*  add preact example ([f280bedf](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/f280bedf941cb6c30a52a7f053995eb205fd7081))
*  remove react from peerDeps for better preact compatibility ([fd68db69](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/fd68db69f0cac7e7af9bd47d685c4c245e7165de))

##### Bug Fixes

*  fix next example readme ([75e96ad9](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/75e96ad9f591c61c26e656d72735eabb78bda2af))

#### 1.0.1 (2022-05-16)

##### Chores

*  use production environment for npm publish ([1c814d00](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/1c814d006023c43128dff43fdb55b65458086f41))
* **deps:**  update deps for spa example ([8f0c1ac6](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/8f0c1ac6f24d7ab6091fde3a9b3eb003060813bd))

##### Documentation Changes

*  mention Next.js in the readme ([f5df094f](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/f5df094f0795c3d84712919037aaf1da960bf3e8))

## 1.0.0 (2022-04-21)

##### Breaking Changes

*  change getData interface to more flexible ([8c701414](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/8c701414b365b546ac7956bcb4a4d98a54e0b2d5))

##### Chores

*  update actions to fix git issue with safe.directory ([c3ff1c93](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/c3ff1c93e1f5be8dcf6de0e1d9505a87c46eadd3))
*  fix mock for tests ([cf804544](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/cf804544de6ce1784bfd4c3c80bcc417c1a29397))
*  apply prettier, fix linter issues ([1397498f](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/1397498f3a53636582d64f22aefaa22de387b6b4))
*  keep all linter settings in root ([c6188443](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/c6188443d690b36d4c5dfa520a896db8368c9587))
*  add codeowners file ([a097794c](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/a097794c96a19c8869a46c9a2a2b159c171dddc2))
*  don't create tag on version command ([84b49fd6](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/84b49fd6b97ecb48a62306d0353bd3c165bb2449))
*  update node-forge ([b697548e](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/b697548e6f4af8ed4f2f6e04c58028ce33b06fc2))
*  update minimist ([02cc142f](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/02cc142ffce01268f3aa8eedcc28df36b795a65a))
*  regenerate example package.lock for new fingerprintjs-pro-spa ([d060112a](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/d060112a7dd644b8deb019e673a82ca2f143be44))
*  add --isolatedModules for typecheck ([547fbc99](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/547fbc99afc753addde4619a31b83032da9ec2f2))
*  use 3-rd party GitHub action by sha ([14ed2dbc](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/14ed2dbcc63d5d6b88bc1c7c64d1344d4941310e))
*  update fingerprintjs-pro-spa integration with fingerprintjs-pro agent v3.6.0+ ([8157dd18](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/8157dd18f321e91b939e03a297c9d9b63a1f9b9f))
* **deps:**
  *  bump rollup-plugin-license ([e4f9905c](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/e4f9905c9d608634846526b3079697e79b40426d))
  *  bump minimist from 1.2.5 to 1.2.6 ([5c563329](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/5c563329320d86cda158858207f9f68610209f65))

##### Continuous Integration

*  revert reference type from 'file' to 'link' ([4c88b15f](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/4c88b15f3f0e810f10857a884c09fe0f25d1502d))

##### Documentation Changes

*  fix readme after review ([5d0973af](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/5d0973af9f1ec7638ade850316a6a5437df5fbe9))
*  add info about NextJS example in contributing instruction ([dc302f79](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/dc302f7987fe83a05192acda6fecea78339fc533))
*  review suggested fix ([77ec7a7d](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/77ec7a7d802a06c5f520cdc4d52a6870f6cce0e8))
*  update table of contents ([72ecdce3](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/72ecdce33ec4c3840e4c6319425d16e5f83fcd4c))
*  add info about caching and describe useVisitorData hook ([0f39f1a1](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/0f39f1a1861c7fe9fd371800018b88ff84354cc2))
*  add contributing.md ([d09e68cb](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/d09e68cb5cc5c68e1e8b76e4b5043443bdf5c5ad))
*  explain immediate property ([bfcec74b](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/bfcec74bf780620a2179d327a72ab10d9d1eeaaf))
*  add info about config parameter for the hook ([59d40598](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/59d4059832d8b0b2b6e88307e048f0f5fb15118b))
*  fix Documentation section styling ([af00b128](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/af00b128d5de5597779c59f945ea1fe18aae536b))
*  format Documentation section ([a9309abf](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/a9309abfd620833b32eecba20d65681d7a040a27))
*  remove separators ([d84ef748](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/d84ef748e4528c14c9f2f69bafed2429026686f4))
*  add documentation ([38e83a3c](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/38e83a3ce4c1ac17e1c419415789ee40bd1087b2))

##### New Features

*  add NextJS example ([863e3cbb](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/863e3cbb52bb32dc8ac48dbb2859172cc3e7c49a))
*  init NextJS example ([35cc48fb](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/35cc48fb7d87dbefaa006dbdbfeeb80c312dff06))
*  send integrationInfo ([8b7ab903](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/8b7ab90326efe3924778422cface5b9c60796a15))

##### Bug Fixes

*  don't try to load FingerptintJS Pro Agent outside browser environment ([eda093bb](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/eda093bbf69ed438e92226626969261c17e83251))

### 0.3.0 (2022-03-14)

##### Chores

*  added source maps ([f922344e](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/f922344e47fc04a8bbce0f10cc99dbc4e5945c20))

##### New Features

*  pass config to the useVisitorData hook ([750733a3](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/750733a39de8cf30db1be5576f30c618c5bdb060))

##### Bug Fixes

*  race condition (getData called before init) ([0c787786](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/0c78778652b598b329d3056ec002bf85d0733460))

#### 0.2.2 (2022-03-11)

##### Chores

*  add automatic changelog generation ([9126a8e6](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/9126a8e6a7f6b83eb11f79cf47f9312e49f5cff2))
*  bumped fingerprintjs-pro-spa version ([4c5237b8](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/4c5237b87b6f9bcb1b95ab49b0eabb12f62c2a3a))

##### Bug Fixes

*  eslint configs ([1a9c57e0](https://github.com/fingerprintjs/fingerprintjs-pro-react/commit/1a9c57e059977de3c8b31a3a1fe2ec535a6f093d))

### 0.2.1
##### Chores
* Bumped `fingerprintjs-spa-pro` version

### 0.2.0
* Initial release
