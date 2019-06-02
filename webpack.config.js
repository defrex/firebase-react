const { resolve } = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { StatsWriterPlugin } = require('webpack-stats-plugin')


const config = {
  environment: process.env.NODE_ENV || 'production',
}

function absolutePath(path) {
  return resolve(`${__dirname}/${path}`)
}

const base = {
  mode: config.environment,
  devtool: 'source-map',

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      ui: absolutePath('./ui'),
      functions: absolutePath('./functions'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: absolutePath('tsconfig.json'),
        },
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2|ico|xml|manifest|svg)$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(config.environment),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = [
  {
    ...base,

    name: 'client',
    target: 'web',

    entry: {
      client: [
        ...(config.environment === 'development'
          ? ['webpack-hot-middleware/client']
          : []),
        absolutePath('ui/client.tsx'),
      ],
    },

    output: {
      ...base.output,
      path: absolutePath('public/dist'),
    },

    plugins: [
      ...base.plugins,
      new StatsWriterPlugin({ filename: 'client-stats.json' }),
    ],
  }, {
    ...base,

    name: 'server',
    target: 'node',

    entry: {
      server: absolutePath('ui/server.tsx'),
    },

    output: {
      ...base.output,
      path: absolutePath('dist/ui'),
      libraryTarget: 'commonjs2',
    },

    externals: [nodeExternals()],

    plugins: [
      ...base.plugins,
      new StatsWriterPlugin({ filename: 'server-stats.json' }),
    ],
  }
]
