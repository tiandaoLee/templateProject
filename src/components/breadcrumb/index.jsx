import React from 'react';
import {
  Link,
  hashHistory
} from 'react-router';
// import rootRoute from 'src/routes';

import {
  Breadcrumb as AntdBreadcrumb
} from 'antd';

import styles from './index.less';

const routes = [{
  path: '//',
  breadcrumbName: '首页'
}, {
  path: 'accountManager/weMediaAccount',
  breadcrumbName: '自媒体账号'
}];

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    hashHistory.getCurrentLocation();
  }
  itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  render() {
    const { show = false } = this.props;
    return (
      show ? <AntdBreadcrumb className={styles.container} itemRender={this.itemRender} routes={routes} /> : <span></span>
    );
  }
}

export default Breadcrumb;
