/**
 * @file webpack prod config
 * @author xiaozhihua
 * @date 2018-11-22 16:52:10
 */

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.config.common')

const resolve = (...arg) => {
  return path.resolve('.', ...arg)
}

const BuildPath = resolve('dist')
const { template } = require(resolve('peak.config'))
const TemplatePath = resolve(template)

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: BuildPath,
    filename: '[name].[contenthash].js',
    publicPath: './'
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
    new HtmlWebpackPlugin({
      template: TemplatePath,
      filename: path.join(BuildPath, template)
    })
  ]
})
