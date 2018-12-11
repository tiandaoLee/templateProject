import cookie from 'src/lib/cookie';

const isLogin = function() {
  return cookie.hasItem('news_media_token');
};

module.exports = {
  path: 'user',
  onEnter: (nextState, replaceState) => {
    // 检查登录状态
    if (isLogin()) {
      replaceState('/workplace');
    }
  },
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('src/containers/user').default);
    });
  },
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('src/containers/user/login').default);
      });
    }
  },
  childRoutes: [
    {
      path: 'login',
      getComponent(location, cb) {
        require.ensure([], require => {
          cb(null, require('src/containers/user/login').default);
        });
      }
    }
  ]
};
