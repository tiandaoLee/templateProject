import React from 'react';

import common from 'src/lib/common';

import Header from 'src/components/header';
import Menu from 'src/components/menu';
import Footer from 'src/components/footer';

import {
  Layout
} from 'antd';

import 'src/styles/antd.less';
import styles from 'src/styles/index.less';

const { Content } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      currentAccount: {}
    };
  }
  componentDidMount() {
    this.fetcUserInfo();
  }
  // 获取用户信息数据
  fetcUserInfo = () => {
    common.fetch('/account/getMediaInfo', {}, 'get')
      .then(res => {
        const { data } = res;
        const { nickName } = data;
        this.setState({ currentAccount: { nickName } });
      });
  }
  render() {
    const { currentAccount } = this.state;
    const { router, children } = this.props;
    const { getCurrentLocation } = router;
    return (
      <Layout className={styles.app_container}>
        <Header accountInfo={currentAccount}/>
        <Layout>
          <Menu currentLocation={getCurrentLocation()}/>
          <Layout className={styles.content_wrap}>
            <Content className={styles.content_container}>
              {children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
