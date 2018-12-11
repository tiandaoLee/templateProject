import React from 'react';

import utils from 'src/lib/utils';

import {
  Layout
} from 'antd';

import Breadcrumb from 'src/components/breadcrumb';

import styles from './index.less';

const { Header: AntdHeader } = Layout;

class Header extends React.Component {
  handleQuit = () => {
    utils.logout();
  }
  render() {
    const { accountInfo = {} } = this.props;
    const { nickName = '' } = accountInfo;
    return (
      <AntdHeader className={styles.header}>
        <div
          className={styles.logo}
          onClick={() => utils.jumpTo('/')}
        >
          天天趣闻自媒体管理平台
        </div>
        <div className={styles.header_wrap}>
          <Breadcrumb show={false}/>
          <div className={styles.user_info_wrap}>
            <span>{nickName}</span>
            <span onClick={this.handleQuit}>退出</span>
          </div>
        </div>
      </AntdHeader>
    );
  }
}

export default Header;
