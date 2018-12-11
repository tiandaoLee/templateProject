/**
 * 账号管理页面路由
 */
module.exports = {
  path: 'accountManager',
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('src/containers/workplace/accountManager').default);
    });
  },
  childRoutes: [
    {
      path: 'weMediaAccount',
      breadcrumbName: '自媒体账号',
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('src/containers/workplace/accountManager/weMedia').default);
        });
      }
    }
  ]
};
