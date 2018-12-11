import cookie from 'src/lib/cookie';
import App from './App';

const isLogin = function() {
  return cookie.hasItem('news_media_token');
};

const rootRoute = {
  path: '/',
  onEnter: (nextState, replaceState) => {
    // 检查登录状态
    if (nextState.location.pathname === '/') {
      if (isLogin()) {
        replaceState('/workplace');
      } else {
        replaceState('/user');
      }
    }
  },
  childRoutes: [
    require('./user'), // 未登录页面的路由
    {
      path: 'workplace',
      component: App,
      onEnter: (nextState, replaceState) => {
        if (!isLogin()) {
          replaceState('user');
        }
      },
      indexRoute: {
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('src/containers/workplace/home').default);
          });
        }
      },
      childRoutes: [
        require('./accountManager'), // 账号管理路由
        require('./example'),
        // 路由放在这个的前面
        // 这里相当于redirect, 放404
        {
          path: '*',
          onEnter: (nextState, replaceState) => {
            console.log('404notfound');
          }
        }
      ]
    }
  ]
};

export default rootRoute;
