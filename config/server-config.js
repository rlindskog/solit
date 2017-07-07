const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const rootDir = require('app-root-dir').get()
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const SpawnServerPlugin = require('spawn-server-webpack-plugin')
const webpack = require('webpack')

// follow a similar API to https://nuxtjs.org/guide/configuration
function ServerConfig (solitConfig) {
  const IS_PROD = !solitConfig.dev
  const IS_DEV = !IS_PROD
  const serverConfig = {
    name: 'server',
    context: rootDir,
    entry: [
      path.resolve(__dirname, 'entry.js') // dirname instead of rootDir to get THIS dir.
    ],
    output: {
      libraryTarget: 'commonjs2',
      path: path.resolve(rootDir, solitConfig.buildDir),
      publicPath: IS_DEV ? `http://${solitConfig.host}:${solitConfig.port}` : '/',
      filename: solitConfig.buildFilename,
    },
    target: 'node',
    externals: [
      nodeExternals({
        modulesDir: path.resolve(rootDir, 'node_modules'),
        whitelist: [
          IS_DEV ? 'webpack/hot/poll?300' : null,
          'solit',
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss|sass|sss|less)$/
        ].filter(x => x),
      })
    ],
    node: {
      __filename: true,
      __dirname: true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ],
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/^srcdir$/, solitConfig.srcDir),
      new webpack.EnvironmentPlugin({
        PORT: solitConfig.port,
        HOST: solitConfig.host
      }),
      new webpack.NamedModulesPlugin()
    ],
  }
  
  if (IS_DEV) {
    serverConfig.entry.unshift('webpack/hot/poll?300')
    serverConfig.plugins.push(
      new SpawnServerPlugin(),
      new webpack.HotModuleReplacementPlugin({ multistep: false }),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin()
    )
  }

  if (IS_PROD) {
    serverConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    )
  }
  return serverConfig
}

module.exports = ServerConfig