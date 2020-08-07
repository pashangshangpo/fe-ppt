/**
 * @file webpack common config
 * @author xiaozhihua
 * @date 2018-11-22 16:52:48
 */

const path = require('path')

const resolve = (...arg) => {
  return path.resolve('.', ...arg)
}

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: resolve('build'),
    filename: '[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '$api': resolve('src/api'),
      '$common': resolve('src/common'),
      '$components': resolve('src/components'),
      '$store': resolve('src/store'),
      '$router': resolve('src/router'),
      '$style': resolve('src/style'),
      '$svg': resolve('src/svg')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)/,
        include: [
          resolve('src')
        ],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'image/[name].[hash].[ext]',
              limit: 90000000
            }
          }
        ]
      },
      {
        test: /\.css$/,
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
}
