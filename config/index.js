const utils = require('../build/utils');

const port = 17791;
const path = '/tuia/tiantianquwen-web-node/dist/';
module.exports = {
  path,
  build: {
    env: require('./prod.env'),
    assetsPublicPath: `//yun.tuia.cn${path}`,
    sourceMap: false,
    cssSourceMap: false
  },
  dev: {
    env: require('./dev.env'),
    assetsPublicPath: `http://${utils.getIPAdress()}:${port}/dist/`,
    sourceMap: true,
    cssSourceMap: false,
    port,
    // 联调接口代理
    proxy: {
      open: false,
      protocol: 'http://',
      hostName: '172.16.30.242',
      port: 1113
    }
  }
};
