import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import external from 'rollup-plugin-peer-deps-external'
import dtsPlugin from 'rollup-plugin-dts'
import licensePlugin from 'rollup-plugin-license'
import banner2 from 'rollup-plugin-banner2'
import { join } from 'path'
const { dependencies } = require('./package.json')

const inputFile = 'src/index.ts'
const outputDirectory = 'dist'

const commonBanner = licensePlugin({
  banner: {
    content: {
      file: join(__dirname, 'resources', 'license_banner.txt'),
    },
  },
})

const commonInput = {
  input: inputFile,
  plugins: [jsonPlugin(), typescript(), external(), commonBanner, banner2(() => `'use client';\n`)],
}

const commonOutput = {
  exports: 'named',
  sourcemap: true,
}

const RollupConfig = [
  // NPM bundles. They have all the dependencies excluded for end code size optimization.
  {
    ...commonInput,
    external: Object.keys(dependencies),
    output: [
      // CJS for usage with `require()`
      {
        ...commonOutput,
        file: `${outputDirectory}/fp-pro-react.cjs.js`,
        format: 'cjs',
      },

      // ESM for usage with `import`
      {
        ...commonOutput,
        file: `${outputDirectory}/fp-pro-react.esm.js`,
        format: 'es',
      },
    ],
  },

  // TypeScript definition
  {
    ...commonInput,
    plugins: [dtsPlugin(), commonBanner],
    output: {
      file: `${outputDirectory}/fp-pro-react.d.ts`,
      format: 'es',
    },
  },
]

export default RollupConfig
