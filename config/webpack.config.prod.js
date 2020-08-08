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

class InlineChunkHtmlPlugin {
  constructor(htmlWebpackPlugin, tests) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.tests = tests;
  }

  getInlinedTag(publicPath, assets, tag) {
    if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
      return tag;
    }
    const scriptName = publicPath
      ? tag.attributes.src.replace(publicPath, '')
      : tag.attributes.src;
    if (!this.tests.some(test => scriptName.match(test))) {
      return tag;
    }
    const asset = assets[scriptName];
    if (asset == null) {
      return tag;
    }
    return { tagName: 'script', innerHTML: asset.source(), closeTag: true };
  }

  apply(compiler) {
    let publicPath = compiler.options.output.publicPath || '';
    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }

    compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', compilation => {
      const tagFunction = tag =>
        this.getInlinedTag(publicPath, compilation.assets, tag);

      const hooks = this.htmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap('InlineChunkHtmlPlugin', assets => {
        assets.headTags = assets.headTags.map(tagFunction);
        assets.bodyTags = assets.bodyTags.map(tagFunction);
      });
    });
  }
}

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
      inject: true,
      template: TemplatePath,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/])
  ]
})
