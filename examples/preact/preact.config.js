import dotenv from 'dotenv'

dotenv.config()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (config, env, helpers) => {
  const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0]
  plugin.definitions['process.env.PREACT_APP_FPJS_PUBLIC_API_KEY'] = JSON.stringify(
    process.env.PREACT_APP_FPJS_PUBLIC_API_KEY
  )
}
