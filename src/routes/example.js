module.exports = {
  path: 'example',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('src/containers/workplace/example').default);
    });
  },
  childRoutes: [{
    path: 'lv3',
    getComponent(location, cb) {
      require.ensure([], require => {
        cb(null, require('src/containers/workplace/example/child').default);
      });
    }
  }]
};
