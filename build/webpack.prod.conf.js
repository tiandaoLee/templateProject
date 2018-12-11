const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const chalk = require('chalk');
const os = require('os');

const config = require('../config/index');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  module: {
    rules: [
      {
        test: /(\.less|\.css)$/,
        exclude: /node_modules|antd\.less/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: true,
                localIdentName: '[name]__[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                javascriptEnabled: true
              }
            }
          ]
        })
      },
      {
        test: /(\.less|\.css)$/,
        include: /node_modules|antd\.less/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                javascriptEnabled: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.build.env
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      },
      cache: true,
      parallel: os.cpus().length
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin({
      format: chalk.yellow('打包中 [:bar] :current/:total :percent :elapseds :msg'),
      complete: '●',
      incomplete: '○',
      width: 20
    }),
    new CleanWebpackPlugin(
      ['dist'], {
        root: path.resolve(__dirname, '../'),
        verbose: false,
        dry: false
      }
    ),
    new ExtractTextPlugin({
      filename: '[contenthash].index.css',
      allChunks: true
    }),
    new ImageminPlugin({
      /**
       * Linux依赖于libpng-devel
       * yum install libpng-devel
       */
      pngquant: {
        quality: '95-100'
      },
      cacheFolder: path.join(__dirname, '../node_modules/.cache/imagemin-webpack-plugin')
    })
  ]
});
