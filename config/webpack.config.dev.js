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