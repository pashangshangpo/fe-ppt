/**
 * @file webpack prod config
 * @author xiaozhihua
 * @date 2018-11-22 16:52:10
 */

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const common = require('./webpack.config.common')

const resolve = (...arg) => {
  return path.resolve('.', ...arg)
}

const BuildPath = resolve('build')
const PublicPath = require(resolve('peak.config')).publicPath

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: BuildPath,
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      },
      {
        test: /\.scss$/,
        // exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      ['build'],
      {
        root: resolve()
      }
    ),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new ExtractTextPlugin({
      filename: 'style/[hash].css',
      allChunks: true
    }),
    PublicPath && new CopyWebpackPlugin([
      {
        from: resolve(PublicPath.replace('/', '')),
        to: path.join(BuildPath, PublicPath),
        ignore: ['.*']
      }
    ])
  ]
})