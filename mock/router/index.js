const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const httpProxyMiddleware = require('http-proxy-middleware');

const config = require('../../config');
const upload = require('../server/upload');

const Router = function(app) {
  router.get('/', function(req, res) {
    // 根路由
    res.render('index.html');
  });
  router.get(/html/, function(req, res) {
    // html路由
    res.render(req.path.replace('/', ''));
  });
  const {
    open,
    protocol,
    hostName,
    port
  } = config.dev.proxy;

  /**
   * 如果open为true,则开启代理到指定服务器
   */
  if (open) {
    const filter = function(pathname, req) {
      return !(pathname.match('html') || pathname === '/');
    };
    app.use(httpProxyMiddleware(filter, {
      target: `${protocol}${hostName}:${port}`,
      changeOrigin: false
    }));
  } else {
    router.get('/account/login', function(req, res, next) {
      res.cookie('news_media_token', 'f1165eb8-a8b3-423a-b2fa-717c72ebaee2');
      next();
    });
    router.post(/\/upload\/index/, (req, res) => {
      upload(req, res);
    });
    router.all('*', (req, res) => {
      // mock路由，优先查找JS，其次是JSON，找不到返回默认值
      const JSFilePath = path.join(__dirname, '../server/', `${req.path}.js`);
      const JSONFilePath = path.join(__dirname, '../server/', `${req.path}.json`);
      if (fs.existsSync(JSFilePath)) {
        const file = fs.readFileSync(JSFilePath);
        res.json(JSON.parse(file));
      } else if (fs.existsSync(JSONFilePath)) {
        const file = fs.readFileSync(JSONFilePath);
        res.json(JSON.parse(file));
      } else {
        res.json({
          code: '0',
          desc: '成功',
          data: '0'
        });
      }
    });
  }
  app.use(router);
};

module.exports = Router;

