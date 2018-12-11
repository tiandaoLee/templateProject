const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const utils = require('./utils');
const config = require('../config');
const entryConfig = require('../config/entry');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: Object.assign(utils.computeEntry(entryConfig), {
    vendors: ['react', 'react-dom', 'react-router', 'antd']
  }),
  output: {
    path: path.join(__dirname, '../dist/assets/'),
    filename: isProd ? '[chunkhash].[name].js' : '[name].js',
    publicPath: config[isProd ? 'build' : 'dev'].assetsPublicPath,
    chunkFilename: isProd ? '[chunkhash].[name].js' : '[name].js'
  },
  resolve: {
    alias: {
      src: path.join(__dirname, '../src/')
    },
    extensions: ['.js', '.jsx']
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          configFile: './.eslintrc.js',
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js[x]?$/,
        loaders: (isProd ? [] : ['react-hot-loader']).concat(['babel-loader?cacheDirectory=true']),
        exclude: /node_modules/
      },
      {
        test: /\.(svg|png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: isProd ? '[chunkhash].vendors.js' : 'vendors.js'
    }),
    ...utils.computeTemplate(entryConfig).map(el => {
      return new HtmlWebpackPlugin(
        Object.assign({}, el, {
          alwaysWriteToDisk: true
        })
      );
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
};
