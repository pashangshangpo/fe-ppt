/**
 * @file webpack dev config
 * @author xiaozhihua
 * @date 2018-11-22 16:51:22
 */

const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.config.common')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        // exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')('last 100 versions')
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        // exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')('last 100 versions')
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'development'"
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})