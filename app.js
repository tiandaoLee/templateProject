const express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./config');
const utils = require('./build/utils');
const devConfig = require('./build/webpack.dev.conf');
const compiler = webpack(devConfig);

const app = express();

app.use(webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './dist/html/'));
app.engine('ejs', require('ejs').__express);
app.engine('html', require('ejs').__express);

require('./mock/router/')(app);

console.log(`<http://${utils.getIPAdress()}:${config.dev.port}> with Chrome`);

module.exports = app;
