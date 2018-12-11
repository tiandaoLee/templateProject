/**
 * 目前因为没有footer需求，用于今后拓展
 */
import React from 'react';

import { Layout } from 'antd';

import styles from './index.less';

const { Footer: AntdFooter } = Layout;

class Footer extends React.Component {
  render() {
    return (
      <AntdFooter className={styles.footer}></AntdFooter>
    );
  };
};

export default Footer;
