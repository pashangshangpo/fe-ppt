/**
 * @file webpack prod config
 * @author xiaozhihua
 * @date 2018-11-22 16:52:10
 */

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const common = require('./webpack.config.common')

const resolve = (...arg) => {
  return path.resolve('.', ...arg)
}

const BuildPath = resolve('dist')
const { publicPath, template } = require(resolve('peak.config'))
const PublicPath = path.join(BuildPath, publicPath)
const TemplatePath = resolve(template)

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: BuildPath,
    filename: '[name].[contenthash].js',
    chunkFilename: "[name].[chunkhash:5].js",
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
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
        use: [
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
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
    new MiniCssExtractPlugin({
      filename: 'style/[contenthash].css',
      chunkFilename: 'style/[contenthash].css'
    }),
    publicPath && new CopyWebpackPlugin([
      {
        from: resolve(publicPath.replace('/', '')),
        to: PublicPath,
        ignore: ['.*']
      }
    ]),
    new HtmlWebpackPlugin({
      template: TemplatePath,
      filename: path.join(BuildPath, template)
    })
  ]
})